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
    subtitle: 'Plataforma para Freelancers',
    description: 'Plataforma web completa para freelancers otimizarem seus negócios. Sistema de gestão de projetos e clientes, integração com IA para otimização de propostas e precificação, dashboard analítico com KPIs de desempenho.',
    category: 'enterprise',
    technologies: ['Vue.js', 'JavaScript', 'Node.js', 'Payments API', 'AI Integration'],
    results: ['Sistema em produção', 'Gestão inteligente de projetos'],
    image: `${process.env.PUBLIC_URL}/images/proflow/proflow2.png`,
    images: [`${process.env.PUBLIC_URL}/images/proflow/proflow2.png`, `${process.env.PUBLIC_URL}/images/proflow/proflow3.png`, `${process.env.PUBLIC_URL}/images/proflow/proflow.png`],
    featured: true,
    liveUrl: 'https://www.proflow.pro/',
    githubUrl: 'https://github.com/LeonardoRFragoso/ProFlow'
  },
  {
    id: 2,
    title: 'Base Corporativa',
    subtitle: 'E-commerce de Roupas Corporativas',
    description: 'E-commerce completo para venda de uniformes e roupas corporativas. Sistema de carrinho de compras e checkout, gestão de produtos, categorias e estoque, painel administrativo para controle de pedidos.',
    category: 'enterprise',
    technologies: ['React', 'Django', 'Python', 'PostgreSQL', 'JavaScript'],
    results: ['Loja online em produção', 'Interface otimizada para conversão'],
    image: `${process.env.PUBLIC_URL}/images/base/base1.png`,
    images: [`${process.env.PUBLIC_URL}/images/base/base1.png`, `${process.env.PUBLIC_URL}/images/base/base2.png`, `${process.env.PUBLIC_URL}/images/base/base3.png`],
    featured: true,
    liveUrl: 'https://basecorporativa.store/',
    githubUrl: 'https://github.com/LeonardoRFragoso/base-corporativa'
  },
  {
    id: 3,
    title: 'Plataforma APM',
    subtitle: 'Monitoramento de Performance de Aplicações',
    description: 'Sistema completo de Application Performance Monitoring. Coleta de métricas, logs e traces em tempo real. Alertas automáticos e dashboards customizáveis. Arquitetura preparada para alto volume de dados.',
    category: 'enterprise',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Grafana'],
    results: ['Monitoramento em tempo real', 'Solução enterprise para observabilidade'],
    image: '/images/APM/APM1.png',
    images: ['/images/APM/APM1.png', '/images/APM/APM2.png', '/images/APM/APM3.png', '/images/APM/APM4.png', '/images/APM/APM5.png', '/images/APM/APM6.png', '/images/APM/APM7.png'],
    featured: false,
    githubUrl: 'https://github.com/LeonardoRFragoso/Plataforma-de-Monitoramento-de-Sistemas-e-APIs'
  },
  {
    id: 4,
    title: 'FinanceControl',
    subtitle: 'Gerenciador Financeiro Pessoal',
    description: 'Sistema completo de gestão financeira com modelo Freemium e app multiplataforma (Windows, Android, iOS, Web). Dashboard interativo, metas financeiras, orçamentos e IA assistente. Integração com Mercado Pago para assinaturas.',
    category: 'software',
    technologies: ['Flutter', 'Django', 'REST API', 'MercadoPago'],
    results: ['App multiplataforma', 'Sistema Freemium com pagamentos'],
    image: `${process.env.PUBLIC_URL}/images/FinanceControl/financecontrol1.png`,
    images: [`${process.env.PUBLIC_URL}/images/FinanceControl/financecontrol1.png`, `${process.env.PUBLIC_URL}/images/FinanceControl/financecontrol2.png`, `${process.env.PUBLIC_URL}/images/FinanceControl/financecontrol5.png`, `${process.env.PUBLIC_URL}/images/FinanceControl/financecontrol6.png`],
    featured: false,
    githubUrl: 'https://github.com/LeonardoRFragoso/gerenciador-financeiro'
  },
  {
    id: 5,
    title: 'MedFlow',
    subtitle: 'Sistema de Gestão Médica',
    description: 'Plataforma completa para gestão de clínicas e consultórios médicos. Agendamento de consultas, prontuário eletrônico, gestão de pacientes e relatórios médicos.',
    category: 'enterprise',
    technologies: ['Python', 'Django', 'React', 'PostgreSQL'],
    results: ['Gestão completa de pacientes', 'Prontuário eletrônico integrado'],
    image: `${process.env.PUBLIC_URL}/images/medflow/medflow1.png`,
    images: [`${process.env.PUBLIC_URL}/images/medflow/medflow1.png`, `${process.env.PUBLIC_URL}/images/medflow/medflow2.png`, `${process.env.PUBLIC_URL}/images/medflow/medflow3.png`, `${process.env.PUBLIC_URL}/images/medflow/medflow4.png`, `${process.env.PUBLIC_URL}/images/medflow/medflow5.png`, `${process.env.PUBLIC_URL}/images/medflow/medflow6.png`, `${process.env.PUBLIC_URL}/images/medflow/medflow7.png`, `${process.env.PUBLIC_URL}/images/medflow/medflow8.png`],
    featured: true
  },
  {
    id: 6,
    title: 'SaaS Platform',
    subtitle: 'Plataforma de Software como Serviço',
    description: 'Sistema SaaS multi-tenant com dashboard administrativo, gestão de assinaturas, billing automatizado e analytics avançado para monitoramento de métricas de negócio.',
    category: 'enterprise',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe API'],
    results: ['Multi-tenant architecture', 'Billing automatizado'],
    image: '/images/SaaS/1SaaS - 1.png',
    images: ['/images/SaaS/1SaaS - 1.png', '/images/SaaS/1SaaS - 2.png', '/images/SaaS/1SaaS - 3.png', '/images/SaaS/1SaaS - 4.png', '/images/SaaS/1SaaS - 5.png', '/images/SaaS/1SaaS - 6.png', '/images/SaaS/1SaaS - 7.png'],
    featured: false
  },
  {
    id: 7,
    title: 'Dashboard de Multas',
    subtitle: 'Sistema de Gestão de Infrações',
    description: 'Dashboard analítico para gestão e acompanhamento de multas de trânsito. Visualização de dados, relatórios gerenciais e alertas automáticos de vencimento.',
    category: 'software',
    technologies: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
    results: ['Visualização de dados em tempo real', 'Relatórios automatizados'],
    image: `${process.env.PUBLIC_URL}/images/dash-multas/1.jpg`,
    images: [`${process.env.PUBLIC_URL}/images/dash-multas/1.jpg`, `${process.env.PUBLIC_URL}/images/dash-multas/2.jpg`, `${process.env.PUBLIC_URL}/images/dash-multas/3.jpg`, `${process.env.PUBLIC_URL}/images/dash-multas/4.jpg`, `${process.env.PUBLIC_URL}/images/dash-multas/5.jpg`, `${process.env.PUBLIC_URL}/images/dash-multas/6.jpg`, `${process.env.PUBLIC_URL}/images/dash-multas/7.jpg`, `${process.env.PUBLIC_URL}/images/dash-multas/8.jpg`, `${process.env.PUBLIC_URL}/images/dash-multas/9.jpg`],
    featured: false
  },
  {
    id: 8,
    title: 'Gestão de Pátio',
    subtitle: 'Sistema de Controle Logístico',
    description: 'Sistema de gestão de pátio para controle de entrada e saída de veículos, monitoramento de cargas e otimização de operações logísticas.',
    category: 'software',
    technologies: ['Python', 'Flask', 'SQLite', 'JavaScript'],
    results: ['Controle de veículos em tempo real', 'Otimização de operações'],
    image: '/images/Pátio/1.jpg',
    images: ['/images/Pátio/1.jpg', '/images/Pátio/2.jpg', '/images/Pátio/3.jpg', '/images/Pátio/4.jpg', '/images/Pátio/5.jpg', '/images/Pátio/6.jpg'],
    featured: false
  },
  {
    id: 9,
    title: 'TVs Corporativas',
    subtitle: 'Sistema de Display Digital',
    description: 'Sistema de gerenciamento de displays digitais para operações portuárias. Exibição de informações operacionais, dashboards e comunicação interna em tempo real.',
    category: 'enterprise',
    technologies: ['Python', 'React', 'WebSockets', 'PostgreSQL'],
    results: ['Displays em tempo real', 'Gestão centralizada'],
    image: `${process.env.PUBLIC_URL}/images/Tvs-ICTSI/1.jpg`,
    images: [`${process.env.PUBLIC_URL}/images/Tvs-ICTSI/1.jpg`, `${process.env.PUBLIC_URL}/images/Tvs-ICTSI/2.jpg`, `${process.env.PUBLIC_URL}/images/Tvs-ICTSI/3.jpg`, `${process.env.PUBLIC_URL}/images/Tvs-ICTSI/4.jpg`, `${process.env.PUBLIC_URL}/images/Tvs-ICTSI/5.jpg`, `${process.env.PUBLIC_URL}/images/Tvs-ICTSI/6.jpg`, `${process.env.PUBLIC_URL}/images/Tvs-ICTSI/7.jpg`, `${process.env.PUBLIC_URL}/images/Tvs-ICTSI/8.jpg`, `${process.env.PUBLIC_URL}/images/Tvs-ICTSI/9.jpg`],
    featured: true
  },
  {
    id: 10,
    title: 'GR - Gestão de Recursos',
    subtitle: 'Sistema de Gestão Empresarial',
    description: 'Sistema completo de gestão de recursos empresariais. Controle de inventário, gestão de equipes, relatórios gerenciais e indicadores de desempenho.',
    category: 'enterprise',
    technologies: ['Python', 'Django', 'React', 'PostgreSQL'],
    results: ['Gestão integrada de recursos', 'KPIs em tempo real'],
    image: '/images/GR/1.jpg',
    images: ['/images/GR/1.jpg', '/images/GR/2.jpg', '/images/GR/3.jpg', '/images/GR/4.jpg', '/images/GR/5.jpg', '/images/GR/6.jpg', '/images/GR/7.jpg', '/images/GR/8.jpg', '/images/GR/9.jpg', '/images/GR/10.jpg', '/images/GR/11.jpg', '/images/GR/12.jpg'],
    featured: false
  },
  {
    id: 11,
    title: 'Andaimes Pini',
    subtitle: 'Sistema de Gestão de Locação',
    description: 'Plataforma de gestão para empresa de locação de andaimes. Controle de estoque, agendamento de entregas, gestão de contratos e faturamento.',
    category: 'enterprise',
    technologies: ['Python', 'Django', 'Bootstrap', 'PostgreSQL'],
    results: ['Gestão de contratos', 'Controle de estoque integrado'],
    image: '/images/Andaimes Pini/pini1.png',
    images: ['/images/Andaimes Pini/pini1.png', '/images/Andaimes Pini/pini2.png', '/images/Andaimes Pini/pini3.png', '/images/Andaimes Pini/pini4.png', '/images/Andaimes Pini/pini5.png', '/images/Andaimes Pini/Pini6.png', '/images/Andaimes Pini/Pini7.png', '/images/Andaimes Pini/pini8.png', '/images/Andaimes Pini/pini9.png', '/images/Andaimes Pini/Pini10.png', '/images/Andaimes Pini/pini11.png', '/images/Andaimes Pini/pini12.png', '/images/Andaimes Pini/pini13.png', '/images/Andaimes Pini/pini14.png', '/images/Andaimes Pini/pini15.png'],
    featured: false
  },
  {
    id: 12,
    title: 'Não Conformidade',
    subtitle: 'Sistema de Gestão de Qualidade',
    description: 'Sistema para registro e acompanhamento de não conformidades. Workflow de aprovação, ações corretivas, relatórios de qualidade e indicadores ISO.',
    category: 'software',
    technologies: ['Python', 'Flask', 'SQLite', 'JavaScript'],
    results: ['Gestão de qualidade ISO', 'Workflow automatizado'],
    image: '/images/não-conformidade/1.jpg',
    images: ['/images/não-conformidade/1.jpg', '/images/não-conformidade/2.jpg', '/images/não-conformidade/3.jpg', '/images/não-conformidade/4.jpg', '/images/não-conformidade/5.jpg', '/images/não-conformidade/6.jpg', '/images/não-conformidade/7.jpg', '/images/não-conformidade/8.jpg'],
    featured: false
  },
  {
    id: 13,
    title: 'GNLink',
    subtitle: 'Site Institucional - Setor de Energia',
    description: 'Site institucional moderno e responsivo para empresa do setor de energia. Suporte a internacionalização (PT/EN), animações fluidas, menu responsivo com dropdown e design otimizado para conversão.',
    category: 'web',
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    results: ['Internacionalização PT/EN', 'Design responsivo e animado'],
    image: '/images/GNLink/1.png',
    images: ['/images/GNLink/1.png', '/images/GNLink/2.png', '/images/GNLink/3.png', '/images/GNLink/4.png', '/images/GNLink/5.png', '/images/GNLink/6.png', '/images/GNLink/7.png', '/images/GNLink/8.png'],
    featured: false
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
        title="Portfólio - Projetos que Geram Resultados"
        description="Conheça nosso portfólio de projetos. Cases de sucesso em desenvolvimento web, sistemas enterprise e automações para diversos setores."
        url="https://pyscript.tech/projects"
      />
      <div className="projectsPage">
        {/* Hero Section */}
        <section className="projectsHero">
        <div className="heroContent">
          <span className="heroBadge">Nosso Portfólio</span>
          <h1>
            Projetos que
            <span>geram resultados</span>
          </h1>
          <p>
            Conheça alguns dos projetos que desenvolvemos para nossos clientes. 
            Cada solução é única e pensada para resolver desafios reais.
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
                <img src={project.image} alt={project.title} />
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
                <img src={project.image} alt={project.title} className="cardImage" />
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
