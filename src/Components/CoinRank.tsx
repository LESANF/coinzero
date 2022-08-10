import { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';
import { BsQuestionCircle } from 'react-icons/bs';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getDetailCoin, getMarketCoins, IAssignCoin, ICoin, ICoinDetail } from '../Api/coinInfo';
import { getCombineRank } from '../Utils/CombineCoinData';

const MainRightFrame = styled.div`
    box-sizing: border-box;
    background-color: #fff;
    min-width: 663px;
    width: 663px;
`;

const Test = styled.div`
    margin-left: 58px;
`;

//Header
const HeaderSection = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

//Header Title
const HeaderTitle = styled.h2`
    display: flex;
    align-items: center;
    font-weight: 700;
    color: #18191c;
    &:before {
        content: '';
        width: 20px;
        height: 23px;
        margin-right: 8px;
        background-image: url('https://coinone.co.kr/landing/assets/images/main/coin-ranking.svg');
    }
`;

//Header 더 보러가기 Link
const MoreLink = styled.a`
    display: flex;
    align-items: center;
    color: #79818f;
`;
const LinkText = styled.span`
    font-size: 14px;
`;
const LinkLogo = styled.span`
    font-size: 15px;
`;

//Rank Box
const RankBox = styled.div`
    margin-top: 19px;
    padding: 8px 7px;
    border-radius: 4px;
    border: 1px solid #e4e5e8;
    box-shadow: 0 3px 10px 0 rgba(66, 66, 66, 0.05);
`;

const ItemList = styled.ul``;
const ListHeader = styled.li`
    color: #aeb3bb;
    display: flex;
    justify-content: space-around;
    margin-bottom: 15px;
`;

//표시기준
const SignStandardHead = styled.div`
    display: flex;
    align-items: center;
    margin-right: 100px;
`;

const SignText = styled.span`
    font-size: 14px;
`;
const SignSymbol = styled.span`
    margin-left: 5px;
    font-size: 12px;
`;
const SignTooltip = styled.div``;

//현재가
const CurPriceHead = styled.div`
    display: flex;
    align-items: center;
    padding: 0 10px;
    background-color: rgba(72, 77, 85, 0.05);
`;
const CurText = styled.span`
    font-size: 14px;
    margin-right: 5px;
`;
const CurSortSymbol = styled.div`
    font-size: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

//등락률
const UpDownRateHead = styled.div`
    display: flex;
    align-items: center;
    padding: 0 10px;
    background-color: rgba(72, 77, 85, 0.05);
`;
const UpDownText = styled.span`
    font-size: 14px;
    margin-right: 5px;
`;
const UpdownSymbol = styled.div`
    font-size: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

//거래량
const TradePrice = styled.div`
    display: flex;
    align-items: center;
    padding: 0 10px;
    background-color: rgba(72, 77, 85, 0.05);
`;
const TradeText = styled.span`
    font-size: 14px;
    margin-right: 5px;
`;
const TradeSymbol = styled.div`
    font-size: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

//Coin Rank List
const List = styled.li`
    display: flex;
    justify-content: space-around;
`;

//Symbol and Name(eng, kor)
const SignStandard = styled.div`
    display: flex;
`;

const SignMark = styled.div``;

const NameBox = styled.div`
    display: flex;
    flex-direction: column;
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
            <Test>
                <HeaderSection>
                    <HeaderTitle>가상자산 랭킹 Top 7</HeaderTitle>
                    <MoreLink>
                        <LinkText>더 보러가기</LinkText>
                        <LinkLogo>
                            <IoIosArrowForward />
                        </LinkLogo>
                    </MoreLink>
                </HeaderSection>
                <RankBox>
                    <ItemList>
                        <ListHeader>
                            <SignStandardHead>
                                <SignText>표시기준</SignText>
                                <SignSymbol>
                                    <BsQuestionCircle />
                                </SignSymbol>
                            </SignStandardHead>
                            <CurPriceHead>
                                <CurText>현재가</CurText>
                                <CurSortSymbol>
                                    <span>
                                        <AiFillCaretUp />
                                    </span>
                                    <span>
                                        <AiFillCaretDown />
                                    </span>
                                </CurSortSymbol>
                            </CurPriceHead>
                            <UpDownRateHead>
                                <UpDownText>등락률</UpDownText>
                                <UpdownSymbol>
                                    <span>
                                        <AiFillCaretUp />
                                    </span>
                                    <span>
                                        <AiFillCaretDown />
                                    </span>
                                </UpdownSymbol>
                            </UpDownRateHead>
                            <TradePrice>
                                <TradeText>거래량</TradeText>
                                <TradeSymbol>
                                    <span>
                                        <AiFillCaretUp />
                                    </span>
                                    <span>
                                        <AiFillCaretDown />
                                    </span>
                                </TradeSymbol>
                            </TradePrice>
                        </ListHeader>
                        {combineObj && combineObj.length > 0 ? (
                            combineObj.map((v, i) => (
                                //세가지로 랭크를 매겨야하는데 (현재가격(최대, 최소)-default / 등락률(최대, 최소) / 거래대금(최대, 최소))
                                <List key={i}>
                                    {v.market} / {Math.floor(v.trade_price).toLocaleString('ko-KR')} /{' '}
                                    {v.korean_name} / {v.acc_trade_price_24h} /{' '}
                                    {(
                                        ((v.trade_price - v.prev_closing_price) / v.prev_closing_price) *
                                        100
                                    ).toFixed(2)}
                                </List>
                            ))
                        ) : (
                            <li>Loading</li>
                        )}
                    </ItemList>
                </RankBox>
            </Test>
        </MainRightFrame>
    );
}

export default CoinRank;
