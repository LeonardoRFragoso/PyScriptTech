import KeywordLandingPage from './KeywordLandingPage';

const pageData = {
  badge: 'Automação Empresarial',
  headline: 'Automação Empresarial para Eliminar Tarefas Repetitivas',
  subheadline: 'Reduza custos operacionais, elimine erros humanos e libere sua equipe para atividades estratégicas com automações sob medida.',
  title: 'Automação Empresarial',
  description: 'Automatizamos processos manuais, integrações entre sistemas e fluxos operacionais com RPA, APIs e inteligência artificial.',
  url: 'https://pyscript.tech/automacao-empresarial',
  serviceType: 'Business Process Automation',
  seoTitle: 'Automação Empresarial para Reduzir Custos | PyScript.tech',
  seoDescription: 'Automação de processos empresariais com RPA, integrações e IA. Reduza custos, elimine tarefas repetitivas e escale sua operação.',
  keywords: 'automação empresarial, RPA, automação de processos, integração de sistemas, automação com python, PyScript.tech',
  whatsappMessage: 'Olá! Gostaria de saber mais sobre Automação Empresarial para minha empresa.',
  problemTitle: 'Quanto a falta de automação custa para sua empresa?',
  problems: [
    { title: 'Horas perdidas em tarefas repetitivas', description: 'Equipes gastam grande parte do tempo copiando dados, preenchendo formulários e gerando relatórios.' },
    { title: 'Erros humanos constantes', description: 'Processos manuais geram retrabalho, atrasos e insatisfação de clientes.' },
    { title: 'Dificuldade para escalar', description: 'Crescimento exige contratação linear quando a operação depende de trabalho manual.' }
  ],
  solutionTitle: 'Como automatizamos processos empresariais',
  solutionDescription: [
    'Mapeamos fluxos manuais, identificamos gargalos e desenvolvemos automações que conectam sistemas, processam dados e executam tarefas sem intervenção humana. Utilizamos RPA, APIs, filas e inteligência artificial para criar fluxos robustos e escaláveis.',
    'O resultado é redução de custos, aumento de velocidade, menor taxa de erro e equipes mais focadas em atividades de alto valor.'
  ],
  benefits: [
    'Redução de até 70% no tempo de processos manuais',
    'Eliminação de erros humanos em tarefas repetitivas',
    'Integração entre sistemas sem API nativa via RPA',
    'Relatórios e notificações automáticas',
    'Escalabilidade sem aumento proporcional de equipe',
    'ROI mensurável em poucos meses'
  ],
  steps: [
    { title: 'Mapeamento', description: 'Identificamos processos manuais e oportunidades de automação.' },
    { title: 'Proposta', description: 'Definimos fluxos automatizados, integrações e retorno esperado.' },
    { title: 'Implementação', description: 'Desenvolvemos robôs, APIs e integrações com validação.' },
    { title: 'Monitoramento', description: 'Acompanhamento de performance, logs e melhorias contínuas.' }
  ],
  faqs: [
    { question: 'O que pode ser automatizado na minha empresa?', answer: 'Entrada de dados, geração de relatórios, envio de emails e notificações, integrações entre sistemas, conciliação bancária, faturamento e atendimentos repetitivos.' },
    { question: 'Automação com RPA é segura?', answer: 'Sim. Trabalhamos com credenciais protegidas, logs de auditoria, ambientes isolados e conformidade com as políticas de segurança da empresa.' },
    { question: 'Quanto tempo leva para implementar uma automação?', answer: 'Automações simples ficam prontas em 5-10 dias. Fluxos complexos com múltiplas integrações levam de 2-6 semanas.' }
  ],
  finalCta: {
    title: 'Vamos automatizar sua operação?',
    description: 'Solicite um diagnóstico gratuito e descubra quais processos da sua empresa podem ser automatizados.'
  }
};

const AutomacaoEmpresarial = () => <KeywordLandingPage pageData={pageData} />;

export default AutomacaoEmpresarial;
