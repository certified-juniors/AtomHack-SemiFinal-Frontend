import { CandleType, DeepPartial, Options, TooltipShowRule } from "klinecharts";

export const OPTIONS: DeepPartial<Options> = {
  styles: {
    candle: {
      type: CandleType.Area,
      tooltip: {
        showRule: TooltipShowRule.None
      }
    }
  }
}