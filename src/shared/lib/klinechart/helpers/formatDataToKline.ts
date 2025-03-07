import type { KLineData } from 'klinecharts';

import type { DataType } from '../types';

export const formatDataToKline = (data: DataType[]): KLineData[] =>
  data.map(({ value, timestamp }) => ({
    open: value,
    high: value,
    low: value,
    close: value,
    volume: 0,
    timestamp
  }));
