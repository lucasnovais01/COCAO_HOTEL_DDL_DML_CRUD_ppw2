import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { FuncaoService } from '../service/funcao.service';
import { FuncaoRequest } from '../dto/request/funcao.request';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Funções')
@Controller('funcoes')
export class FuncaoController {
  constructor(private readonly funcaoService: FuncaoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova função' })
  @ApiResponse({ status: 201, description: 'Função criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  create(@Body() funcaoRequest: FuncaoRequest) {
    return this.funcaoService.create(funcaoRequest);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as funções' })
  @ApiResponse({ status: 200, description: 'Lista de funções retornada.' })
  findAll() {
    return this.funcaoService.findAll();
  }

  @Get(':codigoFuncao')
  @ApiOperation({ summary: 'Busca uma função pelo código' })
  @ApiResponse({ status: 200, description: 'Função encontrada.' })
  @ApiResponse({ status: 404, description: 'Função não encontrada.' })
  findOne(@Param('codigoFuncao') codigoFuncao: number) {
    return this.funcaoService.findOne(codigoFuncao);
  }

  @Put(':codigoFuncao')
  @ApiOperation({ summary: 'Atualiza uma função existente' })
  @ApiResponse({ status: 200, description: 'Função atualizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @ApiResponse({ status: 404, description: 'Função não encontrada.' })
  update(
    @Param('codigoFuncao') codigoFuncao: number,
    @Body() funcaoRequest: FuncaoRequest,
  ) {
    return this.funcaoService.update(codigoFuncao, funcaoRequest);
  }

  @Delete(':codigoFuncao')
  @ApiOperation({ summary: 'Remove uma função' })
  @ApiResponse({ status: 204, description: 'Função removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Função não encontrada.' })
  remove(@Param('codigoFuncao') codigoFuncao: number) {
    return this.funcaoService.remove(codigoFuncao);
  }
}