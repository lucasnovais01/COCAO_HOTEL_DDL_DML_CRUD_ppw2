import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FuncionarioConverter } from '../dto/converter/funcionario.converter';
import { FuncionarioRequest } from '../dto/request/funcionario.request';
import { Repository } from 'typeorm';
import { Funcionario } from '../entity/funcionario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FuncionarioResponse } from '../dto/response/funcionario.response';

@Injectable()
export class FuncionarioServiceCreate {
	constructor(
		@InjectRepository(Funcionario)
		private funcionarioRepository: Repository<Funcionario>,
	) {}

	async create(funcionarioRequest: FuncionarioRequest): Promise<FuncionarioResponse | null> {
		let funcionario = FuncionarioConverter.toFuncionario(funcionarioRequest);

		const funcionarioExistente = await this.funcionarioRepository
			.createQueryBuilder('f')
			.where('f.nomeLogin = :login', { login: funcionario.nomeLogin })
			.getOne();

		if (funcionarioExistente) {
			throw new HttpException('Nome de login já cadastrado', HttpStatus.BAD_REQUEST);
		}

		funcionario = await this.funcionarioRepository.save(funcionario);

		return FuncionarioConverter.toFuncionarioResponse(funcionario);
	}
}

