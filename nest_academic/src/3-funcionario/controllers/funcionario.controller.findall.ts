import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { FuncionarioServiceFindAll } from '../service/funcionario.service.findall';
import { ROTA } from 'src/commons/constants/url.sistema';
import { FuncionarioResponse } from '../dto/response/funcionario.response';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import { Result } from 'src/commons/mensagem/mensagem';
import type { Request } from 'express';

@Controller(ROTA.FUNCIONARIO.BASE.substring(1))
export class FuncionarioControllerFindAll {
	constructor(private readonly funcionarioServiceFindAll: FuncionarioServiceFindAll) {}

	@HttpCode(HttpStatus.OK)
	@Get(ROTA.FUNCIONARIO.ENDPOINTS.LIST)
	async findAll(@Req() req: Request): Promise<Result<FuncionarioResponse[]>> {
		const response = await this.funcionarioServiceFindAll.findAll();

		return MensagemSistema.showMensagem(
			HttpStatus.OK,
			'Lista de funcionários gerada com sucesso!',
			response,
			ROTA.FUNCIONARIO.LIST,
			null,
		);
	}
}

