import { cloneDeep } from "lodash";

function updateWsData(prevData: any, newData: any) {
  /**
   * 이전 값 wsData와 새로운값 bufferData를 인자로 받아서 합쳐주는 함수
   */
  try {
    // lodash 의 깊은 복사를 사용하여 객체를 복사한다.
    // 깊은 복사란 메모리 주소까지 별도로 잡아 복사하는 형태
    // 깊은 복사를 하는 이유는 원본을 변경해도 복사본에 영향이 가지않게 하기위해서이다.
    // 얕은 복사(shallowCopy)는 메모리 주소를 참조하기 때문에 원본에 영향이 간다.
    const cpPrevData = cloneDeep(prevData);
    const cpNew = cloneDeep(newData);

    // 0 은 거짓, 참은 1을 이용하여, 길이를 통해 하나라도 참이면 return 값 반환
    // 값이 있을경우 lenght 의 값은 true 로 잡히지만 앞의 부정연산자 때문에 false 로 처리
    // 두 값중 하나라도 값이 없다면, return 값 반환

    if (!cpPrevData.length || !cpNew.length) {
      return cpPrevData || cpNew;
    }

    // cur(현재 값) 을 풀어서 ['KRW-BTC'] : {코인 정보} 형태로 key: value 형태로 만들어준다
    // ...acc 를 통해 이전 값들을 유지하며 새로운 값을 추가하는 형태
    const cpPrevDataIndex = cpPrevData.reduce((acc: any, cur: any) => ({ ...acc, [cur.code]: cur }), {} as { [key: string]: any });

    cpNew.forEach((ele: any) => {
      // 위에서 [ele.code] : info  형태로 잡아줬기 때문에 cpNew(새로운 값)의 요소의 code, ex)KRW-BTC 형태로 값을 매칭할 수 있다.
      const target = cpPrevDataIndex[ele.code];

      // target이 존재한다면 assign을 통해 기존 target에 새로운 ele를 추가한다.
      // 기존 key 의 값이 있다면 덮어 써지기때문에 최신 정보를 갱신하는 형태이다.
      // key 값이 없다면 else 를 통해 요소를 추가하고 합쳐진 값을 return 한다.
      if (target) {
        Object.assign(target, ele);
      } else {
        cpPrevData.push(ele);
      }
    });

    return cpPrevData;
  } catch (error) {
    console.error(error);
    return prevData;
  }
}

export default updateWsData;
