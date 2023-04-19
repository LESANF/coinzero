import axios from "axios";

export const getSmallChartData = async (coinNmae: string): Promise<any> => {
  try {
    const result = await axios.get(`https://api.upbit.com/v1/candles/days`, {
      params: {
        market: coinNmae,
        to: new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, ""),
        count: 50,
      },
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
