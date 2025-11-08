import axios from "axios"; // erro que está dando no pc da escola: Cannot find module 'axios' or its corresponding type declarations.
import { REST_CONFIG } from "../constants/sistema.constant";

/*
export const http = axios.create({
  baseURL: REST_CONFIG.BASE_URL,
  timeout: 15000,
  headers: {
    "Content-type":"application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});
*/

// terceira tentativa

export const http = axios.create({
  baseURL: REST_CONFIG.BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: false
});

// Interceptor para log de requisições (debug)
http.interceptors.request.use((request: any) => {
  console.log('Request:', request);
  return request;
});

// Interceptor para log de respostas e erros (debug)
http.interceptors.response.use(
  (  response: any) => {
    console.log('Response:', response);
    return response;
  },
  (  error: { message: any; config: any; response: any; }) => {
    console.error('Erro na requisição:', {
      message: error.message,
      config: error.config,
      response: error.response
    });
    return Promise.reject(error);
  }
);

// Interceptor para log de requisições (debug)
http.interceptors.request.use((request: any) => {
  console.log('Request:', request);
  return request;
});

// Interceptor para log de respostas e erros (debug)
http.interceptors.response.use(
  (  response: any) => {
    console.log('Response:', response);
    return response;
  },
  (  error: { message: any; config: any; response: any; }) => {
    console.error('Erro na requisição:', {
      message: error.message,
      config: error.config,
      response: error.response
    });
    return Promise.reject(error);
  }
);

// Adicionar interceptors para debug
http.interceptors.request.use((request: any) => {
  console.log('Request:', request);
  return request;
});

http.interceptors.response.use(
  (  response: any) => {
    console.log('Response:', response);
    return response;
  },
  (  error: any) => {
    console.error('Error:', error);
    return Promise.reject(error);
  }
);