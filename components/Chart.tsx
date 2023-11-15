"use client";

import { useState } from "react";
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
} from "recharts";
import sampleData from "../static/sampleData.json";
import { getLast29Days } from "../helpers";
import {
  CustomizedXAxisTick,
  CustomizedYAxisTick,
  CustomizedYAxisLabel,
} from "./AxisTick";
import { CustomizedXAxis } from "./Axis";
import { CustomTooltip } from "./Tooltip";
import styles from "./chart.module.css";

const allData = sampleData.flatMap((month) =>
  month.days.map((day) => ({
    ...day,
    month: month.month,
  }))
);

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

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
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
                <CustomizedXAxisTick
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
              label={<CustomizedYAxisLabel />}
              type={"number"}
              tickCount={5}
              tick={<CustomizedYAxisTick />}
              fill="#525252"
              padding={{ bottom: 28 }}
              width={40}
              stroke="#CCC"
              strokeWidth={1}
            />
            <Line
              type="basis"
              dataKey="currentPrecipitation"
              name="Current Precipitation"
              stroke="#161616"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="basis"
              dataKey="historicalAverage"
              name="Historical Average"
              stroke="#5276FF"
              strokeDasharray="5 5"
              strokeWidth={3}
              dot={false}
            />
            <Area
              dataKey="optimalZone"
              name="Optimal Zone"
              fill="rgba(90, 187, 228, 0.15)"
              stroke="none"
              type="basis"
            />
            <Customized component={CustomizedXAxis} />
            <Tooltip content={<CustomTooltip />} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default CustomLineChart;
