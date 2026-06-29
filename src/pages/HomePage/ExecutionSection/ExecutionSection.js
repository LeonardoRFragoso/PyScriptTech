import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckSquare, FiFileText, FiLayers, FiMessageSquare, FiClock } from 'react-icons/fi';
import styles from './ExecutionSection.module.css';

const steps = [
  {
    icon: <FiFileText />,
    title: 'Proposta aprovada',
    description: 'Escopo, prazos e investimento definidos e aprovados.'
  },
  {
    icon: <FiLayers />,
    title: 'Projeto no portal',
    description: 'Criamos seu projeto no Portal de Projetos ProFlow, próprio da PyScript.Tech.'
  },
  {
    icon: <FiCheckSquare />,
    title: 'Etapas e entregas',
    description: 'Cada milestone fica disponível para acompanhamento e validação.'
  },
  {
    icon: <FiMessageSquare />,
    title: 'Comunicação centralizada',
    description: 'Mensagens, arquivos e feedback organizados em um só lugar.'
  },
  {
    icon: <FiClock />,
    title: 'Prazos transparentes',
    description: 'Você acompanha o andamento real e recebe notificações de evolução.'
  }
];

const ExecutionSection = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.executionSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>Acompanhamento</span>
          <h2>Como você acompanha o seu projeto</h2>
          <p>
            Depois de fecharmos o contrato, criamos uma sala dedicada para o seu projeto no{' '}
            <a href="https://proflow.pro" target="_blank" rel="noopener noreferrer"><strong>ProFlow</strong></a>{' '}
            — plataforma de gestão de projetos desenvolvida e operada pela PyScript.tech.
            Sem e-mail perdido. Sem planilha de controle. Tudo em um lugar.
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepIcon}>{step.icon}</div>
              <div className={styles.stepContent}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className={styles.stepConnector} />}
            </div>
          ))}
        </div>


        <div className={styles.cta}>
          <button className={styles.ctaButton} onClick={() => navigate('/como-funciona-a-execucao')}>
            Ver como funciona o acompanhamento
          </button>
          <a
            href="https://proflow.pro"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaSecondary}
          >
            Acessar Portal de Projetos
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExecutionSection;
