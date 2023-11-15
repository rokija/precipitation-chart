import styles from "./legend.module.css";

export const Historical = () => (
  <svg
    width="16"
    height="3"
    viewBox="0 0 16 3"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      y1="1.5"
      x2="16"
      y2="1.5"
      stroke="#3962FB"
      strokeWidth="2"
      strokeDasharray="2 2"
    />
  </svg>
);

export const Current = () => (
  <svg
    width="16"
    height="4"
    viewBox="0 0 16 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line y1="2" x2="16" y2="2" stroke="black" strokeWidth="3" />
  </svg>
);

export const Optimal = () => (
  <svg
    width="16"
    height="13"
    viewBox="0 0 16 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="16" height="13" rx="5" fill="#E6F5FB" />
  </svg>
);

const Legend = () => {
  return (
    <div>
      <h2 className={styles.legendTitle}>Legend</h2>
      <div className={styles.legendContent}>
        <div className={styles.legendGroup}>
          <div className={styles.legendItem}>
            <Historical />
            Historical Average (10yr)
          </div>
          <div className={styles.legendItem}>
            <Current />
            Current Precip.
          </div>
          <div className={styles.legendItem}>
            <Optimal />
            Optimal Precip. Zone
          </div>
        </div>

        <h3 className={styles.scoreTitle}>Daily Precipitation Score</h3>

        <div className={styles.legendGroup}>
          <div className={styles.legendItem}>
            <div className={styles.red}></div>
            High Risk
          </div>
          <div className={styles.legendItem}>
            <div className={styles.yellow}></div>
            Moderate Risk
          </div>
          <div className={styles.legendItem}>
            <div className={styles.green}></div>
            Low Risk
          </div>
        </div>
      </div>

      <p className={styles.paragraph}>
        The daily precipitation risk score is based on your location’s current
        precipitation levels and how much they differ from the historical
        average.
      </p>
    </div>
  );
};

export default Legend;
