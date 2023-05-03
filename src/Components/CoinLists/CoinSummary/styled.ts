import styled from "styled-components";

// Coin Symbol, name, curPrice
export const CurCoinFrame = styled.div`
  padding: 20px;
`;
export const CoinHead = styled.div`
  display: flex;
  align-items: center;
`;
export const CoinSymbol = styled.span`
  margin-right: 4px;
`;
export const CoinName = styled.span`
  margin-left: 4px;
  font-size: 18px;
  line-height: 1.25;
`;
export const CoinNameEng = styled.span`
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25px;
`;

export const CurCoinPriceFrame = styled.div<{ changeValue: string }>`
  display: flex;
  margin-top: 4px;
  align-items: center;
  color: ${(props) => (props.changeValue === "RISE" ? "#e12343" : props.changeValue === "FALL" ? "#1763b6" : "#333")};
`;
export const CurCoinPrice = styled.span`
  font-size: 28px;
  font-weight: 700;
  line-height: 1.25;
`;
export const CurCoinPricePercentage = styled.span`
  font-size: 16px;
  margin-left: 4px;
`;
export const CurCoinPriceDifference = styled.span<{ changeValueIcon: string }>`
  font-size: 16px;
  margin-left: 6px;
  padding-left: 14px;
  background: ${(props) =>
    props.changeValueIcon === "RISE"
      ? "url(https://cdn.upbit.com/upbit-web/images/ico_up.fd2ee8d.png) 0 no-repeat"
      : props.changeValueIcon === "FALL"
      ? "url(https://cdn.upbit.com/upbit-web/images/ico_down.fb7ecf8.png) 0 no-repeat"
      : ""};
`;

// High, Low, The Day Before Price, share volume(거래량 24h), trade value volume(거래대금 24h)
export const CoinHLBSTFrame = styled.div``;
export const CoinHLBST = styled.ul`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 8px;
  li:first-child dt {
    margin-left: 0;
  }
`;

//#9e9e9e
export const CoinPriceInfo = styled.li`
  display: flex;
`;

export const CoinDl = styled.dl`
  display: flex;
`;
export const CoinDt = styled.dt`
  color: #9e9e9e;
  margin: 0 4px 0 14px;
`;
export const CoinDd = styled.dd<{ priceState?: string }>`
  color: ${(props) => (props.priceState === "HIGH" ? "#e12343" : props.priceState === "LOW" ? "#1763b6" : "#333")};
`;
export const CoinUnit = styled.span`
  margin-left: 1px;
  color: #9e9e9e;
`;

// 미니 차트 (fill)
export const SmallChartFrame = styled.div`
  position: absolute;
  top: 20px;
  right: 25px;
`;
