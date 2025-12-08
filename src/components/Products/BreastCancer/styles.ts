import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const BreastContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0 70%, #fff 100%);
  padding-top: 140px;
`;

export const CategoryBar = styled.div`
  width: 100%;
  height: 120px;
  background: rgba(240, 240, 255, 0.7);
  box-shadow: 0 2px 12px rgba(99,102,241,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const TitleCategory = styled.div`
  margin: 0;
  width: auto;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

export const MainContent = styled.div`
  max-width: 950px;
  margin: 0 auto;
  padding: 2rem;
  animation: ${fadeInUp} 0.8s cubic-bezier(.4,0,.2,1);
  border-radius: 24px;
  background: rgba(255,255,255,0.8);
  box-shadow: 0 4px 32px rgba(99,102,241,0.08);
`;

export const Subtitle = styled.p`
  font-size: 1.15rem;
  line-height: 1.8;
  color: #444563;
  margin-bottom: 2.3rem;
  font-weight: 500;
`;

export const ImagesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledImg = styled.img`
  width: 320px;
  max-width: 90vw;
  border-radius: 28px;
  box-shadow: 0 4px 20px rgba(100,110,255,0.07);
  transition: box-shadow 0.3s, transform 0.3s;

  &:hover {
    box-shadow: 0 10px 36px rgba(99,102,241,0.1);
    transform: scale(1.03);
  }
`;
