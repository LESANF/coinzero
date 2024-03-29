import styled from "styled-components";
import { CgSearch } from "react-icons/cg";
import { VscArrowSwap } from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import { getMarketCoins, getDetailCoin, ICoin, ICoinDetail, IAssignCoin, getBtcAccPrice } from "../../Api/coinInfo";
import { useQuery } from "react-query";
import { getCombine } from "../../Utils/CombineCoinData";
import GoReadme from "./GoReadme";
import { selectedCoinState } from "../CoinLists/TradingVolume/atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const MainLeftFrame = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  grid-area: item3;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

//Header
const HeaderTitle = styled.p`
  line-height: 1.5;
  font-size: 22px;
  color: #1772f8;
`;

//Live Trade Cost
const TradeCost = styled.div`
  display: flex;
  margin-top: 5px;
  align-items: center;
  font-size: 17px;
  color: #1772f8;
`;

const Cost = styled.span`
  font-size: 12px;
  font-weight: 700;
  &:after {
    content: " 원";
  }
  margin-right: 5px;
`;

//Search Input
const SearchZone = styled.div`
  position: relative;
  width: 100%;
  height: 36px;
  margin-top: 16px;
`;
const SearchInput = styled.input.attrs({ placeholder: "가상자산 검색" })`
  width: 100%;
  height: 36px;
  box-sizing: border-box;
  padding: 0 48px 0 16px;
  border-radius: 6px;
  border: 1px solid #1772f8;
  font-size: 14px;
  outline: 0;
`;

const SearchIcon = styled.span`
  position: absolute;
  top: calc(50% - 10px);
  right: 15px;
  font-size: 20px;
  color: #484d55;
`;

//Automatic Search
const AutoSearch = styled.div`
  position: absolute;
  border-radius: 3px;
  box-shadow: 0 3px 10px 0 rgb(66 66 66 / 5%);
  width: 400px;
  z-index: 100;
  background-color: #fff;
`;
const CoinList = styled.ul`
  padding: 8px 0;
`;

const Coin = styled.li`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 56px;
  font-size: 14px;
  color: #18191c;
`;

const CoinName = styled.span`
  display: flex;
  flex-direction: column;
`;
const TickerName = styled.span`
  font-size: 14px;
  font-weight: 700;
  text-align: left;
`;

const CoinIcon = styled.span`
  margin-right: 4px;
`;
const CoinSymbol = styled.span``;

const FullName = styled.span`
  margin-top: 4px;
  font-size: 12px;
  color: #79818f;
  text-align: left;
`;

const CoinPrice = styled.span<{ upDownColor: string }>`
  flex: 1;
  margin-left: 24px;
  text-align: right;
  color: ${(props) => (props.upDownColor === "RISE" ? "#e12343" : props.upDownColor === "FALL" ? "#1763b6" : "black")};
`;
const CoinUpDown = styled.span<{ upDownColor: string; positiveChk: boolean }>`
  width: 80px;
  text-align: right;
  color: ${(props) => (props.upDownColor === "RISE" ? "#e12343" : props.upDownColor === "FALL" ? "#1763b6" : "black")};
  &:after {
    content: " %";
  }
  &:before {
    content: "${(props) => (props.positiveChk ? "+" : "")}";
  }
`;
const CoinTrade = styled.span`
  margin-left: 19px;
  margin-right: 5px;
`;

function QuickSearch() {
  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCoinState);
  const navigate = useNavigate();
  //input value
  const [searchValue, setSearchValue] = useState("");
  //KRW코인만 필터링
  const [coinInfo, setCoinInfo] = useState<ICoin[]>([]);
  //현재가정보API 인자로 던져줄 코인리스트
  const [coinAutoList, setCoinAutoList] = useState<string[]>([]);
  //전체 코인 API
  const { data, isLoading } = useQuery<ICoin[]>("CoinAll", getMarketCoins);
  //현재가 코인 정보 API
  const { data: detailCoin, isLoading: isLoadingDetail } = useQuery<ICoinDetail[] | null>(["CoinDetail", coinAutoList], () => getDetailCoin(coinAutoList.join(",")));
  //BTC 24시간 누적거래대금
  const { data: btcAccPrice, isLoading: isLoadingBtc } = useQuery<ICoinDetail[]>("btcAccPrice", getBtcAccPrice, {
    //refetchInterval: 2000,
  });

  let filterKrw: ICoin[];
  if (data && !isLoading) {
    filterKrw = data.filter((v: ICoin) => v.market.includes("KRW"));
  }

  //input value로 필터링된 코인
  const coinUpdate = (keyWord: string) => {
    setCoinInfo(
      filterKrw
        .filter((v: ICoin) => {
          return v.market.toLowerCase().includes(keyWord.toLowerCase()) || v.korean_name.includes(keyWord);
        })
        .slice(0, 5)
    );
  };

  //automatic search
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchValue && searchValue.trim().length > 0) coinUpdate(searchValue);
      else setCoinInfo([]);
    }, 200);

    return () => clearTimeout(debounce);
  }, [searchValue]);

  //automatic coin price data
  useEffect(() => {
    if (coinInfo.length > 0) {
      setCoinAutoList([]);
      coinInfo.map((v) => setCoinAutoList((prev: string[]) => [...prev, v.market]));
    }
  }, [coinInfo]);

  //input onChange event
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  let combineObj: IAssignCoin[] = [];
  if (detailCoin && !isLoadingDetail && !isLoading) combineObj = getCombine(coinInfo, detailCoin);

  const handleClickRank = (obj: any) => {
    setSelectedCoin([obj]);
    navigate(process.env.PUBLIC_URL + "/coins");
  };
  return (
    <MainLeftFrame>
      <HeaderTitle>
        Coinzero (코인원 클론코딩)
        <br />
        <strong style={{ fontWeight: "700" }}>개인 포트폴리오</strong>
      </HeaderTitle>
      <TradeCost>
        <Cost>{!isLoadingBtc && btcAccPrice && Math.floor(btcAccPrice[0].acc_trade_price_24h).toLocaleString("ko-KR")}</Cost>
        <span style={{ fontSize: "10px" }}>(24시간 누적 거래대금 / 비트코인)</span>
      </TradeCost>
      <SearchZone>
        <SearchInput value={searchValue} onChange={inputChange} />
        <SearchIcon>
          <CgSearch />
        </SearchIcon>
        {combineObj && combineObj.length > 0 && (
          <AutoSearch>
            <CoinList>
              {combineObj.map((v: IAssignCoin) => (
                <Coin key={v.market} style={{ display: "flex" }} onClick={() => handleClickRank({ market: v.market, korean_name: v.korean_name, english_name: v.english_name })}>
                  <CoinName>
                    <TickerName>
                      <CoinIcon>
                        <img
                          src={`https://static.upbit.com/logos/${v.market.split("-")[1].toUpperCase()}.png`}
                          alt={v.market.split("-")[1]}
                          title={v.market.split("-")[1]}
                          style={{ height: "14px", width: "14px" }}
                        />
                      </CoinIcon>
                      <CoinSymbol>{v.market.split("-")[1]}</CoinSymbol>
                    </TickerName>
                    <FullName>{v.korean_name}</FullName>
                  </CoinName>
                  <CoinPrice upDownColor={v.change}>{v.trade_price.toLocaleString("ko-KR")}</CoinPrice>
                  <CoinUpDown upDownColor={v.change} positiveChk={((v.trade_price - v.prev_closing_price) / v.prev_closing_price) * 100 > 0}>
                    {(((v.trade_price - v.prev_closing_price) / v.prev_closing_price) * 100).toFixed(2)}
                  </CoinUpDown>
                  <CoinTrade>
                    <VscArrowSwap />
                  </CoinTrade>
                </Coin>
              ))}
            </CoinList>
          </AutoSearch>
        )}
      </SearchZone>
      <GoReadme />
      {/* <VerticalNotice />
            <ButtonScroll /> */}
    </MainLeftFrame>
  );
}

export default React.memo(QuickSearch);
