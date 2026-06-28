import KeywordLandingPage from './KeywordLandingPage';

const pageData = {
  badge: 'Inteligência Artificial',
  headline: 'Inteligência Artificial para Empresas: do Diagnóstico à Produção',
  subheadline: 'Assistentes corporativos, RAG, chatbots internos e análise de documentos com IA para acelerar decisões e reduzir custos operacionais.',
  title: 'Inteligência Artificial para Empresas',
  description: 'Implementamos soluções de IA generativa, RAG e agentes inteligentes para empresas que querem transformar dados em decisões.',
  url: 'https://pyscript.tech/inteligencia-artificial-empresas',
  serviceType: 'Artificial Intelligence Services',
  seoTitle: 'Inteligência Artificial para Empresas | PyScript.tech',
  seoDescription: 'IA para empresas: assistentes corporativos, RAG, chatbots internos e análise de documentos. Transforme dados em decisões com a PyScript.tech.',
  keywords: 'inteligência artificial para empresas, IA corporativa, RAG, chatbot interno, análise de documentos com IA, PyScript.tech',
  whatsappMessage: 'Olá! Gostaria de saber mais sobre Inteligência Artificial para minha empresa.',
  problemTitle: 'Por que empresas precisam de IA agora?',
  problems: [
    { title: 'Dados desperdiçados', description: 'Empresas acumulam documentos e dados que não são transformados em insights acionáveis.' },
    { title: 'Atendimento e consultas lentas', description: 'Equipes gastam horas respondendo perguntas repetitivas e consultando documentos.' },
    { title: 'Tomada de decisão sem dados', description: 'Gestores tomam decisões baseadas em intuição por falta de análise automatizada.' }
  ],
  solutionTitle: 'Como implementamos IA no seu negócio',
  solutionDescription: [
    'Desenvolvemos soluções de IA sob medida, desde assistentes corporativos com RAG até análise automática de documentos e integração com LLMs. Trabalhamos com OpenAI, Langchain, OpenSearch, FastAPI e React para criar experiências práticas e seguras.',
    'Cada projeto começa com um diagnóstico do uso ideal de IA, priorizando casos com retorno mensurável e baixo risco.'
  ],
  benefits: [
    'Assistentes corporativos com acesso a documentos internos',
    'RAG para respostas com fontes verificáveis',
    'Chatbots internos para RH, jurídico, financeiro e operações',
    'Análise automática de contratos, notas fiscais e relatórios',
    'Dashboards preditivos e indicadores em tempo real',
    'Integração com sistemas existentes e dados privados'
  ],
  steps: [
    { title: 'Diagnóstico', description: 'Identificamos os melhores casos de uso de IA para seu negócio.' },
    { title: 'Prova de Conceito', description: 'Desenvolvemos um MVP em poucas semanas para validar valor.' },
    { title: 'Produção', description: 'Implantamos assistentes, APIs e integrações com segurança.' },
    { title: 'Evolução', description: 'Melhoramos modelos, expandimos casos de uso e acompanhamos métricas.' }
  ],
  faqs: [
    { question: 'A IA pode acessar dados internos da minha empresa?', answer: 'Sim. Implementamos RAG e bases vetoriais privadas para que a IA responda apenas com documentos e dados autorizados.' },
    { question: 'Quanto tempo leva para ter um assistente de IA em produção?', answer: 'MVPs de assistentes com RAG ficam prontos em 2-4 semanas. Soluções mais complexas de 1-3 meses.' },
    { question: 'Quais modelos de IA vocês utilizam?', answer: 'Trabalhamos com OpenAI GPT, Claude, modelos open source e LLMs self-hosted quando necessário para compliance.' }
  ],
  finalCta: {
    title: 'Pronto para implementar IA na sua empresa?',
    description: 'Solicite um diagnóstico gratuito e descubra o primeiro caso de uso de IA para seu negócio.'
  }
};

const InteligenciaArtificialEmpresas = () => <KeywordLandingPage pageData={pageData} />;

export default InteligenciaArtificialEmpresas;
