import { Injectable } from '@nestjs/common';
import { Funcionario } from '../entity/funcionario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FuncionarioResponse } from '../dto/response/funcionario.response';
import { FuncionarioConverter } from '../dto/converter/funcionario.converter';

@Injectable()
export class FuncionarioServiceFindAll {
	constructor(
		@InjectRepository(Funcionario)
		private funcionarioRepository: Repository<Funcionario>,
	) {}

	async findAll(): Promise<FuncionarioResponse[]> {
		const funcionarios = await this.funcionarioRepository.createQueryBuilder('funcionario').getMany();
		return FuncionarioConverter.toListFuncionarioResponse(funcionarios);
	}
}

