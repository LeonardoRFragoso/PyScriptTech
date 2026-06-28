import KeywordLandingPage from './KeywordLandingPage';

const pageData = {
  badge: 'IA para Logística',
  headline: 'Inteligência Artificial para Logística e Transporte',
  subheadline: 'IA para otimizar rotas, prever demandas, analisar documentos e automatizar a operação logística da sua empresa.',
  title: 'Inteligência Artificial para Logística',
  description: 'Soluções de IA para logística: otimização de rotas, previsão de demanda, análise de documentos e automação operacional.',
  url: 'https://pyscript.tech/inteligencia-artificial-logistica',
  serviceType: 'AI for Logistics',
  seoTitle: 'Inteligência Artificial para Logística | PyScript.tech',
  seoDescription: 'IA para logística: otimização de rotas, previsão de demanda, análise de documentos e automação operacional.',
  keywords: 'inteligência artificial para logística, IA transporte, otimização de rotas, previsão de demanda, RAG logística, PyScript.tech',
  whatsappMessage: 'Olá! Gostaria de saber mais sobre Inteligência Artificial para Logística na minha empresa.',
  problemTitle: 'Como a IA resolve problemas de logística?',
  problems: [
    { title: 'Rotas ineficientes', description: 'Planejamento manual de rotas gera custos extras e atrasos.' },
    { title: 'Documentos demais', description: 'CT-e, MDF-e, contratos e notas fiscais exigem análise manual.' },
    { title: 'Previsão de demanda', description: 'Falta de previsão precisa gera ruptura ou excesso de estoque.' }
  ],
  solutionTitle: 'Como aplicamos IA na logística',
  solutionDescription: [
    'Desenvolvemos soluções de IA para otimizar rotas, prever demandas, analisar documentos fiscais e automatizar processos logísticos. Utilizamos machine learning, RAG e integração com sistemas de gestão de transporte.',
    'Nossos projetos incluem dashboards preditivos, assistentes virtuais para motoristas e integração com CT-e, MDF-e e rastreamento.'
  ],
  benefits: [
    'Otimização de rotas e redução de combustível',
    'Previsão de demanda e estoque',
    'Análise automática de documentos fiscais',
    'Assistente virtual para motoristas e clientes',
    'Integração com TMS, ERP e GPS',
    'Dashboards preditivos de performance'
  ],
  steps: [
    { title: 'Diagnóstico', description: 'Mapeamos processos logísticos e dados disponíveis.' },
    { title: 'Modelagem', description: 'Definimos modelos de IA e integrações necessárias.' },
    { title: 'Implementação', description: 'Desenvolvemos assistentes, preditivos e automações.' },
    { title: 'Escala', description: 'Expandimos para novos processos e indicadores.' }
  ],
  faqs: [
    { question: 'IA consegue otimizar rotas de entrega?', answer: 'Sim. Podemos desenvolver algoritmos que consideram distância, tráfego, janelas de entrega e capacidade dos veículos.' },
    { question: 'A IA pode ler CT-e e MDF-e?', answer: 'Sim. Utilizamos OCR e modelos de IA para extrair dados de documentos fiscais e alimentar o sistema.' },
    { question: 'Quanto tempo leva um projeto de IA para logística?', answer: 'MVPs de 4-8 semanas. Soluções completas de 2-4 meses.' }
  ],
  finalCta: {
    title: 'Quer usar IA na sua logística?',
    description: 'Solicite um diagnóstico gratuito e descubra oportunidades de IA para reduzir custos logísticos.'
  }
};

const InteligenciaArtificialLogistica = () => <KeywordLandingPage pageData={pageData} />;

export default InteligenciaArtificialLogistica;
