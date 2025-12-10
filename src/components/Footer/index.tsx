import React from "react";
import {
  FooterContainer,
  PartnersRow,
  FooterPartnerLogo,
  ProjectInfoContainer,
  ProjectInfoImage,
  FooterContent,
  FooterColumn,
  FooterLogo,
  FooterDescription,
  ColumnTitle,
  FooterLinks,
  FooterLink,
  ContactItem,
  SocialIcons,
  SocialIcon,
  Copyright,
} from "./styles";

import Logo from "../../assets/logo.png";
import {
  Phone,
  Email,
  LocationOn,
  Telegram,
  LinkedIn,
} from "@mui/icons-material";

// PARTNERLER
import Aha1 from "../../assets/aha1.jpg";
import Aha2 from "../../assets/aha2.jpg";
import Aha3 from "../../assets/aha3.jpg";
import Aha4 from "../../assets/aha4.png";
import Aha5 from "../../assets/aha5.jpg";
import Aha6 from "../../assets/aha6.png";

// AHA7 (Destek Görseli)
import Aha7 from "../../assets/aha7.jpg";

const partners = [Aha1, Aha2, Aha3, Aha4, Aha5, Aha6];

export default function Footer() {
  return (
    <FooterContainer>
      {/* 1. PARTNER LOGOLARI */}
      <PartnersRow>
        {partners.map((img, index) => (
          <FooterPartnerLogo
            key={index}
            src={img}
            alt={`Partner ${index + 1}`}
          />
        ))}
      </PartnersRow>

      {/* 2. PROJE BİLGİ GÖRSELİ */}
      <ProjectInfoContainer>
        <ProjectInfoImage src={Aha7} alt="Информация о поддержке проекта" />
      </ProjectInfoContainer>

      {/* 3. FOOTER İÇERİĞİ (RUSÇA) */}
      <FooterContent>
        <FooterColumn>
          <FooterLogo>
            <img src={Logo} alt="Caladrius Logo" />
            CALADRIUS
          </FooterLogo>
          <FooterDescription>
            Платформа цифровой патологии на базе искусственного интеллекта.
            Ускоряем диагностические процессы, модернизируем обучение.
          </FooterDescription>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Платформа</ColumnTitle>
          <FooterLinks>
            <FooterLink to="/">Главная</FooterLink>
            <FooterLink to="/products">Продукты</FooterLink>
            <FooterLink to="/projects">Проекты</FooterLink>
            <FooterLink to="/about">О компании</FooterLink>
          </FooterLinks>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Поддержка</ColumnTitle>
          <FooterLinks>
            <FooterLink to="/contacts">Контакты</FooterLink>
            <FooterLink to="/privacy">Политика конфиденциальности</FooterLink>
            <FooterLink to="/terms">Условия использования</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
          </FooterLinks>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Свяжитесь с нами</ColumnTitle>
          <ContactItem>
            <Phone fontSize="small" />
            <span>8 800 555-92-67</span>
          </ContactItem>
          <ContactItem>
            <Email fontSize="small" />
            <span>caladrius.technology@gmail.com</span>
          </ContactItem>
          <ContactItem>
            <LocationOn fontSize="small" />
            <span>Москва, Россия</span>
          </ContactItem>

          <SocialIcons>
            <SocialIcon href="#" target="_blank">
              <Telegram />
            </SocialIcon>
            <SocialIcon href="#" target="_blank">
              <LinkedIn />
            </SocialIcon>
          </SocialIcons>
        </FooterColumn>
      </FooterContent>

      <Copyright>
        © {new Date().getFullYear()} CALADRIUS Technology. Все права защищены.
      </Copyright>
    </FooterContainer>
  );
}
