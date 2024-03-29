import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { BsQuestionCircle } from "react-icons/bs";
import { VscArrowSwap } from "react-icons/vsc";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getDetailCoin, getMarketCoins, IAssignCoin, ICoin, ICoinDetail } from "../../Api/coinInfo";
import { getCombineRank } from "../../Utils/CombineCoinData";
import { useRecoilState } from "recoil";
import { selectedCoinState } from "../CoinLists/TradingVolume/atom";
import { useNavigate } from "react-router-dom";

const MainRightFrame = styled.div`
  grid-area: item2;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const RankingBox = styled.div`
  height: 493px;
`;

//Header
const HeaderSection = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

//Header Title
const HeaderTitle = styled.h2`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #18191c;
  &:before {
    content: "";
    width: 20px;
    height: 23px;
    margin-right: 8px;
    background-image: url(${process.env.REACT_APP_COINONE_RANK_LOGO});
  }
`;

//Header 더 보러가기 Link
const MoreLink = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #79818f;
`;
const LinkText = styled.span`
  cursor: pointer;
  font-size: 12px;
`;
const LinkLogo = styled.span`
  padding-top: 2.1px;
  font-size: 15px;
`;

//Rank Box
const RankBox = styled.div`
  background-color: #fff;
  margin-top: 19px;
  padding: 20px;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #e4e5e8;
  box-shadow: 0 3px 10px 0 rgba(66, 66, 66, 0.05);
`;

const ItemList = styled.ul``;
const ListHeader = styled.li`
  color: #aeb3bb;
  display: flex;
  margin-bottom: 15px;
`;

//표시기준
const SignStandardHead = styled.div`
  display: flex;
  align-items: center;
  //flex-grow: 3.5;
  width: 220px;
`;

const SignText = styled.span`
  font-size: 12px;
`;
const SignSymbol = styled.span`
  margin-left: 5px;
  font-size: 12px;
`;

const SignTooltip = styled.div``;

//현재가
const CurPriceHead = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 120px;
`;

const CurPriceBtn = styled.button<{ focusFlag: string }>`
  display: flex;
  cursor: pointer;
  align-items: center;
  border: none;
  justify-content: flex-end;
  padding: 0 10px;
  background-color: ${(props) => (props.focusFlag.includes("curVal") ? "rgba(72, 77, 85, 0.05)" : "transparent")};
  transition: background-color 0.2s;
  border-radius: 2px;
`;

const CurText = styled.span`
  font-size: 12px;
  margin-right: 5px;
`;
const CurSortSymbol = styled.div`
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

//등락률
const UpDownRateHead = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 72px;
  margin-left: 18px;
`;

const UpDownRateBtn = styled.button<{ focusFlag: string }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  justify-content: flex-end;
  padding: 0 10px;
  background-color: ${(props) => (props.focusFlag.includes("upDown") ? "rgba(72, 77, 85, 0.05)" : "transparent")};
  transition: background-color 0.2s;
  border-radius: 2px;
`;

const UpDownText = styled.span`
  font-size: 12px;
  margin-right: 5px;
`;
const UpdownSymbol = styled.div`
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

//거래대금
const TradePriceHead = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 125px;
`;

const TradePriceBtn = styled.button<{ focusFlag: string }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  justify-content: flex-end;
  padding: 0 10px;
  background-color: ${(props) => (props.focusFlag.includes("amount") ? "rgba(72, 77, 85, 0.05)" : "transparent")};
  transition: background-color 0.2s;
  border-radius: 2px;
`;

const TradeText = styled.span`
  font-size: 12px;
  margin-right: 5px;
`;
const TradeSymbol = styled.div`
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

//Coin Rank List
const List = styled.li`
  cursor: pointer;
  display: flex;
  margin-bottom: 23px;
  &:last-child {
    margin-bottom: 0;
  }
  border-bottom: 1px solid #f8f8f9;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgb(248, 248, 249);
`;

//Symbol and Name(eng, kor)
const SignStandard = styled.div`
  display: flex;
  align-items: center;
  width: 220px;
`;

const SignMark = styled.div`
  margin-right: 12px;
  width: 38px;
  height: 38px;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NameEng = styled.span`
  margin-bottom: 7px;
  font-size: 14px;
  font-weight: 700;
  color: #18191c;
  text-transform: uppercase;
`;
const NameKor = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 103px;
  font-size: 10px;
  color: #79818f;
`;

//Current Coin Pirce
const Price = styled.div`
  width: 120px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const CoinPrice = styled.span<{ upDownColor: string }>`
  font-size: 15px;
  text-align: right;
  color: ${(props) => (props.upDownColor === "RISE" ? "#e12343" : props.upDownColor === "FALL" ? "#1763b6" : "black")};
`;

//UpDown Rate
const UpDownRate = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 72px;
  margin-left: 18px;
`;

const CoinUpDown = styled.span<{ upDownColor: string; positiveChk: boolean }>`
  width: 80px;
  font-size: 13px;
  font-weight: 700;
  text-align: right;
  color: ${(props) => (props.upDownColor === "RISE" ? "#e12343" : props.upDownColor === "FALL" ? "#1763b6" : "black")};
  &:after {
    content: " %";
  }
  &:before {
    content: "${(props) => (props.positiveChk ? "+" : "")}";
  }
`;

//거래대금
const TradeAmount = styled.div`
  width: 125px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TradeAcc = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #79818f;
`;

//현재, 등락, 거래대금 화살표
const CurValIconDESC = styled.span<{ focusFlag: string }>`
  opacity: ${(props) => (props.focusFlag === `curValDESC` ? 1 : 0.2)};
`;
const CurValIconASC = styled.span<{ focusFlag: string }>`
  opacity: ${(props) => (props.focusFlag === `curValASC` ? 1 : 0.2)};
`;
const UpDownIconDESC = styled.span<{ focusFlag: string }>`
  opacity: ${(props) => (props.focusFlag === `upDownDESC` ? 1 : 0.2)};
`;
const UpDownIconASC = styled.span<{ focusFlag: string }>`
  opacity: ${(props) => (props.focusFlag === `upDownASC` ? 1 : 0.2)};
`;

const AmountIconDESC = styled.span<{ focusFlag: string }>`
  opacity: ${(props) => (props.focusFlag === `amountDESC` ? 1 : 0.2)};
`;
const AmountIconASC = styled.span<{ focusFlag: string }>`
  opacity: ${(props) => (props.focusFlag === `amountASC` ? 1 : 0.2)};
`;

function CoinRank() {
  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCoinState);
  const [allCoin, setAllCoin] = useState<ICoin[]>([]);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery("coinRank", getMarketCoins, {
    onSuccess(data) {
      //Combine을 위한 allCoin Data 할당
      setAllCoin(data);
    },
    refetchOnWindowFocus: false,
  });
  const [queryFlag, setQueryFlag] = useState(false);
  const [rankArg, setRankArg] = useState<string[]>([]);
  const [combineData, setCombineData] = useState<IAssignCoin[]>([]);

  //ASC, DESC
  const [focusFlag, setFocusFlag] = useState<string>("amountDESC");

  const { data: detailCoin } = useQuery<ICoinDetail[] | null>(["CoinDetailRight"], () => getDetailCoin(rankArg.join(",")), {
    onSuccess(data) {
      if (data && data.length > 0) {
        //화면에 렌더되는 데이터
        switch (focusFlag) {
          case "curValDESC":
            //현재가 내림차순
            setCombineData(getCombineRank(data.sort((a, b) => b.trade_price - a.trade_price).slice(0, 7), allCoin));
            break;

          case "curValASC":
            //현재가 올림차순
            setCombineData(getCombineRank(data.sort((a, b) => a.trade_price - b.trade_price).slice(0, 7), allCoin));
            break;

          case "upDownDESC":
            //등락률 오름차순
            setCombineData(
              getCombineRank(
                data
                  .sort(
                    (a, b) => +(((b.trade_price - b.prev_closing_price) / b.prev_closing_price) * 100).toFixed(2) - +(((a.trade_price - a.prev_closing_price) / a.prev_closing_price) * 100).toFixed(2)
                  )
                  .slice(0, 7),
                allCoin
              )
            );
            break;

          case "upDownASC":
            //등락률 내림차순
            setCombineData(
              getCombineRank(
                data
                  .sort(
                    (a, b) => +(((a.trade_price - a.prev_closing_price) / a.prev_closing_price) * 100).toFixed(2) - +(((b.trade_price - b.prev_closing_price) / b.prev_closing_price) * 100).toFixed(2)
                  )
                  .slice(0, 7),
                allCoin
              )
            );
            break;

          case "amountDESC":
            //거래대금 내림차순
            setCombineData(getCombineRank(data.sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h).slice(0, 7), allCoin));
            break;

          case "amountASC":
            //거래대금 오름차순
            setCombineData(getCombineRank(data.sort((a, b) => a.acc_trade_price_24h - b.acc_trade_price_24h).slice(0, 7), allCoin));
            break;
        }
      }
    },
    enabled: queryFlag,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      const krwAry = data.filter((v: ICoin) => v.market.includes("KRW"));
      const rankArg = [];
      for (let value of krwAry) rankArg.push(value.market);
      setRankArg(rankArg);
      setQueryFlag((prev: boolean) => !prev);
    }
  }, [data, isLoading]);

  //현재가, 등락률, 거래대금 오름차순, 내림차순 Func
  const priceSort = (sortType: string) => {
    switch (sortType) {
      case "curValue":
        if (focusFlag === "curValDESC") {
          setFocusFlag("curValASC");
          if (detailCoin && detailCoin.length > 0) {
            //현재가 오름차순
            setCombineData(getCombineRank(detailCoin.sort((a, b) => a.trade_price - b.trade_price).slice(0, 7), allCoin));
          }
        } else {
          setFocusFlag("curValDESC");
          if (detailCoin && detailCoin.length > 0) {
            //현재가 오름차순
            setCombineData(getCombineRank(detailCoin.sort((a, b) => b.trade_price - a.trade_price).slice(0, 7), allCoin));
          }
        }

        break;

      case "upDown":
        if (focusFlag === "upDownDESC") {
          setFocusFlag("upDownASC");
          if (detailCoin && detailCoin.length > 0) {
            //등락률 오름차순
            setCombineData(
              getCombineRank(
                detailCoin
                  .sort(
                    (a, b) => +(((a.trade_price - a.prev_closing_price) / a.prev_closing_price) * 100).toFixed(2) - +(((b.trade_price - b.prev_closing_price) / b.prev_closing_price) * 100).toFixed(2)
                  )
                  .slice(0, 7),
                allCoin
              )
            );
          }
        } else {
          setFocusFlag("upDownDESC");
          if (detailCoin && detailCoin.length > 0) {
            //등락률 오름차순
            setCombineData(
              getCombineRank(
                detailCoin
                  .sort(
                    (a, b) => +(((b.trade_price - b.prev_closing_price) / b.prev_closing_price) * 100).toFixed(2) - +(((a.trade_price - a.prev_closing_price) / a.prev_closing_price) * 100).toFixed(2)
                  )
                  .slice(0, 7),
                allCoin
              )
            );
          }
        }

        break;

      case "amount":
        if (focusFlag === "amountDESC") {
          setFocusFlag("amountASC");
          if (detailCoin && detailCoin.length > 0) {
            //거래대금 오름차순
            setCombineData(getCombineRank(detailCoin.sort((a, b) => a.acc_trade_price_24h - b.acc_trade_price_24h).slice(0, 7), allCoin));
          }
        } else {
          setFocusFlag("amountDESC");
          if (detailCoin && detailCoin.length > 0) {
            //거래대금 내림차순
            setCombineData(getCombineRank(detailCoin.sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h).slice(0, 7), allCoin));
          }
        }

        break;
    }
  };

  const handleClickRank = (obj: any) => {
    setSelectedCoin([obj]);
    navigate(process.env.PUBLIC_URL + "/coins");
  };
  return (
    <MainRightFrame>
      <RankingBox>
        <HeaderSection>
          <HeaderTitle>가상자산 랭킹 Top 7</HeaderTitle>
          <MoreLink onClick={() => navigate(process.env.PUBLIC_URL + "/coins")}>
            <LinkText>더 보러가기</LinkText>
            <LinkLogo>
              <IoIosArrowForward />
            </LinkLogo>
          </MoreLink>
        </HeaderSection>
        <RankBox>
          <ItemList>
            <ListHeader>
              <SignStandardHead>
                <SignText>표시기준</SignText>
                <SignSymbol>
                  <BsQuestionCircle />
                </SignSymbol>
              </SignStandardHead>
              <CurPriceHead>
                <CurPriceBtn focusFlag={focusFlag} onClick={() => priceSort("curValue")}>
                  <CurText>현재가</CurText>
                  <CurSortSymbol>
                    <CurValIconASC focusFlag={focusFlag}>
                      <AiFillCaretUp />
                    </CurValIconASC>
                    <CurValIconDESC focusFlag={focusFlag}>
                      <AiFillCaretDown />
                    </CurValIconDESC>
                  </CurSortSymbol>
                </CurPriceBtn>
              </CurPriceHead>
              <UpDownRateHead>
                <UpDownRateBtn focusFlag={focusFlag} onClick={() => priceSort("upDown")}>
                  <UpDownText>등락률</UpDownText>
                  <UpdownSymbol>
                    <UpDownIconASC focusFlag={focusFlag}>
                      <AiFillCaretUp />
                    </UpDownIconASC>
                    <UpDownIconDESC focusFlag={focusFlag}>
                      <AiFillCaretDown />
                    </UpDownIconDESC>
                  </UpdownSymbol>
                </UpDownRateBtn>
              </UpDownRateHead>
              <TradePriceHead>
                <TradePriceBtn focusFlag={focusFlag} onClick={() => priceSort("amount")}>
                  <TradeText>거래대금</TradeText>
                  <TradeSymbol>
                    <AmountIconASC focusFlag={focusFlag}>
                      <AiFillCaretUp />
                    </AmountIconASC>
                    <AmountIconDESC focusFlag={focusFlag}>
                      <AiFillCaretDown />
                    </AmountIconDESC>
                  </TradeSymbol>
                </TradePriceBtn>
              </TradePriceHead>
            </ListHeader>
            {combineData && combineData.length > 0 ? (
              combineData.map((v, i) => (
                <List key={i} onClick={() => handleClickRank({ market: v.market, korean_name: v.korean_name, english_name: v.english_name })}>
                  <SignStandard>
                    <SignMark>
                      <img
                        src={`https://static.upbit.com/logos/${v.market.split("-")[1].toUpperCase()}.png`}
                        alt={v.market.split("-")[1]}
                        title={v.market.split("-")[1]}
                        style={{
                          height: "38px",
                          width: "38px",
                        }}
                      />
                    </SignMark>
                    <NameBox>
                      <NameEng>{v.market.split("-")[1]}</NameEng>
                      <NameKor>{v.korean_name}</NameKor>
                    </NameBox>
                  </SignStandard>
                  <Price>
                    <CoinPrice upDownColor={v.change}>{v.trade_price.toLocaleString("ko-KR")}</CoinPrice>
                  </Price>
                  <UpDownRate>
                    <CoinUpDown upDownColor={v.change} positiveChk={((v.trade_price - v.prev_closing_price) / v.prev_closing_price) * 100 > 0}>
                      {(((v.trade_price - v.prev_closing_price) / v.prev_closing_price) * 100).toFixed(2)}
                    </CoinUpDown>
                  </UpDownRate>
                  <TradeAmount>
                    <TradeAcc>
                      {`${Math.floor(Math.floor(v.acc_trade_price_24h) / 1000000).toLocaleString("ko-KR")}백만`}
                      &nbsp;&nbsp;
                      <VscArrowSwap />
                    </TradeAcc>
                  </TradeAmount>
                </List>
              ))
            ) : (
              <li style={{ textAlign: "center" }}>Loading ...</li>
            )}
          </ItemList>
        </RankBox>
      </RankingBox>
    </MainRightFrame>
  );
}

export default CoinRank;
