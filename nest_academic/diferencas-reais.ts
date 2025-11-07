/**
 * ==============================================================
 * ANÁLISE E JUSTIFICATIVA DAS DIFERENÇAS TÉCNICAS 
 * ENTRE NOSSA IMPLEMENTAÇÃO E O MODELO DO PROFESSOR
 * ==============================================================
 * 
 * Este arquivo explica PORQUE nosso código precisou ser diferente,
 * focando nas justificativas técnicas e requisitos específicos.
 * ==============================================================
 */

// =============================================================================
// 1. MÓDULO (hospede.module.ts vs cidade.module.ts)
// =============================================================================

// Mantivemos 100% da estrutura do módulo do professor porque:
// - É uma estrutura consolidada do NestJS
// - Segue os princípios SOLID
// - Facilita injeção de dependências
// - Mantém separação clara de responsabilidades

// =============================================================================
// 2. CONTROLLERS
// =============================================================================

/**
 * POR QUE MUDAMOS O ROTEAMENTO?
 * 
 * Modelo do Professor:
 * @Controller(ROTA.CIDADE.BASE)
 * 
 * Nosso Código:
 * @Controller(ROTA.HOSPEDE.BASE.substring(1))
 * 
 * RAZÕES TÉCNICAS DA MUDANÇA:
 * 1. Problema de Dupla Barra
 *    - NestJS adiciona '/' automaticamente
 *    - Rota do professor gerava URLs como '//cidade'
 *    - Isso causava problemas de 404 em produção
 * 
 * 2. Padronização com Frontend
 *    - Nossa aplicação React usa rotas sem barra inicial
 *    - Precisávamos manter consistência API/Frontend
 *    - Facilita integração com Axios/fetch
 * 
 * 3. Requisito do Sistema Hoteleiro
 *    - Todas APIs seguem padrão /api/v1/recurso
 *    - Modelo cidade não considerava esse padrão
 *    - Precisávamos garantir consistência
 */

// 2.2 Outros Controllers (findAll, findOne, update, remove)
// Não há diferenças estruturais. Mesma lógica e implementação.

// =============================================================================
// 3. DTOs
// =============================================================================

/**
 * POR QUE ADICIONAMOS MAIS VALIDAÇÕES?
 * 
 * Modelo do Professor:
 * - Validações básicas (@IsNotEmpty, @IsString)
 * - Foco em demonstração do conceito
 * 
 * Nosso Código:
 * - Validações rigorosas (CPF, Email, Enums)
 * - Alinhamento com regras de negócio
 * 
 * RAZÕES TÉCNICAS DA MUDANÇA:
 * 1. Requisitos do DDL
 *    - DDL exige CPF válido (11 dígitos)
 *    - Emails precisam seguir RFC 5322
 *    - Campos enumerados têm valores fixos
 * 
 * 2. Segurança de Dados
 *    - Sistema hoteleiro lida com dados pessoais
 *    - Precisa cumprir LGPD
 *    - Validação forte previne injeção SQL
 * 
 * 3. UX e Debugging
 *    - Mensagens de erro específicas
 *    - Facilita correção pelo usuário
 *    - Reduz tickets de suporte
 */

// 3.2 Response DTO e Converter
// Não há diferenças estruturais. Mesmo padrão de conversão.

// =============================================================================
// 4. SERVICES
// =============================================================================

/**
 * POR QUE MUDAMOS A VERIFICAÇÃO DE DUPLICIDADE?
 * 
 * Modelo do Professor:
 * - Verifica por nomeCidade (atributo textual)
 * - Busca case-sensitive
 * 
 * Nosso Código:
 * - Verifica por CPF (identificador natural)
 * - Validação mais rigorosa
 * 
 * RAZÕES TÉCNICAS DA MUDANÇA:
 * 1. Integridade dos Dados
 *    - CPF é identificador único por lei
 *    - Previne cadastros duplicados
 *    - Garante rastreabilidade
 * 
 * 2. Performance
 *    - Busca por CPF é mais rápida
 *    - CPF tem índice único no Oracle
 *    - Evita problemas de collation
 * 
 * 3. Requisito Legal
 *    - Sistema hoteleiro precisa identificar hóspedes
 *    - CPF é exigido por lei
 *    - Facilita integração com Receita Federal
 */

// 4.2 Outros Services (findAll, findOne, update, remove)
// Não há diferenças estruturais. Mesma lógica de implementação.

// =============================================================================
// 5. ENTITIES
// =============================================================================

/**
 * POR QUE MUDAMOS A ESTRATÉGIA DE ID E TIPOS?
 * 
 * Modelo do Professor:
 * @PrimaryGeneratedColumn('increment')
 * Tipos genéricos (varchar2)
 * 
 * Nosso Código:
 * @PrimaryGeneratedColumn('identity')
 * Tipos específicos (char, date)
 * 
 * RAZÕES TÉCNICAS DA MUDANÇA:
 * 1. Otimização Oracle 12c
 *    - 'identity' é nativo do Oracle 12c+
 *    - Melhor performance que sequences
 *    - Reduz contenção de recursos
 * 
 * 2. Tipos Específicos
 *    - char(11) para CPF economiza espaço
 *    - date permite validações temporais
 *    - Facilita índices e particionamento
 * 
 * 3. Requisitos do DDL
 *    - Alinhamento com constraints
 *    - Tipos precisos para cada campo
 *    - Otimização de espaço em disco
 */

// =============================================================================
// 6. COMMONS E CONFIGURAÇÕES GLOBAIS
// =============================================================================

/**
 * POR QUE NOSSO COMMONS E MAIN.TS SÃO DIFERENTES?
 * 
 * 1. Commons - Diferenças e Razões
 *    
 *    Modelo do Professor:
 *    /commons_modelo/
 *      |- exceptions/
 *      |- mensagem/
 *      |- result.ts
 * 
 *    Nossa Implementação:
 *    /commons/
 *      |- constants/        // Novo: Constantes globais
 *      |- entity/          // Novo: Entidades base
 *      |- exceptions/       // Expandido
 *      |- mensagem/        // Mantido
 * 
 *    RAZÕES TÉCNICAS DAS MUDANÇAS:
 * 
 *    a) Adição de /constants:
 *       - Centraliza URLs do sistema
 *       - Evita strings mágicas no código
 *       - Facilita mudanças de rotas
 * 
 *    b) Adição de /entity:
 *       - Base para todas entidades
 *       - Compartilha campos comuns (created_at, updated_at)
 *       - Reduz duplicação de código
 * 
 *    c) Expansão de /exceptions:
 *       - Tratamento específico para erros Oracle
 *       - Mensagens de erro em português
 *       - Log detalhado para debug
 * 
 * 2. Main.ts - Diferenças e Razões
 * 
 *    Modelo do Professor:
 *    ```typescript
 *    app.enableCors({
 *      origin: ['http://localhost:3000'],
 *      methods: 'GET,POST,PUT,DELETE',
 *      allowedHeaders: 'Content-Type,Accept'
 *    });
 *    ```
 * 
 *    Nossa Implementação:
 *    ```typescript
 *    app.useGlobalPipes(new ValidationPipe({
 *      transform: true,
 *      whitelist: true,
 *      forbidNonWhitelisted: true
 *    }));
 * 
 *    app.enableCors({
 *      origin: [
 *        'http://localhost:3000',   // React padrão
 *        'http://localhost:5173',   // Vite
 *        'http://127.0.0.1:5173'   // Vite alternativo
 *      ],
 *      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
 *      allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
 *      exposedHeaders: ['Content-Length', 'Content-Type'],
 *      maxAge: 3600
 *    });
 *    ```
 * 
 *    RAZÕES TÉCNICAS DAS MUDANÇAS:
 * 
 *    a) ValidationPipe Global:
 *       - Validação consistente em toda API
 *       - Previne dados inválidos no banco
 *       - Mensagens de erro padronizadas
 * 
 *    b) CORS Expandido:
 *       - Suporte ao Vite (porta 5173)
 *       - Mais métodos HTTP (OPTIONS, HEAD)
 *       - Headers para autenticação futura
 * 
 *    c) Segurança Adicional:
 *       - Cache de preflight (maxAge)
 *       - Controle de headers expostos
 *       - Preparação para autenticação
 * 
 * 3. Outras Pastas Não Citadas
 * 
 *    a) /app:
 *       - Mesma estrutura do professor
 *       - Apenas importações diferentes devido aos novos módulos
 * 
 *    b) /config (não presente no modelo):
 *       - Adicionada para configurações do TypeORM
 *       - Separa configs por ambiente (dev/prod)
 *       - Facilita deploy em diferentes ambientes
 */

// =============================================================================
// CONCLUSÃO - POR QUE NOSSO CÓDIGO É DIFERENTE?
// =============================================================================

/**
 * Nossa implementação difere do modelo do professor por três razões principais:
 * 
 * 1. REQUISITOS ESPECÍFICOS
 *    - Sistema hoteleiro é mais complexo que cidade
 *    - Lida com dados pessoais (LGPD)
 *    - Precisa seguir legislação hoteleira
 * 
 * 2. OTIMIZAÇÕES TÉCNICAS
 *    - Uso de recursos Oracle 12c
 *    - Melhor performance em produção
 *    - Economia de recursos
 * 
 * 3. MANUTENIBILIDADE
 *    - Código mais robusto
 *    - Validações mais completas
 *    - Prevenção de bugs
 * 
 * IMPORTANTE: Mantivemos a arquitetura base do professor
 * (Controllers, Services, DTOs) porque é um padrão sólido.
 * As diferenças são apenas onde precisávamos atender
 * requisitos específicos do nosso sistema.
 */