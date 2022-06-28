import Footer from '../Components/Footer';
import Nav from '../Components/Nav';
import styled from 'styled-components';

const NavTitle = styled.span`
    background: linear-gradient(to right bottom, #4147ff, #91c4ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: bold;
    font-size: 100px;
`;

function Home() {
    return (
        <>
            <Nav />
            <NavTitle>Home</NavTitle>
            <Footer />
        </>
    );
}

export default Home();
