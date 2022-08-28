import { useRef } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const Frame = styled.div`
    background-color: skyblue;
    height: 232px;
    margin-top: 10px;
`;
const Header = styled.header`
    box-sizing: border-box;
    background-color: peru;
    padding: 12px 12px 3px 12px;
    height: 41px;
`;
const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: pink;
    padding: 0 12px;
    height: 191px;
    overflow: scroll;
`;

const Items = styled.ul``;
const Item = styled.li`
    margin-bottom: 5px;
    width: 200px;
    height: 70px;
    background-color: blue;
`;

function ButtonScroll() {
    const contentScrl = useRef<HTMLDivElement | null>(null);
    const scrollDiv = _.throttle((e: React.UIEvent<HTMLDivElement>) => {
        console.log(contentScrl.current?.scrollTop);
    }, 0);

    return (
        <Frame>
            <Header>헤더 버튼 포함</Header>
            <Content onScroll={scrollDiv} ref={contentScrl}>
                <Items>
                    {[1, 2, 3, 4, 5].map((v, i) => (
                        <Item key={i}>{v}</Item>
                    ))}
                </Items>
            </Content>
        </Frame>
    );
}

export default ButtonScroll;
