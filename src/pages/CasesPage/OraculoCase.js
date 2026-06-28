import CaseStudyPage from './CaseStudyPage';

const oraculoData = {
  title: 'Oráculo IA',
  subtitle: 'Consultor Estratégico com Inteligência Artificial e RAG',
  description: 'Sistema de IA corporativa que ingere documentos, executa pipeline OpenRAG e responde em linguagem natural com fontes verificáveis. Ideal para empresas que precisam consultar grandes volumes de documentos e dados de forma inteligente.',
  image: '/images/oraculo/oraculo1.png',
  url: 'https://pyscript.tech/cases/oraculo-ia',
  liveUrl: null,
  githubUrl: 'https://github.com/LeonardoRFragoso/Oraculo',
  seoTitle: 'Case Oráculo IA - Inteligência Artificial e RAG para Empresas | PyScript.tech',
  seoDescription: 'Case de sucesso Oráculo IA: sistema corporativo com RAG, análise de documentos e consulta inteligente. Conheça a arquitetura, tecnologias e resultados.',
  keywords: 'inteligência artificial para empresas, RAG, case IA, análise de documentos, chatbot interno, OpenRAG, PyScript.tech',
  results: [
    { value: '80%', label: 'Redução no tempo de consulta a documentos' },
    { value: '100%', label: 'Respostas com citação de fontes' },
    { value: '24/7', label: 'Disponibilidade do assistente' },
    { value: '3x', label: 'Mais produtividade na análise de dados' }
  ],
  problem: [
    'Empresas que operam com grandes volumes de documentos, regulamentações e dados históricos enfrentam dificuldade para localizar informações relevantes rapidamente. A busca tradicional por palavras-chave retorna centenas de resultados irrelevantes e exige que analistas percam horas consolidando respostas.',
    'Sem uma ferramenta centralizada de consulta inteligente, o conhecimento fica preso em silos e a tomada de decisão fica mais lenta, impactando diretamente a produtividade e a qualidade do atendimento.'
  ],
  solution: [
    'Desenvolvemos o Oráculo IA, uma plataforma corporativa de consulta inteligente baseada em RAG (Retrieval-Augmented Generation). O sistema ingere documentos em diversos formatos, indexa semanticamente o conteúdo e responde perguntas em linguagem natural, sempre citando as fontes originais.',
    'A solução pode ser integrada a bases internas de conhecimento, regulamentações, contratos e relatórios, funcionando como um assistente virtual especializado disponível 24 horas por dia.'
  ],
  features: [
    'Ingestão de documentos em múltiplos formatos',
    'Indexação semântica com OpenSearch',
    'Pipeline OpenRAG com Langflow e Docling',
    'Respostas com citação de fontes verificáveis',
    'Interface conversacional em linguagem natural',
    'Containerização completa com Docker'
  ],
  architecture: [
    { title: 'Ingestão de Documentos', description: 'Processamento e extração de texto de PDFs, DOCX e outros formatos corporativos.' },
    { title: 'Indexação Semântica', description: 'Criação de embeddings e armazenamento vetorial no OpenSearch para busca por similaridade.' },
    { title: 'Pipeline RAG', description: 'Orquestração com Langflow combinando recuperação de contexto e geração de respostas.' },
    { title: 'Interface de Consulta', description: 'Chat em linguagem natural que apresenta respostas e links para as fontes originais.' }
  ],
  technologies: ['Python', 'FastAPI', 'OpenSearch', 'Langflow', 'Docling', 'Docker', 'React', 'OpenAI']
};

const OraculoCase = () => <CaseStudyPage caseData={oraculoData} />;

export default OraculoCase;
