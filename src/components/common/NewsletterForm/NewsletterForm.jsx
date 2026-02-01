import React, { useState } from 'react';
import { logNewsletterSignup } from '../../../services/analytics';
import { showSuccess, showError } from '../../../services/toast';
import styles from './NewsletterForm.module.css';

const NewsletterForm = ({ 
  variant = 'default',
  title = '📬 Receba novidades',
  description = 'Fique por dentro de dicas e conteúdos exclusivos sobre desenvolvimento',
  buttonText = 'Inscrever',
  showName = false,
}) => {
  const [formData, setFormData] = useState({ email: '', name: '' });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !validateEmail(formData.email)) {
      setStatus('error');
      setMessage('Por favor, insira um email válido');
      return;
    }

    setStatus('loading');
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar');
      }

      setStatus('success');
      setMessage('✅ Cadastro realizado com sucesso!');
      setFormData({ email: '', name: '' });
      logNewsletterSignup(formData.email);
      showSuccess('Você foi inscrito na newsletter!');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      if (error.message.includes('already')) {
        setStatus('error');
        setMessage('Este email já está cadastrado!');
      } else {
        setStatus('error');
        setMessage(error.message || 'Erro ao cadastrar. Tente novamente.');
      }
      showError(error.message || 'Erro ao cadastrar');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'error') {
      setStatus('idle');
      setMessage('');
    }
  };

  return (
    <div className={`${styles.container} ${styles[variant]}`}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {showName && (
          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            value={formData.name}
            onChange={handleChange}
            disabled={status === 'loading'}
            className={styles.input}
          />
        )}
        
        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder="Seu melhor email"
            value={formData.email}
            onChange={handleChange}
            disabled={status === 'loading'}
            className={styles.input}
            required
          />
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className={styles.button}
          >
            {status === 'loading' ? (
              <span className={styles.loadingDots}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            ) : buttonText}
          </button>
        </div>
        
        {message && (
          <p className={`${styles.message} ${styles[status]}`}>
            {message}
          </p>
        )}

        <p className={styles.privacy}>
          🔒 Respeitamos sua privacidade. Sem spam, prometo!
        </p>
      </form>
    </div>
  );
};

export default NewsletterForm;
