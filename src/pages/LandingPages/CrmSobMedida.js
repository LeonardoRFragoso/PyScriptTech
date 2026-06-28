import KeywordLandingPage from './KeywordLandingPage';

const pageData = {
  badge: 'CRM Sob Medida',
  headline: 'CRM Sob Medida para Aumentar suas Vendas',
  subheadline: 'CRM personalizado que se adapta ao seu processo comercial, integra com ferramentas e gera indicadores para fechar mais negócios.',
  title: 'CRM Sob Medida',
  description: 'Desenvolvemos CRM personalizado para empresas. Sistema de gestão comercial adaptado ao seu processo de vendas.',
  url: 'https://pyscript.tech/crm-sob-medida',
  serviceType: 'Custom CRM Development',
  seoTitle: 'CRM Sob Medida para Empresas | PyScript.tech',
  seoDescription: 'CRM personalizado que se adapta ao seu processo comercial, integra com ferramentas e gera indicadores para fechar mais.',
  keywords: 'crm sob medida, CRM personalizado, sistema de vendas, CRM para empresas, desenvolvimento CRM, PyScript.tech',
  whatsappMessage: 'Olá! Gostaria de saber mais sobre CRM Sob Medida para minha empresa.',
  problemTitle: 'CRM pronto não atende sua equipe comercial?',
  problems: [
    { title: 'Processo forçado', description: 'CRMs prontos obrigam a equipe a adaptar o processo à ferramenta.' },
    { title: 'Falta de integração', description: 'Não conversa com ERP,WhatsApp, email e outros canais de venda.' },
    { title: 'Relatórios inadequados', description: 'Indicadores genéricos não refletem o funil real do negócio.' }
  ],
  solutionTitle: 'Como desenvolvemos CRMs sob medida',
  solutionDescription: [
    'Criamos CRMs personalizados que acompanham o funil de vendas real da empresa, desde prospecção até pós-venda. Integramos com WhatsApp, email, ERP, telefonia e sistemas de marketing.',
    'Nossos CRMs incluem gestão de oportunidades, atividades, propostas, comissões, metas e dashboards executivos.'
  ],
  benefits: [
    'Funil de vendas adaptado ao seu negócio',
    'Integração com WhatsApp, email e telefonia',
    'Automação de follow-up e tarefas',
    'Gestão de propostas e contratos',
    'Indicadores e previsão de vendas',
    'Acessível web e mobile'
  ],
  steps: [
    { title: 'Mapeamento', description: 'Entendemos seu funil de vendas e dores comerciais.' },
    { title: 'Protótipo', description: 'Desenhamos telas e fluxos do CRM personalizado.' },
    { title: 'Desenvolvimento', description: 'Codificamos o CRM com integrações e relatórios.' },
    { title: 'Adoção', description: 'Treinamento e acompanhamento da equipe comercial.' }
  ],
  faqs: [
    { question: 'CRM sob medida é melhor que Salesforce/HubSpot?', answer: 'Para empresas com processos comerciais específicos ou que precisam de integrações customizadas, um CRM sob medida oferece mais flexibilidade e menor custo de licença.' },
    { question: 'Quanto tempo leva para desenvolver um CRM?', answer: 'CRMs com funcionalidades essenciais ficam prontos em 1-2 meses. Soluções avançadas com 3-4 meses.' },
    { question: 'O CRM pode integrar com WhatsApp?', answer: 'Sim. Integramos com WhatsApp Business API, permitindo registrar conversas, enviar mensagens automáticas e gerar oportunidades.' }
  ],
  finalCta: {
    title: 'Quer um CRM que se adapte ao seu negócio?',
    description: 'Solicite um diagnóstico gratuito e receba uma proposta para seu CRM personalizado.'
  }
};

const CrmSobMedida = () => <KeywordLandingPage pageData={pageData} />;

export default CrmSobMedida;
