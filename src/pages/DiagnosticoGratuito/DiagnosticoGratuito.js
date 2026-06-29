import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiArrowRight, FiUser, FiBriefcase, FiUsers, FiTool, FiDollarSign, FiMessageSquare, FiLayers, FiMessageCircle } from 'react-icons/fi';
import { createLead } from '../../services/database';
import SEO from '../../components/SEO/SEO';
import './DiagnosticoGratuito.css';

const INTEREST_OPTIONS = [
  { id: 'ia', label: 'Inteligência Artificial', description: 'Assistentes, RAG, análise de documentos' },
  { id: 'automacao', label: 'Automação de Processos', description: 'Eliminar tarefas repetitivas e integrar sistemas' },
  { id: 'erp', label: 'ERP Sob Medida', description: 'Sistema integrado para gestão da empresa' },
  { id: 'crm', label: 'CRM Personalizado', description: 'Gestão comercial e relacionamento' },
  { id: 'integracoes', label: 'Integrações', description: 'Conectar ERPs, CRMs e sistemas legados' },
  { id: 'dashboard', label: 'Dashboard Executivo', description: 'KPIs e indicadores em tempo real' },
];

const SEGMENT_OPTIONS = ['Logística', 'Transporte', 'Saúde', 'Serviços', 'Indústria', 'Varejo', 'Tecnologia', 'Outro'];
const EMPLOYEE_OPTIONS = ['1-10', '11-20', '21-50', '51-100', '101-200', '200+'];

const DiagnosticoGratuito = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    segment: '',
    employees: '',
    problem: '',
    systems: '',
    interests: [],
    expectedInvestment: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (id) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id]
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Nome obrigatório';
      if (!formData.email.trim()) newErrors.email = 'Email obrigatório';
      if (!formData.phone.trim()) newErrors.phone = 'Telefone obrigatório';
      if (!formData.company.trim()) newErrors.company = 'Empresa obrigatória';
    }
    if (step === 2) {
      if (!formData.segment) newErrors.segment = 'Segmento obrigatório';
      if (!formData.employees) newErrors.employees = 'Tamanho da empresa obrigatório';
      if (!formData.problem.trim()) newErrors.problem = 'Descreva o problema';
    }
    if (step === 3) {
      if (formData.interests.length === 0) newErrors.interests = 'Selecione pelo menos um interesse';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(s => Math.min(s + 1, 4));
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const newLead = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        role: formData.role,
        segment: formData.segment,
        employees: formData.employees,
        problem: formData.problem,
        systems: formData.systems,
        interests: formData.interests.map(i => INTEREST_OPTIONS.find(opt => opt.id === i)?.label || i),
        stage: 'novo',
        source: 'Diagnóstico Gratuito',
        estimated_value: Number(formData.expectedInvestment) || 0,
        priority: 'medium',
        notes: formData.message,
        next_action: 'Entrar em contato em até 24h',
        next_action_date: today,
      };
      await createLead(newLead);

      // Track event (GA4/GTM)
      if (window.gtag) {
        window.gtag('event', 'submit_diagnostico', {
          event_category: 'lead',
          event_label: formData.segment,
          value: formData.interests.length
        });
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error saving lead:', error);
      setErrors({ submit: 'Erro ao enviar diagnóstico. Tente novamente ou fale pelo WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="diagnosticoPage">
        <div className="diagnosticoContainer">
          <motion.div
            className="successMessage"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="successIcon"><FiCheck /></div>
            <h2>Diagnóstico Solicitado!</h2>
            <p>
              Recebemos suas informações. Nossa equipe vai analisar seu caso e retornar 
              em até 24 horas com um diagnóstico inicial e sugestões de solução.
            </p>
            <div className="successActions">
              <button className="primaryButton" onClick={() => navigate('/contact')}>
                Agendar Reunião Agora
                <FiArrowRight />
              </button>
              <button className="secondaryButton" onClick={() => navigate('/')}>
                Voltar para Home
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="diagnosticoPage">
      <SEO
        title="Diagnóstico Gratuito - Automação, IA e Sistemas | PyScript.tech"
        description="Solicite um diagnóstico gratuito da sua operação. Analisaremos seus processos e apresentaremos oportunidades de automação, IA e sistemas corporativos."
        url="https://pyscript.tech/diagnostico-gratuito"
        keywords="diagnóstico gratuito, automação empresarial, inteligência artificial, sistemas corporativos, consultoria tech"
      />

      <div className="diagnosticoContainer">
        <div className="diagnosticoHeader">
          <span className="diagnosticoBadge">Diagnóstico Gratuito</span>
          <h1>Descubra como a tecnologia pode reduzir custos na sua empresa</h1>
          <p>
            Responda em 3 minutos e receba um diagnóstico inicial com oportunidades 
            de automação, IA e sistemas personalizados para o seu negócio.
          </p>
        </div>

        <div className="progressBar">
          <div className="progressSteps">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`progressStep ${s <= step ? 'active' : ''} ${s < step ? 'completed' : ''}`}>
                <span>{s}</span>
              </div>
            ))}
          </div>
          <div className="progressLine">
            <div className="progressFill" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
          </div>
        </div>

        <form className="diagnosticoForm" onSubmit={handleSubmit}>
          {step === 1 && (
            <motion.div
              className="formStep"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2><FiUser /> Quem você é</h2>
              <div className="formGrid">
                <div className="formField">
                  <label>Nome completo *</label>
                  <input type="text" value={formData.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Seu nome" />
                  {errors.name && <span className="fieldError">{errors.name}</span>}
                </div>
                <div className="formField">
                  <label>Email corporativo *</label>
                  <input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder="voce@empresa.com" />
                  {errors.email && <span className="fieldError">{errors.email}</span>}
                </div>
                <div className="formField">
                  <label>WhatsApp / Telefone *</label>
                  <input type="tel" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="(21) 99999-9999" />
                  {errors.phone && <span className="fieldError">{errors.phone}</span>}
                </div>
                <div className="formField">
                  <label>Cargo</label>
                  <input type="text" value={formData.role} onChange={(e) => updateField('role', e.target.value)} placeholder="Diretor, Gestor, CEO..." />
                </div>
                <div className="formField fullWidth">
                  <label>Empresa *</label>
                  <input type="text" value={formData.company} onChange={(e) => updateField('company', e.target.value)} placeholder="Nome da empresa" />
                  {errors.company && <span className="fieldError">{errors.company}</span>}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              className="formStep"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2><FiBriefcase /> Sobre a empresa</h2>
              <div className="formGrid">
                <div className="formField">
                  <label>Segmento *</label>
                  <select value={formData.segment} onChange={(e) => updateField('segment', e.target.value)}>
                    <option value="">Selecione</option>
                    {SEGMENT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.segment && <span className="fieldError">{errors.segment}</span>}
                </div>
                <div className="formField">
                  <label>Número de funcionários *</label>
                  <select value={formData.employees} onChange={(e) => updateField('employees', e.target.value)}>
                    <option value="">Selecione</option>
                    {EMPLOYEE_OPTIONS.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                  {errors.employees && <span className="fieldError">{errors.employees}</span>}
                </div>
                <div className="formField fullWidth">
                  <label>Principal problema operacional *</label>
                  <textarea value={formData.problem} onChange={(e) => updateField('problem', e.target.value)} placeholder="Descreva o problema que mais impacta sua operação hoje..." rows={4} />
                  {errors.problem && <span className="fieldError">{errors.problem}</span>}
                </div>
                <div className="formField fullWidth">
                  <label>Sistemas utilizados atualmente</label>
                  <textarea value={formData.systems} onChange={(e) => updateField('systems', e.target.value)} placeholder="ERP, CRM, planilhas, sistemas legados..." rows={3} />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              className="formStep"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2><FiTool /> O que te interessa?</h2>
              <p className="stepDescription">Selecione uma ou mais áreas que você quer explorar:</p>
              <div className="interestGrid">
                {INTEREST_OPTIONS.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    className={`interestCard ${formData.interests.includes(option.id) ? 'selected' : ''}`}
                    onClick={() => toggleInterest(option.id)}
                  >
                    <div className="interestCheck"><FiCheck /></div>
                    <h3>{option.label}</h3>
                    <p>{option.description}</p>
                  </button>
                ))}
              </div>
              {errors.interests && <span className="fieldError">{errors.interests}</span>}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              className="formStep"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2><FiDollarSign /> Investimento e observações</h2>
              <div className="formGrid">
                <div className="formField">
                  <label>Investimento estimado</label>
                  <select value={formData.expectedInvestment} onChange={(e) => updateField('expectedInvestment', e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="5000">Até R$ 5.000</option>
                    <option value="15000">R$ 5.000 a R$ 15.000</option>
                    <option value="30000">R$ 15.000 a R$ 30.000</option>
                    <option value="50000">R$ 30.000 a R$ 50.000</option>
                    <option value="100000">Acima de R$ 50.000</option>
                    <option value="0">A definir</option>
                  </select>
                </div>
                <div className="formField fullWidth">
                  <label>Observações adicionais <FiMessageSquare /></label>
                  <textarea value={formData.message} onChange={(e) => updateField('message', e.target.value)} placeholder="Conte mais detalhes, prazos ou qualquer informação relevante..." rows={4} />
                </div>
              </div>

              <div className="formTrust">
                <div className="trustItem"><FiCheck /> Resposta em até 24h</div>
                <div className="trustItem"><FiCheck /> Diagnóstico sem compromisso</div>
                <div className="trustItem"><FiCheck /> Proposta personalizada</div>
              </div>
            </motion.div>
          )}

          <div className="formNavigation">
            {step > 1 && (
              <button type="button" className="navButton secondary" onClick={prevStep}>
                Voltar
              </button>
            )}
            {step < 4 ? (
              <button type="button" className="navButton primary" onClick={nextStep}>
                Próximo
                <FiArrowRight />
              </button>
            ) : (
              <button type="submit" className="navButton primary" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Solicitar Diagnóstico Gratuito'}
                <FiArrowRight />
              </button>
            )}
          </div>
          {errors.submit && (
            <div className="fieldError" style={{ textAlign: 'center', marginTop: '1rem' }}>
              {errors.submit}
            </div>
          )}
        </form>

        <div className="afterDiagnosisSection">
          <h3>O que acontece depois do diagnóstico?</h3>
          <div className="afterDiagnosisSteps">
            <div className="afterDiagnosisStep">
              <div className="afterDiagnosisIcon"><FiMessageCircle /></div>
              <div>
                <strong>Contato da equipe</strong>
                <p>Entramos em contato em até 24h para entender detalhes.</p>
              </div>
            </div>
            <div className="afterDiagnosisStep">
              <div className="afterDiagnosisIcon"><FiLayers /></div>
              <div>
                <strong>Proposta personalizada</strong>
                <p>Preparamos escopo, prazos e investimento alinhados ao seu caso.</p>
              </div>
            </div>
            <div className="afterDiagnosisStep">
              <div className="afterDiagnosisIcon"><FiCheck /></div>
              <div>
                <strong>Projeto no portal</strong>
                <p>Após aprovação, seu projeto é criado no Portal de Projetos ProFlow da PyScript.Tech.</p>
              </div>
            </div>
          </div>
          <p className="afterDiagnosisNote">
            A <strong><a href="https://proflow.pro" target="_blank" rel="noopener noreferrer">ProFlow.pro</a></strong> é uma plataforma própria utilizada pela PyScript.Tech para organizar a execução dos projetos,
            centralizando comunicação, prazos, arquivos, milestones e entregas com transparência.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticoGratuito;
