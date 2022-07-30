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

function Home() {
    return (
        <>
            <Nav />
            <BannerCover />
            <Main />
            <Footer />
        </>
    );
}

export default Home();
