import { criarMensagemOperacao } from "../../constants/mensagem.operacao";

const ENTITY_NAME = "Hóspede";

export const HOSPEDE = {
  ENTITY: ENTITY_NAME,

  ALIAS: "hospede",

  DADOS_INICIAIS: {
    idUsuario: 0,
    nomeHospede: "",
    cpf: "",
    rg: "",
    sexo: "",
    dataNascimento: "",
    email: "",
    telefone: "",
    tipo: 0,
    ativo: 1,
  },

  FIELDS: {
    ID: "idUsuario",
    NOME: "nomeHospede",
    CPF: "cpf",
    RG: "rg",
    SEXO: "sexo",
    DATA_NASCIMENTO: "dataNascimento",
    EMAIL: "email",
    TELEFONE: "telefone",
    TIPO: "tipo",
    ATIVO: "ativo",
  } as const,

  LABEL: {
    NOME: "Nome Completo",
    CPF: "CPF",
    RG: "RG",
    SEXO: "Sexo",
    DATA_NASCIMENTO: "Data de Nascimento",
    EMAIL: "E-mail",
    TELEFONE: "Telefone",
    TIPO: "Tipo",
    ATIVO: "Ativo",
  },

  TITULO: {
    LISTA: `Lista de ${ENTITY_NAME}s`,
    CRIAR: `Novo ${ENTITY_NAME}`,
    ATUALIZAR: `Atualizar ${ENTITY_NAME}`,
    EXCLUIR: `Excluir ${ENTITY_NAME}`,
    CONSULTAR: `Consultar ${ENTITY_NAME}`,
  },

  INPUT_ERROR: {
    NOME: {
      BLANK: `O nome do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um nome válido para o ${ENTITY_NAME}`,
      MAX_LEN: `O nome do ${ENTITY_NAME} deve ter no máximo 100 caracteres`,
      MIN_LEN: `O nome do ${ENTITY_NAME} deve ter no mínimo 5 caracteres`,
      STRING: `O nome do ${ENTITY_NAME} deve ser um texto`,
    },
    CPF: {
      BLANK: `O CPF do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um CPF válido (apenas números)`,
      EXACT_LEN: `O CPF deve ter exatamente 11 dígitos`,
      PATTERN: `O CPF deve conter apenas números`,
      EXISTE: `Este CPF já está cadastrado`,
    },
    RG: {
      BLANK: `O RG do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um RG válido`,
      MAX_LEN: `O RG deve ter no máximo 20 caracteres`,
      MIN_LEN: `O RG deve ter no mínimo 7 caracteres`,
    },
    SEXO: {
      BLANK: `O sexo do ${ENTITY_NAME} deve ser selecionado`,
      VALID: `Selecione M (Masculino) ou F (Feminino)`,
    },
    DATA_NASCIMENTO: {
      BLANK: `A data de nascimento do ${ENTITY_NAME} deve ser informada`,
      VALID: `Informe uma data válida (DD/MM/AAAA)`,
      PAST: `A data de nascimento deve ser no passado`,
      AGE_MIN: `O ${ENTITY_NAME} deve ter pelo menos 18 anos`,
    },
    EMAIL: {
      BLANK: `O e-mail do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um e-mail válido`,
      PATTERN: `O e-mail deve seguir o formato: usuario@dominio.com`,
      EXISTE: `Este e-mail já está cadastrado`,
    },
    TELEFONE: {
      BLANK: `O telefone do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um telefone válido com DDD`,
      PATTERN: `O telefone deve seguir o formato: (XX) XXXXX-XXXX`,
      MIN_LEN: `O telefone deve ter no mínimo 14 caracteres (com formatação)`,
    },
    TIPO: {
      BLANK: `O tipo do ${ENTITY_NAME} deve ser selecionado`,
      VALID: `Selecione 0 (Hóspede) ou 1 (Funcionário)`,
    },
  },

  OPERACAO: criarMensagemOperacao(ENTITY_NAME),
};