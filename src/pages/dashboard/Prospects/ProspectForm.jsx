import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiArrowLeft, FiX, FiUserPlus } from 'react-icons/fi';
import { getProspectCompanyById, createProspectCompany, updateProspectCompany, createLead } from '../../../services/database';
import styles from './ProspectForm.module.css';

const STATUS_OPTIONS = [
  { id: 'não_contatada', label: 'Não Contatada' },
  { id: 'conexão_enviada', label: 'Conexão Enviada' },
  { id: 'respondeu', label: 'Respondeu' },
  { id: 'diagnóstico_agendado', label: 'Diagnóstico Agendado' },
  { id: 'proposta_enviada', label: 'Proposta Enviada' },
  { id: 'negociação', label: 'Negociação' },
  { id: 'fechada', label: 'Fechada' },
  { id: 'perdida', label: 'Perdida' },
  { id: 'sem_fit', label: 'Sem Fit' },
];

const POTENTIAL_OPTIONS = [
  { id: 'baixo', label: 'Baixo' },
  { id: 'médio', label: 'Médio' },
  { id: 'alto', label: 'Alto' },
];

const SEGMENT_OPTIONS = ['Logística', 'Transporte', 'Saúde', 'Serviços', 'Indústria', 'Varejo', 'Tecnologia', 'Outro'];

const emptyProspect = {
  company_name: '',
  segment: '',
  city: 'Rio de Janeiro',
  potential: 'médio',
  suggested_approach: '',
  decision_maker_name: '',
  decision_maker_role: '',
  linkedin_url: '',
  website: '',
  email: '',
  phone: '',
  status: 'não_contatada',
  last_contact_at: '',
  next_contact_at: '',
  next_action: '',
  notes: '',
};

const ProspectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [prospect, setProspect] = useState(emptyProspect);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (isEditing) {
        try {
          setLoading(true);
          const found = await getProspectCompanyById(id);
          if (found) setProspect({ ...emptyProspect, ...found });
        } catch (error) {
          console.error('Error loading prospect:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadData();
  }, [id, isEditing]);

  const handleChange = (field, value) => {
    setProspect(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!prospect.company_name.trim()) newErrors.company_name = 'Nome da empresa obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      if (isEditing) {
        await updateProspectCompany(id, prospect);
      } else {
        await createProspectCompany(prospect);
      }
      navigate('/dashboard/prospects');
    } catch (error) {
      console.error('Error saving prospect:', error);
      setErrors({ submit: 'Erro ao salvar empresa.' });
    } finally {
      setLoading(false);
    }
  };

  const handleConvertToLead = async () => {
    if (!window.confirm('Converter esta empresa em lead?')) return;
    try {
      setConverting(true);
      const today = new Date().toISOString().split('T')[0];
      await createLead({
        name: prospect.decision_maker_name || prospect.company_name,
        email: prospect.email || 'Não informado',
        phone: prospect.phone || '',
        company: prospect.company_name,
        role: prospect.decision_maker_role || '',
        segment: prospect.segment,
        employees: '',
        problem: prospect.suggested_approach || 'Convertido da prospecção',
        systems: '',
        interests: [prospect.segment || 'Prospect'],
        stage: 'novo',
        source: 'Prospecção Ativa',
        estimated_value: 0,
        priority: 'medium',
        next_action: prospect.next_action || 'Entrar em contato',
        next_action_date: prospect.next_contact_at || today,
        notes: prospect.notes,
      });

      await updateProspectCompany(id, { ...prospect, status: 'diagnóstico_agendado' });
      navigate('/dashboard/leads');
    } catch (error) {
      console.error('Error converting prospect:', error);
      setErrors({ submit: 'Erro ao converter em lead.' });
    } finally {
      setConverting(false);
    }
  };

  if (loading && isEditing) {
    return <div className={styles.container}>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/dashboard/prospects')}>
          <FiArrowLeft /> Voltar
        </button>
        <h1>{isEditing ? 'Editar Empresa' : 'Nova Empresa'}</h1>
      </div>

      {errors.submit && <div className={styles.errorBanner}>{errors.submit}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <h2>Dados da Empresa</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Empresa *</label>
              <input
                type="text"
                value={prospect.company_name}
                onChange={(e) => handleChange('company_name', e.target.value)}
                placeholder="Nome da empresa"
              />
              {errors.company_name && <span className={styles.error}>{errors.company_name}</span>}
            </div>
            <div className={styles.field}>
              <label>Segmento</label>
              <select value={prospect.segment} onChange={(e) => handleChange('segment', e.target.value)}>
                <option value="">Selecione</option>
                {SEGMENT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label>Cidade</label>
              <input
                type="text"
                value={prospect.city}
                onChange={(e) => handleChange('city', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Potencial</label>
              <select value={prospect.potential} onChange={(e) => handleChange('potential', e.target.value)}>
                {POTENTIAL_OPTIONS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Decisor</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Nome do Decisor</label>
              <input
                type="text"
                value={prospect.decision_maker_name}
                onChange={(e) => handleChange('decision_maker_name', e.target.value)}
                placeholder="Preencher manualmente"
              />
            </div>
            <div className={styles.field}>
              <label>Cargo do Decisor</label>
              <input
                type="text"
                value={prospect.decision_maker_role}
                onChange={(e) => handleChange('decision_maker_role', e.target.value)}
                placeholder="Ex: Diretor de Operações"
              />
            </div>
            <div className={styles.field}>
              <label>LinkedIn</label>
              <input
                type="url"
                value={prospect.linkedin_url}
                onChange={(e) => handleChange('linkedin_url', e.target.value)}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div className={styles.field}>
              <label>Website</label>
              <input
                type="url"
                value={prospect.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                value={prospect.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Preencher manualmente"
              />
            </div>
            <div className={styles.field}>
              <label>Telefone</label>
              <input
                type="tel"
                value={prospect.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Preencher manualmente"
              />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Abordagem</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Status</label>
              <select value={prospect.status} onChange={(e) => handleChange('status', e.target.value)}>
                {STATUS_OPTIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label>Último Contato</label>
              <input
                type="date"
                value={prospect.last_contact_at}
                onChange={(e) => handleChange('last_contact_at', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Próximo Contato</label>
              <input
                type="date"
                value={prospect.next_contact_at}
                onChange={(e) => handleChange('next_contact_at', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Próxima Ação</label>
              <input
                type="text"
                value={prospect.next_action}
                onChange={(e) => handleChange('next_action', e.target.value)}
                placeholder="Ex: Enviar conexão LinkedIn"
              />
            </div>
          </div>
          <div className={styles.field}>
            <label>Abordagem Sugerida</label>
            <textarea
              value={prospect.suggested_approach}
              onChange={(e) => handleChange('suggested_approach', e.target.value)}
              placeholder="Por que esta empresa é um bom prospecto?"
              rows={3}
            />
          </div>
          <div className={styles.field}>
            <label>Anotações</label>
            <textarea
              value={prospect.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Resultados de contatos, recusas, etc"
              rows={4}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelButton} onClick={() => navigate('/dashboard/prospects')}>
            <FiX /> Cancelar
          </button>
          {isEditing && (
            <button type="button" className={styles.convertButton} onClick={handleConvertToLead} disabled={converting}>
              <FiUserPlus /> {converting ? 'Convertendo...' : 'Converter em Lead'}
            </button>
          )}
          <button type="submit" className={styles.saveButton} disabled={loading}>
            <FiSave /> {loading ? 'Salvando...' : 'Salvar Empresa'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProspectForm;
