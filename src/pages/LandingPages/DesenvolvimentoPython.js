import KeywordLandingPage from './KeywordLandingPage';

const pageData = {
  badge: 'Desenvolvimento Python',
  headline: 'Desenvolvimento Python para Sistemas Corporativos e Automação',
  subheadline: 'Backend robusto, rápido e escalável com Python, FastAPI, Django e integração de IA para empresas que precisam de performance e confiabilidade.',
  title: 'Desenvolvimento Python',
  description: 'Desenvolvimento de sistemas corporativos, automações e APIs com Python, FastAPI e Django para empresas de todos os portes.',
  url: 'https://pyscript.tech/desenvolvimento-python',
  serviceType: 'Python Development',
  seoTitle: 'Desenvolvimento Python para Empresas | PyScript.tech',
  seoDescription: 'Desenvolvimento Python com FastAPI, Django e automação. Sistemas corporativos, APIs e integrações. Solicite um diagnóstico gratuito.',
  keywords: 'desenvolvimento python, python empresas, FastAPI, Django, backend python, automação python, PyScript.tech',
  whatsappMessage: 'Olá! Gostaria de saber mais sobre Desenvolvimento Python para minha empresa.',
  problemTitle: 'Por que escolher Python para o seu projeto?',
  problems: [
    { title: 'Linguagem versátil', description: 'Python permite construir APIs, automações, sistemas web, análise de dados e IA com um ecossistema maduro.' },
    { title: 'Produtividade alta', description: 'Sintaxe clara e bibliotecas robustas aceleram o desenvolvimento sem sacrificar qualidade.' },
    { title: 'Escalabilidade', description: 'FastAPI e Django suportam desde MVPs até sistemas enterprise com milhares de usuários.' }
  ],
  solutionTitle: 'Como usamos Python no seu negócio',
  solutionDescription: [
    'Utilizamos Python como linguagem principal para backend, automações, integrações e soluções de IA. Com FastAPI criamos APIs de alta performance, com Django desenvolvemos sistemas administrativos robustos e com bibliotecas como Selenium, Langchain e Pandas automatizamos processos e dados.',
    'Nossos projetos em Python são containerizados com Docker, seguem boas práticas de Clean Architecture e são preparados para deploy em nuvem.'
  ],
  benefits: [
    'APIs de alta performance com FastAPI',
    'Sistemas administrativos completos com Django',
    'Automação de processos e RPA',
    'Integração com IA, LLMs e RAG',
    'Análise de dados e dashboards',
    'Código limpo, testado e documentado'
  ],
  steps: [
    { title: 'Análise', description: 'Mapeamos requisitos, integrações e arquitetura ideal.' },
    { title: 'Protótipo', description: 'Validamos a solução antes do desenvolvimento completo.' },
    { title: 'Desenvolvimento', description: 'Codificamos com Python, testes e entregas semanais.' },
    { title: 'Produção', description: 'Deploy, monitoramento e suporte contínuo.' }
  ],
  faqs: [
    { question: 'Python é adequado para sistemas corporativos?', answer: 'Sim. Empresas como Netflix, Instagram e Spotify usam Python em escala. FastAPI e Django oferecem segurança, performance e maturidade.' },
    { question: 'Quais tipos de projeto vocês desenvolvem com Python?', answer: 'APIs, sistemas web, automações, RPA, integrações, chatbots com IA, análise de dados, dashboards e microserviços.' },
    { question: 'Python pode ser integrado com meu sistema atual?', answer: 'Sim. Desenvolvemos APIs e conectores para integrar Python com qualquer sistema que tenha interface de comunicação.' }
  ],
  finalCta: {
    title: 'Pronto para desenvolver seu projeto em Python?',
    description: 'Fale com nossos especialistas e receba uma proposta técnica personalizada.'
  }
};

const DesenvolvimentoPython = () => <KeywordLandingPage pageData={pageData} />;

export default DesenvolvimentoPython;
