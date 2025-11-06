import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Req,
} from '@nestjs/common';
import { FuncaoServiceFindOne } from '../service/funcao.service.findone';
import { FuncaoConverter } from '../dto/converter/funcao.converter';
import { ROTA } from 'src/commons/constants/url.sistema';
import { FuncaoResponse } from '../dto/response/funcao.response';
import { Result } from 'src/commons/mensagem/mensagem';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import type { Request } from 'express';

@Controller(ROTA.FUNCAO.BASE.substring(1))
export class FuncaoControllerFindOne {
	constructor(private readonly funcaoServiceFindOne: FuncaoServiceFindOne) {}

	@HttpCode(HttpStatus.OK)
	@Get(ROTA.FUNCAO.ENDPOINTS.BY_ID)
	async findOne(
		@Req() req: Request,
		@Param('id', ParseIntPipe) id: number,
	): Promise<Result<FuncaoResponse | null>> {
		const entidade = await this.funcaoServiceFindOne.findByCodigo(+id);
		const response = FuncaoConverter.toFuncaoResponse(entidade);

		return MensagemSistema.showMensagem(
			HttpStatus.OK,
			'Função localizada com sucesso!',
			response,
			ROTA.FUNCAO.BY_ID,
			null,
		);
	}
}
