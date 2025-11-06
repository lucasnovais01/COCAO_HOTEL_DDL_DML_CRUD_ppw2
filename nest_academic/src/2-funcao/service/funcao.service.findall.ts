import { Injectable } from '@nestjs/common';
import { Funcao } from '../entity/funcao.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FuncaoResponse } from '../dto/response/funcao.response';
import { FuncaoConverter } from '../dto/converter/funcao.converter';

@Injectable()
export class FuncaoServiceFindAll {
	constructor(
		@InjectRepository(Funcao)
		private funcaoRepository: Repository<Funcao>,
	) {}

	async findAll(): Promise<FuncaoResponse[]> {
		const funcoes = await this.funcaoRepository
			.createQueryBuilder('funcao')
			.getMany();

		return FuncaoConverter.toListFuncaoResponse(funcoes);
	}
}
