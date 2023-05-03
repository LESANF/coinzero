import { memo, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { useWsTicker } from "use-upbit-api";
import useGetWsData from "../../../hooks/useGetWsData/useGetWsData";
import { marketCodesState, selectedCoinInfoState, selectedCoinState } from "../TradingVolume/atom";

const convertMillonWon = (value: any) => {
  const MILLION = 1000000;
  const extractedValue = value / MILLION;
  return extractedValue;
};

const CoinListBox = styled.div`
  height: 800px;
  margin: 5px;
  background-color: white;
  overflow: overlay;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const CoinBoxHeader = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 1px;
  background-color: white;
  opacity: 0.8;
  height: 35px;
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.3fr;
  border-bottom: 0.5px solid lightgrey;
  font-size: 12px;
  font-weight: 600;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CoinBox = styled.div<{ selected: any }>`
  height: 45px;
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.3fr;
  border-bottom: 0.5px solid lightgrey;
  font-size: 12px;
  padding-left: 5px;
  padding-right: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "lightgrey" : "inherit")};
  :hover {
    background-color: lightgrey;
  }
  div {
    display: flex;
  }
  div:nth-child(1) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  div:nth-child(2) {
    justify-content: flex-end;
    align-items: center;
  }
  div:nth-child(3) {
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }
  div:nth-child(4) {
    justify-content: flex-end;
    align-items: center;
  }
`;

const CoinBoxName = styled.div`
  font-weight: 600;
  font-size: 11px;

  div:nth-child(2) {
    color: gray;
    font-weight: 400;
    font-size: 7px;
  }
`;

const CoinBoxPrice = styled.div<{ changeType: any }>`
  font-weight: 600;
  color: ${(props) => {
    switch (props.changeType) {
      case "RISE":
        return "#EF1C1C";
      case "EVEN":
        return "#000000";
      case "FALL":
        return "#1261C4";
      default:
        return "#000000";
    }
  }};
`;

const CoinBoxChange = styled.div<{ changeType: any }>`
  color: ${(props) => {
    switch (props.changeType) {
      case "RISE":
        return "#EF1C1C";
      case "EVEN":
        return "#000000";
      case "FALL":
        return "#1261C4";
      default:
        return "#000000";
    }
  }};
`;
const CoinBoxChangeRate = styled.div``;
const CoinBoxChangePrice = styled.div``;
const CoinBoxVolume = styled.div`
  font-size: 11px;
  div:nth-child(2) {
    color: grey;
  }
`;

function CoinSelector() {
  const marketCodes = useRecoilValue<any>(marketCodesState);

  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCoinState);
  const { socketData } = useWsTicker(marketCodes);
  // const { wsData: socketData } = useGetWsData(marketCodes);

  const [selectedCoinInfo, setSelectedCoinInfo] = useRecoilState(selectedCoinInfoState);

  useEffect(() => {
    if (socketData) {
      const targetData = socketData.filter((data: any) => data.code == selectedCoin[0].market);
      //@ts-ignore
      setSelectedCoinInfo(...targetData);
    }
  }, [selectedCoin, socketData]);

  const clickCoinHandler = (evt: any) => {
    const currentTarget = marketCodes.filter((code: any) => code.market === evt.currentTarget.id);
    setSelectedCoin(currentTarget);
  };

  console.log(socketData);

  return (
    <CoinListBox>
      <CoinBoxHeader>
        <div>코인</div>
        <div>현재가</div>
        <div>전일대비</div>
        <div>거래대금</div>
      </CoinBoxHeader>
      {socketData ? (
        socketData.map((data: any) => {
          return (
            <CoinBox key={data.code} id={data.code} onClick={clickCoinHandler} selected={selectedCoin[0].market === data.code}>
              <CoinBoxName>
                <div>{marketCodes.filter((code: any) => code.market === data.code)[0].korean_name}</div>
                <div>{marketCodes.filter((code: any) => code.market === data.code)[0].market}</div>
              </CoinBoxName>
              <CoinBoxPrice changeType={data.change}>{data.trade_price.toLocaleString("ko-KR")}</CoinBoxPrice>
              <CoinBoxChange changeType={data.change}>
                <CoinBoxChangeRate>
                  {data.signed_change_rate > 0 ? "+" : null}
                  {(data.signed_change_rate * 100).toFixed(2)}%
                </CoinBoxChangeRate>
                <CoinBoxChangePrice>{data.signed_change_price.toLocaleString("ko-KR")}</CoinBoxChangePrice>
              </CoinBoxChange>
              <CoinBoxVolume>
                <div>{Math.ceil(convertMillonWon(data.acc_trade_price_24h)).toLocaleString("ko-KR")}</div>
                <div>백만</div>
              </CoinBoxVolume>
            </CoinBox>
          );
        })
      ) : (
        <div>no</div>
      )}
    </CoinListBox>
  );
}

export default memo(CoinSelector);
