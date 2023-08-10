import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
