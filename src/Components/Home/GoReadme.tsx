import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';

const Frame = styled.div`
    margin-top: 8px;
`;
const GoReadMe = styled.a`
    display: flex;
    align-items: center;
`;

const LinkImg = styled.div`
    width: 22px;
    height: 25px;
    background-image: url('image/LinkImg.svg');
`;
const LinkText = styled.span`
    margin-left: 4px;
    font-size: 12px;
    color: #484d55;
`;

const LinkArrow = styled.span``;

function GoReadme() {
    return (
        <Frame>
            <GoReadMe target="blnak" href={process.env.REACT_APP_MYGITHUBADDR_README}>
                <LinkImg />
                <LinkText>프로젝트 소개가 궁금하신가요?</LinkText>
                <LinkArrow>
                    <IoIosArrowForward style={{ color: '#1772f8', fontSize: '12px' }} />
                </LinkArrow>
            </GoReadMe>
        </Frame>
    );
}

export default GoReadme;
