import { http } from "../../axios/config.axios";
import { ROTA } from "../../router/url";
import type { Hospede } from "../type/hospede";

/**
 * Lista todos os hóspedes
 */
export const apiGetHospedes = async (): Promise<any> => {
  const response = await http.get(ROTA.HOSPEDE.LISTAR);
  return response;
};

/**
 * Busca um hóspede por ID
 */
export const apiGetHospede = async (idUsuario: number): Promise<any> => {
  const response = await http.get(`${ROTA.HOSPEDE.POR_ID}/${idUsuario}`);
  return response;
};

/**
 * Cria um novo hóspede
 */
export const apiPostHospede = async (hospede: Hospede): Promise<any> => {
  const response = await http.post(ROTA.HOSPEDE.CRIAR, hospede);
  return response;
};

/**
 * Atualiza um hóspede existente
 */
export const apiPutHospede = async (idUsuario: number, hospede: Hospede): Promise<any> => {
  const response = await http.put(`${ROTA.HOSPEDE.ATUALIZAR}/${idUsuario}`, hospede);
  return response;
};

/**
 * Exclui um hóspede
 */
export const apiDeleteHospede = async (idUsuario: number): Promise<any> => {
  const response = await http.delete(`${ROTA.HOSPEDE.EXCLUIR}/${idUsuario}`);
  return response;
};