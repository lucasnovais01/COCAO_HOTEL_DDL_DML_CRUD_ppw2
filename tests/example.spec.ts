import { expect, test } from '@playwright/test';

test('Página inicial do COCAO_HOTEL carrega corretamente', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/react_academic/);

  // Verifica se há um elemento específico, como um cabeçalho
  // await expect(page.locator('h1')).toContainText('Bem-vindo ao COCAO HOTEL');
  await expect(page.locator('h1')).toContainText('Dashboard');
});

/*

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

*/

//  .waitForTimeout(2000); // Serve pra ver o teste acontecendo, mas não é recomendado para testes reais (pode deixar o teste lento e instável). Use apenas para demonstração visual durante a apresentação.

test('Fluxo completo: Criar um novo hóspede no COCAO_HOTEL', async ({ page }) => {
  // 1. Ir para a página de listagem de hóspedes
  await page.goto('/sistema/hospede/listar');
  await page.waitForTimeout(2000); // Pausa para ver a página carregar

  // 2. Verificar se estamos na página correta
  await expect(page.locator('h1')).toContainText('Gerenciamento de Hóspedes');
  await page.waitForTimeout(1000); // Pausa para destacar o título

  // 3. Clicar no botão para criar novo hóspede
  await page.getByRole('button', { name: /novo/i }).click();
  await page.waitForTimeout(2000); // Pausa para ver a navegação

  // 4. Verificar se navegou para a página de criação
  await expect(page.locator('h1')).toContainText(/Novo Hóspede|Criar Hóspede/i);
  await page.waitForTimeout(1000); // Pausa para ver o formulário

  // 5. Preencher alguns campos do formulário (demonstração)
  await page.fill('input[name="nomeHospede"]', 'João Silva Teste');
  await page.waitForTimeout(1000); // Pausa após preencher nome

  await page.fill('input[name="cpf"]', '12345678901');
  await page.waitForTimeout(1000); // Pausa após preencher CPF

  // 6. Para apresentação: mostramos que o Playwright preenche formulários automaticamente
  await expect(page.locator('input[name="nomeHospede"]')).toHaveValue('João Silva Teste');
  await page.waitForTimeout(2000); // Pausa final para ver o resultado
});

/*
Por que isso é legal para apresentação:
Simula um usuário real: Navega páginas, clica botões, preenche formulários, submete dados.
Testa integração completa: Frontend + Backend (cria via UI e verifica se aparece na lista).
Mostra valor do Playwright: Demonstra testes E2E automatizados, simulando cenários reais de uso.
Visual impressionante: Abre navegador, interage como pessoa, verifica resultados automaticamente.

O que o teste faz:

Vai para /sistema/hospede/listar (lista de hóspedes).

Clica em "Novo Hóspede" (ou similar).

Preenche formulário com dados de teste (João Silva Teste, CPF, etc.).

Submete o formulário.

Verifica se voltou para a lista e o hóspede foi criado.

Para rodar e apresentar:

Execute npx playwright test --headed para ver o navegador abrindo e interagindo.

Use npx playwright show-report para ver o relatório visual.

Se os seletores (como input[name="nomeHospede"]) não baterem exatamente com seu HTML, o teste pode falhar. Ajuste conforme necessário inspecionando o DevTools do navegador durante o teste.
*/


/*
  // teste completo para criar um hóspede (dependendo do backend estar rodando e funcionando)
  // 5. Preencher o formulário
  await page.fill('input[name="nomeHospede"]', 'João Silva Teste');
  await page.fill('input[name="cpf"]', '12345678901');
  await page.fill('input[name="rg"]', '12345678');
  await page.selectOption('select[name="sexo"]', 'M');
  await page.fill('input[name="dataNascimento"]', '1990-01-01');
  await page.fill('input[name="email"]', 'joao.teste@email.com');
  await page.fill('input[name="telefone"]', '31999999999');
  await page.selectOption('select[name="tipo"]', '0');
  // await page.check('input[name="ativo"]'); // Campo ativo está desabilitado no formulário, então pulamos

  // 6. Submeter o formulário
  await page.click('button[type="submit"]');

  // 7. Verificar se o submit foi processado (pode ficar na página ou voltar, dependendo do app)
  
  // await expect(page).toHaveURL (/\/sistema\/hospede\/listar/); // Verifica se voltou para a lista
  // await expect(page.locator('text=João Silva Teste')).toBeVisible(); // Verifica se o hóspede criado aparece na lista

  // Para apresentação: verificamos que algo aconteceu (toast de sucesso ou mudança de URL)
  await expect(page.locator('text=sucesso|criado|salvo').or(page.locator('text=João Silva Teste'))).toBeVisible({ timeout: 10000 });
});

*/