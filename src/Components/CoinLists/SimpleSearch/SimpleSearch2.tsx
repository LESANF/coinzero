import { memo, useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { useWsTicker } from "use-upbit-api";
import useGetWsData from "../../../hooks/useGetWsData/useGetWsData";
import { marketCodesState, selectedCoinInfoState, selectedCoinState } from "../TradingVolume/atom";

const SearchFrame = styled.div`
  background-color: #fff;
  border-radius: 8px;
  grid-area: tickerSearch;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const SearchTable = styled.table`
  width: 100%;
`;

const SearchTableColgroup = styled.colgroup``;

const SearchTableCol = styled.col<{ width: string }>`
  width: ${(props) => props.width};
`;

const SearchTableHead = styled.thead``;

const SearchTableTr = styled.tr``;

const SearchTableTh = styled.th`
  cursor: pointer;
  vertical-align: middle;
  border: 1px solid #333;
  text-align: center;
  background: #f9fafc;
  color: #666;
  font-size: 11px;
  height: 30px;

  span {
    &:hover {
      border-bottom: 1px solid #333;
    }
  }
`;

const headerImgUrl = {
  coinNameChangeIcon: "https://cdn.upbit.com/upbit-web/images/ico_change.70956ce.png",
  upDownDefaultIcon: "https://cdn.upbit.com/upbit-web/images/ico_up_down.1add58d.png",
  upDownDownIcon: "https://cdn.upbit.com/upbit-web/images/ico_up_down_2.80e5420.png",
  upDownUpIcon: "https://cdn.upbit.com/upbit-web/images/ico_up_down_1.af5ac5a.png",
};

const TdBox = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding-left: 10px;
`;

function SimpleSearch2({ marketCodes }: any) {
  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCoinState);
  const { socketData } = useWsTicker(marketCodes);

  const [selectedCoinInfo, setSelectedCoinInfo] = useRecoilState(selectedCoinInfoState);

  useEffect(() => {
    if (socketData) {
      const targetData = socketData.filter((data: any) => data.code == selectedCoin[0].market);
      //@ts-ignore
      setSelectedCoinInfo(...targetData);
      setWsData(socketData);
    }
  }, [selectedCoin, socketData]);

  const clickCoinHandler = (evt: any) => {
    const currentTarget = marketCodes.filter((code: any) => code.market === evt.currentTarget.id);
    setSelectedCoin(currentTarget);
  };

  const [nameLangEng, setNameLanEng] = useState(false);
  const [wsData, setWsData] = useState<any>();
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
        setWsData(wsData.sort((a: any, b: any) => a.trade_price - b.trade_price));
        break;
      case "PRICE_DESC":
        setWsData(wsData.sort((a: any, b: any) => b.trade_price - a.trade_price));
        break;
      case "DAY_ASC":
        setWsData(wsData.sort((a: any, b: any) => a.signed_change_price - b.signed_change_price));
        break;
      case "DAY_DESC":
        setWsData(wsData.sort((a: any, b: any) => b.signed_change_price - a.signed_change_price));
        break;
      case "VOL_ASC":
        setWsData(wsData.sort((a: any, b: any) => a.acc_trade_price_24h - b.acc_trade_price_24h));
        break;
      case "VOL_DESC":
        setWsData(wsData.sort((a: any, b: any) => b.acc_trade_price_24h - a.acc_trade_price_24h));
        break;
    }
  };

  return (
    <SearchFrame>
      <SearchTable>
        <SearchTableColgroup>
          <SearchTableCol width="120px" />
          <SearchTableCol width="110px" />
          <SearchTableCol width="78px" />
          <SearchTableCol width="*" />
        </SearchTableColgroup>
        <SearchTableHead>
          <SearchTableTr>
            <SearchTableTh onClick={() => setNameLanEng((prev) => !prev)}>
              <span>
                {nameLangEng ? "영문명" : "한글명"}
                <img style={{ paddingLeft: "3px", verticalAlign: "middle" }} ref={coinNameImg} src={headerImgUrl.coinNameChangeIcon} alt="" />
              </span>
            </SearchTableTh>
            <SearchTableTh onClick={handleCoinPriceIcon}>
              <span>
                현재가
                <img
                  style={{ paddingLeft: "3px", verticalAlign: "middle" }}
                  ref={coinCurPrice}
                  src={sortTargetPriceDown ? headerImgUrl.upDownDownIcon : sortTargetPriceUp ? headerImgUrl.upDownUpIcon : headerImgUrl.upDownDefaultIcon}
                  alt=""
                />
              </span>
            </SearchTableTh>
            <SearchTableTh onClick={handleCoinDayBeforeIcon}>
              <span>
                전일대비
                <img
                  style={{ paddingLeft: "3px", verticalAlign: "middle" }}
                  ref={coinDayBefore}
                  src={sortTargetDayDown ? headerImgUrl.upDownDownIcon : sortTargetDayUp ? headerImgUrl.upDownUpIcon : headerImgUrl.upDownDefaultIcon}
                  alt=""
                />
              </span>
            </SearchTableTh>
            <SearchTableTh onClick={handleCoinTradeVolumeIcon}>
              <span>
                거래대금
                <img
                  style={{ paddingLeft: "3px", verticalAlign: "middle" }}
                  ref={coinTradeVolume}
                  src={sortTargetVolumeDown ? headerImgUrl.upDownDownIcon : sortTargetVolumeUp ? headerImgUrl.upDownUpIcon : headerImgUrl.upDownDefaultIcon}
                  alt=""
                />
              </span>
            </SearchTableTh>
          </SearchTableTr>
        </SearchTableHead>
        <tbody>
          {wsData &&
            marketCodes &&
            marketCodes !== undefined &&
            wsData.map((data: any, i: number) => {
              return (
                <tr style={{ height: "45px", border: "1px solid #333" }} key={i}>
                  <td>
                    <TdBox>
                      <div style={{ fontSize: "12px", marginBottom: "3px", fontWeight: "700" }}>
                        {nameLangEng ? marketCodes.filter((code: any) => code.market === data.code)[0]?.english_name : marketCodes.filter((code: any) => code.market === data.code)[0]?.korean_name}
                      </div>
                      <div style={{ fontSize: "11px", color: "#666" }}>{marketCodes.filter((code: any) => code.market === data.code)[0]?.market}</div>
                    </TdBox>
                  </td>
                  <td>
                    <div style={{ textAlign: "right", marginRight: "3px", fontWeight: 700, fontSize: "12px" }}>{data.trade_price.toLocaleString("ko-KR")}</div>
                  </td>
                  <td>
                    <TdBox style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", paddingRight: "10px" }}>
                      <div style={{ fontSize: "12px", marginBottom: "3px" }}>
                        {data.signed_change_rate > 0 ? "+" : null}
                        {(data.signed_change_rate * 100).toFixed(2)}%
                      </div>
                      <div style={{ fontSize: "11px" }}>{data.signed_change_price.toLocaleString("ko-KR")}</div>
                    </TdBox>
                  </td>
                  <td>
                    <div style={{ textAlign: "right", paddingRight: "10px" }}>
                      <span style={{ fontSize: "12px" }}>{Math.ceil(convertMillonWon(data.acc_trade_price_24h)).toLocaleString("ko-KR")}</span>
                      <span style={{ fontSize: "11px", color: "#666" }}>백만</span>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </SearchTable>
    </SearchFrame>
  );
}

export default SimpleSearch2;
