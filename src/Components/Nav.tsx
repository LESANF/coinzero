import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegPaperPlane } from 'react-icons/fa';

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

    @media screen and (max-width: 500px) {
        display: none;
    }
`;

const NavInner = styled.div`
    /* margin: 0 0 0 233px;
    width: inherit;
    height: inherit; */
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    height: 100%;
    max-width: 1440px;
    align-items: center;
`;

//Nav Logo
const NavTitle = styled.span`
    background: linear-gradient(to right bottom, #020bff, #9ccaff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 38px;
    display: inline-block;
    cursor: pointer;
`;

//Nav Items
const NavMenu = styled.ul`
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 0 24px;
    font-size: 16px;
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
    height: inherit;
    width: 360px;
    margin: 0 0 0 500px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    min-width: 124px;
    height: inherit;
    cursor: pointer;
    /* padding: 0 24px; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    opacity: 0.7;
`;
const NavNoticeIcon = styled.div`
    margin-right: 6px;
`;

const NavNoticeTitle = styled.span`
    font-size: 15px;
    font-weight: bold;
`;

const NavNoticeVari = {
    hover: {
        opacity: 0.3,
    },
};

console.log(process.env.MYGITHUB);
//Nav Component
function Nav() {
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
                        <NavItem
                            variants={NavItemVari}
                            initial="start"
                            whileHover="end"
                            exit="  backgroundColor: 'none',"
                        >
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
                    <NavNotice variants={NavNoticeVari} whileHover="hover">
                        <NavNoticeIcon>
                            <FaRegPaperPlane />
                        </NavNoticeIcon>
                        <NavNoticeTitle>공지사항</NavNoticeTitle>
                    </NavNotice>
                </NavContents>
            </NavInner>
        </Navbar>
    );
}

export default Nav;
