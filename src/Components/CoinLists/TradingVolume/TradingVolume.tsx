import React, { useState } from "react";
import styled from "styled-components";
import { useTabs } from "./hooks/useTabs";
import * as V from "./styled";
import LiveVolume from "./LiveVolume";
import DaysVolume from "./DaysVolume";

function TradingVolume({ changeValue, daysData: daysVolumeData, coinName }: any) {
  const [tabIdx0, setTabIdx0] = useState<boolean>(true);
  const [tabIdx1, setTabIdx1] = useState<boolean>(false);
  // console.log("TradingVolume=========");
  // console.log(liveVolumeData);
  // console.log("daysVolumeData=========");
  // console.log(daysVolumeData);
  const menus = [
    {
      /**\
       * [{"ticket":"UNIQUE_TICKET"},{"type":"trade","codes":["KRW-BTC"]}] 새로 요청
       * ask-bid = 매수 매도 구분 (체결가격은 change로 체결랑 구분은 ask-bid로)
       * 체결시간 04.22 20:26, 오늘 날짜, 시간 = timestamp 받아서 변환해서 끊어 쓰기
       * 체결가격 KRW - tradeprice
       * 체결량 소수 8자리까지 코인 단위 - trade-volume
       * 체결금액 KRW - tradeprice * trace-volume
       */
      tabName: "체결",
      // content: <LiveVolume coinName={coinName} />,
      content: <LiveVolume changeValue={changeValue} />,
      defaultFocus: tabIdx0,
    },
    {
      tabName: "일별",
      content: <DaysVolume data={daysVolumeData} coinName={coinName} />,
      defaultFocus: tabIdx1,
    },
  ];

  const tabResult = useTabs(0, menus);

  const handleMenuChange = (idx: number) => {
    tabResult?.changeItem(idx);
    setTabIdx0((prev) => !prev);
    setTabIdx1((prev) => !prev);
  };

  return (
    <V.VolumeFrame>
      <V.MenuFrame>
        {menus.map((ele: any, idx: number) => {
          return (
            <V.MenuName key={idx} onClick={() => handleMenuChange(idx)} focus={ele.defaultFocus}>
              {ele.tabName}
            </V.MenuName>
          );
        })}
      </V.MenuFrame>
      <V.VolumeDataTable>{tabResult?.currentItem.content}</V.VolumeDataTable>
    </V.VolumeFrame>
  );
}

export default React.memo(TradingVolume);
