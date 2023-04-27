import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { selectedCoinState } from "../TradingVolume/atom";
import * as C from "./styled";
import SmallChart from "./Utils/SmallChart";

const SummaryFrame = styled.div`
  position: relative;
  background-color: #fff;
  grid-area: summary;
  border-radius: 8px;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

function CoinSummary({ liveData, coinNames, lineData }: any) {
  const selectedCoin = useRecoilValue(selectedCoinState);

  return (
    <SummaryFrame>
      {liveData && coinNames && lineData && (
        <C.CurCoinFrame>
          <C.CoinHead>
            <C.CoinSymbol>
              <img
                src={`https://static.upbit.com/logos/${liveData.code.split("-")[1].toUpperCase()}.png`}
                alt={liveData.code.split("-")[1]}
                title={liveData.code.split("-")[1]}
                style={{
                  height: "24px",
                  width: "24px",
                  verticalAlign: "middle",
                }}
              />
            </C.CoinSymbol>
            <C.CoinNameEng>{`${liveData.code.split("-")[1]}`}</C.CoinNameEng>
            <C.CoinName>{`${coinNames.filter((names: any) => names.market === liveData.code)[0].korean_name}`}</C.CoinName>
          </C.CoinHead>
          <C.CurCoinPriceFrame changeValue={liveData.change}>
            <C.CurCoinPrice>{liveData.trade_price.toLocaleString("ko-KR")}</C.CurCoinPrice>
            <C.CurCoinPricePercentage>{`${+(((liveData.trade_price - liveData.prev_closing_price) / liveData.prev_closing_price) * 100).toFixed(2)}%`}</C.CurCoinPricePercentage>
            <C.CurCoinPriceDifference
              changeValueIcon={liveData.trade_price - liveData.prev_closing_price > 0 ? "RISE" : liveData.trade_price - liveData.prev_closing_price === 0 ? "EVEN" : "FALL"}
            >{`(${
              (liveData.trade_price - liveData.prev_closing_price) % 1 === 0 ? liveData.trade_price - liveData.prev_closing_price : (liveData.trade_price - liveData.prev_closing_price).toFixed(2)
            })`}</C.CurCoinPriceDifference>
          </C.CurCoinPriceFrame>
          <C.CoinHLBSTFrame>
            <C.CoinHLBST>
              <C.CoinPriceInfo>
                <C.CoinDl>
                  <C.CoinDt>고가</C.CoinDt>
                  <C.CoinDd priceState="HIGH">{liveData.high_price.toLocaleString("ko-KR")}</C.CoinDd>
                </C.CoinDl>
              </C.CoinPriceInfo>
              <C.CoinPriceInfo>
                <C.CoinDl>
                  <C.CoinDt>저가</C.CoinDt>
                  <C.CoinDd priceState="LOW">{liveData.low_price.toLocaleString("ko-KR")}</C.CoinDd>
                </C.CoinDl>
              </C.CoinPriceInfo>
              <C.CoinPriceInfo>
                <C.CoinDl>
                  <C.CoinDt>전일가</C.CoinDt>
                  <C.CoinDd>{liveData.prev_closing_price.toLocaleString("ko-KR")}</C.CoinDd>
                </C.CoinDl>
              </C.CoinPriceInfo>
              <C.CoinPriceInfo>
                <C.CoinDl>
                  <C.CoinDt>거래량(24h)</C.CoinDt>
                  <C.CoinDd>
                    <span>{liveData.acc_trade_volume_24h.toLocaleString("ko-KR")}</span>
                    <C.CoinUnit>{`${liveData.code.split("-")[1]}`}</C.CoinUnit>
                  </C.CoinDd>
                </C.CoinDl>
              </C.CoinPriceInfo>
              <C.CoinPriceInfo>
                <C.CoinDt>거래대금(24h)</C.CoinDt>
                <C.CoinDd>
                  <span>{liveData.acc_trade_price_24h.toLocaleString("ko-KR")}</span>
                  <C.CoinUnit>KRW</C.CoinUnit>
                </C.CoinDd>
              </C.CoinPriceInfo>
            </C.CoinHLBST>
          </C.CoinHLBSTFrame>
          <C.SmallChartFrame>
            <SmallChart changeValue={liveData.change} lineData={lineData.slice(0, 49)} />
          </C.SmallChartFrame>
        </C.CurCoinFrame>
      )}
    </SummaryFrame>
  );
}

export default React.memo(CoinSummary);
