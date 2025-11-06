import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
} from '@nestjs/common';
import { FuncaoRequest } from '../dto/request/funcao.request';
import { FuncaoServiceCreate } from '../service/funcao.service.create';
import { ROTA } from 'src/commons/constants/url.sistema';
import { FuncaoResponse } from '../dto/response/funcao.response';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import { Result } from 'src/commons/mensagem/mensagem';
import type { Request } from 'express';

@Controller(ROTA.FUNCAO.BASE.substring(1))
export class FuncaoControllerCreate {
	constructor(private readonly funcaoServiceCreate: FuncaoServiceCreate) {}

	@HttpCode(HttpStatus.CREATED)
	@Post(ROTA.FUNCAO.ENDPOINTS.CREATE)
	async create(
		@Req() req: Request,
		@Body() funcaoRequest: FuncaoRequest,
	): Promise<Result<FuncaoResponse>> {
		const response = await this.funcaoServiceCreate.create(funcaoRequest);
		return MensagemSistema.showMensagem(
			HttpStatus.CREATED,
			'Função cadastrada com sucesso!',
			response,
			ROTA.FUNCAO.CREATE,
			null,
		);
	}
}
