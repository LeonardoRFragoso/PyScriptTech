import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { showSuccess, showError } from '../services/toast';

const AuthContext = createContext({});

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem('@pyscript:user');
      const savedToken = localStorage.getItem('@pyscript:token');
      
      if (savedUser && savedToken) {
        try {
          setUser(JSON.parse(savedUser));
          setToken(savedToken);
          
          await validateToken(savedToken);
        } catch (error) {
          console.error('Error initializing auth:', error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const validateToken = async (authToken) => {
    try {
      const response = await fetch(`${API_URL}/auth/validate`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Token inválido');
      }

      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Credenciais inválidas');
      }
      
      localStorage.setItem('@pyscript:user', JSON.stringify(data.user));
      localStorage.setItem('@pyscript:token', data.token);
      
      setUser(data.user);
      setToken(data.token);
      
      showSuccess(`Bem-vindo de volta, ${data.user.name}!`);
      return { success: true, user: data.user };
    } catch (error) {
      showError(error.message || 'Erro ao fazer login');
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar conta');
      }

      showSuccess('Conta criada com sucesso! Faça login para continuar.');
      return { success: true };
    } catch (error) {
      showError(error.message || 'Erro ao criar conta');
      return { success: false, error: error.message };
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('@pyscript:user');
    localStorage.removeItem('@pyscript:token');
    setUser(null);
    setToken(null);
    showSuccess('Logout realizado com sucesso');
  }, []);

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('@pyscript:user', JSON.stringify(updatedUser));
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao atualizar perfil');
      }

      updateUser(data.user);
      showSuccess('Perfil atualizado com sucesso!');
      return { success: true, user: data.user };
    } catch (error) {
      showError(error.message || 'Erro ao atualizar perfil');
      return { success: false, error: error.message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao alterar senha');
      }

      showSuccess('Senha alterada com sucesso!');
      return { success: true };
    } catch (error) {
      showError(error.message || 'Erro ao alterar senha');
      return { success: false, error: error.message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao processar solicitação');
      }

      showSuccess('Email de recuperação enviado!');
      return { success: true };
    } catch (error) {
      showError(error.message || 'Erro ao enviar email');
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao redefinir senha');
      }

      showSuccess('Senha redefinida com sucesso!');
      return { success: true };
    } catch (error) {
      showError(error.message || 'Erro ao redefinir senha');
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext;
