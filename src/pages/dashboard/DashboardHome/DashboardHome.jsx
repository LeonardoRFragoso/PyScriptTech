import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiFileText, 
  FiCheckCircle, 
  FiDollarSign,
  FiTrendingUp,
  FiArrowUpRight,
  FiClock,
  FiCalendar,
  FiAlertCircle,
  FiRefreshCw,
} from 'react-icons/fi';
import { BarChart, DonutChart } from '../../../components/dashboard/Charts';
import TiltCard from '../../../components/common/TiltCard';
import { StaggerContainer, AnimatedItem } from '../../../components/common/AnimatedSection';
import { getMetrics, getProposals, getLeads } from '../../../services/database';
import styles from './DashboardHome.module.css';

const PROPOSAL_STATUS_LABEL = {
  draft: 'Rascunho',
  sent: 'Enviada',
  accepted: 'Aceita',
  rejected: 'Rejeitada',
  expired: 'Expirada',
};

const LEAD_STAGE_LABEL = {
  novo: 'Novo',
  qualificado: 'Qualificado',
  negociacao: 'Negociação',
  fechado: 'Fechado',
  perdido: 'Perdido',
};

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('pt-BR', { timeZone: 'UTC', day: '2-digit', month: 'short' });
};

const getProposalStatusClass = (status) => {
  switch (status) {
    case 'accepted': return styles.statusCompleted;
    case 'sent': return styles.statusProgress;
    case 'draft': return styles.statusWaiting;
    case 'rejected': return styles.statusRejected;
    default: return '';
  }
};

const getLeadStageClass = (stage) => {
  switch (stage) {
    case 'fechado': return styles.statusCompleted;
    case 'negociacao': return styles.statusProgress;
    case 'qualificado': return styles.statusWaiting;
    case 'perdido': return styles.statusRejected;
    default: return '';
  }
};

const DashboardHome = () => {
  const [metrics, setMetrics] = useState(null);
  const [recentProposals, setRecentProposals] = useState([]);
  const [followUpLeads, setFollowUpLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [m, proposals, leads] = await Promise.all([
        getMetrics(),
        getProposals(),
        getLeads(),
      ]);
      setMetrics(m);
      setRecentProposals(proposals.slice(0, 4));

      const today = new Date().toISOString().split('T')[0];
      const urgent = leads
        .filter(l => l.stage !== 'fechado' && l.stage !== 'perdido')
        .sort((a, b) => {
          const aOverdue = a.next_action_date && a.next_action_date < today;
          const bOverdue = b.next_action_date && b.next_action_date < today;
          if (aOverdue && !bOverdue) return -1;
          if (!aOverdue && bOverdue) return 1;
          return new Date(a.next_action_date || '9999') - new Date(b.next_action_date || '9999');
        })
        .slice(0, 4);
      setFollowUpLeads(urgent);
    } catch (err) {
      setError('Erro ao carregar dados. Verifique a conexão com o Supabase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const stats = metrics ? [
    {
      icon: FiUsers,
      label: 'Total de Leads',
      value: metrics.totalLeads,
      sub: `${metrics.leadsByStage?.negociacao || 0} em negociação`,
      color: '#00d4ff',
    },
    {
      icon: FiFileText,
      label: 'Propostas',
      value: metrics.totalProposals,
      sub: `${metrics.proposalsSent} enviadas`,
      color: '#7c3aed',
    },
    {
      icon: FiCheckCircle,
      label: 'Propostas Aceitas',
      value: metrics.proposalsAccepted,
      sub: `Taxa: ${metrics.conversionRate}%`,
      color: '#10b981',
    },
    {
      icon: FiDollarSign,
      label: 'Receita Fechada',
      value: formatCurrency(metrics.closedValue),
      sub: `Pipeline: ${formatCurrency(metrics.pipelineValue)}`,
      color: '#f59e0b',
    },
  ] : [];

  const proposalStatusChart = metrics ? [
    { label: 'Aceitas', value: metrics.proposalsAccepted || 0 },
    { label: 'Enviadas', value: metrics.proposalsSent || 0 },
    { label: 'Rejeitadas', value: metrics.proposalsRejected || 0 },
    { label: 'Rascunho', value: (metrics.totalProposals - metrics.proposalsAccepted - metrics.proposalsSent - metrics.proposalsRejected) || 0 },
  ].filter(d => d.value > 0) : [];

  const leadsByStageChart = metrics?.leadsByStage
    ? Object.entries(metrics.leadsByStage).map(([label, value]) => ({
        label: LEAD_STAGE_LABEL[label] || label,
        value,
      }))
    : [];

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <FiRefreshCw className={styles.spin} />
          <p>Carregando dados reais...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <FiAlertCircle />
          <p>{error}</p>
          <button onClick={loadData} className={styles.retryButton}>Tentar novamente</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Dashboard</h1>
          <p>Dados reais do seu CRM e propostas.</p>
        </div>
        <div className={styles.headerActions}>
          <span className={styles.date}>
            <FiCalendar />
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </span>
          <button onClick={loadData} className={styles.refreshButton} title="Atualizar">
            <FiRefreshCw />
          </button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: `${stat.color}20`, color: stat.color }}>
              <stat.icon />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statLabel}>{stat.label}</span>
              <div className={styles.statValue}>
                <span>{stat.value}</span>
              </div>
              <span className={styles.statSub}>{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Propostas Recentes</h2>
            <Link to="/dashboard/proposals" className={styles.viewAll}>Ver todas</Link>
          </div>
          {recentProposals.length === 0 ? (
            <p className={styles.emptyMessage}>Nenhuma proposta cadastrada ainda.</p>
          ) : (
            <div className={styles.projectsList}>
              {recentProposals.map(p => (
                <div key={p.id} className={styles.projectItem}>
                  <div className={styles.projectInfo}>
                    <h3>{p.title}</h3>
                    <span className={`${styles.projectStatus} ${getProposalStatusClass(p.status)}`}>
                      {PROPOSAL_STATUS_LABEL[p.status] || p.status}
                    </span>
                  </div>
                  <div className={styles.projectDeadline}>
                    <FiClock />
                    <span>{p.leads?.company || p.leads?.name || '—'}</span>
                  </div>
                  <span className={styles.proposalValue}>
                    {formatCurrency(p.total_value)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Leads para Follow-up</h2>
            <Link to="/dashboard/leads" className={styles.viewAll}>Ver todos</Link>
          </div>
          {followUpLeads.length === 0 ? (
            <p className={styles.emptyMessage}>Nenhum lead ativo no momento.</p>
          ) : (
            <div className={styles.tasksList}>
              {followUpLeads.map(lead => {
                const today = new Date().toISOString().split('T')[0];
                const overdue = lead.next_action_date && lead.next_action_date < today;
                return (
                  <div key={lead.id} className={styles.taskItem}>
                    <div className={styles.taskContent}>
                      <h4>{lead.name}</h4>
                      <span className={styles.taskProject}>{lead.company || '—'}</span>
                    </div>
                    <span className={`${styles.taskPriority} ${getLeadStageClass(lead.stage)}`}>
                      {LEAD_STAGE_LABEL[lead.stage] || lead.stage}
                    </span>
                    <span className={`${styles.taskDue} ${overdue ? styles.overdue : ''}`}>
                      {lead.next_action_date ? formatDate(lead.next_action_date) : '—'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className={styles.chartsGrid}>
        <motion.div className={styles.chartCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3>Leads por Etapa</h3>
          {leadsByStageChart.length > 0
            ? <BarChart data={leadsByStageChart} height={220} />
            : <p className={styles.emptyMessage}>Sem dados suficientes</p>}
        </motion.div>

        <motion.div className={styles.chartCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3>Status das Propostas</h3>
          {proposalStatusChart.length > 0
            ? <DonutChart data={proposalStatusChart} size={180} thickness={25} />
            : <p className={styles.emptyMessage}>Sem propostas cadastradas</p>}
        </motion.div>

        <motion.div className={styles.chartCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3>Resumo</h3>
          <div className={styles.summaryList}>
            <div className={styles.summaryRow}>
              <span>Taxa de conversão</span>
              <strong>{metrics?.conversionRate || 0}%</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Ações atrasadas</span>
              <strong className={metrics?.overdueActions > 0 ? styles.overdue : ''}>{metrics?.overdueActions || 0}</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Ações esta semana</span>
              <strong>{metrics?.thisWeekActions || 0}</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Pipeline total</span>
              <strong>{formatCurrency(metrics?.pipelineValue)}</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Prospecções ativas</span>
              <strong>{metrics?.totalProspects || 0}</strong>
            </div>
          </div>
        </motion.div>
      </div>

      <div className={styles.quickActions}>
        <h2>Ações Rápidas</h2>
        <StaggerContainer staggerDelay={0.1} className={styles.actionsGrid}>
          <AnimatedItem>
            <TiltCard intensity={10}>
              <Link to="/dashboard/leads/new" className={styles.actionCard}>
                <FiUsers />
                <span>Novo Lead</span>
              </Link>
            </TiltCard>
          </AnimatedItem>
          <AnimatedItem>
            <TiltCard intensity={10}>
              <Link to="/dashboard/proposals/new" className={styles.actionCard}>
                <FiFileText />
                <span>Nova Proposta</span>
              </Link>
            </TiltCard>
          </AnimatedItem>
          <AnimatedItem>
            <TiltCard intensity={10}>
              <Link to="/dashboard/metrics" className={styles.actionCard}>
                <FiTrendingUp />
                <span>Métricas</span>
              </Link>
            </TiltCard>
          </AnimatedItem>
          <AnimatedItem>
            <TiltCard intensity={10}>
              <Link to="/dashboard/prospects" className={styles.actionCard}>
                <FiArrowUpRight />
                <span>Prospecção</span>
              </Link>
            </TiltCard>
          </AnimatedItem>
        </StaggerContainer>
      </div>
    </div>
  );
};

export default DashboardHome;
