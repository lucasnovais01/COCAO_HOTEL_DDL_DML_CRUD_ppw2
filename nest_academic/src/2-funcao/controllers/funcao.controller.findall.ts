import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { FuncaoServiceFindAll } from '../service/funcao.service.findall';
import { ROTA } from 'src/commons/constants/url.sistema';
import { FuncaoResponse } from '../dto/response/funcao.response';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import { Result } from 'src/commons/mensagem/mensagem';
import type { Request } from 'express';

@Controller(ROTA.FUNCAO.BASE.substring(1))
export class FuncaoControllerFindAll {
	constructor(private readonly funcaoServiceFindAll: FuncaoServiceFindAll) {}

	@HttpCode(HttpStatus.OK)
	@Get(ROTA.FUNCAO.ENDPOINTS.LIST)
	async findAll(@Req() req: Request): Promise<Result<FuncaoResponse[]>> {
		const response = await this.funcaoServiceFindAll.findAll();

		return MensagemSistema.showMensagem(
			HttpStatus.OK,
			'Lista de funções gerada com sucesso!',
			response,
			ROTA.FUNCAO.LIST,
			null,
		);
	}
}
