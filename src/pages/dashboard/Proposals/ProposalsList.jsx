import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiFilter, FiSearch, FiEdit2, FiTrash2, FiFileText, FiCheckCircle, FiXCircle, FiClock, FiExternalLink } from 'react-icons/fi';
import { getProposals, deleteProposal, getLeadById } from '../../../services/database';
import ProFlowModal from './ProFlowModal';
import SendProposalModal from './SendProposalModal';
import styles from './ProposalsList.module.css';

const STATUS_OPTIONS = [
  { id: 'draft', label: 'Rascunho', color: '#6b7280' },
  { id: 'sent', label: 'Enviada', color: '#3b82f6' },
  { id: 'accepted', label: 'Aceita', color: '#10b981' },
  { id: 'rejected', label: 'Rejeitada', color: '#ef4444' },
  { id: 'expired', label: 'Expirada', color: '#f59e0b' },
];

const ProposalsList = () => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [proFlowModal, setProFlowModal] = useState(null);
  const [sendModal, setSendModal] = useState(null);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (filterStatus !== 'all') filters.status = filterStatus;
      if (search.trim()) filters.search = search.trim();
      const data = await getProposals(filters);
      setProposals(data || []);
    } catch (error) {
      console.error('Error fetching proposals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [filterStatus]);

  useEffect(() => {
    const timeout = setTimeout(() => fetchProposals(), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleDelete = async (id) => {
    if (!window.confirm('Excluir esta proposta?')) return;
    try {
      await deleteProposal(id);
      fetchProposals();
    } catch (error) {
      console.error('Error deleting proposal:', error);
    }
  };

  const handleCreateProFlow = async (proposal) => {
    try {
      const lead = await getLeadById(proposal.lead_id);
      if (!lead) {
        alert('Lead não encontrado para esta proposta.');
        return;
      }
      setProFlowModal({ proposal, lead });
    } catch (error) {
      console.error('Error loading lead for ProFlow:', error);
    }
  };

  const handleProFlowSuccess = () => {
    fetchProposals();
  };

  const handleSendProposal = async (proposal) => {
    try {
      const lead = await getLeadById(proposal.lead_id);
      if (!lead || !lead.email) {
        alert('Lead não encontrado ou não possui email para envio da proposta.');
        return;
      }
      setSendModal({ proposal, lead });
    } catch (error) {
      console.error('Error loading lead for send proposal:', error);
    }
  };

  const handleSendSuccess = () => {
    fetchProposals();
  };

  const totalValue = proposals.reduce((sum, p) => sum + (Number(p.total_value) || 0), 0);
  const acceptedValue = proposals.filter(p => p.status === 'accepted').reduce((sum, p) => sum + (Number(p.total_value) || 0), 0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Propostas Comerciais</h1>
          <p>Gerencie propostas enviadas aos leads</p>
        </div>
        <button className={styles.addButton} onClick={() => navigate('/dashboard/proposals/new')}>
          <FiPlus /> Nova Proposta
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{proposals.length}</span>
          <span className={styles.statLabel}>Total de Propostas</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{proposals.filter(p => p.status === 'accepted').length}</span>
          <span className={styles.statLabel}>Aceitas</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          <span className={styles.statLabel}>Valor Total</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{acceptedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          <span className={styles.statLabel}>Valor Fechado</span>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <FiSearch />
          <input
            type="text"
            placeholder="Buscar proposta ou lead..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.filterGroup}>
          <FiFilter />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Todos os status</option>
            {STATUS_OPTIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loadingState}>Carregando propostas...</div>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Proposta</th>
                  <th>Lead</th>
                  <th>Status</th>
                  <th>Valor</th>
                  <th>Válida até</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {proposals.map(proposal => {
                    const status = STATUS_OPTIONS.find(s => s.id === proposal.status);
                    return (
                      <motion.tr
                        key={proposal.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <td>
                          <div className={styles.proposalInfo}>
                            <strong>{proposal.title}</strong>
                            <span>{proposal.items?.length || 0} itens</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.leadInfo}>
                            <strong>{proposal.leads?.name || 'Lead'}</strong>
                            <span>{proposal.leads?.company || ''}</span>
                          </div>
                        </td>
                        <td>
                          <span className={styles.statusBadge} style={{ background: status?.color + '20', color: status?.color, borderColor: status?.color }}>
                            {status?.icon} {status?.label}
                          </span>
                        </td>
                        <td>{Number(proposal.total_value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        <td>
                          {proposal.valid_until ? (
                            <span className={proposal.valid_until < new Date().toISOString().split('T')[0] ? styles.overdue : ''}>
                              <FiClock /> {new Date(proposal.valid_until).toLocaleDateString('pt-BR')}
                            </span>
                          ) : '-'}
                        </td>
                        <td>
                          <div className={styles.actions}>
                            {proposal.status === 'accepted' && (
                              <button className={`${styles.actionButton} ${styles.proFlowButton}`} onClick={() => handleCreateProFlow(proposal)} title="Criar projeto na ProFlow">
                                <FiExternalLink />
                              </button>
                            )}
                            {(proposal.status === 'draft' || proposal.status === 'sent') && !proposal.proflow_project_id && (
                              <button className={`${styles.actionButton} ${styles.sendButton}`} onClick={() => handleSendProposal(proposal)} title="Enviar proposta">
                                <FiFileText />
                              </button>
                            )}
                            <button className={styles.actionButton} onClick={() => navigate(`/dashboard/proposals/edit/${proposal.id}`)} title="Editar">
                              <FiEdit2 />
                            </button>
                            <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={() => handleDelete(proposal.id)} title="Excluir">
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
            {proFlowModal && (
              <ProFlowModal
                proposal={proFlowModal.proposal}
                lead={proFlowModal.lead}
                onClose={() => setProFlowModal(null)}
                onSuccess={handleProFlowSuccess}
              />
            )}
            {sendModal && (
              <SendProposalModal
                proposal={sendModal.proposal}
                lead={sendModal.lead}
                onClose={() => setSendModal(null)}
                onSuccess={handleSendSuccess}
              />
            )}
            {proposals.length === 0 && (
              <div className={styles.emptyState}>
                <p>Nenhuma proposta encontrada.</p>
                <button className={styles.addButton} onClick={() => navigate('/dashboard/proposals/new')}>
                  <FiPlus /> Criar Proposta
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProposalsList;
