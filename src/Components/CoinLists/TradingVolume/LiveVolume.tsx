import React, { useMemo } from "react";
import { useTable } from "react-table";
import * as T from "./styled";

export default function LiveVolume({ data: tt, coinName }: any) {
  const columns = useMemo(
    (): any => [
      { accessor: "tradeTime", Header: "체결시간" },
      { accessor: "tradePrice", Header: "체결가격(KRW)" },
      { accessor: "tradeVolume", Header: `체결량(${coinName.split("-")[1]})` },
      { accessor: "tradeVolumePrice", Header: "체결금액(KRW)" },
    ],
    []
  );

  const data = useMemo((): any => [], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

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
        {rows.map((row) => {
          prepareRow(row);
          return (
            <T.TableTr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <T.TableTd {...cell.getCellProps()}>{cell.render("Cell")}</T.TableTd>
              ))}
            </T.TableTr>
          );
        })}
      </T.TableBody>
    </T.TableFrame>
  );
}
