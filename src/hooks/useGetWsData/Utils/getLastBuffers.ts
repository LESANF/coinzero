function getLastBuffers(buffer: any, searchCoinLen: number) {
  try {
    const result: any = [];
    /**
     * buffer에 실시간 데이터가 쌓임
     * buffer의 길이 만큼 반복됨.
     * flag 가 false 일 때, 반복문이 계속 동작하고 true 이면 내부 반복문 탈출
     * true 라는 뜻은 반환 할 result에 값이 들어가게되면 종료됨.
     * false일 경우 result에 현재 buffer[index] 값을 넣고 result와 searchCoin의 길이가 같거나 크면 외부 반복문 break
     * 그리고 해당 result를 반환.
     */
    for (let i = buffer.length - 1; i >= 0; i--) {
      let flag = false;

      for (let j = 0; j < result.length; j++) {
        if (result[j].code === buffer[i].code) {
          flag = true;
          break;
        }
      }

      if (!flag) {
        result.push(buffer[i]);
        if (result.length >= searchCoinLen) break;
      }
    }
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default getLastBuffers;
