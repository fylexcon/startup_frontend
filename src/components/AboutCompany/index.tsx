import React from 'react';
import {
  Container,
  ProductSubtitle,
  ProductSubtitleContainer
} from '../Products/styles';
import { MainSubitle, MainTitle } from '../Main/styles';
import honov from '../../assets/honov2.jpg';
import glashov from '../../assets/нр1.png';
import kluchnik from '../../assets/kluchnik.jpg';
import naumov from '../../assets/naumov.jpg';
import fylexcon from '../../assets/fylexcon.jpg'
import {
  LeaderShipContainer,
  StyledMainTitle
} from './styles';
import LeaderCard from './LeaderCard';

const images = [
  { src: honov, name: 'Хонов Владислав Русланович', job: 'CEO, Founder' },
  { src: naumov, name: 'Наумов Сергей Алексеевич', job: 'CTO' },
  { src: kluchnik, name: 'Ключник Иван Павлович', job: 'Senior Director of Marketing' },
  { src: glashov, name: 'Юрий Петрович Глашов', job: 'Head of pathology' },
  { src: fylexcon , name: 'Мехмет Селим Суна', job: 'Frontend Developer' },
];

export default function AboutCompany() {
  return (
    <Container style={{ position: 'relative', top: '190px' }}>
      <MainSubitle style={{ textAlign: 'left' }}>
        Наша компания специализируется на разработке программного обеспечения в области цифровой патологии, стремясь интегрировать передовые технологии для повышения эффективности и точности патоморфологических исследований.
      </MainSubitle>

      <StyledMainTitle>О компании</StyledMainTitle>

      <MainSubitle style={{ textAlign: 'left' }}>
        CALADRIUS — ведущий разработчик программных решений, предназначенных для преобразования традиционных методов патоморфологической диагностики в цифровой формат. Наша миссия заключается в создании инновационных инструментов, которые способствуют улучшению качества медицинских услуг.
      </MainSubitle>

      <StyledMainTitle>Наши решения</StyledMainTitle>

      <MainSubitle style={{ textAlign: 'left' }}>
        Мы предлагаем комплексные программные продукты, обеспечивающие:
      </MainSubitle>

      <ProductSubtitleContainer style={{ display: 'flex', alignItems: 'stretch', marginTop: '3%', padding: '3%', height: 'auto' }}>
        <ProductSubtitle>
          <span>Цифровую визуализацию препаратов:</span> разработанные решения позволяют преобразовывать стеклянные слайды тканей в высококачественные цифровые изображения, доступные для детального анализа и совместного использования специалистами<br />
          <span>Анализ изображений с использованием искусственного интеллекта:</span> внедрение алгоритмов машинного обучения способствует автоматическому выявлению патологических изменений, повышая точность и скорость диагностики.<br />
          <span>Хранение и управление данными:</span> созданные системы обеспечивают надежное хранение цифровых слайдов в стандартизированном формате, что облегчает доступ и обмен информацией между медицинскими учреждениями.<br />
        </ProductSubtitle>
      </ProductSubtitleContainer>

      <StyledMainTitle>Преимущества наших решений</StyledMainTitle>

      <ProductSubtitleContainer style={{ display: 'flex', alignItems: 'stretch', marginTop: '3%', padding: '3%', height: 'auto' }}>
        <ProductSubtitle>
          <span>Улучшение качества диагностики:</span> цифровая патология предоставляет возможность более детального анализа образцов, что повышает точность постановки диагнозов.<br />
          <span>Сокращение времени обработки:</span> автоматизация процессов анализа и управления данными ускоряет получение результатов, что особенно важно в клинической практике.<br />
          <span>Дистанционное консультирование:</span> цифровые слайды могут быть легко переданы для удаленного анализа, обеспечивая доступ к экспертному мнению независимо от географического положения.<br />
        </ProductSubtitle>
      </ProductSubtitleContainer>

      <StyledMainTitle>Руководители проекта:</StyledMainTitle>

      <LeaderShipContainer>
        {images.map((item, index) => (
          <LeaderCard
            key={index}
            src={item.src || 'https://via.placeholder.com/140'}
            title={item.name}
            subtitle={item.job}
          />
        ))}
      </LeaderShipContainer>

    </Container>
  );
}
