import React from "react";
import {
  PathAiContainer,
  CategoryBar,
  TitleCategory,
  Title,
  MainContent,
  Subtitle,
  ImagesWrapper,
  StyledImg,
} from "./styles";
import PathAI_1 from "../../../assets/pathai_1.png";
import PathAI_2 from "../../../assets/pathai_2.png";

export default function PathAi() {
  return (
    <PathAiContainer>
      <CategoryBar>
        <TitleCategory>
          <Title>Path AI</Title>
        </TitleCategory>
      </CategoryBar>
      <MainContent>
        <Subtitle>
          Мобильное приложение для пациентов патоморфологического и онкологического профилей.
          Пациент может загружать полнослайдовые изображения биопсий для получения второго мнения специалистов,
           проводить оценку рисков с помощью инструментов ИИ. Приложение работает как с макро-, так и с микроизображениями.
        </Subtitle>
        <ImagesWrapper>
          <StyledImg src={PathAI_1} alt="pathai1" />
          <StyledImg src={PathAI_2} alt="pathai2" />
        </ImagesWrapper>
      </MainContent>
    </PathAiContainer>
  );
}
