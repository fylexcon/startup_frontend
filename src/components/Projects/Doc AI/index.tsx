import React from "react";
import {
  DocAiContainer,
  CategoryBar,
  TitleCategory,
  Title,
  MainContent,
  Subtitle,
  ImageWrapper,
  StyledImg,
} from "./styles";
import DocAi_img from "../../../assets/DocAI.png";

export default function DocAI() {
  return (
    <DocAiContainer>
      <CategoryBar>
        <TitleCategory>
          <Title>Doc AI</Title>
        </TitleCategory>
      </CategoryBar>
      <MainContent>
        <Subtitle>
          Умный ассистент врачей-специалистов, быстрая и точная помощь в постановке диагнозов.
        </Subtitle>
        <ImageWrapper>
          <StyledImg src={DocAi_img} alt="DocAI screenshot"/>
        </ImageWrapper>
      </MainContent>
    </DocAiContainer>
  );
}
