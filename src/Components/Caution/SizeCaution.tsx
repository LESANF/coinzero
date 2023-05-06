import React from "react";
import styled from "styled-components";

export const SizeCautionFrame = styled.div<{ bgColor: boolean }>`
  /* background-color: ${(props) => (props.bgColor ? "#fafafa" : "#fff")}; */
  background-color: #fafafa;
  height: 100%;
  @media screen and (max-width: 600px) {
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #799aff;
    z-index: 2000;
  }
`;
