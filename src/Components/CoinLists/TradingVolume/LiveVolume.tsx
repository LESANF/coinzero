import { cloneDeep } from "lodash";
import { memo, useEffect, useRef, useState, useMemo } from "react";
import { useTable } from "react-table";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useWsTrade } from "use-upbit-api";
import { selectedCoinInfoState, selectedCoinState } from "./atom";
import * as L from "./styled";

const timestampToTime = (timestamp: number) => {
  const time = new Date(timestamp);
  let month: string | number = time.getMonth() + 1;
  let day: string | number = time.getDate();
  let hour: string | number = time.getHours();
  let minute: string | number = time.getMinutes();

  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;

  const monthDay = `${month}.${day}`;
  const hourMin = `${hour}:${minute}`;

  return [monthDay, hourMin];
};

interface ImarketCodes {
  market: string;
  korean_name: string;
  english_name: string;
}

function LiveVolume() {
  const selectedCoin: any = useRecoilValue(selectedCoinState);
  const selectedCoinInfo: any = useRecoilValue(selectedCoinInfoState);
  //@ts-ignore
  const { socketData } = useWsTrade(...selectedCoin);
  const [fetchedData, setFetchedData] = useState<any>([]);
  const preFetchedCount = useRef(30);
  const removedLength = useRef(0);

  // Upbit 체결 내역 fetch 함수
  const options = { method: "GET", headers: { Accept: "application/json" } };
  async function fetchTradeHistory(marketCode: string, count: number) {
    try {
      const response = await fetch(`https://api.upbit.com/v1/trades/ticks?market=${marketCode}&count=${count}`, options);
      const result = await response.json();

      setFetchedData(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (selectedCoin) {
      fetchTradeHistory(selectedCoin[0].market, preFetchedCount.current);
      return () => {
        setFetchedData(null);
      };
    }
  }, [selectedCoin]);

  useEffect(() => {
    if (socketData && fetchedData) {
      if (socketData.length > 0 && fetchedData.length > 0) {
        const curRemoveLength = socketData.length - removedLength.current;
        setFetchedData((prev: any) => {
          const data = cloneDeep(prev);
          for (let i = 0; i < curRemoveLength; i++) {
            data.pop();
          }
          return data;
        });
        removedLength.current = removedLength.current + curRemoveLength;
      }
    }
  }, [socketData]);

  return (
    <L.LiveVolumeFrame>
      <L.LiveVolumeHeader>
        <L.LiveVolumeHeaderItem>체결시간</L.LiveVolumeHeaderItem>
        <L.LiveVolumeHeaderItem>체결가격(KRW)</L.LiveVolumeHeaderItem>
        <L.LiveVolumeHeaderItem>{`체결량(${selectedCoin[0].market.split("-")[1]})`}</L.LiveVolumeHeaderItem>
        <L.LiveVolumeHeaderItem>체결금액(KRW)</L.LiveVolumeHeaderItem>
      </L.LiveVolumeHeader>
      <L.LiveVolumeDataBox>
        {socketData &&
          [...socketData].reverse().map((data, index) => (
            <L.LiveVolumeRow key={index}>
              <L.LiveVolumeTime>
                <div>
                  {timestampToTime(data.trade_timestamp)[0]}
                  <i style={{ paddingLeft: "4px", fontSize: "11px", color: "#666" }}>{timestampToTime(data.trade_timestamp)[1]}</i>
                </div>
              </L.LiveVolumeTime>
              <L.LiveVolumePrice changeValue={data.change}>{data.trade_price ? data.trade_price.toLocaleString("ko-KR") : null}</L.LiveVolumePrice>
              <L.LiveVolumeSize tradeType={data.ask_bid}>{data.trade_volume}</L.LiveVolumeSize>
              <L.LiveVolumeSize tradeType={data.ask_bid}>{Math.ceil(data.trade_price * data.trade_volume).toLocaleString("ko-KR")}</L.LiveVolumeSize>
            </L.LiveVolumeRow>
          ))}
        {fetchedData &&
          fetchedData.slice(2).map((data: any, index: number) => (
            <L.LiveVolumeRow key={index}>
              <L.LiveVolumeTime>
                <div>
                  {timestampToTime(data.timestamp)[0]}
                  <i style={{ paddingLeft: "4px", fontSize: "11px", color: "#666" }}>{timestampToTime(data.timestamp)[1]}</i>
                </div>
              </L.LiveVolumeTime>
              <L.LiveVolumePrice changeValue={selectedCoinInfo.change}>{data.trade_price ? data.trade_price.toLocaleString("ko-KR") : null}</L.LiveVolumePrice>
              <L.LiveVolumeSize tradeType={data.ask_bid}>{data.trade_volume}</L.LiveVolumeSize>
              <L.LiveVolumeSize tradeType={data.ask_bid}>{Math.ceil(data.trade_price * data.trade_volume).toLocaleString("ko-KR")}</L.LiveVolumeSize>
            </L.LiveVolumeRow>
          ))}
      </L.LiveVolumeDataBox>
    </L.LiveVolumeFrame>
  );
}

export default memo(LiveVolume);
