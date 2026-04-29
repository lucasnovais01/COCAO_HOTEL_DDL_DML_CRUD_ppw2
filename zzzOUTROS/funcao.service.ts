/*
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcao } from '../entity/funcao.entity';
import { FuncaoRequest } from '../dto/request/funcao.request';
import { FuncaoConverter } from '../dto/converter/funcao.converter';
import { MensagemHelper } from 'src/commons/helper/mensagem.helper';

@Injectable()
export class FuncaoService {
  constructor(
    @InjectRepository(Funcao)
    private funcaoRepository: Repository<Funcao>,
  ) {}
   */
  /**
   * Cria uma nova função no banco de dados.
   * @param funcaoRequest Dados da função a ser criada
   * @returns A função criada convertida em FuncaoResponse
   
  async create(funcaoRequest: FuncaoRequest) {
    const funcao = FuncaoConverter.toFuncao(funcaoRequest);
    const savedFuncao = await this.funcaoRepository.save(funcao);
    return FuncaoConverter.toFuncaoResponse(savedFuncao);
  }
*/
  /**
   * Busca todas as funções no banco de dados.
   * @returns Lista de funções convertidas em FuncaoResponse
 
  async findAll() {
    const funcoes = await this.funcaoRepository.find();
    return FuncaoConverter.toListFuncaoResponse(funcoes);
  }
  */
  /**
   * Busca uma função pelo código.
   * @param codigoFuncao Código da função
   * @returns A função encontrada convertida em FuncaoResponse ou erro se não encontrada

  async findOne(codigoFuncao: number) {
    const funcao = await this.funcaoRepository.findOne({
      where: { codigoFuncao },
    });

    if (!funcao) {
      throw MensagemHelper.ERRO_REGISTRO_NAO_ENCONTRADO;
    }

    return FuncaoConverter.toFuncaoResponse(funcao);
  }
   */
  /**
   * Atualiza uma função existente.
   * @param codigoFuncao Código da função a ser atualizada
   * @param funcaoRequest Novos dados da função
   * @returns A função atualizada convertida em FuncaoResponse

  async update(codigoFuncao: number, funcaoRequest: FuncaoRequest) {
    // Verifica se a função existe
    await this.findOne(codigoFuncao);

    // Cria objeto com os novos dados
    const funcao = FuncaoConverter.toFuncao(funcaoRequest);
    funcao.codigoFuncao = codigoFuncao;

    // Salva as alterações
    const updatedFuncao = await this.funcaoRepository.save(funcao);
    return FuncaoConverter.toFuncaoResponse(updatedFuncao);
  }
   */
  /**
   * Remove uma função do banco de dados.
   * @param codigoFuncao Código da função a ser removida
   * @returns void

  async remove(codigoFuncao: number) {
    // Verifica se a função existe
    const funcao = await this.findOne(codigoFuncao);
    
    // Remove a função
    await this.funcaoRepository.delete(codigoFuncao);
  }
}
*/