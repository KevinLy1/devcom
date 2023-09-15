import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const GuestRoute = () => {
  const { userData } = useAuth();

  return !userData ? <Outlet /> : <Navigate to="/profile" />;
};

export default GuestRoute;
