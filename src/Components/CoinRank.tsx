import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getDetailCoin, getMarketCoins, IAssignCoin, ICoin, ICoinDetail } from '../Api/coinInfo';
import { getCombineRank } from '../Utils/CombineCoinData';

const MainRightFrame = styled.div`
    background-color: skyblue;
    width: 663px;
    min-width: 663px;
`;

function CoinRank() {
    const { data, isLoading } = useQuery('coinRank', getMarketCoins, { refetchOnWindowFocus: false });
    const [rankArg, setRankArg] = useState<any>([]);
    let filterKrw: ICoin[];
    let test: any = [];
    let test2: any;

    const [a, setA] = useState(false);
    useEffect(() => {
        if (data && !isLoading) {
            filterKrw = data.filter((v: ICoin) => v.market.includes('KRW'));
            filterKrw.map((v) => test.push(v.market));
            setRankArg(test);
            setA(true);
        }
    }, [isLoading]);

    const { data: detailCoin, isLoading: isLoadingDetail } = useQuery<ICoinDetail[] | null>(
        ['CoinDetailRight'],
        () => getDetailCoin(rankArg.join(',')),
        {
            enabled: a,
        }
    );

    let combineObj: IAssignCoin[] = [];
    if (detailCoin && !isLoadingDetail && !isLoading)
        combineObj = getCombineRank(
            detailCoin.sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h).slice(0, 7),
            data
        );

    return (
        <MainRightFrame>
            <ul>
                {combineObj && combineObj.length > 0 ? (
                    combineObj.map((v, i) => (
                        //세가지로 랭크를 매겨야하는데 (현재가격(최대, 최소)-default / 등락률(최대, 최소) / 거래대금(최대, 최소))
                        <li key={i}>
                            {v.market} / {Math.floor(v.trade_price).toLocaleString('ko-KR')} / {v.korean_name}{' '}
                            / {v.acc_trade_price_24h} /{' '}
                            {(((v.trade_price - v.prev_closing_price) / v.prev_closing_price) * 100).toFixed(
                                2
                            )}
                        </li>
                    ))
                ) : (
                    <li>Loading</li>
                )}
            </ul>
        </MainRightFrame>
    );
}

export default CoinRank;
