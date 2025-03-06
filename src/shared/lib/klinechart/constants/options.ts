import type { DeepPartial, Options } from 'klinecharts';
import { CandleType, TooltipShowRule } from 'klinecharts';

export const OPTIONS: DeepPartial<Options> = {
    styles: {
        candle: {
            type: CandleType.Area,
            tooltip: {
                showRule: TooltipShowRule.None,
            },
        },
    },
};
