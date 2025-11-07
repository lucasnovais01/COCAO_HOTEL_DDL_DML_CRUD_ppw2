import { Controller, Get, HttpCode, HttpStatus, Param, Req } from '@nestjs/common';
import { FuncionarioServiceFindOne } from '../service/funcionario.service.findone';
import { ROTA } from 'src/commons/constants/url.sistema';
import { FuncionarioResponse } from '../dto/response/funcionario.response';
import { MensagemSistema } from 'src/commons/mensagem/mensagem.sistema';
import { Result } from 'src/commons/mensagem/mensagem';
import type { Request } from 'express';

@Controller(ROTA.FUNCIONARIO.BASE.substring(1))
export class FuncionarioControllerFindOne {
	constructor(private readonly funcionarioServiceFindOne: FuncionarioServiceFindOne) {}

	@HttpCode(HttpStatus.OK)
	@Get(ROTA.FUNCIONARIO.ENDPOINTS.BY_ID)
	async findOne(@Req() req: Request, @Param('id') id: string): Promise<Result<FuncionarioResponse | null>> {
		const response = await this.funcionarioServiceFindOne.findOne(Number(id));
		return MensagemSistema.showMensagem(HttpStatus.OK, 'Funcionário recuperado com sucesso', response, ROTA.FUNCIONARIO.BY_ID, null);
	}
}

