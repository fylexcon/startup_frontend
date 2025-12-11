import React from "react";
import { useAuth } from "../../Contexts/AuthContext"; // AuthContext eklendi
import { Avatar } from "@mui/material"; // Avatar için
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
  UserProfileLink, // Yeni eklenen profil linki stili
} from "./styles";

import Logo from "../../assets/logo.png";
import PhoneIcon from "../../assets/PhoneIcon.png";
import MailIcon from "../../assets/Mailicon.png";
import Burger from "./Burger";

function Header() {
  const { user } = useAuth(); // Kullanıcı bilgisini çek

  return (
    <HeaderContainer>
      <HeaderInner>
        {/* Üst Bilgi Çubuğu */}
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
          {/* Logo */}
          <LogoBrand to="/">
            <img src={Logo} alt="CALADRIUS" />
            <span className="brand-text">CALADRIUS</span>
          </LogoBrand>

          {/* Menü Linkleri */}
          <NavigationMenu>
            <NavItem to="/">Главная</NavItem>
            <NavItem to="/products">Продукты</NavItem>
            <NavItem to="/projects">Проекты</NavItem>
            <NavItem to="/archive">Архив</NavItem>
            <NavItem to="/about">О компании</NavItem>
            <NavItem to="/contacts">Контакты</NavItem>

            {/* Kullanıcı giriş yapmışsa Canvas linkini de göster */}
            {user && (
              <NavItem to="/canvas" style={{ color: "#2563eb" }}>
                Рабочее место
              </NavItem>
            )}
          </NavigationMenu>

          {/* Sağ Aksiyonlar */}
          <ActionSection>
            <SocialLinks>
              <TelegramIcon as="a" href="https://t.me/" target="_blank" />
              <VKIcon as="a" href="https://vk.com/" target="_blank" />
            </SocialLinks>

            {/* DİNAMİK GİRİŞ BUTONU */}
            {user ? (
              // Kullanıcı Varsa: Profil Linki
              <UserProfileLink to="/dashboard">
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "#2563eb",
                    fontSize: 14,
                  }}
                  src={user.avatar}
                >
                  {user.firstName ? user.firstName[0] : "U"}
                </Avatar>
                <span>{user.firstName}</span>
              </UserProfileLink>
            ) : (
              // Kullanıcı Yoksa: Giriş Butonu
              <LoginButton to="/auth">Вход</LoginButton>
            )}

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
