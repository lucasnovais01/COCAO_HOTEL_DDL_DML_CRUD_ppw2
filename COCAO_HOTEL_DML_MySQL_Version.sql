-- ######################################################################
-- #             SEED DATA: SISTEMA HOTEL COCAO (V15.0)                 #
-- ######################################################################

-- Obs: O MySQL ACEITA múltiplas tuplas com VALUES (...), (...), (...)
-- o que torna o processo muito mais simples que no Oracle.

-- A principal mudança foi a substituição do INSERT ALL (que não existe no MySQL) 
-- pelo padrão INSERT INTO ... VALUES, e a remoção das referências ao DATE '...' do Oracle, 
-- usando o formato de string padrão do MySQL.

-- ======================================================================
-- SEED DATA: TODAS AS LOOKUP TABLES (MYSQL COMPATÍVEL)
-- ======================================================================

-- COCAO_FUNCAO
INSERT INTO COCAO_FUNCAO (CODIGO_FUNCAO, NOME_FUNCAO, DESCRICAO, NIVEL_ACESSO) VALUES
(1001, 'Recepcionista', 'Atende hóspedes, faz check-in/check-out, gerencia reservas', 2),
(1002, 'Camareira', 'Limpeza e arrumação dos quartos', 1),
(1003, 'Gerente de Operações', 'Supervisão geral, gestão de pessoal e financeira', 3),
(1004, 'Cozinheiro', 'Preparação de refeições e gestão da cozinha', 1),
(1005, 'Manutenção', 'Reparos técnicos e infraestrutura', 1);

-- COCAO_STATUS_RESERVA
INSERT INTO COCAO_STATUS_RESERVA (CODIGO_STATUS, DESCRICAO) VALUES
(1, 'ABERTA'),
(2, 'ATIVA'),
(3, 'A_PAGAR'),
(4, 'FINALIZADA'),
(5, 'CANCELADA');

-- COCAO_TIPO_QUARTO
INSERT INTO COCAO_TIPO_QUARTO (CODIGO_TIPO_QUARTO, NOME_TIPO, CAPACIDADE_MAXIMA, VALOR_DIARIA) VALUES
(2001, 'Standard Single', 1, 150.00),
(2002, 'Standard Double', 2, 250.00),
(2003, 'Luxo Casal', 2, 450.00),
(2004, 'Suíte Master', 4, 800.00),
(2005, 'Dormitório Coletivo', 6, 80.00);

-- COCAO_SERVICO
INSERT INTO COCAO_SERVICO (CODIGO_SERVICO, NOME_SERVICO, PRECO, ATIVO) VALUES
(0101, 'Café da Manhã Extra', 35.00, 1),
(0102, 'Lavanderia (Peça)', 15.00, 1),
(0103, 'Frigobar (Consumo Médio)', 50.00, 1),
(0104, 'Estacionamento Diário', 25.00, 1),
(0105, 'Translado Aeroporto', 120.00, 1);

-- ======================================================================
-- 2. COCAO_HOSPEDE — Inserção Simples
-- =============================================================-========

INSERT INTO COCAO_HOSPEDE (NOME_HOSPEDE, CPF, RG, SEXO, DATA_NASCIMENTO, EMAIL, TELEFONE, TIPO) VALUES
('Ana Silva', '11122233344', '1234567', 'F', '1990-05-15', 'ana@email.com', '11987654321', 0),
('Pedro Santos', '22233344455', '2345678', 'M', '1985-10-20', 'pedro@email.com', '11976543210', 0),
('Carla Souza', '33344455566', '3456789', 'F', '1995-02-10', 'carla@email.com', '11965432109', 0),
('Marcos Oliveira', '44455566677', '4567890', 'M', '1980-12-05', 'marcos@email.com', '11954321098', 0),
('Julia Lima', '99988877766', '9876543', 'F', '1992-07-30', 'julia@email.com', '11999998888', 0);

-- =============================================================-========
-- 3. COCAO_FUNCIONARIO — Ligando aos IDs criados em HOSPEDE
-- =============================================================-========

INSERT INTO COCAO_FUNCIONARIO (ID_USUARIO, CODIGO_FUNCAO, NOME_LOGIN, SENHA, DATA_CONTRATACAO, ATIVO)
SELECT ID_USUARIO, 1001, 'carla.recep', 'senha123', '2023-01-10', 1
FROM COCAO_HOSPEDE WHERE CPF = '33344455566';

INSERT INTO COCAO_FUNCIONARIO (ID_USUARIO, CODIGO_FUNCAO, NOME_LOGIN, SENHA, DATA_CONTRATACAO, ATIVO)
SELECT ID_USUARIO, 1003, 'marcos.gerente', 'admin456', '2022-05-20', 1
FROM COCAO_HOSPEDE WHERE CPF = '44455566677';

-- =============================================================-========
-- 4. COCAO_QUARTO
-- =============================================================-========

INSERT INTO COCAO_QUARTO (CODIGO_TIPO_QUARTO, NUMERO, ANDAR, STATUS_QUARTO) VALUES
(2001, 101, 1, 'LIVRE'),
(2001, 102, 1, 'LIVRE'),
(2002, 201, 2, 'LIVRE'),
(2003, 301, 3, 'LIVRE'),
(2004, 401, 4, 'LIVRE');

-- =============================================================-========
-- 5. RESERVAS — usando subqueries para garantir integridade manual
-- =============================================================-========

-- Reserva 1: Ana no Quarto 101
INSERT INTO COCAO_RESERVA (ID_USUARIO, ID_QUARTO, DATA_CHECK_IN, DATA_CHECK_OUT, NUMERO_HOSPEDES)
SELECT h.ID_USUARIO, q.ID_QUARTO, '2025-11-10', '2025-11-15', 1
FROM COCAO_HOSPEDE h
JOIN COCAO_QUARTO q ON q.NUMERO = 101 AND q.ANDAR = 1
WHERE h.CPF = '11122233344';

-- Reserva 2: Pedro no Quarto 201
INSERT INTO COCAO_RESERVA (ID_USUARIO, ID_QUARTO, DATA_CHECK_IN, DATA_CHECK_OUT, NUMERO_HOSPEDES)
SELECT h.ID_USUARIO, q.ID_QUARTO, '2025-12-01', '2025-12-05', 2
FROM COCAO_HOSPEDE h
JOIN COCAO_QUARTO q ON q.NUMERO = 201 AND q.ANDAR = 2
WHERE h.CPF = '22233344455';

-- Reserva 3: Julia no Quarto 301
INSERT INTO COCAO_RESERVA (ID_USUARIO, ID_QUARTO, DATA_CHECK_IN, DATA_CHECK_OUT, NUMERO_HOSPEDES)
SELECT h.ID_USUARIO, q.ID_QUARTO, '2025-11-20', '2025-11-21', 2
FROM COCAO_HOSPEDE h
JOIN COCAO_QUARTO q ON q.NUMERO = 301 AND q.ANDAR = 3
WHERE h.CPF = '99988877766';

-- =============================================================-========
-- 6. SERVIÇOS — por CPF + DATA_SOLICITACAO
-- =============================================================-========

-- Ana: Café da manhã
INSERT INTO COCAO_HOSPEDE_SERVICO (ID_USUARIO, CODIGO_SERVICO, ID_RESERVA, DATA_SOLICITACAO, QUANTIDADE)
SELECT 
    h.ID_USUARIO, 
    0101, 
    r.ID_RESERVA, 
    '2025-11-11 08:00:00', 
    2
FROM COCAO_HOSPEDE h
JOIN COCAO_RESERVA r ON r.ID_USUARIO = h.ID_USUARIO
WHERE h.CPF = '11122233344' 
  AND DATE(r.DATA_CHECK_IN) = '2025-11-10';

-- Pedro: Lavanderia
INSERT INTO COCAO_HOSPEDE_SERVICO (ID_USUARIO, CODIGO_SERVICO, ID_RESERVA, DATA_SOLICITACAO, QUANTIDADE)
SELECT 
    h.ID_USUARIO, 
    0102, 
    r.ID_RESERVA, 
    '2025-12-02 14:00:00', 
    3
FROM COCAO_HOSPEDE h
JOIN COCAO_RESERVA r ON r.ID_USUARIO = h.ID_USUARIO
WHERE h.CPF = '22233344455' 
  AND DATE(r.DATA_CHECK_IN) = '2025-12-01';