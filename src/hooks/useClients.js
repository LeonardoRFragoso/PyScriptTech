import { useState, useEffect, useCallback } from 'react';
import clientsService from '../services/clientsService';
import { showSuccess, showError } from '../services/toast';

export const useClients = (initialParams = {}) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [params, setParams] = useState(initialParams);

  const fetchClients = useCallback(async (fetchParams = params) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await clientsService.getAll(fetchParams);
      
      if (Array.isArray(data)) {
        setClients(data);
        setPagination(prev => ({ ...prev, total: data.length }));
      } else {
        setClients(data.clients || data.data || []);
        if (data.pagination) {
          setPagination(data.pagination);
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao carregar clientes';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const createClient = async (clientData) => {
    try {
      setLoading(true);
      const newClient = await clientsService.create(clientData);
      setClients(prev => [newClient, ...prev]);
      showSuccess('Cliente criado com sucesso!');
      return { success: true, data: newClient };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao criar cliente';
      showError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async (id, clientData) => {
    try {
      setLoading(true);
      const updatedClient = await clientsService.update(id, clientData);
      setClients(prev => prev.map(c => c.id === id || c._id === id ? updatedClient : c));
      showSuccess('Cliente atualizado com sucesso!');
      return { success: true, data: updatedClient };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao atualizar cliente';
      showError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id) => {
    try {
      setLoading(true);
      await clientsService.delete(id);
      setClients(prev => prev.filter(c => c.id !== id && c._id !== id));
      showSuccess('Cliente removido com sucesso!');
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao remover cliente';
      showError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const searchClients = async (query) => {
    if (!query.trim()) {
      await fetchClients();
      return;
    }
    
    try {
      setLoading(true);
      const results = await clientsService.search(query);
      setClients(Array.isArray(results) ? results : results.data || []);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro na busca';
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const changePage = (newPage) => {
    const newParams = { ...params, page: newPage };
    setParams(newParams);
    fetchClients(newParams);
  };

  const changeSort = (sortField, sortOrder = 'asc') => {
    const newParams = { ...params, sort: `${sortField}:${sortOrder}` };
    setParams(newParams);
    fetchClients(newParams);
  };

  const filterByStatus = (status) => {
    const newParams = { ...params, status, page: 1 };
    setParams(newParams);
    fetchClients(newParams);
  };

  const refresh = () => {
    fetchClients(params);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    loading,
    error,
    pagination,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
    searchClients,
    changePage,
    changeSort,
    filterByStatus,
    refresh,
  };
};

export default useClients;
