import React from 'react';
import styled from 'styled-components';

const ChartFrame = styled.div`
    background-color: pink;
    @media screen and (max-width: 600px) {
        display: none;
    }
`;

function CoinChart() {
    return <ChartFrame>CoinChart</ChartFrame>;
}

export default CoinChart;
