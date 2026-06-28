import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaFire, FaUsers, FaGift } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './UrgencySection.css';

const UrgencySection = () => {
  const navigate = useNavigate();
  const [spotsLeft, setSpotsLeft] = useState(3);
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 23,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const benefits = [
    {
      icon: <FaGift />,
      text: '10% de desconto na primeira contratação'
    },
    {
      icon: <FaClock />,
      text: 'Prioridade no agendamento'
    },
    {
      icon: <FaUsers />,
      text: 'Consultoria estratégica gratuita (1h)'
    }
  ];

  return (
    <section className="urgencySection">
      <div className="urgencyContainer">
        <motion.div
          className="urgencyContent"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="urgencyBadge">
            <FaFire />
            <span>Vagas Limitadas Este Mês</span>
          </div>

          <h2>
            Apenas <span className="highlight">{spotsLeft} Vagas</span> Disponíveis em Janeiro
          </h2>

          <p className="urgencyDescription">
            Para garantir qualidade excepcional, limitamos nosso atendimento a apenas 5 novos projetos por mês. 
            <strong> Agende agora e garanta benefícios exclusivos:</strong>
          </p>

          <div className="benefitsList">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="benefitItem"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="benefitIcon">{benefit.icon}</div>
                <span>{benefit.text}</span>
              </motion.div>
            ))}
          </div>

          <div className="countdown">
            <div className="countdownLabel">
              <FaClock />
              <span>Esta oferta expira em:</span>
            </div>
            <div className="countdownTimer">
              <div className="timerBlock">
                <span className="timerNumber">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="timerLabel">Horas</span>
              </div>
              <span className="timerSeparator">:</span>
              <div className="timerBlock">
                <span className="timerNumber">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="timerLabel">Minutos</span>
              </div>
              <span className="timerSeparator">:</span>
              <div className="timerBlock">
                <span className="timerNumber">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="timerLabel">Segundos</span>
              </div>
            </div>
          </div>

          <div className="urgencyCTA">
            <button className="ctaButtonMain" onClick={() => navigate('/diagnostico-gratuito')}>
              Garantir Minha Vaga Agora
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <p className="ctaDisclaimer">
              ✓ Resposta em até 2 horas úteis • ✓ Sem compromisso • ✓ Proposta personalizada gratuita
            </p>
          </div>

          <div className="socialProof">
            <div className="proofItem">
              <div className="proofAvatars">
                <div className="avatar">JM</div>
                <div className="avatar">AS</div>
                <div className="avatar">RF</div>
                <span className="avatarMore">+15</span>
              </div>
              <p><strong>18 empresas</strong> solicitaram orçamento nas últimas 48 horas</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UrgencySection;
