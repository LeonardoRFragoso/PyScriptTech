import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBrain, FaCogs, FaServer, FaPlug, FaArrowRight } from 'react-icons/fa';
import './SolutionsSection.css';

const solutions = [
  {
    icon: <FaBrain />,
    title: 'Inteligência Artificial',
    items: ['Assistentes corporativos', 'RAG e busca semântica', 'Chatbots internos', 'Análise de documentos com IA'],
    cta: 'Explorar IA',
    link: '/inteligencia-artificial-empresas'
  },
  {
    icon: <FaCogs />,
    title: 'Automação de Processos',
    items: ['Fluxos operacionais automatizados', 'Integrações entre sistemas', 'Eliminação de tarefas repetitivas', 'RPA sob medida'],
    cta: 'Automizar Processos',
    link: '/automacao-empresarial'
  },
  {
    icon: <FaServer />,
    title: 'Sistemas Corporativos',
    items: ['ERP sob medida', 'CRM personalizado', 'Portais internos', 'Dashboards executivos'],
    cta: 'Criar Sistema',
    link: '/software-corporativo'
  },
  {
    icon: <FaPlug />,
    title: 'Integrações',
    items: ['APIs REST e GraphQL', 'ERPes (SAP, TOTVS, Omie)', 'CRMs (Salesforce, HubSpot)', 'Sistemas legados'],
    cta: 'Integrar Sistemas',
    link: '/integracao-de-sistemas'
  }
];

const SolutionsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="solutionsSection" id="solucoes">
      <div className="solutionsContainer">
        <motion.div
          className="solutionsHeader"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="solutionsBadge">Nossas Soluções</span>
          <h2>Como Resolvemos Problemas de Negócio com Tecnologia</h2>
          <p>
            Não entregamos apenas software. Entregamos operações inteligentes que reduzem custos, 
            aumentam a produtividade e permitem que sua empresa cresça com menos esforço.
          </p>
        </motion.div>

        <div className="solutionsGrid">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className="solutionCard"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="solutionIcon">{solution.icon}</div>
              <h3>{solution.title}</h3>
              <ul className="solutionList">
                {solution.items.map((item, i) => (
                  <li key={i}>
                    <span className="solutionBullet"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                className="solutionCta"
                onClick={() => navigate(solution.link)}
                aria-label={solution.cta}
              >
                {solution.cta}
                <FaArrowRight />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
