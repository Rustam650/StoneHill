import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import LogoIcon from "../assets/icons/logo.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Nav>
      <Logo>
        <img src={LogoIcon} alt="STONEHILL" />
      </Logo>

      <Burger onClick={toggleMenu} isOpen={isMenuOpen}>
        <span />
        <span />
        <span />
      </Burger>

      <Menu isOpen={isMenuOpen}>
        <MenuItem>
          <NavLink to="/" active={isActive("/") ? 1 : 0}>
            Главная
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/stone-types" active={isActive("/stone-types") ? 1 : 0}>
            Виды камня
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/services" active={isActive("/services") ? 1 : 0}>
            Услуги
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/portfolio" active={isActive("/portfolio") ? 1 : 0}>
            Портфолио
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/contacts" active={isActive("/contacts") ? 1 : 0}>
            Контакты
          </NavLink>
        </MenuItem>
      </Menu>

      <Overlay isOpen={isMenuOpen} onClick={toggleMenu} />
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f1c232;
  padding: 1rem 2rem;
  position: relative;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.div`
  img {
    width: 65px;
    height: auto;
    transition: transform 0.3s ease;

    @media (max-width: 480px) {
      width: 50px;
    }

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Burger = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
  z-index: 1001;
  position: relative;

  span {
    height: 3px;
    width: 100%;
    background-color: #333;
    border-radius: 5px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: left center;

    &:nth-child(1) {
      transform: ${({ isOpen }) =>
        isOpen ? "rotate(45deg) translate(1px, -2px)" : "none"};
    }

    &:nth-child(2) {
      opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
      transform: ${({ isOpen }) => (isOpen ? "translateX(20px)" : "none")};
    }

    &:nth-child(3) {
      transform: ${({ isOpen }) =>
        isOpen ? "rotate(-45deg) translate(1px, 2px)" : "none"};
    }
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 300px;
    height: 100vh;
    background-color: #f1c232;
    flex-direction: column;
    padding: 80px 2rem 2rem;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(100%)"};
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }
`;

const MenuItem = styled.li`
  position: relative;
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 0.8rem 0;
    border-bottom: 1px solid rgba(51, 51, 51, 0.1);
  }
`;

const NavLink = styled(Link)`
  text-decoration: none !important;
  color: ${({ active }) => (active ? "#fff" : "#333")};
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 1rem;
  display: block;
  font-weight: 500;
  letter-spacing: 0.5px;

  &:hover {
    color: #fff;
  }

  &::after {
    content: "";
    display: ${({ active }) => (active ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 2rem);
    height: 2px;
    background-color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(13, 10, 10, 0.5);
  z-index: 998;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease;
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};

  @media (max-width: 768px) {
    display: block;
  }
`;

export default Navbar;