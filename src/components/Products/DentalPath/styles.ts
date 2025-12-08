import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(32px);}
  to { opacity: 1; transform: translateY(0);}
`;

export const DentalPathContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafa, #f0f4fd 80%, #fff 100%);
  padding-top: 140px;
`;

export const CategoryBar = styled.div`
  width: 100%;
  height: 120px;
  background: rgba(248, 250, 252, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  box-shadow: 0 2px 12px rgba(100, 104, 154, 0.1);
`;

export const TitleCategory = styled.div`
  margin: 0;
  width: auto;
`;

export const Title = styled.h1`
  font-size: 2.1rem;
  font-weight: 900;
  background: linear-gradient(135deg, #6366f8, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

export const MainContent = styled.div`
  max-width: 960px;
  margin: 3rem auto;
  padding: 2rem 3rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 36px;
  box-shadow: 0 15px 45px rgba(124, 58, 237, 0.15);
  animation: ${fadeIn} 0.8s ease forwards;
  color: #4b4b6a;
  font-size: 1.325rem;
  font-weight: 400;
  line-height: 1.65;
`;

export const Subtitle = styled.p`
  max-width: 850px;
  margin: 0 auto 2.5rem auto;
  text-align: left;
`;

export const ImagesWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

export const StyledImg = styled.img`
  max-width: 400px;
  width: 100%;
  border-radius: 28px;
  box-shadow: 0 18px 40px rgba(124, 58, 237, 0.08);
  transition: all 0.4s ease;

  &:hover {
    box-shadow: 0 28px 50px rgba(124, 58, 237, 0.14);
    transform: scale(1.07);
  }
`;
