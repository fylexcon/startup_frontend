import styled, { keyframes } from "styled-components";

// Animasyonlar
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const MainPageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 100px;
  background-color: #f8fafc;
  font-family: "Inter", sans-serif;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

export const HeroSection = styled.div`
  position: relative;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  margin-bottom: 60px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    );
    background-size: 30px 30px;
    opacity: 0.3;
  }
`;

export const HeroContent = styled.div`
  z-index: 2;
  max-width: 900px;
  padding: 0 20px;
  animation: ${fadeIn} 1s ease-out;

  h1 {
    font-size: 64px;
    font-weight: 800;
    margin-bottom: 24px;
    line-height: 1.1;
    background: linear-gradient(to right, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media (max-width: 768px) {
      font-size: 40px;
    }
  }

  p {
    font-size: 20px;
    color: #cbd5e1;
    margin-bottom: 40px;
    line-height: 1.6;
  }
`;

export const ScrollButton = styled.button`
  padding: 16px 40px;
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
  background: #ffffff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
    background: #f1f5f9;
  }
`;

export const ContentSection = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
  padding: 0 20px;
`;

export const MainTitle = styled.h2`
  font-size: 36px;
  color: #0f172a;
  margin-bottom: 16px;
  font-weight: 700;
`;

export const MainSubitle = styled.p`
  font-size: 18px;
  color: #64748b;
  line-height: 1.6;
`;

export const SectionDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  gap: 20px;
`;

export const Line = styled.div`
  height: 2px;
  width: 100px;
  background: #e2e8f0;
`;

export const ProductName = styled.span`
  font-weight: 600;
  color: #2563eb;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const TestCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto 80px;
  padding: 0 20px;
`;

export const TestCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

export const TestTitle = styled.h3`
  padding: 20px;
  font-size: 18px;
  color: #1e293b;
  margin: 0;
  border-bottom: 1px solid #f1f5f9;
`;

export const FeatureSection = styled.div`
  background: white;
  padding: 80px 0;
  margin-bottom: 80px;
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureImage = styled.div`
  img {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

export const CompContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const SubCompContainer = styled.div`
  padding: 20px;
  border-left: 4px solid #e2e8f0;
  transition: all 0.3s;

  &:hover {
    border-left-color: #2563eb;
    background: #f8fafc;
  }
`;

export const SubCompTitle = styled.h4`
  font-size: 20px;
  color: #0f172a;
  margin: 0 0 8px 0;
`;

export const SubCompSubtitle = styled.p`
  font-size: 16px;
  color: #64748b;
  margin: 0;
`;

export const StatisticWrapper = styled.div`
  background: #1e293b;
  color: white;
  padding: 80px 20px;
  text-align: center;
  border-radius: 30px;
  max-width: 1300px;
  margin: 0 auto 80px;
`;

export const StatTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 50px;
`;

export const StatisticsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
`;

export const StatCard = styled.div`
  flex: 1;
  min-width: 250px;
`;

export const Amount = styled.div`
  font-size: 48px;
  font-weight: 800;
  color: #60a5fa;
  margin-bottom: 10px;
`;

export const StatSubitle = styled.p`
  font-size: 16px;
  color: #94a3b8;
`;

export const MainFooterContainer = styled.div`
  margin-bottom: 0; /* Boşluk kaldırıldı, footer tam otursun */
`;

// Eski exportlar
export const Card = styled.div``;
export const Overlay = styled.div``;
export const Label = styled.span``;
export const MainContainer = styled.div``;
