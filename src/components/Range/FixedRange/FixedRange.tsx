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
    moveBulletWithKeyboard,
    startDragging,
    stopDragging,
    onDrag,
  } = useFixedRange({ rangeValues });

  const sliderRef = useDragging({ onDrag, stopDragging });

  const handleBulletKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    bullet: 'min' | 'max'
  ) => {
    if (event.key === 'ArrowLeft') {
      moveBulletWithKeyboard(bullet, 'left');
    } else if (event.key === 'ArrowRight') {
      moveBulletWithKeyboard(bullet, 'right');
    }
  };

  return (
    <>
      <div className={styles.rangeContainer}>
        <div data-cy="min-label" className={styles.rangeLabel}>
          {values[minIndex]}
        </div>
        <div
          className={styles.rangeLine}
          ref={sliderRef}
          data-cy="range-line"
        >
          <div
            data-cy="range-track"
            className={styles.rangeTrack}
            style={{
              left: `${(minIndex / (values.length - 1)) * 100}%`,
              width: `${
                ((maxIndex - minIndex) / (values.length - 1)) * 100
              }%`,
            }}
          ></div>
          <div
            data-cy="min-bullet"
            className={styles.rangeBullet}
            style={{
              left: `${(minIndex / (values.length - 1)) * 100}%`,
            }}
            onMouseDown={() => startDragging('min')}
            onKeyDown={(e) => handleBulletKeyDown(e, 'min')}
            tabIndex={0}
            role="slider"
            aria-valuemin={values[minIndex]}
            aria-valuemax={values[maxIndex]}
            aria-valuenow={values[minIndex]}
          ></div>
          <div
            data-cy="max-bullet"
            className={styles.rangeBullet}
            style={{
              left: `${(maxIndex / (values.length - 1)) * 100}%`,
            }}
            onMouseDown={() => startDragging('max')}
            onKeyDown={(e) => handleBulletKeyDown(e, 'max')}
            tabIndex={0}
            role="slider"
            aria-valuemin={values[minIndex]}
            aria-valuemax={values[maxIndex]}
            aria-valuenow={values[maxIndex]}
          ></div>
        </div>
        <div data-cy="max-label" className={styles.rangeLabel}>
          {values[maxIndex]}
        </div>
      </div>
      <Link href="/" className={styles.link}>
        Go Back
      </Link>
    </>
  );
}
