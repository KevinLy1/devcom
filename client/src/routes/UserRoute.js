import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserRoute = () => {
  const { userData } = useAuth();

  return userData ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoute;
