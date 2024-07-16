import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from '../Pages/RegisterPage';
import DashboardPage from '../Pages/DashboardPage';
import LoginPage from '../Pages/LoginPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        
      </Routes>
    </Router>
  );
}

export default AppRoutes;
