import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiArrowLeft, FiX, FiPlus, FiTrash2, FiCopy, FiCheck } from 'react-icons/fi';
import { getLeads, getProposalById, createProposal, updateProposal, generateProposalText } from '../../../services/database';
import styles from './ProposalForm.module.css';

const STATUS_OPTIONS = [
  { id: 'draft', label: 'Rascunho' },
  { id: 'sent', label: 'Enviada' },
  { id: 'accepted', label: 'Aceita' },
  { id: 'rejected', label: 'Rejeitada' },
  { id: 'expired', label: 'Expirada' },
];

const emptyProposal = {
  lead_id: '',
  title: '',
  scope: '',
  items: [],
  total_value: 0,
  status: 'draft',
  valid_until: '',
  meeting_date: '',
  payment_terms: '',
  manager_notes: '',
};

const emptyItem = { description: '', value: '', due_date: '' };

const ProposalForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [proposal, setProposal] = useState(emptyProposal);
  const [leads, setLeads] = useState([]);
  const [item, setItem] = useState(emptyItem);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const leadsData = await getLeads();
        setLeads(leadsData || []);

        if (isEditing) {
          const found = await getProposalById(id);
          if (found) {
            setProposal({
              ...emptyProposal,
              ...found,
              items: found.items || [],
              total_value: found.total_value || 0,
            });
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, [id, isEditing]);

  const recalculateTotal = (items) => {
    return items.reduce((sum, i) => sum + (Number(i.value) || 0), 0);
  };

  const addItem = () => {
    if (!item.description.trim() || !item.value) return;
    const newItems = [...proposal.items, { ...item, value: Number(item.value) }];
    setProposal(prev => ({
      ...prev,
      items: newItems,
      total_value: recalculateTotal(newItems),
    }));
    setItem(emptyItem);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  const removeItem = (index) => {
    const newItems = proposal.items.filter((_, i) => i !== index);
    setProposal(prev => ({
      ...prev,
      items: newItems,
      total_value: recalculateTotal(newItems),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!proposal.lead_id) newErrors.lead_id = 'Selecione um lead';
    if (!proposal.title.trim()) newErrors.title = 'Título obrigatório';
    if (!proposal.scope.trim()) newErrors.scope = 'Escopo obrigatório';
    if (proposal.items.length === 0) newErrors.items = 'Adicione pelo menos um item';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const proposalData = {
        ...proposal,
        total_value: Number(proposal.total_value) || 0,
      };

      if (isEditing) {
        await updateProposal(id, proposalData);
      } else {
        await createProposal(proposalData);
      }
      navigate('/dashboard/proposals');
    } catch (error) {
      console.error('Error saving proposal:', error);
      setErrors({ submit: 'Erro ao salvar proposta.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = () => {
    const lead = leads.find(l => l.id === proposal.lead_id) || { name: '', company: '' };
    const text = generateProposalText(proposal, lead);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/dashboard/proposals')}>
          <FiArrowLeft /> Voltar
        </button>
        <h1>{isEditing ? 'Editar Proposta' : 'Nova Proposta'}</h1>
      </div>

      {errors.submit && <div className={styles.errorBanner}>{errors.submit}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <h2>Informações da Proposta</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Lead *</label>
              <select value={proposal.lead_id} onChange={(e) => setProposal({ ...proposal, lead_id: e.target.value })}>
                <option value="">Selecione um lead</option>
                {leads.map(lead => (
                  <option key={lead.id} value={lead.id}>{lead.name} - {lead.company}</option>
                ))}
              </select>
              {errors.lead_id && <span className={styles.error}>{errors.lead_id}</span>}
            </div>
            <div className={styles.field}>
              <label>Título *</label>
              <input
                type="text"
                value={proposal.title}
                onChange={(e) => setProposal({ ...proposal, title: e.target.value })}
                placeholder="Ex: Proposta de Automação de Processos"
              />
              {errors.title && <span className={styles.error}>{errors.title}</span>}
            </div>
            <div className={styles.field}>
              <label>Status</label>
              <select value={proposal.status} onChange={(e) => setProposal({ ...proposal, status: e.target.value })}>
                {STATUS_OPTIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label>Válida até</label>
              <input
                type="date"
                value={proposal.valid_until}
                onChange={(e) => setProposal({ ...proposal, valid_until: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <label>Data da reunião</label>
              <input
                type="date"
                value={proposal.meeting_date || ''}
                onChange={(e) => setProposal({ ...proposal, meeting_date: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Escopo / Solução Proposta *</label>
            <textarea
              value={proposal.scope}
              onChange={(e) => setProposal({ ...proposal, scope: e.target.value })}
              placeholder="Descreva a solução proposta, entregáveis e metodologia"
              rows={5}
            />
            {errors.scope && <span className={styles.error}>{errors.scope}</span>}
          </div>

          <div className={styles.field}>
            <label>Condições de pagamento</label>
            <textarea
              value={proposal.payment_terms || ''}
              onChange={(e) => setProposal({ ...proposal, payment_terms: e.target.value })}
              placeholder="Ex: 50% na assinatura, 50% na entrega final. Parcelamento em até 6x no cartão."
              rows={2}
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2>Milestones / Entregas</h2>
          <p className={styles.sectionHint}>Cada item vira um milestone no ProFlow com seu valor e prazo individuais.</p>
          <div className={styles.itemForm}>
            <div className={styles.itemGrid}>
              <div className={styles.field}>
                <label>Descrição do entregável</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => setItem({ ...item, description: e.target.value })}
                  onKeyDown={handleKeyDown}
                  placeholder="Ex: Desenvolvimento do módulo de automação"
                />
              </div>
              <div className={styles.field}>
                <label>Valor (R$)</label>
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) => setItem({ ...item, value: e.target.value })}
                  onKeyDown={handleKeyDown}
                  placeholder="0,00"
                />
              </div>
              <div className={styles.field}>
                <label>Prazo de entrega</label>
                <input
                  type="date"
                  value={item.due_date || ''}
                  onChange={(e) => setItem({ ...item, due_date: e.target.value })}
                />
              </div>
            </div>
            <button type="button" className={styles.addItemButton} onClick={addItem}>
              <FiPlus /> Adicionar Entregável
            </button>
          </div>

          {errors.items && <span className={styles.error}>{errors.items}</span>}

          <div className={styles.itemsList}>
            {proposal.items.map((it, index) => (
              <div key={index} className={styles.itemRow}>
                <span className={styles.itemDesc}>{it.description}</span>
                {it.due_date && (
                  <span className={styles.itemDate}>
                    {new Date(it.due_date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                  </span>
                )}
                <strong>{Number(it.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                <button type="button" className={styles.removeItemButton} onClick={() => removeItem(index)}>
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          <div className={styles.totalValue}>
            Total: {proposal.total_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Notas internas</h2>
          <p className={styles.sectionHint}>Visível apenas para o time PyScript — enviado ao ProFlow como <code>manager_notes</code>.</p>
          <div className={styles.field}>
            <textarea
              value={proposal.manager_notes || ''}
              onChange={(e) => setProposal({ ...proposal, manager_notes: e.target.value })}
              placeholder="Ex: Cliente quer integração com SAP na fase 2. Prioridade: módulo de relatórios."
              rows={3}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelButton} onClick={() => navigate('/dashboard/proposals')}>
            <FiX /> Cancelar
          </button>
          <button type="button" className={styles.copyButton} onClick={handleCopyText}>
            {copied ? <FiCheck /> : <FiCopy />} {copied ? 'Copiado!' : 'Copiar Texto'}
          </button>
          <button type="submit" className={styles.saveButton} disabled={loading}>
            <FiSave /> {loading ? 'Salvando...' : 'Salvar Proposta'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProposalForm;
