import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      className={`${styles.toggle} ${className}`}
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      <motion.div
        className={styles.iconContainer}
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <FiMoon className={styles.icon} /> : <FiSun className={styles.icon} />}
      </motion.div>
      <motion.div
        className={styles.slider}
        initial={false}
        animate={{ x: isDark ? 0 : 24 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
