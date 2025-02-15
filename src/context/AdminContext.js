import React, { createContext, useContext, useState, useEffect } from 'react';

// Создание контекста для управления состоянием приложения
const AdminContext = createContext();

export function AdminProvider({ children }) {
  // Состояния для хранения данных
  const [services, setServices] = useState(() => {
    // Загружаем сохраненные сервисы из localStorage при инициализации
    const savedServices = localStorage.getItem('services');
    return savedServices ? JSON.parse(savedServices) : [];
  });

  const [stoneTypes, setStoneTypes] = useState(() => {
    const savedStoneTypes = localStorage.getItem('stoneTypes');
    return savedStoneTypes ? JSON.parse(savedStoneTypes) : [];
  });

  const [portfolioItems, setPortfolioItems] = useState(() => {
    const savedPortfolio = localStorage.getItem('portfolio');
    return savedPortfolio ? JSON.parse(savedPortfolio) : [];
  });

  const [selectedCard, setSelectedCard] = useState(null);

  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [
      {
        id: 'default-1',
        title: 'Адрес',
        text: 'г. Москва, ул. Примерная, д. 123'
      },
      {
        id: 'default-2',
        title: 'Телефон',
        text: '+7 (999) 123-45-67'
      },
      {
        id: 'default-3',
        title: 'Email',
        text: 'info@stonehill.ru'
      },
      {
        id: 'default-4',
        title: 'Режим работы',
        text: 'Пн-Пт: 9:00 - 18:00\nСб-Вс: выходной'
      }
    ];
  });

  // Сохраняем изменения в localStorage
  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('stoneTypes', JSON.stringify(stoneTypes));
  }, [stoneTypes]);

  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolioItems));
  }, [portfolioItems]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addService = (service) => {
    setServices(prev => [...prev, service]);
  };

  const addStoneType = (stoneType) => {
    setStoneTypes(prev => [...prev, stoneType]);
  };

  const addPortfolioItem = (item) => {
    setPortfolioItems(prev => [...prev, item]);
  };

  const addContact = (contact) => {
    setContacts(prev => [...prev, contact]);
  };

  const deleteService = (id) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const deleteStoneType = (id) => {
    setStoneTypes(prev => prev.filter(stone => stone.id !== id));
  };

  const deletePortfolioItem = (id) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
  };

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const openCardDetails = (card) => {
    setSelectedCard(card);
  };

  const closeCardDetails = () => {
    setSelectedCard(null);
  };

  const updateService = (updatedService) => {
    setServices(prev => prev.map(service => 
      service.id === updatedService.id ? updatedService : service
    ));
  };

  const updateStoneType = (updatedStone) => {
    setStoneTypes(prev => prev.map(stone => 
      stone.id === updatedStone.id ? updatedStone : stone
    ));
  };

  const updatePortfolioItem = (updatedItem) => {
    setPortfolioItems(prev => prev.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const updateContact = (updatedContact) => {
    setContacts(prev => prev.map(contact => 
      contact.id === updatedContact.id ? updatedContact : contact
    ));
  };

  return (
    <AdminContext.Provider value={{
      services,
      stoneTypes,
      portfolioItems,
      selectedCard,
      contacts,
      addService,
      addStoneType,
      addPortfolioItem,
      addContact,
      deleteService,
      deleteStoneType,
      deletePortfolioItem,
      deleteContact,
      openCardDetails,
      closeCardDetails,
      updateService,
      updateStoneType,
      updatePortfolioItem,
      updateContact
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin должен использоваться внутри AdminProvider');
  }
  return context;
}