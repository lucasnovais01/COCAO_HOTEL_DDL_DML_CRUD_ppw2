import { http } from "../../axios/config.axios";
import { API_FUNCAO } from "../constants/funcao.constants";
import type { Funcao } from "../type/funcao";

export const apiGetFuncoes = async (): Promise<any> => {
	console.log('[apiGetFuncoes] Chamando endpoint:', API_FUNCAO.LISTAR);
	const response = await http.get(API_FUNCAO.LISTAR);
	console.log('[apiGetFuncoes] Resposta recebida:', response);
	return response;
};

export const apiGetFuncao = async (codigoFuncao: number): Promise<any> => {
	console.log('[apiGetFuncao] Buscando função código:', codigoFuncao);
	const response = await http.get(`${API_FUNCAO.POR_ID}/${codigoFuncao}`);
	return response;
};

export const apiPostFuncao = async (funcao: Funcao): Promise<any> => {
	console.log('[apiPostFuncao] Criando função:', funcao);
	console.log('[apiPostFuncao] Endpoint:', API_FUNCAO.CRIAR);
	console.log('[apiPostFuncao] URL completa:', `http://localhost:8000/rest/sistema/v1${API_FUNCAO.CRIAR}`);
	console.log('[apiPostFuncao] Payload enviado:', JSON.stringify(funcao, null, 2));

	try {
		const response = await http.post(API_FUNCAO.CRIAR, funcao);
		console.log('[apiPostFuncao] Resposta:', response);
		return response;
	} catch (error: any) {
		console.error('[apiPostFuncao] Erro detalhado:', {
			message: error.message,
			status: error.response?.status,
			statusText: error.response?.statusText,
			data: error.response?.data,
			headers: error.response?.headers,
			config: error.config
		});
		throw error;
	}
};

export const apiPutFuncao = async (codigoFuncao: number, funcao: Funcao): Promise<any> => {
	console.log('[apiPutFuncao] Atualizando função código:', codigoFuncao);
	console.log('[apiPutFuncao] URL:', `${API_FUNCAO.ATUALIZAR}/${codigoFuncao}`);
	const response = await http.put(`${API_FUNCAO.ATUALIZAR}/${codigoFuncao}`, funcao);
	console.log('[apiPutFuncao] Resposta:', response);
	return response;
};

export const apiDeleteFuncao = async (codigoFuncao: number): Promise<any> => {
	console.log('[apiDeleteFuncao] Excluindo função código:', codigoFuncao);
	console.log('[apiDeleteFuncao] URL:', `${API_FUNCAO.EXCLUIR}/${codigoFuncao}`);
	const response = await http.delete(`${API_FUNCAO.EXCLUIR}/${codigoFuncao}`);
	console.log('[apiDeleteFuncao] Resposta:', response);
	return response;
};

