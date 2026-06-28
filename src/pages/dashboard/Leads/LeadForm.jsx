import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiArrowLeft, FiX, FiPlus, FiTrash2, FiCalendar, FiClock } from 'react-icons/fi';
import { getLeadById, createLead, updateLead, getLeadActivities, createLeadActivity, deleteLeadActivity } from '../../../services/database';
import styles from './LeadForm.module.css';

const PIPELINE_STAGES = [
  { id: 'novo', label: 'Novo Lead' },
  { id: 'contato', label: 'Contato Realizado' },
  { id: 'diagnostico', label: 'Diagnóstico Agendado' },
  { id: 'proposta', label: 'Proposta Enviada' },
  { id: 'negociacao', label: 'Negociação' },
  { id: 'fechado', label: 'Fechado' },
  { id: 'perdido', label: 'Perdido' },
];

const INTEREST_OPTIONS = ['IA', 'Automação', 'ERP', 'CRM', 'Integrações', 'Dashboard', 'Sistema Corporativo'];
const SEGMENT_OPTIONS = ['Logística', 'Transporte', 'Saúde', 'Serviços', 'Indústria', 'Varejo', 'Tecnologia', 'Outro'];
const EMPLOYEE_OPTIONS = ['1-10', '11-20', '21-50', '51-100', '101-200', '200+'];
const SOURCE_OPTIONS = ['Landing Page', 'Formulário Contato', 'WhatsApp', 'LinkedIn', 'Indicação', 'Google Ads', 'Orgânico', 'Outro'];

const PRIORITY_OPTIONS = [
  { id: 'high', label: 'Alta' },
  { id: 'medium', label: 'Média' },
  { id: 'low', label: 'Baixa' },
];

const ACTIVITY_TYPES = [
  { id: 'ligação', label: 'Ligação' },
  { id: 'email', label: 'Email' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'reunião', label: 'Reunião' },
  { id: 'proposta', label: 'Proposta' },
  { id: 'anotação', label: 'Anotação' },
];

const emptyLead = {
  name: '',
  company: '',
  role: '',
  segment: '',
  employees: '',
  problem: '',
  systems: '',
  interests: [],
  email: '',
  phone: '',
  stage: 'novo',
  source: 'Formulário Contato',
  estimated_value: '',
  priority: 'medium',
  notes: '',
  next_action: '',
  next_action_date: '',
};

const emptyActivity = {
  type: 'anotação',
  description: '',
  next_action: '',
  next_action_date: '',
};

const LeadForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [lead, setLead] = useState(emptyLead);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState(emptyActivity);
  const [savingActivity, setSavingActivity] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (isEditing) {
        try {
          setLoading(true);
          const found = await getLeadById(id);
          if (found) {
            setLead({ ...emptyLead, ...found });
            const acts = await getLeadActivities(id);
            setActivities(acts || []);
          }
        } catch (error) {
          console.error('Error loading lead:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadData();
  }, [id, isEditing]);

  const validate = () => {
    const newErrors = {};
    if (!lead.name.trim()) newErrors.name = 'Nome obrigatório';
    if (!lead.email.trim()) newErrors.email = 'Email obrigatório';
    if (!lead.company.trim()) newErrors.company = 'Empresa obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const leadData = {
        ...lead,
        estimated_value: Number(lead.estimated_value) || 0,
      };

      if (isEditing) {
        await updateLead(id, leadData);
      } else {
        await createLead(leadData);
      }
      navigate('/dashboard/leads');
    } catch (error) {
      console.error('Error saving lead:', error);
      setErrors({ submit: 'Erro ao salvar lead. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setLead(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest) => {
    setLead(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    if (!newActivity.description.trim()) return;

    try {
      setSavingActivity(true);
      await createLeadActivity({
        lead_id: id,
        ...newActivity,
      });

      // Atualiza lead com próxima ação
      if (newActivity.next_action || newActivity.next_action_date) {
        await updateLead(id, {
          next_action: newActivity.next_action,
          next_action_date: newActivity.next_action_date,
        });
        setLead(prev => ({
          ...prev,
          next_action: newActivity.next_action,
          next_action_date: newActivity.next_action_date,
        }));
      }

      const acts = await getLeadActivities(id);
      setActivities(acts || []);
      setNewActivity(emptyActivity);
    } catch (error) {
      console.error('Error adding activity:', error);
    } finally {
      setSavingActivity(false);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    if (!window.confirm('Excluir esta atividade?')) return;
    try {
      await deleteLeadActivity(activityId);
      const acts = await getLeadActivities(id);
      setActivities(acts || []);
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  if (loading && isEditing) {
    return <div className={styles.container}>Carregando lead...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/dashboard/leads')}>
          <FiArrowLeft /> Voltar
        </button>
        <h1>{isEditing ? 'Editar Lead' : 'Novo Lead'}</h1>
      </div>

      {errors.submit && <div className={styles.errorBanner}>{errors.submit}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <h2>Informações Pessoais</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Nome *</label>
              <input
                type="text"
                value={lead.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Nome completo"
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>
            <div className={styles.field}>
              <label>Email *</label>
              <input
                type="email"
                value={lead.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="email@empresa.com"
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
            <div className={styles.field}>
              <label>Telefone</label>
              <input
                type="tel"
                value={lead.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="(21) 99999-9999"
              />
            </div>
            <div className={styles.field}>
              <label>Cargo</label>
              <input
                type="text"
                value={lead.role}
                onChange={(e) => handleChange('role', e.target.value)}
                placeholder="Diretor, Gestor, etc"
              />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Informações da Empresa</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Empresa *</label>
              <input
                type="text"
                value={lead.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="Razão social"
              />
              {errors.company && <span className={styles.error}>{errors.company}</span>}
            </div>
            <div className={styles.field}>
              <label>Segmento</label>
              <select value={lead.segment} onChange={(e) => handleChange('segment', e.target.value)}>
                <option value="">Selecione</option>
                {SEGMENT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label>Número de Funcionários</label>
              <select value={lead.employees} onChange={(e) => handleChange('employees', e.target.value)}>
                <option value="">Selecione</option>
                {EMPLOYEE_OPTIONS.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label>Fonte</label>
              <select value={lead.source} onChange={(e) => handleChange('source', e.target.value)}>
                {SOURCE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Contexto e Interesse</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Principal Problema Operacional</label>
              <textarea
                value={lead.problem}
                onChange={(e) => handleChange('problem', e.target.value)}
                placeholder="Descreva o problema principal que o lead quer resolver"
                rows={4}
              />
            </div>
            <div className={styles.field}>
              <label>Sistemas Utilizados</label>
              <textarea
                value={lead.systems}
                onChange={(e) => handleChange('systems', e.target.value)}
                placeholder="ERP, CRM, planilhas, etc"
                rows={4}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Interesse</label>
            <div className={styles.interestGrid}>
              {INTEREST_OPTIONS.map(option => (
                <button
                  key={option}
                  type="button"
                  className={`${styles.interestButton} ${lead.interests.includes(option) ? styles.selected : ''}`}
                  onClick={() => toggleInterest(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Pipeline, Valor e Prioridade</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Etapa do Funil</label>
              <select value={lead.stage} onChange={(e) => handleChange('stage', e.target.value)}>
                {PIPELINE_STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label>Prioridade</label>
              <select value={lead.priority} onChange={(e) => handleChange('priority', e.target.value)}>
                {PRIORITY_OPTIONS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label>Valor Estimado (R$)</label>
              <input
                type="number"
                value={lead.estimated_value}
                onChange={(e) => handleChange('estimated_value', e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div className={styles.field}>
              <label>Próxima Ação</label>
              <input
                type="text"
                value={lead.next_action}
                onChange={(e) => handleChange('next_action', e.target.value)}
                placeholder="Ex: Enviar proposta, ligar..."
              />
            </div>
            <div className={styles.field}>
              <label>Data da Próxima Ação</label>
              <input
                type="date"
                value={lead.next_action_date}
                onChange={(e) => handleChange('next_action_date', e.target.value)}
              />
            </div>
          </div>
          <div className={styles.field}>
            <label>Anotações</label>
            <textarea
              value={lead.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Registre conversas, próximos passos e observações"
              rows={5}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelButton} onClick={() => navigate('/dashboard/leads')}>
            <FiX /> Cancelar
          </button>
          <button type="submit" className={styles.saveButton} disabled={loading}>
            <FiSave /> {loading ? 'Salvando...' : 'Salvar Lead'}
          </button>
        </div>
      </form>

      {isEditing && (
        <div className={styles.section}>
          <h2>Histórico de Atividades</h2>

          <form className={styles.activityForm} onSubmit={handleAddActivity}>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>Tipo</label>
                <select value={newActivity.type} onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}>
                  {ACTIVITY_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </div>
              <div className={styles.field}>
                <label>Próxima Ação</label>
                <input
                  type="text"
                  value={newActivity.next_action}
                  onChange={(e) => setNewActivity({ ...newActivity, next_action: e.target.value })}
                  placeholder="Próximo passo"
                />
              </div>
              <div className={styles.field}>
                <label>Data da Próxima Ação</label>
                <input
                  type="date"
                  value={newActivity.next_action_date}
                  onChange={(e) => setNewActivity({ ...newActivity, next_action_date: e.target.value })}
                />
              </div>
            </div>
            <div className={styles.field}>
              <label>Descrição</label>
              <textarea
                value={newActivity.description}
                onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                placeholder="Descreva o que foi conversado..."
                rows={3}
              />
            </div>
            <button type="submit" className={styles.addActivityButton} disabled={savingActivity}>
              <FiPlus /> {savingActivity ? 'Salvando...' : 'Adicionar Atividade'}
            </button>
          </form>

          <div className={styles.activitiesList}>
            {activities.length === 0 ? (
              <p className={styles.emptyActivities}>Nenhuma atividade registrada.</p>
            ) : (
              activities.map(activity => (
                <div key={activity.id} className={styles.activityItem}>
                  <div className={styles.activityHeader}>
                    <span className={styles.activityType}>{ACTIVITY_TYPES.find(t => t.id === activity.type)?.label || activity.type}</span>
                    <span className={styles.activityDate}>
                      <FiCalendar /> {new Date(activity.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className={styles.activityDescription}>{activity.description}</p>
                  {(activity.next_action || activity.next_action_date) && (
                    <div className={styles.activityNextAction}>
                      <FiClock /> {activity.next_action} {activity.next_action_date && `— ${new Date(activity.next_action_date).toLocaleDateString('pt-BR')}`}
                    </div>
                  )}
                  <button className={styles.deleteActivityButton} onClick={() => handleDeleteActivity(activity.id)}>
                    <FiTrash2 />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadForm;
