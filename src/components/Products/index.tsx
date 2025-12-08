import React from "react";
import {
  ProductsContainer,
  HeroSection,
  HeroContent,
  MainTitle,
  MainSubtitle,
  ProductsGrid,
  ProductCard,
  ProductHeader,
  ProductName,
  ProductAccent,
  ProductDescription,
  ProductText,
  ProductActions,
  MoreButton,
  FloatingElements,
} from "./styles";

const productsData = [
  {
    id: "dentalpath",
    name: "DentalPath",
    description: "Программа распознавание новообразований ротовой полости. Программное обеспечение для пациентов и врачей-стоматологов.",
    link: "/dentalPath",
    delay: "0s"
  },
  {
    id: "dermaslide", 
    name: "DermaSlide",
    description: "Программа анализа дерматоскопических изображений кожи. Возможность получения второго мнения при диагностическом осмотре для врачей дерматологов.",
    link: "/dermaSlide",
    delay: "0.1s"
  },
  {
    id: "breastcancer",
    name: "BreastCancer", 
    description: "Определение рака молочной железы в полнослайдовых изображениях.",
    link: "/breastCr",
    delay: "0.2s"
  },
  {
    id: "covid19",
    name: "Covid-19",
    description: "Оценка иммунного ответа в цифровых гистологических изображениях легких.",
    link: "/covid-19", 
    delay: "0.3s"
  }
];

export default function Products() {
  return (
    <ProductsContainer>
      <FloatingElements />
      
      <HeroSection>
        <HeroContent>
          <MainTitle>Продукты</MainTitle>
          <MainSubtitle>
            Сервисы и программы в области цифровой патологии
          </MainSubtitle>
        </HeroContent>
      </HeroSection>

      <ProductsGrid>
        {productsData.map((product, index) => (
          <ProductCard 
            key={product.id}
            style={{ 
              animationDelay: product.delay,
            }}
          >
            <ProductHeader>
              <ProductName className="product-name">{product.name}</ProductName>
              <ProductAccent />
            </ProductHeader>
            
            <ProductDescription>
              <ProductText>{product.description}</ProductText>
            </ProductDescription>

            <ProductActions>
              <MoreButton to={product.link} className="more-button">
                Подробнее
              </MoreButton>
            </ProductActions>
          </ProductCard>
        ))}
      </ProductsGrid>
    </ProductsContainer>
  );
}
