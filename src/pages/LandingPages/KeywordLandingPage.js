import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaArrowRight, FaWhatsapp, FaCalendarAlt } from 'react-icons/fa';
import SEO from '../../components/SEO/SEO';
import './KeywordLandingPage.css';

const KeywordLandingPage = ({ pageData }) => {
  const navigate = useNavigate();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageData.title,
    "description": pageData.description,
    "url": pageData.url,
    "mainEntity": {
      "@type": "Service",
      "serviceType": pageData.serviceType,
      "provider": {
        "@type": "Organization",
        "name": "PyScript.tech",
        "url": "https://pyscript.tech"
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pageData.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const whatsappUrl = `https://wa.me/5521980292791?text=${encodeURIComponent(pageData.whatsappMessage)}`;
  const calendlyUrl = "https://calendly.com/pyscripttech";

  return (
    <div className="keywordLandingPage">
      <SEO
        title={pageData.seoTitle}
        description={pageData.seoDescription}
        url={pageData.url}
        keywords={pageData.keywords}
      />

      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* Hero */}
      <section className="landingHero">
        <div className="landingContainer">
          <motion.div
            className="landingHeroContent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="landingBadge">{pageData.badge}</span>
            <h1>{pageData.headline}</h1>
            <p className="landingSubheadline">{pageData.subheadline}</p>
            <div className="landingHeroActions">
              <button className="landingCtaPrimary" onClick={() => navigate('/diagnostico-gratuito')}>
                Solicitar Diagnóstico Gratuito
                <FaArrowRight />
              </button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="landingCtaSecondary">
                <FaWhatsapp />
                Falar no WhatsApp
              </a>
            </div>
            <div className="landingTrust">
              <span className="landingTrustItem">✓ Resposta em 24h</span>
              <span className="landingTrustItem">✓ Orçamento sem compromisso</span>
              <span className="landingTrustItem">✓ 30 dias de garantia</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="landingSection">
        <div className="landingContainer">
          <motion.div
            className="landingSectionHeader"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="landingSectionBadge">O Problema</span>
            <h2>{pageData.problemTitle}</h2>
          </motion.div>
          <div className="landingProblemGrid">
            {pageData.problems.map((problem, index) => (
              <motion.div
                key={index}
                className="landingProblemCard"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3>{problem.title}</h3>
                <p>{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="landingSection landingSectionAlt">
        <div className="landingContainer">
          <motion.div
            className="landingSectionHeader"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="landingSectionBadge">A Solução</span>
            <h2>{pageData.solutionTitle}</h2>
          </motion.div>
          <div className="landingSolutionContent">
            {pageData.solutionDescription.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <ul className="landingBenefitList">
            {pageData.benefits.map((benefit, index) => (
              <li key={index}>
                <FaCheck />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="landingSection">
        <div className="landingContainer">
          <motion.div
            className="landingSectionHeader"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="landingSectionBadge">Como Funciona</span>
            <h2>Processo Simples e Transparente</h2>
          </motion.div>
          <div className="landingSteps">
            {pageData.steps.map((step, index) => (
              <motion.div
                key={index}
                className="landingStep"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="landingStepNumber">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="landingSection landingSectionAlt">
        <div className="landingContainer">
          <motion.div
            className="landingSectionHeader"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="landingSectionBadge">Dúvidas</span>
            <h2>Perguntas Frequentes</h2>
          </motion.div>
          <div className="landingFaqList">
            {pageData.faqs.map((faq, index) => (
              <div key={index} className="landingFaqItem">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="landingFinalCta">
        <div className="landingContainer">
          <motion.div
            className="landingFinalCtaContent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>{pageData.finalCta.title}</h2>
            <p>{pageData.finalCta.description}</p>
            <div className="landingFinalActions">
              <button className="landingCtaPrimary" onClick={() => navigate('/diagnostico-gratuito')}>
                Solicitar Diagnóstico Gratuito
                <FaArrowRight />
              </button>
              <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="landingCtaSecondary">
                <FaCalendarAlt />
                Agendar Reunião no Calendly
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default KeywordLandingPage;
