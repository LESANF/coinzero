import styled from 'styled-components';

const MainLeftFrame = styled.div`
    display: flex;
    flex-direction: column;
    background-color: pink;
`;

//Header
const HeaderTitle = styled.p`
    line-height: 1.5;
    font-size: 26px;
    color: #1772f8;
`;

//Live Trade Cost
const TradeCost = styled.div`
    color: #1772f8;
`;

const Cost = styled.span`
    &:after {
        content: ' 원';
    }
`;

function QuickSearch() {
    return (
        <MainLeftFrame>
            <HeaderTitle>
                코인제로 (코인원 클론코딩 작품)
                <br />
                <strong>개인 포트폴리오</strong>
            </HeaderTitle>
            <TradeCost>
                <Cost>228,719,841,456</Cost>
                <span>(24시간 거래대금)</span>
            </TradeCost>
        </MainLeftFrame>
    );
}

export default QuickSearch;
