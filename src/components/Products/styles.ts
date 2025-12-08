import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
`;

export const ProductsContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 1) 0%,
    rgba(248, 250, 252, 1) 50%,
    rgba(241, 245, 249, 1) 100%
  );
  padding-top: 108px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  @media (max-width: 768px) {
    padding-top: 90px;
  }
`;

export const HeroSection = styled.section`
  position: relative;
  padding: 4rem 0 6rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 50%);
  }

  @media (max-width: 768px) {
    padding: 3rem 0 4rem;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const MainTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 1.5rem 0;
  line-height: 1.1;
  letter-spacing: -0.02em;
  animation: ${fadeInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const MainSubtitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  font-weight: 500;
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  letter-spacing: -0.01em;
  animation: ${fadeInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
`;

export const ProductsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 6rem;
  display: grid;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem 4rem;
    gap: 1.5rem;
  }
`;

export const ProductCard = styled.article`
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  padding: 2.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  animation: ${fadeInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.8), transparent);
    transition: left 0.6s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.2);

    &::before {
      left: 100%;
    }

    &::after {
      opacity: 1;
    }

    .product-name {
      color: #6366f1;
      transform: translateX(4px);
    }

    .more-button {
      background: #6366f1;
      color: white;
      transform: translateX(4px);
      box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
    }
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const ProductHeader = styled.div`
  margin-bottom: 1.5rem;
`;

export const ProductName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.01em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
`;

export const ProductAccent = styled.div`
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 2px;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: ${shimmer} 2s ease-in-out infinite;
  }

  ${ProductCard}:hover & {
    width: 80px;
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
  }
`;

export const ProductDescription = styled.div`
  background: rgba(248, 250, 252, 0.8);
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
`;

export const ProductText = styled.p`
  font-size: 1rem;
  color: #475569;
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
  letter-spacing: -0.01em;
`;

export const ProductActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const MoreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &::after {
    content: '→';
    font-size: 1rem;
    transition: transform 0.2s ease;
  }

  &:hover {
    &::before {
      left: 100%;
    }

    &::after {
      transform: translateX(2px);
    }
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const FloatingElements = styled.div`
  position: fixed;
  top: 50%;
  left: 10%;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    top: 60%;
    right: 20%;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(99, 102, 241, 0.1));
    border-radius: 50%;
    animation: ${float} 8s ease-in-out infinite reverse;
  }

  @media (max-width: 968px) {
    display: none;
  }
`;

// Backward compatibility
export const CategoryContainer = styled(HeroSection)``;
export const TitleCategory = styled(HeroContent)``;
export const Title = styled(MainTitle)``;
export const Subtitle = styled(MainSubtitle)``;
export const Container = styled(ProductsGrid)``;
export const ProductSubtitleContainer = styled(ProductDescription)``;
export const ProductSubtitle = styled(ProductText)``;
export const Line = styled(ProductAccent)``;
