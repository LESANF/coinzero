import React from "react";
import styled from "styled-components";

const VolumeFrame = styled.div`
  background-color: #fff;
  border-radius: 8px;

  grid-area: tradingVolume;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

function TradingVolume() {
  return <VolumeFrame>TradingVolume</VolumeFrame>;
}

export default TradingVolume;
