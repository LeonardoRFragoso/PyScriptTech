# AUDITORIA_HOME_PYSCRIPT_TECH.md
> Auditoria profissional de UX, UI, Copywriting e Conversão — PyScript.tech
> Data: Junho 2026 | Baseada na inspeção direta do código-fonte dos 13 componentes da homepage

---

## 1. RESUMO EXECUTIVO

A página principal da PyScript.tech possui **13 seções distintas**, aproximadamente **46 cards/itens** de conteúdo, **13+ CTAs** distribuídos ao longo do scroll e repetição significativa de informações (estatísticas aparecem 3 vezes, garantias aparecem 3 vezes, o processo aparece 2 vezes completo). O resultado é uma página honesta no conteúdo mas que **sobrecarrega cognitivamente o visitante**, dilui a ação principal e contém **3 problemas críticos de credibilidade** que devem ser corrigidos imediatamente antes de qualquer outra otimização.

**Diagnóstico rápido:**
- A página está com **excesso grave de informações**
- A proposta de valor **existe mas está enterrada** em repetições
- O CTA principal compete com pelo menos **12 outros pontos de ação**
- Existem elementos que **ativamente destroem credibilidade** (detalhados abaixo)

---

## 2. DIAGNÓSTICO GERAL

| Dimensão | Nota | Justificativa |
|----------|------|---------------|
| Clareza | 6/10 | Proposta de valor existe, mas exige paciência para encontrar |
| Conversão | 4/10 | Muitos CTAs competindo; urgência falsa; auto-depoimento |
| UX/UI | 6/10 | Visual provavelmente limpo, mas 13 seções esgotam o usuário |
| Copywriting | 5/10 | Títulos repetem badges; buzzwords excessivos; textos genéricos |
| Posicionamento | 5/10 | Público-alvo difuso; mistura linguagem técnica e de negócios |

**A página está com excesso de informações? SIM.**

---

## 3. ESTRUTURA ATUAL E CLASSIFICAÇÃO POR SEÇÃO

| # | Seção | Componente | Classificação | Problema principal |
|---|-------|-----------|---------------|-------------------|
| 1 | Hero | `IntroSection` | **Essencial** | Título repete o badge literalmente |
| 2 | Problemas | `ProblemsSection` | **Essencial** | 6 cards — pode ser reduzido a 3 |
| 3 | Soluções | `SolutionsSection` | **Essencial** | 4 CTAs individuais diluem conversão |
| 4 | Proposta de Valor | `ValueProposition` | **Redundante** | Repete stats de outras 2 seções |
| 5 | Números | `StatsSection` | **Útil, resumir** | "98% satisfação" aparece aqui pela 2ª vez |
| 6 | Confiança | `TrustSection` | **Redundante** | "98% satisfação" aparece pela 3ª vez; repete garantias do FAQ |
| 7 | Processo | `ProcessSection` | **Essencial** | CTA interno duplica o hero |
| 8 | Execução/ProFlow | `ExecutionSection` | **Útil, resumir** | Integração ProFlow explicada de forma muito superficial |
| 9 | Cases | `FeaturedProjects` | **Essencial** | Descrições técnicas demais para decisores de negócio |
| 10 | Depoimentos | `TestimonialsSection` | **Útil — com fix urgente** | Auto-depoimento destrói credibilidade |
| 11 | FAQ | `FAQSection` | **Útil, resumir** | Duplica ProcessSection e TrustSection palavra a palavra |
| 12 | Urgência | `UrgencySection` | **Deve ser removida** | Countdown falso + mês hardcoded = manipulação óbvia |
| 13 | Contato | `ContactSection` | **Essencial** | OK — mantida |

---

## 4. PROBLEMAS CRÍTICOS (corrigir antes de qualquer outra coisa)

### 🔴 CRÍTICO-1 — Auto-depoimento com foto do próprio fundador

**Arquivo:** `TestimonialsSection.js` — linha 42–47

**Problema:** Um dos 4 depoimentos usa `/images/Leo-Perfil.png` — a foto de perfil do próprio fundador Leonardo Fragoso — atribuído a "Leonardo Fragoso — CTO, DataSync". O fundador está dando depoimento positivo sobre seu próprio trabalho, em sua própria página, usando seu próprio nome e foto.

**Impacto:** Destroi credibilidade imediata. Qualquer decisor de negócio que pesquise o nome percebe instantaneamente. É o único elemento que pode transformar uma visita qualificada em rejeição definitiva.

**Ação:** Remover esse depoimento imediatamente. Substituir por depoimento real ou remover a seção enquanto não há depoimentos verificáveis.

---

### 🔴 CRÍTICO-2 — Falsa urgência com mês hardcoded

**Arquivo:** `UrgencySection.js` — linha 70

**Problema:**
```js
<h2>Apenas <span>{spotsLeft} Vagas</span> Disponíveis em Janeiro</h2>
```
O mês "Janeiro" está hardcoded. Em junho, julho ou qualquer outro mês do ano, o usuário verá "vagas disponíveis em Janeiro". Além disso:
- O contador começa sempre em `47h 23m 15s` a cada carregamento de página
- `spotsLeft` é sempre 3, nunca muda
- Nenhum desses valores é persistido ou calculado dinamicamente

**Impacto:** Usuários B2B sofisticados identificam padrões de false scarcity imediatamente. Essa seção transforma uma página profissional em um funil de infoproduto de baixa credibilidade. A confiança construída pelas 11 seções anteriores é destruída aqui.

**Ação:** Remover a `UrgencySection` completamente, ou substituir por uma seção de CTA final limpa e honesta, sem countdown e sem "vagas limitadas" fictícias.

---

### 🔴 CRÍTICO-3 — Estatísticas repetidas 3 vezes na mesma página

**Arquivos:** `ValueProposition.js`, `StatsSection.js`, `TrustSection.js`

**Problema:** As mesmas métricas aparecem em três seções diferentes:

| Métrica | ValueProposition | StatsSection | TrustSection |
|---------|-----------------|--------------|--------------|
| 98% satisfação | ✅ | ✅ | ✅ |
| 24h resposta | — | ✅ | ✅ |
| ROI 300% | ✅ | — | — |
| 65% redução custos | ✅ (texto) | — | — |

**Impacto:** Quando um número aparece 3 vezes, o visitante começa a questionar sua autenticidade. O efeito é o oposto do pretendido.

**Ação:** Unificar em uma única seção de prova social. Manter `StatsSection` com os 4 números mais fortes. Fundir ou remover `ValueProposition` e `TrustSection`.

---

## 5. ANÁLISE SEÇÃO POR SEÇÃO

### SEÇÃO 1 — Hero (`IntroSection`)
**Classificação: Essencial**

**Badge atual:**
> 🚀 Automação • Inteligência Artificial • Sistemas Corporativos

**H1 atual:**
> Automação, IA e Sistemas Corporativos para Empresas

**Problema:** O H1 é uma reescrita literal do badge. Não acrescenta nada. O visitante lê a mesma informação duas vezes em 2 segundos.

**Subtítulo atual:**
> Transformamos processos manuais em operações inteligentes através de software personalizado, integrações e inteligência artificial. Reduza custos, elimine retrabalho e escale seu negócio com menos esforço operacional.

**Problemas no subtítulo:**
- Longo (33 palavras)
- Genérico — qualquer software house poderia usar esse texto
- "Operações inteligentes" é buzzword sem significado concreto

**CTAs atuais:** "Solicitar Diagnóstico Gratuito" (primário) + "Ver Cases" (secundário)

**O que está funcionando:** Hierarquia CTA primário/secundário existe. Imagem do logo à direita.

**Sugestão de H1 mais direto:**
> Sua empresa ainda perde horas em processos manuais?

**Sugestão de subtítulo mais curto:**
> Criamos automações, sistemas e integrações sob medida que eliminam retrabalho e reduzem custos operacionais.

---

### SEÇÃO 2 — Problemas (`ProblemsSection`)
**Classificação: Essencial — reduzir para 3 cards**

**Problema atual:** 6 cards com ícone + título + descrição + impacto. Bom conteúdo mas denso.

**Redundâncias entre cards:**
- "Processos manuais" e "Falta de automação" descrevem o mesmo problema com palavras diferentes
- "Retrabalho" e "Sistemas desconectados" são causas da mesma raiz

**Título atual:**
> Processos que Atrasam o Crescimento da Sua Empresa

**Razoável.** Mas "Desafios que Resolvemos" (badge) + "Processos que Atrasam" (h2) = dois enunciados do mesmo conceito.

**Sugestão:** Reduzir para 3 cards mais impactantes: Processos manuais, Sistemas desconectados, Falta de visibilidade de dados. Remove os redundantes.

---

### SEÇÃO 3 — Soluções (`SolutionsSection`)
**Classificação: Essencial — remover CTAs individuais**

**Problema:** Cada um dos 4 cards tem seu próprio CTA ("Explorar IA", "Automizar Processos", "Criar Sistema", "Integrar Sistemas"). Isso cria 4 pontos de saída antes que o usuário chegue ao CTA principal de conversão.

**Erro de digitação identificado:** `"Automizar Processos"` — deveria ser "Automatizar".

**Sugestão:** Manter os 4 cards como informação. Remover os 4 CTAs individuais. Substituir por um único CTA ao final da seção: "Qual dessas soluções você precisa? → Solicitar diagnóstico".

---

### SEÇÃO 4 — Proposta de Valor (`ValueProposition`)
**Classificação: Redundante — fundir com `StatsSection` ou remover**

**Problema:** 6 cards com títulos que são as mesmas métricas que aparecem em `StatsSection` e `TrustSection`. Adicionalmente, 2 dos 6 cards usam o mesmo ícone (`FaRocket` e `FaClock` aparecem duplicados).

**Ícones duplicados no código:**
```js
{ icon: <FaRocket />, title: 'Aumento de 40% na Conversão', ... }
{ icon: <FaClock />, title: 'Redução de 65% em Custos Operacionais', ... }
{ icon: <FaShieldAlt />, title: 'Garantia de 30 Dias + Suporte Vitalício', ... }
{ icon: <FaChartLine />, title: 'ROI Médio de 300% em 6 Meses', ... }
{ icon: <FaClock />, title: 'Entrega em até 30 Dias', ... }   // FaClock repetido
{ icon: <FaRocket />, title: '98% de Satisfação dos Clientes', ... }  // FaRocket repetido
```

**Ação:** Remover esta seção. As métricas mais importantes ficam em `StatsSection` (versão limpa) e os depoimentos validam os números.

---

### SEÇÃO 5 — Números (`StatsSection`)
**Classificação: Útil — reduzir e corrigir estatísticas fracas**

**Stats atuais:** 70+ Projetos | 98% Satisfação | 24h Resposta | 12+ Tecnologias

**Problema:** "12+ Tecnologias Dominadas" é um stat fraco. Qualquer dev júnior conhece 12 tecnologias. Não comunica valor para um decisor de negócio.

**Sugestão de substituição:** Trocar "12+ Tecnologias" por algo com impacto de negócio, como "5+ Anos no Mercado" ou "R$ 2M+ em Valor Gerado".

---

### SEÇÃO 6 — Confiança (`TrustSection`)
**Classificação: Redundante — remover**

**Problema principal:** Esta seção tem 3 subsistemas de conteúdo empilhados:
1. 6 trust badges (Garantia, Parcelamento, SSL, Suporte, AWS, ISO 9001)
2. 3 garantias em cards
3. Mini stats (98%, 0 insatisfeitos, 24h)

**Sobre os badges:**
- "ISO 9001 — Qualidade certificada": se isso é real, precisa de link/verificação. Se não é, é uma afirmação falsa séria.
- "Certificado AWS": qual certificação exatamente? Se é uma certificação individual do fundador, apresentá-la como credencial corporativa é enganoso.

**Sobre as garantias:** São as mesmas do FAQ #3 e do card de ValueProposition.

**Ação:** Remover esta seção inteira. Integrar os 2-3 elementos mais relevantes (garantia + parcelamento) em uma linha dentro do CTA final.

---

### SEÇÃO 7 — Processo (`ProcessSection`)
**Classificação: Essencial — remover CTA interno**

**Problema:** A seção tem um bloco CTA próprio no final com 2 botões: "Solicitar Orçamento Gratuito" e "Agendar Reunião". Esse CTA aparece no meio da página, antes dos Cases, Depoimentos e FAQ. Cria ruído de conversão prematuro.

**Conteúdo dos 5 passos:** Bom e diferenciador. Transparência no processo é um argumento real de venda B2B.

**Ação:** Manter os 5 passos. Remover o bloco CTA interno. Deixar o visitante continuar o scroll naturalmente.

---

### SEÇÃO 8 — Execução/ProFlow (`ExecutionSection`)
**Classificação: Útil — reformular**

**Problema:** ProFlow é apresentado como "plataforma própria" em uma nota ao rodapé de uma seção de 3 passos genéricos. Para quem não conhece ProFlow, o valor não fica claro. Para quem conhece, a explicação é superficial.

**Posição:** A seção está na posição 8 de 13. Um usuário que chegou até aqui já leu 7 seções e provavelmente está cansado. ProFlow como diferencial de execução merece posição mais acima e explicação mais direta.

**Sugestão de texto simplificado:**
> **Como você acompanha o seu projeto?**
> Após a aprovação, criamos seu projeto no ProFlow — nosso portal de projetos. Você acessa online, vê cada milestone, aprova entregas e se comunica diretamente com a equipe. Sem planilhas. Sem email perdido.

---

### SEÇÃO 9 — Cases (`FeaturedProjects`)
**Classificação: Essencial — reescrever descrições**

**Problema — linguagem técnica no caso Oráculo IA:**
> "pipeline OpenRAG completo. Ingestiona documentos, executa pipeline com OpenSearch + Langflow + Docling"

Um CEO ou Diretor de Operações não sabe o que é OpenRAG, Langflow ou Docling. Os resultados precisam preceder a tecnologia.

**Problema — ProFlow como case:**
ProFlow é simultaneamente: (a) o produto SaaS do próprio fundador, (b) parceiro de integração, e (c) case de sucesso na página. Isso cria confusão de identidade: PyScript é cliente de ProFlow ou criou ProFlow?

**Sugestão para Oráculo IA:**
> **Oráculo IA** — Consultor estratégico com inteligência artificial. Responde perguntas complexas sobre documentos internos da empresa, com citação de fontes. Reduz tempo de análise de horas para segundos.

---

### SEÇÃO 10 — Depoimentos (`TestimonialsSection`)
**Classificação: Útil — fix urgente no depoimento 4**

**Problema crítico já detalhado no item 4 (CRÍTICO-1).**

**Depoimentos 1, 2 e 3:** Conteúdo adequado, mas nomes genéricos ("TechStart", "InnovateBR") sem site verificável reduzem credibilidade.

**Sugestão:** Se os depoimentos são reais, adicionar LinkedIn ou site da empresa. Se não são verificáveis, reformular como "Casos Anônimos" com resultados mensuráveis em vez de citações.

---

### SEÇÃO 11 — FAQ (`FAQSection`)
**Classificação: Útil — reduzir de 8 para 5 perguntas**

**Perguntas redundantes com outras seções:**
- FAQ #4 ("Como funciona o processo?") = cópia do `ProcessSection` com 5 etapas
- FAQ #3 ("Vocês oferecem garantia?") = cópia do `TrustSection`
- FAQ #7 ("O que acontece após a entrega?") = conteúdo que pertence a página de onboarding/portal

**Perguntas que devem ficar:** Prazo, Investimento, Alterações durante desenvolvimento, Tecnologias utilizadas, Porte das empresas atendidas.

---

### SEÇÃO 12 — Urgência (`UrgencySection`)
**Classificação: Deve ser removida**

**Problema crítico já detalhado no item 4 (CRÍTICO-2).**

Além do mês hardcoded e countdown reiniciável, a UX de "false scarcity" é inconsistente com o posicionamento B2B de software corporativo. Empresas que pagam R$ 15.000–50.000 por um sistema não tomam decisão baseada em countdown de 47 horas.

**Ação:** Substituir por uma seção de CTA final simples e direta.

---

### SEÇÃO 13 — Contato (`ContactSection`)
**Classificação: Essencial — mantida como está**

O formulário está bem construído com campos relevantes (nome, email, telefone, empresa, tipo de projeto, orçamento, descrição). Estado de loading funcional. Mensagens de sucesso/erro presentes.

---

## 6. ANÁLISE DE COPYWRITING

### Padrão repetitivo de titles
Todas as 13 seções usam o mesmo padrão:
```
[Badge pequeno acima]
[H2 que repete o badge]
[Parágrafo introdutório genérico]
```

Exemplo:
- Badge: "Desafios que Resolvemos"
- H2: "Processos que Atrasam o Crescimento da Sua Empresa"
- Parágrafo: "Muitas empresas perdem dinheiro todos os dias com processos ineficientes..."

O badge e o H2 comunicam a mesma coisa. Isso cria 26 linhas de heading ao longo da página quando poderiam ser 13.

### Buzzwords em excesso
Ocorrências contadas no código-fonte:
- "automação" / "automatizar" — 18+ vezes
- "inteligência artificial" / "IA" — 12+ vezes
- "processos" — 20+ vezes
- "operações inteligentes" — 3 vezes
- "sob medida" — 6 vezes
- "escalável" / "escale" — 4 vezes

Quando uma palavra aparece 20 vezes em uma página, ela perde significado.

### Títulos que podem ser melhorados

| Atual | Sugestão |
|-------|----------|
| "Automação, IA e Sistemas Corporativos para Empresas" | "Sua empresa ainda perde horas com processos manuais?" |
| "Processos que Atrasam o Crescimento da Sua Empresa" | "Reconhece algum desses problemas?" |
| "Como Resolvemos Problemas de Negócio com Tecnologia" | "O que fazemos" |
| "Resultados Comprovados, Não Apenas Promessas" | "Em números" |
| "Números que Falam por Si" | — (fundir com ValueProposition, eliminar seção) |
| "Por que Você Pode Confiar na PyScript.tech" | — (eliminar seção redundante) |
| "Do Briefing ao Lançamento: Transparência Total" | "Como funciona do início ao fim" |
| "Projetos que Geraram Resultados" | "O que já entregamos" |
| "Tudo que Você Precisa Saber Antes de Começar" | "Dúvidas comuns" |

---

## 7. ANÁLISE DE CONVERSÃO

### Mapeamento de CTAs na página

| Posição | CTA | Destino | Tipo |
|---------|-----|---------|------|
| Hero | "Solicitar Diagnóstico Gratuito" | `/diagnostico-gratuito` | Primário |
| Hero | "Ver Cases" | `/projects` | Secundário |
| SolutionsSection | "Explorar IA" | `/inteligencia-artificial-empresas` | Distração |
| SolutionsSection | "Automizar Processos" | `/automacao-empresarial` | Distração |
| SolutionsSection | "Criar Sistema" | `/software-corporativo` | Distração |
| SolutionsSection | "Integrar Sistemas" | `/integracao-de-sistemas` | Distração |
| ProcessSection | "Solicitar Orçamento Gratuito" | `/contact` | Duplicado |
| ProcessSection | "Agendar Reunião" | `calendly.com` | Externo |
| ExecutionSection | "Entender como funciona a execução" | `/como-funciona-a-execucao` | Secundário |
| ExecutionSection | "Acessar Portal de Projetos" | `proflow.pro` | Externo |
| FeaturedProjects | "Ver Case Completo" × 3 | `/cases/...` | Informacional |
| FeaturedProjects | "Ver Todos os Cases" | `/projects` | Redundante |
| FAQSection | "Falar com um Especialista" | `/contact` | Secundário |
| UrgencySection | "Garantir Minha Vaga Agora" | `/diagnostico-gratuito` | Redundante |
| ContactSection | Submit form | API | Primário |

**Total: ~15 CTAs em 13 seções.**

### O problema da competição de CTAs
O CTA principal ("Solicitar Diagnóstico Gratuito") aparece no hero e na UrgencySection. No meio, 13 outros CTAs competem pela atenção. A teoria de conversão indica que mais de 2-3 CTAs por página reduzem a taxa de conversão do CTA principal.

### CTA principal recomendado
> **"Solicitar diagnóstico gratuito"** — mantido, é claro e sem compromisso

### CTAs secundários recomendados (máximo 2)
1. "Ver cases" (no hero, como está)
2. "Falar pelo WhatsApp" (sempre visível, como botão flutuante ou no footer)

---

## 8. ANÁLISE DE PÚBLICO-ALVO

**Quem a página tenta falar:**
A página mistura linguagem para 4 perfis diferentes simultaneamente:

| Seção | Linguagem usada | Perfil implícito |
|-------|----------------|-----------------|
| Hero | "Reduza custos, elimine retrabalho" | Gestor / Dono de empresa |
| SolutionsSection | "RAG, busca semântica, RPA" | CTO / Desenvolvedor |
| FeaturedProjects | "OpenSearch, Langflow, Docling" | Desenvolvedor sênior |
| FAQ | "R$ 5.000 a R$ 50.000+" | PME / Startup |
| TrustSection | "ISO 9001, AWS Certified" | Procurement corporativo |
| UrgencySection | "Apenas 3 vagas..." | Consumidor de infoproduto |

**Resultado:** Uma empresa de 200 funcionários buscando automação operacional e uma startup técnica buscando um dev recebem a mesma página com mensagens conflitantes.

**Público-alvo recomendado para a home:**
> Gestor, Diretor ou Dono de empresa de médio porte (20–500 funcionários) com dor operacional clara, sem tempo para pesquisa técnica, com orçamento entre R$ 10k–50k para resolver o problema.

A linguagem técnica deve ir para as páginas de serviço individuais (`/inteligencia-artificial-empresas`, `/automacao-empresarial`, etc.), não na home.

---

## 9. ANÁLISE DA INTEGRAÇÃO PROFLOW

**Posição atual:** Seção 8 de 13 (tarde demais)
**Texto atual (ExecutionSection):** ProFlow é mencionado em uma nota ao final de uma seção de 3 passos genéricos

**Problema:** Um visitante que não conhece ProFlow lê "plataforma própria" e não entende o diferencial. Um visitante que conhece ProFlow não sabe qual é a relação entre PyScript e ProFlow (parceiro? cliente? criador?).

**A confusão de identidade:**
- ProFlow aparece como case de sucesso em `FeaturedProjects` ("SaaS Platform — tecnologias: Django, Vue.js...")
- ProFlow aparece como ferramenta de execução de projetos em `ExecutionSection`
- ProFlow aparece como parceiro de integração no fluxo interno

Essas três posições são conflitantes. O visitante não sabe se ProFlow é um produto que PyScript criou para um cliente, um produto próprio ou um produto de terceiros.

**Sugestão de texto para uma seção dedicada mais simples:**

---
**"Como você acompanha seu projeto"**

Depois de fecharmos o contrato, seu projeto ganha uma sala dedicada no ProFlow — nossa plataforma de gestão de projetos.

Você acessa de qualquer lugar e vê:
- ✅ Cada etapa do desenvolvimento em tempo real
- ✅ Arquivos, aprovações e milestones organizados
- ✅ Canal direto com a equipe, sem email perdido
- ✅ Histórico completo de todas as entregas

Sem surpresas. Sem "cadê o arquivo?". Sem reunião desnecessária.

[Acessar Portal de Projetos →]

---

**Posicionamento recomendado:** Após os Cases (seção 9). Quando o visitante já viu o que foi entregue, mostrar como acompanhar seu próprio projeto é o próximo passo lógico.

---

## 10. PLANO DE AÇÃO

### ⚡ Correções rápidas (até 1 hora)

| Prioridade | Ação | Arquivo |
|-----------|------|---------|
| 🔴 Urgente | Remover depoimento 4 (auto-depoimento com foto do fundador) | `TestimonialsSection.js` |
| 🔴 Urgente | Remover `UrgencySection` ou desativar no roteamento | `HomePage.js` |
| 🔴 Urgente | Corrigir mês hardcoded "Janeiro" se mantiver a seção | `UrgencySection.js` |
| 🟡 Alta | Corrigir erro de digitação "Automizar" → "Automatizar" | `SolutionsSection.js` |
| 🟡 Alta | Remover os 4 CTAs individuais dos cards de soluções | `SolutionsSection.js` |
| 🟡 Alta | Remover CTA interno do `ProcessSection` | `ProcessSection.js` |

### 🔧 Correções importantes (refatoração moderada)

| Prioridade | Ação | Arquivo |
|-----------|------|---------|
| 🔴 Alta | Remover `ValueProposition` (redundante com StatsSection e TrustSection) | `HomePage.js` |
| 🔴 Alta | Remover `TrustSection` (redundante com ValueProposition e FAQ) | `HomePage.js` |
| 🟡 Alta | Reduzir `ProblemsSection` de 6 para 3 cards | `ProblemsSection.js` |
| 🟡 Alta | Trocar stat fraco "12+ Tecnologias" por métrica de negócio | `StatsSection.js` |
| 🟡 Alta | Reescrever descrições dos cases (menos técnico, mais resultado) | `FeaturedProjects.js` |
| 🟡 Média | Reduzir FAQ de 8 para 5 perguntas (remover duplicatas com ProcessSection) | `FAQSection.js` |
| 🟡 Média | Reescrever H1 do hero (não repetir o badge) | `IntroSection.js` |

### 🏗️ Correções estratégicas (mudanças de estrutura)

| Prioridade | Ação |
|-----------|------|
| 🔴 Alta | Definir público-alvo único para a home e reescrever textos com linguagem consistente |
| 🔴 Alta | Consolidar seções de prova social em uma só (Stats + Depoimentos reais) |
| 🟡 Alta | Mover ProFlow para posição pós-Cases com seção dedicada e clara |
| 🟡 Alta | Criar CTA final limpo substituindo UrgencySection |
| 🟡 Média | Mover conteúdo técnico (stack, certificações AWS/ISO) para páginas de serviço |
| 🟡 Média | Esclarecer a relação PyScript ↔ ProFlow (criador? parceiro? plataforma própria?) |

---

## 11. NOVA ESTRUTURA RECOMENDADA

```
ESTRUTURA ATUAL (13 seções, ~15 CTAs)
──────────────────────────────────────
1. Hero
2. ProblemsSection     (6 cards)
3. SolutionsSection    (4 cards + 4 CTAs)
4. ValueProposition    (6 cards) ← REDUNDANTE
5. StatsSection        (4 números) ← REPETE
6. TrustSection        (6 badges + 3 garantias + 3 números) ← REDUNDANTE
7. ProcessSection      (5 passos + CTA interno)
8. ExecutionSection    (ProFlow)
9. FeaturedProjects    (3 cases)
10. TestimonialsSection (4 depoimentos, 1 auto-depoimento)
11. FAQSection         (8 perguntas)
12. UrgencySection     (countdown falso) ← REMOVER
13. ContactSection     (formulário)

ESTRUTURA RECOMENDADA (8 seções, 3 CTAs principais)
────────────────────────────────────────────────────
1. Hero                → Título orientado a dor + 2 CTAs (diagnóstico + cases)
2. ProblemsSection     → 3 cards (problemas consolidados)
3. SolutionsSection    → 4 cards sem CTAs individuais
4. ProcessSection      → 5 passos sem CTA interno
5. FeaturedProjects    → 3 cases com descrições de negócio
6. ProFlow/Execução    → Seção dedicada, linguagem simples
7. Prova Social        → StatsSection (4 números) + 3 depoimentos verificáveis
8. CTA Final + FAQ     → FAQ (5 perguntas) + CTA limpo + ContactSection
```

---

## 12. VERSÃO ENXUTA RECOMENDADA

| Seção | Título sugerido | Objetivo | Texto | CTA | Status |
|-------|----------------|----------|-------|-----|--------|
| 1. Hero | "Sua empresa ainda perde horas com processos manuais?" | Identificação do problema, primeira dobra | 1 subtítulo (15 palavras) | "Solicitar diagnóstico gratuito" (primário) + "Ver cases" (secundário) | Reescrever título |
| 2. Problemas | "Você reconhece alguma dessas situações?" | Empatia e qualificação | 3 cards com 1 linha cada | — | Reduzir de 6 para 3 cards |
| 3. Soluções | "O que fazemos" | Escopo de serviços | 4 cards, sem CTA individual | — | Remover CTAs dos cards |
| 4. Processo | "Como funciona do início ao fim" | Reduzir fricção / construir confiança | 5 passos, sem CTA interno | — | Remover CTA interno |
| 5. Cases | "O que já entregamos" | Prova de capacidade | 3 cases, descrição orientada a resultado | "Ver todos os cases" | Reescrever textos dos cases |
| 6. ProFlow | "Como você acompanha seu projeto" | Diferencial de execução e transparência | 1 parágrafo + 4 bullets | "Acessar portal de projetos" | Reformular |
| 7. Prova Social | "Em números" | Confiança | 4 stats + 3 depoimentos reais | — | Fundir StatsSection + TestimonialsSection corrigida |
| 8. CTA Final | "Pronto para começar?" | Conversão final | FAQ (5 perguntas) + formulário | "Solicitar diagnóstico gratuito" | Substituir UrgencySection |

**O que deve ser removido da home:**
- `ValueProposition` (fundir com StatsSection)
- `TrustSection` (mover garantia para footer/FAQ)
- `UrgencySection` (remover)
- CTAs individuais dos cards de soluções (4 botões)
- CTA interno do ProcessSection

**O que deve ser movido para páginas internas:**
- Stack técnico detalhado (`/sobre` ou páginas de serviço)
- ISO 9001 / AWS Cert detalhes (`/sobre`)
- FAQ completo pode ter página própria `/faq`
- Conteúdo técnico dos cases (páginas individuais `/cases/...`)

**O que deve ser mantido:**
- Hero com 2 CTAs
- 5 passos do processo (diferenciador real)
- Formulário de contato
- 3 cases (com textos reescritos)

---

## 13. CHECKLIST FINAL PARA IMPLEMENTAÇÃO

### Fase 1 — Correções críticas (fazer HOJE)
- [ ] Remover depoimento 4 (auto-depoimento com foto do fundador) em `TestimonialsSection.js`
- [ ] Desativar `UrgencySection` em `HomePage.js` (comentar o import + uso)
- [ ] Corrigir "Automizar" → "Automatizar" em `SolutionsSection.js`

### Fase 2 — Limpeza de redundâncias (esta semana)
- [ ] Remover `ValueProposition` do `HomePage.js`
- [ ] Remover `TrustSection` do `HomePage.js`
- [ ] Remover os 4 botões CTA individuais dos cards em `SolutionsSection.js`
- [ ] Remover o bloco CTA interno de `ProcessSection.js`
- [ ] Reduzir `ProblemsSection` de 6 para 3 cards
- [ ] Reduzir `FAQSection` de 8 para 5 perguntas (remover FAQ #4 que duplica ProcessSection)

### Fase 3 — Copywriting (esta semana)
- [ ] Reescrever H1 do hero para orientado a dor (não repetir o badge)
- [ ] Reescrever subtítulo do hero (máx 20 palavras)
- [ ] Reescrever descrições dos 3 cases para linguagem de negócio
- [ ] Reformular seção ProFlow com texto sugerido neste relatório
- [ ] Trocar stat "12+ Tecnologias" por métrica de negócio em `StatsSection.js`

### Fase 4 — Estrutura (próximas 2 semanas)
- [ ] Criar seção CTA final limpa (substituindo UrgencySection)
- [ ] Mover conteúdo técnico para páginas de serviço individuais
- [ ] Definir posicionamento público-alvo único e revisar linguagem da home
- [ ] Verificar / obter depoimentos verificáveis (com LinkedIn ou site)
- [ ] Esclarecer relação PyScript ↔ ProFlow em texto público

---

*Relatório gerado com base na inspeção direta do código-fonte dos 13 componentes da HomePage. Nenhuma alteração de código foi realizada neste documento.*
