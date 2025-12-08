import React from "react";
import {
  ProjectsContainer,
  CategoryBar,
  TitleCategory,
  Title,
  ProjectsGrid,
  ProjectCard,
  ProjectHeader,
  ProjectName,
  ProjectLine,
  ProjectSubtitleContainer,
  ProjectSubtitle,
  MoreButton,
} from "./styles";

export default function Projects() {
  return (
    <ProjectsContainer>
      <CategoryBar>
        <TitleCategory>
          <Title>Образовательные проекты</Title>
        </TitleCategory>
      </CategoryBar>

      <ProjectsGrid>
        <ProjectCard>
          <ProjectHeader>
            <ProjectName>Path AI</ProjectName>
            <ProjectLine />
          </ProjectHeader>
          <ProjectSubtitleContainer>
            <ProjectSubtitle>
              Мобильное приложение для пациентов патоморфологического и онкологического профилей.
              <MoreButton to="/pathAI">Подробнее</MoreButton>
            </ProjectSubtitle>
          </ProjectSubtitleContainer>
        </ProjectCard>

        <ProjectCard>
          <ProjectHeader>
            <ProjectName>Hist Arch</ProjectName>
            <ProjectLine />
          </ProjectHeader>
          <ProjectSubtitleContainer>
            <ProjectSubtitle>
              Приложение для хранения и анализа исторических архиваций данных.
              <MoreButton to="/histArch">Подробнее</MoreButton>
            </ProjectSubtitle>
          </ProjectSubtitleContainer>
        </ProjectCard>

        <ProjectCard>
          <ProjectHeader>
            <ProjectName>Doc AI</ProjectName>
            <ProjectLine />
          </ProjectHeader>
          <ProjectSubtitleContainer>
            <ProjectSubtitle>
              AI система для автоматического распознавания и обработки медицинских документов.
              <MoreButton to="/docAI">Подробнее</MoreButton>
            </ProjectSubtitle>
          </ProjectSubtitleContainer>
        </ProjectCard>
      </ProjectsGrid>
    </ProjectsContainer>
  );
}
