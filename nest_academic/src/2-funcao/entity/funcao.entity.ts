import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('COCAO_FUNCAO')
export class Funcao extends BaseEntity {
  @PrimaryGeneratedColumn('identity', {
    name: 'ID_FUNCAO',
    type: 'number',
  })
  // Chave primária gerada automaticamente pelo Oracle (IDENTITY).
  idFuncao?: number;

  @Column({
    name: 'NOME_FUNCAO',
    type: 'varchar2',
    length: 100,
    nullable: false,
  })
  // Nome da função (cargo) do funcionário (ex: 'Recepcionista', 'Gerente').
  nomeFuncao: string = '';

  @Column({
    name: 'ATIVO',
    type: 'number',
    nullable: false,
    default: 1,
  })
  // Status ativo: 1 = Ativo, 0 = Inativo (check no banco).
  ativo: number = 1;

  // Construtor para inicialização de objetos parciais (uso em DTOs ou testes).
  constructor(data: Partial<Funcao> = {}) {
    super();
    Object.assign(this, data);
  }
}
