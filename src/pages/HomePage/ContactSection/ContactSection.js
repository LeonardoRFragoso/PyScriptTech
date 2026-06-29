// src/pages/HomePage/ContactSection/ContactSection.js
import React, { useState } from 'react';
import styles from './ContactSection.module.css';
import emailjs from 'emailjs-com';
import { logFormSubmit } from '../../../services/analytics';
import { createLead } from '../../../services/database';

const projectTypes = [
  'Landing Page',
  'Site Institucional',
  'E-commerce',
  'Sistema Web',
  'Aplicativo',
  'Automação',
  'Consultoria',
  'Outro',
];

const budgetRanges = [
  'Até R$ 5.000',
  'R$ 5.000 - R$ 15.000',
  'R$ 15.000 - R$ 30.000',
  'R$ 30.000 - R$ 50.000',
  'Acima de R$ 50.000',
  'A definir',
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save lead to CRM first, regardless of email delivery outcome
    try {
      const today = new Date().toISOString().split('T')[0];
      await createLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Não informado',
        segment: '',
        employees: '',
        problem: `Tipo: ${formData.projectType}. Orçamento: ${formData.budget}. ${formData.description}`,
        systems: '',
        interests: [formData.projectType || 'Contato'],
        stage: 'novo',
        source: 'Formulário Contato Home',
        estimated_value: 0,
        priority: 'medium',
        next_action: 'Responder contato em até 24h',
        next_action_date: today,
        notes: formData.description,
      });
      logFormSubmit('contact_form_home', true);
    } catch (err) {
      console.error('Erro ao salvar lead no CRM:', err);
    }

    emailjs.send('service_mpvslhm', 'template_EmailJS', {
      user_name: formData.name,
      user_email: formData.email,
      user_phone: formData.phone,
      user_company: formData.company,
      user_project_type: formData.projectType,
      user_budget: formData.budget,
      user_description: formData.description,
    }, 'Wok3mV-Bl-3UNJa9I')
    .then((response) => {
      console.log('Email enviado com sucesso!', response.status, response.text);
      setSuccessMessage('Mensagem enviada com sucesso! Entraremos em contato em até 24 horas.');
      setErrorMessage('');
      setFormData({ name: '', email: '', phone: '', company: '', projectType: '', budget: '', description: '' });
      setIsSubmitting(false);
    }, (err) => {
      console.error('Falha ao enviar email:', err);
      setErrorMessage('Falha ao enviar a mensagem. Tente novamente mais tarde.');
      setSuccessMessage('');
      setIsSubmitting(false);
    });
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactHeader}>
        <span className={styles.contactBadge}>Fale Conosco</span>
        <h2>Vamos Construir Juntos?</h2>
        <p>
          Conte-nos sobre seu projeto. Nossa equipe responde em até 24 horas 
          com uma proposta personalizada para suas necessidades.
        </p>
      </div>

      <div className={styles.contactGrid}>
        {/* Info Card */}
        <div className={styles.contactInfo}>
          <h3>Informações de Contato</h3>
          
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>E-mail</span>
              <a href="mailto:contato@pyscript.tech">contato@pyscript.tech</a>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>WhatsApp</span>
              <a href="https://wa.me/5521980292791" target="_blank" rel="noopener noreferrer">+55 (21) 98029-2791</a>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Localização</span>
              <span>Rio de Janeiro, Brasil</span>
            </div>
          </div>

          <div className={styles.socialLinks}>
            <span className={styles.socialLabel}>Redes Sociais</span>
            <div className={styles.socialIcons}>
              <a href="https://github.com/LeonardoRFragoso" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/leonardo-fragoso-921b166a/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://wa.me/5521980292791" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h3>Solicite um Orçamento</h3>
            <p>Preencha o formulário e entraremos em contato em breve.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nome Completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Telefone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="company">Empresa</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Nome da empresa"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="projectType">Tipo de Projeto *</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma opção</option>
                  {projectTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="budget">Orçamento Estimado</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="">Selecione uma faixa</option>
                  {budgetRanges.map((range, index) => (
                    <option key={index} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="description">Descreva seu Projeto *</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                placeholder="Conte-nos mais sobre sua ideia, objetivos e expectativas..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar Mensagem
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </>
              )}
            </button>

            {successMessage && (
              <div className={styles.successMessage}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className={styles.errorMessage}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
