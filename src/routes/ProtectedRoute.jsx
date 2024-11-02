import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { token, userRole } = useAuth();

  const isAuthenticated = !!token; // Verifica si hay un token
  const hasAccess = allowedRoles ? allowedRoles.includes(userRole) : true; // Verifica si el rol está permitido

  return isAuthenticated && hasAccess ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
