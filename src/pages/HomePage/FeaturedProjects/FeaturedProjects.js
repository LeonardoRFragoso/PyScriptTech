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
      title: 'ProFlow',
      description: 'Plataforma completa para freelancers com gestão de projetos, IA integrada e dashboard analítico.',
      category: 'SaaS Platform',
      technologies: ['Vue.js', 'Node.js', 'AI Integration'],
      results: ['Sistema em produção', 'Gestão inteligente de projetos'],
      image: `${process.env.PUBLIC_URL}/images/proflow/proflow.png`,
      liveUrl: 'https://www.proflow.pro/',
      githubUrl: 'https://github.com/LeonardoRFragoso/ProFlow'
    },
    {
      id: 2,
      title: 'Base Corporativa',
      description: 'E-commerce completo para venda de uniformes com sistema de carrinho e painel administrativo.',
      category: 'E-commerce',
      technologies: ['React', 'Django', 'PostgreSQL'],
      results: ['Loja online em produção', 'Interface otimizada'],
      image: `${process.env.PUBLIC_URL}/images/base/base1.png`,
      liveUrl: 'https://basecorporativa.store/',
      githubUrl: 'https://github.com/LeonardoRFragoso/base-corporativa'
    },
    {
      id: 3,
      title: 'TVs Corporativas',
      description: 'Sistema de displays digitais para operações portuárias com exibição em tempo real.',
      category: 'Enterprise',
      technologies: ['Python', 'React', 'WebSockets'],
      results: ['Displays em tempo real', 'Gestão centralizada'],
      image: '/images/digital-signage/1.jpg',
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
          <h2>Projetos que Geraram Resultados</h2>
          <p>Conheça algumas das soluções que desenvolvemos para nossos clientes</p>
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
                <img src={project.image} alt={project.title} />
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
            Ver Todos os Projetos
            <FaArrowRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
