"use client";

import { useState, memo } from "react";
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ComposedChart,
  Customized,
  Rectangle,
} from "recharts";
import sampleData from "../static/sampleData.json";
import styles from "./chart.module.css";

type DayData = {
  day: number;
  currentPrecipitation: number;
  historicalAverage: number;
  optimalZone: number[];
};

type MonthData = {
  month: string;
  days: DayData[];
};

const getLast29Days = (data: MonthData[], currentDate: Date): MonthData[] => {
  const currentMonthIndex = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  let result: MonthData[] = [];
  let count = 0;

  const currentMonth = currentMonthIndex + 1;

  for (let i = currentMonth; count < 29 && i >= 0; i--) {
    let monthData: MonthData = { month: data[i].month, days: [] };

    for (let j = data[i].days.length - 1; j >= 0; j--) {
      let dayData = data[i].days[j];

      if (
        (i === currentMonth && dayData.day <= currentDay) ||
        i < currentMonth
      ) {
        monthData.days.unshift(dayData);
        count++;
        if (count === 29) break;
      }
    }

    if (monthData.days.length > 0) {
      result.unshift(monthData); // Prepend the month data to keep the chronological order
    }
  }

  return result;
};

const CustomizedXAxis = (props: any) => {
  const { formattedGraphicalItems } = props;
  const firstSeries = formattedGraphicalItems[0];

  const points = firstSeries?.props?.points || [];

  const valWidth = points[2]?.x - points[1]?.x || 0;
  const length = points?.length;

  return points.map((firstSeriesPoint: any, index: number) => {
    const difference = Math.abs(
      firstSeriesPoint.payload.historicalAverage -
        firstSeriesPoint.payload.currentPrecipitation
    );

    const getColor = (difference: number) => {
      if (difference >= 3) {
        return "#ED4040";
      }
      if (difference >= 2) {
        return "#EDC240";
      } else {
        return "#20BA81";
      }
    };

    return (
      <Rectangle
        key={firstSeriesPoint.payload.month + index}
        width={index + 1 === length ? 0 : valWidth + 1}
        height={6}
        x={firstSeriesPoint.x}
        y={firstSeries.props.yAxis.height + 20}
        fill={getColor(difference)}
      />
    );
  });
};

const allData = sampleData.flatMap((month) =>
  month.days.map((day) => ({
    ...day,
    month: month.month,
  }))
);

const CustomizedAxisTick = memo(function CustomizedAxisTick(props: any) {
  const { x, y, payload, isMonthSelected, data } = props;
  const currentDay = data[props.payload.index];
  const showMonth = currentDay?.day === 1 || props.payload.index === 0;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        fontSize={isMonthSelected ? 10 : 12}
        fontFamily="Inter"
        fontWeight={payload.value === "Nov" ? 700 : 500}
        x={isMonthSelected ? 2 : 10}
        y={isMonthSelected ? 10 : 15}
        textAnchor="start"
        fill={
          payload.value === "Nov"
            ? "#000"
            : isMonthSelected
            ? "#525252"
            : "#58667E"
        }
        color={
          payload.value === "Nov"
            ? "#000"
            : isMonthSelected
            ? "#525252"
            : "#58667E"
        }
      >
        {payload.value}
      </text>
      {showMonth && (
        <text
          fontSize={12}
          fontFamily="Inter"
          fontWeight={500}
          x={0}
          y={20}
          dy={15}
          textAnchor="start"
          fill={"#161616"}
          color={"#161616"}
        >
          {currentDay.month}
        </text>
      )}
    </g>
  );
});

const CustomLineChart = () => {
  const [isMonthSelected, setIsMonthSelected] = useState(true);

  const today = new Date();
  const last29DaysData = getLast29Days(sampleData, today);

  const data = last29DaysData.flatMap((month) =>
    month.days.map((day) => ({
      ...day,
      month: month.month,
    }))
  );

  return (
    <>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>Cumulative Precipitation</h1>
        <div className={styles.buttonContainer}>
          <button
            className={`${
              isMonthSelected ? styles.selectedButton : styles.button
            } ${styles.buttonLeft}`}
            onClick={() => setIsMonthSelected(true)}
          >
            MTH
          </button>
          <button
            className={`${
              !isMonthSelected ? styles.selectedButton : styles.button
            } ${styles.buttonRight}`}
            onClick={() => setIsMonthSelected(false)}
          >
            YR
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={isMonthSelected ? data : allData}
          margin={{ top: 25, bottom: 20 }}
        >
          <CartesianGrid horizontal={false} stroke="#EFEFEF" />
          <XAxis
            fill="#525252"
            interval={"preserveStart"}
            tickLine={false}
            tick={
              <CustomizedAxisTick
                isMonthSelected={isMonthSelected}
                data={isMonthSelected ? data : allData}
              />
            }
            dataKey={isMonthSelected ? "day" : "month"}
            {...(isMonthSelected
              ? {}
              : {
                  ticks: [
                    "Dec",
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                  ],
                })}
          />
          <YAxis
            label={{
              value: "Risk",
              position: "insideBottomRight",
              fill: "#161616",
              fontSize: 10,
              fontWeight: 500,
              fontFamily: "Inter",
              offset: 10,
            }}
            unit=" in."
            type={"number"}
            tickCount={5}
            tick={{
              fontSize: 12,
              fontWeight: 500,
              fill: "#525252",
            }}
            fill="#525252"
            padding={{ bottom: 28 }}
            width={40}
          />
          <Tooltip />
          <Line
            type="basis"
            dataKey="currentPrecipitation"
            stroke="#161616"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="basis"
            dataKey="historicalAverage"
            stroke="#5276FF"
            strokeDasharray="4 5"
            strokeWidth={2}
            dot={false}
          />
          <Area
            dataKey="optimalZone"
            fill="rgba(90, 187, 228, 0.15)"
            stroke="none"
            type="basis"
          />
          <Customized component={CustomizedXAxis} />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default CustomLineChart;
