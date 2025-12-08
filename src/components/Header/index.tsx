import React from "react";
import { Link } from "react-router-dom"; // Link import edildi
import {
  HeaderContainer,
  HeaderInner,
  TopBar,
  ContactItem,
  MainNav,
  LogoBrand,
  NavigationMenu,
  NavItem,
  ActionSection,
  SocialLinks,
  TelegramIcon,
  VKIcon,
  LoginButton,
  MobileMenuButton,
} from "./styles";
import Logo from "../../assets/logo.png";
import PhoneIcon from "../../assets/PhoneIcon.png";
import MailIcon from "../../assets/Mailicon.png";
import Burger from "./Burger";

function Header() {
  return (
    <HeaderContainer>
      <HeaderInner>
        {/* Üst Bilgi Çubuğu (Telefon/Email) */}
        <TopBar>
          <ContactItem href="tel:+78005559267">
            <img src={PhoneIcon} alt="phone" />
            <span>8 800 555-92-67</span>
          </ContactItem>
          <ContactItem href="mailto:caladrius.technology@gmail.com">
            <img src={MailIcon} alt="email" />
            <span>caladrius.technology@gmail.com</span>
          </ContactItem>
        </TopBar>

        {/* Ana Navigasyon */}
        <MainNav>
          {/* Logo - Tıklanınca Ana Sayfaya Gider */}
          <LogoBrand to="/">
            <img src={Logo} alt="CALADRIUS" />
            <span className="brand-text">CALADRIUS</span>
          </LogoBrand>

          {/* Menü Linkleri */}
          <NavigationMenu>
            <NavItem to="/">Главная</NavItem> {/* Ana Sayfa */}
            <NavItem to="/products">Продукты</NavItem>
            <NavItem to="/projects">Проекты</NavItem>
            <NavItem to="/archive">Архив</NavItem>
            <NavItem to="/about">О компании</NavItem>
            <NavItem to="/contacts">Контакты</NavItem>
          </NavigationMenu>

          {/* Sağ Aksiyonlar */}
          <ActionSection>
            <SocialLinks>
              <TelegramIcon
                as="a"
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
              />
              <VKIcon
                as="a"
                href="https://vk.com/"
                target="_blank"
                rel="noopener noreferrer"
              />
            </SocialLinks>

            <LoginButton to="/auth">Вход</LoginButton>

            <MobileMenuButton>
              <Burger />
            </MobileMenuButton>
          </ActionSection>
        </MainNav>
      </HeaderInner>
    </HeaderContainer>
  );
}

export default Header;
