import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FuncionarioConverter } from '../dto/converter/funcionario.converter';
import { FuncionarioRequest } from '../dto/request/funcionario.request';
import { Repository } from 'typeorm';
import { Funcionario } from '../entity/funcionario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FuncionarioResponse } from '../dto/response/funcionario.response';

@Injectable()
export class FuncionarioServiceUpdate {
	constructor(
		@InjectRepository(Funcionario)
		private funcionarioRepository: Repository<Funcionario>,
	) {}

	async update(id: number, funcionarioRequest: FuncionarioRequest): Promise<FuncionarioResponse | null> {
		const funcionario = await this.funcionarioRepository.findOneBy({ idUsuario: id });
		if (!funcionario) {
			throw new HttpException('Funcionário não encontrado', HttpStatus.NOT_FOUND);
		}

		// Atualiza campos permitidos
		funcionario.codigoFuncao = funcionarioRequest.codigoFuncao ?? funcionario.codigoFuncao;
		funcionario.nomeLogin = funcionarioRequest.nomeLogin ?? funcionario.nomeLogin;
		funcionario.senha = funcionarioRequest.senha ?? funcionario.senha;
		funcionario.dataContratacao = funcionarioRequest.dataContratacao ? new Date(funcionarioRequest.dataContratacao) : funcionario.dataContratacao;
		funcionario.ativo = funcionarioRequest.ativo ?? funcionario.ativo;

		const saved = await this.funcionarioRepository.save(funcionario);
		return FuncionarioConverter.toFuncionarioResponse(saved);
	}
}

