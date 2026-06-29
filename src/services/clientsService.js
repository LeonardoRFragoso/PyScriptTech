import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} from './database';

const CLIENT_STAGE = 'fechado';

export const clientsService = {
  getAll: async (params = {}) => {
    const filters = { stage: CLIENT_STAGE };
    if (params.search) filters.search = params.search;
    return getLeads(filters);
  },

  getById: async (id) => {
    return getLeadById(id);
  },

  create: async (clientData) => {
    return createLead({ ...clientData, stage: CLIENT_STAGE });
  },

  update: async (id, clientData) => {
    return updateLead(id, clientData);
  },

  delete: async (id) => {
    return deleteLead(id);
  },

  search: async (query) => {
    return getLeads({ stage: CLIENT_STAGE, search: query });
  },

  getStats: async () => {
    const clients = await getLeads({ stage: CLIENT_STAGE });
    return { total: clients.length };
  },

  exportToCSV: async () => {
    throw new Error('Export não disponível');
  },
};

export default clientsService;
