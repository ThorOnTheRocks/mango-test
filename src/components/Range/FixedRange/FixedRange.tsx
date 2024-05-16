'use client';

import Link from 'next/link';
import { useDragging, useFixedRange } from '@/hooks';
import styles from '../Range.module.css';
import type { FixedRangeProps } from './FixedRange.types';

export function FixedRange({
  rangeValues,
}: FixedRangeProps): JSX.Element {
  const {
    values,
    minIndex,
    maxIndex,
    startDragging,
    stopDragging,
    onDrag,
  } = useFixedRange({ rangeValues });

  const sliderRef = useDragging({ onDrag, stopDragging });

  return (
    <>
      <div className={styles.rangeContainer}>
        <div className={styles.rangeLabel}>{values[minIndex]}</div>
        <div className={styles.rangeLine} ref={sliderRef}>
          <div
            className={styles.rangeTrack}
            style={{
              left: `${(minIndex / (values.length - 1)) * 100}%`,
              width: `${
                ((maxIndex - minIndex) / (values.length - 1)) * 100
              }%`,
            }}
          ></div>
          <div
            className={styles.rangeBullet}
            style={{
              left: `${(minIndex / (values.length - 1)) * 100}%`,
            }}
            onMouseDown={() => startDragging('min')}
            role="slider"
            aria-valuemin={values[minIndex]}
            aria-valuemax={values[maxIndex]}
            aria-valuenow={values[minIndex]}
          ></div>
          <div
            className={styles.rangeBullet}
            style={{
              left: `${(maxIndex / (values.length - 1)) * 100}%`,
            }}
            onMouseDown={() => startDragging('max')}
            role="slider"
            aria-valuemin={values[minIndex]}
            aria-valuemax={values[maxIndex]}
            aria-valuenow={values[maxIndex]}
          ></div>
        </div>
        <div className={styles.rangeLabel}>{values[maxIndex]}</div>
      </div>
      <Link href="/" className={styles.link}>
        Go Back
      </Link>
    </>
  );
}
