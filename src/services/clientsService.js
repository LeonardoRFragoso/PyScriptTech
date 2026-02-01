const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('@pyscript:token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const clientsService = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.sort) queryParams.append('sort', params.sort);
    
    const queryString = queryParams.toString();
    const url = `${API_URL}/clients${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, { headers: getAuthHeaders() });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/clients/${id}`, { headers: getAuthHeaders() });
    return handleResponse(response);
  },

  create: async (clientData) => {
    const response = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(clientData),
    });
    return handleResponse(response);
  },

  update: async (id, clientData) => {
    const response = await fetch(`${API_URL}/clients/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(clientData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/clients/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  search: async (query) => {
    const response = await fetch(
      `${API_URL}/clients/search?q=${encodeURIComponent(query)}`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_URL}/clients/stats`, { headers: getAuthHeaders() });
    return handleResponse(response);
  },

  exportToCSV: async () => {
    const response = await fetch(`${API_URL}/clients/export`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Export failed');
    return response.blob();
  },

  importFromCSV: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('@pyscript:token');
    
    const response = await fetch(`${API_URL}/clients/import`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });
    return handleResponse(response);
  },

  addNote: async (clientId, note) => {
    const response = await fetch(`${API_URL}/clients/${clientId}/notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ content: note }),
    });
    return handleResponse(response);
  },

  getNotes: async (clientId) => {
    const response = await fetch(
      `${API_URL}/clients/${clientId}/notes`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },
};

export default clientsService;
