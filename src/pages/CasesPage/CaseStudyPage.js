import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaCheck, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import SEO from '../../components/SEO/SEO';
import './CaseStudyPage.css';

const CaseStudyPage = ({ caseData }) => {
  const navigate = useNavigate();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": caseData.title,
    "description": caseData.description,
    "image": caseData.image,
    "author": {
      "@type": "Organization",
      "name": "PyScript.tech"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PyScript.tech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pyscript.tech/images/Leo-Perfil.png"
      }
    },
    "datePublished": "2026-06-26",
    "dateModified": "2026-06-26"
  };

  return (
    <div className="caseStudyPage">
      <SEO
        title={caseData.seoTitle}
        description={caseData.seoDescription}
        url={caseData.url}
        keywords={caseData.keywords}
        image={caseData.image}
        type="article"
      />

      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      {/* Hero */}
      <section className="caseHero">
        <motion.div
          className="caseHeroContent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="caseHeroBadge">Case de Sucesso</span>
          <h1>{caseData.title}</h1>
          <p className="caseSubtitle">{caseData.subtitle}</p>
          <p className="caseDescription">{caseData.description}</p>
          <div className="caseHeroActions">
            <button className="caseCtaPrimary" onClick={() => navigate('/diagnostico-gratuito')}>
              Solicitar Diagnóstico Gratuito
              <FaArrowRight />
            </button>
            {caseData.liveUrl && (
              <a href={caseData.liveUrl} target="_blank" rel="noopener noreferrer" className="caseCtaSecondary">
                <FaExternalLinkAlt />
                Ver Demo
              </a>
            )}
            {caseData.githubUrl && (
              <a href={caseData.githubUrl} target="_blank" rel="noopener noreferrer" className="caseCtaSecondary">
                <FaGithub />
                GitHub
              </a>
            )}
          </div>
        </motion.div>
        <motion.div
          className="caseHeroImage"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img src={caseData.image} alt={caseData.title} loading="lazy" />
        </motion.div>
      </section>

      {/* Results */}
      <section className="caseResults">
        <div className="caseContainer">
          <div className="caseResultsGrid">
            {caseData.results.map((result, index) => (
              <motion.div
                key={index}
                className="caseResultCard"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="caseResultNumber">{result.value}</span>
                <span className="caseResultLabel">{result.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="caseSection">
        <div className="caseContainer">
          <motion.div
            className="caseSectionHeader"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="caseSectionBadge">O Desafio</span>
            <h2>Problema</h2>
          </motion.div>
          <div className="caseSectionContent">
            {caseData.problem.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="caseSection caseSectionAlt">
        <div className="caseContainer">
          <motion.div
            className="caseSectionHeader"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="caseSectionBadge">A Solução</span>
            <h2>Solução Entregue</h2>
          </motion.div>
          <div className="caseSectionContent">
            {caseData.solution.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <ul className="caseFeatureList">
            {caseData.features.map((feature, index) => (
              <li key={index}>
                <FaCheck />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Architecture */}
      <section className="caseSection">
        <div className="caseContainer">
          <motion.div
            className="caseSectionHeader"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="caseSectionBadge">Arquitetura</span>
            <h2>Como foi Construído</h2>
          </motion.div>
          <div className="caseArchitecture">
            {caseData.architecture.map((step, index) => (
              <div key={index} className="caseArchitectureStep">
                <span className="caseArchitectureNumber">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="caseSection caseSectionAlt">
        <div className="caseContainer">
          <motion.div
            className="caseSectionHeader"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="caseSectionBadge">Tecnologias</span>
            <h2>Stack Utilizado</h2>
          </motion.div>
          <div className="caseTechGrid">
            {caseData.technologies.map((tech, index) => (
              <span key={index} className="caseTechTag">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="caseFinalCta">
        <div className="caseContainer">
          <motion.div
            className="caseFinalCtaContent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Quer resultados como esse no seu negócio?</h2>
            <p>
              Agende um diagnóstico gratuito e descubra como a PyScript.tech pode transformar 
              seus processos em operações inteligentes.
            </p>
            <button className="caseCtaPrimary" onClick={() => navigate('/diagnostico-gratuito')}>
              Solicitar Diagnóstico Gratuito
              <FaArrowRight />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyPage;
