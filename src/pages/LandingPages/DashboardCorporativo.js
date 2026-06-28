import KeywordLandingPage from './KeywordLandingPage';

const pageData = {
  badge: 'Dashboard Corporativo',
  headline: 'Dashboard Corporativo com KPIs em Tempo Real',
  subheadline: 'Dashboards executivos que consolidam dados de ERP, CRM, vendas, operação e finanças para decisões rápidas e assertivas.',
  title: 'Dashboard Corporativo',
  description: 'Desenvolvemos dashboards corporativos com KPIs em tempo real. Consolide dados de ERP, CRM, vendas e operações.',
  url: 'https://pyscript.tech/dashboard-corporativo',
  serviceType: 'Corporate Dashboard Development',
  seoTitle: 'Dashboard Corporativo com KPIs | PyScript.tech',
  seoDescription: 'Dashboards corporativos com KPIs em tempo real. Consolide dados de ERP, CRM, vendas e operações para decisões rápidas.',
  keywords: 'dashboard corporativo, KPIs em tempo real, dashboard executivo, BI sob medida, dashboards empresariais, PyScript.tech',
  whatsappMessage: 'Olá! Gostaria de saber mais sobre Dashboard Corporativo para minha empresa.',
  problemTitle: 'Sua empresa toma decisões sem dados?',
  problems: [
    { title: 'Dados espalhados', description: 'Informações em sistemas diferentes dificultam a visão consolidada.' },
    { title: 'Relatórios manuais', description: 'Gerar relatórios consome horas e chegam desatualizados.' },
    { title: 'Falta de alertas', description: 'Gestores só descobrem problemas depois que o prejuízo aconteceu.' }
  ],
  solutionTitle: 'Como desenvolvemos dashboards corporativos',
  solutionDescription: [
    'Criamos dashboards executivos que consolidam dados de múltiplas fontes (ERP, CRM, planilhas, APIs) em indicadores visuais e atualizados. Trabalhamos com gráficos, tabelas, alertas e exportações para dar visibilidade total à operação.',
    'Nossos dashboards podem ser acessados via web e mobile, com permissões por usuário e integração em tempo real ou por atualização programada.'
  ],
  benefits: [
    'Visão consolidada da operação',
    'KPIs customizados por área',
    'Alertas automáticos por email/WhatsApp',
    'Integração com ERP, CRM e APIs',
    'Acesso web e mobile',
    'Exportação e agendamento de relatórios'
  ],
  steps: [
    { title: 'Mapeamento', description: 'Identificamos indicadores e fontes de dados.' },
    { title: 'Integração', description: 'Conectamos sistemas e padronizamos dados.' },
    { title: 'Visualização', description: 'Criamos gráficos, tabelas e alertas.' },
    { title: 'Deploy', description: 'Publicação, permissões e treinamento.' }
  ],
  faqs: [
    { question: 'Dashboard pode puxar dados de vários sistemas?', answer: 'Sim. Integramos ERPs, CRMs, bancos de dados, APIs e planilhas para consolidar informações em um único painel.' },
    { question: 'Quanto tempo leva para criar um dashboard?', answer: 'Dashboards simples com 1-2 fontes de dados em 2-4 semanas. Dashboards corporativos complexos de 1-3 meses.' },
    { question: 'Dashboard funciona no celular?', answer: 'Sim. Desenvolvemos dashboards responsivos, otimizados para acesso em desktop, tablet e smartphone.' }
  ],
  finalCta: {
    title: 'Quer um dashboard para sua empresa?',
    description: 'Solicite um diagnóstico gratuito e descubra como visualizar seus dados de forma inteligente.'
  }
};

const DashboardCorporativo = () => <KeywordLandingPage pageData={pageData} />;

export default DashboardCorporativo;
