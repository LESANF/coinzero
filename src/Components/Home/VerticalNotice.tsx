import { useState, useEffect } from "react";
import styled from "styled-components";
import { Autoplay } from "swiper";
import { SwiperModule } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

const Frame = styled.div`
  height: 60px;
  grid-area: item1;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const Notice = styled.a`
  cursor: pointer;
  padding: 20px 0;
  align-items: center;
  display: flex;
  align-items: flex-start;
  border-top: 1px solid #e4e5e8;
`;

const NoticeSummary = styled.div`
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NoticeText = styled.span`
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #000;
  font-size: 14px;
  margin-bottom: 3px;
`;

const NoticeDate = styled.span`
  font-size: 10px;
  color: #7f8794;
`;

const NoticeTag = styled.span`
  margin-top: -3px;
  white-space: nowrap;
  float: left;
  display: flex;
  align-items: center;
  height: 20px;
  line-height: 1;
  padding: 0 8px;
  border-radius: 10px;
  background-color: #e4e5e8;
  font-size: 10px;
  color: #484d55;
`;

const swiperSetting: SwiperModule = {
  modules: [Autoplay],
  direction: "vertical",
  loop: true,
  autoplay: { delay: 4000, disableOnInteraction: false },
  speed: 550,
};

const swiperStyle = {
  height: "60px",
};

function VerticalNotice() {
  const [coinNews, setCoinNews] = useState([]);

  // const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
  // const URL = `${PROXY}/api/v1/posts/?auth_token=${process.env.REACT_APP_COINNEWS_API_KEY}&kind=news`;
  const URL = `https://newsdata.io/api/1/news?apikey=${process.env.REACT_APP_NEWSDATA_API_KEY}&country=kr&language=ko&category=business `;

  useEffect(() => {
    const getFetchNewsData = async () => {
      const {
        data: { results },
      } = await axios.get(URL);
      setCoinNews(results);
    };

    getFetchNewsData();
  }, []);

  return (
    <Frame>
      {swiperSetting && coinNews && (
        <Swiper {...swiperSetting} style={swiperStyle}>
          {coinNews.map((v: any, i: number) => {
            return (
              <SwiperSlide key={i}>
                <Notice target="_blank" href={v.link} rel="noopener noreferrer">
                  <NoticeTag>신규</NoticeTag>
                  <NoticeSummary>
                    <NoticeText>{v.description}</NoticeText>
                    <NoticeDate>{v.pubDate.split(" ")[0]}</NoticeDate>
                  </NoticeSummary>
                </Notice>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </Frame>
  );
}

export default VerticalNotice;
