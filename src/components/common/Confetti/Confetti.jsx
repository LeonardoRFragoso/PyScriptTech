import React, { useEffect, useRef } from 'react';
import styles from './Confetti.module.css';

const Confetti = ({ 
  active = false, 
  duration = 3000,
  particleCount = 100,
  colors = ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b', '#ff6b6b'],
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = styles.particle;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 0.5 + 's';
      particle.style.animationDuration = (Math.random() * 1 + 2) + 's';
      
      const size = Math.random() * 8 + 4;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      if (Math.random() > 0.5) {
        particle.style.borderRadius = '50%';
      }
      
      container.appendChild(particle);
      particles.push(particle);
    }

    const timeout = setTimeout(() => {
      particles.forEach(p => p.remove());
    }, duration);

    return () => {
      clearTimeout(timeout);
      particles.forEach(p => p.remove());
    };
  }, [active, duration, particleCount, colors]);

  if (!active) return null;

  return <div ref={containerRef} className={styles.confettiContainer} />;
};

export default Confetti;
