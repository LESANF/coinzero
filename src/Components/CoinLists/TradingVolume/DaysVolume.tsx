import React, { useMemo } from "react";
import { useTable } from "react-table";
import * as T from "./styled";

export default function DaysVolume({ data: daysData, coinName }: any) {
  const columns = useMemo(
    (): any => [
      { accessor: "days", Header: "일자", width: 100 },
      { accessor: "close", Header: "종가(KRW)", width: 250 },
      { accessor: "priceBefore", Header: "전일대비", width: 400 },
      { accessor: "tradeVolume", Header: `거래량(${coinName.split("-")[1]})` },
    ],
    []
  );
  const data = useMemo((): any => {
    return daysData.map((v: any) => {
      return {
        days: `${("0" + (new Date(v.timestamp).getMonth() + 1)).slice(-2)}.${("0" + new Date(v.timestamp).getDate()).slice(-2)}`,
        close: v.close.toLocaleString("ko-KR"),
        priceBefore: `${v.change_price === null ? "0" : v.change_price.toLocaleString("ko-KR")} | ${(v.change_rate * 100).toFixed(2)}%`,
        tradeVolume: Math.round(v.volume).toLocaleString("ko-KR"),
      };
    });
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  const checkTradeVolume = (value: any) => {
    if (!value.includes("|")) return;
    const color = +value.split("|")[0].trim().replace(/,/g, "") > 0 ? "#c84a31" : +value.split("|")[0].trim().replace(/,/g, "") === 0 ? "#333" : "#1261c4";
    return color;
  };

  return (
    <T.TableFrame {...getTableProps()}>
      <T.TableHead>
        {headerGroups.map((headerGroups) => (
          <T.TableTr {...headerGroups.getHeaderGroupProps()}>
            {headerGroups.headers.map((column) => (
              <T.TableTh {...column.getHeaderProps()}>{column.render("Header")}</T.TableTh>
            ))}
          </T.TableTr>
        ))}
      </T.TableHead>
      <T.TableBody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row);

          return (
            <T.TableTr {...row.getRowProps()} secondTdColor={checkTradeVolume(row.original.priceBefore)}>
              {row.cells.map((cell: any) => (
                <T.TableTd {...cell.getCellProps()} style={{ color: checkTradeVolume(cell.value.toString()) }}>
                  {cell.render("Cell")}
                </T.TableTd>
              ))}
            </T.TableTr>
          );
        })}
      </T.TableBody>
    </T.TableFrame>
  );
}
