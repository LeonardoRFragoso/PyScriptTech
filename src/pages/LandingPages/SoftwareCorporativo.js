import KeywordLandingPage from './KeywordLandingPage';

const pageData = {
  badge: 'Software Corporativo',
  headline: 'Software Corporativo Sob Medida para Escalar sua Empresa',
  subheadline: 'ERP, CRM, portais internos e dashboards executivos desenvolvidos para atender processos complexos e equipes em crescimento.',
  title: 'Software Corporativo',
  description: 'Desenvolvemos software corporativo sob medida: ERP, CRM, portais internos e dashboards para empresas que precisam de controle e escala.',
  url: 'https://pyscript.tech/software-corporativo',
  serviceType: 'Enterprise Software',
  seoTitle: 'Software Corporativo Sob Medida para Empresas | PyScript.tech',
  seoDescription: 'Software corporativo sob medida: ERP, CRM, portais internos e dashboards. Desenvolvido para empresas que precisam de controle e escala.',
  keywords: 'software corporativo, ERP sob medida, CRM personalizado, portal interno, dashboard executivo, sistema corporativo, PyScript.tech',
  whatsappMessage: 'Olá! Gostaria de saber mais sobre Software Corporativo para minha empresa.',
  problemTitle: 'Por que software corporativo pronto não resolve tudo?',
  problems: [
    { title: 'Processos únicos', description: 'Cada empresa tem fluxos específicos que sistemas genéricos não conseguem acompanhar.' },
    { title: 'Múltiplas ferramentas', description: 'Equipes usam vários sistemas desconectados, perdendo produtividade e visibilidade.' },
    { title: 'Falta de controle', description: 'Sem dashboards e indicadores, gestores não têm visão clara da operação.' }
  ],
  solutionTitle: 'Como entregamos software corporativo sob medida',
  solutionDescription: [
    'Desenvolvemos sistemas corporativos completos, desde ERP e CRM até portais internos e dashboards executivos. Cada solução é projetada para integrar departamentos, padronizar processos e fornecer visão em tempo real da operação.',
    'Utilizamos Python, FastAPI, Django, React e PostgreSQL para criar sistemas seguros, escaláveis e preparados para integração com outras ferramentas da empresa.'
  ],
  benefits: [
    'ERP sob medida para gestão integrada',
    'CRM personalizado para acompanhamento comercial',
    'Portais internos para colaboradores e clientes',
    'Dashboards executivos com KPIs em tempo real',
    'Integração com sistemas existentes',
    'Permissões, auditoria e segurança corporativa'
  ],
  steps: [
    { title: 'Diagnóstico', description: 'Entendemos departamentos, processos e necessidades de controle.' },
    { title: 'Modelagem', description: 'Definimos módulos, fluxos, permissões e integrações.' },
    { title: 'Desenvolvimento', description: 'Construímos o sistema com entregas parciais e validação.' },
    { title: 'Implantação', description: 'Deploy, migração de dados, treinamento e suporte.' }
  ],
  faqs: [
    { question: 'Software corporativo é melhor que ERP pronto?', answer: 'Depende da complexidade. Empresas com processos únicos ou múltiplas integrações se beneficiam mais de sistemas sob medida que se adaptam ao negócio.' },
    { question: 'Quanto tempo leva para desenvolver um ERP sob medida?', answer: 'Módulos iniciais ficam prontos em 1-2 meses. ERPs completos com múltiplos módulos levam de 3-6 meses.' },
    { question: 'O sistema pode crescer com a empresa?', answer: 'Sim. Projetamos arquitetura escalável, permitindo adicionar usuários, módulos e integrações sem reescrever o sistema.' }
  ],
  finalCta: {
    title: 'Quer um software corporativo sob medida?',
    description: 'Solicite um diagnóstico gratuito e receba uma proposta alinhada aos processos da sua empresa.'
  }
};

const SoftwareCorporativo = () => <KeywordLandingPage pageData={pageData} />;

export default SoftwareCorporativo;
