// Objetivo: Gerar rotas RESTful completas e padronizadas.

import {
  HOSPEDE,
  FUNCAO,
  FUNCIONARIO,
  TIPO_QUARTO,
  QUARTO,
  STATUS_RESERVA,
  RESERVA,
  SERVICO,
  HOSPEDE_SERVICO,
} from './constants.sistema';

// URLs do Sistema COCAO HOTEL

export const SERVIDOR = 'http://localhost:8000';
export const CLIENTE = 'http://localhost:3000';

// Aqui eu coloquei a versão da API para facilitar futuras manutenções
// Coloquei mais informação no arquivo zSobre o V1.md

// Pode ser retirad, só deletar API_VERSION e usar:
// const ROTA_SISTEMA = 'rest/sistema';
// const ROTA_AUTH = 'rest/auth';

const API_VERSION = 'v1';
const ROTA_SISTEMA = `rest/sistema/${API_VERSION}`;
const ROTA_AUTH = `rest/auth/${API_VERSION}`;

// Ações REST padronizadas

const LIST = 'listar';
const CREATE = 'criar';
const BY_ID = 'buscar';
const UPDATE = 'alterar';
const DELETE = 'excluir';

// Gera rotas completas para uma entidade. Exemplo: /rest/sistema/v1/hospede/listar
// Retorna um objeto com todas as rotas para a entidade fornecida
// o base serve como base para as outras rotas
// pois é a junção da rota do sistema com o nome da entidade

// Exemplo: gerarRotasSistema('hospede') retorna:
// {
//   BASE: '/rest/sistema/v1/hospede',
//   LIST: '/rest/sistema/v1/hospede/listar',
//   CREATE: '/rest/sistema/v1/hospede/criar',
//   BY_ID: '/rest/sistema/v1/hospede/buscar/:id',
//   UPDATE: '/rest/sistema/v1/hospede/alterar/:id',
//   DELETE: '/rest/sistema/v1/hospede/excluir/:id',
// }

function gerarRotasSistema(entity: string) {
  const base = `/${ROTA_SISTEMA}/${entity}`;
  return {
    BASE: base,
    LIST: `${base}/${LIST}`,
    CREATE: `${base}/${CREATE}`,
    BY_ID: `${base}/${BY_ID}/:id`,
    UPDATE: `${base}/${UPDATE}/:id`,
    DELETE: `${base}/${DELETE}/:id`,
  };
}

// Rotas do sistema (entidades)

// Preciso ajeitar a ordem

export const ROTA = {
  HOSPEDE: gerarRotasSistema(HOSPEDE),
  FUNCAO: gerarRotasSistema(FUNCAO),
  FUNCIONARIO: gerarRotasSistema(FUNCIONARIO),
  TIPO_QUARTO: gerarRotasSistema(TIPO_QUARTO),
  QUARTO: gerarRotasSistema(QUARTO),
  STATUS_RESERVA: gerarRotasSistema(STATUS_RESERVA),
  RESERVA: gerarRotasSistema(RESERVA),
  SERVICO: gerarRotasSistema(SERVICO),
  HOSPEDE_SERVICO: gerarRotasSistema(HOSPEDE_SERVICO),
};

// Rotas de autenticação (separadas para evitar conflito). Observação: Futuro AuthModule

export const AUTH_ROUTES = {
  BASE: `/${ROTA_AUTH}`,
  LOGIN: `/${ROTA_AUTH}/login`,
  LOGOUT: `/${ROTA_AUTH}/logout`,
  ME: `/${ROTA_AUTH}/me`,
  REFRESH: `/${ROTA_AUTH}/refresh`,
};
