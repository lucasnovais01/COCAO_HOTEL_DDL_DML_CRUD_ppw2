import { plainToInstance } from 'class-transformer';
import { Funcao } from 'src/2-funcao/entity/funcao.entity';
import { FuncaoRequest } from '../request/funcao.request';
import { FuncaoResponse } from '../response/funcao.response';

export class FuncaoConverter {
  /**
   * Converte um DTO de Requisição (FuncaoRequest) para a Entidade (Funcao).
   * @param funcaoRequest O DTO de dados de entrada.
   * @returns Uma nova instância da Entidade Funcao.
   */
  static toFuncao(funcaoRequest: FuncaoRequest): Funcao {
    const funcao = new Funcao();

    // ID só para updates; banco gerencia creates.
    if (funcaoRequest.idFuncao != null) {
      funcao.idFuncao = funcaoRequest.idFuncao;
    }

    funcao.nomeFuncao = funcaoRequest.nomeFuncao;

    // Campo opcional (ativo): só atribui se definido na request.
    if (funcaoRequest.ativo !== undefined) {
      funcao.ativo = funcaoRequest.ativo;
    }

    return funcao;
  }

  /**
   * Converte uma Entidade Funcao para o DTO de Resposta (FuncaoResponse).
   * @param funcao A entidade Funcao do banco de dados.
   * @returns O DTO de resposta, com campos expostos.
   */
  static toFuncaoResponse(funcao: Funcao): FuncaoResponse {
    // Converte entidade para DTO de response, expondo apenas campos com @Expose().
    return plainToInstance(FuncaoResponse, funcao, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Converte uma lista de Entidades Funcao para uma lista de DTOs de Resposta (FuncaoResponse[]).
   * @param funcoes Lista de entidades Funcao.
   * @returns Lista de DTOs de resposta.
   */
  static toListFuncaoResponse(funcoes: Funcao[] = []): FuncaoResponse[] {
    // Converte lista de entidades para lista de responses.
    return plainToInstance(FuncaoResponse, funcoes, {
      excludeExtraneousValues: true,
    });
  }
}
