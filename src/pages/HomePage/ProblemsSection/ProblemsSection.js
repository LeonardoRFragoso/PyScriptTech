import React from 'react';
import { motion } from 'framer-motion';
import { FaHandPaper, FaChartBar, FaUnlink } from 'react-icons/fa';
import './ProblemsSection.css';

const problems = [
  {
    icon: <FaHandPaper />,
    title: 'Processos manuais e retrabalho',
    description: 'Tarefas repetitivas consomem horas produtivas, geram erros e impedem que a equipe foque no que realmente importa.',
    impact: 'Custo operacional até 40% maior do que em empresas com processos automatizados.'
  },
  {
    icon: <FaUnlink />,
    title: 'Sistemas que não conversam',
    description: 'ERP, CRM e planilhas isolados criam silos de informação, obrigando a equipe a digitar os mesmos dados em vários lugares.',
    impact: 'Até 30% do tempo da equipe perdido em consolidação e sincronização manual.'
  },
  {
    icon: <FaChartBar />,
    title: 'Decisões sem dados',
    description: 'Sem dashboards e relatórios em tempo real, decisões importantes são tomadas na base da intuição.',
    impact: 'Oportunidades perdidas e investimentos mal direcionados por falta de visibilidade.'
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
          <h2>Você reconhece alguma dessas situações?</h2>
          <p>
            A maioria das empresas que nos procura enfrenta pelo menos um desses problemas — 
            e muitas vezes os três ao mesmo tempo.
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
