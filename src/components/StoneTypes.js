import React from 'react';
import { useAdmin } from '../context/AdminContext';
import styled from 'styled-components';

const StoneTypes = () => {
  const { stoneTypes, openCardDetails } = useAdmin();

  return (
    <StoneTypesSection>
      <Container>
        <Title>Виды камня</Title>
        <StoneGrid>
          {stoneTypes.map(stone => (
            <StoneCard 
              key={stone.id} 
              onClick={() => openCardDetails(stone)}
            >
              <StoneImage src={stone.image} alt={stone.name} />
              <StoneName>{stone.name}</StoneName>
              <StoneDescription>{stone.description}</StoneDescription>
            </StoneCard>
          ))}
        </StoneGrid>
      </Container>
    </StoneTypesSection>
  );
};

const StoneTypesSection = styled.section`
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

const StoneGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StoneCard = styled.div`
  background-color: #2D2D2D;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StoneImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const StoneName = styled.h3`
  font-family: "SfPro-ExpandedRegular", sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  color: #f1c232;
  margin: 1rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`;

const StoneDescription = styled.p`
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

export default StoneTypes;