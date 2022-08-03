import styled from 'styled-components';
import { CgSearch } from 'react-icons/cg';
import { VscArrowSwap } from 'react-icons/vsc';
import React, { useEffect, useState } from 'react';
import { getMarketCoins, getDetailCoin, ICoin, ICoinDetail } from '../Api/coinInfo';
import { useQuery } from 'react-query';

const MainLeftFrame = styled.div`
    display: flex;
    flex-direction: column;
    background-color: pink;
    width: 361px;
    min-width: 361px;
`;

//Header
const HeaderTitle = styled.p`
    line-height: 1.5;
    font-size: 26px;
    color: #1772f8;
`;

//Live Trade Cost
const TradeCost = styled.div`
    display: flex;
    margin-top: 5px;
    align-items: center;
    font-size: 17px;
    color: #1772f8;
`;

const Cost = styled.span`
    font-size: 12px;
    font-weight: 700;
    &:after {
        content: ' 원';
    }
    margin-right: 5px;
`;

//Search Input
const SearchZone = styled.div`
    position: relative;
    width: 100%;
    height: 36px;
    margin-top: 16px;
`;
const SearchInput = styled.input.attrs({ placeholder: '가상자산 검색' })`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 48px 0 16px;
    border-radius: 6px;
    border: 1px solid #1772f8;
    font-size: 14px;
    outline: 0;
`;

const SearchIcon = styled.span`
    position: absolute;
    top: calc(50% - 10px);
    right: 15px;
    font-size: 20px;
    color: #484d55;
`;

//Automatic Search
const AutoSearch = styled.div`
    position: absolute;
    border-radius: 3px;
    box-shadow: 0 3px 10px 0 rgb(66 66 66 / 5%);
    width: 400px;
    background-color: #fff;
`;
const CoinList = styled.ul<{ isLoading: boolean }>`
    display: ${(props) => (props.isLoading ? 'none' : 'block')};
    padding: 8px 0;
`;

const Coin = styled.li`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 56px;
    font-size: 14px;
    color: #18191c;
`;

const CoinName = styled.span`
    display: flex;
    flex-direction: column;
`;
const TickerName = styled.span`
    font-size: 14px;
    font-weight: 700;
    text-align: left;
`;

const CoinIcon = styled.span`
    margin-right: 4px;
`;
const CoinSymbol = styled.span``;

const FullName = styled.span`
    margin-top: 4px;
    font-size: 12px;
    color: #79818f;
    text-align: left;
`;

const CoinPrice = styled.span<{ upDownColor: string }>`
    flex: 1;
    margin-left: 24px;
    text-align: right;
    color: ${(props) =>
        props.upDownColor === 'RISE' ? '#e12343' : props.upDownColor === 'FALL' ? '#1763b6' : 'black'};
`;
const CoinUpDown = styled.span<{ upDownColor: string; positiveChk: boolean }>`
    width: 80px;
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
const CoinTrade = styled.span`
    margin-left: 19px;
    margin-right: 5px;
`;

function QuickSearch() {
    //input value
    const [searchValue, setSearchValue] = useState('');
    //KRW코인만 필터링
    const [coinInfo, setCoinInfo] = useState<ICoin[]>([]);
    //현재가정보API 인자로 던져줄 코인리스트
    const [coinAutoList, setCoinAutoList] = useState<string[]>([]);

    //전체 코인 API
    const { data, isLoading } = useQuery<ICoin[]>('CoinAll', getMarketCoins);
    //현재가 코인 정보 API
    const { data: detailCoin, isLoading: isLoadingDetail } = useQuery<ICoinDetail[] | null>(
        ['CoinDetail', coinAutoList],
        () => getDetailCoin(coinAutoList.join(','))
    );

    let filterKrw: ICoin[];
    if (data) {
        filterKrw = data.filter((v: ICoin) => v.market.includes('KRW'));
    }

    //input value로 필터링된 코인
    const coinUpdate = () => {
        setCoinInfo(filterKrw.filter((v: ICoin) => v.market.toLowerCase().includes(searchValue)).slice(0, 5));
    };

    //automatic search
    useEffect(() => {
        const debounce = setTimeout(() => {
            if (searchValue) coinUpdate();
            else setCoinInfo([]);
        }, 200);

        return () => clearTimeout(debounce);
    }, [searchValue]);

    //automatic coin price data
    useEffect(() => {
        if (coinInfo.length > 0) {
            setCoinAutoList([]);
            coinInfo.map((v) => {
                setCoinAutoList((prev: string[]) => [...prev, v.market]);
            });
        }
    }, [coinInfo]);

    //input onChange event
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value.toLowerCase());
    };
    console.log(detailCoin);
    return (
        <MainLeftFrame>
            <HeaderTitle>
                코인제로 (코인원 클론코딩 작품)
                <br />
                <strong style={{ fontWeight: '700' }}>개인 포트폴리오</strong>
            </HeaderTitle>
            <TradeCost>
                <Cost>228,719,841,456</Cost>
                <span style={{ fontSize: '12px' }}>(24시간 거래대금)</span>
            </TradeCost>
            <SearchZone>
                <SearchInput value={searchValue} onChange={inputChange} />
                <SearchIcon>
                    <CgSearch />
                </SearchIcon>
                {!isLoading &&
                searchValue.length > 0 &&
                coinInfo.length > 0 &&
                !isLoadingDetail &&
                detailCoin !== null &&
                detailCoin !== undefined ? (
                    <AutoSearch>
                        <CoinList isLoading={isLoading}>
                            {coinInfo.map((v: ICoin) => (
                                <Coin key={v.market} style={{ display: 'flex' }}>
                                    <CoinName>
                                        <TickerName>
                                            <CoinIcon>
                                                <img
                                                    src={`https://static.upbit.com/logos/${v.market
                                                        .split('-')[1]
                                                        .toUpperCase()}.png`}
                                                    alt={v.market.split('-')[1]}
                                                    title={v.market.split('-')[1]}
                                                    style={{ height: '14px', width: '14px' }}
                                                />
                                            </CoinIcon>
                                            <CoinSymbol>{v.market.split('-')[1]}</CoinSymbol>
                                        </TickerName>
                                        <FullName>{v.korean_name}</FullName>
                                    </CoinName>
                                    <CoinPrice
                                        upDownColor={
                                            detailCoin.filter(
                                                (obj: ICoinDetail) => obj.market === v.market
                                            )[0] &&
                                            detailCoin.filter(
                                                (obj: ICoinDetail) => obj.market === v.market
                                            )[0].change
                                        }
                                    >
                                        {detailCoin.filter(
                                            (obj: ICoinDetail) => obj.market === v.market
                                        )[0] &&
                                            detailCoin
                                                .filter((obj: ICoinDetail) => obj.market === v.market)[0]
                                                .trade_price.toLocaleString('ko-KR')}
                                    </CoinPrice>
                                    <CoinUpDown
                                        upDownColor={
                                            detailCoin.filter(
                                                (obj: ICoinDetail) => obj.market === v.market
                                            )[0] &&
                                            detailCoin.filter(
                                                (obj: ICoinDetail) => obj.market === v.market
                                            )[0].change
                                        }
                                        positiveChk={
                                            detailCoin.filter(
                                                (obj: ICoinDetail) => obj.market === v.market
                                            )[0] &&
                                            ((detailCoin.filter(
                                                (obj: ICoinDetail) => obj.market === v.market
                                            )[0].trade_price -
                                                detailCoin.filter(
                                                    (obj: ICoinDetail) => obj.market === v.market
                                                )[0].prev_closing_price) /
                                                detailCoin.filter(
                                                    (obj: ICoinDetail) => obj.market === v.market
                                                )[0].prev_closing_price) *
                                                100 >
                                                0
                                        }
                                    >
                                        {detailCoin.filter(
                                            (obj: ICoinDetail) => obj.market === v.market
                                        )[0] &&
                                            (
                                                ((detailCoin.filter(
                                                    (obj: ICoinDetail) => obj.market === v.market
                                                )[0].trade_price -
                                                    detailCoin.filter(
                                                        (obj: ICoinDetail) => obj.market === v.market
                                                    )[0].prev_closing_price) /
                                                    detailCoin.filter(
                                                        (obj: ICoinDetail) => obj.market === v.market
                                                    )[0].prev_closing_price) *
                                                100
                                            ).toFixed(2)}
                                    </CoinUpDown>
                                    <CoinTrade>
                                        <VscArrowSwap />
                                    </CoinTrade>
                                </Coin>
                            ))}
                        </CoinList>
                    </AutoSearch>
                ) : null}
            </SearchZone>
        </MainLeftFrame>
    );
}

export default QuickSearch;
