import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { ChartData, ChartOptions, LineElement } from "chart.js";
import { Line } from "react-chartjs-2";
import { getSmallChartData } from "./getSmallChartData";

interface ICoinData {
  market: string;
  candle_date_time_utc: string | null;
  candle_date_time_kst: string | null;
  opening_price: number | null;
  high_price: number | null;
  low_price: number | null;
  trade_price: number | null;
  timestamp: number | null;
  candle_acc_trade_price: number | null;
  candle_acc_trade_volume: number | null;
  prev_closing_price: number | null;
  change_price: number | null;
  change_rate: number | null;
}

interface IChangeValue {
  changeValue: string;
}

function SmallChart({ changeValue }: IChangeValue) {
  Chart.register(LineElement);

  const [lineData, setLineData] = useState<ICoinData[] | null | undefined>([]);
  const [errorMsg, setErrorMsg] = useState<any>("");

  useEffect(() => {
    const fetchChartData = async () => {
      setErrorMsg("");
      try {
        const chartData = await getSmallChartData("KRW-BTT");
        setLineData(chartData);
      } catch (error) {
        setErrorMsg(error);
      }
    };

    fetchChartData();
  }, []);

  const lineStyle = {
    width: "140px",
    height: "68px",
    borderRadius: "6px",
  };

  const options: ChartOptions<"line"> = {
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
        title: {
          display: false,
          text: "Days",
        },
      },
      y: {
        display: false,
        title: {
          display: false,
          text: "Cost",
        },
      },
    },
  };

  return (
    <>
      {errorMsg && <div>{errorMsg}</div>}
      {lineData && (
        <Line
          style={lineStyle}
          data={{
            labels: lineData.map((obj: ICoinData) => {
              return obj["candle_date_time_kst"];
            }),

            datasets: [
              {
                backgroundColor: changeValue === "RISE" ? "rgba(255, 0, 0, 0.2)" : changeValue === "FALL" ? "rgba(0, 0, 255, 0.1)" : "#c4c4c4",
                borderColor: changeValue === "RISE" ? "rgba(255, 0, 0, 0.7)" : changeValue === "FALL" ? "rgba(0, 0, 255, 0.3)" : "#333",
                data: lineData.map((obj: ICoinData) => {
                  return obj["trade_price"];
                }),
                fill: true,
                pointRadius: 0,
              },
            ],
          }}
          options={options}
        />
      )}
    </>
  );
}

export default SmallChart;
