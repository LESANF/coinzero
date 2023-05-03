import styled from "styled-components";

export const SearchFrame = styled.div`
  overflow: auto;
  background-color: #fff;
  border-radius: 8px;
  grid-area: tickerSearch;
  @media screen and (max-width: 600px) {
    display: none;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const SearchTable = styled.table`
  width: 100%;
`;

export const SearchTableColgroup = styled.colgroup``;

export const SearchTableCol = styled.col<{ width: string }>`
  width: ${(props) => props.width};
`;

export const SearchTableHead = styled.thead``;

export const SearchTableTr = styled.tr``;

export const SearchTableItemTr = styled.tr<{ selected: any }>`
  height: 45px;
  border-bottom: 1px solid #f1f1f4;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#f4f5f8" : "inherit")};
`;

export const SearchTableItemTd = styled.td``;

export const SearchTableTh = styled.th`
  position: sticky;
  top: 0;
  cursor: pointer;
  vertical-align: middle;
  text-align: center;
  background: #dfe6e9;
  color: #666;
  font-size: 11px;
  height: 40px;

  span {
    &:hover {
      border-bottom: 1px solid #333;
    }
  }
`;

export const TdBox = styled.div<{ changeType?: string }>`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding-left: 10px;
  color: ${(props) => (props.changeType === "RISE" ? "#c84a31" : props.changeType === "FALL" ? "#1261c4" : "#333")};
`;

export const CoinName = styled.div`
  font-size: 12px;
  margin-bottom: 3px;
  font-weight: 700;
`;

export const CoinNameMarket = styled.div`
  font-size: 11px;
  color: #666;
`;

export const CoinPrice = styled.div<{ changeType: string }>`
  color: ${(props) => (props.changeType === "RISE" ? "#c84a31" : props.changeType === "FALL" ? "#1261c4" : "#333")};
  text-align: right;
  margin-right: 3px;
  font-weight: 700;
  font-size: 12px;
`;

export const CoinChgRate = styled.div`
  font-size: 12px;
  margin-bottom: 3px;
`;

export const CoinChgPrice = styled.div`
  font-size: 11px;
`;

export const CoinTradeVolumeBox = styled.div`
  text-align: right;
  padding-right: 10px;
`;

export const CoinTradeVolumePrice = styled.span`
  font-size: 12px;
`;
export const CoinTradeVolumePriceUnit = styled.span`
  font-size: 11px;
  color: #666;
`;
