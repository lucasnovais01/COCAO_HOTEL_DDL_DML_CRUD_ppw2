import { Response } from 'express';
import { MensagemSistema } from './mensagem.sistema';

export function sendHttpResponse<T>(
  res: Response,
  status: number,
  mensagem: string | null,
  dados: T | null,
  path: string | null,
  erro: string | any | null,
) {
  return res
    .status(status)
    .json(MensagemSistema.showMensagem(status, mensagem, dados, path, erro));
}

// Erro no any, na linha 10
// 'any' overrides all other types in this union type.eslint@typescript-eslint/no-redundant-type-constituents

// E na linha 14: Unsafe argument of type `any` assigned to a parameter of type `string | null`.eslint@typescript-eslint/no-unsafe-argument
// (parameter) erro: any
