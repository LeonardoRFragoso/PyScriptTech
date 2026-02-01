import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn, FiZoomOut } from 'react-icons/fi';
import styles from './Lightbox.module.css';

const Lightbox = ({ 
  images = [],
  currentIndex = 0,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowRight':
        onNext?.();
        break;
      case 'ArrowLeft':
        onPrev?.();
        break;
      default:
        break;
    }
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown, isOpen]);

  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 1));
    if (zoom <= 1.5) setPosition({ x: 0, y: 0 });
  };

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className={styles.controls}>
            <button onClick={handleZoomOut} disabled={zoom <= 1}>
              <FiZoomOut />
            </button>
            <span>{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} disabled={zoom >= 3}>
              <FiZoomIn />
            </button>
            <button onClick={onClose}>
              <FiX />
            </button>
          </div>

          <motion.div
            className={styles.imageContainer}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <motion.img
              src={currentImage?.src || currentImage}
              alt={currentImage?.alt || `Image ${currentIndex + 1}`}
              className={styles.image}
              style={{
                transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
              }}
              drag={zoom > 1}
              dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
              onDrag={(_, info) => {
                if (zoom > 1) {
                  setPosition({ x: info.offset.x / zoom, y: info.offset.y / zoom });
                }
              }}
            />
          </motion.div>

          {images.length > 1 && (
            <>
              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
                disabled={currentIndex === 0}
              >
                <FiChevronLeft />
              </button>
              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={(e) => { e.stopPropagation(); onNext?.(); }}
                disabled={currentIndex === images.length - 1}
              >
                <FiChevronRight />
              </button>
            </>
          )}

          {images.length > 1 && (
            <div className={styles.counter}>
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {images.length > 1 && (
            <div className={styles.thumbnails}>
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${index === currentIndex ? styles.active : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    const diff = index - currentIndex;
                    if (diff > 0) for (let i = 0; i < diff; i++) onNext?.();
                    else for (let i = 0; i < -diff; i++) onPrev?.();
                  }}
                >
                  <img src={img?.src || img} alt="" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
