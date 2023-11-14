import styles from "./page.module.css";
import CustomLineChart from "../components/CustomLineChart";
import Legend from "../components/Legend";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.pageContainer}>
        <div className={styles.chartContainer}>
          <CustomLineChart />
        </div>
        <div className={styles.legendContainer}>
          <Legend />
        </div>
      </div>
    </main>
  );
}
