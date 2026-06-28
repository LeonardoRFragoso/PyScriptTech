// src/pages/Services/ServicesPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import ComparisonSection from './ComparisonSection/ComparisonSection';
import ServiceUrgencySection from './ServiceUrgencySection/ServiceUrgencySection';
import ExecutionSection from '../HomePage/ExecutionSection/ExecutionSection';
import TiltCard from '../../components/common/TiltCard';
import ParticlesBackground from '../../components/common/ParticlesBackground';
import './ServicesPage.css';

// Importação das imagens
import serviceImage1 from '../../assets/img/botdev.png';
import serviceImage2 from '../../assets/img/Softdev.png';
import serviceImage3 from '../../assets/img/webdev.png';

const servicesData = [
  {
    number: "01",
    title: "Inteligência Artificial",
    subtitle: "IA que resolve problemas reais",
    description: "Implementamos assistentes corporativos, RAG, chatbots internos e análise de documentos com IA. Transforme dados e conhecimento em respostas rápidas, precisas e disponíveis 24 horas por dia.",
    features: [
      "Assistentes corporativos com RAG",
      "Chatbots internos especializados",
      "Análise de documentos e contratos",
      "Integração com LLMs e bases privadas",
      "Dashboards preditivos",
      "Automação de decisões com IA"
    ],
    benefits: [
      { icon: "🧠", text: "Respostas em linguagem natural com fontes" },
      { icon: "⚡", text: "Redução de 80% no tempo de consulta" },
      { icon: "📈", text: "Decisões baseadas em dados reais" }
    ],
    technologies: ["Python", "FastAPI", "OpenAI", "Langchain", "OpenSearch", "React", "Docker"],
    image: serviceImage1,
    link: "/inteligencia-artificial-empresas"
  },
  {
    number: "02",
    title: "Automação de Processos",
    subtitle: "Elimine tarefas repetitivas",
    description: "Automatizamos fluxos operacionais, integrações e tarefas manuais com RPA, APIs e filas. Reduza custos, elimine erros humanos e libere sua equipe para atividades estratégicas.",
    features: [
      "RPA para sistemas sem API",
      "Integração entre plataformas",
      "Fluxos de aprovação automáticos",
      "Notificações e relatórios automáticos",
      "Conciliação e processamento de dados",
      "Monitoramento e logs de auditoria"
    ],
    benefits: [
      { icon: "�", text: "Redução de até 70% em custos operacionais" },
      { icon: "⏰", text: "Processos executados 24/7" },
      { icon: "🎯", text: "Erros humanos reduzidos a zero" }
    ],
    technologies: ["Python", "Selenium", "Playwright", "Airflow", "Redis", "RabbitMQ", "FastAPI"],
    image: serviceImage2,
    link: "/automacao-empresarial"
  },
  {
    number: "03",
    title: "Sistemas Corporativos",
    subtitle: "ERP, CRM e portais sob medida",
    description: "Desenvolvemos sistemas corporativos personalizados que integram departamentos, padronizam processos e oferecem visão em tempo real da operação. Do CRM ao ERP, tudo adaptado ao seu negócio.",
    features: [
      "ERP e CRM personalizados",
      "Portais internos e externos",
      "Dashboards executivos",
      "Gestão de usuários e permissões",
      "Workflows e aprovações",
      "Relatórios e indicadores"
    ],
    benefits: [
      { icon: "🏗️", text: "Sistema adaptado ao seu processo" },
      { icon: "🔒", text: "Segurança e auditoria corporativa" },
      { icon: "📊", text: "Visão completa da operação" }
    ],
    technologies: ["Python", "Django", "FastAPI", "React", "Vue.js", "PostgreSQL", "Docker"],
    image: serviceImage3,
    link: "/software-corporativo"
  },
  {
    number: "04",
    title: "Integrações",
    subtitle: "Conecte toda a sua operação",
    description: "Criamos APIs e conectores para integrar ERPs, CRMs, sistemas legados e serviços de terceiros. Elimine silos de informação e mantenha dados sincronizados em tempo real.",
    features: [
      "APIs REST e GraphQL",
      "Integração com ERPs e CRMs",
      "Conectores para sistemas legados",
      "ETL e sincronização de dados",
      "Webhooks e filas",
      "Monitoramento de integrações"
    ],
    benefits: [
      { icon: "�", text: "Sistemas conectados em tempo real" },
      { icon: "⚡", text: "Eliminação de entrada manual de dados" },
      { icon: "�", text: "Dados centralizados para decisões" }
    ],
    technologies: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Redis", "Apache Kafka", "Docker"],
    image: serviceImage2,
    link: "/integracao-de-sistemas"
  },
];

const statsData = [
  { number: "70+", label: "Projetos Entregues" },
  { number: "98%", label: "Clientes Satisfeitos" },
  { number: "24h", label: "Tempo de Resposta" },
  { number: "2", label: "Sistemas em Produção" },
];

const processSteps = [
  {
    step: "01",
    title: "Descoberta",
    description: "Entendemos seu negócio, desafios e objetivos através de reuniões consultivas.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    )
  },
  {
    step: "02",
    title: "Planejamento",
    description: "Criamos um roadmap detalhado com escopo, prazos e tecnologias ideais.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <line x1="10" y1="9" x2="8" y2="9"></line>
      </svg>
    )
  },
  {
    step: "03",
    title: "Desenvolvimento",
    description: "Construímos sua solução com sprints semanais e validações constantes.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    )
  },
  {
    step: "04",
    title: "Entrega & Suporte",
    description: "Deploy em produção, treinamento da equipe e suporte contínuo.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    )
  },
];

const faqData = [
  {
    question: "Quanto tempo leva para desenvolver um projeto completo?",
    answer: "Depende da complexidade. Landing pages e sites institucionais ficam prontos em 7-15 dias. E-commerces e sistemas web customizados levam de 30 a 60 dias. Sistemas enterprise complexos de 2-4 meses. Trabalhamos com metodologia ágil, então você vê progresso semanalmente e pode solicitar ajustes durante o desenvolvimento."
  },
  {
    question: "Qual o investimento necessário para cada tipo de serviço?",
    answer: "Software sob medida: R$ 15.000 a R$ 80.000+ | Aplicações web: R$ 5.000 a R$ 30.000 | Automações e bots: R$ 3.000 a R$ 25.000. Oferecemos parcelamento em até 12x e possibilidade de pagamento por etapas. Agende uma consultoria gratuita para receber um orçamento personalizado."
  },
  {
    question: "Vocês oferecem garantia e suporte após a entrega?",
    answer: "Sim! Oferecemos 30 dias de garantia total - se não ficar satisfeito, devolvemos 100% do investimento. Além disso, incluímos suporte técnico vitalício sem custo adicional para bugs e correções. Também oferecemos planos de manutenção mensal (a partir de R$ 500/mês) para evoluções e novos recursos."
  },
  {
    question: "Quais tecnologias vocês utilizam?",
    answer: "Somos especialistas em React, Vue.js, Next.js para frontend | Node.js, Python/Django, Java/Spring Boot para backend | PostgreSQL, MongoDB para bancos de dados | AWS, Docker, Kubernetes para infraestrutura. Mas nos adaptamos às suas necessidades! Se você já tem uma stack, podemos trabalhar com ela."
  },
  {
    question: "Como funciona o processo de pagamento?",
    answer: "Trabalhamos com 40% de entrada para iniciar o projeto, 30% no meio do desenvolvimento e 30% na entrega final. Para projetos maiores, podemos dividir em mais parcelas conforme os milestones. Aceitamos PIX, transferência bancária e cartão de crédito em até 12x."
  },
  {
    question: "Posso fazer alterações durante o desenvolvimento?",
    answer: "Absolutamente! Nossa metodologia ágil permite ajustes durante todo o processo. Fazemos reuniões semanais de alinhamento onde você pode solicitar mudanças. Alterações dentro do escopo não geram custos extras. Para mudanças significativas fora do escopo, apresentamos um orçamento complementar transparente."
  },
  {
    question: "O que acontece após o projeto ser entregue?",
    answer: "Após a entrega, você recebe todo o código-fonte, documentação completa e treinamento da equipe. Continuamos disponíveis para suporte técnico vitalício. Muitos clientes optam por contratos de manutenção mensal para evoluções contínuas, hospedagem gerenciada e monitoramento proativo."
  },
  {
    question: "Vocês trabalham com empresas de qual porte?",
    answer: "Atendemos desde startups e pequenas empresas até grandes corporações. Nosso portfólio inclui projetos para operações portuárias, e-commerces de médio porte, além de sistemas internos para empresas de diversos setores. Cada projeto recebe atenção personalizada independente do tamanho."
  },
];

const ServicesPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Software Development Services",
    "provider": {
      "@type": "Organization",
      "name": "PyScript.tech",
      "url": "https://pyscript.tech",
      "logo": "https://pyscript.tech/images/Leo-Perfil.png",
      "telephone": "+55-21-98029-2791",
      "email": "contato@pyscript.tech",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Rio de Janeiro",
        "addressRegion": "RJ",
        "addressCountry": "BR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "ratingCount": "70"
      }
    },
    "areaServed": "BR",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços de Desenvolvimento",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Inteligência Artificial",
            "description": "Assistentes corporativos, RAG, chatbots e análise de documentos com IA"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automação de Processos",
            "description": "RPA, integrações e eliminação de tarefas repetitivas"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sistemas Corporativos",
            "description": "ERP, CRM, portais internos e dashboards sob medida"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Integrações",
            "description": "APIs e conectores para ERPs, CRMs e sistemas legados"
          }
        }
      ]
    }
  };

  return (
    <>
      <SEO
        title="Automação, IA e Sistemas Corporativos para Empresas | PyScript.tech"
        description="Inteligência Artificial, Automação de Processos, Sistemas Corporativos e Integrações sob medida. Transforme processos manuais em operações inteligentes."
        url="https://pyscript.tech/services"
        keywords="inteligência artificial para empresas, automação empresarial, sistemas corporativos, integração de sistemas, software sob medida, desenvolvimento python, RAG, ERP, CRM"
      />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      <div className="servicesPage">
        {/* Hero Section */}
        <section className="servicesHero">
        <div className="heroContent">
          <span className="heroBadge">🚀 Automação • IA • Sistemas Corporativos</span>
          <h1>
            Soluções que Transformam
            <span>Processos Manuais em Operações Inteligentes</span>
          </h1>
          <p>
            Inteligência Artificial, Automação de Processos, Sistemas Corporativos e Integrações 
            sob medida. <strong>Resolvemos problemas de negócio com tecnologia</strong>, reduzindo 
            custos e liberando sua equipe para crescer.
          </p>
        </div>

        {/* Stats */}
        <div className="heroStats">
          {statsData.map((stat, index) => (
            <div key={index} className="statItem">
              <span className="statNumber">{stat.number}</span>
              <span className="statLabel">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="servicesGrid">
        {servicesData.map((service, index) => (
          <div key={index} className="serviceCard">
            <div className="cardImageWrapper">
              <img src={service.image} alt={service.title} className="cardImage" loading="lazy" decoding="async" />
              <span className="cardNumber">{service.number}</span>
            </div>
            <div className="cardContent">
              <span className="cardSubtitle">{service.subtitle}</span>
              <h2 className="cardTitle">{service.title}</h2>
              <p className="cardDescription">{service.description}</p>
              
              {/* Features */}
              <ul className="cardFeatures">
                {service.features.map((feature, i) => (
                  <li key={i}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Benefits */}
              <div className="cardBenefits">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="benefitItem">
                    <span className="benefitIcon">{benefit.icon}</span>
                    <span className="benefitText">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="cardTechnologies">
                <span className="techLabel">Tecnologias:</span>
                <div className="techTags">
                  {service.technologies.map((tech, i) => (
                    <span key={i} className="techTag">{tech}</span>
                  ))}
                </div>
              </div>

              <button className="cardButton" onClick={() => navigate(service.link || '/contact')}>
                <span>Saiba Mais</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Process Section */}
      <section className="processSection">
        <div className="sectionHeader">
          <span className="sectionBadge">Nossa Metodologia</span>
          <h2>Como trabalhamos</h2>
          <p>Um processo transparente e colaborativo do início ao fim</p>
        </div>
        <div className="processGrid">
          {processSteps.map((item, index) => (
            <div key={index} className="processCard">
              <div className="processIcon">{item.icon}</div>
              <div className="processStep">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {index < processSteps.length - 1 && (
                <div className="processConnector"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <ComparisonSection />

      <ExecutionSection />

      {/* FAQ Section */}
      <section className="faqSection">
        <div className="sectionHeader">
          <span className="sectionBadge">Dúvidas Frequentes</span>
          <h2>Perguntas & Respostas</h2>
          <p>Tudo que você precisa saber antes de começar</p>
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
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="faqIcon"
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
              <div className="faqAnswer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Urgency Section */}
      <ServiceUrgencySection />

      {/* CTA Section */}
      <section className="servicesCTA">
        <div className="ctaContent">
          <h2>Pronto para transformar seu negócio?</h2>
          <p>
            Agende uma conversa gratuita com nossos especialistas e descubra 
            como podemos ajudar sua empresa a crescer.
          </p>
          <div className="ctaButtons">
            <button className="ctaButton" onClick={() => navigate('/contact')}>
              <span>Agendar Conversa</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <a 
              href="https://wa.me/+5521980292791" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ctaButtonSecondary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default ServicesPage;
