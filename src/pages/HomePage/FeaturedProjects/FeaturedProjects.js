import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import './FeaturedProjects.css';

const FeaturedProjects = () => {
  const navigate = useNavigate();

  const featuredProjects = [
    {
      id: 1,
      title: 'Oráculo IA',
      description: 'Assistente de IA corporativo que responde perguntas complexas com base em documentos internos da empresa, citando fontes verificáveis. Transforma horas de pesquisa manual em segundos de consulta.',
      category: 'IA Corporativa',
      technologies: ['FastAPI', 'OpenSearch', 'Langflow', 'Docling', 'Docker'],
      results: ['Pesquisa em documentos internos com IA', 'Respostas com citação de fontes', 'Containerização e deploy simplificado'],
      image: '/images/oraculo/1.png',
      caseUrl: '/cases/oraculo-ia',
      githubUrl: 'https://github.com/LeonardoRFragoso/Oraculo'
    },
    {
      id: 2,
      title: 'ProFlow',
      description: 'Plataforma SaaS para gestão de projetos e pagamentos entre empresas e fornecedores. Inclui pagamento em custódia, milestones de entrega e comunicação centralizada — desenvolvida e operada pela PyScript.tech.',
      category: 'SaaS Próprio',
      technologies: ['Django', 'Vue.js 3', 'PostgreSQL', 'OpenAI GPT-4', 'Mercado Pago'],
      results: ['Plataforma SaaS em produção', 'Pagamento em custódia e PIX integrado', 'Assinaturas recorrentes e portal de projetos'],
      image: `${process.env.PUBLIC_URL}/images/proflow/proflow.png`,
      caseUrl: '/cases/proflow',
      liveUrl: 'https://www.proflow.pro/',
      githubUrl: 'https://github.com/LeonardoRFragoso/ProFlow'
    },
    {
      id: 3,
      title: 'LogiFlow CRM',
      description: 'CRM desenvolvido sob medida para transportadoras, unificando operações comercial, fiscal e logística em um só lugar. Eliminou planilhas, reduziu atrasos e automatizou a emissão de documentos fiscais.',
      category: 'Sistema Corporativo',
      technologies: ['FastAPI', 'Vue.js 3', 'PostgreSQL', 'Redis', 'GPS'],
      results: ['Gestão comercial, operacional e fiscal integradas', 'Emissão automática de CT-e e MDF-e', 'Integração com WhatsApp e ERPs do setor'],
      image: '/images/LogiFlow/site-divulgacao/1.png',
      caseUrl: '/cases/logiflow',
      liveUrl: 'https://logi-flow-wuhp.vercel.app',
      githubUrl: 'https://github.com/LeonardoRFragoso/LogiFlow'
    },
  ];

  return (
    <section className="featuredProjects">
      <div className="featuredContainer">
        <motion.div
          className="featuredHeader"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="featuredBadge">Cases de Sucesso</span>
          <h2>O que já entregamos</h2>
          <p>Três exemplos reais de sistemas que resolveram problemas reais de negócio</p>
        </motion.div>

        <div className="projectsGrid">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="projectCard"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="projectImage">
                <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                <span className="categoryLabel">{project.category}</span>
                <div className="projectOverlay">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="overlayButton"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="overlayButton"
                    >
                      <FaGithub />
                    </a>
                  )}
                </div>
              </div>
              <div className="projectContent">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="techStack">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="techTag">{tech}</span>
                  ))}
                </div>
                <div className="projectResults">
                  {project.results.map((result, i) => (
                    <div key={i} className="resultItem">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{result}</span>
                    </div>
                  ))}
                </div>
                {project.caseUrl && (
                  <button
                    className="caseButton"
                    onClick={() => navigate(project.caseUrl)}
                  >
                    Ver Case Completo
                    <FaArrowRight />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="featuredCTA"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <button
            className="ctaButton"
            onClick={() => navigate('/projects')}
          >
            Ver Todos os Cases
            <FaArrowRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
