import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegPaperPlane, FaAlignJustify } from 'react-icons/fa';
import { MdOutlineFiberNew } from 'react-icons/md';
import { useState, useRef } from 'react';

const Navbar = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 68px;
    width: 100vw;
    background-color: #fff;
    min-width: 500px;
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

const NavItem = styled(motion.li)`
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
    height: 30px;
    width: 240px;
    min-width: 240px;
    background-color: #72b4ff;
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
        backgroundColor: '#fff',
    },
    end: {
        backgroundColor: '#eaf4ff',
    },
    exit: {
        backgroundColor: '#fff',
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
    opacity: ${(props) => (props.$dropMenuFlag ? '0.3' : '1')};
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
    margin-bottom: 8px;
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
    position: relative;
    font-size: 15px;
    color: #18191c;
    line-height: 1.79;
`;

const NoticeNew = styled.span`
    position: absolute;
    top: -6px;
    color: #1772f8;
    font-size: 21px;
`;

//Nav Component
function Nav() {
    // NavDropMenu State
    const [dropMenuFlag, setDropMenuFlag] = useState(false);
    const chkMenuFlag = () => setDropMenuFlag((prev) => !prev);
    const testRef = useRef<HTMLDivElement>(null);
    const dropMenuHeaderH = testRef.current?.clientHeight;

    return (
        <Navbar>
            <NavInner>
                {/* 로고 대체 */}
                <Link to="/">
                    <NavTitle>coinzero</NavTitle>
                </Link>
                {/* 메뉴 */}
                <NavMenu>
                    <AnimatePresence>
                        <NavItem variants={NavItemVari} initial="start" whileHover="end">
                            <Link to="/">거래소</Link>
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
                            github 바로가기
                        </NavAdLink>
                    </NavAd>
                    {/* 공지사항 */}
                    <NavNotice onMouseEnter={chkMenuFlag} onMouseLeave={chkMenuFlag}>
                        <NavNoticeBox $dropMenuFlag={dropMenuFlag}>
                            <NavNoticeIcon>
                                <FaRegPaperPlane />
                            </NavNoticeIcon>
                            <NavNoticeTitle>공지사항</NavNoticeTitle>
                        </NavNoticeBox>
                        {/* 공지사항 Hover DropDown Menu */}
                        {dropMenuFlag && (
                            <NavNoticeDownMenu
                                variants={NavNoticeDropMenuVari}
                                initial="initial"
                                animate="animate"
                            >
                                <DropMenuHeader ref={testRef}>
                                    <DropMenuTitle>공지사항</DropMenuTitle>
                                    <DropMenuLink href="/notice">
                                        더보기
                                        <DropMenuLinkIcon>
                                            <FaAlignJustify />
                                        </DropMenuLinkIcon>
                                    </DropMenuLink>
                                </DropMenuHeader>
                                <DropMenuScrollable headerHeight={Number(dropMenuHeaderH)}>
                                    <DropMenuList>
                                        <DropMenuItem>
                                            <DropMenuNoticeLink href="/notice/content1">
                                                <NoticeTagDateBox>
                                                    <NoticeTag>상장</NoticeTag>
                                                    <NoticeDate>2022.06.29</NoticeDate>
                                                </NoticeTagDateBox>
                                                <NoticeTitle whileHover={{ opacity: 0.5 }}>
                                                    거래지원 종료 안내: BIOT
                                                    <NoticeNew>
                                                        <MdOutlineFiberNew />
                                                    </NoticeNew>
                                                </NoticeTitle>
                                            </DropMenuNoticeLink>
                                        </DropMenuItem>
                                        <DropMenuItem>
                                            <NoticeTagDateBox>
                                                <NoticeTag>상장</NoticeTag>
                                                <NoticeDate>2022.06.29</NoticeDate>
                                            </NoticeTagDateBox>
                                            <NoticeTitle>거래지원 종료 안내: BIOT</NoticeTitle>
                                        </DropMenuItem>
                                        <DropMenuItem>
                                            <NoticeTagDateBox>
                                                <NoticeTag>상장</NoticeTag>
                                                <NoticeDate>2022.06.29</NoticeDate>
                                            </NoticeTagDateBox>
                                            <NoticeTitle>거래지원 종료 안내: BIOT</NoticeTitle>
                                        </DropMenuItem>
                                        <DropMenuItem>
                                            <NoticeTagDateBox>
                                                <NoticeTag>상장</NoticeTag>
                                                <NoticeDate>2022.06.29</NoticeDate>
                                            </NoticeTagDateBox>
                                            <NoticeTitle>거래지원 종료 안내: BIOT</NoticeTitle>
                                        </DropMenuItem>
                                        <DropMenuItem>
                                            <NoticeTagDateBox>
                                                <NoticeTag>상장</NoticeTag>
                                                <NoticeDate>2022.06.29</NoticeDate>
                                            </NoticeTagDateBox>
                                            <NoticeTitle>거래지원 종료 안내: BIOT</NoticeTitle>
                                        </DropMenuItem>
                                    </DropMenuList>
                                </DropMenuScrollable>
                            </NavNoticeDownMenu>
                        )}
                    </NavNotice>
                </NavContents>
            </NavInner>
        </Navbar>
    );
}

export default Nav;
