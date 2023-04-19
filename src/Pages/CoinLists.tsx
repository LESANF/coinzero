import React from "react";
import Nav from "../Components/Home/Nav";
import styled from "styled-components";
import CoinSummary from "../Components/CoinLists/CoinSummary/CoinSummary";
import CoinChart from "../Components/CoinLists/CoinChart/CoinChart";
import SimpleSearch from "../Components/CoinLists/SimpleSearch/SimpleSearch";
import TradingVolume from "../Components/CoinLists/TradingVolume/TradingVolume";
import * as C from "../Components/Caution/SizeCaution";

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

function CoinLists() {
  return (
    <C.SizeCautionFrame>
      <ScreenMsg>모바일 환경은 지원하지 않아요 더 큰 화면에서 이용해주세요 😮‍💨</ScreenMsg>
      <Nav coinDetail={true} />
      <CoinListsFrame>
        <CoinSummary></CoinSummary>
        <CoinChart></CoinChart>
        <TradingVolume></TradingVolume>
        <SimpleSearch></SimpleSearch>
      </CoinListsFrame>
    </C.SizeCautionFrame>
  );
}

export default CoinLists();
