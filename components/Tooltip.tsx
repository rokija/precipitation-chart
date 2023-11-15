import styles from "./tooltip.module.css";
import { getRiskColor } from "../helpers";
import { Historical, Optimal, Current } from "./Legend";

type Payload = {
  currentPrecipitation: number;
  day: number;
  month: string;
  historicalAverage: number;
  optimalZone: number[];
};

type Value = {
  dataKey: string;
  chartType?: any;
  color?: string;
  fill?: string;
  formatter?: any;
  name?: string;
  payload: Payload;
  stroke?: string;
  strokeWidth?: number | string;
  type?: any;
  unit?: any;
  value?: string | number | string[] | number[];
};

export const CustomTooltip = (props: any) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const difference = Math.abs(
      payload[0].payload.historicalAverage -
        payload[0].payload.currentPrecipitation
    );

    const month = payload[0].payload.month;
    const day = payload[0].payload.day;

    const color = getRiskColor(difference);

    return (
      <div className={styles.tooltip}>
        <div className={styles.label}>
          {month} {day}
          <div
            style={{ backgroundColor: color }}
            className={styles.rectangle}
          ></div>
        </div>
        {payload.map((val: Value) => {
          let icon = <Historical />;

          if (val.dataKey === "currentPrecipitation") {
            icon = <Current />;
          }

          if (val.dataKey === "optimalZone") {
            icon = <Optimal />;
          }

          return (
            <p key={val.dataKey} className={styles.dataKey}>
              {icon}
              {val.name}
              {": "}{" "}
              {Array.isArray(val.value)
                ? `[${val.value.map((v) => `${v}`)}]`
                : val.value}
            </p>
          );
        })}
      </div>
    );
  }

  return null;
};
