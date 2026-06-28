import CaseStudyPage from './CaseStudyPage';

const proFlowData = {
  title: 'ProFlow',
  subtitle: 'Marketplace de Freelancers com IA, Escrow e Escalabilidade',
  description: 'Plataforma completa para freelancers brasileiros com IA consultiva, pagamento em custódia anti-calote, reputação com KYC e onboarding gamificado. Projeto escalável que combina marketplace, fintech e inteligência artificial.',
  image: '/images/proflow/proflow.png',
  url: 'https://pyscript.tech/cases/proflow',
  liveUrl: 'https://www.proflow.pro/',
  githubUrl: 'https://github.com/LeonardoRFragoso/ProFlow',
  seoTitle: 'Case ProFlow - Marketplace Escalável com IA e Fintech | PyScript.tech',
  seoDescription: 'Case ProFlow: marketplace de freelancers com IA, pagamento em custódia, reputação KYC e escalabilidade. Conheça a arquitetura e resultados.',
  keywords: 'marketplace, software escalável, IA para marketplace, fintech, escrow, software sob medida, PyScript.tech',
  results: [
    { value: 'SaaS', label: 'Próprio em produção' },
    { value: 'Chat', label: 'Em tempo real com WebSocket' },
    { value: 'PIX', label: 'Carteira virtual com saques' },
    { value: 'Anti-calote', label: 'Pagamento em custódia' }
  ],
  problem: [
    'Freelancers e contratantes enfrentam insegurança em negociações: atrasos de pagamento, desacordos sobre escopo, dificuldade para precificar projetos e falta de reputação confiável. Ao mesmo tempo, marketplaces genéricos não atendem às particularidades do mercado brasileiro.',
    'Criar uma plataforma própria exige integrar múltiplos domínios complexos: marketplace, pagamentos, chat, reputação, IA e compliance, tudo em uma experiência simples e escalável.'
  ],
  solution: [
    'Desenvolvemos o ProFlow com quatro pilares: ProFlow AI para consultoria com GPT-4, ProFlow Secure com pagamento em custódia via Mercado Pago e Asaas, ProFlow Score para reputação com KYC e ProFlow Path com onboarding gamificado.',
    'A plataforma inclui chat em tempo real via WebSocket, carteira virtual com saques PIX, assinaturas recorrentes e AI Auto-Fixer para correção automática de erros, funcionando como um SaaS próprio em produção.'
  ],
  features: [
    'IA consultiva para precificação e propostas',
    'Pagamento em custódia anti-calote',
    'Reputação com KYC e onboarding gamificado',
    'Chat em tempo real e carteira virtual PIX',
    'Assinaturas recorrentes e escrow',
    'Arquitetura multi-tenant escalável'
  ],
  architecture: [
    { title: 'Camada de IA', description: 'Assistente com GPT-4 para precificação, propostas e correção automática de erros.' },
    { title: 'Marketplace Core', description: 'Gestão de projetos, usuários, propostas e contratos com Django e Vue.js 3.' },
    { title: 'Fintech', description: 'Custódia de pagamentos, carteira virtual, saques PIX e assinaturas recorrentes.' },
    { title: 'Escalabilidade', description: 'Arquitetura multi-tenant pronta para crescer sem reescrever a base.' }
  ],
  technologies: ['Django', 'Vue.js 3', 'PostgreSQL', 'OpenAI GPT-4', 'Mercado Pago', 'Asaas', 'WebSocket', 'Redis']
};

const ProFlowCase = () => <CaseStudyPage caseData={proFlowData} />;

export default ProFlowCase;
