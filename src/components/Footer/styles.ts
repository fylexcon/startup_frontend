import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterContainer = styled.footer`
  background-color: #0f172a; /* Koyu Lacivert */
  color: #94a3b8;
  padding: 60px 0 20px;
  font-family: "Inter", sans-serif;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

// --- 1. PARTNERLER İÇİN STİL ---
export const PartnersRow = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
  padding: 0 20px 40px;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const FooterPartnerLogo = styled.img`
  height: 50px;
  width: auto;
  max-width: 120px;
  object-fit: contain;
  background: white;
  padding: 5px;
  border-radius: 6px;
  opacity: 0.7;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
`;

// --- 2. AHA7 (PROJE DESTEK GÖRSELİ) - KÜÇÜLTÜLDÜ ---
export const ProjectInfoContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 40px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
`;

export const ProjectInfoImage = styled.img`
  width: 100%;
  max-width: 500px; /* BURASI DEĞİŞTİ: Görsel genişliği sınırlandı */
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  background-color: white;
  padding: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Hafif gölge eklendi */
`;

// --- 3. STANDART FOOTER İÇERİĞİ ---
export const FooterContent = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 24px;
  font-weight: 800;

  img {
    height: 40px;
    width: auto;
  }
`;

export const FooterDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  max-width: 300px;
`;

export const ColumnTitle = styled.h3`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FooterLink = styled(Link)`
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;

  &:hover {
    color: #60a5fa;
    padding-left: 5px;
  }
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;

  svg {
    color: #60a5fa;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

export const SocialIcon = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background: #2563eb;
    transform: translateY(-3px);
  }
`;

export const Copyright = styled.div`
  width: 100%;
  max-width: 1200px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 60px;
  padding-top: 20px;
  text-align: center;
  font-size: 13px;
  color: #64748b;
`;
