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
          <span className={styles.tag}>Execução</span>
          <h2>Execução transparente do início ao fim</h2>
          <p>
            Da proposta aprovada à entrega final, você acompanha tudo em nosso portal de projetos próprio.
            Nossa equipe organiza cada etapa, prazo, entrega e comunicação em um ambiente centralizado,
            para que você tenha visibilidade total do que está sendo construído.
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

        <div className={styles.note}>
          <strong>A ProFlow.pro é uma plataforma própria utilizada pela PyScript.Tech</strong> para organizar a execução dos projetos,
          centralizando comunicação, prazos, arquivos, milestones e entregas com transparência.
        </div>

        <div className={styles.cta}>
          <button className={styles.ctaButton} onClick={() => navigate('/como-funciona-a-execucao')}>
            Entender como funciona a execução
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExecutionSection;
