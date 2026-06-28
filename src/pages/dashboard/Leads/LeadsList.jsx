import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiFilter, FiSearch, FiPhone, FiMail, FiTrash2, FiEdit2, FiArrowRight, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { getLeads, deleteLead, moveLeadStage } from '../../../services/database';
import styles from './LeadsList.module.css';

const PIPELINE_STAGES = [
  { id: 'novo', label: 'Novo Lead', color: '#3b82f6' },
  { id: 'contato', label: 'Contato Realizado', color: '#8b5cf6' },
  { id: 'diagnostico', label: 'Diagnóstico Agendado', color: '#f59e0b' },
  { id: 'proposta', label: 'Proposta Enviada', color: '#ec4899' },
  { id: 'negociacao', label: 'Negociação', color: '#f97316' },
  { id: 'fechado', label: 'Fechado', color: '#10b981' },
  { id: 'perdido', label: 'Perdido', color: '#ef4444' },
];

const PRIORITY_OPTIONS = [
  { id: 'high', label: 'Alta', color: '#ef4444' },
  { id: 'medium', label: 'Média', color: '#f59e0b' },
  { id: 'low', label: 'Baixa', color: '#3b82f6' },
];

const LeadsList = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [filterSegment, setFilterSegment] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = {};
      if (search.trim()) filters.search = search.trim();
      if (filterStage !== 'all') filters.stage = filterStage;
      if (filterSource !== 'all') filters.source = filterSource;
      if (filterSegment !== 'all') filters.segment = filterSegment;
      if (filterPriority !== 'all') filters.priority = filterPriority;

      const data = await getLeads(filters);
      const sortedData = [...data].sort((a, b) => {
        if (sortBy === 'created_at') return new Date(b.created_at) - new Date(a.created_at);
        if (sortBy === 'estimated_value') return (b.estimated_value || 0) - (a.estimated_value || 0);
        if (sortBy === 'next_action_date') {
          if (!a.next_action_date) return 1;
          if (!b.next_action_date) return -1;
          return new Date(a.next_action_date) - new Date(b.next_action_date);
        }
        return 0;
      });
      setLeads(sortedData);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError('Erro ao carregar leads. Verifique a conexão com o Supabase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [filterStage, filterSource, filterSegment, filterPriority, sortBy]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchLeads();
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleMoveLead = async (leadId, direction) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;
    const currentIndex = PIPELINE_STAGES.findIndex(s => s.id === lead.stage);
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0 || newIndex >= PIPELINE_STAGES.length) return;
    const newStage = PIPELINE_STAGES[newIndex].id;

    try {
      await moveLeadStage(leadId, newStage);
      fetchLeads();
    } catch (err) {
      console.error('Error moving lead:', err);
      setError('Erro ao mover lead de etapa.');
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (window.confirm('Tem certeza que deseja excluir este lead?')) {
      try {
        await deleteLead(leadId);
        fetchLeads();
      } catch (err) {
        console.error('Error deleting lead:', err);
        setError('Erro ao excluir lead.');
      }
    }
  };

  const sources = [...new Set(leads.map(l => l.source).filter(Boolean))];
  const segments = [...new Set(leads.map(l => l.segment).filter(Boolean))];

  const pipelineCounts = PIPELINE_STAGES.reduce((acc, stage) => {
    acc[stage.id] = leads.filter(l => l.stage === stage.id).length;
    return acc;
  }, {});

  const totalValue = leads
    .filter(l => l.stage === 'fechado')
    .reduce((sum, l) => sum + (Number(l.estimated_value) || 0), 0);

  const pipelineValue = leads
    .filter(l => l.stage !== 'fechado' && l.stage !== 'perdido')
    .reduce((sum, l) => sum + (Number(l.estimated_value) || 0), 0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>CRM e Funil de Vendas</h1>
          <p>Gerencie leads do primeiro contato ao fechamento</p>
        </div>
        <button className={styles.addButton} onClick={() => navigate('/dashboard/leads/new')}>
          <FiPlus /> Novo Lead
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{leads.length}</span>
          <span className={styles.statLabel}>Total de Leads</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{leads.filter(l => l.stage === 'diagnostico' || l.stage === 'proposta' || l.stage === 'negociacao').length}</span>
          <span className={styles.statLabel}>Em Pipeline</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{pipelineValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          <span className={styles.statLabel}>Valor em Pipeline</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          <span className={styles.statLabel}>Valor Fechado</span>
        </div>
      </div>

      <div className={styles.pipeline}>
        {PIPELINE_STAGES.map(stage => (
          <div key={stage.id} className={styles.pipelineStage}>
            <div className={styles.stageHeader} style={{ borderColor: stage.color }}>
              <span className={styles.stageName}>{stage.label}</span>
              <span className={styles.stageCount} style={{ background: stage.color }}>{pipelineCounts[stage.id] || 0}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <FiSearch />
          <input
            type="text"
            placeholder="Buscar por nome, empresa ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.filterGroup}>
          <FiFilter />
          <select value={filterStage} onChange={(e) => setFilterStage(e.target.value)}>
            <option value="all">Todas as etapas</option>
            {PIPELINE_STAGES.map(stage => (
              <option key={stage.id} value={stage.id}>{stage.label}</option>
            ))}
          </select>
          <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)}>
            <option value="all">Todas as fontes</option>
            {sources.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
          <select value={filterSegment} onChange={(e) => setFilterSegment(e.target.value)}>
            <option value="all">Todos os segmentos</option>
            {segments.map(segment => (
              <option key={segment} value={segment}>{segment}</option>
            ))}
          </select>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="all">Todas as prioridades</option>
            {PRIORITY_OPTIONS.map(priority => (
              <option key={priority.id} value={priority.id}>{priority.label}</option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="created_at">Ordenar: Mais recentes</option>
            <option value="estimated_value">Ordenar: Maior valor</option>
            <option value="next_action_date">Ordenar: Próxima ação</option>
          </select>
        </div>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <FiAlertCircle /> {error}
        </div>
      )}

      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loadingState}>Carregando leads...</div>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Lead</th>
                  <th>Contato</th>
                  <th>Interesse</th>
                  <th>Etapa</th>
                  <th>Prioridade</th>
                  <th>Valor Est.</th>
                  <th>Próxima Ação</th>
                  <th>Fonte</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {leads.map(lead => {
                    const stage = PIPELINE_STAGES.find(s => s.id === lead.stage);
                    const currentIndex = PIPELINE_STAGES.findIndex(s => s.id === lead.stage);
                    const today = new Date().toISOString().split('T')[0];
                    const isOverdue = lead.next_action_date && lead.next_action_date < today;
                    const priority = PRIORITY_OPTIONS.find(p => p.id === lead.priority);
                    return (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={isOverdue ? styles.overdueRow : ''}
                      >
                        <td>
                          <div className={styles.leadInfo}>
                            <strong>{lead.name}</strong>
                            <span>{lead.company} • {lead.role}</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.contactInfo}>
                            <span><FiMail /> {lead.email}</span>
                            <span><FiPhone /> {lead.phone}</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.interests}>
                            {(lead.interests || []).slice(0, 3).map(i => (
                              <span key={i} className={styles.interestTag}>{i}</span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <span className={styles.stageBadge} style={{ background: stage?.color + '20', color: stage?.color, borderColor: stage?.color }}>
                            {stage?.label}
                          </span>
                        </td>
                        <td>
                          <span className={styles.priorityBadge} style={{ background: (priority?.color || '#f59e0b') + '20', color: priority?.color || '#f59e0b' }}>
                            {priority?.label || 'Média'}
                          </span>
                        </td>
                        <td>
                          {Number(lead.estimated_value) ? Number(lead.estimated_value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-'}
                        </td>
                        <td>
                          <div className={styles.nextAction}>
                            {lead.next_action_date && (
                              <span className={isOverdue ? styles.overdueDate : ''}>
                                <FiAlertCircle /> {new Date(lead.next_action_date).toLocaleDateString('pt-BR')}
                              </span>
                            )}
                            <span>{lead.next_action || '-'}</span>
                          </div>
                        </td>
                        <td>{lead.source}</td>
                        <td>
                          <div className={styles.actions}>
                            <button
                              className={styles.actionButton}
                              disabled={currentIndex === 0}
                              onClick={() => handleMoveLead(lead.id, 'prev')}
                              title="Voltar etapa"
                            >
                              <FiArrowLeft />
                            </button>
                            <button
                              className={styles.actionButton}
                              disabled={currentIndex === PIPELINE_STAGES.length - 1}
                              onClick={() => handleMoveLead(lead.id, 'next')}
                              title="Avançar etapa"
                            >
                              <FiArrowRight />
                            </button>
                            <button className={styles.actionButton} onClick={() => navigate(`/dashboard/leads/edit/${lead.id}`)} title="Editar">
                              <FiEdit2 />
                            </button>
                            <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={() => handleDeleteLead(lead.id)} title="Excluir">
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
            {leads.length === 0 && (
              <div className={styles.emptyState}>
                <p>Nenhum lead encontrado.</p>
                <button className={styles.addButton} onClick={() => navigate('/dashboard/leads/new')}>
                  <FiPlus /> Adicionar Lead
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LeadsList;
