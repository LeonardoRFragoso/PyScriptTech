import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaLightbulb, FaHeart, FaTrophy, FaCertificate, FaCode, FaGraduationCap } from 'react-icons/fa';
import SEO from '../../components/SEO/SEO';
import CounterStat from '../../components/DesignSystem/CounterStat';
import Timeline from '../../components/common/Timeline';
import FlipCard from '../../components/common/FlipCard';
import TiltCard from '../../components/common/TiltCard';
import ParticlesBackground from '../../components/common/ParticlesBackground';
import './AboutPage.css';

const AboutPage = () => {
  const stats = [
    { end: 5, suffix: '+', label: 'Anos de Experiência', icon: <FaTrophy /> },
    { end: 70, suffix: '+', label: 'Projetos Entregues', icon: <FaRocket /> },
    { end: 98, suffix: '%', label: 'Clientes Satisfeitos', icon: <FaHeart /> },
    { end: 12, suffix: '+', label: 'Tecnologias', icon: <FaLightbulb /> },
  ];

  const values = [
    {
      icon: <FaRocket />,
      title: 'Qualidade Acima de Tudo',
      description: 'Código limpo, documentado e testado. Cada projeto é desenvolvido seguindo as melhores práticas do mercado.'
    },
    {
      icon: <FaUsers />,
      title: 'Transparência Total',
      description: 'Comunicação clara e constante. Você acompanha cada etapa do desenvolvimento do seu projeto.'
    },
    {
      icon: <FaLightbulb />,
      title: 'Inovação Constante',
      description: 'Sempre atualizados com as tecnologias mais modernas para entregar soluções de ponta.'
    },
    {
      icon: <FaHeart />,
      title: 'Cliente no Centro',
      description: 'Seu sucesso é o nosso sucesso. Trabalhamos incansavelmente para superar suas expectativas.'
    },
  ];

  const team = [
    {
      name: 'Leonardo Fragoso',
      role: 'Founder & Lead Developer',
      specialties: ['Python', 'Django', 'React', 'System Architecture'],
      image: '/images/team/leonardo.jpg',
      bio: 'Desenvolvedor Full Stack com mais de 5 anos de experiência em projetos enterprise. Especialista em criar soluções escaláveis e robustas.',
    },
  ];

  const recognitions = [
    {
      icon: <FaCertificate />,
      title: 'Certificação AWS',
      description: 'Solutions Architect Associate'
    },
    {
      icon: <FaCertificate />,
      title: 'Python Expert',
      description: 'Advanced Certification'
    },
    {
      icon: <FaTrophy />,
      title: 'Top Projects',
      description: '70+ Projetos de Sucesso'
    },
  ];

  const timelineItems = [
    {
      date: '2019',
      title: 'Início da Jornada',
      description: 'Fundação da PyScript.tech com foco em soluções Python e automação.',
      icon: <FaRocket />,
      tags: ['Python', 'Automação']
    },
    {
      date: '2020',
      title: 'Expansão para Web',
      description: 'Ampliação do portfólio com desenvolvimento web fullstack usando React e Django.',
      icon: <FaCode />,
      tags: ['React', 'Django', 'Web']
    },
    {
      date: '2021',
      title: 'Certificação AWS',
      description: 'Obtenção da certificação AWS Solutions Architect para projetos cloud.',
      icon: <FaGraduationCap />,
      tags: ['AWS', 'Cloud']
    },
    {
      date: '2022',
      title: 'Marco de 50 Projetos',
      description: 'Celebração de 50 projetos entregues com sucesso para clientes em diversos setores.',
      icon: <FaTrophy />,
      tags: ['Enterprise', 'E-commerce']
    },
    {
      date: '2023-2024',
      title: 'Crescimento Contínuo',
      description: 'Mais de 70 projetos entregues, parcerias estratégicas e expansão da equipe.',
      icon: <FaUsers />,
      tags: ['Growth', 'Team']
    },
  ];

  return (
    <div className="aboutPage">
      <SEO
        title="Sobre Nós - Conheça a PyScript.tech"
        description="Conheça a história, missão e valores da PyScript.tech. Uma software house especializada em criar soluções digitais que transformam negócios."
        url="https://pyscript.tech/about"
      />

      {/* Hero Section */}
      <section className="aboutHero">
        <motion.div
          className="heroContent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="heroBadge">Sobre Nós</span>
          <h1>
            Transformando ideias em
            <span>soluções digitais de impacto</span>
          </h1>
          <p>
            Somos uma software house especializada em criar soluções digitais sob medida. 
            Nossa missão é transformar desafios complexos em sistemas simples, eficientes e escaláveis.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="aboutStats">
        <div className="statsGrid">
          {stats.map((stat, index) => (
            <CounterStat
              key={index}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
            />
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="storySection">
        <div className="storyContent">
          <motion.div
            className="storyText"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="sectionBadge">Nossa História</span>
            <h2>Como Nasceu a PyScript.tech</h2>
            <p>
              A PyScript.tech nasceu da paixão por resolver problemas reais através da tecnologia. 
              Com anos de experiência no mercado, identificamos uma lacuna: empresas precisavam 
              de soluções digitais de qualidade, mas não encontravam parceiros que realmente 
              entendessem suas necessidades.
            </p>
            <p>
              Decidimos então criar uma software house diferente. Uma empresa onde a qualidade 
              do código, a transparência no processo e o sucesso do cliente fossem prioridades 
              absolutas. Hoje, já são mais de 70 projetos entregues e dezenas de clientes satisfeitos.
            </p>
          </motion.div>
          <motion.div
            className="storyImage"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="imageWrapper">
              <div className="glowEffect"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timelineSection">
        <div className="sectionHeader">
          <span className="sectionBadge">Nossa Trajetória</span>
          <h2>Linha do Tempo</h2>
          <p>Os principais marcos da nossa jornada</p>
        </div>
        <Timeline items={timelineItems} />
      </section>

      {/* Mission Vision Values */}
      <section className="missionSection">
        <div className="missionGrid">
          <motion.div
            className="missionCard"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3>Missão</h3>
            <p>
              Criar soluções digitais que impulsionam o crescimento dos nossos clientes, 
              combinando tecnologia de ponta com processos transparentes e eficientes.
            </p>
          </motion.div>
          <motion.div
            className="missionCard"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3>Visão</h3>
            <p>
              Ser referência em desenvolvimento de software de qualidade, reconhecida pela 
              excelência técnica e pelo compromisso genuíno com o sucesso dos clientes.
            </p>
          </motion.div>
          <motion.div
            className="missionCard"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>Diferencial</h3>
            <p>
              Metodologia ágil, código de alta qualidade, comunicação transparente e 
              suporte contínuo. Tratamos cada projeto como se fosse nosso próprio negócio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="valuesSection">
        <div className="sectionHeader">
          <span className="sectionBadge">Nossos Valores</span>
          <h2>O Que Nos Move</h2>
          <p>Princípios que guiam cada decisão e cada linha de código</p>
        </div>
        <div className="valuesGrid">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="valueCard"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="valueIcon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="teamSection">
        <div className="sectionHeader">
          <span className="sectionBadge">Nossa Equipe</span>
          <h2>Especialistas Apaixonados por Tecnologia</h2>
          <p>Conheça quem está por trás dos projetos de sucesso</p>
        </div>
        <div className="teamGrid">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="teamCard"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="memberPhoto">
                <img src={`${process.env.PUBLIC_URL}/images/Leo-Perfil.png`} alt="Leonardo Fragoso" />
              </div>
              <h3>{member.name}</h3>
              <span className="memberRole">{member.role}</span>
              <p className="memberBio">{member.bio}</p>
              <div className="memberSpecialties">
                {member.specialties.map((specialty, i) => (
                  <span key={i} className="specialtyTag">{specialty}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recognitions Section */}
      <section className="recognitionsSection">
        <div className="sectionHeader">
          <span className="sectionBadge">Reconhecimentos</span>
          <h2>Certificações e Conquistas</h2>
        </div>
        <div className="recognitionsGrid">
          {recognitions.map((recognition, index) => (
            <motion.div
              key={index}
              className="recognitionCard"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="recognitionIcon">{recognition.icon}</div>
              <h3>{recognition.title}</h3>
              <p>{recognition.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="aboutCTA">
        <motion.div
          className="ctaContent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Vamos Trabalhar Juntos?</h2>
          <p>
            Estamos prontos para transformar sua ideia em uma solução digital de sucesso.
          </p>
          <div className="ctaButtons">
            <a href="/contact" className="ctaButton">
              Iniciar Projeto
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="/projects" className="ctaButtonSecondary">
              Ver Portfólio
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
