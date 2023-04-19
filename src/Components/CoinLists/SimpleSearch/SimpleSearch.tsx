import React from "react";
import styled from "styled-components";

const SearchFrame = styled.div`
  background-color: #fff;
  border-radius: 8px;
  grid-area: tickerSearch;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
function SimpleSearch() {
  return <SearchFrame>SimpleSearch</SearchFrame>;
}

export default SimpleSearch;
