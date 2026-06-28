import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMetrics, getLeads, getProspectCompanies } from '../../../services/database';
import styles from './MetricsDashboard.module.css';

const MetricsDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [overdueActions, setOverdueActions] = useState([]);
  const [weekActions, setWeekActions] = useState([]);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setLoading(true);
        const data = await getMetrics();
        setMetrics(data);

        const today = new Date().toISOString().split('T')[0];
        const leads = await getLeads();
        const prospects = await getProspectCompanies();

        const allActions = [
          ...leads
            .filter(l => l.next_action_date)
            .map(l => ({ type: 'lead', name: l.name, company: l.company, action: l.next_action, date: l.next_action_date })),
          ...prospects
            .filter(p => p.next_contact_at)
            .map(p => ({ type: 'prospect', name: p.company_name, company: '', action: p.next_action, date: p.next_contact_at })),
        ];

        setOverdueActions(allActions.filter(a => a.date < today).sort((a, b) => new Date(a.date) - new Date(b.date)));

        const oneWeek = new Date();
        oneWeek.setDate(oneWeek.getDate() + 7);
        setWeekActions(allActions.filter(a => a.date >= today && a.date <= oneWeek.toISOString().split('T')[0]).sort((a, b) => new Date(a.date) - new Date(b.date)));
      } catch (error) {
        console.error('Error loading metrics:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMetrics();
  }, []);

  if (loading) {
    return <div className={styles.container}>Carregando métricas...</div>;
  }

  if (!metrics) {
    return <div className={styles.container}>Erro ao carregar métricas.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Dashboard de Métricas</h1>
        <p>Acompanhamento real do funil comercial</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{metrics.totalLeads}</span>
          <span className={styles.statLabel}>Total de Leads</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{metrics.pipelineValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          <span className={styles.statLabel}>Valor em Pipeline</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{metrics.closedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          <span className={styles.statLabel}>Valor Fechado</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{metrics.totalProposals}</span>
          <span className={styles.statLabel}>Total de Propostas</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{metrics.proposalsSent}</span>
          <span className={styles.statLabel}>Propostas Enviadas</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{metrics.proposalsAccepted}</span>
          <span className={styles.statLabel}>Propostas Aceitas</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{metrics.conversionRate}%</span>
          <span className={styles.statLabel}>Taxa de Conversão</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{metrics.totalProspects}</span>
          <span className={styles.statLabel}>Empresas Prospectadas</span>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.section}>
          <h2>Leads por Etapa</h2>
          <div className={styles.list}>
            {Object.entries(metrics.leadsByStage).map(([stage, count]) => (
              <div key={stage} className={styles.listItem}>
                <span className={styles.stageName}>{stage}</span>
                <span className={styles.stageCount}>{count}</span>
              </div>
            ))}
            {Object.keys(metrics.leadsByStage).length === 0 && <p className={styles.empty}>Nenhum lead registrado.</p>}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Leads por Fonte</h2>
          <div className={styles.list}>
            {Object.entries(metrics.leadsBySource).map(([source, count]) => (
              <div key={source} className={styles.listItem}>
                <span>{source || 'Desconhecida'}</span>
                <span className={styles.stageCount}>{count}</span>
              </div>
            ))}
            {Object.keys(metrics.leadsBySource).length === 0 && <p className={styles.empty}>Nenhuma fonte registrada.</p>}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Prospects por Status</h2>
          <div className={styles.list}>
            {Object.entries(metrics.prospectsByStatus).map(([status, count]) => (
              <div key={status} className={styles.listItem}>
                <span>{status}</span>
                <span className={styles.stageCount}>{count}</span>
              </div>
            ))}
            {Object.keys(metrics.prospectsByStatus).length === 0 && <p className={styles.empty}>Nenhum prospect registrado.</p>}
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.section}>
          <h2>Próximas Ações da Semana ({weekActions.length})</h2>
          <div className={styles.actionList}>
            {weekActions.map((action, index) => (
              <div key={index} className={styles.actionItem}>
                <div className={styles.actionInfo}>
                  <strong>{action.name}</strong>
                  <span>{action.company}</span>
                </div>
                <div className={styles.actionDetail}>
                  <span>{action.action}</span>
                  <span className={styles.actionDate}>{new Date(action.date).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            ))}
            {weekActions.length === 0 && <p className={styles.empty}>Nenhuma ação para esta semana.</p>}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Ações Atrasadas ({overdueActions.length})</h2>
          <div className={styles.actionList}>
            {overdueActions.map((action, index) => (
              <div key={index} className={`${styles.actionItem} ${styles.overdue}`}>
                <div className={styles.actionInfo}>
                  <strong>{action.name}</strong>
                  <span>{action.company}</span>
                </div>
                <div className={styles.actionDetail}>
                  <span>{action.action}</span>
                  <span className={styles.actionDate}>{new Date(action.date).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            ))}
            {overdueActions.length === 0 && <p className={styles.empty}>Nenhuma ação atrasada.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
