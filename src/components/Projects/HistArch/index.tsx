import React from "react";
import {
  HistArchContainer,
  CategoryBar,
  TitleCategory,
  Title,
  MainContent,
  Subtitle,
  ImageWrapper,
  StyledImg,
} from "./styles";
import HistArch_img from "../../../assets/HistArch.png";

export default function HistArch() {
  return (
    <HistArchContainer>
      <CategoryBar>
        <TitleCategory>
          <Title>HistArch</Title>
        </TitleCategory>
      </CategoryBar>
      <MainContent>
        <Subtitle>
          Архив полнослайдовых изображений гистологических препаратов,
          макроизображений для медицинских учреждений здравоохранения и
          образования. Встроенные инструменты аннотации позволяют создавать
          датасеты и проводить телеконсультации. Разработанные нейросетевые
          модели позволяют внедрять новые методы обучения, совершенствовать
          практические навыки.
        </Subtitle>
        <ImageWrapper>
          <StyledImg src={HistArch_img} alt="HistArch screenshot"/>
        </ImageWrapper>
      </MainContent>
    </HistArchContainer>
  );
}
