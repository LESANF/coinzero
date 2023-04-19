import React, { useEffect, useState, lazy } from "react";
import styled from "styled-components";
import { useGetLiveData } from "../../../hooks/useGetLiveData";
import Loading from "../Utils/LoadingSpinner";
import * as C from "./styled";
import { getMarketCoins } from "../../../Api/coinInfo";
// import SmallChart from "./Utils/SmallChart";

const SmallChart = lazy(() => import("./Utils/SmallChart"));

const SummaryFrame = styled.div`
  position: relative;
  background-color: #fff;
  grid-area: summary;
  border-radius: 8px;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

function CoinSummary() {
  const [liveData, setLiveData] = useState<any>();
  const [coinNames, setCoinNames] = useState<any>([]);

  const wsCoin = "KRW-ANKR";

  // const coinNameBox = useRecoilValue(coinNameInfo);
  const getLiveData: any = JSON.stringify(useGetLiveData(wsCoin));

  useEffect(() => {
    if (getLiveData) {
      setLiveData({ ...JSON.parse(getLiveData) });
    }
  }, [getLiveData]);

  useEffect(() => {
    const fetchCoinNames = async () => {
      const result = await getMarketCoins();
      setCoinNames(result);
    };

    fetchCoinNames();
  }, []);

  console.log(liveData);

  return (
    <SummaryFrame>
      {liveData && getLiveData && coinNames && (
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
            <SmallChart changeValue={liveData.change} />
          </C.SmallChartFrame>
        </C.CurCoinFrame>
      )}
      <Loading loading={!liveData} size={80} />
    </SummaryFrame>
  );
}

export default CoinSummary;
