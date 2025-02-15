import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AdminContext } from '../context/AdminContext';
import { Button } from './styles/AdminStyles';

const TrashBin = () => {
  const { 
    stoneTrash, 
    portfolioTrash,
    restoreStoneCard,
    restorePortfolioCard,
    deleteFromTrash
  } = useContext(AdminContext);
  
  const [activeTab, setActiveTab] = useState('stones');

  return (
    <Container>
      <Tabs>
        <TabButton 
          active={activeTab === 'stones'}
          onClick={() => setActiveTab('stones')}
        >
          Виды камней ({stoneTrash.length})
        </TabButton>
        <TabButton 
          active={activeTab === 'portfolio'}
          onClick={() => setActiveTab('portfolio')}
        >
          Портфолио ({portfolioTrash.length})
        </TabButton>
      </Tabs>

      <Content>
        {activeTab === 'stones' ? (
          stoneTrash.map(card => (
            <TrashItem key={card.id}>
              <Image src={card.image} alt={card.title} />
              <Info>
                <Title>{card.title}</Title>
                <Actions>
                  <Button onClick={() => restoreStoneCard(card.id)}>
                    Восстановить
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => deleteFromTrash('stone', card.id)}
                  >
                    Удалить
                  </Button>
                </Actions>
              </Info>
            </TrashItem>
          ))
        ) : (
          portfolioTrash.map(card => (
            <TrashItem key={card.id}>
              <Image src={card.image} alt={card.title} />
              <Info>
                <Title>{card.title}</Title>
                <Description>{card.description}</Description>
                <Actions>
                  <Button onClick={() => restorePortfolioCard(card.id)}>
                    Восстановить
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => deleteFromTrash('portfolio', card.id)}
                  >
                    Удалить
                  </Button>
                </Actions>
              </Info>
            </TrashItem>
          ))
        )}
      </Content>
    </Container>
  );
};

// Стили компонента
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #3a3a3a;
`;

const TabButton = styled.button`
  padding: 1rem 2rem;
  background: ${({ active }) => active ? '#FFC145' : 'transparent'};
  color: ${({ active }) => active ? '#222' : '#ccc'};
  border: none;
  cursor: pointer;
  font-weight: 500;
  border-radius: 6px 6px 0 0;
  transition: all 0.3s;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TrashItem = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: #2a2a2a;
  border-radius: 8px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;

  @media (max-width: 480px) {
    width: 100%;
    height: 200px;
  }
`;

const Info = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  color: #fff;
  margin: 0 0 1rem;
`;

const Description = styled.p`
  color: #ccc;
  margin: 0 0 1.5rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    
    button {
      width: 100%;
    }
  }
`;

export default TrashBin;