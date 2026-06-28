import KeywordLandingPage from './KeywordLandingPage';

const pageData = {
  badge: 'Integração de Sistemas',
  headline: 'Integração de Sistemas para Conectar Sua Operação',
  subheadline: 'Conecte ERPs, CRMs, APIs e sistemas legados em uma operação única, automatizada e com dados sincronizados em tempo real.',
  title: 'Integração de Sistemas',
  description: 'Desenvolvemos integrações entre ERPs, CRMs, APIs e sistemas legados para eliminar silos de informação e automatizar fluxos.',
  url: 'https://pyscript.tech/integracao-de-sistemas',
  serviceType: 'System Integration',
  seoTitle: 'Integração de Sistemas e APIs para Empresas | PyScript.tech',
  seoDescription: 'Integração de sistemas, ERPs, CRMs e APIs. Conecte sua operação, elimine silos e automatize fluxos com a PyScript.tech.',
  keywords: 'integração de sistemas, integração ERP, integração CRM, APIs, sistemas legados, ETL, PyScript.tech',
  whatsappMessage: 'Olá! Gostaria de saber mais sobre Integração de Sistemas para minha empresa.',
  problemTitle: 'Por que sistemas desconectados prejudicam o negócio?',
  problems: [
    { title: 'Silos de informação', description: 'Cada departamento usa uma ferramenta diferente e os dados não conversam.' },
    { title: 'Entrada manual de dados', description: 'Funcionários precisam copiar informações entre sistemas, gerando atrasos e erros.' },
    { title: 'Visão fragmentada', description: 'Gestores não conseguem consolidar dados para tomar decisões rápidas.' }
  ],
  solutionTitle: 'Como integramos sistemas de forma inteligente',
  solutionDescription: [
    'Desenvolvemos APIs, conectores e middlewares que sincronizam dados entre ERPs, CRMs, plataformas de e-commerce, sistemas legados e serviços de terceiros. Utilizamos REST, GraphQL, filas, webhooks e ETL para garantir integração robusta e escalável.',
    'Cada integração é projetada com logs, monitoramento e tratamento de falhas para garantir confiabilidade na operação.'
  ],
  benefits: [
    'Sincronização de dados entre sistemas em tempo real',
    'Eliminação de entrada manual e retrabalho',
    'Integração com ERPs (SAP, TOTVS, Omie, Bling) e CRMs (Salesforce, HubSpot)',
    'APIs próprias para conectar parceiros e aplicativos',
    'Extração e transformação de dados de sistemas legados',
    'Monitoramento, logs e tratamento de erros'
  ],
  steps: [
    { title: 'Mapeamento', description: 'Identificamos sistemas, dados e fluxos que precisam ser conectados.' },
    { title: 'Arquitetura', description: 'Definimos APIs, conectores e estratégia de sincronização.' },
    { title: 'Implementação', description: 'Desenvolvemos integrações com testes e validação de dados.' },
    { title: 'Operação', description: 'Monitoramento, manutenção e evolução das integrações.' }
  ],
  faqs: [
    { question: 'Consigo integrar sistemas antigos sem API?', answer: 'Sim. Desenvolvemos conectores que leem arquivos, bancos de dados e interfaces para integrar sistemas legados.' },
    { question: 'A integração é segura?', answer: 'Sim. Trabalhamos com autenticação, criptografia, logs de auditoria e limitação de acesso conforme boas práticas de segurança.' },
    { question: 'Quanto tempo leva uma integração?', answer: 'Integrações simples entre APIs levam 5-10 dias. Integrações complexas com múltiplos sistemas legados de 2-8 semanas.' }
  ],
  finalCta: {
    title: 'Vamos conectar seus sistemas?',
    description: 'Solicite um diagnóstico gratuito e descubra como integrar sua operação de forma inteligente.'
  }
};

const IntegracaoDeSistemas = () => <KeywordLandingPage pageData={pageData} />;

export default IntegracaoDeSistemas;
