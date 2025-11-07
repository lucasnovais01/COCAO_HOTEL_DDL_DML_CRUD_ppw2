import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('COCAO_FUNCIONARIO')
export class Funcionario extends BaseEntity {
	@PrimaryColumn({
		name: 'ID_USUARIO',
		type: 'number',
	})
	idUsuario?: number;

	@Column({
		name: 'CODIGO_FUNCAO',
		type: 'number',
		precision: 4,
		nullable: false,
	})
	codigoFuncao?: number;

	@Column({
		name: 'NOME_LOGIN',
		type: 'varchar2',
		length: 50,
		nullable: false,
	})
	nomeLogin: string = '';

	@Column({
		name: 'SENHA',
		type: 'varchar2',
		length: 50,
		nullable: false,
	})
	senha: string = '';

	@Column({
		name: 'DATA_CONTRATACAO',
		type: 'date',
		nullable: false,
	})
	dataContratacao: Date = new Date();

	@Column({
		name: 'ATIVO',
		type: 'number',
		nullable: false,
		default: 1,
	})
	ativo: number = 1;

	@Column({
		name: 'CREATED_AT',
		type: 'timestamp',
		nullable: false,
	})
	createdAt?: Date;

	@Column({
		name: 'UPDATED_AT',
		type: 'timestamp',
		nullable: false,
	})
	updatedAt?: Date;

	constructor(data: Partial<Funcionario> = {}) {
		super();
		Object.assign(this, data);
	}
}

