import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ProjectsContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0 70%, #fff 100%);
  padding-top: 150px;
  @media (max-width: 768px) {
    padding-top: 100px;
  }
`;

export const CategoryBar = styled.div`
  width: 100%;
  height: 120px;
  background: rgba(240, 240, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  box-shadow: 0 2px 12px rgba(99,102,241,0.04);
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

export const ProjectsGrid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 2.2rem;
  padding: 2rem;
`;

export const ProjectCard = styled.article`
  background: rgba(255,255,255,0.97);
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(99,102,241,0.12);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s, transform 0.3s;
  animation: ${fadeInUp} 0.8s cubic-bezier(.4,0,.2,1);
  &:hover {
    box-shadow: 0 8px 32px rgba(99,102,241,0.19);
    transform: translateY(-5px) scale(1.015);
  }
`;

export const ProjectHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const ProjectName = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #6366f1;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin: 0;
`;

export const ProjectLine = styled.div`
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 2px;
`;

export const ProjectSubtitleContainer = styled.div`
  margin-top: 1.1rem;
  background: #f3f5fa;
  border-radius: 12px;
  padding: 1rem 1.3rem;
  display: flex;
`;

export const ProjectSubtitle = styled.p`
  color: #454759;
  font-size: 1rem;
  line-height: 1.6;
  flex: 1;
`;

export const MoreButton = styled(Link)`
  margin-left: 0.8em;
  color: #6366f1;
  background: rgba(99,102,241,0.07);
  font-weight: 600;
  border-radius: 8px;
  padding: 0.5em 1em;
  text-decoration: none;
  transition: all 0.2s;
  &:hover {
    background: #6366f1;
    color: #fff;
    box-shadow: 0 2px 12px rgba(99,102,241,0.12);
  }
`;
