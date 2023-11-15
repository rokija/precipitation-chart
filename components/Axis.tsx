import { Rectangle } from "recharts";
import { getRiskColor } from "../helpers";

export const CustomizedXAxis = (props: any) => {
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

    return (
      <Rectangle
        key={firstSeriesPoint.payload.month + index}
        width={index + 1 === length ? 0 : valWidth + 1}
        height={6}
        x={firstSeriesPoint.x}
        y={firstSeries.props.yAxis.height + 20}
        fill={getRiskColor(difference)}
      />
    );
  });
};
