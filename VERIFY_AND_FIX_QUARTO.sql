-- ======================================================================
-- SCRIPT DE VERIFICAÇÃO E CORREÇÃO - TABELA COCAO_QUARTO
-- ======================================================================
-- OBJETIVO: Verificar se há dados em COCAO_QUARTO e popular se estiver vazia

-- 1. VERIFICAR quantos quartos existem
SELECT COUNT(*) AS TOTAL_QUARTOS FROM COCAO_QUARTO;

-- 2. LISTAR todos os quartos existentes (para debug)
SELECT * FROM COCAO_QUARTO;

-- 3. VERIFICAR se COCAO_TIPO_QUARTO tem dados (precisa ter para FK)
SELECT COUNT(*) AS TOTAL_TIPOS FROM COCAO_TIPO_QUARTO;
SELECT * FROM COCAO_TIPO_QUARTO;

-- ======================================================================
-- SE NÃO HÁ DADOS, EXECUTE ISTO PARA POPULAR:
-- ======================================================================

-- OPÇÃO 1: Delete tudo e insira de novo (se quarto está vazio)
DELETE FROM COCAO_QUARTO;
COMMIT;

-- Agora insira os dados
INSERT INTO COCAO_QUARTO (CODIGO_TIPO_QUARTO, NUMERO, ANDAR, STATUS_QUARTO)
VALUES (1001, 101, 1, 'LIVRE');

INSERT INTO COCAO_QUARTO (CODIGO_TIPO_QUARTO, NUMERO, ANDAR, STATUS_QUARTO)
VALUES (1002, 201, 2, 'LIVRE');

INSERT INTO COCAO_QUARTO (CODIGO_TIPO_QUARTO, NUMERO, ANDAR, STATUS_QUARTO)
VALUES (1005, 301, 3, 'LIVRE');

INSERT INTO COCAO_QUARTO (CODIGO_TIPO_QUARTO, NUMERO, ANDAR, STATUS_QUARTO)
VALUES (1003, 102, 1, 'OCUPADO');

INSERT INTO COCAO_QUARTO (CODIGO_TIPO_QUARTO, NUMERO, ANDAR, STATUS_QUARTO)
VALUES (1004, 202, 2, 'MANUTENCAO');

COMMIT;

-- ======================================================================
-- VERIFICAR se inseriu com sucesso
-- ======================================================================
SELECT COUNT(*) AS TOTAL_QUARTOS_APOS_INSERCAO FROM COCAO_QUARTO;
SELECT * FROM COCAO_QUARTO;

-- ======================================================================
-- SE AINDA ASSIM NÃO APARECER, TESTE A API DIRETAMENTE:
-- ======================================================================
-- Use Postman ou curl:
-- GET http://localhost:8000/rest/sistema/v1/quarto/listar

