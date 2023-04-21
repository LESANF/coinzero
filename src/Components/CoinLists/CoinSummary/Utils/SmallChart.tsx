import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { ChartData, ChartOptions, LineElement } from "chart.js";
import { Line } from "react-chartjs-2";

interface IChangeValue {
  changeValue: string;
  lineData: any;
}

function SmallChart({ changeValue, lineData }: IChangeValue) {
  Chart.register(LineElement);

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
      {lineData && (
        <Line
          style={lineStyle}
          data={{
            labels: lineData.map((obj: any) => {
              return obj["candle_date_time_kst"];
            }),

            datasets: [
              {
                backgroundColor: changeValue === "RISE" ? "rgba(255, 0, 0, 0.2)" : changeValue === "FALL" ? "rgba(0, 0, 255, 0.1)" : "#c4c4c4",
                borderColor: changeValue === "RISE" ? "rgba(255, 0, 0, 0.7)" : changeValue === "FALL" ? "rgba(0, 0, 255, 0.3)" : "#333",
                data: lineData.map((obj: any) => {
                  return obj["close"];
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
