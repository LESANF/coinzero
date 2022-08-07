import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getDetailCoin, getMarketCoins, ICoin, ICoinDetail } from '../Api/coinInfo';

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
            console.log('in');
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

    // if (data && !isLoading) console.log('ㅇㅇ');

    return (
        <MainRightFrame>
            <ul>
                {/* {data && !isLoading ? (
                    data.slice(0, 8).map((v: any) => <li key={v.market}>{v.market}</li>)
                ) : (
                    <h1>Loading</h1>
                )} */}
                {rankArg && rankArg.length > 0 && !isLoadingDetail && detailCoin ? (
                    detailCoin
                        .sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h)
                        .slice(0, 7)
                        .map((v: any) => (
                            <h1 key={v.market}>
                                {v.trade_price}/{v.market}
                            </h1>
                        ))
                ) : (
                    <h1>Loading</h1>
                )}
            </ul>
        </MainRightFrame>
    );
}

export default CoinRank;
