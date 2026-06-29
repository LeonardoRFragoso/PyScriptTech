// src/pages/HomePage/TestimonialsSection/TestimonialsSection.js
import React from 'react';
import styles from './TestimonialsSection.module.css'; // Importa os estilos como módulo
import avatar1 from '../../../assets/img/avatar1.jpg'; // Caminho para a imagem do avatar
import avatar2 from '../../../assets/img/avatar2.jpg'; // Caminho para a imagem do avatar
import avatar3 from '../../../assets/img/avatar3.jpg'; // Caminho para a imagem do avatar

const TestimonialsSection = () => {
  return (
    <section className={styles.testimonialsSection}>
      <h2 className={styles.testimonialsTitle}>Resultados que Falam</h2>
      <div className={styles.testimonialsContainer}>
        {/* Testimonial 1 */}
        <div className={styles.testimonialItem}>
          <img src={avatar1} alt="Ricardo Mendes - CEO TechStart" className={styles.testimonialAvatar} loading="lazy" decoding="async" />
          <blockquote>
            "A PyScript.tech entregou em 3 semanas o que outras empresas levariam meses. 
            Nossa plataforma de e-commerce aumentou as conversões em 40% no primeiro mês."
          </blockquote>
          <p className={styles.testimonialName}>Ricardo Mendes — CEO, TechStart</p>
        </div>
        {/* Testimonial 2 */}
        <div className={styles.testimonialItem}>
          <img src={avatar2} alt="Marina Santos - Diretora de Operações" className={styles.testimonialAvatar} loading="lazy" decoding="async" />
          <blockquote>
            "O bot de atendimento que desenvolveram processa mais de 500 solicitações 
            por dia sem intervenção humana. Reduzimos custos operacionais em 65%."
          </blockquote>
          <p className={styles.testimonialName}>Marina Santos — Dir. Operações, LogiFlow</p>
        </div>
        {/* Testimonial 3 */}
        <div className={styles.testimonialItem}>
          <img src={avatar3} alt="Carlos Eduardo - Fundador" className={styles.testimonialAvatar} loading="lazy" decoding="async" />
          <blockquote>
            "Profissionalismo e expertise técnica de altíssimo nível. O sistema que 
            criaram integrou todos os nossos processos e eliminou retrabalho."
          </blockquote>
          <p className={styles.testimonialName}>Carlos Eduardo — Fundador, InnovateBR</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
