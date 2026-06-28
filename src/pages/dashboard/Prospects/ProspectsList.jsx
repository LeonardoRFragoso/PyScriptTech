import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiFilter, FiSearch, FiEdit2, FiTrash2, FiUser, FiLinkedin, FiGlobe, FiArrowRight, FiAlertCircle } from 'react-icons/fi';
import { getProspectCompanies, deleteProspectCompany } from '../../../services/database';
import styles from './ProspectsList.module.css';

const STATUS_OPTIONS = [
  { id: 'não_contatada', label: 'Não Contatada', color: '#6b7280' },
  { id: 'conexão_enviada', label: 'Conexão Enviada', color: '#8b5cf6' },
  { id: 'respondeu', label: 'Respondeu', color: '#3b82f6' },
  { id: 'diagnóstico_agendado', label: 'Diagnóstico Agendado', color: '#f59e0b' },
  { id: 'proposta_enviada', label: 'Proposta Enviada', color: '#ec4899' },
  { id: 'negociação', label: 'Negociação', color: '#f97316' },
  { id: 'fechada', label: 'Fechada', color: '#10b981' },
  { id: 'perdida', label: 'Perdida', color: '#ef4444' },
  { id: 'sem_fit', label: 'Sem Fit', color: '#64748b' },
];

const POTENTIAL_OPTIONS = [
  { id: 'baixo', label: 'Baixo', color: '#64748b' },
  { id: 'médio', label: 'Médio', color: '#f59e0b' },
  { id: 'alto', label: 'Alto', color: '#10b981' },
];

const ProspectsList = () => {
  const navigate = useNavigate();
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPotential, setFilterPotential] = useState('all');
  const [filterSegment, setFilterSegment] = useState('all');

  const fetchProspects = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (filterStatus !== 'all') filters.status = filterStatus;
      if (filterPotential !== 'all') filters.potential = filterPotential;
      if (filterSegment !== 'all') filters.segment = filterSegment;
      if (search.trim()) filters.search = search.trim();
      const data = await getProspectCompanies(filters);
      setProspects(data || []);
    } catch (error) {
      console.error('Error fetching prospects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProspects();
  }, [filterStatus, filterPotential, filterSegment]);

  useEffect(() => {
    const timeout = setTimeout(() => fetchProspects(), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleDelete = async (id) => {
    if (!window.confirm('Excluir esta empresa prospectada?')) return;
    try {
      await deleteProspectCompany(id);
      fetchProspects();
    } catch (error) {
      console.error('Error deleting prospect:', error);
    }
  };

  const segments = [...new Set(prospects.map(p => p.segment).filter(Boolean))];
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Prospecção</h1>
          <p>Controle as empresas da lista de prospecção</p>
        </div>
        <button className={styles.addButton} onClick={() => navigate('/dashboard/prospects/new')}>
          <FiPlus /> Nova Empresa
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{prospects.length}</span>
          <span className={styles.statLabel}>Total</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{prospects.filter(p => p.status === 'não_contatada').length}</span>
          <span className={styles.statLabel}>Não Contatadas</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{prospects.filter(p => ['diagnóstico_agendado', 'proposta_enviada', 'negociação'].includes(p.status)).length}</span>
          <span className={styles.statLabel}>Em Negociação</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{prospects.filter(p => p.next_contact_at && p.next_contact_at < today).length}</span>
          <span className={styles.statLabel}>Ações Atrasadas</span>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <FiSearch />
          <input
            type="text"
            placeholder="Buscar empresa..."
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
          <select value={filterPotential} onChange={(e) => setFilterPotential(e.target.value)}>
            <option value="all">Todos os potenciais</option>
            {POTENTIAL_OPTIONS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
          <select value={filterSegment} onChange={(e) => setFilterSegment(e.target.value)}>
            <option value="all">Todos os segmentos</option>
            {segments.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loadingState}>Carregando empresas...</div>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Segmento</th>
                  <th>Potencial</th>
                  <th>Status</th>
                  <th>Decisor</th>
                  <th>Próximo Contato</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {prospects.map(prospect => {
                    const status = STATUS_OPTIONS.find(s => s.id === prospect.status);
                    const potential = POTENTIAL_OPTIONS.find(p => p.id === prospect.potential);
                    const isOverdue = prospect.next_contact_at && prospect.next_contact_at < today;
                    return (
                      <motion.tr
                        key={prospect.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={isOverdue ? styles.overdueRow : ''}
                      >
                        <td>
                          <div className={styles.companyInfo}>
                            <strong>{prospect.company_name}</strong>
                            <span>{prospect.city}</span>
                          </div>
                        </td>
                        <td>{prospect.segment}</td>
                        <td>
                          <span className={styles.potentialBadge} style={{ background: potential?.color + '20', color: potential?.color }}>
                            {potential?.label}
                          </span>
                        </td>
                        <td>
                          <span className={styles.statusBadge} style={{ background: status?.color + '20', color: status?.color, borderColor: status?.color }}>
                            {status?.label}
                          </span>
                        </td>
                        <td>
                          <div className={styles.decisorInfo}>
                            <span><FiUser /> {prospect.decision_maker_name || '-'}</span>
                            <span>{prospect.decision_maker_role || ''}</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.nextContact}>
                            {prospect.next_contact_at && (
                              <span className={isOverdue ? styles.overdueDate : ''}>
                                <FiAlertCircle /> {new Date(prospect.next_contact_at).toLocaleDateString('pt-BR')}
                              </span>
                            )}
                            <span>{prospect.next_action || '-'}</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.actions}>
                            {prospect.linkedin_url && (
                              <a href={prospect.linkedin_url} target="_blank" rel="noopener noreferrer" className={styles.actionButton} title="LinkedIn">
                                <FiLinkedin />
                              </a>
                            )}
                            {prospect.website && (
                              <a href={prospect.website} target="_blank" rel="noopener noreferrer" className={styles.actionButton} title="Site">
                                <FiGlobe />
                              </a>
                            )}
                            <button className={styles.actionButton} onClick={() => navigate(`/dashboard/prospects/edit/${prospect.id}`)} title="Editar">
                              <FiEdit2 />
                            </button>
                            <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={() => handleDelete(prospect.id)} title="Excluir">
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
            {prospects.length === 0 && (
              <div className={styles.emptyState}>
                <p>Nenhuma empresa encontrada.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProspectsList;
