import styled from 'styled-components';
import CoinRank from './CoinRank';
import QuickSearch from './QuickSearch';

const MainFrame = styled.div`
    margin: 30px 120px auto;
    min-height: 600px;
    height: 600px;
    display: grid;
    grid-template-columns: 4fr 6fr;
    background-color: red;
`;

function Main() {
    return (
        <MainFrame>
            <QuickSearch />
            <CoinRank />
        </MainFrame>
    );
}

export default Main;
