import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = () => {
  const { userData } = useAuth();

  const isAdmin = userData && userData.role === 'administrator';

  return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default AdminRoute;
