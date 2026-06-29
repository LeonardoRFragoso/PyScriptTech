import React, { useState, useMemo } from 'react';
import {
  FiX, FiCheck, FiCopy, FiDownload, FiFileText, FiExternalLink,
  FiAlertTriangle, FiLoader, FiRefreshCw, FiMail, FiArrowRight
} from 'react-icons/fi';
import { generateProFlowPayload } from '../../../services/database';
import { createProFlowProject, resendProFlowInvite } from '../../../services/proflowIntegration';
import styles from './ProFlowModal.module.css';

const ProFlowModal = ({ proposal, lead, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const { payload, markdown, checklist } = useMemo(() => generateProFlowPayload(proposal, lead), [proposal, lead]);
  const proposalTitle = proposal.title;

  const isIntegrated = proposal.proflow_sync_status === 'success' && proposal.proflow_project_id;
  const canResendInvite = isIntegrated && proposal.proflow_client_status === 'invited';

  const validationErrors = useMemo(() => {
    const errors = [];
    if (proposal.status !== 'accepted') errors.push('A proposta deve estar com status "Aceita".');
    if (!lead.email?.trim()) errors.push('Lead não possui email.');
    if (!lead.name?.trim()) errors.push('Lead não possui nome.');
    if (!proposal.title?.trim()) errors.push('Proposta não possui título.');
    if (!proposal.scope?.trim() && !lead.problem?.trim()) errors.push('Proposta não possui escopo.');
    if (!proposal.total_value || Number(proposal.total_value) <= 0) errors.push('Proposta não possui valor válido.');
    if (!proposal.valid_until) errors.push('Proposta não possui data de prazo.');
    if (isIntegrated) errors.push('Projeto já foi criado na ProFlow.');
    return errors;
  }, [proposal, lead, isIntegrated]);

  const handleCopy = () => {
    const text = activeTab === 'payload' ? JSON.stringify(payload, null, 2) : activeTab === 'checklist' ? checklist : markdown;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `proflow-${proposalTitle?.replace(/\s+/g, '-').toLowerCase() || 'projeto'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCreate = async () => {
    if (validationErrors.length > 0) return;
    setLoading(true);
    setError(null);
    try {
      const data = await createProFlowProject(proposal.id, lead.id);
      setResult(data);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      setError({
        message: err.message || 'Erro ao criar projeto na ProFlow',
        details: err?.details || err?.error || '',
        http_status: err?.status || err?.http_status || '',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendInvite = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    setError(null);
    try {
      await resendProFlowInvite(proposal.id);
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 3000);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError({
        message: err.message || 'Erro ao reenviar convite',
        details: err?.details || err?.error || '',
      });
    } finally {
      setResendLoading(false);
    }
  };

  const renderPreview = () => (
    <div className={styles.preview}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <FiLoader className={styles.spinLarge} />
          <p>Criando projeto na ProFlow...</p>
          <small>Aguarde enquanto a Edge Function chama a API da ProFlow.</small>
        </div>
      )}
      <div className={styles.previewSection}>
        <h4>Cliente</h4>
        <p><strong>{lead.name}</strong></p>
        <p>{lead.email}</p>
        <p>{lead.company || 'Empresa não informada'}</p>
        <p>{lead.phone || 'Telefone não informado'}</p>
      </div>
      <div className={styles.previewSection}>
        <h4>Projeto</h4>
        <p><strong>{payload.project.title}</strong></p>
        <p>Categoria: {payload.project.category} / {payload.project.subcategory}</p>
        <p>Valor: {payload.project.budget.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        <p>Prazo: {new Date(payload.project.deadline).toLocaleDateString('pt-BR')}</p>
        <p>Visibilidade: {payload.project.visibility}</p>
      </div>
      <div className={styles.previewSection}>
        <h4>Milestones ({payload.milestones.length})</h4>
        <ul className={styles.milestoneList}>
          {payload.milestones.map((m, index) => (
            <li key={index}>
              <span>{m.title}</span>
              <span>{m.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </li>
          ))}
        </ul>
      </div>
      {validationErrors.length > 0 && (
        <div className={styles.validationErrors}>
          <FiAlertTriangle /> Pendências antes de criar:
          <ul>
            {validationErrors.map((err, idx) => <li key={idx}>{err}</li>)}
          </ul>
        </div>
      )}
    </div>
  );

  const renderSuccess = () => (
    <div className={styles.successState}>
      <div className={styles.successIcon}><FiCheck /></div>
      <h3>Projeto criado na ProFlow</h3>
      <div className={styles.successDetails}>
        <p><strong>ID do projeto:</strong> {result?.project_id || proposal.proflow_project_id}</p>
        <p><strong>Email do cliente:</strong> {result?.client_email || proposal.proflow_client_email}</p>
        <p><strong>Status do cliente:</strong> {result?.client_status || proposal.proflow_client_status}</p>
        <p><strong>Convite enviado:</strong> {(result?.invitation_sent || proposal.proflow_invitation_sent) ? 'Sim' : 'Não'}</p>
      </div>
      <div className={styles.portalActions}>
        <a
          href={result?.portal_url || proposal.proflow_portal_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.portalButton}
        >
          <FiExternalLink /> Abrir portal
        </a>
        <button className={styles.copyButton} onClick={() => {
          navigator.clipboard.writeText(result?.portal_url || proposal.proflow_portal_url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}>
          {copied ? 'Copiado!' : <><FiCopy /> Copiar link</>}
        </button>
      </div>
      {canResendInvite && (
        <button className={styles.resendButton} onClick={handleResendInvite} disabled={resendLoading}>
          {resendLoading ? <><FiLoader className={styles.spin} /> Enviando...</> : <><FiMail /> Reenviar convite</>}
        </button>
      )}
      {resendSuccess && <p className={styles.resendSuccess}>Convite reenviado com sucesso.</p>}
    </div>
  );

  const renderIntegrated = () => (
    <div className={styles.successState}>
      <div className={styles.successIcon}><FiCheck /></div>
      <h3>Projeto já integrado</h3>
      <div className={styles.successDetails}>
        <p><strong>ID do projeto:</strong> {proposal.proflow_project_id}</p>
        <p><strong>Email do cliente:</strong> {proposal.proflow_client_email}</p>
        <p><strong>Status do cliente:</strong> {proposal.proflow_client_status}</p>
        <p><strong>Convite enviado:</strong> {proposal.proflow_invitation_sent ? 'Sim' : 'Não'}</p>
        <p><strong>Integrado em:</strong> {proposal.proflow_synced_at ? new Date(proposal.proflow_synced_at).toLocaleString('pt-BR') : '-'}</p>
      </div>
      <div className={styles.portalActions}>
        <a
          href={proposal.proflow_portal_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.portalButton}
        >
          <FiExternalLink /> Abrir portal
        </a>
        <button className={styles.copyButton} onClick={() => {
          navigator.clipboard.writeText(proposal.proflow_portal_url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}>
          {copied ? 'Copiado!' : <><FiCopy /> Copiar link</>}
        </button>
      </div>
      {canResendInvite && (
        <button className={styles.resendButton} onClick={handleResendInvite} disabled={resendLoading}>
          {resendLoading ? <><FiLoader className={styles.spin} /> Enviando...</> : <><FiMail /> Reenviar convite</>}
        </button>
      )}
      {resendSuccess && <p className={styles.resendSuccess}>Convite reenviado com sucesso.</p>}
    </div>
  );

  const renderError = () => (
    <div className={styles.errorState}>
      <div className={styles.errorIcon}><FiAlertTriangle /></div>
      <h3>Falha na integração</h3>
      <p>{error.message}</p>
      {error.details && <pre className={styles.errorDetails}>{error.details}</pre>}
      {error.http_status && <p className={styles.errorStatus}>HTTP {error.http_status}</p>}
      <div className={styles.errorActions}>
        <button className={styles.retryButton} onClick={handleCreate} disabled={loading}>
          {loading ? <><FiLoader className={styles.spin} /> Tentando...</> : <><FiRefreshCw /> Tentar novamente</>}
        </button>
        <button className={styles.copyButton} onClick={() => {
          navigator.clipboard.writeText(JSON.stringify(error, null, 2));
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}>
          {copied ? 'Copiado!' : <><FiCopy /> Copiar erro</>}
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h2>{isIntegrated ? 'Projeto na ProFlow' : 'Criar projeto na ProFlow'}</h2>
            <p>Proposta aprovada: {proposalTitle}</p>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className={styles.tabs}>
          <button className={activeTab === 'preview' ? styles.activeTab : ''} onClick={() => setActiveTab('preview')}>
            <FiFileText /> Preview
          </button>
          <button className={activeTab === 'payload' ? styles.activeTab : ''} onClick={() => setActiveTab('payload')}>
            <FiFileText /> JSON
          </button>
          <button className={activeTab === 'markdown' ? styles.activeTab : ''} onClick={() => setActiveTab('markdown')}>
            <FiFileText /> Markdown
          </button>
          <button className={activeTab === 'checklist' ? styles.activeTab : ''} onClick={() => setActiveTab('checklist')}>
            <FiCheck /> Checklist
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'preview' && (
            isIntegrated ? renderIntegrated() : result ? renderSuccess() : error ? renderError() : renderPreview()
          )}
          {activeTab === 'payload' && <pre>{JSON.stringify(payload, null, 2)}</pre>}
          {activeTab === 'markdown' && <pre>{markdown}</pre>}
          {activeTab === 'checklist' && (
            <div className={styles.checklist}>
              {checklist.split('\n').map((line, index) => (
                <div key={index} className={styles.checklistItem}>{line}</div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.actions}>
          {activeTab === 'preview' && !isIntegrated && !result && !error && (
            <button
              className={styles.createButton}
              onClick={handleCreate}
              disabled={loading || validationErrors.length > 0}
            >
              {loading ? <><FiLoader className={styles.spin} /> Criando...</> : <><FiArrowRight /> Criar projeto real na ProFlow</>}
            </button>
          )}
          {activeTab === 'preview' && error && (
            <button className={styles.retryButton} onClick={handleCreate} disabled={loading}>
              {loading ? <><FiLoader className={styles.spin} /> Tentando...</> : <><FiRefreshCw /> Tentar novamente</>}
            </button>
          )}
          {activeTab !== 'preview' && (
            <button className={styles.copyButton} onClick={handleCopy}>
              {copied ? 'Copiado!' : <><FiCopy /> Copiar</>}
            </button>
          )}
          <button className={styles.downloadButton} onClick={handleDownload}>
            <FiDownload /> Baixar Markdown
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProFlowModal;
