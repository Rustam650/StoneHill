import React from 'react';
import { useAdmin } from '../context/AdminContext';
import styled from 'styled-components';

const Portfolio = () => {
  const { portfolioItems, openCardDetails } = useAdmin();

  return (
    <PortfolioSection>
      <Container>
        <Title>Портфолио</Title>
        <PortfolioGrid>
          {portfolioItems.map(item => (
            <PortfolioCard 
              key={item.id}
              onClick={() => openCardDetails(item)}
            >
              <PortfolioImage src={item.image} alt={item.title} />
              <PortfolioTitle>{item.title}</PortfolioTitle>
              <PortfolioDescription>{item.description}</PortfolioDescription>
            </PortfolioCard>
          ))}
        </PortfolioGrid>
      </Container>
    </PortfolioSection>
  );
};

const PortfolioSection = styled.section`
  background-color: #1D1D1D;
  color: #ffffff;
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
  font-size: 2rem;
  color: #f1c232;
  text-align: left;
  margin-bottom: 2rem;
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PortfolioCard = styled.div`
  background-color: #2D2D2D;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PortfolioImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PortfolioTitle = styled.h3`
  font-family: "SfPro-ExpandedRegular", sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  color: #f1c232;
  margin: 1rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`;

const PortfolioDescription = styled.p`
  font-family: "SfPro-ExpandedRegular", sans-serif;
  font-weight: 400;
  font-size: 0.9rem;
  color: #d0d0d0;
  margin: 0 1rem 1rem;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`;

export default Portfolio;