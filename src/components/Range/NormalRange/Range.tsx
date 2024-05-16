'use client';

import Link from 'next/link';
import { useDragging, useRange } from '@/hooks';
import styles from '../Range.module.css';
import type { RangeProps } from './Range.types';

export function Range({ min, max }: RangeProps): JSX.Element {
  const {
    minValue,
    maxValue,
    updateMinValue,
    updateMaxValue,
    startDragging,
    stopDragging,
    onDrag,
  } = useRange({ min, max });

  const sliderRef = useDragging({ onDrag, stopDragging });

  const getPosition = (value: number) =>
    `${((value - min) / (max - min)) * 100}%`;

  return (
    <>
      <div className={styles.rangeContainer}>
        <input
          className={styles.inputBox}
          type="number"
          value={minValue}
          onChange={(e) => updateMinValue(Number(e.target.value))}
          min={min}
          max={maxValue - 1}
        />
        <div className={styles.rangeLine} ref={sliderRef}>
          <div
            className={styles.rangeTrack}
            style={{
              left: getPosition(minValue),
              width: `calc(${getPosition(maxValue)} - ${getPosition(
                minValue
              )})`,
            }}
          ></div>
          <div
            className={styles.rangeBullet}
            style={{ left: getPosition(minValue) }}
            onMouseDown={() => startDragging('min')}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={minValue}
            role="slider"
          ></div>
          <div
            className={styles.rangeBullet}
            style={{ left: getPosition(maxValue) }}
            onMouseDown={() => startDragging('max')}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={maxValue}
            role="slider"
          ></div>
        </div>
        <input
          className={styles.inputBox}
          type="number"
          value={maxValue}
          onChange={(e) => updateMaxValue(Number(e.target.value))}
          min={minValue + 1}
          max={max}
        />
      </div>
      <Link href="/" className={styles.link}>
        Go Back
      </Link>
    </>
  );
}
