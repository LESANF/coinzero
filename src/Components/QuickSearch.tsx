import styled from 'styled-components';
import { CgSearch } from 'react-icons/cg';
import React, { useEffect, useState } from 'react';
import { getCoinInfo, getMarketCoin, ICoin } from '../Api/coinInfo';
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

function QuickSearch() {
    //input value
    const [searchValue, setSearchValue] = useState('');
    const [coinInfo, setCoinInfo] = useState<ICoin[]>([]);
    const { data, isLoading } = useQuery<ICoin[]>('CoinAll', getMarketCoin);
    let filterKrw: any;
    if (data) {
        filterKrw = data.filter((v: any) => v.market.includes('KRW'));
    }

    //인터페이스 정해줘야함
    const coinUpdate = () => {
        setCoinInfo(filterKrw.filter((v: ICoin) => v.market.toLowerCase().includes(searchValue)));
    };

    // const getCoinAll = async () => {
    //     const data = await getMarketCoin();
    //     console.log(data);
    // };

    //automatic search
    useEffect(() => {
        const debounce = setTimeout(() => {
            if (searchValue) coinUpdate();
            else setCoinInfo([]);
        }, 200);

        return () => clearTimeout(debounce);
    }, [searchValue]);

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value.toLowerCase());
    };

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
                <ul>
                    {coinInfo.map((v: ICoin) => (
                        <li key={v.market}>
                            <h1>{v.market.split('-')[1]}</h1>
                        </li>
                    ))}
                </ul>
            </SearchZone>
        </MainLeftFrame>
    );
}

export default QuickSearch;
