import { memo } from "react";

export const CustomizedXAxisTick = memo(function CustomizedXAxisTick(
  props: any
) {
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
          dy={12}
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

export const CustomizedYAxisTick = memo(function CustomizedYAxisTick(
  props: any
) {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        fontSize={12}
        fontFamily="Inter"
        fontWeight={500}
        x={-26}
        y={6}
        textAnchor="start"
        fill={"#525252"}
        color={"#525252"}
      >
        {`${payload.value} in.`}
      </text>
    </g>
  );
});

export const CustomizedYAxisLabel = memo(function CustomizedYAxisLabel(
  props: any
) {
  const { viewBox } = props;

  return (
    <g transform={`translate(${viewBox.x - 20},${viewBox.height + 25})`}>
      <text
        fontSize={10}
        fontFamily="Inter"
        fontWeight={500}
        x={0}
        y={0}
        textAnchor="start"
        fill={"#161616"}
        color={"#161616"}
      >
        <tspan x={30} y={0}>
          Risk
        </tspan>
      </text>
    </g>
  );
});
