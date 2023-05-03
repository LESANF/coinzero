import React, { useEffect, useState } from "react";
import Nav from "../Components/Home/Nav";
import styled from "styled-components";
import CoinSummary from "../Components/CoinLists/CoinSummary/CoinSummary";
import CoinChart from "../Components/CoinLists/CoinChart/CoinChart";
import SimpleSearch from "../Components/CoinLists/SimpleSearch/SimpleSearch";
import SimpleSearch2 from "../Components/CoinLists/SimpleSearch/SimpleSearch2";
import TradingVolume from "../Components/CoinLists/TradingVolume/TradingVolume";
import * as C from "../Components/Caution/SizeCaution";
import { useGetLiveData } from "../hooks/useGetLiveData";
import { getMarketCoins } from "../Api/coinInfo";
import Skeleton from "../Components/CoinLists/Utils/skeleton/Skeleton";
import { getSmallChartData } from "../Components/CoinLists/CoinSummary/Utils/getSmallChartData";
import { useRecoilState, useRecoilValue } from "recoil";
import { marketCodesState, selectedCoinInfoState, selectedCoinState } from "../Components/CoinLists/TradingVolume/atom";
import { useFetchMarketCode } from "use-upbit-api";
import useGetWsData from "../hooks/useGetWsData/useGetWsData";

const CoinListsFrame = styled.div`
  box-sizing: border-box;
  margin-top: 68px;
  background-color: #fafafa;
  width: 1440px;
  margin: 70px auto 50px;
  height: 100vh;
  padding: 20px;
  display: grid;
  grid-template-areas:
    "summary tickerSearch"
    "chart tickerSearch"
    "tradingVolume tickerSearch";

  grid-template-rows: 128px 430px 330px;
  grid-template-columns: 1000px 400px;
  grid-gap: 25px;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const ScreenMsg = styled.span`
  font-size: 18px;
  color: white;
  @media screen and (min-width: 600px) {
    display: none;
  }
`;

interface ICoinData {
  market: string;
  candle_date_time_utc: string | null;
  candle_date_time_kst: string | null;
  opening_price: number | null;
  high_price: number | null;
  low_price: number | null;
  trade_price: number | null;
  timestamp: number | null;
  candle_acc_trade_price: number | null;
  candle_acc_trade_volume: number | null;
  prev_closing_price: number | null;
  change_price: number | null;
  change_rate: number | null;
}

function CoinLists() {
  const [searchCoin, setSearchCoin] = useRecoilState(selectedCoinState);

  //@ts-ignore
  const { wsData } = useGetWsData(searchCoin);
  const [renderTimer, setRenderTimer] = useState(false);
  const [liveDataTicker, setLiveDataTicker] = useState<any>();
  const [coinNames, setCoinNames] = useState<any>([]);
  const [lineData, setLineData] = useState<ICoinData[] | null | undefined>([]);
  const { marketCodes: fetchedMarketCode } = useFetchMarketCode();
  const [marketCodes, setMarketCodes] = useRecoilState<any>(marketCodesState);

  useEffect(() => {
    const MarketCodes_KRW = fetchedMarketCode.filter((code) => code.market.includes("KRW"));
    setMarketCodes(MarketCodes_KRW);
  }, [fetchedMarketCode]);

  useEffect(() => {
    setTimeout(() => setRenderTimer((prev: boolean) => !prev), 2000);
  }, []);

  useEffect(() => {
    const fetchCoinNames = async () => {
      const result = await getMarketCoins();
      setCoinNames(result);
    };

    fetchCoinNames();
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const chartData = await getSmallChartData(searchCoin[0].market);
        setLineData(chartData);
      } catch (error) {
        console.log(`SmallChart Data Error: ${error}`);
      }
    };

    fetchChartData();
  }, [searchCoin]);

  return (
    <C.SizeCautionFrame bgColor={window.location.href.includes("coins")}>
      <ScreenMsg>모바일 환경은 지원하지 않아요 더 큰 화면에서 이용해주세요 😮‍💨</ScreenMsg>
      <Nav coinDetail={true} />
      <CoinListsFrame>
        {coinNames && lineData && renderTimer ? (
          <>
            <CoinSummary coinNames={coinNames} lineData={lineData} />
            <CoinChart wsCoin={searchCoin[0].market} />
            <TradingVolume daysData={lineData.slice(0, 49)} coinName={searchCoin[0].market} />
            <SimpleSearch marketCodes={marketCodes} />
          </>
        ) : (
          <Skeleton />
        )}
      </CoinListsFrame>
    </C.SizeCautionFrame>
  );
}

export default React.memo(CoinLists);
