import React from 'react';
import { motion } from 'framer-motion';
import { FaTable, FaHandPaper, FaRedo, FaChartBar, FaUnlink, FaRobot } from 'react-icons/fa';
import './ProblemsSection.css';

const problems = [
  {
    icon: <FaTable />,
    title: 'Planilhas desorganizadas',
    description: 'Dados espalhados em planilhas, dificultando a tomada de decisão e aumentando erros humanos.',
    impact: 'Até 30% do tempo da equipe perdido em consolidação manual de dados.'
  },
  {
    icon: <FaHandPaper />,
    title: 'Processos manuais',
    description: 'Tarefas repetitivas que consomem horas produtivas e aumentam a margem de erro.',
    impact: 'Custo operacional 40% maior do que processos automatizados.'
  },
  {
    icon: <FaRedo />,
    title: 'Retrabalho',
    description: 'Falta de integração entre setores gera retrabalho e comunicação fragmentada.',
    impact: 'Redução de 20-25% na produtividade da equipe.'
  },
  {
    icon: <FaChartBar />,
    title: 'Falta de indicadores',
    description: 'Decisões baseadas em intuição por falta de dashboards e relatórios em tempo real.',
    impact: 'Oportunidades perdidas e desperdício de investimento.'
  },
  {
    icon: <FaUnlink />,
    title: 'Sistemas desconectados',
    description: 'ERP, CRM e planilhas não conversam, criando silos de informação.',
    impact: 'Atrasos no atendimento e retrabalho na sincronização de dados.'
  },
  {
    icon: <FaRobot />,
    title: 'Falta de automação',
    description: 'Equipes ocupadas com tarefas operacionais em vez de atividades estratégicas.',
    impact: 'Crescimento limitado pela capacidade manual de atendimento.'
  }
];

const ProblemsSection = () => {
  return (
    <section className="problemsSection" id="problemas">
      <div className="problemsContainer">
        <motion.div
          className="problemsHeader"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="problemsBadge">Desafios que Resolvemos</span>
          <h2>Processos que Atrasam o Crescimento da Sua Empresa</h2>
          <p>
            Muitas empresas perdem dinheiro todos os dias com processos ineficientes. 
            Identificamos as dores mais comuns e mostramos o impacto financeiro de cada uma.
          </p>
        </motion.div>

        <div className="problemsGrid">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              className="problemCard"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="problemIcon">{problem.icon}</div>
              <h3>{problem.title}</h3>
              <p>{problem.description}</p>
              <div className="problemImpact">
                <strong>Impacto:</strong> {problem.impact}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
