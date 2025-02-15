import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import styled from 'styled-components';

const Button = styled.button`
  padding: 0.75rem;
  background-color: #f1c232;
  border: none;
  border-radius: 4px;
  color: #1D1D1D;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background-color: #e3b42d;
    }
  }
`;

// Базовые стили текста
const ServiceTitle = styled.h4`
  color: #f1c232;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  margin-bottom: 0.5rem;
`;

const ServiceDescription = styled.p`
  color: #ffffff;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const StoneTitle = styled(ServiceTitle)`
  // Наследует стили от ServiceTitle
`;

const StoneDescription = styled(ServiceDescription)`
  // Наследует стили от ServiceDescription
`;

const AdminPanel = () => {
  const { 
    addService, 
    addStoneType, 
    addPortfolioItem,
    updateService,
    updateStoneType,
    updatePortfolioItem,
    services,
    stoneTypes,
    portfolioItems,
    deleteService,
    deleteStoneType,
    deletePortfolioItem,
    openCardDetails,
    addContact,
    updateContact,
    deleteContact,
    contacts
  } = useAdmin();

  const [selectedTab, setSelectedTab] = useState('services');
  const [editingItem, setEditingItem] = useState(null);

  const [newService, setNewService] = useState({
    title: '',
    description: '',
    image: ''
  });

  const [newStoneType, setNewStoneType] = useState({
    name: '',
    description: '',
    image: ''
  });

  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: '',
    description: '',
    image: ''
  });

  const [newContact, setNewContact] = useState({
    title: '',
    text: ''
  });

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateService({
        ...editingItem,
        ...newService
      });
      setEditingItem(null);
    } else {
      addService({
        ...newService,
        id: Date.now()
      });
    }
    setNewService({ title: '', description: '', image: '' });
  };

  const handleStoneTypeSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateStoneType({
        ...editingItem,
        ...newStoneType,
        name: newStoneType.name
      });
      setEditingItem(null);
    } else {
      addStoneType({
        ...newStoneType,
        id: Date.now()
      });
    }
    setNewStoneType({ name: '', description: '', image: '' });
  };

  const handlePortfolioSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updatePortfolioItem({
        ...editingItem,
        ...newPortfolioItem
      });
      setEditingItem(null);
    } else {
      addPortfolioItem({
        ...newPortfolioItem,
        id: Date.now()
      });
    }
    setNewPortfolioItem({ title: '', description: '', image: '' });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateContact({
        ...editingItem,
        ...newContact
      });
      setEditingItem(null);
    } else {
      addContact({
        ...newContact,
        id: Date.now()
      });
    }
    setNewContact({ title: '', text: '' });
  };

  const handleEdit = (item, type) => {
    setEditingItem(item);
    switch(type) {
      case 'service':
        setNewService(item);
        setSelectedTab('services');
        break;
      case 'stone':
        setNewStoneType({
          name: item.name,
          description: item.description,
          image: item.image
        });
        setSelectedTab('stones');
        break;
      case 'portfolio':
        setNewPortfolioItem(item);
        setSelectedTab('portfolio');
        break;
      case 'contact':
        setNewContact({
          title: item.title,
          text: item.text
        });
        setSelectedTab('contacts');
        break;
      default:
        break;
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setNewService({ title: '', description: '', image: '' });
    setNewStoneType({ name: '', description: '', image: '' });
    setNewPortfolioItem({ title: '', description: '', image: '' });
    setNewContact({ title: '', text: '' });
  };

  const handleItemClick = (item) => {
    openCardDetails(item);
  };

  return (
    <AdminContainer>
      <Sidebar>
        <TabButton 
          onClick={() => setSelectedTab('services')} 
          active={selectedTab === 'services'}
        >
          Услуги
        </TabButton>
        <TabButton 
          onClick={() => setSelectedTab('stones')} 
          active={selectedTab === 'stones'}
        >
          Виды камня
        </TabButton>
        <TabButton 
          onClick={() => setSelectedTab('portfolio')} 
          active={selectedTab === 'portfolio'}
        >
          Портфолио
        </TabButton>
        <TabButton 
          onClick={() => setSelectedTab('contacts')} 
          active={selectedTab === 'contacts'}
        >
          Контакты
        </TabButton>
      </Sidebar>

      <Content>
        {selectedTab === 'services' && (
          <Section>
            <h2>{editingItem ? 'Редактировать услугу' : 'Добавить услугу'}</h2>
            {services.length >= 3 && !editingItem && (
              <Warning>
                Достигнут лимит услуг (максимум 3)
              </Warning>
            )}
            
            <Form onSubmit={handleServiceSubmit}>
              <FormSection>
                <FormColumn>
                  <Input
                    type="text"
                    placeholder="Название услуги"
                    value={newService.title}
                    onChange={(e) => setNewService({...newService, title: e.target.value})}
                    required
                    disabled={services.length >= 3 && !editingItem}
                  />
                  <TextArea
                    placeholder="Описание услуги (необязательно)"
                    value={newService.description}
                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                  />
                  <Input
                    type="text"
                    placeholder="URL иконки (50x50px, SVG рекомендуется)"
                    value={newService.image}
                    onChange={(e) => setNewService({...newService, image: e.target.value})}
                    required
                    disabled={services.length >= 3 && !editingItem}
                  />
                  <ButtonGroup>
                    <Button type="submit" disabled={services.length >= 3 && !editingItem}>
                      {editingItem ? 'Сохранить изменения' : 'Добавить услугу'}
                    </Button>
                    {editingItem && (
                      <CancelButton type="button" onClick={handleCancel}>
                        Отменить
                      </CancelButton>
                    )}
                  </ButtonGroup>
                </FormColumn>
                
                <PreviewColumn>
                  <PreviewTitle>Предпросмотр</PreviewTitle>
                  <ServicePreview>
                    <ServiceIcon src={newService.image || 'placeholder.svg'} />
                    <ServiceTitle>{newService.title || 'Название услуги'}</ServiceTitle>
                    {newService.description && (
                      <ServiceDescription>{newService.description}</ServiceDescription>
                    )}
                  </ServicePreview>
                </PreviewColumn>
              </FormSection>
            </Form>

            <ItemsList>
              {services.map(service => (
                <ServiceItem key={service.id} onClick={() => handleItemClick(service)}>
                  <ServiceContent>
                    <ServiceIcon src={service.image} alt={service.title} />
                    <div>
                      <ServiceTitle>{service.title}</ServiceTitle>
                      {service.description && (
                        <ServiceDescription>{service.description}</ServiceDescription>
                      )}
                    </div>
                  </ServiceContent>
                  <ButtonGroup>
                    <EditButton onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(service, 'service');
                    }}>
                      Редактировать
                    </EditButton>
                    <DeleteButton onClick={(e) => {
                      e.stopPropagation();
                      deleteService(service.id);
                    }}>
                      Удалить
                    </DeleteButton>
                  </ButtonGroup>
                </ServiceItem>
              ))}
            </ItemsList>
          </Section>
        )}

        {selectedTab === 'stones' && (
          <Section>
            <h2>{editingItem ? 'Редактировать тип камня' : 'Добавить тип камня'}</h2>
            <Form onSubmit={handleStoneTypeSubmit}>
              <FormSection>
                <FormColumn>
                  <Input
                    type="text"
                    placeholder="Название камня"
                    value={newStoneType.name}
                    onChange={(e) => setNewStoneType({...newStoneType, name: e.target.value})}
                    required
                  />
                  <TextArea
                    placeholder="Описание камня"
                    value={newStoneType.description}
                    onChange={(e) => setNewStoneType({...newStoneType, description: e.target.value})}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="URL изображения"
                    value={newStoneType.image}
                    onChange={(e) => setNewStoneType({...newStoneType, image: e.target.value})}
                    required
                  />
                  <ButtonGroup>
                    <Button type="submit">
                      {editingItem ? 'Сохранить изменения' : 'Добавить тип камня'}
                    </Button>
                    {editingItem && (
                      <CancelButton type="button" onClick={handleCancel}>
                        Отменить
                      </CancelButton>
                    )}
                  </ButtonGroup>
                </FormColumn>
                <PreviewColumn>
                  <PreviewTitle>Предпросмотр</PreviewTitle>
                  <StonePreview>
                    <StoneImage src={newStoneType.image || 'placeholder.svg'} />
                    <StoneTitle>{newStoneType.name || 'Название камня'}</StoneTitle>
                    {newStoneType.description && (
                      <StoneDescription>{newStoneType.description}</StoneDescription>
                    )}
                  </StonePreview>
                </PreviewColumn>
              </FormSection>
            </Form>
            <ItemsList>
              {stoneTypes.map(stone => (
                <StoneItem key={stone.id} onClick={() => handleItemClick(stone)}>
                  <StoneContent>
                    <img src={stone.image} alt={stone.name} />
                    <div>
                      <StoneTitle>{stone.name}</StoneTitle>
                      <StoneDescription>{stone.description}</StoneDescription>
                    </div>
                  </StoneContent>
                  <ButtonGroup>
                    <EditButton onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(stone, 'stone');
                    }}>
                      Редактировать
                    </EditButton>
                    <DeleteButton onClick={(e) => {
                      e.stopPropagation();
                      deleteStoneType(stone.id);
                    }}>
                      Удалить
                    </DeleteButton>
                  </ButtonGroup>
                </StoneItem>
              ))}
            </ItemsList>
          </Section>
        )}

        {selectedTab === 'portfolio' && (
          <Section>
            <h2>{editingItem ? 'Редактировать проект' : 'Добавить в портфолио'}</h2>
            <Form onSubmit={handlePortfolioSubmit}>
              <FormSection>
                <FormColumn>
                  <Input
                    type="text"
                    placeholder="Название проекта"
                    value={newPortfolioItem.title}
                    onChange={(e) => setNewPortfolioItem({...newPortfolioItem, title: e.target.value})}
                    required
                  />
                  <TextArea
                    placeholder="Описание проекта"
                    value={newPortfolioItem.description}
                    onChange={(e) => setNewPortfolioItem({...newPortfolioItem, description: e.target.value})}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="URL изображения"
                    value={newPortfolioItem.image}
                    onChange={(e) => setNewPortfolioItem({...newPortfolioItem, image: e.target.value})}
                    required
                  />
                  <ButtonGroup>
                    <Button type="submit">
                      {editingItem ? 'Сохранить изменения' : 'Добавить в портфолио'}
                    </Button>
                    {editingItem && (
                      <CancelButton type="button" onClick={handleCancel}>
                        Отменить
                      </CancelButton>
                    )}
                  </ButtonGroup>
                </FormColumn>
                <PreviewColumn>
                  <PreviewTitle>Предпросмотр</PreviewTitle>
                  <PortfolioPreview>
                    <PortfolioImage src={newPortfolioItem.image || 'placeholder.svg'} />
                  </PortfolioPreview>
                </PreviewColumn>
              </FormSection>
            </Form>
            <ItemsList>
              {portfolioItems.map(item => (
                <PortfolioItem key={item.id} onClick={() => handleItemClick(item)}>
                  <PortfolioContent>
                    <img src={item.image} alt={item.title} />
                    <div>
                      <ServiceTitle>{item.title}</ServiceTitle>
                      <ServiceDescription>{item.description}</ServiceDescription>
                    </div>
                  </PortfolioContent>
                  <ButtonGroup>
                    <EditButton onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(item, 'portfolio');
                    }}>
                      Редактировать
                    </EditButton>
                    <DeleteButton onClick={(e) => {
                      e.stopPropagation();
                      deletePortfolioItem(item.id);
                    }}>
                      Удалить
                    </DeleteButton>
                  </ButtonGroup>
                </PortfolioItem>
              ))}
            </ItemsList>
          </Section>
        )}

        {selectedTab === 'contacts' && (
          <Section>
            <h2>{editingItem ? 'Редактировать контакт' : 'Добавить контакт'}</h2>
            <Form onSubmit={handleContactSubmit}>
              <FormSection>
                <FormColumn>
                  <Input
                    type="text"
                    placeholder="Заголовок"
                    value={newContact.title}
                    onChange={(e) => setNewContact({...newContact, title: e.target.value})}
                    required
                  />
                  <TextArea
                    placeholder="Текст (используйте перенос строки для разделения)"
                    value={newContact.text}
                    onChange={(e) => setNewContact({...newContact, text: e.target.value})}
                    required
                  />
                  <ButtonGroup>
                    <Button type="submit">
                      {editingItem ? 'Сохранить изменения' : 'Добавить контакт'}
                    </Button>
                    {editingItem && (
                      <CancelButton type="button" onClick={handleCancel}>
                        Отменить
                      </CancelButton>
                    )}
                  </ButtonGroup>
                </FormColumn>
                <PreviewColumn>
                  <PreviewTitle>Предпросмотр</PreviewTitle>
                  <ContactPreview>
                    <ContactTitle>{newContact.title || 'Заголовок'}</ContactTitle>
                    {(newContact.text || 'Текст контакта').split('\n').map((line, index) => (
                      <ContactText key={index}>{line}</ContactText>
                    ))}
                  </ContactPreview>
                </PreviewColumn>
              </FormSection>
            </Form>
            <ItemsList>
              {contacts.map(contact => (
                <ContactItem key={contact.id}>
                  <ContactContent>
                    <div>
                      <ContactTitle>{contact.title}</ContactTitle>
                      {contact.text.split('\n').map((line, index) => (
                        <ContactText key={index}>{line}</ContactText>
                      ))}
                    </div>
                  </ContactContent>
                  <ButtonGroup>
                    <EditButton onClick={() => handleEdit(contact, 'contact')}>
                      Редактировать
                    </EditButton>
                    <DeleteButton onClick={() => deleteContact(contact.id)}>
                      Удалить
                    </DeleteButton>
                  </ButtonGroup>
                </ContactItem>
              ))}
            </ItemsList>
          </Section>
        )}
      </Content>
    </AdminContainer>
  );
};

const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #1D1D1D;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #2D2D2D;
  padding: 2rem 0;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
`;

const TabButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: none;
  border: none;
  color: ${props => props.active ? '#f1c232' : '#ffffff'};
  font-size: 1rem;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #3D3D3D;
  }
`;

const Section = styled.section`
  background-color: #2D2D2D;
  padding: 2rem;
  border-radius: 8px;
  color: #ffffff;

  h2 {
    color: #f1c232;
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FormSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PreviewColumn = styled.div`
  background: #1D1D1D;
  padding: 1rem;
  border-radius: 8px;
  height: fit-content;
`;

const PreviewTitle = styled.h3`
  color: #f1c232;
  margin-bottom: 1rem;
`;

const ServiceIcon = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

const ServicePreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #2D2D2D;
  border-radius: 8px;
  overflow: hidden;
  padding: 1rem;
  text-align: center;

  ${ServiceIcon} {
    margin-bottom: 0.5rem;
  }

  ${ServiceTitle}, ${ServiceDescription} {
    text-align: center;
    margin: 0.5rem 0;
  }
`;

const ServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  background: #2D2D2D;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: pointer;
  width: 100%;
  max-width: 800px;

  &:hover {
    background: #3D3D3D;
  }
`;

const ServiceContent = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
  min-width: 0;

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    flex-shrink: 0;
  }

  div {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    padding: 0.5rem 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EditButton = styled(Button)`
  background-color: #f1c232;
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;
  
  &:hover {
    background-color: #5a6268;
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  background-color: #1D1D1D;
  border: 1px solid #3D3D3D;
  border-radius: 4px;
  color: #ffffff;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  background-color: #1D1D1D;
  border: 1px solid #3D3D3D;
  border-radius: 4px;
  color: #ffffff;
  min-height: 100px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: #ffffff;

  &:hover {
    background-color: #c82333;
  }
`;

const ItemsList = styled.div`
  margin-top: 2rem;
`;

const Warning = styled.div`
  background-color: #dc3545;
  color: white;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const StonePreview = styled.div`
  background-color: #2D2D2D;
  border-radius: 8px;
  overflow: hidden;
  width: 250px;
  padding-bottom: 1rem;

  ${StoneTitle}, ${StoneDescription} {
    padding: 0 1rem;
    margin: 0.5rem 0;
  }
`;

const StoneImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const StoneItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  background: #2D2D2D;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: pointer;
  width: 100%;
  max-width: 800px;

  &:hover {
    background: #3D3D3D;
  }
`;

const StoneContent = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
  min-width: 0;

  img {
    width: 250px;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    flex-shrink: 0;
  }

  div {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    padding: 0.5rem 0;
  }
`;

const PortfolioPreview = styled.div`
  background-color: #2D2D2D;
  border-radius: 8px;
  overflow: hidden;
  width: 300px;
  padding-bottom: 1rem;

  ${ServiceTitle}, ${ServiceDescription} {
    padding: 0 1rem;
    margin: 0.5rem 0;
  }
`;

const PortfolioImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PortfolioItem = styled(StoneItem)`
  img {
    width: 300px;
  }
`;

const PortfolioContent = styled(StoneContent)`
  img {
    width: 300px;
    height: 200px;
    flex-shrink: 0;
  }
`;

const ContactPreview = styled.div`
  background: #2D2D2D;
  padding: 2rem;
  border-radius: 8px;
`;

const ContactItem = styled(ServiceItem)``;
const ContactContent = styled(ServiceContent)``;

const ContactTitle = styled.h4`
  color: #f1c232;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  margin-bottom: 0.5rem;
`;

const ContactText = styled.p`
  color: #ffffff;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  font-size: 0.9rem;
  line-height: 1.4;
`;

export default AdminPanel;