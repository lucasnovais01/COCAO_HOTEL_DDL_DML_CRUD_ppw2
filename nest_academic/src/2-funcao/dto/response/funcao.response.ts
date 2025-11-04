import { Expose } from 'class-transformer';

export class FuncaoResponse {
  @Expose()
  // ID gerado pelo banco.
  idFuncao?: number;

  @Expose()
  // Nome da função (cargo).
  nomeFuncao: string = '';

  @Expose()
  // Ativo: 1 = Sim, 0 = Não.
  ativo: number = 1;

  @Expose()
  // Timestamp de criação (herdados de BaseEntity).
  createdAt: Date = new Date();

  @Expose()
  // Timestamp de atualização (herdados de BaseEntity).
  updatedAt: Date = new Date();
}