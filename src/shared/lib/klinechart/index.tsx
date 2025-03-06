import { dispose, init } from 'klinecharts';
import { useEffect } from 'react';

import { OPTIONS } from './constants/options';
import { formatDataToKline } from './helpers/formatDataToKline';
import type { ChartStylesType, DataType } from './types';

type ChartProps = {
    id: string;
    data: DataType[];
    style: ChartStylesType;
};

export const Chart = ({ id, data = [], style }: ChartProps) => {
    useEffect(() => {
        const chart = init(id, OPTIONS);

        if (chart) {
            chart.applyNewData(formatDataToKline(data));
        }

        return () => {
            dispose(id);
        };
    }, [id, data]);

  return (
    <div id={id} style={style} />
  )
}
