import React from 'react';
import styled from 'styled-components';
import BackgroundImage from '../assets/back.png';

const Hero = () => {
  return (
    <HeroSection>
      <Overlay />
      <Content>
        <TextContainer>
          <Title>
            Фасадный декор из<br />
            природного камня
          </Title>
          <Subtitle>
            Наша опытная команда профессионалов готова воплотить в жизнь<br />ваши
            самые смелые фантазии
          </Subtitle>
        </TextContainer>
        <Button>Оставить заявку</Button>
      </Content>
    </HeroSection>
  );
};

const HeroSection = styled.section`
  position: relative;
  background: url(${BackgroundImage}) no-repeat center center/cover;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: -60px;
  padding-top: 60px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(32, 32, 32, 0.6);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  color: white;
  max-width: 1024px;
  z-index: 2;
  padding: 0 20px;
  text-align: left;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const TextContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-family: "SfPro-ExpandedRegular", sans-serif;
  font-size: 64px;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 34px;
  }
`;

const Subtitle = styled.p`
  font-family: "SfPro-ExpandedLight", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0;
`;

const Button = styled.button`
  font-family: "SfPro-ExpandedRegular", sans-serif;
  font-weight: 400;
  padding: 0.8rem 2rem;
  background-color: #f1c232;
  color: #333;
  font-size: 1rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #dda20a;
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export default Hero;