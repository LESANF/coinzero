function sortBuffer(buffers: any, sortOrder: any) {
  /**
   * sortOrder 는 searchCoin 임 searchCoin 은 찾으려고 하는 코인의 정보. 여러개가 될 수 있음.
   * buffers는 앞선 getLastBuffers 의 반환 값.
   */
  if (buffers.length === 0 || sortOrder.length === 0) return undefined;

  const tickerMap: any = {};
  // 여기서 ticker 은 코인의 정보를 담은 형태(type, code, 각종 가격들)
  // tickerMap은 빈 객체 'KRW-BTC' = {코인의 정보}
  // {KRW-BTC: {코인의 정보}} 형태로 이중 객체 형태로 만듦
  buffers.forEach((ticker: any) => (tickerMap[ticker.code] = ticker));

  const result: any = [];

  // market은 코인의 code와 같다 ex) KRW-BTC
  sortOrder.forEach(({ market }: any) => {
    const ticker = tickerMap[market];
    if (ticker) result.push(ticker);
  });

  // [{코인의 정보를 담은 형태}] 형태로 반환
  return result;
}

export default sortBuffer;
