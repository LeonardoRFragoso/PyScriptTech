import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  slideIn: {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -10 },
    visible: { opacity: 1, rotate: 0 },
  },
};

const AnimatedSection = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  staggerChildren = 0,
  ...props
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });

  const selectedAnimation = animations[animation] || animations.fadeInUp;

  const containerVariants = {
    hidden: selectedAnimation.hidden,
    visible: {
      ...selectedAnimation.visible,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: staggerChildren,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedItem = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.5,
  className = '',
  ...props
}) => {
  const selectedAnimation = animations[animation] || animations.fadeInUp;

  return (
    <motion.div
      variants={{
        hidden: selectedAnimation.hidden,
        visible: {
          ...selectedAnimation.visible,
          transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  ...props
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
