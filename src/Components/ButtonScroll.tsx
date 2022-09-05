import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import _ from 'lodash';
import dayjs from 'dayjs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IVerNotice, verNoticeDummyData } from '../DummyData';

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

const ListBtn = styled.button<{ curPosition: number; curTop: number; upDownChk: boolean }>`
    //upDownChk: true(Up), false(Down)
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 26px;
    height: 26px;
    border-radius: 2px;
    border: 1px solid #e4e5e8;
    color: ${(props) => {
        if (props.curPosition === 0 && props.upDownChk === true) {
            return '#aeb3bb';
        } else if (props.curPosition === props.curTop && props.upDownChk === false) {
            return '#aeb3bb';
        } else {
            return '#000';
        }
    }};
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
    cursor: pointer;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: center;
    margin-bottom: 12px;
    width: 100%;
    height: auto;
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
    @keyframes test {
        from {
            max-height: 0px;
        }
        to {
            max-height: 150px;
        }
    }

    color: #aeb3bb;
    font-size: 10px;
    padding-top: 7px;
    line-height: 1.5;
    overflow: hidden;
    animation: test 0.3s;
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
    const [curScrollH, setCurScrollH] = useState<number>(0);
    const [foldingState, setFoldingState] = useState<boolean>(false);

    //get news data
    const resultData = verNoticeDummyData();

    //get Date
    const now = dayjs();

    //scroll event
    const contentScrl = useRef<HTMLDivElement | null>(null);
    const ulScrl = useRef<HTMLUListElement | null>(null);
    const scrollDiv = _.throttle((e: React.UIEvent<HTMLDivElement>) => {
        if (contentScrl.current) {
            setCurScrollPos(contentScrl.current.scrollTop);
            setCurScrollH(contentScrl.current.scrollHeight);
        }
    }, 500);

    const listScrollUp = () => {
        // if(contentScrl.current?.scrollTop > 0);
        console.log('div scr top', contentScrl.current?.scrollTop);
        //console.log('div scr height', contentScrl.current?.scrollHeight);
        //console.log('ul scr height', ulScrl.current?.scrollHeight);
        //console.log('ul scr top', ulScrl.current?.scrollTop);
        //contentScrl.current?.scrollTo({ top: 100, behavior: 'smooth' });
    };
    const listScrollDown = () => {
        contentScrl.current?.scrollTo({ top: contentScrl.current?.scrollHeight, behavior: 'smooth' });
        console.log(contentScrl.current?.scrollTop);
    };

    //folding state
    const changeFolding = () => {
        setFoldingState((prev) => !prev);
        if (contentScrl.current) {
            console.log(contentScrl.current.scrollTop);
            setCurScrollPos(contentScrl.current.scrollTop);
        }
    };

    // useEffect(() => {
    //     console.log('ul scr height', ulScrl.current?.scrollHeight);
    //     console.log(contentScrl.current?.scrollHeight);
    // }, []);

    return (
        <Frame>
            <Header>
                <ListTitle>
                    Coinnews <ListDay>{now.format('YYYY-MM-DD')}</ListDay>
                </ListTitle>
                <BtnBox>
                    <ListBtn
                        curPosition={curScrollPos}
                        curTop={curScrollH}
                        upDownChk={true}
                        onClick={listScrollUp}
                    >
                        <IoIosArrowUp />
                    </ListBtn>
                    <ListBtn
                        curPosition={curScrollPos}
                        curTop={curScrollH}
                        upDownChk={false}
                        onClick={listScrollDown}
                    >
                        <IoIosArrowDown />
                    </ListBtn>
                </BtnBox>
            </Header>
            <Content ref={contentScrl} onScroll={scrollDiv}>
                {resultData && resultData.result.length > 0 ? (
                    <>
                        <Items ref={ulScrl}>
                            {resultData.result.map((v: any, i: any) => (
                                <Item key={i} onClick={changeFolding}>
                                    <ItemTitle>
                                        {v.time > 59 ? `${Math.floor(v.time / 60)}시간전` : `${v.time}분전`}
                                    </ItemTitle>
                                    <ItemContent>{v.title}</ItemContent>
                                    {foldingState && <AddSummary>{v.summary}</AddSummary>}
                                </Item>
                            ))}
                        </Items>
                        <FooterSign>MADE BY LESA</FooterSign>
                    </>
                ) : (
                    <h1>Loading</h1>
                )}
            </Content>
        </Frame>
    );
}

export default ButtonScroll;
