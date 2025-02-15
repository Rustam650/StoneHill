import React from 'react';
import styled from 'styled-components';
import { useAdmin } from '../context/AdminContext';

const Contacts = () => {
  const { contacts, openCardDetails } = useAdmin();

  return (
    <ContactsSection>
      <Container>
        <Title>Контакты</Title>
        <ContactsGrid>
          {contacts.map(contact => (
            <ContactCard 
              key={contact.id}
              onClick={() => openCardDetails(contact)}
            >
              <ContactTitle>{contact.title}</ContactTitle>
              <ContactTextContainer>
                {contact.text.split('\n').map((line, index) => (
                  <ContactText key={index}>{line}</ContactText>
                ))}
              </ContactTextContainer>
            </ContactCard>
          ))}
        </ContactsGrid>
      </Container>
    </ContactsSection>
  );
};

const ContactsSection = styled.section`
  background-color: #1D1D1D;
  color: #ffffff;
  padding: 3rem 1rem;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Title = styled.h2`
  font-family: "SfPro-ExpandedRegular", sans-serif;
  font-weight: 400;
  font-size: 2rem;
  color: #f1c232;
  margin-bottom: 2rem;
`;

const ContactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 300px);
  gap: 2rem;
  justify-content: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 300px);
  }

  @media (max-width: 768px) {
    grid-template-columns: 300px;
  }
`;

const ContactCard = styled.div`
  background-color: #2D2D2D;
  padding: 2rem;
  border-radius: 8px;
  transition: transform 0.3s ease;
  width: 300px;
  height: 200px;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(transparent, #2D2D2D);
    pointer-events: none;
    opacity: ${props => props.hasOverflow ? 1 : 0};
  }
`;

const ContactTextContainer = styled.div`
  overflow: hidden;
  height: calc(100% - 2.2rem); // Вычитаем высоту заголовка
`;

const ContactTitle = styled.h3`
  font-family: "SfPro-ExpandedRegular", sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  color: #f1c232;
  margin-bottom: 1rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`;

const ContactText = styled.p`
  font-family: "SfPro-ExpandedRegular", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #d0d0d0;
  margin: 0.5rem 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  line-height: 1.4;
`;

export default Contacts; 