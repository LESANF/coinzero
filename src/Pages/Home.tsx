import Footer from '../Components/Footer';
import Nav from '../Components/Nav';
import styled from 'styled-components';

const Test = styled.h1`
    font-size: 200px;
`;

function Home() {
    return (
        <>
            <Nav />
            <Test>Home</Test>
            <Footer />
        </>
    );
}

export default Home();
