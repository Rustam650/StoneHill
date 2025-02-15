import React from "react";
import styled from "styled-components";
import WorkIcon from "../assets/icons/work.svg";
import DeliveryIcon from "../assets/icons/delivery.svg";
import MontageIcon from "../assets/icons/montage.svg";

const ServicesPage = () => {
  return (
    <ServicesSection>
      <Container>
        <Title>Наши услуги</Title>
        <ServicesList>
          <ServiceItem>
            <Icon src={WorkIcon} alt="Производство" />
            <Separator />
            <Text>
              <h3>Производство</h3>
              <p>
                Благодаря современным и сверхточным станкам с числовым
                программным управлением, мы создаём самые удивительные
                геометрические формы, от классических до ультрасовременных.
              </p>
            </Text>
          </ServiceItem>

          <ServiceItem>
            <Icon src={DeliveryIcon} alt="Поставка" />
            <Separator />
            <Text>
              <h3>Поставка</h3>
              <p>
                Наша компания осуществляет своевременную поставку материала как
                в пределах России, так и в страны СНГ.
              </p>
            </Text>
          </ServiceItem>

          <ServiceItem>
            <Icon src={MontageIcon} alt="Монтаж" />
            <Separator />
            <Text>
              <h3>Монтаж</h3>
              <p>
                В нашей компании работают первоклассные мастера по камню, которые
                владеют всеми технологиями по установке и кладке абсолютного
                любого облицовочного камня. Поэтому вы можете быть уверены в
                качестве и долговечности вашего фасада.
              </p>
            </Text>
          </ServiceItem>
        </ServicesList>
      </Container>
    </ServicesSection>
  );
};

export default ServicesPage;

// Стили
const ServicesSection = styled.section`
  background-color: #1d1d1d;
  color: white;
  padding: 3rem 1rem;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-family: "SfPro-ExpandedRegular", sans-serif;
  font-weight: 400;
  font-size: 2.5rem;
  color: #f1c232;
  text-align: center;
  margin-bottom: 2rem;
`;

const ServicesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ServiceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Icon = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const Separator = styled.div`
  height: 100%;
  width: 4px; /* Увеличиваем толщину полосы */
  background-color: #f1c232; /* Желтый цвет */
  border-radius: 2px; /* Закругленные края */
`;

const Text = styled.div`
  h3 {
    font-family: "SfPro-ExpandedRegular", sans-serif;
    font-size: 1.5rem;
    color: white;
    margin-bottom: 0.5rem;
  }

  p {
    font-family: "SfPro-ExpandedRegular", sans-serif;
    font-size: 1rem;
    color: #d0d0d0;
    line-height: 1.5;
    margin: 0;
  }
`;