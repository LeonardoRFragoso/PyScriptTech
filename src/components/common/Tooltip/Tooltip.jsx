import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Tooltip.module.css';

const Tooltip = ({ 
  children, 
  content, 
  position = 'top',
  delay = 200,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const showTooltip = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const positions = {
    top: { initial: { y: 10 }, animate: { y: 0 }, className: styles.top },
    bottom: { initial: { y: -10 }, animate: { y: 0 }, className: styles.bottom },
    left: { initial: { x: 10 }, animate: { x: 0 }, className: styles.left },
    right: { initial: { x: -10 }, animate: { x: 0 }, className: styles.right },
  };

  const posConfig = positions[position];

  return (
    <div 
      className={`${styles.tooltipWrapper} ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`${styles.tooltip} ${posConfig.className}`}
            initial={{ opacity: 0, ...posConfig.initial }}
            animate={{ opacity: 1, ...posConfig.animate }}
            exit={{ opacity: 0, ...posConfig.initial }}
            transition={{ duration: 0.15 }}
          >
            {content}
            <div className={styles.arrow} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
