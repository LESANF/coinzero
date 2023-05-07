import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegPaperPlane, FaAlignJustify } from "react-icons/fa";
import { MdOutlineFiberNew } from "react-icons/md";
import { useState, useRef } from "react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";

const Navbar = styled.nav<INavProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 68px;
  width: 100vw;
  background-color: ${(props) => (props.coinDetail ? "#fafafa" : "#fff")};

  min-width: 600px;
  z-index: 1000;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const NavInner = styled.div`
  padding: 0 20px;
  display: flex;
  margin: 0 auto;
  height: 100%;
  max-width: 1440px;
  align-items: center;
`;

//Nav Logo
const NavTitle = styled.div`
  background: linear-gradient(to right bottom, #020bff, #9ccaff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 38px;
  cursor: pointer;
  flex-grow: 1;
`;

//Nav Items
const NavMenu = styled.ul`
  height: inherit;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 24px;
  /* margin: 0 0 0 24px; */
  font-size: 16px;
  flex-grow: 2;
`;

const NavItem = styled(motion.li)<{ coindetail: string }>`
  a {
    color: ${(props) => (props.coindetail === "true" ? "#1772f8" : "#000")};
  }
  font-size: 18px;
  height: 30px;
  min-width: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 550;
  margin: 0 6px;
  padding: 6px 10px 6px 10px;
  border-radius: 6px;
  &:first-child {
    margin-right: 6px;
  }
  &:last-child {
    margin-left: 6px;
  }
`;

//Nav Contents(AD, Notice, etc...)
const NavContents = styled.div`
  /* position: relative; */
  height: inherit;
  width: 360px;
  /* margin: 0 0 0 500px; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

//Nav AD
const NavAd = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 140px;
  min-width: 140px;
  border-radius: 16px;
`;

const NavAdLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit;
`;

const NavItemVari = {
  start: {
    backgroundColor: "#fff",
  },
  end: {
    backgroundColor: "#eaf4ff",
  },
  exit: {
    backgroundColor: "#fff",
  },
};

const NavItemCoinVari = {
  start: {
    backgroundColor: "#fafafa",
  },
  end: {
    backgroundColor: "#eaf4ff",
  },
  exit: {
    backgroundColor: "#fafafa",
  },
};

//Nav Notice
const NavNotice = styled(motion.div)`
  position: relative;
  min-width: 124px;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
`;

const NavNoticeBox = styled(motion.div)<{ $dropMenuFlag: boolean }>`
  opacity: ${(props) => (props.$dropMenuFlag ? "0.3" : "1")};
  padding: 10px;
  cursor: pointer;
  height: inherit;
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s ease-in-out;
`;

const NavNoticeIcon = styled(motion.div)`
  opacity: 0.7;
  margin-right: 6px;
`;

const NavNoticeTitle = styled(motion.span)`
  opacity: 0.7;
  font-size: 15px;
  font-weight: bold;
`;

const NavNoticeDownMenu = styled(motion.div)`
  position: absolute;
  border-radius: 10px;
  top: 60px;
  right: 25px;
  height: 400px;
  width: 348px;
  background-color: #fff;
  z-index: -1000;
  box-shadow: 0 2px 12px 0 rgba(37, 42, 49, 0.08), 0 2px 5px 0 rgba(37, 42, 49, 0.15);
  overflow: auto;

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

const NavNoticeDropMenuVari = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

//Nav Notice DropMenu
const DropMenuHeader = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`;
const DropMenuTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
`;
const DropMenuLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  color: #1772f8;
  cursor: pointer;
`;

const DropMenuLinkIcon = styled.span`
  margin-left: 3px;
  font-size: 14px;
`;
const DropMenuScrollable = styled.div<{ headerHeight: number }>`
  margin-top: 16px;
  height: calc(400px - ${(props) => props.headerHeight}px);
  display: flex;
  flex-direction: column;
`;
const DropMenuList = styled.ul`
  margin: 0;
  padding: 0 24px;
  list-style: none;
`;
const DropMenuItem = styled.li`
  cursor: pointer;
  margin-bottom: 30px;
`;
const DropMenuNoticeLink = styled.a``;

const NoticeTagDateBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const NoticeTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 400;
  background-color: #f8f8f9;
  color: #484d55;
`;
const NoticeDate = styled.div`
  margin-left: 6px;
  padding-top: 2px;
  font-size: 14px;
  color: #aeb3bb;
`;
const NoticeTitle = styled(motion.p)`
  display: flex;
  position: relative;
  font-size: 15px;
  color: #18191c;
  line-height: 1.79;
`;

const NoticeNew = styled.span`
  position: absolute;
  top: -6px;
  right: 75px;
  color: #1772f8;
  font-size: 21px;
`;

interface INavProps {
  coinDetail: boolean;
}

//Nav Component
const Nav = ({ coinDetail }: INavProps) => {
  // NavDropMenu State
  const [dropMenuFlag, setDropMenuFlag] = useState(false);
  const chkMenuFlag = () => setDropMenuFlag((prev) => !prev);
  const testRef = useRef<HTMLDivElement>(null);
  const dropMenuHeaderH = testRef.current?.clientHeight;
  return (
    <Navbar coinDetail={coinDetail}>
      <NavInner>
        {/* 로고 대체 */}
        <Link to={process.env.PUBLIC_URL + "/"}>
          <NavTitle>coinzero</NavTitle>
        </Link>
        {/* 메뉴 */}
        <NavMenu>
          <AnimatePresence>
            <NavItem variants={coinDetail ? NavItemCoinVari : NavItemVari} initial="start" whileHover="end" coindetail={coinDetail.toString()}>
              <Link to={process.env.PUBLIC_URL + "/coins"}>코인</Link>
            </NavItem>
            {/* <NavItem>
                            <Link to="/">거래소</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/">거래소</Link>
                        </NavItem> */}
          </AnimatePresence>
        </NavMenu>
        {/* 컨텐츠 모음(광고, 공지사항, 기타등등) */}
        <NavContents>
          {/* 광고 부분(Github로 대체) */}
          <NavAd>
            <NavAdLink target="blank" href={process.env.REACT_APP_MYGITHUBADDR}>
              <CIcon icon={icon.cibGithub} style={{ width: "22px", height: "22px", paddingRight: "10px" }} />
              <span style={{ fontWeight: 700 }}>Github</span>
              {/* <CIcon icon={icon.cibNotion} style={{ width: "24px", height: "24px" }} />
              <CIcon icon={icon.cibLinkedin} style={{ width: "24px", height: "24px" }} />
              <CIcon icon={icon.cibReact} style={{ width: "24px", height: "24px" }} /> */}
            </NavAdLink>
          </NavAd>
          {/* 공지사항 */}
          <NavNotice onMouseEnter={chkMenuFlag} onMouseLeave={chkMenuFlag}>
            <NavNoticeBox $dropMenuFlag={dropMenuFlag}>
              <NavNoticeIcon>
                <FaRegPaperPlane />
              </NavNoticeIcon>
              <NavNoticeTitle>RESUME</NavNoticeTitle>
            </NavNoticeBox>
            {/* 공지사항 Hover DropDown Menu */}
            {dropMenuFlag && (
              <NavNoticeDownMenu variants={NavNoticeDropMenuVari} initial="initial" animate="animate">
                <DropMenuHeader ref={testRef}>
                  <DropMenuTitle>RESUME</DropMenuTitle>
                  <DropMenuLink href="#">
                    <DropMenuLinkIcon>
                      <FaAlignJustify />
                    </DropMenuLinkIcon>
                  </DropMenuLink>
                </DropMenuHeader>
                <DropMenuScrollable headerHeight={Number(dropMenuHeaderH)}>
                  <DropMenuList>
                    <a href={process.env.REACT_APP_NOTION_RESUME} target="_blank" rel="noopener noreferrer">
                      <DropMenuItem>
                        <NoticeTagDateBox>
                          <NoticeTag>신규</NoticeTag>
                          <NoticeDate>Notion</NoticeDate>
                        </NoticeTagDateBox>
                        <NoticeTitle whileHover={{ opacity: 0.5 }}>
                          <CIcon icon={icon.cibNotion} style={{ width: "24px", height: "24px", paddingRight: "10px" }} />
                          자기소개서 및 인적사항
                          <NoticeNew>
                            <MdOutlineFiberNew />
                          </NoticeNew>
                        </NoticeTitle>
                      </DropMenuItem>
                    </a>
                    <a href={process.env.REACT_APP_LINKEDIN_PROFILE} target="_blank" rel="noopener noreferrer">
                      <DropMenuItem>
                        <NoticeTagDateBox>
                          <NoticeTag>신규</NoticeTag>
                          <NoticeDate>LinkedIn</NoticeDate>
                        </NoticeTagDateBox>
                        <NoticeTitle whileHover={{ opacity: 0.5 }}>
                          <CIcon icon={icon.cibLinkedin} style={{ width: "24px", height: "24px", paddingRight: "10px" }} />
                          Linkedin Profile
                          <NoticeNew style={{ right: 130 }}>
                            <MdOutlineFiberNew />
                          </NoticeNew>
                        </NoticeTitle>
                      </DropMenuItem>
                    </a>
                    <a href={process.env.REACT_APP_PORTFOLIO_WEBPAGE} target="_blank" rel="noopener noreferrer">
                      <DropMenuItem>
                        <NoticeTagDateBox>
                          <NoticeTag>신규</NoticeTag>
                          <NoticeDate>Portfolio</NoticeDate>
                        </NoticeTagDateBox>
                        <NoticeTitle whileHover={{ opacity: 0.5 }}>
                          <CIcon icon={icon.cibReact} style={{ width: "24px", height: "24px", paddingRight: "10px" }} />
                          포트폴리오 웹 페이지
                          <NoticeNew style={{ right: 90 }}>
                            <MdOutlineFiberNew />
                          </NoticeNew>
                        </NoticeTitle>
                      </DropMenuItem>
                    </a>
                    <a href={process.env.REACT_APP_VELOG} target="_blank" rel="noopener noreferrer">
                      <DropMenuItem>
                        <NoticeTagDateBox>
                          <NoticeTag>신규</NoticeTag>
                          <NoticeDate>Velog</NoticeDate>
                        </NoticeTagDateBox>
                        <NoticeTitle whileHover={{ opacity: 0.5 }}>
                          <CIcon icon={icon.cibBlogger} style={{ width: "24px", height: "24px", paddingRight: "10px" }} />
                          Velog 기술 블로그
                          <NoticeNew style={{ right: 113 }}>
                            <MdOutlineFiberNew />
                          </NoticeNew>
                        </NoticeTitle>
                      </DropMenuItem>
                    </a>
                  </DropMenuList>
                </DropMenuScrollable>
              </NavNoticeDownMenu>
            )}
          </NavNotice>
        </NavContents>
      </NavInner>
    </Navbar>
  );
};

export default Nav;
