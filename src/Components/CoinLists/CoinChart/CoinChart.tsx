import React from "react";
import styled from "styled-components";
import Loading from "../Utils/LoadingSpinner";

const ChartFrame = styled.div`
  background-color: #fff;
  border-radius: 8px;
  grid-area: chart;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

function CoinChart() {
  return (
    <ChartFrame>
      <Loading loading={true} size={150} />
    </ChartFrame>
  );
}

export default CoinChart;
