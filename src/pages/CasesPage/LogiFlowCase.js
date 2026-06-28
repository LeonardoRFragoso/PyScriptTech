import CaseStudyPage from './CaseStudyPage';

const logiFlowData = {
  title: 'LogiFlow CRM',
  subtitle: 'Gestão Comercial e Operacional para Transportadoras',
  description: 'CRM SaaS completo para transportadoras e empresas de logística, unificando gestão comercial, operacional e fiscal com emissão de CT-e/MDF-e, rastreamento GPS e integrações com ERPs e WhatsApp.',
  image: '/images/LogiFlow/site-divulgacao/1.png',
  url: 'https://pyscript.tech/cases/logiflow',
  liveUrl: 'https://logi-flow-wuhp.vercel.app',
  githubUrl: 'https://github.com/LeonardoRFragoso/LogiFlow',
  seoTitle: 'Case LogiFlow - CRM e Gestão Logística para Transportadoras | PyScript.tech',
  seoDescription: 'Case LogiFlow: CRM SaaS para transportadoras com gestão comercial, operacional, fiscal, CT-e/MDF-e, GPS e integrações. Veja arquitetura e resultados.',
  keywords: 'CRM logística, gestão transportadoras, software corporativo, integração ERP, CT-e, MDF-e, PyScript.tech',
  results: [
    { value: '4', label: 'Aplicações integradas em uma stack única' },
    { value: '60%', label: 'Redução no tempo de gestão operacional' },
    { value: '100%', label: 'Faturamento com emissão automatizada' },
    { value: 'ERP + CRM', label: 'Integrados em tempo real' }
  ],
  problem: [
    'Transportadoras médias e grandes operam com múltiplos sistemas desconectados: planilhas para controle de clientes, aplicativos separados para rastreamento, emissão manual de CT-e/MDF-e e comunicação fragmentada via WhatsApp e email.',
    'Essa fragmentação gera retrabalho, atrasos no faturamento, falta de visibilidade operacional e dificuldade para escalar a operação sem aumentar proporcionalmente a equipe administrativa.'
  ],
  solution: [
    'Criamos o LogiFlow, uma plataforma SaaS completa com quatro aplicações integradas: CRM Principal, App do Motorista (PWA), Portal do Cliente e Site Institucional. O sistema centraliza clientes, fretes, romaneios, faturamento e rastreamento em uma única interface.',
    'A solução automatiza a emissão de CT-e/MDF-e, integra com ERPs como Omie, Bling e Tiny, envia notificações via WhatsApp e rastreia veículos em tempo real através de GPS.'
  ],
  features: [
    'CRM comercial e operacional integrado',
    'Emissão automatizada de CT-e/MDF-e',
    'Rastreamento GPS em tempo real',
    'App do motorista em PWA',
    'Portal do cliente com acompanhamento de entregas',
    'Integrações com ERPs, WhatsApp e gateways de pagamento'
  ],
  architecture: [
    { title: 'Backend Unificado', description: 'API FastAPI centralizada com PostgreSQL e Redis para dados, cache e filas.' },
    { title: 'Interfaces Especializadas', description: 'CRM web, app do motorista, portal do cliente e site institucional conectados à mesma API.' },
    { title: 'Integrações Fiscais', description: 'Módulo de emissão de documentos fiscais integrado aos serviços autorizadores.' },
    { title: 'Comunicação em Tempo Real', description: 'Rastreamento GPS e notificações via WhatsApp para clientes e equipe interna.' }
  ],
  technologies: ['Python', 'FastAPI', 'Vue.js 3', 'TailwindCSS', 'PostgreSQL', 'Redis', 'GPS', 'Docker']
};

const LogiFlowCase = () => <CaseStudyPage caseData={logiFlowData} />;

export default LogiFlowCase;
