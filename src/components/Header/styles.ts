import { NavLink } from "react-router-dom";
import styled from "styled-components";
import vk_icon from "../../assets/vk-icon.svg";
import tg_icon from "../../assets/tg-icon.svg";

// --- ANA KONTEYNER ---
export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: auto; /* İçeriğe göre uzasın (TopBar + MainNav) */
  z-index: 1100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px); /* Güçlü buzlu cam */
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03); /* Çok hafif, modern gölge */
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
`;

export const HeaderInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// --- EN ÜST KOYU ŞERİT (TopBar) ---
export const TopBar = styled.div`
  height: 36px;
  background-color: #0f172a; /* Koyu Lacivert (Footer ile uyumlu) */
  display: flex;
  justify-content: flex-end; /* Sağa yasla */
  align-items: center;
  padding: 0 40px;
  gap: 30px;

  @media (max-width: 968px) {
    display: none; /* Mobilde gizle */
  }
`;

export const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #94a3b8; /* Açık gri metin */
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
  letter-spacing: 0.3px;

  &:hover {
    color: #fff; /* Üzerine gelince beyazla */
  }

  img {
    width: 14px;
    height: 14px;
    filter: brightness(0) invert(1); /* İkonları beyaz yap */
    opacity: 0.7;
  }
`;

// --- ANA MENÜ ALANI ---
export const MainNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px; /* Daha geniş, ferah */
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 60px;
  }
`;

// LOGO
export const LogoBrand = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;

  img {
    height: 42px;
    width: auto;
  }

  .brand-text {
    font-size: 24px;
    font-weight: 800;
    /* Modern Gradient Metin */
    background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;

    @media (max-width: 968px) {
      font-size: 20px;
    }
  }
`;

// MENÜ LİNKLERİ
export const NavigationMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 968px) {
    display: none;
  }
`;

export const NavItem = styled(NavLink)`
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #475569; /* Slate 600 */
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;

  /* Hover Efekti */
  &:hover {
    color: #2563eb;
    background-color: #f8fafc;
  }

  /* Aktif Sayfa Efekti */
  &.active {
    color: #2563eb;
    background-color: #eff6ff; /* Çok açık mavi arka plan */
  }
`;

// SAĞ AKSİYONLAR
export const ActionSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
  padding-right: 16px;
  border-right: 1px solid #e2e8f0; /* Ayırıcı çizgi */

  @media (max-width: 1100px) {
    display: none;
  }
`;

export const SocialIcon = styled.a`
  width: 32px;
  height: 32px;
  border-radius: 50%; /* Yuvarlak ikonlar */
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid #cbd5e1;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: #2563eb;
    background: #2563eb;
    transform: translateY(-2px);
    /* İkon içini beyaz yapacak CSS eklenebilir veya SVG manipülasyonu */
  }
`;

export const TelegramIcon = styled(SocialIcon)`
  &::after {
    content: "";
    width: 16px;
    height: 16px;
    background: url(${tg_icon}) no-repeat center/contain;
  }
  &:hover::after {
    filter: brightness(0) invert(1);
  } /* Hover'da ikon beyaz */
`;

export const VKIcon = styled(SocialIcon)`
  &::after {
    content: "";
    width: 16px;
    height: 16px;
    background: url(${vk_icon}) no-repeat center/contain;
  }
  &:hover::after {
    filter: brightness(0) invert(1);
  }
`;

// GİRİŞ BUTONU
export const LoginButton = styled(NavLink)`
  padding: 10px 28px;
  background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  border-radius: 50px; /* Hap şeklinde buton */
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
    filter: brightness(1.1);
  }
`;

// KULLANICI PROFİL BUTONU (Yeni Eklenen)
export const UserProfileLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  padding: 6px 16px 6px 6px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 50px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
  }

  span {
    font-size: 14px;
    font-weight: 600;
    color: #334155;
  }
`;

export const MobileMenuButton = styled.div`
  display: none;
  cursor: pointer;
  @media (max-width: 968px) {
    display: block;
  }
`;
