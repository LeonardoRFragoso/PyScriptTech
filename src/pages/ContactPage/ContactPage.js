// src/pages/ContactPage/ContactPage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import Confetti from '../../components/common/Confetti';
import './ContactPage.css';
import emailjs from 'emailjs-com';

const ContactPage = () => {
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
  const [showConfetti, setShowConfetti] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
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
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }, (err) => {
      console.error('Falha ao enviar email:', err);
      setErrorMessage('Falha ao enviar a mensagem. Tente novamente mais tarde.');
      setSuccessMessage('');
      setIsSubmitting(false);
    });
  };

  const contactMethods = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      title: 'Telefone',
      info: '+55 (21) 98029-2791',
      link: 'tel:+5521980292791',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      title: 'Email',
      info: 'contato@pyscript.tech',
      link: 'mailto:contato@pyscript.tech',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      title: 'Localização',
      info: 'Rio de Janeiro, RJ - Brasil',
      link: null,
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: 'Horário',
      info: 'Seg - Sex: 9h às 18h',
      link: null,
    },
  ];

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

  return (
    <>
      <Confetti active={showConfetti} />
      <SEO
        title="Contato - Entre em Contato com Nossa Equipe"
        description="Entre em contato conosco para discutir seu projeto. Respondemos em até 24 horas. WhatsApp, email ou agende uma reunião."
        url="https://pyscript.tech/contact"
      />
      <div className="contactPage">
        {/* Hero Section */}
        <section className="contactHero">
        <div className="heroContent">
          <span className="heroBadge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Fale Conosco
          </span>
          <h1>
            Vamos transformar
            <span>sua ideia em realidade</span>
          </h1>
          <p>
            Estamos prontos para ouvir sobre seu projeto. Entre em contato e 
            receba uma proposta personalizada em até 24 horas.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contactMain">
        {/* Contact Info Side */}
        <div className="contactInfo">
          <div className="infoHeader">
            <h2>Informações de Contato</h2>
            <p>Escolha o canal de sua preferência para entrar em contato conosco.</p>
          </div>

          <div className="contactMethods">
            {contactMethods.map((method, index) => (
              <div key={index} className="methodCard">
                <div className="methodIcon">{method.icon}</div>
                <div className="methodContent">
                  <span className="methodTitle">{method.title}</span>
                  {method.link ? (
                    <a href={method.link} className="methodInfo">{method.info}</a>
                  ) : (
                    <span className="methodInfo">{method.info}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Contact Buttons */}
          <div className="quickContact">
            <a 
              href="https://wa.me/5521980292791?text=Olá! Gostaria de saber mais sobre os serviços da PyScript.tech" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="whatsappButton"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <a 
              href="mailto:contato@pyscript.tech" 
              className="emailButton"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Email
            </a>
          </div>

          {/* Social Links */}
          <div className="socialLinks">
            <span className="socialLabel">Siga-nos</span>
            <div className="socialIcons">
              <a href="https://linkedin.com/company/pyscripttech" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://github.com/pyscripttech" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://instagram.com/pyscripttech" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Side */}
        <div className="contactFormWrapper">
          <div className="formHeader">
            <h2>Solicite um Orçamento</h2>
            <p>Preencha o formulário e entraremos em contato em breve.</p>
          </div>

          <form onSubmit={handleSubmit} className="contactForm">
            <div className="formRow">
              <div className="formGroup">
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
              <div className="formGroup">
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

            <div className="formRow">
              <div className="formGroup">
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
              <div className="formGroup">
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

            <div className="formRow">
              <div className="formGroup">
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
              <div className="formGroup">
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

            <div className="formGroup fullWidth">
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

            <button type="submit" className="submitButton" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
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
              <div className="successMessage">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="errorMessage">
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
      </section>

      {/* Calendly Section */}
      <section className="calendlySection">
        <div className="calendlyContent">
          <h2>Prefere Agendar uma Reunião?</h2>
          <p>
            Escolha o melhor horário na sua agenda para conversarmos sobre seu projeto.
            É rápido, fácil e sem compromisso.
          </p>
          <a 
            href="https://calendly.com/pyscripttech" 
            target="_blank" 
            rel="noopener noreferrer"
            className="calendlyButton"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Agendar Reunião Gratuita
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="contactFeatures">
        <div className="featureCard">
          <div className="featureIcon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h3>Resposta Rápida</h3>
          <p>Retornamos todas as mensagens em até 24 horas úteis.</p>
        </div>
        <div className="featureCard">
          <div className="featureIcon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h3>Dados Seguros</h3>
          <p>Suas informações são tratadas com total confidencialidade.</p>
        </div>
        <div className="featureCard">
          <div className="featureIcon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <h3>Proposta Detalhada</h3>
          <p>Receba um orçamento completo com escopo e prazos definidos.</p>
        </div>
      </section>
      </div>
    </>
  );
};

export default ContactPage;
