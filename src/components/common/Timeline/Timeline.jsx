import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Timeline.module.css';

const TimelineItem = ({ item, index, isLast }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`${styles.timelineItem} ${isLeft ? styles.left : styles.right}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className={styles.timelineContent}>
        {item.icon && <div className={styles.icon}>{item.icon}</div>}
        {item.date && <span className={styles.date}>{item.date}</span>}
        <h3 className={styles.title}>{item.title}</h3>
        {item.description && <p className={styles.description}>{item.description}</p>}
        {item.tags && (
          <div className={styles.tags}>
            {item.tags.map((tag, i) => (
              <span key={i} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
      
      <div className={styles.timelineDot}>
        <motion.div
          className={styles.dot}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
        />
      </div>
      
      {!isLast && <div className={styles.timelineLine} />}
    </motion.div>
  );
};

const Timeline = ({ items, className = '' }) => {
  return (
    <div className={`${styles.timeline} ${className}`}>
      <div className={styles.timelineTrack} />
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          item={item}
          index={index}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
};

export default Timeline;
