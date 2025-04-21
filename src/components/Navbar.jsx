import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4vw 1.5rem 4vw;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  @media (max-width: 600px) {
    padding: 1.2rem 4vw 1rem 4vw;
  }
`;

const Logo = styled.div`
  font-family: var(--font-secondary);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  gap: 2.5rem;
  margin: 0;
  padding: 0;
  @media (max-width: 900px) {
    gap: 1.5rem;
  }
  @media (max-width: 600px) {
    display: none;
  }
`;

const MenuItem = styled.li`
  font-size: 1.1rem;
  font-weight: 500;
  a {
    color: var(--color-text);
    opacity: 0.8;
    transition: opacity 0.2s;
    &:hover {
      opacity: 1;
    }
  }
`;

const NavMobile = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: block;
    font-size: 2rem;
    color: var(--color-text);
    cursor: pointer;
  }
`;

const Navbar = () => (
  <Nav>
    <Logo>Wanderland Studio</Logo>
    <Menu>
      <MenuItem><a href="#about">About</a></MenuItem>
      <MenuItem><a href="#gallery">Gallery</a></MenuItem>
      <MenuItem><a href="#approach">Approach</a></MenuItem>
      <MenuItem><a href="#contact">Contact</a></MenuItem>
    </Menu>
    <NavMobile>
      {/* Hamburger for mobile, can be implemented later */}
      ☰
    </NavMobile>
  </Nav>
);

export default Navbar;
