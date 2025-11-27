import { http } from "../../axios/config.axios";
import { API_FUNCIONARIO } from "../constants/funcionario.constants";
import type { Funcionario } from "../type/funcionario";

export const apiGetFuncionarios = async (): Promise<any> => {
  console.log(
    "[apiGetFuncionarios] Chamando endpoint:",
    API_FUNCIONARIO.LISTAR
  );
  const response = await http.get(API_FUNCIONARIO.LISTAR);
  console.log("[apiGetFuncionarios] Resposta recebida:", response);
  return response;
};

export const apiGetFuncionario = async (idUsuario: number): Promise<any> => {
  console.log("[apiGetFuncionario] Buscando funcionário ID:", idUsuario);
  const response = await http.get(`${API_FUNCIONARIO.POR_ID}/${idUsuario}`);
  return response;
};

export const apiPostFuncionario = async (
  funcionario: Funcionario
): Promise<any> => {
  console.log("[apiPostFuncionario] Criando funcionário:", funcionario);
  console.log("[apiPostFuncionario] Endpoint:", API_FUNCIONARIO.CRIAR);
  console.log(
    "[apiPostFuncionario] URL completa:",
    `http://localhost:8000/rest/sistema/v1${API_FUNCIONARIO.CRIAR}`
  );
  console.log(
    "[apiPostFuncionario] Payload enviado:",
    JSON.stringify(funcionario, null, 2)
  );

  try {
    const response = await http.post(API_FUNCIONARIO.CRIAR, funcionario);
    console.log("[apiPostFuncionario] Resposta:", response);
    console.log("[apiPostFuncionario] Status:", response?.status);
    console.log("[apiPostFuncionario] Data:", response?.data);
    return response;
  } catch (error: any) {
    console.error("[apiPostFuncionario] ERRO - Detalhes completos:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    console.error("[apiPostFuncionario] Full error object:", error);
    throw error;
  }
};

export const apiPutFuncionario = async (
  idUsuario: number,
  funcionario: Funcionario
): Promise<any> => {
  console.log("[apiPutFuncionario] Atualizando funcionário ID:", idUsuario);
  console.log(
    "[apiPutFuncionario] URL:",
    `${API_FUNCIONARIO.ATUALIZAR}/${idUsuario}`
  );
  const response = await http.put(
    `${API_FUNCIONARIO.ATUALIZAR}/${idUsuario}`,
    funcionario
  );
  console.log("[apiPutFuncionario] Resposta:", response);
  return response;
};

export const apiDeleteFuncionario = async (idUsuario: number): Promise<any> => {
  console.log("[apiDeleteFuncionario] Excluindo funcionário ID:", idUsuario);
  console.log(
    "[apiDeleteFuncionario] URL:",
    `${API_FUNCIONARIO.EXCLUIR}/${idUsuario}`
  );
  const response = await http.delete(`${API_FUNCIONARIO.EXCLUIR}/${idUsuario}`);
  console.log("[apiDeleteFuncionario] Resposta:", response);
  return response;
};
