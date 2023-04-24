import React, { useEffect, useState } from "react";
import Nav from "../Components/Home/Nav";
import styled from "styled-components";
import CoinSummary from "../Components/CoinLists/CoinSummary/CoinSummary";
import CoinChart from "../Components/CoinLists/CoinChart/CoinChart";
import SimpleSearch from "../Components/CoinLists/SimpleSearch/SimpleSearch";
import TradingVolume from "../Components/CoinLists/TradingVolume/TradingVolume";
import * as C from "../Components/Caution/SizeCaution";
import { useGetLiveData } from "../hooks/useGetLiveData";
import { getMarketCoins } from "../Api/coinInfo";
import Skeleton from "../Components/CoinLists/Utils/skeleton/Skeleton";
import { getSmallChartData } from "../Components/CoinLists/CoinSummary/Utils/getSmallChartData";

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
  grid-template-columns: 1000px 337px;
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
  const [liveDataTrade, setLiveDataTrade] = useState<any>();
  const [liveDataTicker, setLiveDataTicker] = useState<any>();
  const [coinNames, setCoinNames] = useState<any>([]);
  const wsCoin = "KRW-BTC";
  const getLiveData: any = JSON.stringify(useGetLiveData(wsCoin));
  const [lineData, setLineData] = useState<ICoinData[] | null | undefined>([]);

  useEffect(() => {
    if (getLiveData) {
      const parseLiveData = JSON.parse(getLiveData);
      const dataType = parseLiveData.type;
      if (dataType === "trade") setLiveDataTrade({ ...parseLiveData });
      if (dataType === "ticker") setLiveDataTicker({ ...parseLiveData });
    }
  }, [getLiveData]);

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
        const chartData = await getSmallChartData(wsCoin);
        setLineData(chartData);
      } catch (error) {
        console.log(`SmallChart Data Error: ${error}`);
      }
    };

    fetchChartData();
  }, []);

  return (
    <C.SizeCautionFrame>
      <ScreenMsg>모바일 환경은 지원하지 않아요 더 큰 화면에서 이용해주세요 😮‍💨</ScreenMsg>
      <Nav coinDetail={true} />
      <CoinListsFrame>
        {(liveDataTrade || liveDataTicker) && coinNames && lineData ? (
          <>
            <CoinSummary liveData={liveDataTicker} coinNames={coinNames} lineData={lineData}></CoinSummary>
            <CoinChart liveData={liveDataTicker} wsCoin={wsCoin}></CoinChart>
            <TradingVolume liveData={liveDataTrade} daysData={lineData.slice(0, 49)} coinName={wsCoin}></TradingVolume>
            <SimpleSearch></SimpleSearch>
          </>
        ) : (
          <Skeleton />
        )}
      </CoinListsFrame>
    </C.SizeCautionFrame>
  );
}

export default CoinLists;
