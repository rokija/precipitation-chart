import styles from "./page.module.css";
import Chart from "../components/Chart";
import Legend from "../components/Legend";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.pageContainer}>
        <div className={styles.chartContainer}>
          <Chart />
        </div>
        <div className={styles.legendContainer}>
          <Legend />
        </div>
      </div>
    </main>
  );
}
