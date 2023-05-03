import React, { useState } from "react";
import { useTabs } from "./hooks/useTabs";
import * as V from "./styled";
import LiveVolume from "./LiveVolume";
import DaysVolume from "./DaysVolume";

function TradingVolume({ daysData: daysVolumeData, coinName }: any) {
  const [tabIdx0, setTabIdx0] = useState<boolean>(true);
  const [tabIdx1, setTabIdx1] = useState<boolean>(false);

  const menus = [
    {
      tabName: "체결",
      content: <LiveVolume />,
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
