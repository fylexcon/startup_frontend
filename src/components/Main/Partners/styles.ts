import styled from "styled-components";

export const PartnerSection = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 24px 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    margin: 16px;
    padding: 20px 12px;
  }
`;

export const PartnerTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-align: center;
  margin-bottom: 24px;
  color: #1e293b;
  background: linear-gradient(135deg, #1e293b 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

export const PartnerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(140px, 1fr)
  ); /* Responsive Grid */
  gap: 20px;
  align-items: center;
  justify-items: center;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const PartnerLogo = styled.img`
  width: 100%;
  max-width: 140px;
  max-height: 70px;
  object-fit: contain;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(226, 232, 240, 0.5);
  cursor: pointer;

  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
    border-color: rgba(99, 102, 241, 0.3);
  }

  @media (max-width: 768px) {
    max-width: 120px;
    max-height: 60px;
    padding: 10px;
  }
`;
