import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './FAQSection.css';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Quanto tempo leva para desenvolver um projeto?',
      answer: 'Depende da complexidade. Automações e integrações pontuais ficam prontas em 2–4 semanas. Sistemas corporativos completos (ERP, CRM, portais) levam de 30 a 90 dias. Trabalhamos com metodologia ágil, então você acompanha o progresso semanalmente e pode solicitar ajustes durante o desenvolvimento.'
    },
    {
      question: 'Qual o investimento necessário?',
      answer: 'Nossos projetos variam de R$ 5.000 (automações pontuais) até R$ 50.000+ (sistemas enterprise complexos). Oferecemos parcelamento em até 12x e pagamento por etapas. Solicite um diagnóstico gratuito para receber um orçamento personalizado baseado na sua necessidade específica.'
    },
    {
      question: 'Vocês oferecem garantia e suporte após a entrega?',
      answer: 'Sim. Oferecemos 30 dias de garantia total — se não ficar satisfeito, devolvemos 100% do investimento. O suporte técnico para bugs e correções está incluído sem custo adicional. Para evoluções e novos recursos, oferecemos planos de manutenção mensal.'
    },
    {
      question: 'Posso solicitar alterações durante o desenvolvimento?',
      answer: 'Sim. Nossa metodologia ágil permite ajustes durante todo o processo. Realizamos reuniões semanais de alinhamento onde você pode solicitar mudanças. Alterações dentro do escopo não geram custos extras. Para mudanças significativas fora do escopo, apresentamos um orçamento complementar e transparente.'
    },
    {
      question: 'Vocês atendem empresas de qual porte?',
      answer: 'Atendemos desde pequenas empresas até médias corporações. Nosso portfólio inclui sistemas para logística, e-commerce, financeiro e operações industriais. Cada projeto recebe atenção personalizada independente do tamanho.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faqSection">
      <div className="faqContainer">
        <motion.div
          className="faqHeader"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="faqBadge">❓ Perguntas Frequentes</span>
          <h2>Tudo que Você Precisa Saber Antes de Começar</h2>
          <p>Respostas transparentes para as dúvidas mais comuns dos nossos clientes</p>
        </motion.div>

        <div className="faqList">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faqItem ${activeIndex === index ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                className="faqQuestion"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{faq.question}</span>
                <div className="faqIcon">
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="faqAnswer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="faqCTA"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>Ainda tem dúvidas? Nossa equipe está pronta para ajudar!</p>
          <a href="/contact" className="faqButton">
            Falar com um Especialista
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
