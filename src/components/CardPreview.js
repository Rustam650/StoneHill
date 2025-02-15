import React, { useContext } from 'react';
import styled from 'styled-components';
import { AdminContext } from '../context/AdminContext';

const CardPreview = ({ type }) => {
  const { stoneCards, portfolioCards, deleteStoneCard, deletePortfolioCard } = useContext(AdminContext);
  const cards = type === 'stone' ? stoneCards : portfolioCards;
  const dimensions = type === 'stone' ? '250x300' : '300x300';

  return (
    <Grid>
      {cards.map(card => (
        <Card key={card.id}>
          <Image 
            src={card.image} 
            alt={card.title}
            dimensions={dimensions}
          />
          <Content>
            <Title>{card.title}</Title>
            {type === 'portfolio' && card.description && (
              <Description>{card.description}</Description>
            )}
            <DeleteButton
              onClick={() => type === 'stone' 
                ? deleteStoneCard(card.id) 
                : deletePortfolioCard(card.id)}
            >
              Удалить
            </DeleteButton>
          </Content>
        </Card>
      ))}
    </Grid>
  );
};

// Стили
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #3a3a3a;
`;

const Image = styled.img`
  width: 100%;
  height: ${({ dimensions }) => dimensions === '250x300' ? '300px' : '300px'};
  object-fit: cover;
  border-bottom: 2px solid #3a3a3a;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  color: #FFC145;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const DeleteButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: #ff4444;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

export default CardPreview;