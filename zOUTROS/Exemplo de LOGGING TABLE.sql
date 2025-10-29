CREATE TABLE COCAO_LOG (
    ID_LOG NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    DATA_EVENTO DATE DEFAULT TRUNC(SYSDATE) NOT NULL,
    TIPO_EVENTO VARCHAR2(20) NOT NULL, -- Ex.: 'INSERT', 'UPDATE', 'DELETE'
    TABELA VARCHAR2(30) NOT NULL, -- Ex.: 'COCAO_HOSPEDE', 'COCAO_RESERVA'
    ID_REGISTRO NUMBER, -- ID do registro afetado
    DESCRICAO VARCHAR2(4000), -- Detalhes do evento
    USUARIO VARCHAR2(100), -- Quem realizou a ação
    CREATED_AT TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL
);
/
-- Comentário: Tabela para registrar eventos de auditoria (inserções, atualizações, exclusões).





-- ######################################################################
-- #         SCRIPT DDL: SISTEMA HOTEL COCAO (V14.10) - PARTE 2/3       #
-- ######################################################################
-- Sistema de gerenciamento de hotel com controle de auditoria
-- Autor: Lucas Novais de Oliveira
-- Data: Outubro 2025
-- Parte 2/3: Triggers de Auditoria (T01 a T09)
-- Notas:
-- - Triggers renomeados conforme solicitação para seguir padrão COCAO_HOTEL_TRG_AUDITORIA_XX_...
-- - Adicionado novo trigger T02 (COCAO_HOTEL_TRG_AUDITORIA_02_FUNCAO) para COCAO_FUNCAO
-- - Numeração (01 a 09) segue a ordem presumida dos CREATE TABLE:
--   01: COCAO_HOSPEDE, 02: COCAO_FUNCAO, 03: COCAO_FUNCIONARIO, 04: COCAO_TIPO_QUARTO,
--   05: COCAO_QUARTO, 06: COCAO_STATUS_RESERVA, 07: COCAO_RESERVA, 08: COCAO_SERVICO,
--   09: COCAO_HOSPEDE_SERVICO
-- - Cada trigger registra eventos (INSERT, UPDATE, DELETE) na tabela COCAO_LOG
-- - Relação COCAO_FUNCAO ↔ COCAO_FUNCIONARIO mantida como 1:1 (conforme V14.10)
-- - Nenhuma alteração nas tabelas ou triggers de integridade (Parte 3/3)
-- ######################################################################

-- T01: Auditoria para COCAO_HOSPEDE
CREATE OR REPLACE TRIGGER COCAO_HOTEL_TRG_AUDITORIA_01_HOSPEDE
AFTER INSERT OR UPDATE OR DELETE ON COCAO_HOSPEDE
FOR EACH ROW
DECLARE
    v_tipo_evento VARCHAR2(20);
    v_descricao VARCHAR2(4000);
BEGIN
    IF INSERTING THEN
        v_tipo_evento := 'INSERT';
        v_descricao := 'Novo hóspede: ID=' || :NEW.ID_HOSPEDE || ', NOME=' || :NEW.NOME || ', CPF=' || :NEW.CPF;
    ELSIF UPDATING THEN
        v_tipo_evento := 'UPDATE';
        v_descricao := 'Hóspede atualizado: ID=' || :NEW.ID_HOSPEDE || 
                       ', NOME de ' || :OLD.NOME || ' para ' || :NEW.NOME || 
                       ', CPF de ' || :OLD.CPF || ' para ' || :NEW.CPF;
    ELSIF DELETING THEN
        v_tipo_evento := 'DELETE';
        v_descricao := 'Hóspede excluído: ID=' || :OLD.ID_HOSPEDE || ', NOME=' || :OLD.NOME || ', CPF=' || :OLD.CPF;
    END IF;

    INSERT INTO COCAO_LOG (TIPO_EVENTO, TABELA, ID_REGISTRO, DESCRICAO, USUARIO)
    VALUES (v_tipo_evento, 'COCAO_HOSPEDE', NVL(:NEW.ID_HOSPEDE, :OLD.ID_HOSPEDE), v_descricao, USER);
END;
/

-- T02: Auditoria para COCAO_FUNCAO (Novo)
CREATE OR REPLACE TRIGGER COCAO_HOTEL_TRG_AUDITORIA_02_FUNCAO
AFTER INSERT OR UPDATE OR DELETE ON COCAO_FUNCAO
FOR EACH ROW
DECLARE
    v_tipo_evento VARCHAR2(20);
    v_descricao VARCHAR2(4000);
BEGIN
    IF INSERTING THEN
        v_tipo_evento := 'INSERT';
        v_descricao := 'Nova função: CODIGO=' || :NEW.CODIGO || ', DESCRICAO=' || :NEW.DESCRICAO;
    ELSIF UPDATING THEN
        v_tipo_evento := 'UPDATE';
        v_descricao := 'Função atualizada: CODIGO=' || :NEW.CODIGO || 
                       ', DESCRICAO de ' || :OLD.DESCRICAO || ' para ' || :NEW.DESCRICAO;
    ELSIF DELETING THEN
        v_tipo_evento := 'DELETE';
        v_descricao := 'Função excluída: CODIGO=' || :OLD.CODIGO || ', DESCRICAO=' || :OLD.DESCRICAO;
    END IF;

    INSERT INTO COCAO_LOG (TIPO_EVENTO, TABELA, ID_REGISTRO, DESCRICAO, USUARIO)
    VALUES (v_tipo_evento, 'COCAO_FUNCAO', NULL, v_descricao, USER);
END;
/

-- T03: Auditoria para COCAO_FUNCIONARIO
CREATE OR REPLACE TRIGGER COCAO_HOTEL_TRG_AUDITORIA_03_FUNCIONARIO
AFTER INSERT OR UPDATE OR DELETE ON COCAO_FUNCIONARIO
FOR EACH ROW
DECLARE
    v_tipo_evento VARCHAR2(20);
    v_descricao VARCHAR2(4000);
BEGIN
    IF INSERTING THEN
        v_tipo_evento := 'INSERT';
        v_descricao := 'Novo funcionário: ID=' || :NEW.ID_FUNCIONARIO || 
                       ', NOME=' || :NEW.NOME || ', CPF=' || :NEW.CPF || ', FUNCAO=' || :NEW.CODIGO;
    ELSIF UPDATING THEN
        v_tipo_evento := 'UPDATE';
        v_descricao := 'Funcionário atualizado: ID=' || :NEW.ID_FUNCIONARIO || 
                       ', NOME de ' || :OLD.NOME || ' para ' || :NEW.NOME || 
                       ', CPF de ' || :OLD.CPF || ' para ' || :NEW.CPF || 
                       ', FUNCAO de ' || :OLD.CODIGO || ' para ' || :NEW.CODIGO;
    ELSIF DELETING THEN
        v_tipo_evento := 'DELETE';
        v_descricao := 'Funcionário excluído: ID=' || :OLD.ID_FUNCIONARIO || 
                       ', NOME=' || :OLD.NOME || ', CPF=' || :OLD.CPF || ', FUNCAO=' || :OLD.CODIGO;
    END IF;

    INSERT INTO COCAO_LOG (TIPO_EVENTO, TABELA, ID_REGISTRO, DESCRICAO, USUARIO)
    VALUES (v_tipo_evento, 'COCAO_FUNCIONARIO', NVL(:NEW.ID_FUNCIONARIO, :OLD.ID_FUNCIONARIO), v_descricao, USER);
END;
/

-- T04: Auditoria para COCAO_TIPO_QUARTO
CREATE OR REPLACE TRIGGER COCAO_HOTEL_TRG_AUDITORIA_04_TIPO_QUARTO
AFTER INSERT OR UPDATE OR DELETE ON COCAO_TIPO_QUARTO
FOR EACH ROW
DECLARE
    v_tipo_evento VARCHAR2(20);
    v_descricao VARCHAR2(4000);
BEGIN
    IF INSERTING THEN
        v_tipo_evento := 'INSERT';
        v_descricao := 'Novo tipo de quarto: CODIGO=' || :NEW.CODIGO || 
                       ', DESCRICAO=' || :NEW.DESCRICAO || 
                       ', VALOR_DIARIA=' || :NEW.VALOR_DIARIA || 
                       ', CAPACIDADE_MAXIMA=' || :NEW.CAPACIDADE_MAXIMA;
    ELSIF UPDATING THEN
        v_tipo_evento := 'UPDATE';
        v_descricao := 'Tipo de quarto atualizado: CODIGO=' || :NEW.CODIGO || 
                       ', DESCRICAO de ' || :OLD.DESCRICAO || ' para ' || :NEW.DESCRICAO || 
                       ', VALOR_DIARIA de ' || :OLD.VALOR_DIARIA || ' para ' || :NEW.VALOR_DIARIA || 
                       ', CAPACIDADE_MAXIMA de ' || :OLD.CAPACIDADE_MAXIMA || ' para ' || :NEW.CAPACIDADE_MAXIMA;
    ELSIF DELETING THEN
        v_tipo_evento := 'DELETE';
        v_descricao := 'Tipo de quarto excluído: CODIGO=' || :OLD.CODIGO || 
                       ', DESCRICAO=' || :OLD.DESCRICAO || 
                       ', VALOR_DIARIA=' || :OLD.VALOR_DIARIA || 
                       ', CAPACIDADE_MAXIMA=' || :OLD.CAPACIDADE_MAXIMA;
    END IF;

    INSERT INTO COCAO_LOG (TIPO_EVENTO, TABELA, ID_REGISTRO, DESCRICAO, USUARIO)
    VALUES (v_tipo_evento, 'COCAO_TIPO_QUARTO', NULL, v_descricao, USER);
END;
/

-- T05: Auditoria para COCAO_QUARTO
CREATE OR REPLACE TRIGGER COCAO_HOTEL_TRG_AUDITORIA_05_QUARTO
AFTER INSERT OR UPDATE OR DELETE ON COCAO_QUARTO
FOR EACH ROW
DECLARE
    v_tipo_evento VARCHAR2(20);
    v_descricao VARCHAR2(4000);
BEGIN
    IF INSERTING THEN
        v_tipo_evento := 'INSERT';
        v_descricao := 'Novo quarto: ID=' || :NEW.ID_QUARTO || 
                       ', CODIGO_TIPO=' || :NEW.CODIGO || 
                       ', STATUS=' || :NEW.STATUS_QUARTO;
    ELSIF UPDATING THEN
        v_tipo_evento := 'UPDATE';
        v_descricao := 'Quarto atualizado: ID=' || :NEW.ID_QUARTO || 
                       ', CODIGO_TIPO de ' || :OLD.CODIGO || ' para ' || :NEW.CODIGO || 
                       ', STATUS de ' || :OLD.STATUS_QUARTO || ' para ' || :NEW.STATUS_QUARTO;
    ELSIF DELETING THEN
        v_tipo_evento := 'DELETE';
        v_descricao := 'Quarto excluído: ID=' || :OLD.ID_QUARTO || 
                       ', CODIGO_TIPO=' || :OLD.CODIGO || 
                       ', STATUS=' || :OLD.STATUS_QUARTO;
    END IF;

    INSERT INTO COCAO_LOG (TIPO_EVENTO, TABELA, ID_REGISTRO, DESCRICAO, USUARIO)
    VALUES (v_tipo_evento, 'COCAO_QUARTO', NVL(:NEW.ID_QUARTO, :OLD.ID_QUARTO), v_descricao, USER);
END;
/

-- T06: Auditoria para COCAO_STATUS_RESERVA
CREATE OR REPLACE TRIGGER COCAO_HOTEL_TRG_AUDITORIA_06_STATUS_RESERVA
AFTER INSERT OR UPDATE OR DELETE ON COCAO_STATUS_RESERVA
FOR EACH ROW
DECLARE
    v_tipo_evento VARCHAR2(20);
    v_descricao VARCHAR2(4000);
BEGIN
    IF INSERTING THEN
        v_tipo_evento := 'INSERT';
        v_descricao := 'Novo status de reserva: CODIGO=' || :NEW.CODIGO || 
                       ', DESCRICAO=' || :NEW.DESCRICAO;
    ELSIF UPDATING THEN
        v_tipo_evento := 'UPDATE';
        v_descricao := 'Status de reserva atualizado: CODIGO=' || :NEW.CODIGO || 
                       ', DESCRICAO de ' || :OLD.DESCRICAO || ' para ' || :NEW.DESCRICAO;
    ELSIF DELETING THEN
        v_tipo_evento := 'DELETE';
        v_descricao := 'Status de reserva excluído: CODIGO=' || :OLD.CODIGO || 
                       ', DESCRICAO=' || :OLD.DESCRICAO;
    END IF;

    INSERT INTO COCAO_LOG (TIPO_EVENTO, TABELA, ID_REGISTRO, DESCRICAO, USUARIO)
    VALUES (v_tipo_evento, 'COCAO_STATUS_RESERVA', NULL, v_descricao, USER);
END;
/

-- T07: Auditoria para COCAO_RESERVA
CREATE OR REPLACE TRIGGER COCAO_HOTEL_TRG_AUDITORIA_07_RESERVA
AFTER INSERT OR UPDATE OR DELETE ON COCAO_RESERVA
FOR EACH ROW
DECLARE
    v_tipo_evento VARCHAR2(20);
    v_descricao VARCHAR2(4000);
BEGIN
    IF INSERTING THEN
        v_tipo_evento := 'INSERT';
        v_descricao := 'Nova reserva: ID=' || :NEW.ID_RESERVA || 
                       ', HOSPEDE=' || :NEW.ID_HOSPEDE || 
                       ', QUARTO=' || :NEW.ID_QUARTO || 
                       ', CHECK_IN=' || TO_CHAR(:NEW.DATA_CHECK_IN, 'DD/MM/YYYY') || 
                       ', CHECK_OUT=' || TO_CHAR(:NEW.DATA_CHECK_OUT, 'DD/MM/YYYY') || 
                       ', STATUS=' || :NEW.CODIGO;
    ELSIF UPDATING THEN
        v_tipo_evento := 'UPDATE';
        v_descricao := 'Reserva atualizada: ID=' || :NEW.ID_RESERVA || 
                       ', HOSPEDE de ' || :OLD.ID_HOSPEDE || ' para ' || :NEW.ID_HOSPEDE || 
                       ', QUARTO de ' || :OLD.ID_QUARTO || ' para ' || :NEW.ID_QUARTO || 
                       ', CHECK_IN de ' || TO_CHAR(:OLD.DATA_CHECK_IN, 'DD/MM/YYYY') || 
                       ' para ' || TO_CHAR(:NEW.DATA_CHECK_IN, 'DD/MM/YYYY') || 
                       ', CHECK_OUT de ' || TO_CHAR(:OLD.DATA_CHECK_OUT, 'DD/MM/YYYY') || 
                       ' para ' || TO_CHAR(:NEW.DATA_CHECK_OUT, 'DD/MM/YYYY') || 
                       ', STATUS de ' || :OLD.CODIGO || ' para ' || :NEW.CODIGO;
    ELSIF DELETING THEN
        v_tipo_evento := 'DELETE';
        v_descricao := 'Reserva excluída: ID=' || :OLD.ID_RESERVA || 
                       ', HOSPEDE=' || :OLD.ID_HOSPEDE || 
                       ', QUARTO=' || :OLD.ID_QUARTO || 
                       ', CHECK_IN=' || TO_CHAR(:OLD.DATA_CHECK_IN, 'DD/MM/YYYY') || 
                       ', CHECK_OUT=' || TO_CHAR(:OLD.DATA_CHECK_OUT, 'DD/MM/YYYY') || 
                       ', STATUS=' || :OLD.CODIGO;
    END IF;

    INSERT INTO COCAO_LOG (TIPO_EVENTO, TABELA, ID_REGISTRO, DESCRICAO, USUARIO)
    VALUES (v_tipo_evento, 'COCAO_RESERVA', NVL(:NEW.ID_RESERVA, :OLD.ID_RESERVA), v_descricao, USER);
END;
/

-- T08: Auditoria para COCAO_SERVICO
CREATE OR REPLACE TRIGGER COCAO_HOTEL_TRG_AUDITORIA_08_SERVICO
AFTER INSERT OR UPDATE OR DELETE ON COCAO_SERVICO
FOR EACH ROW
DECLARE
    v_tipo_evento VARCHAR2(20);
    v_descricao VARCHAR2(4000);
BEGIN
    IF INSERTING THEN
        v_tipo_evento := 'INSERT';
        v_descricao := 'Novo serviço: CODIGO=' || :NEW.CODIGO || 
                       ', DESCRICAO=' || :NEW.DESCRICAO || 
                       ', PRECO=' || :NEW.PRECO || 
                       ', ATIVO=' || :NEW.ATIVO;
    ELSIF UPDATING THEN
        v_tipo_evento := 'UPDATE';
        v_descricao := 'Serviço atualizado: CODIGO=' || :NEW.CODIGO || 
                       ', DESCRICAO de ' || :OLD.DESCRICAO || ' para ' || :NEW.DESCRICAO || 
                       ', PRECO de ' || :OLD.PRECO || ' para ' || :NEW.PRECO || 
                       ', ATIVO de ' || :OLD.ATIVO || ' para ' || :NEW.ATIVO;
    ELSIF DELETING THEN
        v_tipo_evento := 'DELETE';
        v_descricao := 'Serviço excluído: CODIGO=' || :OLD.CODIGO || 
                       ', DESCRICAO=' || :OLD.DESCRICAO || 
                       ', PRECO=' || :OLD.PRECO || 
                       ', ATIVO=' || :OLD.ATIVO;
    END IF;

    INSERT INTO COCAO_LOG (TIPO_EVENTO, TABELA, ID_REGISTRO, DESCRICAO, USUARIO)
    VALUES (v_tipo_evento, 'COCAO_SERVICO', NULL, v_descricao, USER);
END;
/

-- T09: Auditoria para COCAO_HOSPEDE_SERVICO
CREATE OR REPLACE TRIGGER COCAO_HOTEL_TRG_AUDITORIA_09_HOSPEDE_SERVICO
AFTER INSERT OR UPDATE OR DELETE ON COCAO_HOSPEDE_SERVICO
FOR EACH ROW
DECLARE
    v_tipo_evento VARCHAR2(20);
    v_descricao VARCHAR2(4000);
BEGIN
    IF INSERTING THEN
        v_tipo_evento := 'INSERT';
        v_descricao := 'Novo serviço solicitado: HOSPEDE=' || :NEW.ID_HOSPEDE || 
                       ', SERVICO=' || :NEW.CODIGO || 
                       ', DATA=' || TO_CHAR(:NEW.DATA_SOLICITACAO, 'DD/MM/YYYY') || 
                       ', QUANTIDADE=' || :NEW.QUANTIDADE;
    ELSIF UPDATING THEN
        v_tipo_evento := 'UPDATE';
        v_descricao := 'Serviço solicitado atualizado: HOSPEDE=' || :NEW.ID_HOSPEDE || 
                       ', SERVICO de ' || :OLD.CODIGO || ' para ' || :NEW.CODIGO || 
                       ', DATA de ' || TO_CHAR(:OLD.DATA_SOLICITACAO, 'DD/MM/YYYY') || 
                       ' para ' || TO_CHAR(:NEW.DATA_SOLICITACAO, 'DD/MM/YYYY') || 
                       ', QUANTIDADE de ' || :OLD.QUANTIDADE || ' para ' || :NEW.QUANTIDADE;
    ELSIF DELETING THEN
        v_tipo_evento := 'DELETE';
        v_descricao := 'Serviço solicitado excluído: HOSPEDE=' || :OLD.ID_HOSPEDE || 
                       ', SERVICO=' || :OLD.CODIGO || 
                       ', DATA=' || TO_CHAR(:OLD.DATA_SOLICITACAO, 'DD/MM/YYYY') || 
                       ', QUANTIDADE=' || :OLD.QUANTIDADE;
    END IF;

    INSERT INTO COCAO_LOG (TIPO_EVENTO, TABELA, ID_REGISTRO, DESCRICAO, USUARIO)
    VALUES (v_tipo_evento, 'COCAO_HOSPEDE_SERVICO', :NEW.ID_HOSPEDE, v_descricao, USER);
END;
/











Tutorial Resumido: O que são os Triggers de Auditoria?
O que são?
Os triggers de auditoria (COCAO_HOTEL_TRG_AUDITORIA_01 a 09) são gatilhos em PL/SQL que registram automaticamente 
todas as operações de inserção, atualização e exclusão nas tabelas do sistema COCAO HOTEL na tabela COCAO_LOG. 

Cada trigger captura:

Tipo de evento: INSERT, UPDATE ou DELETE.
Tabela afetada: Nome da tabela (ex.: COCAO_HOSPEDE).
ID do registro: Chave primária do registro afetado (quando aplicável).
Descrição: Detalhes da operação (ex.: valores antigos e novos).
Usuário: Quem realizou a ação (via USER).
Data: Quando ocorreu (via TRUNC(SYSDATE) e SYSTIMESTAMP).

Por que são importantes?

Rastreabilidade: Permitem rastrear quem fez o quê e quando, útil para debugging e auditoria.
Segurança: Monitoram alterações em dados sensíveis (ex.: reservas, funcionários).
Aprendizado: Ensinam conceitos de triggers e auditoria em bancos de dados relacionais.

Como funcionam?
Cada trigger é acionado após uma operação (AFTER INSERT OR UPDATE OR DELETE) na respectiva tabela, inserindo um registro em COCAO_LOG com detalhes da ação. Por exemplo, se um hóspede é atualizado, o trigger COCAO_HOTEL_TRG_AUDITORIA_01_HOSPEDE registra o nome e CPF antigos e novos.

-- Exemplo de uso:

SELECT * FROM COCAO_LOG WHERE TABELA = 'COCAO_HOSPEDE_SERVICO';
-- Saída:
-- ID_LOG: 3
-- DATA_EVENTO: 23/10/2025
-- TIPO_EVENTO: INSERT
-- TABELA: COCAO_HOSPEDE_SERVICO
-- ID_REGISTRO: 1
-- DESCRICAO: Novo serviço solicitado: HOSPEDE=1, SERVICO=CAFE, DATA=23/10/2025, QUANTIDADE=10
-- USUARIO: HOTEL_USER
-- CREATED_AT: 23/10/2025 15:11:00