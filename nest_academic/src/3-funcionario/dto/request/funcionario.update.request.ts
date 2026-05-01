import { Type } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class FuncionarioUpdateRequest {
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { message: 'ID do usuário deve ser número' })
  idUsuario?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { message: 'Código da função deve ser número' })
  codigoFuncao?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  nomeLogin?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  senha?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Data de contratação inválida' })
  dataContratacao?: string;

  @Type(() => Number)
  @IsOptional()
  @IsIn([0, 1])
  ativo?: number;

  constructor(data: Partial<FuncionarioUpdateRequest> = {}) {
    Object.assign(this, data);
  }
}
