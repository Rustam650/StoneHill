import styled from 'styled-components';

export const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #222;
  color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.div`
  width: 280px;
  padding: 2rem 1rem;
  background: #2a2a2a;
  border-right: 1px solid #3a3a3a;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #3a3a3a;
  }
`;

export const TabButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: ${({ active }) => active ? '#FFC145' : 'transparent'};
  color: ${({ active }) => active ? '#222' : '#ccc'};
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${({ active }) => active ? '#FFC145' : '#3a3a3a'};
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const SectionTitle = styled.h2`
  color: #FFC145;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #3a3a3a;
`;

export const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${({ variant }) => variant === 'danger' ? '#ff4444' : '#FFC145'};
  color: ${({ variant }) => variant === 'danger' ? '#fff' : '#222'};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;