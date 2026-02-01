import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ 
  size = 'medium', 
  fullScreen = false,
  text = '',
  overlay = false 
}) => {
  const spinnerContent = (
    <div className={styles.spinnerWrapper}>
      <div className={`${styles.spinner} ${styles[size]}`}>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.dot}></div>
      </div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={styles.fullScreenContainer}>
        {spinnerContent}
      </div>
    );
  }

  if (overlay) {
    return (
      <div className={styles.overlayContainer}>
        {spinnerContent}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {spinnerContent}
    </div>
  );
};

export default LoadingSpinner;
