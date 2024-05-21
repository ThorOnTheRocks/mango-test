import {
  MinMaxValues,
  FixedRangeValues,
} from './range-service.types';
import {
  MIN_MAX_QUERY,
  FIXED_RANGE_QUERY,
} from './constants/range-service.constant';

async function fetchRangeData<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch range data');
  }

  const data: T = await res.json();
  return data;
}

export async function getMinMax(): Promise<MinMaxValues> {
  return await fetchRangeData<MinMaxValues>(MIN_MAX_QUERY);
}

export async function getFixedValues(): Promise<FixedRangeValues> {
  return await fetchRangeData<FixedRangeValues>(FIXED_RANGE_QUERY);
}
