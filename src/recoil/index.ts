import { atom } from "recoil";
import { getMarketCoins } from "../Api/coinInfo";

interface coinName {
  market: string;
  korean_name: string;
  english_name: string;
}

const setDefaultCoinName = async () => {
  return await getMarketCoins();
};

export const coinNameInfo = atom<coinName[]>({
  key: "coinName",
  default: setDefaultCoinName(),
});
