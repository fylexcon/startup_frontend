import React from "react";
import {
  BreastContainer,
  CategoryBar,
  TitleCategory,
  Title,
  MainContent,
  Subtitle,
  ImagesWrapper,
  StyledImg,
} from "./styles";
import Breast_cancer_img from "../../../assets/Breast_cancer_img.jpg";

export default function BreastCancer() {
  return (
    <BreastContainer>
      <CategoryBar>
        <TitleCategory>
          <Title>BreastCancer</Title>
        </TitleCategory>
      </CategoryBar>
      <MainContent>
        <Subtitle>
          Определение рака молочной железы в полнослайдовых изображениях.
        </Subtitle>
        <ImagesWrapper>
          <StyledImg src={Breast_cancer_img} alt="Breast cancer" />
        </ImagesWrapper>
      </MainContent>
    </BreastContainer>
  );
}
