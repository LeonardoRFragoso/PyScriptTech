import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import { showSuccess, showError } from '../services/toast';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const setUserFromSession = useCallback((session) => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.name || session.user.email,
        role: session.user.user_metadata?.role || 'admin',
      });
      setToken(session.access_token);
    } else {
      setUser(null);
      setToken(null);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      if (!isSupabaseConfigured()) {
        // Fallback para desenvolvimento: verifica se há usuário mock salvo
        const savedUser = localStorage.getItem('@pyscript:user');
        if (savedUser) {
          try {
            const parsed = JSON.parse(savedUser);
            setUser(parsed);
            setToken('mock-token');
          } catch (error) {
            console.error('Error parsing mock user:', error);
          }
        }
        setLoading(false);
        return;
      }

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setUserFromSession(session);

        // Escuta mudanças de autenticação
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
          setUserFromSession(session);
        });

        return () => {
          authListener?.subscription?.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [setUserFromSession]);

  const login = async (email, password) => {
    if (!isSupabaseConfigured()) {
      // Modo de desenvolvimento sem Supabase: mock login
      const mockUser = { id: 'mock-user', email, name: 'Admin', role: 'admin' };
      localStorage.setItem('@pyscript:user', JSON.stringify(mockUser));
      localStorage.setItem('@pyscript:token', 'mock-token');
      setUser(mockUser);
      setToken('mock-token');
      showSuccess(`Bem-vindo de volta, ${mockUser.name}!`);
      return { success: true, user: mockUser };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      setUserFromSession(data.session);
      showSuccess(`Bem-vindo de volta, ${data.user.user_metadata?.name || data.user.email}!`);
      return { success: true, user: data.user };
    } catch (error) {
      showError(error.message || 'Erro ao fazer login');
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    if (!isSupabaseConfigured()) {
      showSuccess('Conta criada com sucesso! Faça login para continuar.');
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });
      if (error) throw error;

      showSuccess('Conta criada com sucesso! Verifique seu email para continuar.');
      return { success: true };
    } catch (error) {
      showError(error.message || 'Erro ao criar conta');
      return { success: false, error: error.message };
    }
  };

  const logout = useCallback(async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
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
    if (!isSupabaseConfigured() || !user) {
      updateUser(profileData);
      return { success: true, user: { ...user, ...profileData } };
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { ...profileData },
      });
      if (error) throw error;

      setUserFromSession(data.session || { user: data.user });
      showSuccess('Perfil atualizado com sucesso!');
      return { success: true, user: data.user };
    } catch (error) {
      showError(error.message || 'Erro ao atualizar perfil');
      return { success: false, error: error.message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    if (!isSupabaseConfigured()) {
      showSuccess('Senha alterada com sucesso!');
      return { success: true };
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      showSuccess('Senha alterada com sucesso!');
      return { success: true };
    } catch (error) {
      showError(error.message || 'Erro ao alterar senha');
      return { success: false, error: error.message };
    }
  };

  const forgotPassword = async (email) => {
    if (!isSupabaseConfigured()) {
      showSuccess('Email de recuperação enviado!');
      return { success: true };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;

      showSuccess('Email de recuperação enviado!');
      return { success: true };
    } catch (error) {
      showError(error.message || 'Erro ao enviar email');
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (token, newPassword) => {
    if (!isSupabaseConfigured()) {
      showSuccess('Senha redefinida com sucesso!');
      return { success: true };
    }

    try {
      // Supabase recupera token da URL automaticamente; este método é alternativo
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'recovery',
        newPassword,
      });
      if (error) throw error;

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
