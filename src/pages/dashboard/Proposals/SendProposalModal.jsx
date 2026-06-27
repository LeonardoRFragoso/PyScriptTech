import React, { useState, useMemo } from 'react';
import { FiX, FiCopy, FiMail, FiMessageSquare, FiCheck, FiLoader, FiLink, FiFileText } from 'react-icons/fi';
import { generatePublicProposalLink } from '../../../services/proposalPublic';
import { buildEmailMessage, buildWhatsAppMessage, buildProposalTextSummary } from '../../../utils/proposalMessages';
import styles from './SendProposalModal.module.css';

const SendProposalModal = ({ proposal, lead, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [linkData, setLinkData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const canSend = proposal.status === 'draft' || proposal.status === 'sent';
  const isAccepted = proposal.status === 'accepted';
  const isIntegrated = proposal.proflow_project_id && proposal.proflow_sync_status === 'success';

  const messages = useMemo(() => {
    if (!linkData?.public_url) return null;
    const base = {
      clientName: lead?.name,
      proposalTitle: proposal.title,
      publicUrl: linkData.public_url,
      companyName: lead?.company,
    };
    return {
      email: buildEmailMessage(base),
      whatsapp: buildWhatsAppMessage(base),
      text: buildProposalTextSummary({
        clientName: lead?.name,
        companyName: lead?.company,
        proposalTitle: proposal.title,
        scope: proposal.scope,
        items: proposal.items,
        totalValue: proposal.total_value,
        validUntil: proposal.valid_until,
      }),
    };
  }, [linkData, proposal, lead]);

  const handleGenerateLink = async () => {
    if (isAccepted || isIntegrated) return;
    setLoading(true);
    setError(null);
    try {
      const data = await generatePublicProposalLink(proposal.id);
      setLinkData(data);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Erro ao gerar link público');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text, type = 'link') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'link') {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        setCopiedText(true);
        setTimeout(() => setCopiedText(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  const handleOpenEmail = () => {
    if (messages?.email?.mailto) {
      window.open(messages.email.mailto, '_blank');
    }
  };

  const handleOpenWhatsApp = () => {
    if (messages?.whatsapp?.whatsappUrl) {
      window.open(messages.whatsapp.whatsappUrl, '_blank');
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h2>Enviar proposta</h2>
            <p>{proposal.title}</p>
          </div>
          <button className={styles.closeButton} onClick={onClose}><FiX /></button>
        </div>

        <div className={styles.content}>
          {isAccepted ? (
            <div className={styles.infoBox}>
              <FiCheck className={styles.successIcon} />
              <p>Esta proposta já foi aceita.</p>
            </div>
          ) : isIntegrated ? (
            <div className={styles.infoBox}>
              <FiCheck className={styles.successIcon} />
              <p>Esta proposta já foi integrada na ProFlow.</p>
            </div>
          ) : !canSend ? (
            <div className={styles.errorBox}>
              <p>Proposta com status "{proposal.status}" não pode ser enviada. Envie apenas propostas em rascunho ou já enviadas.</p>
            </div>
          ) : !linkData ? (
            <div className={styles.generateSection}>
              <p>Clique abaixo para gerar um link público seguro da proposta. O cliente poderá visualizar e aceitar digitalmente.</p>
              <button className={styles.generateButton} onClick={handleGenerateLink} disabled={loading}>
                {loading ? <><FiLoader className={styles.spin} /> Gerando...</> : <><FiLink /> Gerar link público</>}
              </button>
              {error && <div className={styles.errorText}>{error}</div>}
            </div>
          ) : (
            <div className={styles.linkSection}>
              <div className={styles.linkBox}>
                <label>Link público da proposta</label>
                <div className={styles.linkRow}>
                  <input type="text" readOnly value={linkData.public_url} />
                  <button onClick={() => handleCopy(linkData.public_url, 'link')}>
                    {copied ? <><FiCheck /> Copiado</> : <><FiCopy /> Copiar</>}
                  </button>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.emailButton} onClick={handleOpenEmail} disabled={!messages?.email}>
                  <FiMail /> Abrir e-mail
                </button>
                <button className={styles.whatsappButton} onClick={handleOpenWhatsApp} disabled={!messages?.whatsapp}>
                  <FiMessageSquare /> Abrir WhatsApp
                </button>
                <button className={styles.textButton} onClick={() => handleCopy(messages?.text, 'text')}>
                  {copiedText ? <><FiCheck /> Copiado</> : <><FiFileText /> Copiar texto</>}
                </button>
              </div>

              {messages?.email && (
                <div className={styles.preview}>
                  <h3>Preview do e-mail</h3>
                  <p><strong>Assunto:</strong> {messages.email.subject}</p>
                  <pre>{messages.email.body}</pre>
                </div>
              )}

              {messages?.whatsapp && (
                <div className={styles.preview}>
                  <h3>Preview do WhatsApp</h3>
                  <pre>{messages.whatsapp.text}</pre>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button className={styles.closeFooterButton} onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default SendProposalModal;
