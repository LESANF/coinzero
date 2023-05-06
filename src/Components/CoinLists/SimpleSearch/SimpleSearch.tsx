import { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import * as S from "./styled";
import useGetWsData from "../../../hooks/useGetWsData/useGetWsData";
import { selectedCoinInfoState, selectedCoinState } from "../TradingVolume/atom";

const headerImgUrl = {
  coinNameChangeIcon: "https://cdn.upbit.com/upbit-web/images/ico_change.70956ce.png",
  upDownDefaultIcon: "https://cdn.upbit.com/upbit-web/images/ico_up_down.1add58d.png",
  upDownDownIcon: "https://cdn.upbit.com/upbit-web/images/ico_up_down_2.80e5420.png",
  upDownUpIcon: "https://cdn.upbit.com/upbit-web/images/ico_up_down_1.af5ac5a.png",
};

function SimpleSearch({ marketCodes }: any) {
  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCoinState);
  const [selectedCoinInfo, setSelectedCoinInfo] = useRecoilState(selectedCoinInfoState);
  const { wsData } = useGetWsData(marketCodes);

  useEffect(() => {
    if (wsData) {
      const targetData = wsData.filter((data: any) => data.code === selectedCoin[0].market);
      //@ts-ignore
      setSelectedCoinInfo(...targetData);
      setWsCoinList(wsData);
    }
  }, [selectedCoin, wsData]);

  const clickCoinHandler = (evt: any) => {
    const currentTarget = marketCodes.filter((code: any) => code.market === evt.currentTarget.id);
    setSelectedCoin(currentTarget);
  };

  const [nameLangEng, setNameLanEng] = useState(false);
  const [_, setWsCoinList] = useState<any>();
  const coinNameImg = useRef<any>();
  const coinCurPrice = useRef<any>();
  const coinDayBefore = useRef<any>();
  const coinTradeVolume = useRef<any>();

  const [sortTargetPriceDown, setSortTargetPriceDown] = useState(false);
  const [sortTargetDayDown, setSortTargetDayDown] = useState(false);
  const [sortTargetVolumeDown, setSortTargetVolumeDown] = useState(false);

  const [sortTargetPriceUp, setSortTargetPriceUp] = useState(false);
  const [sortTargetDayUp, setSortTargetDayUp] = useState(false);
  const [sortTargetVolumeUp, setSortTargetVolumeUp] = useState(false);

  const handleCoinPriceIcon = () => {
    setSortTargetPriceDown(true);
    setSortTargetDayDown(false);
    setSortTargetVolumeDown(false);
    setSortTargetDayUp(false);
    setSortTargetVolumeUp(false);

    sortDataChange("PRICE_DESC");

    if (sortTargetPriceDown) {
      setSortTargetPriceDown(false);
      setSortTargetPriceUp(true);

      sortDataChange("PRICE_ASC");
    }
  };
  const handleCoinDayBeforeIcon = () => {
    setSortTargetPriceDown(false);
    setSortTargetDayDown(true);
    setSortTargetVolumeDown(false);
    setSortTargetPriceUp(false);
    setSortTargetVolumeUp(false);

    sortDataChange("DAY_DESC");

    if (sortTargetDayDown) {
      setSortTargetDayDown(false);
      setSortTargetDayUp(true);

      sortDataChange("DAY_ASC");
    }
  };
  const handleCoinTradeVolumeIcon = () => {
    setSortTargetPriceDown(false);
    setSortTargetDayDown(false);
    setSortTargetVolumeDown(true);
    setSortTargetPriceUp(false);
    setSortTargetDayUp(false);

    sortDataChange("VOL_DESC");

    if (sortTargetVolumeDown) {
      setSortTargetVolumeDown(false);
      setSortTargetVolumeUp(true);
      sortDataChange("VOL_ASC");
    }
  };

  const convertMillonWon = (value: any) => {
    const MILLION = 1000000;
    const extractedValue = value / MILLION;
    return extractedValue;
  };

  const sortDataChange = (mode: string) => {
    switch (mode) {
      case "PRICE_ASC":
        setWsCoinList(wsData.sort((a: any, b: any) => a.trade_price - b.trade_price));
        break;
      case "PRICE_DESC":
        setWsCoinList(wsData.sort((a: any, b: any) => b.trade_price - a.trade_price));
        break;
      case "DAY_ASC":
        setWsCoinList(wsData.sort((a: any, b: any) => a.signed_change_rate - b.signed_change_rate));
        break;
      case "DAY_DESC":
        setWsCoinList(wsData.sort((a: any, b: any) => b.signed_change_rate - a.signed_change_rate));
        break;
      case "VOL_ASC":
        setWsCoinList(wsData.sort((a: any, b: any) => a.acc_trade_price_24h - b.acc_trade_price_24h));
        break;
      case "VOL_DESC":
        setWsCoinList(wsData.sort((a: any, b: any) => b.acc_trade_price_24h - a.acc_trade_price_24h));
        break;
    }
  };

  return (
    <S.SearchFrame>
      <S.SearchTable>
        <S.SearchTableColgroup>
          <S.SearchTableCol width="150px" />
          <S.SearchTableCol width="100px" />
          <S.SearchTableCol width="68px" />
          <S.SearchTableCol width="*" />
        </S.SearchTableColgroup>
        <S.SearchTableHead>
          <S.SearchTableTr>
            <S.SearchTableTh onClick={() => setNameLanEng((prev) => !prev)}>
              <span>
                {nameLangEng ? "영문명" : "한글명"}
                <img style={{ paddingLeft: "3px", verticalAlign: "middle" }} ref={coinNameImg} src={headerImgUrl.coinNameChangeIcon} alt="" />
              </span>
            </S.SearchTableTh>
            <S.SearchTableTh onClick={handleCoinPriceIcon}>
              <span>
                현재가
                <img
                  style={{ paddingLeft: "3px", verticalAlign: "middle" }}
                  ref={coinCurPrice}
                  src={sortTargetPriceDown ? headerImgUrl.upDownDownIcon : sortTargetPriceUp ? headerImgUrl.upDownUpIcon : headerImgUrl.upDownDefaultIcon}
                  alt=""
                />
              </span>
            </S.SearchTableTh>
            <S.SearchTableTh onClick={handleCoinDayBeforeIcon}>
              <span>
                전일대비
                <img
                  style={{ paddingLeft: "3px", verticalAlign: "middle" }}
                  ref={coinDayBefore}
                  src={sortTargetDayDown ? headerImgUrl.upDownDownIcon : sortTargetDayUp ? headerImgUrl.upDownUpIcon : headerImgUrl.upDownDefaultIcon}
                  alt=""
                />
              </span>
            </S.SearchTableTh>
            <S.SearchTableTh onClick={handleCoinTradeVolumeIcon}>
              <span>
                거래대금
                <img
                  style={{ paddingLeft: "3px", verticalAlign: "middle" }}
                  ref={coinTradeVolume}
                  src={sortTargetVolumeDown ? headerImgUrl.upDownDownIcon : sortTargetVolumeUp ? headerImgUrl.upDownUpIcon : headerImgUrl.upDownDefaultIcon}
                  alt=""
                />
              </span>
            </S.SearchTableTh>
          </S.SearchTableTr>
        </S.SearchTableHead>
        <tbody>
          {wsData &&
            marketCodes &&
            marketCodes !== undefined &&
            wsData.map((data: any, i: number) => {
              return (
                <S.SearchTableItemTr id={data.code} selected={selectedCoin[0].market === data.code} onClick={clickCoinHandler} key={i}>
                  <S.SearchTableItemTd>
                    <S.TdBox>
                      <S.CoinName>
                        {nameLangEng ? marketCodes.filter((code: any) => code.market === data.code)[0]?.english_name : marketCodes.filter((code: any) => code.market === data.code)[0]?.korean_name}
                      </S.CoinName>
                      <S.CoinNameMarket>{marketCodes.filter((code: any) => code.market === data.code)[0]?.market}</S.CoinNameMarket>
                    </S.TdBox>
                  </S.SearchTableItemTd>
                  <S.SearchTableItemTd>
                    <S.CoinPrice changeType={data.change}>{data.trade_price.toLocaleString("ko-KR")}</S.CoinPrice>
                  </S.SearchTableItemTd>
                  <S.SearchTableItemTd>
                    <S.TdBox changeType={data.change} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", paddingRight: "10px" }}>
                      <S.CoinChgRate>
                        {data.signed_change_rate > 0 ? "+" : null}
                        {(data.signed_change_rate * 100).toFixed(2)}%
                      </S.CoinChgRate>
                      <S.CoinChgPrice>{data.signed_change_price.toLocaleString("ko-KR")}</S.CoinChgPrice>
                    </S.TdBox>
                  </S.SearchTableItemTd>
                  <S.SearchTableItemTd>
                    <S.CoinTradeVolumeBox>
                      <S.CoinTradeVolumePrice>{Math.ceil(convertMillonWon(data.acc_trade_price_24h)).toLocaleString("ko-KR")}</S.CoinTradeVolumePrice>
                      <S.CoinTradeVolumePriceUnit>백만</S.CoinTradeVolumePriceUnit>
                    </S.CoinTradeVolumeBox>
                  </S.SearchTableItemTd>
                </S.SearchTableItemTr>
              );
            })}
        </tbody>
      </S.SearchTable>
    </S.SearchFrame>
  );
}

export default SimpleSearch;
