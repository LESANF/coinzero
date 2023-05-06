import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { init, dispose, Chart } from "klinecharts";
import { getSmallChartData } from "../CoinSummary/Utils/getSmallChartData";
import { selectedCoinInfoState, selectedCoinState } from "../TradingVolume/atom";
import { useRecoilValue } from "recoil";

const ChartFrame = styled.div`
  background-color: #fff;
  border-radius: 8px;
  grid-area: chart;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const KlineContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;
  height: 430px;
  padding: 16px 6px 16px 16px;
`;
const KlineIndicatorChart = styled.div`
  display: flex;
  flex: 1;
`;

function CoinChart({ wsCoin }: any) {
  const selectedCoin: any[] = useRecoilValue(selectedCoinState);
  const selectedCoinInfo: any = useRecoilValue(selectedCoinInfoState);
  const chart = useRef<Chart | null>();
  const paneId = useRef<string>("");

  useEffect(() => {
    if (!chart.current) {
      chart.current = init("indicator-k-line");
      chart.current?.setStyles({
        candle: {
          bar: {
            upColor: "#c84a31",
            downColor: "#1261c4",
            noChangeColor: "#888888",
          },

          priceMark: {
            show: true,
            last: {
              show: true,
              upColor: "#c84a31",
              downColor: "#1261c4",
              noChangeColor: "#888888",
              line: {
                show: true,
                // 'solid' | 'dashed'
                dashedValue: [4, 4],
                size: 1,
              },
            },
          },
        },
        indicator: {
          ohlc: {
            upColor: "#c84a31",
            downColor: "#1261c4",
            noChangeColor: "#888888",
          },
          bars: [
            {
              borderSize: 1,
              borderDashedValue: [2, 2],
              upColor: "rgba(200, 74, 49, 0.5)",
              downColor: "rgba(18, 97, 196, 0.5)",
              noChangeColor: "#888888",
            },
          ],
        },
      });
    }
    if (!paneId.current) {
      paneId.current = chart.current?.createIndicator("VOL", false) as string;
    }
    const fetchData = async () => {
      const chartData = await getSmallChartData(wsCoin);
      chart.current?.applyNewData(chartData.reverse());
    };
    fetchData();

    return () => {
      dispose("indicator-k-line");
    };
  }, [selectedCoin]);

  useEffect(() => {
    if (selectedCoinInfo) {
      const updateLiveData = {
        open: selectedCoinInfo.opening_price,
        close: selectedCoinInfo.trade_price,
        high: selectedCoinInfo.high_price,
        low: selectedCoinInfo.low_price,
        volume: selectedCoinInfo.trade_volume,
        timestamp: Math.floor(selectedCoinInfo.timestamp / 24 / 60 / 60 / 1000) * 24 * 60 * 60 * 1000,
        turnover: ((selectedCoinInfo.opening_price + selectedCoinInfo.low_price + selectedCoinInfo.high_price + selectedCoinInfo.trade_price) / 4) * selectedCoinInfo.trade_volume,
      };
      chart.current?.updateData(updateLiveData);
    }

    return () => {
      dispose("indicator-k-line");
    };
  }, [selectedCoinInfo]);

  return (
    <ChartFrame>
      <KlineContainer>
        <KlineIndicatorChart id="indicator-k-line" />
      </KlineContainer>
    </ChartFrame>
  );
}

export default React.memo(CoinChart);
