import KeywordLandingPage from './KeywordLandingPage';

const pageData = {
  badge: 'Chatbot Empresarial',
  headline: 'Chatbot Empresarial com IA para Atendimento e Processos Internos',
  subheadline: 'Assistentes virtuais que atendem clientes, respondem dúvidas internas e automatizam processos com inteligência artificial.',
  title: 'Chatbot Empresarial',
  description: 'Desenvolvemos chatbots empresariais com IA para atendimento ao cliente, suporte interno e automação de processos.',
  url: 'https://pyscript.tech/chatbot-empresarial',
  serviceType: 'Chatbot Development',
  seoTitle: 'Chatbot Empresarial com IA | PyScript.tech',
  seoDescription: 'Chatbots empresariais com IA para atendimento, suporte interno e automação. Reduza custos e responda 24/7.',
  keywords: 'chatbot empresarial, chatbot com IA, atendimento automatizado, assistente virtual, WhatsApp bot, PyScript.tech',
  whatsappMessage: 'Olá! Gostaria de saber mais sobre Chatbot Empresarial para minha empresa.',
  problemTitle: 'Por que sua empresa precisa de um chatbot?',
  problems: [
    { title: 'Atendimento limitado', description: 'Equipes não conseguem responder todos os clientes fora do horário comercial.' },
    { title: 'Dúvidas repetitivas', description: 'Grande parte do atendimento envolve perguntas simples e repetitivas.' },
    { title: 'Escalabilidade', description: 'Crescimento do atendimento exige contratação linear de equipe.' }
  ],
  solutionTitle: 'Como implementamos chatbots empresariais',
  solutionDescription: [
    'Desenvolvemos chatbots com IA para atendimento ao cliente, suporte interno (RH, TI, jurídico) e automação de processos. Integramos com WhatsApp, sites, portais internos e sistemas corporativos.',
    'Nossos chatbots utilizam GPT-4, RAG e bases de conhecimento privadas para responder com precisão e citar fontes.'
  ],
  benefits: [
    'Atendimento 24/7 sem intervenção humana',
    'Respostas com base em documentos internos',
    'Integração com WhatsApp Business e sites',
    'Escalonamento inteligente para humanos',
    'Análise de conversas e métricas',
    'Redução de até 70% no custo de atendimento'
  ],
  steps: [
    { title: 'Diagnóstico', description: 'Mapeamos cenários de uso e perguntas frequentes.' },
    { title: 'Base de Conhecimento', description: 'Indexamos documentos, FAQs e processos.' },
    { title: 'Desenvolvimento', description: 'Treinamento do chatbot e integração com canais.' },
    { title: 'Deploy', description: 'Publicação, monitoramento e melhoria contínua.' }
  ],
  faqs: [
    { question: 'O chatbot pode responder com dados da minha empresa?', answer: 'Sim. Implementamos RAG para que o chatbot responda apenas com documentos e dados autorizados.' },
    { question: 'Chatbot funciona no WhatsApp?', answer: 'Sim. Desenvolvemos chatbots para WhatsApp Business, sites, portais e aplicativos internos.' },
    { question: 'Quanto tempo leva para implementar um chatbot?', answer: 'Chatbots simples em 2-4 semanas. Chatbots corporativos com múltiplas integrações de 1-3 meses.' }
  ],
  finalCta: {
    title: 'Quer um chatbot para sua empresa?',
    description: 'Solicite um diagnóstico gratuito e descubra como um chatbot com IA pode reduzir custos.'
  }
};

const ChatbotEmpresarial = () => <KeywordLandingPage pageData={pageData} />;

export default ChatbotEmpresarial;
