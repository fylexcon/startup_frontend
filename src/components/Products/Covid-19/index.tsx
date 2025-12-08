import React from "react";
import {
  CovidContainer,
  CategoryBar,
  TitleCategory,
  Title,
  MainContent,
  Subtitle,
  ImageWrapper,
  StyledImg,
} from "./styles";
import Covid_19_img from "../../../assets/Covid-19_img.jpg";

export default function Covid19() {
  return (
    <CovidContainer>
      <CategoryBar>
        <TitleCategory>
          <Title>Covid-19</Title>
        </TitleCategory>
      </CategoryBar>
      <MainContent>
        <Subtitle>
          Оценка иммунного ответа в цифровых гистологических изображениях легких пациентов при COVID-19.
        </Subtitle>
        <ImageWrapper>
          <StyledImg src={Covid_19_img} alt="Covid-19 immune response" />
        </ImageWrapper>
      </MainContent>
    </CovidContainer>
  );
}
