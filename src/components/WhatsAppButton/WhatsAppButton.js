import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { logWhatsAppClick } from '../../services/analytics';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const whatsappNumber = '5521980292791';
  const message = 'Olá! Gostaria de solicitar um diagnóstico gratuito sobre automação, IA ou sistemas corporativos para minha empresa.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    logWhatsAppClick();
  };

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      onClick={handleClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Falar no WhatsApp"
    >
      <FaWhatsapp className="whatsapp-icon" />
      <span className="whatsapp-tooltip">Fale Conosco</span>
    </motion.a>
  );
};

export default WhatsAppButton;
