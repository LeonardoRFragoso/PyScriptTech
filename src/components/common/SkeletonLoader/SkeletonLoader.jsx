import React from 'react';
import styles from './SkeletonLoader.module.css';

const SkeletonLoader = ({ 
  variant = 'rectangle',
  width,
  height,
  borderRadius,
  className = '',
  count = 1,
  gap = '0.75rem',
}) => {
  const skeletonStyle = {
    width: width || (variant === 'circle' ? '40px' : '100%'),
    height: height || (variant === 'circle' ? '40px' : variant === 'text' ? '1rem' : '100px'),
    borderRadius: borderRadius || (variant === 'circle' ? '50%' : variant === 'text' ? '4px' : '8px'),
  };

  if (count > 1) {
    return (
      <div className={styles.skeletonGroup} style={{ gap }}>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`${styles.skeleton} ${styles[variant]} ${className}`}
            style={skeletonStyle}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={skeletonStyle}
    />
  );
};

export const SkeletonCard = ({ className = '' }) => (
  <div className={`${styles.skeletonCard} ${className}`}>
    <SkeletonLoader variant="rectangle" height="180px" />
    <div className={styles.skeletonCardContent}>
      <SkeletonLoader variant="text" width="70%" height="1.5rem" />
      <SkeletonLoader variant="text" width="100%" />
      <SkeletonLoader variant="text" width="90%" />
      <div className={styles.skeletonCardFooter}>
        <SkeletonLoader variant="circle" width="32px" height="32px" />
        <SkeletonLoader variant="text" width="100px" />
      </div>
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5, cols = 4 }) => (
  <div className={styles.skeletonTable}>
    <div className={styles.skeletonTableHeader}>
      {Array.from({ length: cols }).map((_, i) => (
        <SkeletonLoader key={i} variant="text" height="1rem" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className={styles.skeletonTableRow}>
        {Array.from({ length: cols }).map((_, colIndex) => (
          <SkeletonLoader key={colIndex} variant="text" height="1rem" />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonProfile = () => (
  <div className={styles.skeletonProfile}>
    <SkeletonLoader variant="circle" width="80px" height="80px" />
    <div className={styles.skeletonProfileInfo}>
      <SkeletonLoader variant="text" width="150px" height="1.25rem" />
      <SkeletonLoader variant="text" width="100px" height="0.875rem" />
    </div>
  </div>
);

export default SkeletonLoader;
