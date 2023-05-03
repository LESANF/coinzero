import React from "react";
import Footer from "../Components/Home/Footer";
import Nav from "../Components/Home/Nav";
import styled from "styled-components";
import BannerCover from "../Components/Home/BannerCover";
import Main from "../Components/Home/Main";
import * as C from "../Components/Caution/SizeCaution";

const ScreenMsg = styled.span`
  font-size: 18px;
  color: white;

  @media screen and (min-width: 600px) {
    display: none;
  }
`;

function Home() {
  return (
    <C.SizeCautionFrame bgColor={window.location.href.includes("coins")}>
      <ScreenMsg>모바일 환경은 지원하지 않아요 더 큰 화면에서 이용해주세요 😮‍💨</ScreenMsg>
      <Nav coinDetail={false} />
      <BannerCover />
      <Main />
      <Footer />
    </C.SizeCautionFrame>
  );
}

export default React.memo(Home);
