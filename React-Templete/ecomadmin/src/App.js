import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminProductManagement from './components/AdminProductManagement';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/products" element={<AdminProductManagement />} />
        <Route path="/" element={<Navigate to="/admin/products" replace />} />
      </Routes>
    </Router>
  );
};

export default App;