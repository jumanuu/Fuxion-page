/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../api/auth';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('fuxion_token');
      const storedUser = localStorage.getItem('fuxion_current_user');
      
      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem('fuxion_token');
          localStorage.removeItem('fuxion_current_user');
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (loginName, password) => {
    try {
      setError(null);
      const response = await authService.login(loginName, password);
      
      if (response.success) {
        const { token, user: fuxionUser } = response;
        
        localStorage.setItem('fuxion_token', token);
        localStorage.setItem('fuxion_current_user', JSON.stringify(fuxionUser));
        setUser(fuxionUser);
        
        return { success: true };
      }
      
      const message = response.message || 'Credenciales inválidas';
      setError(message);
      return { success: false, message };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Error al iniciar sesión';
      setError(message);
      return { success: false, message };
    }
  };

  const register = async (_userData) => {
    setError('El registro debe realizarse a través de la aplicación móvil de Fuxion');
    return { success: false, message: 'El registro debe realizarse a través de la aplicación móvil de Fuxion' };
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Error en logout:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('fuxion_token');
      localStorage.removeItem('fuxion_current_user');
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('fuxion_current_user', JSON.stringify(updatedUser));
  };

  const refreshProfile = async () => {
    if (user?.customerID) {
      try {
        const updatedUser = await authService.getProfile(user.customerID);
        if (updatedUser) {
          updateUser(updatedUser);
        }
      } catch (err) {
        console.error('Error refreshing profile:', err);
      }
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    refreshProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { useAuth, AuthProvider };
