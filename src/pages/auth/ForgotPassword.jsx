import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/DesignSystem/Input';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';
import styles from './Auth.module.css';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email é obrigatório');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email inválido');
      return;
    }
    
    setLoading(true);
    const result = await forgotPassword(email);
    setLoading(false);
    
    if (result.success) {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className={styles.container}>
        <div className={styles.backgroundEffects}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
        </div>

        <div className={styles.formCard}>
          <div className={styles.header}>
            <div className={styles.successIcon}>
              <FiCheck size={48} />
            </div>
            <h1>Email enviado!</h1>
            <p>
              Enviamos um link de recuperação para <strong>{email}</strong>. 
              Verifique sua caixa de entrada e spam.
            </p>
          </div>

          <Link to="/login" className={styles.submitButton}>
            <FiArrowLeft />
            Voltar para login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.backgroundEffects}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
      </div>

      <div className={styles.formCard}>
        <div className={styles.header}>
          <Link to="/" className={styles.logo}>
            PyScript<span>.tech</span>
          </Link>
          <h1>Recuperar senha</h1>
          <p>Digite seu email para receber um link de recuperação</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            error={error}
            icon={<FiMail />}
            fullWidth
            autoComplete="email"
          />

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? (
              <span className={styles.loadingDots}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            ) : (
              'Enviar link de recuperação'
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Lembrou a senha?{' '}
            <Link to="/login" className={styles.link}>
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
