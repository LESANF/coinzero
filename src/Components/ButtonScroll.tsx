import styled from 'styled-components';

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
    //background-color: pink;
    padding: 0 12px;
    height: 191px;
`;

function ButtonScroll() {
    return (
        <Frame>
            <Header>헤더 버튼 포함</Header>
            <Content>ddd</Content>
        </Frame>
    );
}

export default ButtonScroll;
