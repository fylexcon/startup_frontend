import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  MainPageContainer,
  HeroSection,
  HeroContent,
  ScrollButton,
  ContentSection,
  MainTitle,
  MainSubitle,
  SectionDivider,
  ProductName,
  Line,
  TestCardsGrid,
  TestCard,
  TestTitle,
  FeatureSection,
  FeatureGrid,
  FeatureImage,
  CompContainer,
  SubCompContainer,
  SubCompTitle,
  SubCompSubtitle,
  StatisticWrapper,
  StatTitle,
  StatisticsContainer,
  StatCard,
  Amount,
  StatSubitle,
  MainFooterContainer,
} from "./styles";

import page4 from "../../assets/mainPage4.jpg";
import page5 from "../../assets/mainPage5.jpg";
import page6 from "../../assets/covid19.jpg";
import Comp from "../../assets/Comp.png";

// Partner bileşenini çağırıyoruz
import Partners from "./Partners";

export default function Main() {
  const navigate = useNavigate();
  const detailsRef = useRef<HTMLDivElement>(null);

  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const testData = [
    { image: page4, title: "Рак молочной железы" },
    { image: page5, title: "Рак предстательной железы" },
    { image: page6, title: "Covid-19" },
  ];

  const features = [
    {
      title: "Облачный доступ",
      subtitle:
        "Онлайн решение для анализа медицинских изображений в любое время.",
    },
    {
      title: "Второе мнение",
      subtitle: "Платформа обеспечивает быстрые консультации с экспертами.",
    },
    {
      title: "Аннотирование",
      subtitle: "Умные AI-инструменты позволяют точную разметку образцов.",
    },
  ];

  const statistics = [
    { amount: "10+", subtitle: "разработанных инструментов AI" },
    { amount: "105+", subtitle: "аннотированных наборов данных" },
    { amount: "5+", subtitle: "клиник-партнеров" },
  ];

  return (
    <MainPageContainer>
      {/* 1. HERO */}
      <HeroSection>
        <HeroContent>
          <h1>
            CALADRIUS <br /> Технологии Будущего
          </h1>
          <p>
            Комплексная платформа для анализа цифровой патологии на основе ИИ.
            Диагностика, Исследования и Обучение в одном месте.
          </p>
          <ScrollButton onClick={scrollToDetails}>Узнать больше ↓</ScrollButton>
        </HeroContent>
      </HeroSection>

      {/* 2. DETAYLAR */}
      <div ref={detailsRef}>
        <ContentSection>
          <MainTitle>Интеллектуальный анализ медицинских данных</MainTitle>
          <MainSubitle>
            CALADRIUS предоставляет полный цифровой рабочий процесс для
            патологоанатомов, студентов и исследователей.
          </MainSubitle>
          <SectionDivider>
            <Line />
            <ProductName>Доступные модули</ProductName>
            <Line />
          </SectionDivider>
        </ContentSection>
      </div>

      {/* 3. KARTLAR */}
      <TestCardsGrid>
        {testData.map((item, i) => (
          <TestCard key={i} onClick={() => navigate("/projects")}>
            <TestTitle>{item.title}</TestTitle>
            <img src={item.image} alt={item.title} />
          </TestCard>
        ))}
      </TestCardsGrid>

      {/* 4. ÖZELLİKLER */}
      <FeatureSection>
        <FeatureGrid>
          <FeatureImage>
            <img src={Comp} alt="Platform interface" />
          </FeatureImage>
          <CompContainer>
            {features.map((f, i) => (
              <SubCompContainer key={i}>
                <SubCompTitle>{f.title}</SubCompTitle>
                <SubCompSubtitle>{f.subtitle}</SubCompSubtitle>
              </SubCompContainer>
            ))}
          </CompContainer>
        </FeatureGrid>
      </FeatureSection>

      {/* 5. İSTATİSTİKLER */}
      <StatisticWrapper>
        <StatTitle>Наши достижения</StatTitle>
        <StatisticsContainer>
          {statistics.map((s, i) => (
            <StatCard key={i}>
              <Amount>{s.amount}</Amount>
              <StatSubitle>{s.subtitle}</StatSubitle>
            </StatCard>
          ))}
        </StatisticsContainer>
      </StatisticWrapper>

      {/* 6. PARTNERLER (EN ALTA ALINDI) */}
      <MainFooterContainer>
        <Partners />
      </MainFooterContainer>
    </MainPageContainer>
  );
}
