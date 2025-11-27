import { http } from "../../axios/config.axios";
import { API_TIPO_QUARTO } from "../constants/tipo-quarto.constants";
import type { TipoQuarto } from "../type/tipo-quarto";

export const apiGetTiposQuarto = async (): Promise<any> => {
  console.log("[apiGetTiposQuarto] Chamando endpoint:", API_TIPO_QUARTO.LISTAR);
  const response = await http.get(API_TIPO_QUARTO.LISTAR);
  console.log("[apiGetTiposQuarto] Resposta recebida:", response);
  return response;
};

export const apiGetTipoQuarto = async (
  codigoTipoQuarto: number
): Promise<any> => {
  console.log(
    "[apiGetTipoQuarto] Buscando tipo de quarto código:",
    codigoTipoQuarto
  );
  const response = await http.get(
    `${API_TIPO_QUARTO.POR_ID}/${codigoTipoQuarto}`
  );
  return response;
};

export const apiPostTipoQuarto = async (
  tipoQuarto: TipoQuarto
): Promise<any> => {
  console.log("[apiPostTipoQuarto] Criando tipo de quarto:", tipoQuarto);
  console.log("[apiPostTipoQuarto] Endpoint:", API_TIPO_QUARTO.CRIAR);
  console.log(
    "[apiPostTipoQuarto] URL completa:",
    `http://localhost:8000/rest/sistema/v1${API_TIPO_QUARTO.CRIAR}`
  );
  console.log(
    "[apiPostTipoQuarto] Payload enviado:",
    JSON.stringify(tipoQuarto, null, 2)
  );

  try {
    const response = await http.post(API_TIPO_QUARTO.CRIAR, tipoQuarto);
    console.log("[apiPostTipoQuarto] Resposta:", response);
    console.log("[apiPostTipoQuarto] Status:", response?.status);
    console.log("[apiPostTipoQuarto] Data:", response?.data);
    return response;
  } catch (error: any) {
    console.error("[apiPostTipoQuarto] ERRO - Detalhes completos:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    console.error("[apiPostTipoQuarto] Full error object:", error);
    throw error;
  }
};

export const apiPutTipoQuarto = async (
  codigoTipoQuarto: number,
  tipoQuarto: TipoQuarto
): Promise<any> => {
  console.log(
    "[apiPutTipoQuarto] Atualizando tipo de quarto código:",
    codigoTipoQuarto
  );
  console.log(
    "[apiPutTipoQuarto] URL:",
    `${API_TIPO_QUARTO.ATUALIZAR}/${codigoTipoQuarto}`
  );
  const response = await http.put(
    `${API_TIPO_QUARTO.ATUALIZAR}/${codigoTipoQuarto}`,
    tipoQuarto
  );
  console.log("[apiPutTipoQuarto] Resposta:", response);
  return response;
};

export const apiDeleteTipoQuarto = async (
  codigoTipoQuarto: number
): Promise<any> => {
  console.log(
    "[apiDeleteTipoQuarto] Excluindo tipo de quarto código:",
    codigoTipoQuarto
  );
  console.log(
    "[apiDeleteTipoQuarto] URL:",
    `${API_TIPO_QUARTO.EXCLUIR}/${codigoTipoQuarto}`
  );
  const response = await http.delete(
    `${API_TIPO_QUARTO.EXCLUIR}/${codigoTipoQuarto}`
  );
  console.log("[apiDeleteTipoQuarto] Resposta:", response);
  return response;
};
