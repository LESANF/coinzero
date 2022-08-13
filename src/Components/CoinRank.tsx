import { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';
import { BsQuestionCircle } from 'react-icons/bs';
import { VscArrowSwap } from 'react-icons/vsc';
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
        //background-image: url('https://coinone.co.kr/landing/assets/images/main/coin-ranking.svg');
        background-image: url('image/rankSvg.svg');
    }
`;

//Header 더 보러가기 Link
const MoreLink = styled.a`
    display: flex;
    align-items: center;
    color: #79818f;
`;
const LinkText = styled.span`
    font-size: 12px;
`;
const LinkLogo = styled.span`
    font-size: 15px;
`;

//Rank Box
const RankBox = styled.div`
    margin-top: 19px;
    padding: 16px;
    border-radius: 4px;
    border: 1px solid #e4e5e8;
    box-shadow: 0 3px 10px 0 rgba(66, 66, 66, 0.05);
`;

const ItemList = styled.ul``;
const ListHeader = styled.li`
    color: #aeb3bb;
    display: flex;
    margin-bottom: 15px;
`;

//표시기준
const SignStandardHead = styled.div`
    display: flex;
    align-items: center;
    //flex-grow: 3.5;
    width: 220px;
`;

const SignText = styled.span`
    font-size: 12px;
`;
const SignSymbol = styled.span`
    margin-left: 5px;
    font-size: 12px;
`;
const SignTooltip = styled.div``;

//현재가
const CurPriceHead = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 120px;
`;

const CurPriceBtn = styled.button`
    display: flex;
    cursor: pointer;
    align-items: center;
    border: none;
    justify-content: flex-end;
    padding: 0 10px;
    background-color: transparent;
    //background-color: rgba(72, 77, 85, 0.05);
`;

const CurText = styled.span`
    font-size: 12px;
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
    justify-content: flex-end;
    width: 72px;
    margin-left: 18px;
`;

const UpDownRateBtn = styled.button`
    cursor: pointer;
    display: flex;
    align-items: center;
    border: none;
    justify-content: flex-end;
    padding: 0 10px;
    background-color: transparent;
    //background-color: rgba(72, 77, 85, 0.05);
`;

const UpDownText = styled.span`
    font-size: 12px;
    margin-right: 5px;
`;
const UpdownSymbol = styled.div`
    font-size: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

//거래대금
const TradePriceHead = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 125px;
`;

const TradePriceBtn = styled.button`
    cursor: pointer;
    display: flex;
    align-items: center;
    border: none;
    justify-content: flex-end;
    padding: 0 10px;
    //background-color: transparent;
    background-color: rgba(72, 77, 85, 0.05);
`;

const TradeText = styled.span`
    font-size: 12px;
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
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
    border-bottom: 1px solid #f8f8f9;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: rgb(248, 248, 249);
`;

//Symbol and Name(eng, kor)
const SignStandard = styled.div`
    display: flex;
    align-items: center;
    width: 220px;
`;

const SignMark = styled.div`
    margin-right: 12px;
    width: 38px;
    height: 38px;
`;

const NameBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const NameEng = styled.span`
    margin-bottom: 7px;
    font-size: 14px;
    font-weight: 700;
    color: #18191c;
    text-transform: uppercase;
`;
const NameKor = styled.span`
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 103px;
    font-size: 10px;
    color: #79818f;
`;

//Current Coin Pirce
const Price = styled.div`
    width: 120px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const CoinPrice = styled.span<{ upDownColor: string }>`
    font-size: 15px;
    text-align: right;
    color: ${(props) =>
        props.upDownColor === 'RISE' ? '#e12343' : props.upDownColor === 'FALL' ? '#1763b6' : 'black'};
`;

//UpDown Rate
const UpDownRate = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 72px;
    margin-left: 18px;
`;

const CoinUpDown = styled.span<{ upDownColor: string; positiveChk: boolean }>`
    width: 80px;
    font-size: 13px;
    font-weight: 700;
    text-align: right;
    color: ${(props) =>
        props.upDownColor === 'RISE' ? '#e12343' : props.upDownColor === 'FALL' ? '#1763b6' : 'black'};
    &:after {
        content: ' %';
    }
    &:before {
        content: '${(props) => (props.positiveChk ? '+' : '')}';
    }
`;

//거래대금
const TradeAmount = styled.div`
    width: 125px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const TradeAcc = styled.span`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #79818f;
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
                                <CurPriceBtn>
                                    <CurText>현재가</CurText>
                                    <CurSortSymbol>
                                        <span>
                                            <AiFillCaretUp />
                                        </span>
                                        <span>
                                            <AiFillCaretDown />
                                        </span>
                                    </CurSortSymbol>
                                </CurPriceBtn>
                            </CurPriceHead>
                            <UpDownRateHead>
                                <UpDownRateBtn>
                                    <UpDownText>등락률</UpDownText>
                                    <UpdownSymbol>
                                        <span>
                                            <AiFillCaretUp />
                                        </span>
                                        <span>
                                            <AiFillCaretDown />
                                        </span>
                                    </UpdownSymbol>
                                </UpDownRateBtn>
                            </UpDownRateHead>
                            <TradePriceHead>
                                <TradePriceBtn>
                                    <TradeText>거래대금</TradeText>
                                    <TradeSymbol>
                                        <span>
                                            <AiFillCaretUp />
                                        </span>
                                        <span>
                                            <AiFillCaretDown />
                                        </span>
                                    </TradeSymbol>
                                </TradePriceBtn>
                            </TradePriceHead>
                        </ListHeader>
                        {combineObj && combineObj.length > 0 ? (
                            combineObj.map((v, i) => (
                                //세가지로 랭크를 매겨야하는데 (현재가격(최대, 최소)-default / 등락률(최대, 최소) / 거래대금(최대, 최소))
                                <List key={i}>
                                    <SignStandard>
                                        <SignMark>
                                            <img
                                                src={`https://static.upbit.com/logos/${v.market
                                                    .split('-')[1]
                                                    .toUpperCase()}.png`}
                                                alt={v.market.split('-')[1]}
                                                title={v.market.split('-')[1]}
                                                style={{
                                                    height: '38px',
                                                    width: '38px',
                                                    // boxShadow: '0 3px 10px 0 rgba(66, 66, 66, 0.05)',
                                                    // borderRadius: '7px',
                                                }}
                                            />
                                        </SignMark>
                                        <NameBox>
                                            <NameEng>{v.market.split('-')[1]}</NameEng>
                                            <NameKor>{v.korean_name}</NameKor>
                                        </NameBox>
                                    </SignStandard>
                                    <Price>
                                        <CoinPrice upDownColor={v.change}>
                                            {v.trade_price.toLocaleString('ko-KR')}
                                        </CoinPrice>
                                    </Price>
                                    <UpDownRate>
                                        <CoinUpDown
                                            upDownColor={v.change}
                                            positiveChk={
                                                ((v.trade_price - v.prev_closing_price) /
                                                    v.prev_closing_price) *
                                                    100 >
                                                0
                                            }
                                        >
                                            {(
                                                ((v.trade_price - v.prev_closing_price) /
                                                    v.prev_closing_price) *
                                                100
                                            ).toFixed(2)}
                                        </CoinUpDown>
                                    </UpDownRate>
                                    <TradeAmount>
                                        <TradeAcc>
                                            {`${Math.floor(
                                                Math.floor(v.acc_trade_price_24h) / 1000000
                                            ).toLocaleString('ko-KR')}백만`}
                                            &nbsp;&nbsp;
                                            <VscArrowSwap />
                                        </TradeAcc>
                                    </TradeAmount>
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
