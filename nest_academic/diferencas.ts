/**
 * ==============================================================
 * DOCUMENTAÇÃO DE DIFERENÇAS ENTRE IMPLEMENTAÇÃO E MODELO
 * ==============================================================
 * 
 * IMPORTANTE:
 * - Este arquivo é puramente para documentação
 * - Os imports e códigos são apenas para referência
 * - Não é um arquivo executável
 * ==============================================================
 */

// =============================================================================
// 1. DIFERENÇAS NO MÓDULO (hospede.module.ts vs cidade.module.ts)
// =============================================================================

/**

/*
 * TUTORIAL: hospede.module.ts
 * O que é?
 * - O Módulo é o "contêiner" do NestJS para o recurso Hóspede.
 * ... documentação detalhada ...
 */

/**
 * DIFERENÇA: Adicionamos documentação detalhada explicando:
 * 1. O que é o módulo
 * 2. Para que serve cada seção (@Module decorators)
 * 3. Como segue o padrão do professor
 * 4. Tutorial completo para referência futura
 * 
 * JUSTIFICATIVA:
 * - O módulo Hóspede é central para o sistema hoteleiro
 * - Precisa ser bem documentado para manutenção futura
 * - Serve como referência para outros módulos do sistema
 * - Ajuda novos desenvolvedores a entenderem a estrutura
 * - A complexidade adicional do módulo Hóspede exige documentação mais detalhada
 */

// =============================================================================
// 2. DIFERENÇAS NOS CONTROLLERS (exemplo: create)
// =============================================================================

/**
 * DIFERENÇAS:
 * 1. Tratamento de Rotas:
 *    - Professor: Usa ROTA.CIDADE.BASE diretamente
 *    - Nossa: Remove barra inicial com substring(1) para evitar duplicação
 * 
 * 2. Organização de Endpoints:
 *    - Professor: Usa ROTA.CIDADE.CREATE direto
 *    - Nossa: Usa ROTA.HOSPEDE.ENDPOINTS.CREATE para melhor organização
 * 
 * 3. Documentação:
 *    - Professor: Comentários básicos sobre a funcionalidade
 *    - Nossa: Documentação extensa incluindo:
 *      * Histórico de tentativas e soluções
 *      * Explicação didática do controller
 *      * Tutorial sobre métodos String
 *      * Solução detalhada do problema de rotas 404
 * 
 * JUSTIFICATIVA DAS MUDANÇAS:
 * 1. Problemas de Rota:
 *    - Enfrentamos erro 404 devido à duplicação de prefixos
 *    - Solução com substring(1) mantém compatibilidade com NestJS
 * 
 * 2. Documentação Expandida:
 *    - Sistema hoteleiro mais complexo que cidade
 *    - Necessidade de manter histórico de decisões
 *    - Facilitar manutenção futura
 *    - Servir como referência para outros desenvolvedores
 * 
 * 3. Organização de Endpoints:
 *    - Maior número de rotas no sistema hoteleiro
 *    - Necessidade de melhor organização
 *    - Evitar duplicação de strings de rota
 */

// =============================================================================
// 3. DIFERENÇAS NOS DTOs (exemplo: Request)
// =============================================================================

/**
 * 3.1 VALIDAÇÕES E CONSTRAINTS
 * 
 * Modelo do Professor (cidade.request.ts):
 

export class CidadeRequest {
  @Type(() => Number)
  @IsOptional()
  idCidade?: number;

  @IsNotEmpty({ message: 'Código da ciadade deve ser informado' })
  @IsString({ message: 'o valor tem que ser somente texto' })
  @MaxLength(10)
  codCidade: string = '';

  // ... implementação simples com apenas 2 campos ...
}

*/

/**
 * Nossa Implementação (hospede.request.ts):
 

export class HospedeRequest {
  @IsNotEmpty({ message: 'Nome do hóspede deve ser informado' })
  @IsString({ message: 'Nome deve conter somente texto' })
  @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
  nomeHospede: string = '';

  @IsNotEmpty({ message: 'CPF deve ser informado' })
  @Matches(/^[0-9]{11}$/, { message: 'CPF inválido: apenas dígitos' })
  cpf: string = '';

  // ... implementação complexa com múltiplos campos e validações ...
}
*/

/**
 * DIFERENÇAS:
 * 1. Complexidade das Validações:
 *    - Professor: Validações básicas (IsNotEmpty, IsString, MaxLength)
 *    - Nossa: Validações avançadas incluindo:
 *      * Regex patterns (@Matches)
 *      * Validações de data (@IsDate)
 *      * Validações de email (@IsEmail)
 *      * Enums (@IsIn)
 *      * Conversões de tipo (@Type)
 * 
 * 2. Documentação:
 *    - Professor: Comentários básicos sobre campos opcionais
 *    - Nossa: Documentação completa incluindo:
 *      * Explicação do propósito do DTO
 *      * Relação com DDL do banco
 *      * Diferenças do modelo original
 *      * Tutorial de uso
 * 
 * 3. Mensagens de Erro:
 *    - Professor: Mensagens simples
 *    - Nossa: Mensagens detalhadas e específicas para cada tipo de erro
 * 
 * 4. Integração com Banco:
 *    - Professor: Foco na validação básica
 *    - Nossa: Alinhamento com constraints do DDL:
 *      * Tamanhos máximos
 *      * Padrões de regex
 *      * Campos nullable
 * 
 * JUSTIFICATIVA DAS MUDANÇAS:
 * 1. Complexidade do Domínio:
 *    - Sistema hoteleiro tem mais regras de negócio
 *    - Dados pessoais precisam de validação rigorosa
 *    - Necessidade de conformidade com DDL
 * 
 * 2. Documentação Expandida:
 *    - DTO é ponto crítico de entrada de dados
 *    - Necessidade de documentar relação com banco
 *    - Facilitar manutenção e debug
 * 
 * 3. Mensagens de Erro:
 *    - Melhor experiência para usuário final
 *    - Facilita depuração de problemas
 *    - Reduz tempo de suporte
 */

// =============================================================================
// 4. DIFERENÇAS NOS SERVICES (exemplo: Create)
// =============================================================================

/**
 * 4.1 ESTRUTURA E VALIDAÇÕES
 * 
 * Modelo do Professor (cidade.service.create.ts):


@Injectable()
export class CidadeServiceCreate {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
  ) {}

  async create(cidadeRequest: CidadeRequest): Promise<CidadeResponse | null> {
    let cidade = ConverterCidade.toCidade(cidadeRequest);

    const cidadeCadastrada = await this.cidadeRepository
      .createQueryBuilder('cidade')
      .where('cidade.nomeCidade =:nome', { nome: cidade.nomeCidade })
      .getOne();

    if (cidadeCadastrada) {
      throw new HttpException(
        'A cidade com o nome informado já está cadastrada',
        HttpStatus.BAD_REQUEST,
      );
    }

    // ... resto da implementação simples ...
  }
}

*/

/**
 * Nossa Implementação (hospede.service.create.ts):
 

@Injectable()
export class HospedeServiceCreate {
  constructor(
    @InjectRepository(Hospede)
    private hospedeRepository: Repository<Hospede>,
  ) {}

  async create(hospedeRequest: HospedeRequest): Promise<HospedeResponse | null> {
    let hospede = ConverterHospede.toHospede(hospedeRequest);

    const hospedeCadastrado = await this.hospedeRepository
      .createQueryBuilder('hospede')
      .where('hospede.cpf =:cpf', { cpf: hospede.cpf })
      .getOne();

    // ... resto da implementação com documentação detalhada ...
  }
}

*/

/**
 * DIFERENÇAS:
 * 1. Validação de Unicidade:
 *    - Professor: Verifica por nomeCidade
 *    - Nossa: Verifica por CPF (chave natural mais apropriada)
 * 
 * 2. Documentação:
 *    - Professor: 
 *      * Mantém código antigo comentado para referência
 *      * Comentários básicos sobre funcionalidade
 *    - Nossa:
 *      * Documentação completa em formato tutorial
 *      * Explicação do fluxo de operação
 *      * Integração com outros componentes
 * 
 * 3. Organização do Código:
 *    - Professor: 
 *      * Mantém código legado comentado
 *      * Foco na implementação atual
 *    - Nossa:
 *      * Separação clara de responsabilidades
 *      * Documentação da integração com TypeORM
 *      * Explicação das escolhas de design
 * 
 * JUSTIFICATIVA DAS MUDANÇAS:
 * 1. Regras de Negócio:
 *    - Sistema hoteleiro requer validações mais rigorosas
 *    - CPF é identificador natural mais adequado que nome
 *    - Necessidade de documentar fluxo complexo
 * 
 * 2. Manutenibilidade:
 *    - Documentação clara facilita manutenção
 *    - Tutorial ajuda novos desenvolvedores
 *    - Explicação do papel no contexto maior
 * 
 * 3. Integração:
 *    - Documentação da interação com outros componentes
 *    - Explicação do papel do converter
 *    - Clareza sobre fluxo de erros
 */

// =============================================================================
// 5. DIFERENÇAS NOS CONVERTERS
// =============================================================================

/**
 * 5.1 ESTRUTURA E IMPLEMENTAÇÃO
 * 
 * Modelo do Professor (cidade.converter.ts):
 

export class ConverterCidade {
  static toCidade(cidadeRequest: CidadeRequest) {
    const cidade = new Cidade();

    if (cidadeRequest.idCidade != null) {
      cidade.idCidade = cidadeRequest.idCidade;
    }
    cidade.nomeCidade = cidadeRequest.nomeCidade;
    cidade.codCidade = cidadeRequest.codCidade;

    return cidade;
  }

  static toCidadeResponse(cidade: Cidade): CidadeResponse {
    return plainToInstance(CidadeResponse, cidade, {
      excludeExtraneousValues: true,
    });
  }
}

*/

/**
 * Nossa Implementação (hospede.converter.ts):
 

export class ConverterHospede {
  static toHospede(hospedeRequest: HospedeRequest): Hospede {
    const hospede = new Hospede();

    if (hospedeRequest.idUsuario != null) {
      hospede.idUsuario = hospedeRequest.idUsuario;
    }

    // Campos obrigatórios
    hospede.nomeHospede = hospedeRequest.nomeHospede;
    hospede.cpf = hospedeRequest.cpf;
    // ... mais campos ...

    // Campos opcionais com verificação
    if (hospedeRequest.rg !== undefined) {
      hospede.rg = hospedeRequest.rg;
    }
    // ... mais campos opcionais ...

    return hospede;
  }

  static toHospedeResponse(hospede: Hospede): HospedeResponse {
    const inst = plainToInstance(HospedeResponse, hospede, {
      excludeExtraneousValues: true,
    });
    return instanceToPlain(inst) as unknown as HospedeResponse;
  }
}

*/

/**
 * DIFERENÇAS:
 * 1. Tratamento de Campos:
 *    - Professor: 
 *      * Mapeamento simples de 2-3 campos
 *      * Sem distinção entre obrigatórios/opcionais
 *    - Nossa:
 *      * Mapeamento extenso de múltiplos campos
 *      * Separação clara entre obrigatórios e opcionais
 *      * Verificação undefined para campos opcionais
 * 
 * 2. Serialização:
 *    - Professor:
 *      * Uso direto de plainToInstance
 *      * Implementação alternativa comentada
 *    - Nossa:
 *      * Processo em duas etapas com instanceToPlain
 *      * Documentação do processo de serialização
 *      * Explicação dos motivos das escolhas
 * 
 * 3. Documentação:
 *    - Professor:
 *      * Comentários básicos
 *      * Código não utilizado mantido comentado
 *    - Nossa:
 *      * Documentação completa do propósito
 *      * Tutorial de uso
 *      * Explicação das diferenças do modelo
 *      * Detalhes de integração
 * 
 * JUSTIFICATIVA DAS MUDANÇAS:
 * 1. Complexidade dos Dados:
 *    - Sistema hoteleiro tem mais campos
 *    - Necessidade de tratamento específico para opcionais
 *    - Garantia de integridade dos dados
 * 
 * 2. Segurança na Serialização:
 *    - Processo em duas etapas evita vazamento de dados
 *    - Melhor integração com TypeORM
 *    - Prevenção de problemas com metadados
 * 
 * 3. Manutenibilidade:
 *    - Documentação facilita entendimento
 *    - Tutorial ajuda novos desenvolvedores
 *    - Explicação das decisões técnicas
 */

// =============================================================================
// 6. DIFERENÇAS NAS ENTITIES
// =============================================================================

/**
 * 6.1 ESTRUTURA E MAPEAMENTO
 * 
 * Modelo do Professor (cidade.entity.ts):
 

@Entity('CIDADE')
export class Cidade extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'ID_CIDADE',
    type: 'number',
  })
  idCidade?: number = 0;

  @Column({
    name: 'COD_CIDADE',
    type: 'varchar2',
    length: 10,
  })
  codCidade: string = '';

  // ... implementação com 2-3 campos ...
}

*/

/**
 * Nossa Implementação (hospede.entity.ts):
 

@Entity('COCAO_HOSPEDE')
export class Hospede extends BaseEntity {
  @PrimaryGeneratedColumn('identity', {
    name: 'ID_USUARIO',
    type: 'number',
  })
  idUsuario?: number;

  @Column({
    name: 'NOME_HOSPEDE',
    type: 'varchar2',
    length: 100,
    nullable: false,
  })
  nomeHospede: string = '';

  // ... implementação com múltiplos campos ...
}

*/

/**
 * DIFERENÇAS:
 * 1. Geração de ID:
 *    - Professor: 
 *      * Usa 'increment' (genérico)
 *      * Inicializa ID com 0
 *    - Nossa:
 *      * Usa 'identity' (otimizado para Oracle 12c+)
 *      * Sem inicialização (gerenciado pelo banco)
 * 
 * 2. Definição de Campos:
 *    - Professor:
 *      * Campos básicos sem nullable
 *      * Strings inicializadas com ''
 *    - Nossa:
 *      * Campos com nullable explícito
 *      * Inicialização seletiva
 *      * Tipos específicos do Oracle
 * 
 * 3. Documentação:
 *    - Professor:
 *      * Comentários básicos sobre PK
 *      * Foco no mapeamento simples
 *    - Nossa:
 *      * Documentação completa da tabela
 *      * Explicação das diferenças do modelo
 *      * Tutorial de uso
 *      * Detalhes de integração com Oracle
 * 
 * 4. Integridade com Banco:
 *    - Professor:
 *      * Mapeamento básico
 *      * Sem menção a constraints
 *    - Nossa:
 *      * Alinhamento com DDL
 *      * Documentação de constraints
 *      * Explicação de checks e validações
 * 
 * JUSTIFICATIVA DAS MUDANÇAS:
 * 1. Otimização Oracle:
 *    - Uso de 'identity' mais eficiente
 *    - Evita sequências extras
 *    - Reduz conflitos de ID
 * 
 * 2. Clareza de Código:
 *    - Nullable explícito documenta DDL
 *    - Inicialização seletiva evita valores desnecessários
 *    - Tipos específicos garantem compatibilidade
 * 
 * 3. Manutenibilidade:
 *    - Documentação facilita manutenção
 *    - Tutorial ajuda novos desenvolvedores
 *    - Explicação das decisões técnicas
 * 
 * 4. Robustez:
 *    - Alinhamento com DDL previne erros
 *    - Documentação de constraints ajuda debug
 *    - Melhor integração com banco de dados
 */

// Documentação concluída das principais diferenças entre implementação e modelo.
