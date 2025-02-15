import React from 'react';
import { useAdmin } from '../context/AdminContext';
import styled from 'styled-components';
import WorkIcon from '../assets/icons/work.svg';
import DeliveryIcon from '../assets/icons/delivery.svg';
import MontageIcon from '../assets/icons/montage.svg';

const Services = () => {
  const { services } = useAdmin();

  // Дефолтные сервисы
  const defaultServices = [
    {
      id: 'default-1',
      title: 'Производство',
      icon: WorkIcon
    },
    {
      id: 'default-2',
      title: 'Поставка',
      icon: DeliveryIcon
    },
    {
      id: 'default-3',
      title: 'Монтаж',
      icon: MontageIcon
    }
  ];

  // Используем первые 3 добавленных сервиса или дефолтные
  const displayServices = services.length > 0 
    ? services.slice(0, 3) 
    : defaultServices;

  return (
    <ServicesSection>
      <Container>
        <Title>Услуги</Title>
        <ServicesContainer>
          {displayServices.map((service, index) => (
            <React.Fragment key={service.id}>
              <Service>
                <Icon 
                  src={service.icon || service.image} 
                  alt={service.title} 
                />
                <ServiceTitle>{service.title}</ServiceTitle>
                {service.description && (
                  <ServiceDescription>{service.description}</ServiceDescription>
                )}
              </Service>
              {index < displayServices.length - 1 && <Arrow />}
            </React.Fragment>
          ))}
        </ServicesContainer>
      </Container>
    </ServicesSection>
  );
};

const ServicesSection = styled.section`
  background-color: #1D1D1D;
  color: #ffffff;
  padding: 3rem 1rem;
  width: 100%;
`;

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 5rem;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const Title = styled.h2`
  font-family: "SfPro-ExpandedRegular", sans-serif;
  font-weight: 400;
  font-size: 2rem;
  color: #f1c232;
  margin-bottom: 4rem;
  text-align: left;
  padding-left: 0;
  margin-left: 0;

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const ServicesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 0;
  }
`;

const Service = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  flex: 1;
  max-width: 300px;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0.5rem;
  }
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 0.5rem;
`;

const ServiceTitle = styled.h3`
  font-family: "SfPro-ExpandedRegular", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  margin: 0;
  color: #d0d0d0;
`;

const ServiceDescription = styled.p`
  font-family: "SfPro-ExpandedRegular", sans-serif;
  font-weight: 400;
  font-size: 0.8rem;
  margin: 0.5rem 0 0;
  color: #d0d0d0;
`;

const Arrow = styled.div`
  position: relative;
  width: 111px;
  height: 2px;
  background-color: #f1c232;
  margin: 0 1rem;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    border-right: 2px solid #f1c232;
    border-top: 2px solid #f1c232;
  }

  @media (max-width: 768px) {
    width: 2px;
    height: 50px;
    margin: 1rem 0;

    &::after {
      top: 80%;
      left: 50%;
      transform: translateX(-50%) rotate(-45deg);
      border-left: 2px solid #f1c232;
      border-bottom: 2px solid #f1c232;
      border-right: none;
      border-top: none;
    }
  }
`;

export default Services;