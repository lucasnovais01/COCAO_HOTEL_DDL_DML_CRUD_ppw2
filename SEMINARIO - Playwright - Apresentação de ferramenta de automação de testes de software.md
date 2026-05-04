  
**Instituto Federal de São Paulo – Campus Birigui**  
Curso Superior de Tecnologia em Sistemas para Internet  
Componente Curricular: Engenharia de Software: Qualidade e Controle (BRIESQC), 5º semestre  
DOCENTE: Fabricio Quintanilha Baptista

Alexia Eduarda Celice Ferreira \- Matrícula: BI3032272  
Lucas Novais de Oliveira \- Matrícula: BI303268X

**Atividade: Apresentação de ferramenta de automação de testes de software** 

**PLAYWRIGHT**  
Ferramenta de testes automatizados

Birigui \- SP  
2026

**SUMÁRIO**

[**1\. APRESENTAÇÃO DA FERRAMENTA	4**](#apresentação-da-ferramenta)

[1.1. Nome, Versões, Origem, Criadores e Informações Técnicas	4](#nome,-versões,-origem,-criadores-e-informações-técnicas)

[1.1.1. Histórico de versões relevantes	4](#histórico-de-versões-relevantes)

[1.2. Tipo de Licença	5](#tipo-de-licença)

[1.3. Ambientes de Utilizações	5](#ambientes-de-utilizações)

[1.4. Linguagens e Plataformas Suportadas	6](#linguagens-e-plataformas-suportadas)

[1.5. Objetivos da Ferramenta: Nível de Teste, Técnicas e Objetivos de Teste	7](#objetivos-da-ferramenta:-nível-de-teste,-técnicas-e-objetivos-de-teste)

[1.5.1. Nível de Teste	7](#nível-de-teste)

[1.5.2. Técnicas de Teste	7](#técnicas-de-teste)

[1.5.3. Objetivos de Teste	8](#objetivos-de-teste)

[**2\. COMPARATIVO COM OUTRAS FERRAMENTAS	8**](#comparativo-com-outras-ferramentas)

[2.1. Visão Geral das Ferramentas Comparadas	8](#visão-geral-das-ferramentas-comparadas)

[2.1.1. Selenium	9](#selenium)

[2.1.2. Cypress	9](#cypress)

[2.2. Análise de Prós e Contras	9](#análise-de-prós-e-contras)

[2.2.1. Os Prós do Playwright	9](#os-prós-do-playwright)

[2.2.2. Os Contras do Playwright	10](#os-contras-do-playwright)

[2.2.3. Selenium, Prós e Contras resumidos	10](#selenium,-prós-e-contras-resumidos)

[2.2.4. Cypress, Prós e Contras resumidos	10](#cypress,-prós-e-contras-resumidos)

[**3\. INSTALAÇÃO E CONFIGURAÇÃO	11**](#instalação-e-configuração)

[3.1. Pré-requisitos	11](#pré-requisitos)

[3.1.1. Node.js	11](#node.js)

[3.1.2. Sistema Operacional	11](#sistema-operacional)

[3.1.3. Espaço em disco	12](#espaço-em-disco)

[3.1.4. Editor de código (opcional, mas recomendado)	12](#editor-de-código-\(opcional,-mas-recomendado\))

[**4\. PASSO A PASSO DA INSTALAÇÃO	12**](#passo-a-passo-da-instalação)

[4.1. Criar o projeto e instalar o Playwright	12](#criar-o-projeto-e-instalar-o-playwright)

[4.2. Estrutura de arquivos gerada	13](#estrutura-de-arquivos-gerada)

[4.3. Arquivo de configuração (playwright.config.ts)	13](#arquivo-de-configuração-\(playwright.config.ts\))

[4.4. Verificar a instalação	14](#verificar-a-instalação)

[4.5. Instalar a extensão do VS Code (opcional)	14](#instalar-a-extensão-do-vs-code-\(opcional\))

[**5\. DEMONSTRAÇÃO PRÁTICA	14**](#demonstração-prática)

[5.1. O Teste: Busca no Site do Playwright	14](#o-teste:-busca-no-site-do-playwright)

[5.1.1. O que o teste verifica	14](#o-que-o-teste-verifica)

[5.1.2. Criando o arquivo de teste	15](#criando-o-arquivo-de-teste)

[5.1.3. Entendendo o código	16](#entendendo-o-código)

[5.2. Executando o Teste	16](#executando-o-teste)

[5.2.1. Executar todos os testes	16](#executar-todos-os-testes)

[5.2.2. Executar apenas o arquivo criado	17](#executar-apenas-o-arquivo-criado)

[5.2.3. Executar em modo visual (com o navegador visível)	17](#executar-em-modo-visual-\(com-o-navegador-visível\))

[5.2.4. Executar apenas no Chromium	17](#executar-apenas-no-chromium)

[5.2.5. Saída esperada no terminal	17](#saída-esperada-no-terminal)

[5.3. Logs, Relatórios e Dashboards	17](#logs,-relatórios-e-dashboards)

[5.3.1. HTML Reporter	17](#html-reporter)

[5.3.2. Trace Viewer	18](#trace-viewer)

[5.3.3. Codegen para Gravação de testes	19](#codegen-para-gravação-de-testes)

[5.4. Destaques da Ferramenta	19](#destaques-da-ferramenta)

[**6\. CONCLUSÕES	20**](#conclusões)

[6.1. Vale a pena usar?	20](#vale-a-pena-usar?)

[6.2. Dificuldades que Podem Surgir	20](#dificuldades-que-podem-surgir)

[6.3. Comunidade de Suporte	21](#comunidade-de-suporte)

[**7\. REFERÊNCIAS	23**](#referências)

1. # **APRESENTAÇÃO DA FERRAMENTA** {#apresentação-da-ferramenta}

   1. ## Nome, Versões, Origem, Criadores e Informações Técnicas {#nome,-versões,-origem,-criadores-e-informações-técnicas}

O Playwright é um framework de automação de testes de software para aplicações web, desenvolvido e mantido pela Microsoft. O projeto teve sua origem como um fork interno do Puppeteer que é a ferramenta criada por engenheiros do Google para automação do Chrome. E foi lançado publicamente pela Microsoft em janeiro de 2020 com uma proposta mais abrangente, que é suportar múltiplos navegadores por meio de uma única API unificada.  
Os criadores originais do Playwright são Andrey Lushnikov, Joel Einbinder e Pavel Feldman, eles haviam trabalhado anteriormente no Google no desenvolvimento do Puppeteer. Ao migrarem para a Microsoft, trouxeram consigo esse conhecimento e o aprimoraram com suporte a Firefox e WebKit, além de JavaScript e TypeScript, o que representou um salto qualitativo em relação ao Puppeteer.

1. ## Histórico de versões relevantes {#histórico-de-versões-relevantes}

* v1.0 (Janeiro de 2020): lançamento público com suporte a Chromium, Firefox e WebKit.  
* v1.10 (Abril de 2021): introdução do Playwright Test, runner de testes nativo integrado à ferramenta.  
* v1.20 (Março de 2022): lançamento do UI Mode (modo visual interativo para depuração de testes).  
* v1.30 (Janeiro de 2023): melhorias no Trace Viewer e suporte aprimorado a componentes React/Vue.  
* v1.47 (Setembro de 2024): imagens Docker baseadas em Ubuntu 24.04, certificados TLS client-side.  
* v1.57 (Dezembro de 2025): Playwright passa a usar Chrome for Testing em vez do Chromium; introdução do Speedboard no HTML Reporter para identificar testes lentos.  
* v1.58 (Janeiro de 2026): melhorias no suporte a múltiplas origens (cross-origin iframes), nova API para manipulação de relógios (clock API) e atualização dos engines de Chromium, Firefox e WebKit.  
* v1.59 (Abril de 2026): versão mais atual disponível. Introduz a Screencast API (page.screencast), que permite gravação de vídeo com controle preciso de início/parada, anotações visuais de ações, overlays personalizados e captura de frames em tempo real especialmente útil em fluxos de automação por agentes de IA. Também introduz o browser.bind(), que permite que múltiplos clientes (MCP, CLI, Playwright) conectem-se ao mesmo navegador simultaneamente.

O repositório oficial está hospedado no GitHub (github.com/microsoft/playwright) e conta com mais de 80.000 estrelas. O projeto é ativamente mantido com releases mensais consistentes desde 2020\.

2. ## Tipo de Licença {#tipo-de-licença}

O Playwright é distribuído sob a licença Apache 2.0, que é uma licença de código aberto (open source) aprovada pela OSI (Open Source Initiative). Isso significa que:

* O uso é completamente gratuito, inclusive para fins comerciais;  
* O código-fonte está disponível publicamente e pode ser auditado por qualquer pessoa;  
* Modificações e distribuições de versões derivadas são permitidas, desde que mantida a atribuição de crédito à Microsoft;  
* Não há versão paga ou premium com recursos exclusivos. Todos os recursos são disponibilizados igualmente a todos os usuários.

	Resumindo, o Playwright é 100% gratuito, open source, com uso comercial permitido, e sem limitações de funcionalidades.

3. ## Ambientes de Utilizações {#ambientes-de-utilizações}

O Playwright é uma ferramenta multiplataforma e pode ser executado nos seguintes sistemas operacionais:

* Windows (versões 10 e 11, x64 e ARM64)  
* macOS (versões 12 Monterey ou superior, x64 e Apple Silicon)  
* Linux (distribuições baseadas em Ubuntu 20.04+, Debian, Fedora, entre outras)

Além dos sistemas operacionais tradicionais, o Playwright também suporta ambientes conteinerizados via Docker, com imagens oficiais disponíveis no Docker Hub e no Microsoft Container Registry (mcr.microsoft.com/playwright). Isso o torna especialmente adequado para pipelines de integração contínua (CI/CD), sendo compatível com:

* GitHub Actions  
* GitLab CI/CD  
* Jenkins  
* Azure DevOps Pipelines  
* CircleCI  
* Bitbucket Pipelines

O Playwright também oferece integração nativa com o Visual Studio Code por meio de uma extensão oficial, que permite criar, executar e depurar testes diretamente no editor, inclusive com a funcionalidade de gravação de testes por interação visual (Codegen).

4. ## Linguagens e Plataformas Suportadas {#linguagens-e-plataformas-suportadas}

Uma das grandes diferenciais competitivos do Playwright frente a outros frameworks é o suporte oficial a múltiplas linguagens de programação:

| Linguagem | Gerenciador de Pacotes | Comando de Instalação |
| ----- | ----- | ----- |
| JavaScript / TypeScript | npm / yarn | npm init playwright@latest |
| Python | pip | pip install playwright |
| Java | Maven / Gradle | Dependência no pom.xml |
| .NET (C\#) | NuGet | dotnet add package Microsoft.Playwright |

Em relação a navegadores (browsers), o Playwright suporta nativamente os três principais motores de renderização:

* Chromium / Chrome for Testing (a partir da v1.57)  
* Mozilla Firefox  
* WebKit (motor do Safari, incluindo suporte a iOS Safari via emulação)

Além disso, o Playwright oferece suporte à emulação de dispositivos móveis, como smartphones e tablets, com perfis de dispositivos pré-configurados (como iPhone 14, Pixel 7, Samsung Galaxy S23) que simulam resolução de tela, User-Agent, toque e geolocalização com alta fidelidade.

5. ## Objetivos da Ferramenta: Nível de Teste, Técnicas e Objetivos de Teste {#objetivos-da-ferramenta:-nível-de-teste,-técnicas-e-objetivos-de-teste}

   1. ## Nível de Teste {#nível-de-teste}

O Playwright atua primariamente no nível de testes de sistema e testes de aceitação (End-to-End, E2E), interagindo com a aplicação da mesma forma que um usuário real faria, por meio do navegador. No entanto, sua arquitetura também permite a realização de:

* Testes de Integração: ao testar a comunicação entre o front-end e APIs back-end via interceptação de requisições HTTP.  
* Testes de API: o Playwright possui uma API nativa (request context) para realizar chamadas HTTP diretamente, sem depender do navegador, cobr assim camadas de serviços REST e GraphQL.  
* Testes de Componentes: via @playwright/experimental-ct-react e similares, é possível testar componentes React, Vue e Svelte de forma isolada.

  2. ## Técnicas de Teste {#técnicas-de-teste}

O Playwright suporta e facilita diversas técnicas de teste amplamente abordadas na área de Engenharia de Software:

* Teste Caixa-Preta (Black-Box Testing): a abordagem primária do Playwright. Os testes interagem com a interface do usuário sem conhecimento da implementação interna, verificando comportamentos a partir das entradas e saídas observáveis.  
* Teste Funcional: verificação de funcionalidades específicas da aplicação (login, cadastro, checkout, formulários, etc.) por meio de ações automatizadas no navegador.  
* Teste de Regressão: o Playwright é amplamente utilizado em pipelines de CI/CD para garantir que alterações no código não quebrem funcionalidades já existentes.  
* Teste Baseado em Dados (Data-Driven Testing): suportado nativamente via parametrização de testes com múltiplos conjuntos de dados.  
* Snapshot Testing / Visual Testing: o Playwright oferece suporte a comparação de screenshots (toMatchSnapshot) e aria snapshots para verificação de estrutura visual e acessibilidade.  
* Teste de API (White-Box parcial): ao interceptar e mockar requisições HTTP, é possível simular respostas de servidor para testar comportamentos em cenários específicos.

  3. ## Objetivos de Teste {#objetivos-de-teste}

Alinhado ao que é ensinado em disciplinas de Engenharia de Software e Qualidade de Software, o Playwright contribui para os seguintes objetivos de teste:

* Verificação de Corretude: garantir que o sistema funciona conforme especificado. O Playwright verifica isso por meio de asserções (expect) sobre estados da UI, textos, URLs e respostas HTTP.  
* Detecção de Defeitos (Bug Finding): identificar comportamentos inesperados antes da entrega ao usuário final, especialmente em fluxos críticos de negócio.  
* Validação de Requisitos: simular o comportamento do usuário final para confirmar que os requisitos funcionais foram implementados corretamente.  
* Avaliação de Confiabilidade: ao ser executado repetidamente em CI/CD, o Playwright fornece evidências sobre a estabilidade e previsibilidade da aplicação ao longo do tempo.  
* Suporte à Refatoração Segura: testes automatizados bem escritos permitem que a equipe refatore o código com segurança, sabendo que os testes sinalizam imediatamente qualquer quebra de comportamento.

2. # **COMPARATIVO COM OUTRAS FERRAMENTAS** {#comparativo-com-outras-ferramentas}

Para contextualizar o Playwright dentro do ecossistema de ferramentas de automação de testes web, apresentamos a seguir uma comparação detalhada com dois dos frameworks mais utilizados no mercado: o Selenium e o Cypress.

1. ## Visão Geral das Ferramentas Comparadas {#visão-geral-das-ferramentas-comparadas}

   1. ## Selenium {#selenium}

O Selenium é o framework mais antigo e consolidado na automação de testes web, criado em 2004 por Jason Huggins. Utiliza o protocolo WebDriver (padronizado como W3C Recommendation) para controlar navegadores remotamente. Possui suporte amplo a linguagens e uma enorme base de usuários, sendo predominante em grandes empresas e sistemas legados.

2. ## Cypress {#cypress}

O Cypress é um framework moderno criado em 2014 pela Cypress.io (atualmente parte da Currents). Diferente do Selenium, o Cypress executa os testes diretamente dentro do processo do navegador, o que permite feedback em tempo real e debugging visual intuitivo. É muito popular entre desenvolvedores front-end, especialmente em projetos React e Vue.

2. ## Análise de Prós e Contras {#análise-de-prós-e-contras}

   1. ## Os Prós do Playwright {#os-prós-do-playwright}

* Suporte nativo a múltiplas linguagens (JS, Python, Java, C\#), permitindo que equipes de diferentes stacks adotem a ferramenta sem barreiras.  
* Suporte real a três motores de browser (Chromium, Firefox, WebKit), o que garante cobertura de teste genuinamente cross-browser, incluindo comportamento do Safari sem precisar de macOS.  
* Auto-wait inteligente e nativo, o Playwright aguarda automaticamente que os elementos estejam visíveis, habilitados e estáveis antes de interagir com eles, eliminando grande parte dos testes instáveis (flaky tests).  
* Trace Viewer, a ferramenta de depuração visual que permite reproduzir passo a passo a execução de um teste, com screenshots, logs de rede e linha do código executada, é extremamente útil para diagnosticar falhas em CI/CD.  
* Isolamento de contexto, o que cada teste pode rodar em um BrowserContext isolado, equivalente a um perfil de navegador limpo, sem compartilhar cookies, armazenamento ou sessões com outros testes.  
* API de interceptação de rede, a qual permite mockar, modificar ou bloquear requisições HTTP durante os testes, facilitando testes em cenários controlados sem depender de back-ends reais.  
* Ativamente mantido pela Microsoft com lançamentos mensais e suporte de longo prazo garantido.

  2. ## Os Contras do Playwright {#os-contras-do-playwright}

* Curva de aprendizado inicial pode ser um pouco maior do que o Cypress para iniciantes em JavaScript puro, especialmente ao configurar cenários de autenticação e paralelismo avançado.  
* A extensão para Visual Studio Code, embora poderosa, requer Node.js instalado e configurado corretamente no sistema.  
* Testes de componentes (component testing) ainda estão em fase experimental para alguns frameworks de front-end.  
* A ferramenta é mais orientada a Web e não cobre testes de aplicações móveis nativas (para isso, Appium seria mais adequado).

  3. ## Selenium, Prós e Contras resumidos {#selenium,-prós-e-contras-resumidos}

* PRÓ: maior compatibilidade com browsers antigos (IE, legacy Edge) e suporte a todas as linguagens de programação relevantes do mercado.  
* PRÓ: ecossistema maduro de com mais de 20 anos com vasta documentação, tutoriais e integrações disponíveis.  
* CONTRA: requer configuração manual de WebDrivers por browser e versão, processo propenso a erros e incompatibilidades.  
* CONTRA: não possui auto-wait nativo; testes precisam de waitForElement() explícitos, tornando-os mais verbosos e frágeis.  
* CONTRA: relatórios e debugging dependem de plugins de terceiros, sem uma experiência integrada como o Playwright oferece.

  4. ## Cypress, Prós e Contras resumidos {#cypress,-prós-e-contras-resumidos}

* PRÓ: experiência de desenvolvedor muito intuitiva, com debugging em tempo real no navegador e mensagens de erro claras.  
* PRÓ: configuração extremamente simples para projetos JavaScript/TypeScript front-end.  
* CONTRA: suporte limitado a apenas um browser por execução de teste; sem suporte real a WebKit/Safari.  
* CONTRA: não suporta múltiplas abas ou janelas do navegador em um único teste, limitação crítica em fluxos como autenticação OAuth.  
* CONTRA: recursos avançados como paralelismo e dashboard analítico exigem plano pago na Cypress Cloud.  
* CONTRA: restrito a JavaScript/TypeScript, excluindo equipes que trabalham com Python, Java ou C\#.

3. # **INSTALAÇÃO E CONFIGURAÇÃO** {#instalação-e-configuração}

   1. ## Pré-requisitos {#pré-requisitos}

Antes de iniciar a instalação do Playwright, é necessário garantir que o ambiente atende aos seguintes requisitos:

1. ## Node.js {#node.js}

O Playwright (na versão JavaScript e TypeScript, que é a mais utilizada) requer o Node.js instalado na máquina. A versão mínima recomendada é a LTS mais recente disponível, que no momento é a v22.x LTS. O Node.js inclui o npm (Node Package Manager), que será utilizado para instalar o Playwright.

* Download: nodejs.org  
* Verificar versão instalada: node \--version  
* Verificar npm: npm \--version

  2. ## Sistema Operacional {#sistema-operacional}

* Windows 10 ou 11 (64-bit)  
* macOS 12 Monterey ou superior  
* Ubuntu 20.04 LTS ou superior (ou equivalente Linux)

  3. ## Espaço em disco {#espaço-em-disco}

O Playwright instala automaticamente versões dos browsers (Chromium, Firefox e WebKit) otimizadas para testes. O espaço necessário total é de aproximadamente 500 MB a 1 GB, dependendo de quantos browsers forem instalados.

4. ## Editor de código (opcional, mas recomendado) {#editor-de-código-(opcional,-mas-recomendado)}

O Visual Studio Code com a extensão oficial 'Playwright Test for VSCode' oferece a melhor experiência de desenvolvimento. A extensão permite criar testes visualmente, executá-los com um clique e visualizar o Trace Viewer integrado.

4. # **PASSO A PASSO DA INSTALAÇÃO** {#passo-a-passo-da-instalação}

   1. ## Criar o projeto e instalar o Playwright {#criar-o-projeto-e-instalar-o-playwright}

Abra o terminal (Prompt de Comando, PowerShell ou Terminal no macOS/Linux) na pasta onde deseja criar o projeto e execute:

* mkdir meu-projeto-playwright  
* cd meu-projeto-playwright  
* npm init playwright@latest

O comando npm init playwright@latest é interativo e irá apresentar um assistente de configuração com as seguintes perguntas:

1. Escolher a linguagem: TypeScript ou JavaScript (recomenda-se TypeScript para projetos maiores).  
2. Nome da pasta de testes: o padrão é 'tests', pode ser aceito pressionando Enter.  
3. Adicionar exemplo de GitHub Actions: recomenda-se Yes para já configurar o CI/CD.  
4. Instalar browsers: recomenda-se Yes. O Playwright irá baixar automaticamente as versões corretas de Chromium, Firefox e WebKit.

   2. ## Estrutura de arquivos gerada {#estrutura-de-arquivos-gerada}

Após a instalação, o projeto terá a seguinte estrutura:

meu-projeto-playwright/  
  ↳ tests/  
      ↳ [example.spec.ts](http://example.spec.ts)	\<- Arquivo de exemplo com testes prontos  
  ↳ tests-examples/  
      ↳ [demo-todo-app.spec.ts](http://demo-todo-app.spec.ts)	\<- Exemplo avançado com todo-app  
  ↳ [playwright.config.ts](http://playwright.config.ts)		\<- Arquivo de configuração principal  
  ↳ package.json  
  ↳ package-lock.json  
  ↳ .github/  
      ↳ workflows/  
         ↳ playwright.yml	\<- Pipeline GitHub Actions (se escolhido)

3. ## Arquivo de configuração (playwright.config.ts) {#arquivo-de-configuração-(playwright.config.ts)}

O arquivo playwright.config.ts gerado automaticamente já inclui as configurações mais comuns. Os principais pontos de configuração são:

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,           // Executa todos os testes em paralelo

  retries: process.env.CI ? 2 : 0, // Retenta testes falhos no CI

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',              // Gera relatório HTML ao final

  use: {

    baseURL: 'http://localhost:3000', // URL base da aplicação

    trace: 'on-first-retry',     // Grava trace ao retentar testes

  },

  projects: \[

    { name: 'chromium', use: { ...devices\['Desktop Chrome'\] } },

    { name: 'firefox',  use: { ...devices\['Desktop Firefox'\] } },

    { name: 'webkit',   use: { ...devices\['Desktop Safari'\] } },

  \],

});

4. ## Verificar a instalação {#verificar-a-instalação}

## 

Para confirmar que tudo está instalado corretamente, execute os testes de exemplo incluídos:

## 

npx playwright test

Ao final, o Playwright exibirá um resumo da execução no terminal e abrirá automaticamente o HTML Reporter no navegador, mostrando o resultado de cada teste.

5. ## Instalar a extensão do VS Code (opcional) {#instalar-a-extensão-do-vs-code-(opcional)}

No Visual Studio Code, acesse o painel de extensões, pesquise por 'Playwright Test for VSCode' e instale a extensão oficial da Microsoft. Com ela instalada, um painel lateral 'Testing' aparecerá, listando todos os testes do projeto com botões para executar, depurar e gravar novos testes.

5. # **DEMONSTRAÇÃO PRÁTICA** {#demonstração-prática}

Esta seção apresenta um exemplo completo de teste criado do zero, executado e com seus resultados documentados. O teste escolhido simula o fluxo de busca no site oficial do Playwright (playwright.dev), um exemplo simples, funcional e reproduzível por qualquer pessoa com o ambiente configurado.

1. ## O Teste: Busca no Site do Playwright {#o-teste:-busca-no-site-do-playwright}

   1. ## O que o teste verifica {#o-que-o-teste-verifica}

* Que a página inicial do Playwright carrega corretamente;  
* Que o link de navegação 'Docs' está visível e funcional;  
* Que ao clicar em 'Get started', o usuário é redirecionado para a página de instalação;  
* Que o título da página de instalação é 'Installation'.

  2. ## Criando o arquivo de teste {#criando-o-arquivo-de-teste}

Crie o arquivo tests/playwright-site.spec.ts com o seguinte conteúdo:

import { test, expect } from '@playwright/test';

test.describe('Site oficial do Playwright', () \=\> {

  test('deve carregar a página inicial com o título correto', async ({ page }) \=\> {

    // 1\. Navega para a página inicial

    await page.goto('https://playwright.dev/');

    // 2\. Verifica que o título da página contém 'Playwright'

    await expect(page).toHaveTitle(/Playwright/);

  });

  test('deve conter o link Get Started na página inicial', async ({ page }) \=\> {

    await page.goto('https://playwright.dev/');

    // 3\. Localiza o link 'Get started' pelo texto

    const getStartedLink \= page.getByRole('link', { name: 'Get started' });

    // 4\. Verifica que o link está visível

    await expect(getStartedLink).toBeVisible();

  });

  test('deve navegar para a página de instalação ao clicar em Get Started', async ({ page }) \=\> {

    await page.goto('https://playwright.dev/');

    // 5\. Clica no link 'Get started'

    await page.getByRole('link', { name: 'Get started' }).click();

    // 6\. Verifica a URL da nova página

    await expect(page).toHaveURL(/.\*intro/);

    // 7\. Verifica o heading da página de instalação

    await expect(

      page.getByRole('heading', { name: 'Installation' })

    ).toBeVisible();

  });

});

3. ## Entendendo o código {#entendendo-o-código}

O código acima demonstra os conceitos fundamentais do Playwright de forma progressiva:

* test.describe(): agrupa testes relacionados em uma suíte nomeada, facilitando a organização e a leitura dos relatórios.  
* test('nome', async ({ page }) \=\> {...}): define um teste individual. O parâmetro page é injetado automaticamente pelo framework e representa uma aba do navegador.  
* await page.goto('url'): navega para a URL especificada. O Playwright aguarda automaticamente o carregamento completo da página.  
* page.getByRole(): localiza elementos pelo papel ARIA (link, button, heading, etc.), que é a forma mais robusta e acessível de localizar elementos, preferida pela documentação oficial.  
* expect(...).toBeVisible(): asserção que verifica se o elemento está visível na tela. O Playwright aguarda automaticamente o elemento aparecer antes de falhar.  
* expect(page).toHaveTitle(/Playwright/): asserção com expressão regular para verificar o título da página.  
* expect(page).toHaveURL(/.\*intro/): asserção que verifica a URL atual contra uma expressão regular.

  2. ## Executando o Teste {#executando-o-teste}

     1. ## Executar todos os testes {#executar-todos-os-testes}

npx playwright test

2. ## Executar apenas o arquivo criado {#executar-apenas-o-arquivo-criado}

npx playwright test playwright-site.spec.ts

3. ## Executar em modo visual (com o navegador visível) {#executar-em-modo-visual-(com-o-navegador-visível)}

npx playwright test \--headed

4. ## Executar apenas no Chromium {#executar-apenas-no-chromium}

npx playwright test \--project=chromium

5. ## Saída esperada no terminal {#saída-esperada-no-terminal}

Ao executar os testes, o terminal exibirá uma saída semelhante a esta:

Running 3 tests using 3 workers

  \[chromium\] \> playwright-site.spec.ts:4 \> Site oficial

               \> deve carregar a página inicial com o título correto

  \[chromium\] \> playwright-site.spec.ts:11 \> Site oficial

               \> deve conter o link Get Started na página inicial

  \[chromium\] \> playwright-site.spec.ts:19 \> Site oficial

               \> deve navegar para a página de instalação

  3 passed (8.3s)

To open last HTML report run:

  npx playwright show-report

3. ## Logs, Relatórios e Dashboards {#logs,-relatórios-e-dashboards}

   1. ## HTML Reporter {#html-reporter}

O HTML Reporter é o relatório padrão e mais completo do Playwright. Após a execução dos testes, ele é gerado automaticamente na pasta playwright-report/. Para visualizá-lo, execute:

npx playwright show-report

O relatório HTML abre no navegador e exibe:

* Lista completa de todos os testes executados com status (passed, failed, skipped).  
* Tempo de execução de cada teste individualmente.  
* Screenshots automáticos em casos de falha.  
* Vídeos da execução (quando configurado).  
* Acesso ao Trace Viewer de cada teste (quando trace está ativo).  
* Aba 'Speedboard' (introduzida na v1.57): mostra os testes ordenados do mais lento para o mais rápido, ajudando a identificar gargalos de desempenho na suíte.

  2. ## Trace Viewer {#trace-viewer}

O Trace Viewer é uma das funcionalidades mais poderosas e exclusivas do Playwright. Ele grava uma sessão completa de execução de um teste — com screenshots quadro a quadro, log de rede, console do navegador e cada linha de código executada — e permite reproduzir essa execução visualmente após o fato.

Para ativar o Trace Viewer, configure no playwright.config.ts:

use: {

  trace: 'on-first-retry',  // Grava trace quando o teste é retentado

  // Outras opções: 'on', 'off', 'retain-on-failure'

},

Para visualizar um trace gerado:

npx playwright show-trace trace.zip

3. ## Codegen para Gravação de testes {#codegen-para-gravação-de-testes}

O Playwright oferece uma ferramenta de gravação de testes por interação chamada Codegen. Ao ativá-la, um navegador abre e todas as interações do usuário são traduzidas automaticamente para código de teste:

npx playwright codegen https://playwright.dev/

Esta funcionalidade é extremamente útil para criar testes rapidamente sem precisar escrever código do zero, e também serve como ferramenta de aprendizado para compreender os locators gerados pelo Playwright.

4. ## Destaques da Ferramenta {#destaques-da-ferramenta}

Além do que foi demonstrado, o Playwright oferece recursos avançados que o distinguem das demais ferramentas do mercado:

* Paralelismo nativo: os testes são executados em paralelo por padrão em múltiplos workers, reduzindo significativamente o tempo total de execução da suíte.  
* Isolamento total de contexto: cada teste recebe um BrowserContext limpo e isolado, o que elimina interferências entre testes e garante reprodutibilidade.  
* Network interception: capacidade de interceptar, mockar, modificar ou bloquear requisições HTTP/HTTPS em tempo real durante os testes.  
* API Testing integrado: a classe APIRequestContext permite realizar chamadas REST diretamente via código de teste, sem necessidade de uma biblioteca HTTP adicional.  
* Aria Snapshots: recurso introduzido na v1.50 que permite verificar a estrutura de acessibilidade de componentes da UI como um 'snapshot' de texto, muito útil para garantir conformidade com padrões de acessibilidade.  
* Playwright Agents (v1.59): integração com modelos de linguagem (LLMs) que auxilia na geração, manutenção e reparo automático de testes com base em planos em linguagem natural — um passo em direção à automação de testes assistida por IA.

6. # **CONCLUSÕES** {#conclusões}

   1. ## Vale a pena usar? {#vale-a-pena-usar?}

Sim, o Playwright é definitivamente uma ferramenta que vale a pena adotar no contexto de automação de testes de software. A análise realizada ao longo deste trabalho evidencia que o Playwright representa o estado da arte entre os frameworks de automação web disponíveis de 2025 e 2026, reunindo características que antes exigiam o uso de múltiplas ferramentas combinadas.  
Em comparação com o Selenium, que ainda domina o mercado em número de usuários por razões históricas, o Playwright oferece uma experiência de desenvolvimento significativamente mais moderna, com auto-wait nativo, relatórios integrados e debugging visual sem necessidade de configurações adicionais. Em comparação com o Cypress, o Playwright supera as limitações mais críticas que são: suporta múltiplas linguagens, múltiplas abas e múltiplos browsers reais, incluindo WebKit e oferece paralelismo nativo sem custo adicional.  
A adoção do Playwright é especialmente recomendada nos seguintes cenários:

* Projetos greenfield (novos): o Playwright deve ser a primeira escolha para qualquer projeto que inicie sua estratégia de automação de testes E2E do zero.  
* Equipes com múltiplas linguagens: o suporte a JS/TS, Python, Java e C\# remove a barreira de adoção para times heterogêneos.  
* Projetos que exigem cross-browser testing real: especialmente quando o Safari/WebKit é um browser relevante para o público-alvo.  
* Times que adotam DevOps e CI/CD: a integração nativa com GitHub Actions e outros pipelines torna o Playwright uma escolha natural para automação em ambientes de entrega contínua.

  2. ## Dificuldades que Podem Surgir {#dificuldades-que-podem-surgir}

Apesar de todas as suas vantagens, o Playwright não é isento de desafios. Os principais pontos de atenção identificados são:

* Configuração inicial em ambientes corporativos restritos: empresas com proxies, firewalls ou políticas de segurança rígidas podem ter dificuldade para baixar os browsers que o Playwright instala automaticamente. Nesses casos, é necessário configurar variáveis de ambiente de proxy ou utilizar imagens Docker pré-configuradas.  
* Testes em aplicações com muitos iframes e popups de terceiros: embora o Playwright suporte iframes nativamente, cenários complexos com múltiplas origens (cross-origin iframes) podem exigir configurações adicionais.  
* Manutenção de locators ao longo do tempo: assim como em qualquer ferramenta de automação de UI, mudanças na estrutura do HTML da aplicação testada podem quebrar locators. A recomendação do Playwright é priorizar locators baseados em papel ARIA e atributos data-testid, que são mais resilientes a mudanças visuais.  
* Curva de aprendizado em Python: para desenvolvedores Python acostumados com pytest, a integração do Playwright com pytest (via pytest-playwright) é excelente, mas requer familiaridade com conceitos de async/await ou com os fixtures síncronos do plugin.  
* Ausência de suporte a aplicações desktop nativas: o Playwright é exclusivamente uma ferramenta de automação web. Para automação de aplicações desktop (Windows Forms, Electron, etc.), seriam necessárias ferramentas como WinAppDriver ou Appium Desktop.

  3. ## Comunidade de Suporte {#comunidade-de-suporte}

A comunidade do Playwright é uma das mais ativas e de crescimento mais acelerado no ecossistema de testes de software. Os principais canais de suporte disponíveis são:

* GitHub oficial (github.com/microsoft/playwright): repositório com mais de 70.000 estrelas, issues abertas e respondidas rapidamente pela equipe da Microsoft e pela comunidade. É o principal canal para reportar bugs e solicitar funcionalidades.  
* Documentação oficial (playwright.dev): uma das documentações mais completas e bem escritas entre as ferramentas de teste disponíveis. Inclui guias de instalação, referência completa da API, exemplos de código, guias de CI/CD e seção específica de melhores práticas.  
* Discord oficial: servidor de Discord com canais separados para dúvidas em cada linguagem (JavaScript, Python, Java, .NET), além de canais de anúncios e contribuição.  
* Stack Overflow: a tag \[playwright\] no Stack Overflow conta com milhares de perguntas e respostas. A comunidade é responsiva e as perguntas costumam ser respondidas em poucas horas.  
* YouTube e cursos online: há uma grande quantidade de tutoriais, cursos e walkthroughs disponíveis gratuitamente no YouTube, além de cursos pagos em plataformas como Udemy, Coursera e Test Automation University (gratuito).  
* Microsoft Learn: a própria Microsoft mantém conteúdo de aprendizado sobre o Playwright na plataforma Microsoft Learn, reforçando o compromisso da empresa com a ferramenta a longo prazo.

Conclusão geral, o Playwright é a ferramenta de automação de testes web mais completa, moderna e bem suportada disponível em 2026\. Combina facilidade de uso com recursos avançados, é gratuito e open source, mantido ativamente pela Microsoft e possui uma comunidade crescente. A recomendação final é clara: para novos projetos de automação de testes web, o Playwright deve ser a primeira e principal escolha.

7. # **REFERÊNCIAS** {#referências}

MICROSOFT. Playwright — Documentação oficial. Disponível em: https://playwright.dev/docs/intro. Acesso em: mai. 2026\.

MICROSOFT. Playwright — Release Notes. Disponível em: https://playwright.dev/docs/release-notes. Acesso em: mai. 2026\.

MICROSOFT. playwright — Repositório GitHub. Disponível em: https://github.com/microsoft/playwright. Acesso em: mai. 2026\.

PYPI. playwright 1.59.0. Disponível em: https://pypi.org/project/playwright/. Acesso em: mai. 2026\.

THINKSYS. Playwright vs Selenium vs Cypress: Which to Choose in 2026? Disponível em: https://thinksys.com/qa-testing/playwright-vs-selenium-vs-cypress/. Acesso em: mai. 2026\.

TESTDINO. Selenium vs Cypress vs Playwright (2026): Speed, DX & Real Benchmarks. Disponível em: https://testdino.com/blog/selenium-vs-cypress-vs-playwright/. Acesso em: mai. 2026\.

BROWSERSTACK. Playwright vs Cypress: A Comparison. Disponível em: https://www.browserstack.com/guide/playwright-vs-cypress. Acesso em: mai. 2026\.

TESTOMAT. Playwright vs Selenium vs Cypress: a Detailed Comparison. Disponível em: https://testomat.io/blog/playwright-vs-selenium-vs-cypress-a-detailed-comparison/. Acesso em: mai. 2026\.  
