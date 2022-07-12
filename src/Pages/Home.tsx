import Footer from '../Components/Footer';
import Nav from '../Components/Nav';
import styled from 'styled-components';
import BannerCover from '../Components/BannerCover';

const NavTitle = styled.span`
    background: linear-gradient(to right bottom, #4147ff, #91c4ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: bold;
    font-size: 100px;
`;

const TestHome = styled.div`
    position: absolute;
    top: 68px;
`;

function Home() {
    return (
        <>
            <Nav />
            <TestHome>
                <BannerCover></BannerCover>
            </TestHome>
            <Footer />
        </>
    );
}

export default Home();
