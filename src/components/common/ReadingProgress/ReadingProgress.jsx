import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './ReadingProgress.module.css';

const ReadingProgress = ({ 
  color = '#00d4ff',
  height = '3px',
  position = 'top',
  showPercentage = false,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        className={`${styles.progressBar} ${styles[position]}`}
        style={{
          scaleX,
          height,
          background: `linear-gradient(90deg, ${color}, #7c3aed)`,
        }}
      />
      {showPercentage && percentage > 0 && (
        <div className={styles.percentage}>
          {percentage}%
        </div>
      )}
    </>
  );
};

export default ReadingProgress;
