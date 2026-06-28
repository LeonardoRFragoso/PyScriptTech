import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiUsers, FiClock, FiDollarSign } from 'react-icons/fi';
import { FaCalculator } from 'react-icons/fa';
import { createLead } from '../../services/database';
import SEO from '../../components/SEO/SEO';
import './CalculadoraROI.css';

const CalculadoraROI = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employees: 10,
    hoursPerDay: 2,
    hourlyCost: 25,
    automationRate: 60
  });
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: Number(value) }));
    setShowResults(false);
  };

  const monthlyHoursWasted = formData.employees * formData.hoursPerDay * 22;
  const monthlyCost = monthlyHoursWasted * formData.hourlyCost;
  const monthlySavings = monthlyCost * (formData.automationRate / 100);
  const yearlySavings = monthlySavings * 12;
  const hoursSaved = monthlyHoursWasted * (formData.automationRate / 100);

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const today = new Date().toISOString().split('T')[0];

      await createLead({
        name: 'Lead Calculadora ROI',
        email,
        company: 'Não informado',
        phone: '',
        segment: '',
        employees: String(formData.employees),
        problem: `Processos manuais custam R$ ${monthlyCost.toLocaleString('pt-BR')} por mês. Economia potencial: R$ ${monthlySavings.toLocaleString('pt-BR')}/mês`,
        systems: '',
        interests: ['Automação', 'ROI'],
        stage: 'novo',
        source: 'Calculadora ROI',
        estimated_value: yearlySavings,
        priority: 'medium',
        next_action: 'Enviar relatório de ROI personalizado',
        next_action_date: today,
        notes: `Funcionários: ${formData.employees}, horas/dia: ${formData.hoursPerDay}, custo/hora: ${formData.hourlyCost}, automação: ${formData.automationRate}%`,
      });

      if (window.gtag) {
        window.gtag('event', 'download_roi_report', {
          event_category: 'lead',
          value: yearlySavings
        });
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error saving ROI lead:', error);
      alert('Erro ao salvar. Tente novamente.');
    }
  };

  return (
    <div className="calculadoraPage">
      <SEO
        title="Calculadora ROI de Automação - Quanto sua Empresa Perde | PyScript.tech"
        description="Calcule quanto sua empresa perde com processos manuais e descubra o potencial de economia com automação e IA."
        url="https://pyscript.tech/calculadora-roi"
        keywords="calculadora roi automação, economia automação, custo processos manuais, roi ia, automação empresarial"
      />

      <div className="calculadoraContainer">
        <div className="calculadoraHeader">
          <span className="calculadoraBadge"><FaCalculator /> Calculadora ROI</span>
          <h1>Quanto sua empresa perde com processos manuais?</h1>
          <p>
            Descubra em 30 segundos o custo real das tarefas repetitivas e o potencial 
            de economia com automação de processos.
          </p>
        </div>

        <div className="calculadoraGrid">
          <div className="calculadoraForm">
            <h2>Insira os dados da sua operação</h2>

            <div className="inputGroup">
              <label><FiUsers /> Quantos funcionários fazem tarefas repetitivas?</label>
              <input
                type="number"
                value={formData.employees}
                onChange={(e) => updateField('employees', e.target.value)}
                min="1"
              />
            </div>

            <div className="inputGroup">
              <label><FiClock /> Quantas horas por dia cada um gasta com tarefas manuais?</label>
              <input
                type="number"
                value={formData.hoursPerDay}
                onChange={(e) => updateField('hoursPerDay', e.target.value)}
                min="0.5"
                max="8"
                step="0.5"
              />
            </div>

            <div className="inputGroup">
              <label><FiDollarSign /> Custo médio por hora do funcionário (R$)</label>
              <input
                type="number"
                value={formData.hourlyCost}
                onChange={(e) => updateField('hourlyCost', e.target.value)}
                min="5"
              />
            </div>

            <div className="inputGroup">
              <label>Porcentagem de tarefas que podem ser automatizadas</label>
              <div className="rangeWrapper">
                <input
                  type="range"
                  value={formData.automationRate}
                  onChange={(e) => updateField('automationRate', e.target.value)}
                  min="10"
                  max="90"
                />
                <span>{formData.automationRate}%</span>
              </div>
            </div>

            <button className="calculateButton" onClick={() => setShowResults(true)}>
              Calcular Economia
              <FiArrowRight />
            </button>
          </div>

          <div className="calculadoraResults">
            <h2>Resultado estimado</h2>
            <div className="resultCard highlight">
              <span className="resultLabel">Economia anual estimada</span>
              <span className="resultValue">{yearlySavings.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className="resultCard">
              <span className="resultLabel">Horas perdidas por mês</span>
              <span className="resultValue">{monthlyHoursWasted.toLocaleString('pt-BR')}h</span>
            </div>
            <div className="resultCard">
              <span className="resultLabel">Custo mensal atual</span>
              <span className="resultValue">{monthlyCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className="resultCard">
              <span className="resultLabel">Horas economizadas/mês</span>
              <span className="resultValue">{hoursSaved.toLocaleString('pt-BR')}h</span>
            </div>
          </div>
        </div>

        {showResults && (
          <motion.div
            className="leadCapture"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {!submitted ? (
              <>
                <h2>Quer receber o relatório completo do ROI?</h2>
                <p>Envie seu email e receba uma análise detalhada com oportunidades de automação para sua empresa.</p>
                <form className="leadForm" onSubmit={handleDownload}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                  <button type="submit" className="downloadButton">
                    Receber Relatório de ROI
                    <FiArrowRight />
                  </button>
                </form>
              </>
            ) : (
              <div className="successMessage">
                <h2>Relatório enviado!</h2>
                <p>Verifique seu email. Em breve nossa equipe entrará em contato.</p>
                <button className="downloadButton" onClick={() => navigate('/diagnostico-gratuito')}>
                  Solicitar Diagnóstico Gratuito
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CalculadoraROI;
