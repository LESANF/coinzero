import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { init, dispose, Chart } from "klinecharts";
import { getSmallChartData } from "../CoinSummary/Utils/getSmallChartData";

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

function CoinChart({ liveData, wsCoin }: any) {
  const chart = useRef<Chart | null>();
  const paneId = useRef<string>("");

  useEffect(() => {
    chart.current = init("indicator-k-line");
    paneId.current = chart.current?.createIndicator("VOL", false) as string;

    const fetchData = async () => {
      const chartData = await getSmallChartData(wsCoin);
      chart.current?.applyNewData(chartData.reverse());
    };
    fetchData();

    return () => {
      dispose("indicator-k-line");
    };
  }, []);

  useEffect(() => {
    if (liveData) {
      const updateLiveData = {
        open: liveData.opening_price,
        close: liveData.trade_price,
        high: liveData.high_price,
        low: liveData.low_price,
        volume: liveData.trade_volume,
        timestamp: Math.floor(liveData.timestamp / 24 / 60 / 60 / 1000) * 24 * 60 * 60 * 1000,
        turnover: ((liveData.opening_price + liveData.low_price + liveData.high_price + liveData.trade_price) / 4) * liveData.trade_volume,
      };
      chart.current?.updateData(updateLiveData);
    }
  }, [liveData]);

  return (
    <ChartFrame>
      <KlineContainer>
        <KlineIndicatorChart id="indicator-k-line" />
      </KlineContainer>
    </ChartFrame>
  );
}

export default React.memo(CoinChart);
