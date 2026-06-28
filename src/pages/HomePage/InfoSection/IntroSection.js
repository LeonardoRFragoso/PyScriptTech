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
    navigate('/diagnostico-gratuito');
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
          🚀 Automação • Inteligência Artificial • Sistemas Corporativos
        </div>
        <h1>
          Automação, IA e Sistemas Corporativos
          <span>para Empresas</span>
        </h1>
        <p>
          Transformamos processos manuais em operações inteligentes através de 
          <strong>software personalizado, integrações e inteligência artificial</strong>. 
          Reduza custos, elimine retrabalho e escale seu negócio com menos esforço operacional.
        </p>
        <div className={styles.ctaWrapper}>
          <button className={styles.ctaButton} onClick={handleCTAClick}>
            Solicitar Diagnóstico Gratuito
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button className={styles.ctaSecondary} onClick={() => navigate('/projects')}>
            Ver Cases
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
          alt="PyScript.tech - Automação, IA e Sistemas Corporativos"
          className={styles.logoImage}
          width="400"
          height="400"
          loading="eager"
          decoding="async"
        />
      </motion.div>
    </section>
  );
};

export default IntroSection;
