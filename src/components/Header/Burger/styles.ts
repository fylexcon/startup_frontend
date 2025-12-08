import styled, { createGlobalStyle } from "styled-components";
import { NavLink } from "react-router-dom";

export const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden;
  }
`;

export const BurgerButton = styled.button`
  background: rgba(248, 250, 252, 0.9);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    background: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.96);
  }

  @media (min-width: 969px) {
    display: none;
  }

  svg {
    fill: #374151;
    transition: fill 0.2s ease;
  }

  &:hover svg {
    fill: #111827;
  }
`;

export const HamburgerMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  width: 100vw;
  height: 100vh;
  z-index: 12000;
  display: flex;
  justify-content: flex-end;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      backdrop-filter: blur(0px);
    }
    to {
      opacity: 1;
      backdrop-filter: blur(8px);
    }
  }
`;

export const HamburgerMenuContent = styled.div`
  background: #ffffff;
  width: 85vw;
  max-width: 380px;
  min-width: 280px;
  height: 100vh;
  padding: 80px 32px 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  position: relative;
  box-shadow: -8px 0 32px rgba(15, 23, 42, 0.2);
  border-radius: 24px 0 0 24px;
  animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (min-width: 969px) {
    display: none;
  }
`;

export const CloseButton = styled.button`
  background: rgba(248, 250, 252, 0.8);
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 12px;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  width: 44px;
  height: 44px;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 12010;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    background: white;
    color: #374151;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const MenuItem = styled(NavLink)`
  font-size: 18px;
  font-weight: 600;
  color: #334155;
  padding: 16px 20px;
  border-radius: 16px;
  width: 100%;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.08), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    color: white;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    transform: translateX(8px);
    border-color: rgba(99, 102, 241, 0.2);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);

    &::before {
      left: 100%;
    }
  }

  &.active {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.2);
    transform: translateX(4px);
  }

  &:active {
    transform: translateX(12px) scale(0.98);
  }
`;
