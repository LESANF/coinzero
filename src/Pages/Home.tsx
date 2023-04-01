import Footer from '../Components/Footer';
import Nav from '../Components/Nav';
import styled from 'styled-components';
import BannerCover from '../Components/BannerCover';
import Main from '../Components/Main';

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

const HomeFrame = styled.div`
    @media screen and (max-width: 600px) {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #799aff;
        z-index: 1000;
    }
`;

const ScreenMsg = styled.span`
    font-size: 18px;
    color: white;
`;

function Home() {
    return (
        <HomeFrame>
            <ScreenMsg>모바일 환경은 지원하지 않아요 더 큰 화면에서 이용해주세요 😮‍💨</ScreenMsg>
            <Nav />
            <BannerCover />
            <Main />
            <Footer />
        </HomeFrame>
    );
}

export default Home();
