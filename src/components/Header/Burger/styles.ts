// ... (Önceki Header stilleri yukarıda kalsın) ...

import styled, { createGlobalStyle, keyframes } from "styled-components";
import { NavLink } from "react-router-dom";

export const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden; /* Yatay taşmayı engelle */
  }
`;

// Animasyonlar
const fadeIn = keyframes`
  from { opacity: 0; backdrop-filter: blur(0px); }
  to { opacity: 1; backdrop-filter: blur(8px); }
`;

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// BURGER BUTONU (Masaüstünde gizli)
export const BurgerButton = styled.button`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  color: #334155;

  &:hover {
    background: #f8fafc;
    color: #0f172a;
    transform: translateY(-1px);
  }

  @media (min-width: 969px) {
    display: none;
  }
`;

// KARARTMA KATMANI (OVERLAY)
export const HamburgerMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.6); /* Koyu lacivert yarı saydam */
  backdrop-filter: blur(8px);
  z-index: 12000;
  display: flex;
  justify-content: flex-end;
  animation: ${fadeIn} 0.3s ease-out;
`;

// MENÜ İÇERİĞİ
export const HamburgerMenuContent = styled.div`
  background: #ffffff;
  width: 85vw;
  max-width: 320px;
  height: 100vh;
  padding: 80px 24px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.4s cubic-bezier(0.16, 1, 0.3, 1); /* Apple tarzı yumuşak geçiş */
  position: relative;
`;

// KAPATMA BUTONU
export const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    color: #ef4444; /* Kırmızı hover */
    transform: rotate(90deg);
  }
`;

// MENÜ LİNKİ
export const MenuItem = styled(NavLink)`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #334155;
  padding: 14px 16px;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s;
  margin-bottom: 8px;

  &:hover {
    background: #f1f5f9;
    color: #2563eb;
    padding-left: 20px; /* Sağa kayma efekti */
  }

  &.active {
    background: #eff6ff;
    color: #2563eb;
  }
`;

// MENÜ ALT KISMI (Sosyal İkonlar)
export const MenuFooter = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
`;

export const MenuSocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: white;
    color: #2563eb;
    border-color: #2563eb;
    transform: translateY(-2px);
  }
`;
