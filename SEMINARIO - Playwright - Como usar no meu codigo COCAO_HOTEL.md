# Tutorial: Como Usar o Playwright no Projeto COCAO_HOTEL

Este tutorial irá guiá-lo passo a passo para configurar e usar o Playwright para testes end-to-end (E2E) no seu projeto COCAO_HOTEL, que inclui um backend NestJS e um frontend React. Assumimos que você já tem o Node.js instalado e que o projeto está funcionando (backend com `npm run start:dev` e frontend com `npm run dev`).

## Pré-requisitos

- Node.js instalado (versão 16 ou superior).
- Seu projeto COCAO_HOTEL clonado e funcionando.
- Navegadores suportados (Playwright instalará automaticamente Chromium, Firefox e WebKit).

## Passo 1: Instalar o Playwright no Projeto

O Playwright pode ser instalado em um projeto existente. Vamos adicioná-lo à raiz do seu workspace (pasta `COCAO_HOTEL_DDL_DML_CRUD_ppw2`).

1. Abra o terminal no VS Code (Terminal > New Terminal).
2. Navegue até a raiz do projeto:
   ```
   cd C:\Users\lucas\COCAO_HOTEL_DDL_DML_CRUD_ppw2
   ```
3. Execute o comando de inicialização do Playwright:
   ```
   npm init playwright@latest
   ```
4. O assistente perguntará:
   - **Linguagem**: Escolha "TypeScript" (já que seu projeto usa TypeScript).
   - **Pasta de testes**: Digite `tests` (ou pressione Enter para aceitar o padrão).
   - **Adicionar GitHub Actions**: Pode escolher "No" por enquanto.
   - **Instalar navegadores**: Escolha "Yes" para instalar os navegadores automaticamente.

Isso criará uma pasta `tests/` na raiz, com um arquivo `playwright.config.ts` e um exemplo de teste.

## Estrutura de Pastas Criada

Após a instalação, sua estrutura ficará assim (foco nas partes do Playwright):

```
COCAO_HOTEL_DDL_DML_CRUD_ppw2/
├── tests/
│   ├── example.spec.ts  # Exemplo de teste
│   └── playwright.config.ts  # Configuração do Playwright
├── nest_academic/  # Seu backend
├── react_academic/  # Seu frontend
└── package.json  # Criado pelo npm init playwright
```

- `tests/`: Pasta onde ficam os arquivos de teste (.spec.ts).
- `playwright.config.ts`: Arquivo de configuração principal.

## Passo 2: Configurar o Playwright para Seu Projeto

Edite o arquivo `tests/playwright.config.ts` para apontar para o seu frontend. Abra o arquivo no VS Code.

O arquivo padrão terá algo assim (versões podem variar):

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:3000',  // Mude para a URL do seu frontend
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

- **baseURL**: Mude para `http://localhost:5173` (porta padrão do Vite para React). Verifique no terminal quando roda `npm run dev` no `react_academic/`.
- Outras configurações: Deixe como estão para começar.

## Passo 3: Criar Seu Primeiro Teste

Vamos criar um teste simples que verifica se a página inicial do seu app carrega corretamente.

1. Abra o arquivo `tests/example.spec.ts` (ou crie um novo, ex: `tests/cocao-hotel.spec.ts`).
2. Substitua o conteúdo por:

```typescript
import { test, expect } from '@playwright/test';

test('Página inicial do COCAO_HOTEL carrega corretamente', async ({ page }) => {
  // Navega para a página inicial
  await page.goto('/');

  // Verifica se o título da página contém "COCAO HOTEL" (ajuste conforme seu app)
  await expect(page).toHaveTitle(/COCAO HOTEL/i);

  // Verifica se há um elemento específico, como um cabeçalho
  await expect(page.locator('h1')).toContainText('Bem-vindo ao COCAO HOTEL');
});
```

- **Explicação**:
  - `page.goto('/')`: Vai para a URL base (definida no config).
  - `expect(page).toHaveTitle(...)`: Verifica o título da aba do navegador.
  - `page.locator('h1')`: Encontra um elemento `<h1>` na página.
  - Ajuste os seletores e textos conforme a estrutura real do seu frontend React.

## Passo 4: Executar os Testes

Antes de executar, certifique-se de que o backend e frontend estão rodando:

1. Em um terminal, no `nest_academic/`:
   ```
   npm run start:dev
   ```
2. Em outro terminal, no `react_academic/`:
   ```
   npm run dev
   ```

Agora, execute os testes:

- **Executar todos os testes**:
  ```
  npx playwright test
  ```
- **Executar apenas um arquivo**:
  ```
  npx playwright test tests/cocao-hotel.spec.ts
  ```
- **Executar com navegador visível (headed)**:
  ```
  npx playwright test --headed
  ```
- **Executar apenas no Chromium**:
  ```
  npx playwright test --project=chromium
  ```

## Passo 5: Ver Relatórios e Depurar

- **Relatório HTML**: Após executar, rode `npx playwright show-report` para ver um relatório visual dos testes.
- **Trace Viewer**: Para depurar, execute `npx playwright test --trace on` e depois `npx playwright show-trace tests/test-results/...` (o caminho aparecerá no terminal).
- **UI Mode**: Para uma interface interativa, execute `npx playwright test --ui`.

## Dicas para Iniciantes

- **Locators**: Use `page.locator()` para encontrar elementos. Exemplos: `page.locator('#id')`, `page.locator('.class')`, `page.locator('text=Login')`.
- **Aguardar elementos**: Playwright aguarda automaticamente, mas use `await page.waitForSelector()` se necessário.
- **Testes reais**: Adicione testes para login, criação de reservas, etc., navegando pelas rotas do seu app.
- **Extensão VS Code**: Instale "Playwright Test for VS Code" para executar testes diretamente no editor.
- **Erros comuns**: Se o teste falhar, verifique se os servidores estão rodando e se os seletores estão corretos (use DevTools do navegador).

## Conclusão

Com esses passos, você tem uma base sólida para testar seu projeto COCAO_HOTEL com Playwright. Comece com testes simples e expanda conforme adiciona funcionalidades. Se tiver dúvidas, consulte a documentação oficial: https://playwright.dev/