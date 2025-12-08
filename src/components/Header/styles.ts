import { NavLink } from "react-router-dom";
import styled from "styled-components";
import vk_icon from "../../assets/vk-icon.svg";
import tg_icon from "../../assets/tg-icon.svg";

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px; /* Yükseklik sabitlendi */
  z-index: 1100; /* Canvas ve diğer her şeyin üzerinde */
  background: rgba(255, 255, 255, 0.85); /* Hafif şeffaf beyaz */
  backdrop-filter: blur(12px); /* Buzlu cam efekti */
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.6);
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  transition: all 0.3s ease;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);

  /* Altına giren içeriği kurtarmak için global ayar (Opsiyonel) */
  /* Bu header fixed olduğu için, sayfa içeriğinin en üstüne padding-top: 100px verilmelidir. */
`;

export const HeaderInner = styled.div`
  max-width: 1400px; /* Geniş ekranlarda daha iyi görünüm */
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TopBar = styled.div`
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  margin-bottom: 8px;

  @media (max-width: 768px) {
    display: none; /* Mobilde üst barı gizle, kalabalık yapmasın */
  }
`;

export const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #2563eb;
  }

  img {
    width: 14px;
    height: 14px;
    opacity: 0.6;
  }
`;

export const MainNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
`;

// Logo artık bir Link (NavLink)
export const LogoBrand = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  img {
    height: 40px;
    width: auto;
  }

  .brand-text {
    font-size: 22px;
    font-weight: 800;
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;

    @media (max-width: 968px) {
      display: none;
    }
  }
`;

export const NavigationMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(241, 245, 249, 0.5);
  padding: 4px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.5);

  @media (max-width: 968px) {
    display: none;
  }
`;

export const NavItem = styled(NavLink)`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    color: #0f172a;
    background: rgba(255, 255, 255, 0.8);
  }

  &.active {
    color: #2563eb;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    font-weight: 600;
  }
`;

export const ActionSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 8px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SocialIcon = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    border-color: #2563eb;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
  }
`;

export const TelegramIcon = styled(SocialIcon)`
  &::after {
    content: "";
    width: 20px;
    height: 20px;
    background: url(${tg_icon}) no-repeat center/contain;
  }
`;

export const VKIcon = styled(SocialIcon)`
  &::after {
    content: "";
    width: 20px;
    height: 20px;
    background: url(${vk_icon}) no-repeat center/contain;
  }
`;

export const LoginButton = styled(NavLink)`
  padding: 10px 24px;
  background: #2563eb;
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
    box-shadow: 0 6px 10px -1px rgba(37, 99, 235, 0.3);
  }
`;

export const MobileMenuButton = styled.div`
  display: none;
  @media (max-width: 968px) {
    display: block;
  }
`;
