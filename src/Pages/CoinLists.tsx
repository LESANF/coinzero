import React from 'react';
import Nav from '../Components/Home/Nav';
import styled from 'styled-components';
import CoinSummary from '../Components/CoinLists/CoinSummary';
import CoinChart from '../Components/CoinLists/CoinChart';
import SimpleSearch from '../Components/CoinLists/SimpleSearch';
import TradingVolume from '../Components/CoinLists/TradingVolume';
import * as C from '../Components/Caution/SizeCaution';

const CoinListsFrame = styled.div`
    margin-top: 68px;
    background-color: peru;
    border: 1px solid black;
    height: 100vh;
    display: grid;
    grid-template-columns: 2fr 1fr;
    @media screen and (max-width: 600px) {
        display: none;
    }
`;

const CoinListFrame = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: blue;
`;

const QuickSearchFrame = styled.div`
    background-color: green;
    justify-content: center;
    align-items: center;
`;

const ScreenMsg = styled.span`
    font-size: 18px;
    color: white;
    @media screen and (max-width: 600px) {
        display: none;
    }
`;

function CoinLists() {
    return (
        <C.SizeCautionFrame>
            <ScreenMsg>모바일 환경은 지원하지 않아요 더 큰 화면에서 이용해주세요 😮‍💨</ScreenMsg>
            <Nav />
            <CoinListsFrame>
                <CoinListFrame>
                    <CoinSummary></CoinSummary>
                    <CoinChart></CoinChart>
                    <TradingVolume></TradingVolume>
                </CoinListFrame>
                <QuickSearchFrame>
                    <SimpleSearch></SimpleSearch>
                </QuickSearchFrame>
            </CoinListsFrame>
        </C.SizeCautionFrame>
    );
}

export default CoinLists();
