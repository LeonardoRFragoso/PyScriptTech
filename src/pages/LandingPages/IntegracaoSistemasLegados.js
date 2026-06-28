import KeywordLandingPage from './KeywordLandingPage';

const pageData = {
  badge: 'Integração de Sistemas Legados',
  headline: 'Integração de Sistemas Legados sem API',
  subheadline: 'Conecte sistemas antigos, planilhas e bancos de dados à sua operação moderna com conectores sob medida.',
  title: 'Integração de Sistemas Legados',
  description: 'Integramos sistemas legados sem API, bancos de dados, planilhas e arquivos à sua operação moderna.',
  url: 'https://pyscript.tech/integracao-sistemas-legados',
  serviceType: 'Legacy System Integration',
  seoTitle: 'Integração de Sistemas Legados | PyScript.tech',
  seoDescription: 'Integramos sistemas legados sem API, bancos de dados e planilhas à sua operação. Elimine silos de informação.',
  keywords: 'integração de sistemas legados, conector sistemas legados, ETL, integração sem API, PyScript.tech',
  whatsappMessage: 'Olá! Gostaria de saber mais sobre Integração de Sistemas Legados para minha empresa.',
  problemTitle: 'Sistemas legados travam sua operação?',
  problems: [
    { title: 'Sem API disponível', description: 'Sistemas antigos não oferecem interface moderna para integração.' },
    { title: 'Dados em arquivos', description: 'Informações críticas ficam presas em planilhas, CSVs e bancos antigos.' },
    { title: 'Processos manuais de ponte', description: 'Funcionários copiam dados entre sistemas para manter a operação.' }
  ],
  solutionTitle: 'Como integramos sistemas legados',
  solutionDescription: [
    'Desenvolvemos conectores que leem bancos de dados, arquivos, telas e relatórios de sistemas legados para sincronizar dados com sistemas modernos. Utilizamos ETL, RPA, web scraping e APIs para criar pontes robustas.',
    'Cada integração é projetada com logs, tratamento de erros e monitoramento para garantir confiabilidade.'
  ],
  benefits: [
    'Conexão com sistemas sem API',
    'Leitura de bancos de dados, arquivos e telas',
    'Sincronização automática e programada',
    'Eliminação de entrada manual de dados',
    'Logs e auditoria de integrações',
    'Migração gradual sem parada da operação'
  ],
  steps: [
    { title: 'Inventário', description: 'Mapeamos sistemas legados e formatos de dados.' },
    { title: 'Conector', description: 'Desenvolvemos a ponte de comunicação com o sistema legado.' },
    { title: 'Transformação', description: 'Padronizamos e validam dados antes de enviar.' },
    { title: 'Sincronização', description: 'Automatizamos a troca de dados com logs.' }
  ],
  faqs: [
    { question: 'Dá para integrar sistema que não tem API?', answer: 'Sim. Podemos ler bancos de dados, arquivos, relatórios e até telas usando RPA para extrair e enviar dados.' },
    { question: 'A integração com sistema legado é segura?', answer: 'Sim. Trabalhamos com leitura controlada, logs de auditoria e sem alterar dados do sistema legado sem autorização.' },
    { question: 'Quanto tempo leva uma integração com legado?', answer: 'Depende da complexidade. Integrações simples com arquivos levam 1-2 semanas. Sistemas complexos de 1-3 meses.' }
  ],
  finalCta: {
    title: 'Vamos integrar seus sistemas legados?',
    description: 'Solicite um diagnóstico gratuito e descubra como conectar sua operação sem trocar tudo.'
  }
};

const IntegracaoSistemasLegados = () => <KeywordLandingPage pageData={pageData} />;

export default IntegracaoSistemasLegados;
