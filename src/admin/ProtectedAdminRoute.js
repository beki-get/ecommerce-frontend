// src/admin/ProtectedAdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || !user.isAdmin) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedAdminRoute;
