import { http } from "../../axios/config.axios";
import { API_QUARTO } from "../constants/quarto.constants";
import type { Quarto } from "../type/quarto";

export const apiGetQuartos = async (): Promise<any> => {
  console.log("[apiGetQuartos] Chamando endpoint:", API_QUARTO.LISTAR);
  const response = await http.get(API_QUARTO.LISTAR);
  console.log("[apiGetQuartos] Resposta recebida:", response);
  return response;
};

export const apiGetQuarto = async (idQuarto: number): Promise<any> => {
  console.log("[apiGetQuarto] Buscando quarto ID:", idQuarto);
  const response = await http.get(`${API_QUARTO.POR_ID}/${idQuarto}`);
  return response;
};

export const apiPostQuarto = async (quarto: Quarto): Promise<any> => {
  console.log("[apiPostQuarto] Criando quarto:", quarto);
  console.log("[apiPostQuarto] Endpoint:", API_QUARTO.CRIAR);
  console.log(
    "[apiPostQuarto] URL completa:",
    `http://localhost:8000/rest/sistema/v1${API_QUARTO.CRIAR}`
  );
  console.log(
    "[apiPostQuarto] Payload enviado:",
    JSON.stringify(quarto, null, 2)
  );

  try {
    const response = await http.post(API_QUARTO.CRIAR, quarto);
    console.log("[apiPostQuarto] Resposta:", response);
    console.log("[apiPostQuarto] Status:", response?.status);
    console.log("[apiPostQuarto] Data:", response?.data);
    return response;
  } catch (error: any) {
    console.error("[apiPostQuarto] ERRO - Detalhes completos:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    console.error("[apiPostQuarto] Full error object:", error);
    throw error;
  }
};

export const apiPutQuarto = async (
  idQuarto: number,
  quarto: Quarto
): Promise<any> => {
  console.log("[apiPutQuarto] Atualizando quarto ID:", idQuarto);
  console.log("[apiPutQuarto] URL:", `${API_QUARTO.ATUALIZAR}/${idQuarto}`);
  const response = await http.put(
    `${API_QUARTO.ATUALIZAR}/${idQuarto}`,
    quarto
  );
  console.log("[apiPutQuarto] Resposta:", response);
  return response;
};

export const apiDeleteQuarto = async (idQuarto: number): Promise<any> => {
  console.log("[apiDeleteQuarto] Excluindo quarto ID:", idQuarto);
  console.log("[apiDeleteQuarto] URL:", `${API_QUARTO.EXCLUIR}/${idQuarto}`);
  const response = await http.delete(`${API_QUARTO.EXCLUIR}/${idQuarto}`);
  console.log("[apiDeleteQuarto] Resposta:", response);
  return response;
};
