import React from 'react';
import Nav from '../Components/Home/Nav';
import styled from 'styled-components';

const CoinListsFrame = styled.div`
    margin-top: 68px;
    background-color: peru;
    border: 1px solid black;
    height: 100vh;
    display: grid;
    grid-template-columns: 2fr 1fr;
`;

const CoinListFrame = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: blue;
`;

const QuickSearchFrame = styled.div`
    background-color: green;
    justify-content: center;
    align-items: center;
`;

function CoinLists() {
    return (
        <>
            <Nav />
            <CoinListsFrame>
                <CoinListFrame></CoinListFrame>
                <QuickSearchFrame></QuickSearchFrame>
            </CoinListsFrame>
        </>
    );
}

export default CoinLists();
