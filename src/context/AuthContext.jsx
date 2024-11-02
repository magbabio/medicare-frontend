import React, { createContext, useContext, useState } from 'react';
import { loginRequest } from 'services/authAPI';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(null);

  const handleLogin = async (credentials) => {
    try {
      const response = await loginRequest(credentials);
      console.log(response);
      const { token } = response.Data;

      // Decodificar el token para obtener el rol
      const payload = JSON.parse(atob(token.split('.')[1]));
      const { role } = payload;

      if (role === 'admin') {
        setToken(token);
        setUserRole(role);
        localStorage.setItem('token', token);
        return true;
      } else {
        throw new Error('Solo los administradores pueden iniciar sesión.');
      }
    } catch (error) {
      throw error; // Propagar el error para manejarlo en el componente
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUserRole(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, userRole, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
