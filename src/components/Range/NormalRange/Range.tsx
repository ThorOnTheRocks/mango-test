'use client';

import Link from 'next/link';
import { useDragging, useRange } from '@/hooks';
import styles from '../Range.module.css';
import type { RangeProps } from './Range.types';

export function Range({ min, max }: RangeProps): JSX.Element {
  const {
    minValue,
    maxValue,
    minInput,
    maxInput,
    moveBulletWithKeyboard,
    updateMinInput,
    updateMaxInput,
    validateMinValue,
    validateMaxValue,
    startDragging,
    stopDragging,
    onDrag,
  } = useRange({ min, max });

  const sliderRef = useDragging({ onDrag, stopDragging });

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    validate: () => void
  ) => {
    if (event.key === 'Enter') {
      validate();
    }
  };

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

  const getPosition = (value: number) =>
    `${((value - min) / (max - min)) * 100}%`;

  return (
    <>
      <div className={styles.rangeContainer}>
        <input
          data-cy="min-input"
          className={styles.inputBox}
          type="number"
          value={minInput}
          onChange={(e) => updateMinInput(e.target.value)}
          onBlur={validateMinValue}
          onKeyDown={(e) => handleKeyDown(e, validateMinValue)}
          min={min}
          max={maxValue - 1}
        />
        <div
          className={styles.rangeLine}
          ref={sliderRef}
          data-cy="range-line"
        >
          <div
            className={styles.rangeTrack}
            style={{
              left: getPosition(minValue),
              width: `calc(${getPosition(maxValue)} - ${getPosition(
                minValue
              )})`,
            }}
            data-cy="range-track"
          ></div>
          <div
            className={styles.rangeBullet}
            style={{ left: getPosition(minValue) }}
            tabIndex={0}
            onMouseDown={() => startDragging('min')}
            onKeyDown={(e) => handleBulletKeyDown(e, 'min')}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={minValue}
            role="slider"
            data-cy="min-bullet"
          ></div>
          <div
            className={styles.rangeBullet}
            style={{ left: getPosition(maxValue) }}
            tabIndex={0}
            onMouseDown={() => startDragging('max')}
            onKeyDown={(e) => handleBulletKeyDown(e, 'max')}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={maxValue}
            role="slider"
            data-cy="max-bullet"
          ></div>
        </div>
        <input
          className={styles.inputBox}
          type="number"
          value={maxInput}
          onChange={(e) => updateMaxInput(e.target.value)}
          onBlur={validateMaxValue}
          onKeyDown={(e) => handleKeyDown(e, validateMaxValue)}
          min={minValue + 1}
          max={max}
          data-cy="max-input"
        />
      </div>
      <Link href="/" className={styles.link}>
        Go Back
      </Link>
    </>
  );
}
