import styled from 'styled-components';

const Navbar = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 52px;
    background-color: #fff;
`;

const NavTitle = styled.span`
    background: linear-gradient(to right bottom, #4147ff, #91c4ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: bold;
    font-size: 20px;
    display: block;
    cursor: pointer;
`;

const NavMenu = styled.ul`
    font-size: 16px;
`;

const NavItem = styled.li`
    font-size: 16px;
`;

function Nav() {
    return (
        <Navbar>
            <NavTitle>Nav</NavTitle>
        </Navbar>
    );
}

export default Nav;
