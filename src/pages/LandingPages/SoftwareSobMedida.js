import KeywordLandingPage from './KeywordLandingPage';

const pageData = {
  badge: 'Software Sob Medida',
  headline: 'Software Sob Medida que Resolve Problemas Reais do Seu Negócio',
  subheadline: 'Sistemas personalizados em Python, React e tecnologias modernas para automatizar processos, integrar dados e escalar sua operação.',
  title: 'Software Sob Medida',
  description: 'Desenvolvemos software sob medida para empresas que precisam de sistemas personalizados, integrados e escaláveis.',
  url: 'https://pyscript.tech/software-sob-medida',
  serviceType: 'Software Development',
  seoTitle: 'Software Sob Medida para Empresas | PyScript.tech',
  seoDescription: 'Desenvolvimento de software sob medida para empresas. Sistemas personalizados em Python, React e tecnologias modernas. Solicite um diagnóstico gratuito.',
  keywords: 'software sob medida, desenvolvimento de software, sistema personalizado, software para empresas, desenvolvimento python, PyScript.tech',
  whatsappMessage: 'Olá! Gostaria de saber mais sobre Software Sob Medida para minha empresa.',
  problemTitle: 'Por que empresas precisam de software sob medida?',
  problems: [
    { title: 'Sistemas genéricos não atendem', description: 'ERP e CRM prontos forçam processos que não combinam com a realidade da operação.' },
    { title: 'Planilhas e processos manuais', description: 'Dados espalhados e tarefas repetitivas aumentam erros e reduzem a produtividade.' },
    { title: 'Dificuldade para escalar', description: 'Software inadequado vira gargalo quando a empresa cresce.' }
  ],
  solutionTitle: 'Como entregamos software sob medida',
  solutionDescription: [
    'Desenvolvemos sistemas completamente alinhados ao fluxo de trabalho do seu negócio. Desde a descoberta até a entrega, trabalhamos com metodologia ágil, entregas semanais e validação constante.',
    'Nossas soluções são construídas com Python, React, FastAPI, Django e bancos de dados modernos, prontas para integrar com APIs, ERPs, CRMs e sistemas legados.'
  ],
  benefits: [
    'Sistema 100% adaptado ao seu processo de negócio',
    'Redução de tarefas manuais e retrabalho',
    'Integração com APIs, ERPs e CRMs',
    'Escalabilidade para acompanhar o crescimento',
    'Código limpo, documentado e sem vendor lock-in',
    'Suporte contínuo e garantia de 30 dias'
  ],
  steps: [
    { title: 'Diagnóstico', description: 'Entendemos seus processos, dores e objetivos de negócio.' },
    { title: 'Proposta', description: 'Apresentamos escopo, arquitetura, prazos e investimento.' },
    { title: 'Desenvolvimento', description: 'Entregas semanais com validação e ajustes contínuos.' },
    { title: 'Entrega', description: 'Deploy, treinamento, documentação e suporte.' }
  ],
  faqs: [
    { question: 'Quanto tempo leva para desenvolver um software sob medida?', answer: 'Depende da complexidade. Projetos simples levam 15-30 dias, sistemas corporativos de 1-3 meses e soluções enterprise complexas de 3-6 meses.' },
    { question: 'Qual o investimento para um software sob medida?', answer: 'Projetos iniciam em R$ 5.000 para soluções pontuais e podem chegar a R$ 80.000+ para sistemas enterprise. Trabalhamos com parcelamento e pagamento por etapas.' },
    { question: 'Posso integrar o software com meus sistemas atuais?', answer: 'Sim. Desenvolvemos APIs e integrações com ERPs, CRMs, sistemas legados e serviços de terceiros.' }
  ],
  finalCta: {
    title: 'Vamos construir seu software sob medida?',
    description: 'Agende um diagnóstico gratuito e descubra como um sistema personalizado pode transformar sua operação.'
  }
};

const SoftwareSobMedida = () => <KeywordLandingPage pageData={pageData} />;

export default SoftwareSobMedida;
