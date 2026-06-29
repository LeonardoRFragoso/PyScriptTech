import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiFileText, FiCheckCircle, FiLayers, FiMessageSquare, FiClock, FiShield, FiUserCheck, FiDollarSign } from 'react-icons/fi';
import SEO from '../../components/SEO/SEO';
import './ComoFuncionaExecucao.css';

const steps = [
  {
    icon: <FiSearch />,
    title: 'Diagnóstico',
    description: 'Você solicita um diagnóstico gratuito. Nossa equipe analisa seus processos, dores e oportunidades de automação, IA ou sistemas corporativos.'
  },
  {
    icon: <FiFileText />,
    title: 'Proposta',
    description: 'Preparamos uma proposta personalizada com escopo claro, investimento, prazos e entregáveis. Tudo alinhado antes de qualquer compromisso.'
  },
  {
    icon: <FiCheckCircle />,
    title: 'Aprovação',
    description: 'Após você aprovar a proposta, o lead é fechado e preparamos a criação do projeto no Portal de Projetos ProFlow da PyScript.Tech.'
  },
  {
    icon: <FiLayers />,
    title: 'Etapas e milestones',
    description: 'O projeto é organizado em milestones claros. Cada etapa tem prazo, entrega, responsável e critérios de aprovação definidos.'
  },
  {
    icon: <FiMessageSquare />,
    title: 'Comunicação centralizada',
    description: 'Todas as mensagens, arquivos, feedbacks e aprovações ficam no portal. Você não perde nada em emails ou grupos de mensagem.'
  },
  {
    icon: <FiDollarSign />,
    title: 'Pagamentos e entregas',
    description: 'Acompanhe o status financeiro e libere pagamentos conforme as entregas forem aprovadas. Transparência total em cada etapa.'
  },
  {
    icon: <FiClock />,
    title: 'Conclusão',
    description: 'Após a homologação e deploy, entregamos a documentação, treinamento e suporte inicial. Seu projeto entra em operação com segurança.'
  }
];

const faqData = [
  {
    question: 'Preciso criar conta na ProFlow?',
    answer: 'Sim, mas você receberá um convite da PyScript.Tech por email. O processo é simples e rápido. A ProFlow funciona como o Portal de Projetos próprio da PyScript.Tech.'
  },
  {
    question: 'Quem executa meu projeto?',
    answer: 'A PyScript.Tech continua sendo a responsável pela gestão e entrega. A ProFlow é apenas o ambiente utilizado para organizar a execução, comunicação e entregas. Eventuais parceiros ou freelancers só atuam sob supervisão da PyScript.'
  },
  {
    question: 'A PyScript continua responsável pelo projeto?',
    answer: 'Sim. A responsabilidade técnica, comercial e de entrega continua sendo da PyScript.Tech. A ProFlow é o portal operacional utilizado para dar transparência ao processo.'
  },
  {
    question: 'Como acompanho as entregas?',
    answer: 'No Portal de Projetos você visualiza milestones, prazos, arquivos, mensagens e status de cada entrega. Recebe notificações quando uma etapa é concluída ou precisa da sua aprovação.'
  },
  {
    question: 'Como funcionam pagamentos e etapas?',
    answer: 'O pagamento pode ser feito por milestone aprovado. O projeto só avança para a próxima etapa após aprovação da entrega atual, garantindo segurança para ambas as partes.'
  },
  {
    question: 'Posso falar diretamente com a equipe?',
    answer: 'Sim. O portal possui mensagens centralizadas para comunicação entre você e a equipe da PyScript responsável pelo projeto.'
  },
  {
    question: 'Meus dados ficam seguros?',
    answer: 'Sim. A ProFlow utiliza autenticação segura, permissões por papel e acesso restrito. Seu projeto é privado e apenas você e a equipe PyScript autorizada têm acesso.'
  }
];

const ComoFuncionaExecucao = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="execucaoPage">
      <SEO
        title="Como funciona a execução de projetos - PyScript.tech"
        description="Entenda como a PyScript.Tech executa projetos com transparência. Diagnóstico, proposta, aprovação e acompanhamento no Portal de Projetos ProFlow."
        url="https://pyscript.tech/como-funciona-a-execucao"
        keywords="execução de projetos, portal de projetos, acompanhamento de projetos, PyScript ProFlow, gestão de projetos B2B"
      />

      <section className="execucaoHero">
        <div className="execucaoContainer">
          <span className="execucaoBadge">Processo de Entrega</span>
          <h1>Execução transparente do início ao fim</h1>
          <p>
            Da proposta aprovada à entrega final, você acompanha cada etapa em nosso Portal de Projetos.
            A PyScript.Tech permanece responsável pela gestão e entrega, enquanto a ProFlow.pro centraliza
            prazos, milestones, comunicação e aprovações.
          </p>
        </div>
      </section>

      <section className="execucaoSteps">
        <div className="execucaoContainer">
          <div className="stepsGrid">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="stepCard"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="stepNumber">{index + 1}</div>
                <div className="stepIconLarge">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="execucaoPortal">
        <div className="execucaoContainer">
          <div className="portalContent">
            <div className="portalText">
              <span className="execucaoBadge">Portal de Projetos</span>
              <h2>O que você encontra no portal</h2>
              <p>
                Após aprovar a proposta, seu projeto é criado no Portal de Projetos ProFlow da PyScript.Tech.
                Por lá, você tem acesso a:
              </p>
              <ul className="portalList">
                <li><FiLayers /> Milestones e etapas do projeto</li>
                <li><FiClock /> Prazos e datas de entrega</li>
                <li><FiMessageSquare /> Comunicação centralizada com a equipe</li>
                <li><FiFileText /> Arquivos, documentos e entregáveis</li>
                <li><FiCheckCircle /> Aprovação de entregas</li>
                <li><FiDollarSign /> Status de pagamentos por etapa</li>
              </ul>
              <div className="portalNote">
                <FiShield /> <strong>Privacidade e segurança:</strong> seu projeto é privado. Apenas você e a equipe autorizada da PyScript têm acesso.
              </div>
            </div>
            <div className="portalVisual">
              <div className="portalCard">
                <div className="portalCardHeader">
                  <span>Portal de Projetos</span>
                  <strong>ProFlow.pro</strong>
                </div>
                <div className="portalCardBody">
                  <div className="portalProgress">
                    <div className="portalProgressBar" style={{ width: '60%' }}></div>
                  </div>
                  <div className="portalMilestones">
                    <div className="portalMilestone done"><FiCheckCircle /> Diagnóstico técnico</div>
                    <div className="portalMilestone done"><FiCheckCircle /> Arquitetura</div>
                    <div className="portalMilestone active"><FiClock /> Desenvolvimento MVP</div>
                    <div className="portalMilestone"><FiLayers /> Integrações</div>
                    <div className="portalMilestone"><FiCheckCircle /> Homologação</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="execucaoFAQ">
        <div className="execucaoContainer">
          <div className="sectionHeader">
            <span className="execucaoBadge">Dúvidas Frequentes</span>
            <h2>Perguntas & Respostas</h2>
            <p>Tudo sobre o acompanhamento de projetos na PyScript.Tech</p>
          </div>
          <div className="faqList">
            {faqData.map((item, index) => (
              <div
                key={index}
                className={`faqItem ${openFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faqQuestion">
                  <span>{item.question}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="faqIcon">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
                <div className="faqAnswer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="execucaoCTA">
        <div className="execucaoContainer">
          <h2>Quer começar um projeto?</h2>
          <p>Solicite um diagnóstico gratuito e descubra como a tecnologia pode transformar sua operação.</p>
          <div className="ctaButtons">
            <button className="ctaPrimary" onClick={() => navigate('/diagnostico-gratuito')}>
              Solicitar Diagnóstico Gratuito
            </button>
            <button className="ctaSecondary" onClick={() => navigate('/contact')}>
              Falar com Especialista
            </button>
            <a
              className="ctaSecondary"
              href="https://proflow.pro"
              target="_blank"
              rel="noopener noreferrer"
            >
              Acessar Portal de Projetos
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComoFuncionaExecucao;
