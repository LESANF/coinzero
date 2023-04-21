import axios from "axios";

export const getSmallChartData = async (coinNmae: string): Promise<any> => {
  try {
    const result = await axios
      .get(`https://api.upbit.com/v1/candles/days`, {
        params: {
          market: coinNmae,
          to: new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, ""),
          count: 200,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        return data.map((item: any) => {
          const { opening_price, low_price, high_price, trade_price, timestamp, candle_acc_trade_volume, candle_date_time_kst } = item;

          return {
            candle_date_time_kst,
            open: opening_price,
            low: low_price,
            high: high_price,
            close: trade_price,
            volume: candle_acc_trade_volume,
            // 오전 9시 기준 일봉
            timestamp: Math.floor(timestamp / 24 / 60 / 60 / 1000) * 24 * 60 * 60 * 1000,
            turnover: ((opening_price + low_price + high_price + trade_price) / 4) * candle_acc_trade_volume,
          };
        });
      });

    return result;
  } catch (error) {
    console.log(error);
  }
};
