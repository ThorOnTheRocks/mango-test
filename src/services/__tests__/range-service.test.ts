import { getMinMax, getFixedValues } from '../range-service';
import {
  MIN_MAX_QUERY,
  FIXED_RANGE_QUERY,
} from '../constants/range-service.constant';
import {
  MinMaxValues,
  FixedRangeValues,
} from '../range-service.types';

describe('RangeService', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('Should fetch min and max values successfully', async () => {
    const mockMinMaxData: MinMaxValues = { min: 1, max: 100 };

    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMinMaxData),
      } as Response)
    );

    const data = await getMinMax();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(MIN_MAX_QUERY);
    expect(data).toEqual(mockMinMaxData);
  });

  it('Should fetch fixed range values successfully', async () => {
    const mockFixedRangeData: FixedRangeValues = {
      rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
    };

    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockFixedRangeData),
      } as Response)
    );

    const data = await getFixedValues();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(FIXED_RANGE_QUERY);
    expect(data).toEqual(mockFixedRangeData);
  });

  it('Should throw an error when fetching min and max values fails', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );

    await expect(getMinMax()).rejects.toThrow(
      'Failed to fetch range data'
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(MIN_MAX_QUERY);
  });

  it('Should throw an error when fetching fixed range values fails', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );

    await expect(getFixedValues()).rejects.toThrow(
      'Failed to fetch range data'
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(FIXED_RANGE_QUERY);
  });
});
