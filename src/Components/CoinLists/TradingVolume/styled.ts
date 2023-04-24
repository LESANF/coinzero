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
  cursor: pointer;
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
