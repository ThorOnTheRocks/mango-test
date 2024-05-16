import React from 'react';
import styles from './Spinner.module.css';

export function Spinner(): JSX.Element {
  return (
    <div
      className={styles.loadingContainer}
      role="alert"
      aria-label="loading"
    >
      <div className={styles.spinner}></div>
    </div>
  );
}
