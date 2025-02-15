import React from 'react';
import { useAdmin } from '../context/AdminContext';
import styled from 'styled-components';

const Modal = () => {
  const { selectedCard, closeCardDetails } = useAdmin();

  if (!selectedCard) return null;

  // Проверяем, является ли карточка контактом (есть поле text вместо description)
  const isContact = 'text' in selectedCard;

  return (
    <ModalOverlay onClick={closeCardDetails}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={closeCardDetails}>&times;</CloseButton>
        
        {!isContact ? (
          // Для обычных карточек показываем изображение
          <>
            <ModalImage src={selectedCard.image || selectedCard.icon} alt={selectedCard.title || selectedCard.name} />
            <ModalTitle>{selectedCard.title || selectedCard.name}</ModalTitle>
            <ModalDescription>{selectedCard.description}</ModalDescription>
          </>
        ) : (
          // Для контактов показываем только текст
          <>
            <ModalTitle>{selectedCard.title}</ModalTitle>
            {selectedCard.text.split('\n').map((line, index) => (
              <ModalDescription key={index}>{line}</ModalDescription>
            ))}
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #2D2D2D;
  padding: 2rem;
  border-radius: 8px;
  max-width: 90%;
  width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  @media (max-width: 768px) {
    width: 90%;
    padding: 1.5rem;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ModalTitle = styled.h2`
  color: #f1c232;
  margin-bottom: 1rem;
  font-family: "SfPro-ExpandedRegular", sans-serif;
  font-size: 1.5rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  line-height: 1.4;
  padding-right: 2rem;
`;

const ModalDescription = styled.p`
  color: #ffffff;
  line-height: 1.6;
  font-family: "SfPro-ExpandedRegular", sans-serif;
  font-size: 1rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  margin: 0.5rem 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  z-index: 1;

  &:hover {
    color: #f1c232;
  }
`;

export default Modal;