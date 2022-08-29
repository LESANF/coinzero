import styled from 'styled-components';
import CoinRank from './CoinRank';
import QuickSearch from './QuickSearch';

const MainFrame = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px auto 0;
    width: 1024px;
    background-color: gray;
`;

const Frame = styled.div`
    //min-height: 600px;
    //height: 600px;
    min-width: 1024px;
    width: 1024px;
    display: grid;
    grid-template-columns: 4fr 6fr;
    background-color: #fff;

    //웹뷰 형식 나중에 640으로 통일
    @media screen and (max-width: 640px) {
        display: none;
    }
`;

function Main() {
    return (
        <MainFrame>
            <Frame>
                <QuickSearch />
                <CoinRank />
            </Frame>
        </MainFrame>
    );
}

export default Main;
