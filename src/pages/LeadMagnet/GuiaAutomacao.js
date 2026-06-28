import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiDownload, FiClock, FiDollarSign, FiUsers } from 'react-icons/fi';
import { createLead } from '../../services/database';
import SEO from '../../components/SEO/SEO';
import './LeadMagnet.css';

const GuiaAutomacao = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    try {
      const today = new Date().toISOString().split('T')[0];

      await createLead({
        name,
        email,
        company: 'Não informado',
        phone: '',
        segment: '',
        employees: '',
        problem: 'Baixou guia: 10 Processos que sua Empresa Deveria Automatizar em 2026',
        systems: '',
        interests: ['Automação', 'Lead Magnet'],
        stage: 'novo',
        source: 'Guia Automação 2026',
        estimated_value: 0,
        priority: 'medium',
        next_action: 'Enviar guia por email',
        next_action_date: today,
        notes: 'Lead magnet: guia de automação',
      });

      if (window.gtag) {
        window.gtag('event', 'download_lead_magnet', {
          event_category: 'lead',
          event_label: 'guia_automacao_2026'
        });
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error saving lead magnet lead:', error);
      alert('Erro ao salvar. Tente novamente.');
    }
  };

  const processes = [
    {
      title: 'Entrada e classificação de dados',
      description: 'Planilhas, formulários e sistemas que recebem dados manualmente são os primeiros candidatos à automação.',
      impact: 'Reduza 70% do tempo de processamento',
      icon: <FiUsers />
    },
    {
      title: 'Emissão de documentos e relatórios',
      description: 'Notas fiscais, contratos, relatórios gerenciais e boletins podem ser gerados automaticamente.',
      impact: 'Elimine erros de cópia e revisão',
      icon: <FiDownload />
    },
    {
      title: 'Comunicação com clientes e fornecedores',
      description: 'Emails de follow-up, lembretes, notificações de status e cobranças podem ser automatizados.',
      impact: 'Aumente 3x a velocidade de resposta',
      icon: <FiClock />
    },
    {
      title: 'Conciliação bancária e financeira',
      description: 'Emparelhar pagamentos, faturas e extratos manualmente consome horas e gera retrabalho.',
      impact: 'Reduza 80% do tempo de conciliação',
      icon: <FiDollarSign />
    },
    {
      title: 'Fluxos de aprovação',
      description: 'Solicitações de compra, férias, reembolsos e descontos travam em inboxes de gestores.',
      impact: 'Acelere 5x o tempo de aprovação',
      icon: <FiClock />
    },
    {
      title: 'Atendimento e suporte nível 1',
      description: 'Chatbots internos e externos resolvem dúvidas repetitivas e escalam casos complexos.',
      impact: 'Atendimento 24/7 sem intervenção humana',
      icon: <FiUsers />
    },
    {
      title: 'Integração entre sistemas',
      description: 'ERP, CRM, e-commerce e sistemas legados que não conversam exigem exportação manual de dados.',
      impact: 'Elimine duplicidade de cadastros',
      icon: <FiDownload />
    },
    {
      title: 'Gestão de estoque e compras',
      description: 'Reabastecimento, alertas de vencimento e reposição automática reduzem rupturas e excessos.',
      impact: 'Reduza 30% de capital em estoque',
      icon: <FiDollarSign />
    },
    {
      title: 'Onboarding de clientes e funcionários',
      description: 'Envio de documentos, contratos, treinamentos e acompanhamento de etapas manuais.',
      impact: 'Reduza 50% do tempo de integração',
      icon: <FiUsers />
    },
    {
      title: 'Análise de documentos com IA',
      description: 'Contratos, notas fiscais, laudos e relatórios podem ser lidos, classificados e resumidos por IA.',
      impact: 'Análise 10x mais rápida de documentos',
      icon: <FiClock />
    }
  ];

  return (
    <div className="leadMagnetPage">
      <SEO
        title="Guia Grátis: 10 Processos para Automatizar em 2026 | PyScript.tech"
        description="Baixe o guia gratuito e descubra 10 processos que sua empresa deveria automatizar para reduzir custos e escalar operações."
        url="https://pyscript.tech/guia-automacao-2026"
        keywords="automação empresarial, guia automação, processos manuais, redução de custos, automação 2026"
      />

      <div className="leadMagnetContainer">
        <div className="leadMagnetHeader">
          <span className="leadMagnetBadge">Guia Gratuito</span>
          <h1>10 Processos que sua Empresa Deveria Automatizar em 2026</h1>
          <p>
            Um guia prático para identificar onde sua empresa está perdendo dinheiro 
            com processos manuais e como começar a automatizar hoje mesmo.
          </p>
        </div>

        {!submitted ? (
          <motion.div
            className="leadMagnetCapture"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="benefitsList">
              <div className="benefitItem"><FiCheck /> 10 processos mapeados com exemplos reais</div>
              <div className="benefitItem"><FiCheck /> Checklist de avaliação interna</div>
              <div className="benefitItem"><FiCheck /> Indicadores para medir resultado</div>
              <div className="benefitItem"><FiCheck /> 100% gratuito, sem spam</div>
            </div>

            <form className="leadMagnetForm" onSubmit={handleSubmit}>
              <div className="formRow">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <button type="submit" className="downloadButton">
                Baixar Guia Grátis
                <FiArrowRight />
              </button>
              <p className="privacyNote">Seus dados estão seguros. Não enviamos spam.</p>
            </form>
          </motion.div>
        ) : (
          <motion.div
            className="contentUnlocked"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="successHeader">
              <div className="successIcon"><FiCheck /></div>
              <h2>Guia liberado!</h2>
              <p>Enviamos uma cópia para <strong>{email}</strong>. Confira sua caixa de entrada.</p>
            </div>

            <div className="processesGrid">
              {processes.map((process, index) => (
                <div key={index} className="processCard">
                  <div className="processIcon">{process.icon}</div>
                  <h3>{process.title}</h3>
                  <p>{process.description}</p>
                  <span className="processImpact">{process.impact}</span>
                </div>
              ))}
            </div>

            <div className="ctaFinal">
              <h3>Quer saber qual processo automatizar primeiro na sua empresa?</h3>
              <button className="downloadButton" onClick={() => window.location.href = '/diagnostico-gratuito'}>
                Solicitar Diagnóstico Gratuito
                <FiArrowRight />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GuiaAutomacao;
