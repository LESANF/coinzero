import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import dayjs from "dayjs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import axios from "axios";

const Frame = styled.div`
  background-color: #fff;
  box-shadow: 0 3px 10px 0 rgba(66, 66, 66, 0.05);
  border: 1px solid #e4e5e8;
  grid-area: item4;
  overflow: hidden;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

//Title, Button
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 12px 12px 3px 12px;
  height: 41px;
`;

const ListTitle = styled.h2`
  font-size: 12px;
  font-weight: 700;
  color: #aeb3bb;
`;

const ListDay = styled.span`
  font-size: 10px;
  margin-left: 5;
`;

//Up, Down Btn
const BtnBox = styled.div`
  display: flex;
  button:first-child {
    margin-right: 2px;
  }
`;

const ListBtnUp = styled.button<{ curPosition: number; curTop: number }>`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 2px;
  border: 1px solid #e4e5e8;
  color: ${(props) => {
    if (props.curPosition === 0) {
      return "#aeb3bb";
    } else {
      return "#000";
    }
  }};
  font-size: 14px;
`;

const ListBtnDown = styled.button<{ curPosition: number; curTop: number }>`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 2px;
  border: 1px solid #e4e5e8;
  color: ${(props) => {
    if (props.curTop - props.curPosition - 215 === 0) {
      return "#aeb3bb";
    } else {
      return "#000";
    }
  }};
  font-size: 14px;
`;

const Content = styled.div`
  height: 215px;
  overflow-x: hidden;
  /* 스크롤 스타일 변경 */
  ::-webkit-scrollbar {
    width: 3px; /* 세로축 스크롤바 길이 */
  }

  ::-webkit-scrollbar-track {
    background-color: lightblue;
  }

  ::-webkit-scrollbar-track-piece {
    background-color: #eee;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;

    background-color: #ccc;
  }
`;

//ItemList
const Items = styled.ul`
  padding: 0 12px 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Item = styled.li<{ id: any }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  margin-bottom: 12px;
  width: 100%;
  height: auto;
  background-color: #f8f8f9;
  border-radius: 8px;
  padding: 8px 10px;
`;

const ItemTitle = styled.span`
  font-size: 10px;
  color: #7f8794;
`;
const ItemContent = styled.span`
  line-height: 1.5;
  margin-top: 12px;
  font-size: 12px;
  color: #484d55;
  word-break: keep-all;
`;

// const AddSummary = styled.p`
//   @keyframes test {
//     from {
//       max-height: 0px;
//     }
//     to {
//       max-height: 150px;
//     }
//   }

//   color: #aeb3bb;
//   font-size: 10px;
//   padding-top: 7px;
//   line-height: 1.5;
//   overflow: hidden;
//   animation: test 0.3s;
// `;

//Footer Sign
const FooterSign = styled.p`
  margin-bottom: 10px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: #acb3bb;
  transform: scale(0.9);
`;

function ButtonScroll() {
  const [curScrollPos, setCurScrollPos] = useState<number>(0);
  const [curScrollH, setCurScrollH] = useState<number>(0);
  const [foldingState, setFoldingState] = useState<boolean>(false);
  const [coinNews, setCoinNews] = useState([]);

  const PROXY = window.location.hostname === "localhost" ? "https://newsdata.io" : "/proxy";
  const URL = `/api/1/news?apikey=${process.env.REACT_APP_NEWSDATA_API_KEY}&country=kr&language=ko&category=business`;
  const options = { method: "GET", headers: { Accept: "application/json" } };

  useEffect(() => {
    const getFetchNewsData = async () => {
      const response = await fetch(`${PROXY}${URL}`, options);
      const data = await response.json();
      setCoinNews(data.results);
    };

    getFetchNewsData();
  }, []);

  //get Date
  const now = dayjs();

  //scroll event
  const contentScrl = useRef<HTMLDivElement | null>(null);
  const ulScrl = useRef<HTMLUListElement | null>(null);

  const scrollDiv = _.throttle((e: React.UIEvent<HTMLDivElement>) => {
    if (contentScrl.current && ulScrl.current) {
      setCurScrollH(contentScrl.current.scrollHeight);
      setCurScrollPos(contentScrl.current.scrollTop);
    }
  }, 500);

  const listScrollUp = () => {
    let moveUpPos;
    const curVal = contentScrl.current;
    if (curVal) {
      moveUpPos = curVal.scrollTop - Math.floor(curVal.scrollHeight / 3);
      curVal.scrollTo({ top: moveUpPos, behavior: "smooth" });
    }
  };
  const listScrollDown = () => {
    let moveDownPos;
    const curVal = contentScrl.current;
    if (curVal) {
      moveDownPos = curVal.scrollTop + Math.floor(curVal.scrollHeight / 3);
      curVal.scrollTo({ top: moveDownPos, behavior: "smooth" });
    }
  };

  //folding state
  const changeFolding = (e: React.MouseEvent<HTMLLIElement>) => {
    console.log(e.currentTarget.id);
    setFoldingState((prev) => !prev);
    if (contentScrl.current) {
      setCurScrollPos(contentScrl.current.scrollTop);
    }
  };

  return (
    <Frame>
      <Header>
        <ListTitle>
          TopNews <ListDay>{now.format("YYYY-MM-DD")}</ListDay>
        </ListTitle>
        <BtnBox>
          <ListBtnUp disabled={curScrollPos === 0} curPosition={curScrollPos} curTop={curScrollH} onClick={listScrollUp}>
            <IoIosArrowUp />
          </ListBtnUp>
          <ListBtnDown disabled={curScrollH - curScrollPos - 215 === 0} curPosition={curScrollPos} curTop={curScrollH} onClick={listScrollDown}>
            <IoIosArrowDown />
          </ListBtnDown>
        </BtnBox>
      </Header>
      <Content ref={contentScrl} onScroll={scrollDiv}>
        {coinNews && (
          <>
            <Items ref={ulScrl}>
              {coinNews.map((v: any, i: number) => (
                <Item key={i} id={i}>
                  <ItemTitle>{v.pubDate.split(" ")[0]}</ItemTitle>
                  <ItemContent>
                    <a href={v.link} target="_blank" rel="noopener noreferrer">
                      {v.title}
                    </a>
                  </ItemContent>
                </Item>
              ))}
            </Items>
            <FooterSign>MADE BY LESA</FooterSign>
          </>
        )}
      </Content>
    </Frame>
  );
}

export default ButtonScroll;
