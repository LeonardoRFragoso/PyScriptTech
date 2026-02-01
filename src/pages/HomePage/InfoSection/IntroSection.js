// src/pages/HomePage/IntroSection/IntroSection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './IntroSection.module.css';
import logo from '../../../assets/img/logopyscript.png';
import ParticlesBackground from '../../../components/common/ParticlesBackground';

const IntroSection = () => {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate('/contact');
  };

  return (
    <section className={styles.introSection}>
      <ParticlesBackground particleCount={40} color="#00d4ff" speed={0.3} />
      <motion.div 
        className={styles.introContent}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.badge}>
          🚀 Software House • Rio de Janeiro • +70 Projetos Entregues
        </div>
        <h1>
          Transforme Sua Ideia em um
          <span>Sistema que Gera Resultados Reais</span>
        </h1>
        <p>
          Desenvolvemos software sob medida que aumenta sua receita, reduz custos operacionais 
          e automatiza processos. De e-commerce de alta conversão a sistemas enterprise escaláveis 
          — <strong>entregamos em até 30 dias com garantia de satisfação</strong>.
        </p>
        <div className={styles.ctaWrapper}>
          <button className={styles.ctaButton} onClick={handleCTAClick}>
            Fale com um Especialista
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button className={styles.ctaSecondary} onClick={() => navigate('/projects')}>
            Ver Projetos
          </button>
        </div>
      </motion.div>
      <motion.div 
        className={styles.introImage}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <img 
          src={logo} 
          alt="PyScript.tech - Software House" 
          className={styles.logoImage} 
        />
      </motion.div>
    </section>
  );
};

export default IntroSection;
