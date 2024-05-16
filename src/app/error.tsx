'use client';

import React from 'react';
import styles from './error.module.css';
import type { ErrorProps } from '@/types/common.types';

function Error({ error, reset }: ErrorProps): JSX.Element {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h2>Oops! Something went wrong.</h2>
        <p>We&apos;re sorry, but an unexpected error has occurred.</p>
        <p className={styles.errorMessage}>{error.message}</p>
        <button className={styles.retryButton} onClick={reset}>
          Try Again
        </button>
      </div>
    </div>
  );
}

export default Error;
