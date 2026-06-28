import KeywordLandingPage from './KeywordLandingPage';

const pageData = {
  badge: 'Desenvolvimento Django',
  headline: 'Desenvolvimento Django para Sistemas Corporativos Robustos',
  subheadline: 'Sistemas administrativos, ERPs, CRMs e portais internos com Django, Python e PostgreSQL. Segurança, escalabilidade e entrega rápida.',
  title: 'Desenvolvimento Django',
  description: 'Desenvolvimento de sistemas corporativos com Django. ERPs, CRMs, portais e aplicações web robustas para empresas.',
  url: 'https://pyscript.tech/desenvolvimento-django',
  serviceType: 'Django Development',
  seoTitle: 'Desenvolvimento Django para Empresas | PyScript.tech',
  seoDescription: 'Desenvolvimento Django para sistemas corporativos, ERPs, CRMs e portais. Segurança, escalabilidade e entrega rápida.',
  keywords: 'desenvolvimento django, django empresas, sistema django, django python, ERP django, CRM django, PyScript.tech',
  whatsappMessage: 'Olá! Gostaria de saber mais sobre Desenvolvimento Django para minha empresa.',
  problemTitle: 'Por que escolher Django para o seu sistema?',
  problems: [
    { title: 'Segurança embutida', description: 'Django tem proteção contra SQL injection, XSS, CSRF e clickjacking por padrão.' },
    { title: 'Produtividade alta', description: 'Admin pronto, ORM poderoso e ecossistema maduro aceleram o desenvolvimento.' },
    { title: 'Escalabilidade comprovada', description: 'Instagram, Pinterest e Mozilla usam Django em grande escala.' }
  ],
  solutionTitle: 'Como desenvolvemos sistemas com Django',
  solutionDescription: [
    'Utilizamos Django para construir sistemas administrativos, ERPs, CRMs e portais internos com segurança e escalabilidade. O Django Admin acelera a criação de interfaces de gestão, enquanto o ORM facilita modelagem complexa de dados.',
    'Nossos projetos seguem boas práticas de Clean Architecture, testes automatizados e deploy containerizado com Docker.'
  ],
  benefits: [
    'Admin pronto para gestão interna',
    'ORM poderoso para modelos complexos',
    'Autenticação e permissões avançadas',
    'APIs REST com Django REST Framework',
    'Integração com PostgreSQL e Redis',
    'Segurança e conformidade corporativa'
  ],
  steps: [
    { title: 'Análise', description: 'Mapeamos requisitos, usuários e integrações necessárias.' },
    { title: 'Modelagem', description: 'Definimos modelos de dados, fluxos e permissões.' },
    { title: 'Desenvolvimento', description: 'Codificamos com Django, testes e entregas semanais.' },
    { title: 'Produção', description: 'Deploy, monitoramento e suporte contínuo.' }
  ],
  faqs: [
    { question: 'Django é adequado para ERP?', answer: 'Sim. Django é excelente para sistemas administrativos, com ORM robusto, admin pronto e suporte a permissões complexas.' },
    { question: 'Quanto tempo leva um sistema em Django?', answer: 'Módulos iniciais de 2-4 semanas. Sistemas corporativos completos de 2-6 meses.' },
    { question: 'Django pode ser integrado com outros sistemas?', answer: 'Sim. Desenvolvemos APIs REST e conectores para integrar Django com ERPs, CRMs e sistemas legados.' }
  ],
  finalCta: {
    title: 'Vamos desenvolver seu sistema em Django?',
    description: 'Solicite um diagnóstico gratuito e receba uma proposta técnica personalizada.'
  }
};

const DesenvolvimentoDjango = () => <KeywordLandingPage pageData={pageData} />;

export default DesenvolvimentoDjango;
