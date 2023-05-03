import styled from "styled-components";

export const VolumeFrame = styled.div`
  background-color: #fff;
  border-radius: 8px;
  grid-area: tradingVolume;
`;

export const MenuFrame = styled.ul`
  width: 100%;
  height: 45px;
  display: flex;
`;

export const MenuName = styled.li<{ focus: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props) => (props.focus ? "3px solid #0062df" : "1px solid #d4d6dc")};
  color: ${(props) => (props.focus ? "#0062df" : "#333")};
  font-weight: 700;
  /* cursor: pointer; */
`;

export const TableFrame = styled.table`
  width: 100%;
`;

export const TableHead = styled.thead`
  border-collapse: collapse;
  border-spacing: 0;
  vertical-align: middle;
`;

export const TableBody = styled.tbody``;

export const TableTh = styled.th`
  position: sticky;
  top: 0;
  text-align: center;
  padding-right: 2px;
  border-bottom: 1px solid #f1f1f4;
  height: 30px;
  color: #666;
  background-color: #f9fafc;
  font-size: 12px;
  vertical-align: middle;
`;

export const TableTr = styled.tr<{ secondTdColor?: string }>`
  td:nth-child(2) {
    color: ${(props) => props.secondTdColor};
    font-weight: 700;
  }
`;

export const TableTd = styled.td`
  //#c84a31 빨
  //#1261c4 파
  //종가 = weight 700
  font-size: 12px;
  height: 32px;
  text-align: center;
  vertical-align: middle;
`;

export const VolumeDataTable = styled.div`
  height: 285px;
  overflow-y: auto;
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

export const LiveVolumeFrame = styled.div`
  grid-column: 1 / span 2;
  background-color: #f9fafc;
  font-size: 12px;
  overflow-y: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const LiveVolumeHeader = styled.div`
  width: 1000px;
  position: absolute;
  color: #666;
  display: grid;
  grid-template-columns: 0.7fr 2fr 2fr 1fr;
  padding-bottom: 2px;
  height: 32.5px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const LiveVolumeHeaderItem = styled.div`
  background-color: #f9fafc;
`;

export const LiveVolumeDataBox = styled.div`
  margin-top: 32.5px;
`;

export const LiveVolumeRow = styled.div`
  display: grid;
  height: 32px;
  grid-template-columns: 0.7fr 2fr 2fr 1fr;
  background-color: #fff;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const LiveVolumeLogBox = styled.div`
  margin: 2px;
`;

export const LiveVolumePrice = styled(LiveVolumeLogBox)<{ changeValue: string }>`
  font-weight: 700;
  color: ${(props) => (props.changeValue === "RISE" ? "#e12343" : props.changeValue === "FALL" ? "#1763b6" : "#333")};
`;

export const LiveVolumeTime = styled(LiveVolumeLogBox)`
  display: flex;
  width: 100%;
  align-items: center;
`;
export const LiveVolumeSize = styled(LiveVolumeLogBox)<{ tradeType: string }>`
  color: ${(props) => (props.tradeType === "ASK" ? "#EF1C1C" : "#1261C4")};
`;
