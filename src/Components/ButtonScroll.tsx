import { useRef } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const Frame = styled.div`
    /* height: 232px;
    margin-top: 10px; */
    box-shadow: 0 3px 10px 0 rgba(66, 66, 66, 0.05);
    border: 1px solid #e4e5e8;
    grid-area: item4;
    /* overflow: hidden; */
`;
const Header = styled.header`
    box-sizing: border-box;
    padding: 12px 12px 3px 12px;
    height: 41px;
`;
const Content = styled.div`
    height: 215px;
    overflow-x: hidden;
    /* 스크롤 스타일 변경 */
    ::-webkit-scrollbar {
        width: 3px; /* 세로축 스크롤바 길이 */
    }

    ::-webkit-scrollbar-track {
        background-color: lightblue;
    }

    ::-webkit-scrollbar-track-piece {
        background-color: #eee;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 8px;

        background-color: #ccc;
    }
`;

const Items = styled.ul`
    padding: 0 12px 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Item = styled.li`
    box-sizing: border-box;
    margin-bottom: 5px;
    width: 100%;
    height: 66px;
    background-color: red;
    //background-color: #f8f8f9;
    border-radius: 8px;
    padding: 12px;
`;

const FooterSign = styled.p`
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: #acb3bb;
    transform: scale(0.9);
`;

function ButtonScroll() {
    const contentScrl = useRef<HTMLDivElement | null>(null);
    // const scrollDiv = _.throttle((e: React.UIEvent<HTMLDivElement>) => {
    //     console.log(contentScrl.current?.scrollTop);
    // }, 0);

    const listScrollUp = () => {
        contentScrl.current?.scrollTo({ top: 10, behavior: 'smooth' });
        console.log(contentScrl.current?.scrollTop);
    };
    const listScrollDown = () => {
        contentScrl.current?.scrollTo({ top: 90, behavior: 'smooth' });
        console.log(contentScrl.current?.scrollTop);
    };

    return (
        <Frame>
            <Header>
                헤더 버튼 포함
                <button onClick={listScrollUp}>up</button>
                <button onClick={listScrollDown}>down</button>
            </Header>
            <Content ref={contentScrl}>
                <Items>
                    {[1, 2, 3, 4, 5].map((v, i) => (
                        <Item key={i}>{v}</Item>
                    ))}
                </Items>
                <FooterSign>MADE BY LESA</FooterSign>
            </Content>
        </Frame>
    );
}

export default ButtonScroll;
