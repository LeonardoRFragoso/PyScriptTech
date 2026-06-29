import React from 'react';
import { motion } from 'framer-motion';
import CounterStat from '../../../components/DesignSystem/CounterStat';
import { FaProjectDiagram, FaSmile, FaClock, FaCalendarAlt } from 'react-icons/fa';
import './StatsSection.css';

const StatsSection = () => {
  const stats = [
    {
      end: 70,
      suffix: '+',
      label: 'Projetos Entregues',
      icon: <FaProjectDiagram />,
    },
    {
      end: 98,
      suffix: '%',
      label: 'Taxa de Satisfação',
      icon: <FaSmile />,
    },
    {
      end: 24,
      suffix: 'h',
      label: 'Tempo de Resposta',
      icon: <FaClock />,
    },
    {
      end: 5,
      suffix: '+',
      label: 'Anos no Mercado',
      icon: <FaCalendarAlt />,
    },
  ];

  return (
    <section className="statsSection">
      <motion.div
        className="statsContainer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="statsHeader">
          <h2>Números que Falam por Si</h2>
          <p>Resultados reais de anos de dedicação e excelência</p>
        </div>
        <div className="statsGrid">
          {stats.map((stat, index) => (
            <CounterStat
              key={index}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
