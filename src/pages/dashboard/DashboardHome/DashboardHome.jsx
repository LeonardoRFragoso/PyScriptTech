import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiBriefcase, 
  FiCheckSquare, 
  FiDollarSign,
  FiTrendingUp,
  FiArrowUpRight,
  FiArrowDownRight,
  FiClock,
  FiCalendar
} from 'react-icons/fi';
import { LineChart, BarChart, DonutChart } from '../../../components/dashboard/Charts';
import TiltCard from '../../../components/common/TiltCard';
import { StaggerContainer, AnimatedItem } from '../../../components/common/AnimatedSection';
import styles from './DashboardHome.module.css';

const DashboardHome = () => {
  // Chart data
  const revenueData = [
    { label: 'Jan', value: 32000 },
    { label: 'Fev', value: 28000 },
    { label: 'Mar', value: 45000 },
    { label: 'Abr', value: 38000 },
    { label: 'Mai', value: 52000 },
    { label: 'Jun', value: 45200 },
  ];

  const projectsChartData = [
    { label: 'Web', value: 12 },
    { label: 'Mobile', value: 8 },
    { label: 'ERP', value: 5 },
    { label: 'E-commerce', value: 7 },
  ];

  const taskDistribution = [
    { label: 'Concluídas', value: 45 },
    { label: 'Em Progresso', value: 25 },
    { label: 'Pendentes', value: 15 },
    { label: 'Atrasadas', value: 5 },
  ];

  const stats = [
    { 
      icon: FiUsers, 
      label: 'Clientes Ativos', 
      value: '24', 
      change: '+12%',
      trend: 'up',
      color: '#00d4ff'
    },
    { 
      icon: FiBriefcase, 
      label: 'Projetos', 
      value: '8', 
      change: '+3',
      trend: 'up',
      color: '#7c3aed'
    },
    { 
      icon: FiCheckSquare, 
      label: 'Tarefas Pendentes', 
      value: '15', 
      change: '-5',
      trend: 'down',
      color: '#f59e0b'
    },
    { 
      icon: FiDollarSign, 
      label: 'Receita Mensal', 
      value: 'R$ 45.2K', 
      change: '+18%',
      trend: 'up',
      color: '#10b981'
    },
  ];

  const recentProjects = [
    { id: 1, name: 'Sistema ERP - Cliente A', status: 'Em andamento', progress: 75, deadline: '15 Mar' },
    { id: 2, name: 'E-commerce B2B', status: 'Em andamento', progress: 45, deadline: '22 Mar' },
    { id: 3, name: 'App Mobile', status: 'Aguardando', progress: 0, deadline: '01 Abr' },
    { id: 4, name: 'Dashboard Analytics', status: 'Concluído', progress: 100, deadline: '10 Mar' },
  ];

  const recentTasks = [
    { id: 1, title: 'Implementar autenticação', project: 'Sistema ERP', priority: 'Alta', due: 'Hoje' },
    { id: 2, title: 'Revisar design do dashboard', project: 'E-commerce', priority: 'Média', due: 'Amanhã' },
    { id: 3, title: 'Configurar CI/CD', project: 'App Mobile', priority: 'Baixa', due: '18 Mar' },
    { id: 4, title: 'Reunião com cliente', project: 'Sistema ERP', priority: 'Alta', due: 'Hoje' },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Concluído': return styles.statusCompleted;
      case 'Em andamento': return styles.statusProgress;
      case 'Aguardando': return styles.statusWaiting;
      default: return '';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Alta': return styles.priorityHigh;
      case 'Média': return styles.priorityMedium;
      case 'Baixa': return styles.priorityLow;
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Dashboard</h1>
          <p>Bem-vindo de volta! Aqui está um resumo do seu negócio.</p>
        </div>
        <div className={styles.headerActions}>
          <span className={styles.date}>
            <FiCalendar />
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            })}
          </span>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: `${stat.color}20`, color: stat.color }}>
              <stat.icon />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statLabel}>{stat.label}</span>
              <div className={styles.statValue}>
                <span>{stat.value}</span>
                <span className={`${styles.statChange} ${stat.trend === 'up' ? styles.up : styles.down}`}>
                  {stat.trend === 'up' ? <FiArrowUpRight /> : <FiArrowDownRight />}
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Projetos Recentes</h2>
            <Link to="/dashboard/projects" className={styles.viewAll}>Ver todos</Link>
          </div>
          <div className={styles.projectsList}>
            {recentProjects.map(project => (
              <div key={project.id} className={styles.projectItem}>
                <div className={styles.projectInfo}>
                  <h3>{project.name}</h3>
                  <span className={`${styles.projectStatus} ${getStatusClass(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <div className={styles.projectProgress}>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span>{project.progress}%</span>
                </div>
                <div className={styles.projectDeadline}>
                  <FiClock />
                  <span>{project.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Tarefas Urgentes</h2>
            <Link to="/dashboard/tasks" className={styles.viewAll}>Ver todas</Link>
          </div>
          <div className={styles.tasksList}>
            {recentTasks.map(task => (
              <div key={task.id} className={styles.taskItem}>
                <div className={styles.taskCheckbox}></div>
                <div className={styles.taskContent}>
                  <h4>{task.title}</h4>
                  <span className={styles.taskProject}>{task.project}</span>
                </div>
                <span className={`${styles.taskPriority} ${getPriorityClass(task.priority)}`}>
                  {task.priority}
                </span>
                <span className={styles.taskDue}>{task.due}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.chartsGrid}>
        <motion.div 
          className={styles.chartCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Receita Mensal</h3>
          <LineChart data={revenueData} height={220} color="#00d4ff" />
        </motion.div>
        
        <motion.div 
          className={styles.chartCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3>Projetos por Categoria</h3>
          <BarChart data={projectsChartData} height={220} />
        </motion.div>
        
        <motion.div 
          className={styles.chartCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Distribuição de Tarefas</h3>
          <DonutChart data={taskDistribution} size={180} thickness={25} />
        </motion.div>
      </div>

      <div className={styles.quickActions}>
        <h2>Ações Rápidas</h2>
        <StaggerContainer staggerDelay={0.1} className={styles.actionsGrid}>
          <AnimatedItem>
            <TiltCard intensity={10}>
              <Link to="/dashboard/clients/new" className={styles.actionCard}>
                <FiUsers />
                <span>Novo Cliente</span>
              </Link>
            </TiltCard>
          </AnimatedItem>
          <AnimatedItem>
            <TiltCard intensity={10}>
              <Link to="/dashboard/projects/new" className={styles.actionCard}>
                <FiBriefcase />
                <span>Novo Projeto</span>
              </Link>
            </TiltCard>
          </AnimatedItem>
          <AnimatedItem>
            <TiltCard intensity={10}>
              <Link to="/dashboard/tasks/new" className={styles.actionCard}>
                <FiCheckSquare />
                <span>Nova Tarefa</span>
              </Link>
            </TiltCard>
          </AnimatedItem>
          <AnimatedItem>
            <TiltCard intensity={10}>
              <Link to="/dashboard/reports" className={styles.actionCard}>
                <FiTrendingUp />
                <span>Relatórios</span>
              </Link>
            </TiltCard>
          </AnimatedItem>
        </StaggerContainer>
      </div>
    </div>
  );
};

export default DashboardHome;
