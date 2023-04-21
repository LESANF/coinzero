import { useState, useEffect, useRef } from "react";

const UPBIT_WS_API = "wss://api.upbit.com/websocket/v1";

export const useGetLiveData = (wsCoin: any) => {
  const [result, setResult] = useState<any>();
  const [timer, setTimer] = useState(false);

  const ws = useRef<WebSocket | null>(null);
  const data = [{ ticket: "test1" }, { type: "ticker", codes: [wsCoin], isOnlyRealtime: true }];

  useEffect(() => {
    if (timer) alert("시간이 만료되었습니다.");
    ws.current?.close();
  }, [timer]);

  useEffect(() => {
    setTimeout(() => {
      setTimer(true);
    }, 60 * 1000 * 10);

    ws.current = new WebSocket(UPBIT_WS_API);
    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify(data));
    };
    ws.current.onclose = () => {
      console.log("DISCONNECTED");
    };

    ws.current.onmessage = async (e: any) => {
      const text = await new Response(e.data).text();
      const message = JSON.parse(text);
      const { code, high_price, low_price, change, prev_closing_price, opening_price, trade_price, acc_trade_volume_24h, acc_trade_price_24h, timestamp, trade_volume } = message;

      setResult({
        change,
        trade_price,
        opening_price,
        code,
        high_price,
        low_price,
        prev_closing_price,
        acc_trade_volume_24h,
        acc_trade_price_24h,
        timestamp: Math.floor(timestamp / 24 / 60 / 60 / 1000) * 24 * 60 * 60 * 1000,
        turnover: ((opening_price + low_price + high_price + trade_price) / 4) * trade_volume,
      });
    };

    ws.current.onerror = (e) => {
      console.log(`ERROR: ${e}`);
      ws.current?.close();
    };

    return () => {
      ws.current?.close();
    };
  }, []);
  return result;
};
