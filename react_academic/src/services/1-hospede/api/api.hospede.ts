import { http } from "../../axios/config.axios";
import { ROTA } from "../../router/url";
import type { Hospede } from "../type/hospede";

/*
 * ============================================================
 * DOCUMENTAÇÃO: api.hospede.ts
 * ============================================================
 * 
 * PROPÓSITO:
 *   Centralizar todas as chamadas HTTP para o backend relacionadas a Hóspede.
 * 
 * FLUXO:
 *   1. apiGetHospedes() é chamado no componente Listar.tsx
 *   2. Usa http.get() que possui baseURL configurado
 *   3. ROTA.HOSPEDE.LISTAR fornece o endpoint relativo
 *   4. axios monta a URL completa: baseURL + endpoint
 * 
 * PROBLEMA ATUAL (11/11/2025):
 *   - ROTA.HOSPEDE.LISTAR retorna "/sistema/hospede/listar"
 *   - baseURL é "http://localhost:8000/rest/sistema/v1"
 *   - URL final: "http://localhost:8000/rest/sistema/v1/sistema/hospede/listar"
 *   - Backend espera: "http://localhost:8000/rest/sistema/v1/hospede/listar"
 * 
 * Por que ocorre?
 *   - O arquivo url.ts foi criado para React Router (que precisa de /sistema)
 *   - As APIs usam a mesma rota, mas não deveria ter /sistema
 *   - Solução: Criar um mapeamento separado para APIs ou remover /sistema aqui
 * 
 * ============================================================
 */

// ✅ Lista todos os hóspedes (sem filtro de tipo)
export const apiGetHospedes = async (): Promise<any> => {
  console.log('[apiGetHospedes] Chamando endpoint:', ROTA.HOSPEDE.LISTAR);
  const response = await http.get(ROTA.HOSPEDE.LISTAR);
  console.log('[apiGetHospedes] Resposta recebida:', response);
  return response;
};

// ✅ Busca um hóspede por ID
export const apiGetHospede = async (idUsuario: number): Promise<any> => {
  console.log('[apiGetHospede] Buscando hóspede ID:', idUsuario);
  const response = await http.get(`${ROTA.HOSPEDE.POR_ID}/${idUsuario}`);
  return response;
};

// ✅ Cria um novo hóspede
export const apiPostHospede = async (hospede: Hospede): Promise<any> => {
  console.log('[apiPostHospede] Criando hóspede:', hospede);
  const response = await http.post(ROTA.HOSPEDE.CRIAR, hospede);
  return response;
};

// ✅ Atualiza um hóspede existente
export const apiPutHospede = async (idUsuario: number, hospede: Hospede): Promise<any> => {
  console.log('[apiPutHospede] Atualizando hóspede ID:', idUsuario);
  const response = await http.put(`${ROTA.HOSPEDE.ATUALIZAR}/${idUsuario}`, hospede);
  return response;
};

// ✅ Exclui um hóspede
export const apiDeleteHospede = async (idUsuario: number): Promise<any> => {
  console.log('[apiDeleteHospede] Excluindo hóspede ID:', idUsuario);
  const response = await http.delete(`${ROTA.HOSPEDE.EXCLUIR}/${idUsuario}`);
  return response;
};