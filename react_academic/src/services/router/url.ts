import { HOSPEDE } from "../1-hospede/constants/hospede.constants";

/*
 * ============================================================
 * DOCUMENTAÇÃO: url.ts - Configuração de Rotas do Sistema
 * ============================================================
 * 
 * PROPÓSITO:
 *   Centralizar as URLs (rotas) da aplicação em um único lugar.
 *   Assim, se uma rota mudar, alteramos aqui e reflete em todo o app.
 * 
 * ESTRUTURA:
 *   - ROTA_SISTEMA: Prefixo comum das rotas ("sistema")
 *   - Operações: LISTAR, CRIAR, POR_ID, ATUALIZAR, EXCLUIR
 *   - gerarRotaSistema: Função que monta a rota final
 * 
 * FLUXO DE ROTAS (Frontend):
 *   1. React Router usa rotas com "/sistema" (ex: /sistema/dashboard)
 *   2. Ao clicar em um link, navega para essas rotas (SPA - Single Page App)
 *   3. Breadcrumb mostra as rotas do React Router
 * 
 * FLUXO DE APIs (Backend):
 *   1. axios baseURL = "http://localhost:8000/rest/sistema/v1" (em config.axios.ts)
 *   2. apiGetHospedes() chama http.get(ROTA.HOSPEDE.LISTAR)
 *   3. ROTA.HOSPEDE.LISTAR retorna "/sistema/hospede/listar"
 *   4. ❌ PROBLEMA: URL fica "http://localhost:8000/rest/sistema/v1/sistema/hospede/listar" (duplica /sistema)
 *   5. ✅ SOLUÇÃO: As rotas de API precisam ser diferentes das rotas React Router
 * 
 * NOTA IMPORTANTE:
 *   Este arquivo define rotas para o React Router (navegação SPA).
 *   Para chamadas de API, use um arquivo separado ou constante diferente
 *   que reflita apenas "hospede/listar" (sem /sistema).
 * 
 * ============================================================
 */

const ROTA_SISTEMA = 'sistema';

// ROTAS REACT ROUTER (para navegação do app, com /sistema)
export const DASHBOARD = `/${ROTA_SISTEMA}/dashboard`;

const LISTAR = `listar`;
const CRIAR = `criar`;
const POR_ID = `buscar`;
const ATUALIZAR = `atualizar`;
const EXCLUIR = `excluir`;

function gerarRotaSistema(entity: string) {
  const base = `${ROTA_SISTEMA}/${entity}`;
  
  return {
    LISTAR: `/${base}/${LISTAR}`,
    CRIAR: `/${base}/${CRIAR}`,
    POR_ID: `/${base}/${POR_ID}`,
    ATUALIZAR: `/${base}/${ATUALIZAR}`,
    EXCLUIR: `/${base}/${EXCLUIR}`,
  };
}

export const ROTA = {
  HOSPEDE: gerarRotaSistema(HOSPEDE.ALIAS),
};