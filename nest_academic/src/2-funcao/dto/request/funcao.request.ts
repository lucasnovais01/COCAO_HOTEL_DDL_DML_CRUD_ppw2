import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FuncaoRequest {
  @Type(() => Number)
  @IsOptional()
  // ID opcional (para updates; gerado pelo banco em creates).
  idFuncao?: number;

  @IsNotEmpty({ message: 'Nome da função deve ser informado' })
  @IsString({ message: 'Nome deve conter somente texto' })
  @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
  // Nome da função obrigatório (ex: 'Recepcionista').
  nomeFuncao: string = '';

  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { message: 'Ativo deve ser número' })
  @IsIn([0, 1], { message: 'Ativo inválido: 0 ou 1' })
  // Ativo obrigatório, mas opcional na requisição (usa default 1 se não enviado).
  ativo?: number;

  // Construtor para inicialização parcial.
  constructor(data: Partial<FuncaoRequest> = {}) {
    Object.assign(this, data);
  }
}
