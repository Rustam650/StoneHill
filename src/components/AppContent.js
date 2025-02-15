import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Services from "./Services";
import StoneTypes from "./StoneTypes";
import Portfolio from "./Portfolio";
import AdminPanel from "./AdminPanel";
import ServicesPage from "./ServicesPage";
import Modal from "./Modal";
import GlobalStyles from "../GlobalStyles";
import AdminLogin from '../pages/AdminLogin';
import ProtectedRoute from './ProtectedRoute';
import Contacts from './Contacts';

function AppContent() {
  const navigate = useNavigate();
  
  useEffect(() => {
    let keys = [];
    const secretCode = ['Control', 'Alt', 'a']; // Ctrl + Alt + a

    const handleKeyDown = (e) => {
      keys.push(e.key);
      keys = keys.slice(-secretCode.length);

      if (JSON.stringify(keys) === JSON.stringify(secretCode)) {
        navigate('/admin/login');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<><Hero /><Services /></>} />
        <Route path="/stone-types" element={<StoneTypes />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute isAdmin>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
      <Modal />
    </>
  );
}

export default AppContent; 