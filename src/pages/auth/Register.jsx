import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/DesignSystem/Input';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { logFormSubmit } from '../../services/analytics';
import styles from './Auth.module.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Nome deve ter no mínimo 2 caracteres';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Senha deve conter maiúscula, minúscula e número';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não conferem';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Você deve aceitar os termos de uso';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    const result = await register(formData.name, formData.email, formData.password);
    setLoading(false);
    
    if (result.success) {
      logFormSubmit('Register', true);
      navigate('/login', { 
        state: { message: 'Conta criada com sucesso! Faça login para continuar.' } 
      });
    } else {
      logFormSubmit('Register', false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return { level: 0, text: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const levels = [
      { level: 1, text: 'Muito fraca', color: '#ff4444' },
      { level: 2, text: 'Fraca', color: '#ff8800' },
      { level: 3, text: 'Média', color: '#ffcc00' },
      { level: 4, text: 'Forte', color: '#88cc00' },
      { level: 5, text: 'Muito forte', color: '#00cc44' },
    ];

    return levels[Math.min(strength, 4)] || levels[0];
  };

  const passwordStrength = getPasswordStrength();

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
          <h1>Criar conta</h1>
          <p>Comece sua jornada conosco</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Nome completo"
            type="text"
            name="name"
            placeholder="João Silva"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            icon={<FiUser />}
            fullWidth
            autoComplete="name"
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={<FiMail />}
            fullWidth
            autoComplete="email"
          />

          <div className={styles.passwordField}>
            <Input
              label="Senha"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={<FiLock />}
              fullWidth
              autoComplete="new-password"
            />
            {formData.password && (
              <div className={styles.passwordStrength}>
                <div className={styles.strengthBar}>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={styles.strengthSegment}
                      style={{
                        backgroundColor: level <= passwordStrength.level 
                          ? passwordStrength.color 
                          : 'rgba(255,255,255,0.1)',
                      }}
                    />
                  ))}
                </div>
                <span style={{ color: passwordStrength.color }}>
                  {passwordStrength.text}
                </span>
              </div>
            )}
          </div>

          <Input
            label="Confirmar senha"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            icon={<FiLock />}
            fullWidth
            autoComplete="new-password"
          />

          <label className={styles.terms}>
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => {
                setAcceptTerms(e.target.checked);
                if (errors.terms) {
                  setErrors(prev => ({ ...prev, terms: '' }));
                }
              }}
            />
            <span>
              Aceito os{' '}
              <Link to="/terms" target="_blank">Termos de Uso</Link>
              {' '}e{' '}
              <Link to="/privacy" target="_blank">Política de Privacidade</Link>
            </span>
          </label>
          {errors.terms && <span className={styles.errorText}>{errors.terms}</span>}

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
              <>
                Criar conta
                <FiArrowRight />
              </>
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Já tem uma conta?{' '}
            <Link to="/login" className={styles.link}>
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
