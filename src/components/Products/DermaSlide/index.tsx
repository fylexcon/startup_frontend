import React from "react";
import {
  DermaSlideContainer,
  CategoryBar,
  TitleCategory,
  Title,
  MainContent,
  Subtitle,
  ImagesWrapper,
  StyledImg,
} from "./styles";
import Derma_slide_img from "../../../assets/derma_slide_img.jpg";

export default function DermaSlide() {
  return (
    <DermaSlideContainer>
      <CategoryBar>
        <TitleCategory>
          <Title>DermaSlide</Title>
        </TitleCategory>
      </CategoryBar>
      <MainContent>
        <Subtitle>
          Программа для анализа дерматоскопических изображений кожи — это современное решение, разработанное для поддержки врачей-дерматологов в диагностике кожных заболеваний. С помощью advanced-алгоритмов искусственного интеллекта программа анализирует дерматоскопические снимки, выявляя признаки новообразований, таких как меланома, базальноклеточный рак и другие патологии кожи. Одной из ключевых функций программы является возможность получения второго мнения, что особенно важно для повышения точности диагностики. Врач может загрузить изображение, а система предоставит детальный анализ с указанием вероятных диагнозов и рекомендациями по дальнейшим действиям. Это не только сокращает время на постановку диагноза, но и минимизирует риск ошибок. Программа также позволяет вести архив пациентов, отслеживать динамику изменений и обмениваться данными с коллегами для консультаций. Для врачей это инструмент, который повышает уверенность в принятии клинических решений.
        </Subtitle>
        <ImagesWrapper>
          <StyledImg src={Derma_slide_img} alt="DermaSlide screenshot" />
        </ImagesWrapper>
      </MainContent>
    </DermaSlideContainer>
  );
}
