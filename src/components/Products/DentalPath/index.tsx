import React from "react";
import {
  DentalPathContainer,
  CategoryBar,
  TitleCategory,
  Title,
  MainContent,
  Subtitle,
  ImagesWrapper,
  StyledImg,
} from "./styles";
import DentalPath_img from "../../../assets/dental_path_img.jpg";

export default function DentalPath() {
  return (
    <DentalPathContainer>
      <CategoryBar>
        <TitleCategory>
          <Title>DentalPath</Title>
        </TitleCategory>
      </CategoryBar>
      <MainContent>
        <Subtitle>
          Цифровая система распознавания новообразований ротовой полости — это инновационное программное обеспечение, разработанное для пациентов и врачей-стоматологов. Она предназначена для раннего выявления и диагностики различных патологий, таких как опухоли, предраковые состояния и другие изменения слизистой оболочки полости рта. С помощью современных алгоритмов искусственного интеллекта программа анализирует изображения, полученные в ходе осмотра, и предоставляет врачу подробный отчет с возможными диагнозами. Это позволяет своевременно начать лечение и повышает точность диагностики. Для пациентов программа предлагает удобный интерфейс, который помогает отслеживать состояние здоровья и получать рекомендации по уходу за полостью рта. Программное обеспечение легко интегрируется в работу стоматологических клиник, делая процесс диагностики более эффективным и доступным.
        </Subtitle>
        <ImagesWrapper>
          <StyledImg src={DentalPath_img} alt="Dental Path screenshot" />
        </ImagesWrapper>
      </MainContent>
    </DentalPathContainer>
  );
}
