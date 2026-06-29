import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiCheckCircle, FiLoader, FiAlertTriangle, FiMail, FiPhone, FiFileText, FiCalendar, FiDollarSign, FiExternalLink } from 'react-icons/fi';
import { getPublicProposal, acceptPublicProposal } from '../../services/proposalPublic';
import styles from './PublicProposalPage.module.css';

const formatCurrency = (value) => {
  return Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
};

const PublicProposalPage = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proposal, setProposal] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptError, setAcceptError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadProposal = async () => {
      try {
        const data = await getPublicProposal(token);
        if (!cancelled) {
          setProposal(data.proposal);
          setAccepted(data.proposal?.status === 'accepted');
          if (data.proposal?.client?.email) {
            setEmail(data.proposal.client.email);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Não foi possível carregar a proposta.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProposal();
    return () => { cancelled = true; };
  }, [token]);

  const handleAccept = async (e) => {
    e.preventDefault();
    setAccepting(true);
    setAcceptError(null);

    try {
      await acceptPublicProposal(token, { name, email, acceptedTerms });
      setAccepted(true);
    } catch (err) {
      setAcceptError(err.message || 'Erro ao aceitar proposta.');
    } finally {
      setAccepting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <FiLoader className={styles.spin} />
        <p>Carregando proposta...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <FiAlertTriangle />
        <h2>Proposta não disponível</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className={styles.errorState}>
        <FiAlertTriangle />
        <h2>Proposta não encontrada</h2>
      </div>
    );
  }

  const { client, pyscript, items, total_value, valid_until, payment_terms, title, scope, can_accept, accepted_by_name, accepted_at } = proposal;

  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <strong>{pyscript?.company_name || 'PyScriptTech'}</strong>
        <span>Automação, IA e Sistemas Corporativos</span>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <h1>{title || 'Proposta Comercial'}</h1>
          {accepted ? (
            <span className={styles.badgeAccepted}><FiCheckCircle /> Proposta aceita</span>
          ) : (
            <span className={styles.badgePending}>Aguardando aceite</span>
          )}
        </div>

        <div className={styles.section}>
          <h2><FiFileText /> Escopo e solução</h2>
          <p>{scope || 'Escopo não informado.'}</p>
        </div>

        <div className={styles.section}>
          <h2><FiDollarSign /> Investimento</h2>
          <div className={styles.itemsList}>
            {Array.isArray(items) && items.length > 0 ? (
              items.map((item, index) => (
                <div key={index} className={styles.itemRow}>
                  <span>{item.description || item.name || `Item ${index + 1}`}</span>
                  <div className={styles.itemMeta}>
                    {item.due_date && <small>{formatDate(item.due_date)}</small>}
                    <strong>{formatCurrency(item.value)}</strong>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum item detalhado.</p>
            )}
            <div className={styles.totalRow}>
              <span>Total</span>
              <strong>{formatCurrency(total_value)}</strong>
            </div>
          </div>
        </div>

        {payment_terms && (
          <div className={styles.section}>
            <h2><FiFileText /> Condições de pagamento</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{payment_terms}</p>
          </div>
        )}

        <div className={styles.section}>
          <h2><FiCalendar /> Prazo e validade</h2>
          <p>Proposta válida até: <strong>{formatDate(valid_until)}</strong></p>
        </div>

        <div className={styles.section}>
          <h2>Para</h2>
          <p><strong>{client?.name || 'Cliente'}</strong></p>
          {client?.company && <p>{client.company}</p>}
          {client?.email && <p><FiMail /> {client.email}</p>}
          {client?.phone && <p><FiPhone /> {client.phone}</p>}
        </div>

        <div className={styles.section}>
          <h2>Próximos passos</h2>
          <p>
            Após o aceite, nossa equipe organizará o projeto no portal de execução e você receberá
            um convite para acompanhar todas as etapas.
          </p>
        </div>

        {accepted ? (
          <div className={styles.successBox}>
            <FiCheckCircle />
            <h3>Proposta aceita{accepted_by_name ? ` por ${accepted_by_name}` : ''}</h3>
            {accepted_at && <p>Aceite registrado em {formatDate(accepted_at)}.</p>}
            <p>A equipe PyScriptTech entrará em contato em breve para iniciar o onboarding.</p>
          </div>
        ) : !can_accept ? (
          <div className={styles.errorBox}>
            <FiAlertTriangle />
            <h3>Proposta não disponível para aceite</h3>
            <p>Entre em contato com a PyScriptTech para mais informações.</p>
          </div>
        ) : (
          <form className={styles.acceptForm} onSubmit={handleAccept}>
            <h2>Aceitar proposta</h2>
            <p>Preencha seus dados para confirmar o aceite digital.</p>

            <div className={styles.field}>
              <label>Nome completo *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                required
              />
            </div>

            <div className={styles.field}>
              <label>Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                required
              />
              <span>
                Declaro que li e aceito os termos desta proposta, incluindo o escopo, valores e prazo apresentados.
              </span>
            </label>

            {acceptError && <div className={styles.formError}>{acceptError}</div>}

            <button
              type="submit"
              className={styles.acceptButton}
              disabled={accepting || !name || !email || !acceptedTerms}
            >
              {accepting ? <><FiLoader className={styles.spin} /> Processando...</> : <><FiCheckCircle /> Aceitar proposta</>}
            </button>
          </form>
        )}

        <div className={styles.footer}>
          <p>
            <FiExternalLink />{' '}
            <a href="https://pyscript.tech" target="_blank" rel="noopener noreferrer">
              pyscript.tech
            </a>
          </p>
          <p>{pyscript?.phone || '(21) 98029-2791'}</p>
          <p>{pyscript?.email || 'contato@pyscript.tech'}</p>
        </div>
      </div>
    </div>
  );
};

export default PublicProposalPage;
