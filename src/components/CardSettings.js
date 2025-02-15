import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AdminContext } from '../context/AdminContext';

const CardSettings = ({ type }) => {
  const { addStoneCard, addPortfolioCard } = useContext(AdminContext);
  const [form, setForm] = useState({
    title: '',
    description: '',
    modalDescription: '',
    image: ''
  });

  const handleSubmit = () => {
    const card = {
      id: Date.now(),
      ...form
    };

    if (type === 'stone') {
      addStoneCard(card);
    } else {
      addPortfolioCard(card);
    }

    setForm({
      title: '',
      description: '',
      modalDescription: '',
      image: ''
    });
  };

  return (
    <Form>
      <Input
        placeholder="Название"
        value={form.title}
        onChange={(e) => setForm({...form, title: e.target.value})}
      />

      {type === 'stone' && (
        <TextArea
          placeholder="Подробное описание для модального окна"
          value={form.modalDescription}
          onChange={(e) => setForm({...form, modalDescription: e.target.value})}
          rows="5"
        />
      )}

      {type === 'portfolio' && (
        <TextArea
          placeholder="Описание проекта"
          value={form.description}
          onChange={(e) => setForm({...form, description: e.target.value})}
          rows="3"
        />
      )}

      <FileUpload>
        <input 
          type="file" 
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => setForm({...form, image: e.target.result});
              reader.readAsDataURL(file);
            }
          }}
        />
        <Input
          placeholder="Или укажите URL изображения"
          value={form.image}
          onChange={(e) => setForm({...form, image: e.target.value})}
        />
      </FileUpload>

      <SubmitButton onClick={handleSubmit}>
        {type === 'stone' ? 'Добавить камень' : 'Добавить проект'}
      </SubmitButton>
    </Form>
  );
};

// Стили компонента
const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background: #2a2a2a;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #3a3a3a;
  border-radius: 6px;
  background: #1d1d1d;
  color: #fff;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #3a3a3a;
  border-radius: 6px;
  background: #1d1d1d;
  color: #fff;
  font-size: 1rem;
  resize: vertical;
`;

const FileUpload = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input[type="file"] {
    &::file-selector-button {
      padding: 12px;
      background: #FFC145;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      color: #222;
      font-weight: 500;
    }
  }
`;

const SubmitButton = styled.button`
  padding: 12px;
  background: #FFC145;
  color: #222;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

export default CardSettings;