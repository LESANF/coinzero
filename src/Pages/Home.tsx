import Footer from '../Components/Home/Footer';
import Nav from '../Components/Home/Nav';
import styled from 'styled-components';
import BannerCover from '../Components/Home/BannerCover';
import Main from '../Components/Home/Main';
import * as C from '../Components/Caution/SizeCaution';

const NavTitle = styled.span`
    background: linear-gradient(to right bottom, #4147ff, #91c4ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: bold;
    font-size: 100px;
`;

const Banner = styled.div`
    position: absolute;
    top: 68px;
`;

const ScreenMsg = styled.span`
    font-size: 18px;
    color: white;
    @media screen and (min-width: 600px) {
        display: none;
    }
`;

function Home() {
    return (
        <C.SizeCautionFrame>
            <ScreenMsg>모바일 환경은 지원하지 않아요 더 큰 화면에서 이용해주세요 😮‍💨</ScreenMsg>
            <Nav />
            <BannerCover />
            <Main />
            <Footer />
        </C.SizeCautionFrame>
    );
}

export default Home();
