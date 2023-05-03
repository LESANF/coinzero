import { throttle } from "lodash";
import { useState, useEffect, useRef } from "react";
import dataEncoder from "./Utils/encoder";
import getLastBuffers from "./Utils/getLastBuffers";
import sortBuffer from "./Utils/sortBuffers";
import updateWsData from "./Utils/updateWsData";

function useGetWsData(searchCoin: any) {
  const THROTTLE_TIME = 400;
  const BINARY_TYPE = "arraybuffer";

  const UPBIT_WS_URL = "wss://api.upbit.com/websocket/v1";
  const ws = useRef<any>(null);
  const bf = useRef<any>([]);

  const [bufferData, setBufferData] = useState<any>([]);
  const [wsData, setWsData] = useState<any>(null);

  const throttled = throttle(() => {
    try {
      const lastBuffer = getLastBuffers(bf.current, searchCoin.length);
      const sortBufferData = sortBuffer(lastBuffer, searchCoin);
      if (sortBufferData) setBufferData(sortBufferData);
      bf.current = [];
    } catch (error) {
      console.error(error);
      return;
    }
  }, THROTTLE_TIME);

  useEffect(() => {
    try {
      if (!ws.current) {
        ws.current = new WebSocket(UPBIT_WS_URL);
        ws.current.binaryType = BINARY_TYPE;

        // open
        const openHandler = () => {
          const sendField = [
            { ticket: "coinzero" },
            {
              type: "ticker",
              codes: searchCoin.map((code: any) => code.market),
            },
          ];

          ws.current.send(JSON.stringify(sendField));
        };

        // close
        const closeHandler = () => {
          setBufferData([]);
          setWsData([]);
          bf.current = [];
        };

        // msg
        const msgHandler = (e: any) => {
          const wsData = dataEncoder(e.data);
          if (wsData) bf.current.push(wsData);
          // useRef 를 변수화 시켜 wsData를 담고 throttled 함수를 통해 bufferData 에 값을 넣어준다.
          // throttled 에서 useRef 에 담긴 wsData 값이 넣어진 후 초기화 된다.
          throttled();
        };

        ws.current.onopen = openHandler;
        ws.current.onclose = closeHandler;
        ws.current.onmessage = msgHandler;
      }

      return () => {
        if (ws.current) {
          ws.current.close();
          ws.current = null;
        }
      };
    } catch (error) {
      console.error(error);
    }
  }, [searchCoin]);

  useEffect(() => {
    if (bufferData.length > 0) {
      // throttled 를 통해 값이 들어왔을 때, 현재 wsData 에 담긴 값이 없다면,
      // bufferData 에 담긴 값을 wsData 에 옮겨준다.
      if (!wsData) {
        setWsData(bufferData);
      } else {
        // 만약 wsData가 있다면 (기존 값에 새로운 bufferData 값을 갱신해야함)
        setWsData((prev: any) => {
          return prev && updateWsData(prev, bufferData);
        });

        // 버퍼를 통해 가지고 있던 정보를 wsData로 갱신했기 때문에 기존의 buffer는 초기화 시켜준다.
        setBufferData([]);
      }
    }
  }, [bufferData]);

  return { socket: ws.current, wsData };
}

export default useGetWsData;
