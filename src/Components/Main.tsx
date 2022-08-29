import styled from 'styled-components';
import ButtonScroll from './ButtonScroll';
import CoinRank from './CoinRank';
import QuickSearch from './QuickSearch';
import VerticalNotice from './VerticalNotice';

const MainFrame = styled.div`
    @media screen and (min-width: 640px) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /* margin-top: 30px; */
        //margin-top: 30px;
        box-sizing: border-box;
        margin: 30px auto 0;
        width: 1024px;
        background-color: gray;
        margin-bottom: 100px;
    }
`;

const Frame = styled.div`
    //min-height: 600px;
    //height: 600px;
    @media screen and (min-width: 640px) {
        display: grid;
        grid-column-gap: 58px;
        grid-template-rows: 204px 73px 257px;
        grid-template-columns: 361px 1fr;
        grid-template-areas:
            'item3 item2'
            'item1 item2'
            'item4 item2';
        background-color: #fff;
    }
    /* display: grid;
    grid-template-columns: 4fr 6fr; */

    //웹뷰 형식 나중에 640으로 통일
    /* @media screen and (max-width: 640px) {
        display: none;
    } */
`;

function Main() {
    return (
        <MainFrame>
            <Frame>
                <VerticalNotice />
                <CoinRank />
                <QuickSearch />
                <ButtonScroll />
            </Frame>
        </MainFrame>
    );
}

export default Main;
