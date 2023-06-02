import React from "react";
import styles from "../styles/loading-dots.module.css";

const LoadingDots = ({
}) => {
  const color = "#37f3ea";
  return (
    <div className="justify-center text-3xl font-bold p-1 inline-flex">
      <span className={styles.loading}>
        <span style={{ backgroundColor: color }} />
        <span style={{ backgroundColor: color }} />
        <span style={{ backgroundColor: color }} />
      </span>
    </div>
  );
};

export default LoadingDots;