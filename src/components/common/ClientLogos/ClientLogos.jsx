import React from 'react';
import { motion } from 'framer-motion';
import styles from './ClientLogos.module.css';

const ClientLogos = ({ 
  logos = [],
  title = "Empresas que confiam em nós",
  autoScroll = true,
  speed = 30,
}) => {
  const defaultLogos = [
    { name: 'Cliente 1', initial: 'C1' },
    { name: 'Cliente 2', initial: 'C2' },
    { name: 'Cliente 3', initial: 'C3' },
    { name: 'Cliente 4', initial: 'C4' },
    { name: 'Cliente 5', initial: 'C5' },
    { name: 'Cliente 6', initial: 'C6' },
  ];

  const displayLogos = logos.length > 0 ? logos : defaultLogos;
  const duplicatedLogos = [...displayLogos, ...displayLogos];

  return (
    <div className={styles.container}>
      {title && <h3 className={styles.title}>{title}</h3>}
      
      <div className={styles.logosWrapper}>
        <motion.div
          className={styles.logosTrack}
          animate={autoScroll ? { x: [0, -50 * displayLogos.length + '%'] } : {}}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: speed,
              ease: 'linear',
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className={styles.logoItem}>
              {logo.src ? (
                <img src={logo.src} alt={logo.name} className={styles.logoImage} />
              ) : (
                <div className={styles.logoPlaceholder}>
                  <span>{logo.initial || logo.name?.charAt(0)}</span>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ClientLogos;
