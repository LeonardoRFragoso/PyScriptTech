import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './FlipCard.module.css';

const FlipCard = ({ 
  front, 
  back, 
  flipOnHover = true,
  flipOnClick = false,
  height = '300px',
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (flipOnClick) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleHover = (hovering) => {
    if (flipOnHover) {
      setIsFlipped(hovering);
    }
  };

  return (
    <div 
      className={`${styles.flipCardContainer} ${className}`}
      style={{ height }}
      onClick={handleClick}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <motion.div
        className={styles.flipCard}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className={styles.flipCardFront}>
          {front}
        </div>
        <div className={styles.flipCardBack}>
          {back}
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
