// src/pages/ProjectsPage/ProjectsPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import Lightbox from '../../components/common/Lightbox';
import TiltCard from '../../components/common/TiltCard';
import './ProjectsPage.css'; 

const projectsData = [
  {
    id: 1,
    title: 'ProFlow',
    subtitle: 'O Sistema Operacional do Freelancer',
    description: 'Plataforma completa para freelancers brasileiros com 4 pilares: ProFlow AI (IA consultiva com GPT-4 para precificação e propostas), ProFlow Secure (pagamento em custódia anti-calote com Mercado Pago e Asaas), ProFlow Score (reputação com KYC) e ProFlow Path (onboarding gamificado). Chat em tempo real via WebSocket, carteira virtual com saques PIX, sistema de assinaturas recorrentes e AI Auto-Fixer para correção automática de erros.',
    category: 'enterprise',
    technologies: ['Vue.js 3', 'Django', 'TailwindCSS', 'PostgreSQL', 'OpenAI GPT-4', 'Mercado Pago', 'Asaas', 'WebSocket'],
    results: ['SaaS próprio em produção', 'Chat em tempo real e carteira virtual com PIX', 'Assinaturas recorrentes e escrow anti-calote'],
    image: `${process.env.PUBLIC_URL}/images/proflow/proflow.png`,
    images: [`${process.env.PUBLIC_URL}/images/proflow/proflow.png`, `${process.env.PUBLIC_URL}/images/proflow/proflow2.png`, `${process.env.PUBLIC_URL}/images/proflow/proflow3.png`],
    featured: true,
    caseUrl: '/cases/proflow',
    liveUrl: 'https://www.proflow.pro/',
    githubUrl: 'https://github.com/LeonardoRFragoso/ProFlow'
  },
  {
    id: 2,
    title: 'Oráculo',
    subtitle: 'Consultor Estratégico com IA',
    description: 'Consultor estratégico com IA e pipeline OpenRAG completo. Interface estilo ChatGPT em React, analytics preditivos, dashboard executivo, gestão de orçamento e metas, e integração universal com dados de nuvem para logística e dados comerciais. Stack: OpenSearch · Langflow · Docling — totalmente conteinerizado em Docker.',
    category: 'enterprise',
    technologies: ['Python', 'FastAPI', 'OpenSearch', 'Langflow', 'Docling', 'Docker', 'React', 'OpenAI'],
    results: ['Pipeline OpenRAG com indexação semântica', 'Containerização completa com Docker', 'Respostas com citação de fontes'],
    image: '/images/oraculo/oraculo1.png',
    images: ['/images/oraculo/oraculo1.png'],
    featured: true,
    caseUrl: '/cases/oraculo-ia',
    githubUrl: 'https://github.com/LeonardoRFragoso/Oraculo'
  },
  {
    id: 3,
    title: 'LogiFlow CRM',
    subtitle: 'Sistema CRM SaaS para Transportadoras',
    description: 'Sistema CRM SaaS completo para transportadoras e logística. Unifica gestão comercial, operacional e fiscal com emissão de CT-e/MDF-e integrada, rastreamento GPS em tempo real, integrações com ERPs (Omie, Bling, Tiny), WhatsApp e MercadoPago. Inclui CRM Principal, App do Motorista (PWA), Portal do Cliente e Site Institucional.',
    category: 'enterprise',
    technologies: ['Python', 'FastAPI', 'Vue.js 3', 'TailwindCSS', 'PostgreSQL', 'Redis'],
    results: ['4 aplicações integradas em uma stack única', 'Integrações com ERPs, WhatsApp e GPS', 'Emissão de CT-e/MDF-e e faturamento automatizado'],
    image: '/images/LogiFlow/site-divulgacao/1.png',
    images: ['/images/LogiFlow/site-divulgacao/1.png', '/images/LogiFlow/site-divulgacao/2.png', '/images/LogiFlow/site-divulgacao/3.png', '/images/LogiFlow/site-divulgacao/4.png', '/images/LogiFlow/site-divulgacao/5.png', '/images/LogiFlow/site-divulgacao/6.png', '/images/LogiFlow/site-divulgacao/7.png', '/images/LogiFlow/site-divulgacao/8.png', '/images/LogiFlow/site-divulgacao/9.png', '/images/LogiFlow/site-divulgacao/10.png', '/images/LogiFlow/app/1.png', '/images/LogiFlow/app-motorista/1.png', '/images/LogiFlow/portal-cliente/1.png'],
    featured: true,
    caseUrl: '/cases/logiflow',
    liveUrl: 'https://logi-flow-wuhp.vercel.app',
    githubUrl: 'https://github.com/LeonardoRFragoso/LogiFlow'
  },
  {
    id: 4,
    title: 'AgentesIA',
    subtitle: 'Consultoria de Negócios com IA Multi-Agentes',
    description: 'Plataforma SaaS de análise estratégica de negócios com múltiplos agentes de IA especializados (Claude 3). 5 agentes trabalham em conjunto: Analista de Negócio, Estrategista Comercial, Analista Financeiro, Especialista de Mercado e Revisor Executivo. Processamento assíncrono com Redis, exportação de relatórios (PDF, PPTX, Markdown), sistema de planos (Free/Pro/Enterprise) e arquitetura multi-tenant.',
    category: 'enterprise',
    technologies: ['FastAPI', 'Python', 'Claude 3', 'PostgreSQL', 'Redis', 'JWT'],
    results: ['Análise estratégica com múltiplos agentes de IA', 'Exportação de relatórios em múltiplos formatos', 'Arquitetura multi-tenant com planos escaláveis'],
    image: '/images/AgentesIA/1.png',
    images: ['/images/AgentesIA/1.png', '/images/AgentesIA/2.png', '/images/AgentesIA/3.png', '/images/AgentesIA/4.png', '/images/AgentesIA/5.png', '/images/AgentesIA/6.png', '/images/AgentesIA/7.png', '/images/AgentesIA/8.png', '/images/AgentesIA/9.png', '/images/AgentesIA/10.png', '/images/AgentesIA/11.png'],
    featured: true,
    liveUrl: 'https://agentes-ia-consultoria-de-negocios.vercel.app',
    githubUrl: 'https://github.com/LeonardoRFragoso/AgentesIA-Consultoria-de-Negocios-com-IA-Multi-Agentes'
  },
  {
    id: 5,
    title: 'Assistente Financeiro WhatsApp',
    subtitle: 'Gestão Financeira Pessoal via WhatsApp',
    description: 'Sistema SaaS completo de gestão financeira pessoal via WhatsApp com dashboard web e IA para processamento de linguagem natural. Registre despesas, receitas e lembretes usando linguagem informal. Backend Python/FastAPI com PostgreSQL e Redis, frontend Next.js 14 com TailwindCSS, integração Twilio WhatsApp e OpenAI GPT-4o.',
    category: 'enterprise',
    technologies: ['Python', 'FastAPI', 'OpenAI GPT-4', 'PostgreSQL', 'Redis', 'Twilio'],
    results: ['Gestão financeira via linguagem natural no WhatsApp', 'Dashboard web com sincronização em tempo real', 'Integração com Twilio WhatsApp e OpenAI GPT-4o'],
    image: '/images/WhatsAppFinance/1.png',
    images: ['/images/WhatsAppFinance/1.png', '/images/WhatsAppFinance/2.png', '/images/WhatsAppFinance/3.png', '/images/WhatsAppFinance/4.png', '/images/WhatsAppFinance/5.png', '/images/WhatsAppFinance/6.png', '/images/WhatsAppFinance/7.png'],
    featured: true,
    liveUrl: 'https://assistente-financeiro-whatsapp.vercel.app/',
    githubUrl: 'https://github.com/LeonardoRFragoso/AssistenteFinanceiroWhatsapp'
  },
  {
    id: 6,
    title: 'Digital Signage',
    subtitle: 'Sistema de Monitoramento e Display Digital',
    description: 'Plataforma corporativa de gerenciamento de TVs com suporte multi-empresa, comunicação em tempo real via WebSocket, compilação automática de vídeos com FFmpeg, integração nativa com Chromecast, métricas Prometheus e cache Redis para alta disponibilidade.',
    category: 'enterprise',
    technologies: ['Python', 'Django', 'Flask', 'WebSocket', 'Redis', 'FFmpeg', 'PostgreSQL'],
    results: ['Displays em tempo real', 'Gestão centralizada multi-empresa', 'Alta disponibilidade com cache Redis'],
    image: '/images/digital-signage/1.jpg',
    images: ['/images/digital-signage/1.jpg', '/images/digital-signage/2.jpg', '/images/digital-signage/3.jpg', '/images/digital-signage/4.jpg', '/images/digital-signage/5.jpg', '/images/digital-signage/6.jpg', '/images/digital-signage/7.jpg', '/images/digital-signage/8.jpg', '/images/digital-signage/9.jpg'],
    featured: true,
    githubUrl: 'https://github.com/LeonardoRFragoso/Digital-Signage-Platform'
  },
  {
    id: 7,
    title: 'Não Conformidade',
    subtitle: 'Sistema de Gestão de Qualidade',
    description: 'Sistema robusto para gestão de não-conformidades com workflow de aprovação multinível, notificações automáticas, relatórios PDF, dashboard executivo com KPIs e histórico completo de ações corretivas.',
    category: 'software',
    technologies: ['Python', 'Django', 'DRF', 'PostgreSQL', 'JavaScript'],
    results: ['Gestão de qualidade ISO', 'Workflow automatizado', 'Dashboard executivo com KPIs'],
    image: '/images/não-conformidade/1.jpg',
    images: ['/images/não-conformidade/1.jpg', '/images/não-conformidade/2.jpg', '/images/não-conformidade/3.jpg', '/images/não-conformidade/4.jpg', '/images/não-conformidade/5.jpg', '/images/não-conformidade/6.jpg', '/images/não-conformidade/7.jpg', '/images/não-conformidade/8.jpg'],
    featured: false,
    githubUrl: 'https://github.com/LeonardoRFragoso/nao-conformidade'
  },
  {
    id: 8,
    title: 'BI-as-a-Service',
    subtitle: 'Plataforma de Business Intelligence com IA',
    description: 'Plataforma SaaS de Business Intelligence com IA. Upload de CSV com análise automática via GPT-4o-mini, detecção semântica de dados, dashboards automáticos, KPIs dinâmicos, insights preditivos e gestão multi-tenant com billing integrado.',
    category: 'enterprise',
    technologies: ['Python', 'FastAPI', 'React', 'GPT-4', 'Docker'],
    results: ['Análise automática de CSV com IA', 'Dashboards automáticos e KPIs dinâmicos', 'Gestão multi-tenant com billing'],
    image: '/images/SaaS/1SaaS - 1.png',
    images: ['/images/SaaS/1SaaS - 1.png', '/images/SaaS/1SaaS - 2.png', '/images/SaaS/1SaaS - 3.png', '/images/SaaS/1SaaS - 4.png', '/images/SaaS/1SaaS - 5.png', '/images/SaaS/1SaaS - 6.png', '/images/SaaS/1SaaS - 7.png'],
    featured: false,
    githubUrl: 'https://github.com/LeonardoRFragoso/SaaS'
  },
  {
    id: 9,
    title: 'Plataforma APM',
    subtitle: 'Monitoramento de Performance de Aplicações',
    description: 'Plataforma de Monitoramento de Sistemas e APIs em Java 21 com Spring Boot. Coleta automática de métricas (latência, CPU, memória), health checks com classificação UP/DEGRADED/DOWN, alertas configuráveis e dashboard em tempo real via WebSocket.',
    category: 'enterprise',
    technologies: ['Java 21', 'Spring Boot', 'WebSocket', 'Clean Architecture'],
    results: ['Monitoramento em tempo real', 'Health checks inteligentes', 'Solução enterprise para observabilidade'],
    image: '/images/APM/APM1.png',
    images: ['/images/APM/APM1.png', '/images/APM/APM2.png', '/images/APM/APM3.png', '/images/APM/APM4.png', '/images/APM/APM5.png', '/images/APM/APM6.png', '/images/APM/APM7.png'],
    featured: false,
    githubUrl: 'https://github.com/LeonardoRFragoso/Plataforma-de-Monitoramento-de-Sistemas-e-APIs'
  },
  {
    id: 10,
    title: 'MedFlow Finance',
    subtitle: 'Recuperação de Faturamento Médico',
    description: 'Sistema inteligente que recupera 10-20% do faturamento perdido por clínicas médicas devido a erros de faturamento e glosas. Automação de validação com Laravel 11 e Vue 3, dashboard de métricas ROI e processamento centralizado.',
    category: 'enterprise',
    technologies: ['Laravel 11', 'Vue 3', 'PostgreSQL', 'API REST'],
    results: ['Recuperação de 10-20% do faturamento perdido', 'Dashboard de métricas ROI', 'Automação de validação de glosas'],
    image: `${process.env.PUBLIC_URL}/images/medflow/medflow1.png`,
    images: [`${process.env.PUBLIC_URL}/images/medflow/medflow1.png`, `${process.env.PUBLIC_URL}/images/medflow/medflow2.png`, `${process.env.PUBLIC_URL}/images/medflow/medflow3.png`, `${process.env.PUBLIC_URL}/images/medflow/medflow4.png`, `${process.env.PUBLIC_URL}/images/medflow/medflow5.png`, `${process.env.PUBLIC_URL}/images/medflow/medflow6.png`, `${process.env.PUBLIC_URL}/images/medflow/medflow7.png`, `${process.env.PUBLIC_URL}/images/medflow/medflow8.png`],
    featured: false,
    githubUrl: 'https://github.com/LeonardoRFragoso/MedFlow_Finance'
  },
  {
    id: 11,
    title: 'FinanceControl',
    subtitle: 'Gerenciador Financeiro Pessoal',
    description: 'Sistema completo de gestão financeira pessoal com modelo Freemium. App multiplataforma em Flutter (Windows, Android, iOS, Web) com backend Django REST. Inclui dashboard interativo, metas financeiras, orçamentos, IA assistente e integração Mercado Pago para assinaturas.',
    category: 'software',
    technologies: ['Flutter', 'Django REST', 'Riverpod', 'Mercado Pago', 'JWT'],
    results: ['App multiplataforma', 'Sistema Freemium com pagamentos', 'IA assistente para finanças pessoais'],
    image: `${process.env.PUBLIC_URL}/images/FinanceControl/financecontrol1.png`,
    images: [`${process.env.PUBLIC_URL}/images/FinanceControl/financecontrol1.png`, `${process.env.PUBLIC_URL}/images/FinanceControl/financecontrol2.png`, `${process.env.PUBLIC_URL}/images/FinanceControl/financecontrol5.png`, `${process.env.PUBLIC_URL}/images/FinanceControl/financecontrol6.png`],
    featured: false,
    githubUrl: 'https://github.com/LeonardoRFragoso/gerenciador-financeiro'
  },
  {
    id: 12,
    title: 'GNLink',
    subtitle: 'Site Institucional - Setor de Energia',
    description: 'Site institucional moderno e responsivo para empresa do setor de energia. Desenvolvido com Next.js 14, TypeScript e Tailwind CSS. Inclui internacionalização (PT/EN), animações com Framer Motion, menu responsivo e design premium.',
    category: 'web',
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    results: ['Internacionalização PT/EN', 'Design responsivo e animado', 'Design premium para conversão'],
    image: '/images/GNLink/1.png',
    images: ['/images/GNLink/1.png', '/images/GNLink/2.png', '/images/GNLink/3.png', '/images/GNLink/4.png', '/images/GNLink/5.png', '/images/GNLink/6.png', '/images/GNLink/7.png', '/images/GNLink/8.png'],
    featured: false,
    githubUrl: 'https://github.com/LeonardoRFragoso/GNLink'
  },
  {
    id: 13,
    title: 'Base Corporativa',
    subtitle: 'E-commerce de Roupas Corporativas',
    description: 'E-commerce completo para roupas corporativas com catálogo de produtos, carrinho de compras, checkout integrado, sistema de gestão de pedidos, analytics com Google Analytics e Meta Pixel, e PWA para experiência mobile.',
    category: 'enterprise',
    technologies: ['React', 'Django', 'PostgreSQL', 'Python', 'Mercado Pago'],
    results: ['Loja online em produção', 'Checkout integrado', 'PWA para experiência mobile'],
    image: `${process.env.PUBLIC_URL}/images/base/base1.png`,
    images: [`${process.env.PUBLIC_URL}/images/base/base1.png`, `${process.env.PUBLIC_URL}/images/base/base2.png`, `${process.env.PUBLIC_URL}/images/base/base3.png`, `${process.env.PUBLIC_URL}/images/base/base4.png`, `${process.env.PUBLIC_URL}/images/base/base5.png`, `${process.env.PUBLIC_URL}/images/base/base6.png`],
    featured: false,
    liveUrl: 'https://basecorporativa.store/',
    githubUrl: 'https://github.com/LeonardoRFragoso/base-corporativa'
  },
  {
    id: 14,
    title: 'TaskManager',
    subtitle: 'Sistema de Gestão de Projetos e Tarefas',
    description: 'Sistema completo estilo Trello para gestão de projetos e tarefas com backend em Go e frontend em Vue.js 3. Inclui Dark Mode, Internacionalização (PT-BR/EN), Dashboard com gráficos Chart.js, Kanban Board com drag-and-drop, sistema de Equipes/Squads, Notificações em tempo real, permissões granulares, busca e filtros avançados, atalhos de teclado e autenticação JWT com refresh tokens.',
    category: 'software',
    technologies: ['Go', 'Vue.js 3', 'PostgreSQL', 'TailwindCSS', 'JWT', 'Docker'],
    results: ['Kanban com drag-and-drop', 'Dark Mode e i18n', 'Sistema de equipes e permissões'],
    image: '/images/GO API - Task Manager/1.png',
    images: ['/images/GO API - Task Manager/1.png', '/images/GO API - Task Manager/2.png', '/images/GO API - Task Manager/3.png', '/images/GO API - Task Manager/4.png', '/images/GO API - Task Manager/5.png', '/images/GO API - Task Manager/6.png', '/images/GO API - Task Manager/7.png', '/images/GO API - Task Manager/8.png'],
    featured: false,
    githubUrl: 'https://github.com/LeonardoRFragoso/Go-API-Gestao-de-Projetos-e-Tarefas'
  },
  {
    id: 15,
    title: 'GR - Gestão de Recursos',
    subtitle: 'Sistema de Gestão Empresarial',
    description: 'Sistema para gestão de riscos empresariais com identificação, avaliação e monitoramento de riscos, planos de mitigação, relatórios gerenciais automatizados e dashboard interativo com métricas de performance.',
    category: 'enterprise',
    technologies: ['Python', 'Django', 'JavaScript', 'PostgreSQL'],
    results: ['Gestão integrada de riscos', 'KPIs em tempo real', 'Relatórios gerenciais automatizados'],
    image: '/images/GR/1.jpg',
    images: ['/images/GR/1.jpg', '/images/GR/2.jpg', '/images/GR/3.jpg', '/images/GR/4.jpg', '/images/GR/5.jpg', '/images/GR/6.jpg', '/images/GR/7.jpg', '/images/GR/8.jpg', '/images/GR/9.jpg', '/images/GR/10.jpg', '/images/GR/11.jpg', '/images/GR/12.jpg'],
    featured: false,
    githubUrl: 'https://github.com/LeonardoRFragoso/GR'
  },
  {
    id: 16,
    title: 'Gestão de Pátio',
    subtitle: 'Sistema de Controle Logístico',
    description: 'Sistema completo para gestão de pátios e estacionamentos com controle de vagas em tempo real, relatórios gerenciais, dashboard analítico e interface responsiva. Desenvolvido com arquitetura MVC e APIs REST.',
    category: 'software',
    technologies: ['Python', 'Django', 'JavaScript', 'PostgreSQL'],
    results: ['Controle de vagas em tempo real', 'Dashboard analítico', 'Interface responsiva'],
    image: '/images/Pátio/1.jpg',
    images: ['/images/Pátio/1.jpg', '/images/Pátio/2.jpg', '/images/Pátio/3.jpg', '/images/Pátio/4.jpg', '/images/Pátio/5.jpg', '/images/Pátio/6.jpg'],
    featured: false,
    githubUrl: 'https://github.com/LeonardoRFragoso/Patio'
  },
  {
    id: 17,
    title: 'Dashboard de Multas',
    subtitle: 'Sistema de Gestão de Infrações',
    description: 'Dashboard interativo para análise de multas de trânsito com ETL automatizado, integração Google Drive, visualizações dinâmicas (Plotly/Altair), filtros avançados e exportação de relatórios personalizados.',
    category: 'software',
    technologies: ['Streamlit', 'Python', 'Google Drive API', 'Data Analysis'],
    results: ['Visualização de dados em tempo real', 'ETL automatizado', 'Relatórios personalizados'],
    image: `${process.env.PUBLIC_URL}/images/dash-multas/1.jpg`,
    images: [`${process.env.PUBLIC_URL}/images/dash-multas/1.jpg`, `${process.env.PUBLIC_URL}/images/dash-multas/2.jpg`, `${process.env.PUBLIC_URL}/images/dash-multas/3.jpg`, `${process.env.PUBLIC_URL}/images/dash-multas/4.jpg`, `${process.env.PUBLIC_URL}/images/dash-multas/5.jpg`, `${process.env.PUBLIC_URL}/images/dash-multas/6.jpg`, `${process.env.PUBLIC_URL}/images/dash-multas/7.jpg`, `${process.env.PUBLIC_URL}/images/dash-multas/8.jpg`, `${process.env.PUBLIC_URL}/images/dash-multas/9.jpg`],
    featured: false,
    githubUrl: 'https://github.com/LeonardoRFragoso/DashboardMultas'
  },
  {
    id: 18,
    title: 'Andaimes Pini',
    subtitle: 'Sistema de Gestão de Locação',
    description: 'Sistema de gestão de locações desenvolvido com React e Material-UI. Sidebar expansível, navbar fixa, registro de locações, visualização de pedidos, layout totalmente responsivo para mobile, tablet e desktop.',
    category: 'web',
    technologies: ['Flask', 'React', 'PostgreSQL'],
    results: ['Gestão de locações digital', 'Layout responsivo', 'Controle de pedidos'],
    image: '/images/Andaimes Pini/pini1.png',
    images: ['/images/Andaimes Pini/pini1.png', '/images/Andaimes Pini/pini2.png', '/images/Andaimes Pini/pini3.png', '/images/Andaimes Pini/pini4.png', '/images/Andaimes Pini/pini5.png', '/images/Andaimes Pini/Pini6.png', '/images/Andaimes Pini/Pini7.png', '/images/Andaimes Pini/pini8.png', '/images/Andaimes Pini/pini9.png', '/images/Andaimes Pini/Pini10.png', '/images/Andaimes Pini/pini11.png', '/images/Andaimes Pini/pini12.png', '/images/Andaimes Pini/pini13.png', '/images/Andaimes Pini/pini14.png', '/images/Andaimes Pini/pini15.png'],
    featured: false,
    liveUrl: 'https://andaimes-pini-project.vercel.app/',
    githubUrl: 'https://github.com/LeonardoRFragoso/AndaimesPini_Project'
  },
  {
    id: 19,
    title: 'PyScript.tech',
    subtitle: 'Site Institucional e Portfólio',
    description: 'Website institucional e portfólio da PyScript.tech - empresa de desenvolvimento de software sob medida. Design moderno com glassmorphism e gradientes animados. Formulário de contato integrado com EmailJS, carrossel de depoimentos e páginas de serviços e projetos com filtros por categoria.',
    category: 'web',
    technologies: ['React 18', 'JavaScript', 'CSS Modules', 'EmailJS'],
    results: ['Site institucional moderno', 'Formulário de contato integrado', 'Páginas de serviços e projetos'],
    image: '/images/PyScriptTech/1.png',
    images: ['/images/PyScriptTech/1.png', '/images/PyScriptTech/2.png', '/images/PyScriptTech/3.png', '/images/PyScriptTech/4.png', '/images/PyScriptTech/5.png', '/images/PyScriptTech/6.png', '/images/PyScriptTech/7.png', '/images/PyScriptTech/8.png', '/images/PyScriptTech/9.png', '/images/PyScriptTech/10.png', '/images/PyScriptTech/11.png', '/images/PyScriptTech/12.png', '/images/PyScriptTech/13.png', '/images/PyScriptTech/14.png', '/images/PyScriptTech/15.png', '/images/PyScriptTech/16.png'],
    featured: false,
    liveUrl: 'https://py-script-tech-react.vercel.app/',
    githubUrl: 'https://github.com/LeonardoRFragoso/PyScriptTech_React'
  }
];

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'web', label: 'Web' },
  { id: 'software', label: 'Software' },
];

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedVideo, setExpandedVideo] = useState(null);

  const filteredProjects = activeCategory === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === activeCategory);

  const featuredProjects = projectsData.filter(p => p.featured);

  return (
    <>
      <SEO
        title="Cases de Sucesso - IA, Automação e Sistemas Corporativos | PyScript.tech"
        description="Conheça cases de sucesso da PyScript.tech: Oráculo IA, LogiFlow e ProFlow. Projetos que reduzem custos, automatizam processos e geram resultados reais."
        url="https://pyscript.tech/projects"
        keywords="cases de sucesso, inteligência artificial, automação empresarial, sistemas corporativos, software sob medida, PyScript.tech"
      />
      <div className="projectsPage">
        {/* Hero Section */}
        <section className="projectsHero">
        <div className="heroContent">
          <span className="heroBadge">Cases de Sucesso</span>
          <h1>
            Projetos que
            <span>Transformam Operações</span>
          </h1>
          <p>
            Conheça soluções reais de IA, automação e sistemas corporativos que desenvolvemos 
            para empresas. Cada case inclui problema, solução, arquitetura, tecnologias e resultados.
          </p>
        </div>

        {/* Stats */}
        <div className="heroStats">
          <div className="statItem">
            <span className="statNumber">70+</span>
            <span className="statLabel">Projetos Entregues</span>
          </div>
          <div className="statItem">
            <span className="statNumber">12</span>
            <span className="statLabel">Setores Atendidos</span>
          </div>
          <div className="statItem">
            <span className="statNumber">100%</span>
            <span className="statLabel">Taxa de Entrega</span>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="featuredSection">
        <div className="sectionHeader">
          <span className="sectionBadge">Destaques</span>
          <h2>Projetos em Evidência</h2>
        </div>
        <div className="featuredGrid">
          {featuredProjects.map((project) => (
            <div key={project.id} className="featuredCard">
              <div className="featuredImage">
                <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                <div className="featuredOverlay">
                  <button 
                    className="playButton"
                    onClick={() => setExpandedVideo(expandedVideo === project.id ? null : project.id)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="featuredContent">
                <span className="projectCategory">
                  {project.category === 'web' ? 'Aplicação Web' : project.category === 'enterprise' ? 'Enterprise' : 'Software'}
                </span>
                <h3>{project.title}</h3>
                <p className="projectSubtitle">{project.subtitle}</p>
                <p className="projectDesc">{project.description}</p>
                <div className="techTags">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className="techTag">{tech}</span>
                  ))}
                </div>
                <div className="projectResults">
                  {project.results.map((result, i) => (
                    <span key={i} className="resultItem">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {result}
                    </span>
                  ))}
                </div>
                <div className="projectLinks">
                  {project.caseUrl && (
                    <button onClick={() => navigate(project.caseUrl)} className="projectLink caseLink">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      Ver Case
                    </button>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="projectLink liveLink">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                      Ver Online
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="projectLink githubLink">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Projects */}
      <section className="allProjectsSection">
        <div className="sectionHeader">
          <span className="sectionBadge">Portfólio Completo</span>
          <h2>Todos os Projetos</h2>
        </div>

        {/* Category Filter */}
        <div className="categoryFilter">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filterButton ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projectsGrid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="projectCard">
              <div className="cardImageWrapper">
                <img src={project.image} alt={project.title} className="cardImage" loading="lazy" decoding="async" />
                <div className="cardOverlay">
                  <button 
                    className="watchVideo"
                    onClick={() => setExpandedVideo(expandedVideo === project.id ? null : project.id)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    Ver Galeria
                  </button>
                </div>
              </div>
              <div className="cardContent">
                <span className="projectCategory">
                  {project.category === 'web' ? 'Web' : project.category === 'enterprise' ? 'Enterprise' : 'Software'}
                </span>
                <h3 className="cardTitle">{project.title}</h3>
                <p className="cardSubtitle">{project.subtitle}</p>
                <div className="techTags">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="techTag">{tech}</span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="techTag">+{project.technologies.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Gallery */}
        <Lightbox
          images={expandedVideo ? (projectsData.find(p => p.id === expandedVideo)?.images || []) : []}
          currentIndex={0}
          isOpen={!!expandedVideo}
          onClose={() => setExpandedVideo(null)}
          onNext={() => {}}
          onPrev={() => {}}
        />
      </section>

      {/* CTA Section */}
      <section className="projectsCTA">
        <div className="ctaContent">
          <h2>Tem um projeto em mente?</h2>
          <p>
            Vamos transformar sua ideia em realidade. 
            Entre em contato e receba uma proposta personalizada.
          </p>
          <div className="ctaButtons">
            <button className="ctaButton" onClick={() => navigate('/contact')}>
              Iniciar Conversa
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <a 
              href="https://wa.me/+5521980292791" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ctaButtonSecondary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default ProjectsPage;
