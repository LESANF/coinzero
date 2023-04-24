import { useState } from "react";

export const useTabs = (initTab: any, allTabs: any) => {
  const [currentIdx, setCurrentIdx] = useState(initTab);
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }

  return {
    currentItem: allTabs[currentIdx],
    changeItem: setCurrentIdx,
  };
};
