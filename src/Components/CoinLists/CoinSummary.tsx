import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetLiveData } from '../../hooks/useGetLiveData';

const SummaryFrame = styled.div`
    background-color: red;
    width: 1000px;
    height: 300px;

    @media screen and (max-width: 600px) {
        display: none;
    }
`;

function CoinSummary() {
    const [liveData, setLiveData] = useState<any>();
    const getLiveData: any = JSON.stringify(useGetLiveData());

    useEffect(() => {
        if (getLiveData) {
            setLiveData({ ...JSON.parse(getLiveData) });
        }
    }, [getLiveData]);

    return (
        <SummaryFrame>
            {liveData && getLiveData && (
                <div>
                    <div>{liveData.code}</div>
                    <div>{liveData.high_price}</div>
                    <div>{liveData.low_price}</div>
                    <div>{liveData.prev_closing_price}</div>
                    <div>{liveData.acc_trade_volume_24h}</div>
                    <div>{liveData.acc_trade_price_24h}</div>
                </div>
            )}
            <div>{!liveData && 'Loading...'}</div>
        </SummaryFrame>
    );
}

export default CoinSummary;
