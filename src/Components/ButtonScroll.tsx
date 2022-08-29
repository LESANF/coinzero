import { useRef, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import dayjs from 'dayjs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Frame = styled.div`
    /* height: 232px;
    margin-top: 10px; */
    box-shadow: 0 3px 10px 0 rgba(66, 66, 66, 0.05);
    border: 1px solid #e4e5e8;
    grid-area: item4;
    overflow: hidden;
`;

//Title, Button
const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 12px 12px 3px 12px;
    height: 41px;
`;

const ListTitle = styled.h2`
    font-size: 12px;
    font-weight: 700;
    color: #aeb3bb;
`;

const ListDay = styled.span`
    font-size: 10px;
    margin-left: 5;
`;

//Up, Down Btn
const BtnBox = styled.div`
    display: flex;
    button:first-child {
        margin-right: 2px;
    }
`;

const ListBtn = styled.button<{ curPosition: number; upDownChk: boolean }>`
    //upDownChk: true(Up), false(Down)
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 26px;
    height: 26px;
    border-radius: 2px;
    border: 1px solid #e4e5e8;
    color: #aeb3bb;
    font-size: 14px;
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

//ItemList
const Items = styled.ul`
    padding: 0 12px 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Item = styled.li`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: center;
    margin-bottom: 5px;
    width: 100%;
    height: 66px;
    background-color: #f8f8f9;
    border-radius: 8px;
    padding: 8px 10px;
`;

const ItemTitle = styled.span`
    font-size: 10px;
    color: #7f8794;
`;
const ItemContent = styled.span`
    margin-top: 12px;
    font-size: 12px;
    color: #484d55;
    word-break: keep-all;
`;

const AddSummary = styled.p`
    /* overflow: hidden;
    height: 0;
    opacity: 0;
    transition: opacity 0.2s, height 0.2s, padding 0.2s; */

    color: #aeb3bb;
    font-size: 10px;
    height: auto;
    padding-top: 4px;
    opacity: 1;
`;

//Footer Sign
const FooterSign = styled.p`
    margin-bottom: 10px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: #acb3bb;
    transform: scale(0.9);
`;

function ButtonScroll() {
    const [curScrollPos, setCurScrollPos] = useState<number>(0);

    //get Date
    const now = dayjs();

    //scroll event
    const contentScrl = useRef<HTMLDivElement | null>(null);
    // const scrollDiv = _.throttle((e: React.UIEvent<HTMLDivElement>) => {
    //     console.log(contentScrl.current?.scrollTop);
    // }, 0);

    const listScrollUp = () => {
        // if(contentScrl.current?.scrollTop > 0);
        console.log(contentScrl.current?.scrollTop);
        contentScrl.current?.scrollTo({ top: 100, behavior: 'smooth' });
    };
    const listScrollDown = () => {
        contentScrl.current?.scrollTo({ top: 90, behavior: 'smooth' });
        console.log(contentScrl.current?.scrollTop);
    };

    return (
        <Frame>
            <Header>
                <ListTitle>
                    Coinnews <ListDay>{now.format('YYYY-MM-DD')}</ListDay>
                </ListTitle>
                <BtnBox>
                    <ListBtn curPosition={curScrollPos} upDownChk={true} onClick={listScrollUp}>
                        <IoIosArrowUp />
                    </ListBtn>
                    <ListBtn curPosition={curScrollPos} upDownChk={false} onClick={listScrollDown}>
                        <IoIosArrowDown />
                    </ListBtn>
                </BtnBox>
            </Header>
            <Content ref={contentScrl}>
                <Items>
                    {[1, 2, 3, 4, 5].map((v, i) => (
                        <Item key={i}>
                            <ItemTitle>51분전</ItemTitle>
                            <ItemContent>FTX CEO "후오비 인수 계획 전혀 없다"</ItemContent>
                            <AddSummary>
                                메타가 공식 트위터를 통해 인스타그램에 이어 페이스북의 NFT 지원 서비스를
                                실시한다고 발표했다.
                            </AddSummary>
                        </Item>
                    ))}
                </Items>
                <FooterSign>MADE BY LESA</FooterSign>
            </Content>
        </Frame>
    );
}

export default ButtonScroll;
