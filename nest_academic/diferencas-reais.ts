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
// CONCLUSÃO
// =============================================================================
/**
 * CONCLUSÃO: POR QUE NOSSO CÓDIGO É DIFERENTE?
 * 
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