import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { selectedCoinInfoState, selectedCoinState } from "../TradingVolume/atom";
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

function CoinSummary({ coinNames, lineData }: any) {
  const selectedCoin: any[] = useRecoilValue(selectedCoinState);
  const selectedCoinInfo: any = useRecoilValue(selectedCoinInfoState);
  return (
    <SummaryFrame>
      {selectedCoin && selectedCoinInfo && selectedCoin.length > 0 && selectedCoinInfo !== undefined && (
        <C.CurCoinFrame>
          <C.CoinHead>
            <C.CoinSymbol>
              <img
                src={`https://static.upbit.com/logos/${selectedCoin[0].market.split("-")[1].toUpperCase()}.png`}
                alt={selectedCoin[0].market.split("-")[1]}
                title={selectedCoin[0].market.split("-")[1]}
                style={{
                  height: "24px",
                  width: "24px",
                  verticalAlign: "middle",
                }}
              />
            </C.CoinSymbol>
            <C.CoinNameEng>{`${selectedCoinInfo.code?.split("-")[1]}`}</C.CoinNameEng>
            <C.CoinName>{selectedCoin[0].korean_name}</C.CoinName>
          </C.CoinHead>
          <C.CurCoinPriceFrame changeValue={selectedCoinInfo.change}>
            <C.CurCoinPrice>{selectedCoinInfo.trade_price?.toLocaleString("ko-KR")}</C.CurCoinPrice>
            <C.CurCoinPricePercentage>{`${+(((selectedCoinInfo?.trade_price - selectedCoinInfo?.prev_closing_price) / selectedCoinInfo?.prev_closing_price) * 100).toFixed(
              2
            )}%`}</C.CurCoinPricePercentage>
            <C.CurCoinPriceDifference
              changeValueIcon={
                selectedCoinInfo?.trade_price - selectedCoinInfo?.prev_closing_price > 0 ? "RISE" : selectedCoinInfo?.trade_price - selectedCoinInfo?.prev_closing_price === 0 ? "EVEN" : "FALL"
              }
            >{`(${
              (selectedCoinInfo?.trade_price - selectedCoinInfo?.prev_closing_price) % 1 === 0
                ? selectedCoinInfo?.trade_price - selectedCoinInfo?.prev_closing_price
                : (selectedCoinInfo?.trade_price - selectedCoinInfo?.prev_closing_price).toFixed(2)
            })`}</C.CurCoinPriceDifference>
          </C.CurCoinPriceFrame>
          <C.CoinHLBSTFrame>
            <C.CoinHLBST>
              <C.CoinPriceInfo>
                <C.CoinDl>
                  <C.CoinDt>고가</C.CoinDt>
                  <C.CoinDd priceState="HIGH">{selectedCoinInfo.high_price?.toLocaleString("ko-KR")}</C.CoinDd>
                </C.CoinDl>
              </C.CoinPriceInfo>
              <C.CoinPriceInfo>
                <C.CoinDl>
                  <C.CoinDt>저가</C.CoinDt>
                  <C.CoinDd priceState="LOW">{selectedCoinInfo.low_price?.toLocaleString("ko-KR")}</C.CoinDd>
                </C.CoinDl>
              </C.CoinPriceInfo>
              <C.CoinPriceInfo>
                <C.CoinDl>
                  <C.CoinDt>전일가</C.CoinDt>
                  <C.CoinDd>{selectedCoinInfo.prev_closing_price?.toLocaleString("ko-KR")}</C.CoinDd>
                </C.CoinDl>
              </C.CoinPriceInfo>
              <C.CoinPriceInfo>
                <C.CoinDl>
                  <C.CoinDt>거래량(24h)</C.CoinDt>
                  <C.CoinDd>
                    <span>{selectedCoinInfo.acc_trade_volume_24h?.toLocaleString("ko-KR")}</span>
                    <C.CoinUnit>{`${selectedCoinInfo.code?.split("-")[1]}`}</C.CoinUnit>
                  </C.CoinDd>
                </C.CoinDl>
              </C.CoinPriceInfo>
              <C.CoinPriceInfo>
                <C.CoinDt>거래대금(24h)</C.CoinDt>
                <C.CoinDd>
                  <span>{selectedCoinInfo.acc_trade_price_24h?.toLocaleString("ko-KR")}</span>
                  <C.CoinUnit>KRW</C.CoinUnit>
                </C.CoinDd>
              </C.CoinPriceInfo>
            </C.CoinHLBST>
          </C.CoinHLBSTFrame>
          <C.SmallChartFrame>
            <SmallChart changeValue={selectedCoinInfo.change} lineData={lineData.slice(0, 49)} />
          </C.SmallChartFrame>
        </C.CurCoinFrame>
      )}
    </SummaryFrame>
  );
}

export default React.memo(CoinSummary);
