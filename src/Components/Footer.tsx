import styled from 'styled-components';

const FooterFrame = styled.div`
    @media screen and (max-width: 600px) {
        display: none;
    }
`;

function Footer() {
    return (
        <FooterFrame>
            <h1>Footer</h1>
        </FooterFrame>
    );
}

export default Footer;
