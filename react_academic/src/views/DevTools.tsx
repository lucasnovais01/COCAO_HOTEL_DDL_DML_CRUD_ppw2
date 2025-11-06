// ============================================================
// Parte 1 - Importações e Dependências
// ============================================================
// 1. Importa hooks essenciais do React (`useState`, `useEffect`) para gerenciar estado e efeitos colaterais.
// 2. Importa `axios` para realizar requisições HTTP ao backend quando o mock estiver desativado.
// 3. Importa `ReactNode` para tipagem de elementos renderizáveis em funções de formatação.
// 4. Importa ferramentas de navegação do React Router (`useNavigate`, `NavLink`) para redirecionamentos e links.
// 5. Importa constantes de rotas (`ROTA`) para padronizar URLs de navegação no sistema.

import { useState, useEffect } from "react";
import axios from "axios";
import type { ReactNode } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ROTA } from "../services/router/url";

// ============================================================
// Parte 2 - Configuração Inicial de Mock e Estrutura de Dados
// ============================================================
// 1. Define o objeto `mockApi` com dados simulados para todas as entidades do sistema.
// 2. Cada chave representa uma tabela/endpoint (ex: `usuarios`, `quartos`, `reservas`).
// 3. Os dados seguem o formato esperado pelo backend, permitindo prototipação sem conexão real.
// 4. Inclui comentários internos com exemplos desativados para expansão futura.
// 5. Serve como base para testes locais e demonstração da UI sem dependência de servidor.

const mockApi: { [key: string]: any[] } = {
  usuarios: [
    { ID_USUARIO: 1, 
      NOME_HOSPEDE: "João Silva Santos", 
      CPF: "12345678901", RG: "MG1234567", 
      SEXO: "M", DATA_NASCIMENTO: "1985-03-15", 
      EMAIL: "joao@email.com", 
      TELEFONE: "(11) 99999-1234", 
      TIPO: 1, 
      ATIVO: true },

    { ID_USUARIO: 2, 
      NOME_HOSPEDE: "Maria Oliveira", 
      CPF: "98765432109", 
      RG: "SP9876543", 
      SEXO: "F", 
      DATA_NASCIMENTO: "1990-07-22", 
      EMAIL: "maria@email.com", 
      TELEFONE: "(11) 88888-5678", 
      TIPO: 0, 
      ATIVO: true },
  ],

  funcoes: [
    { CODIGO_FUNCAO: 1, 
      NOME_FUNCAO: "Gerente Geral", 
      DESCRICAO: "Gestão geral", 
      NIVEL_ACESSO: 3 },
  ],
  tiposQuarto: [
    { CODIGO_TIPO_QUARTO: 1, 
      NOME_TIPO: "Standard", 
      CAPACIDADE_MAXIMA: 2, 
      VALOR_DIARIA: 250.00 },
  ],
  quartos: [
    { ID_QUARTO: 1, 
      NUMERO: "201", 
      CODIGO_TIPO_QUARTO: 1, 
      STATUS_QUARTO: "LIVRE", 
      ANDAR: "2º" },
  ],
  statusReserva: [
    { CODIGO_STATUS: 1, 
      DESCRICAO: "Confirmada" },
  ],
  reservas: [
    { ID_RESERVA: 1, 
      ID_USUARIO: 2, 
      ID_QUARTO: 1, 
      DATA_CHECK_IN: "2025-11-01", 
      DATA_CHECK_OUT: "2025-11-05", 
      NUMERO_HOSPEDES: 2, 
      VALOR_TOTAL: 1250.00, 
      NUMERO_DIARIAS: 5, 
      CODIGO_STATUS: 1 },
  ],
  servicos: [
    { CODIGO_SERVICO: 1, 
      NOME_SERVICO: "Café da Manhã", 
      PRECO: 25.00, 
      ATIVO: true },
  ],
  hospedeServico: [
    { ID_SOLICITACAO: 1, 
      ID_USUARIO: 2, 
      CODIGO_SERVICO: 1, 
      ID_RESERVA: 1, 
      DATA_SOLICITACAO: "2025-11-01", 
      QUANTIDADE: 2 },
  ],
};

// ============================================================
// Parte 3 - Definição das Abas da Interface
// ============================================================
// 1. Array `tabs` define todas as abas visíveis no painel DevTools.
// 2. Cada aba tem `key` (correspondente ao nome no `mockApi` ou endpoint), `label` (texto exibido) e `columns` (campos a mostrar).
// 3. Permite controle total sobre quais dados são exibidos em cada aba.
// 4. Facilita a manutenção: adicionar nova aba exige apenas uma nova entrada no array.
// 5. Usado tanto com mock quanto com dados reais do backend.

const tabs = [
  { key: "usuarios", label: "Usuários (Todos)", columns: ["ID_USUARIO", "NOME_HOSPEDE", "CPF", "RG", "SEXO", "DATA_NASCIMENTO", "EMAIL", "TELEFONE", "TIPO", "ATIVO"] },
  { key: "hospedes", label: "Hóspedes", columns: ["ID_USUARIO", "NOME_HOSPEDE", "CPF", "RG", "SEXO", "DATA_NASCIMENTO", "EMAIL", "TELEFONE", "ATIVO"] },
  { key: "funcionarios", label: "Funcionários", columns: ["ID_USUARIO", "NOME_LOGIN", "CODIGO_FUNCAO", "DATA_CONTRATACAO", "ATIVO"] },
  { key: "funcoes", label: "Funções", columns: ["CODIGO_FUNCAO", "NOME_FUNCAO", "DESCRICAO", "NIVEL_ACESSO"] },
  { key: "tipos-quarto", label: "Tipos de Quarto", columns: ["CODIGO_TIPO_QUARTO", "NOME_TIPO", "CAPACIDADE_MAXIMA", "VALOR_DIARIA"] },
  { key: "quartos", label: "Quartos", columns: ["ID_QUARTO", "NUMERO", "CODIGO_TIPO_QUARTO", "STATUS_QUARTO", "ANDAR"] },
  { key: "status-reserva", label: "Status Reserva", columns: ["CODIGO_STATUS", "DESCRICAO"] },
  { key: "reservas", label: "Reservas", columns: ["ID_RESERVA", "ID_USUARIO", "ID_QUARTO", "DATA_CHECK_IN", "DATA_CHECK_OUT", "NUMERO_HOSPEDES", "VALOR_TOTAL", "NUMERO_DIARIAS", "CODIGO_STATUS"] },
  { key: "servicos", label: "Serviços", columns: ["CODIGO_SERVICO", "NOME_SERVICO", "PRECO", "ATIVO"] },
  { key: "hospede-servico", label: "Solicitações", columns: ["ID_SOLICITACAO", "ID_USUARIO", "CODIGO_SERVICO", "ID_RESERVA", "DATA_SOLICITACAO", "QUANTIDADE"] },
];

// ============================================================
// Parte 4 - Início do Componente Principal e Estado Local
// ============================================================
// 1. Declaração do componente funcional `DevTools` com exportação padrão.
// 2. Inicializa estados com `useState`: aba ativa, termo de busca, toast de feedback e dados da API.
// 3. Usa `useNavigate` para redirecionamento programático (ex: edição de registro).
// 4. Define constante `USE_MOCK` como interruptor global entre dados reais e simulados.
// 5. Inicializa `apiData` com `mockApi` como fallback seguro quando não houver dados carregados.

export default function DevTools() {

  const [activeTab, setActiveTab] = useState("usuarios");
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const navigate = useNavigate();

  // Se colocar false, ativa chamadas reais ao backend, e se colocar true, usa dados mock em memória
  const USE_MOCK = false;

  // apiData contém dados mock (padrão) ou dados remotos carregados do backend
  const [apiData, setApiData] = useState<{ [key: string]: any[] }>(mockApi);

// ============================================================
// Parte 5 - Lógica de Preparação e Filtragem de Dados
// ============================================================
// 1. Busca a configuração da aba atual (`currentTab`) com base no `activeTab`.
// 2. Para a aba "usuarios", mescla hóspedes e funcionários, deduplicando por `ID_USUARIO`.
// 3. Aplica filtros específicos: hóspedes (`TIPO === 0`) e enriquecimento de funcionários com nome do hóspede.
// 4. Implementa busca global em todos os campos do item atual.
// 5. Garante que `filteredData` sempre contenha apenas os registros relevantes e buscados.

  const currentTab = tabs.find(t => t.key === activeTab)!;
  let data: any[] = [];

  // Se a aba for 'usuarios', mesclar users/hospedes/funcionarios e deduplicar por ID_USUARIO
  if (activeTab === "usuarios") {
    const map = new Map<number | string, any>();

    const pushIfNew = (item: any) => {
      const id = item?.ID_USUARIO;
      if (id == null) return;
      if (!map.has(id)) map.set(id, item);
      else {
        // mesclar campos faltantes do item no registro já existente
        const existing = map.get(id);
        map.set(id, { ...item, ...existing });
      }
    };

    (apiData.usuarios || []).forEach(pushIfNew);
    (apiData.hospedes || []).forEach(pushIfNew);
  // mapear funcionários para formato similar a usuário antes de inserir
    (apiData.funcionarios || []).forEach((f: any) => {
      const item = {
        ID_USUARIO: f.ID_USUARIO,
        NOME_HOSPEDE: f.NOME_LOGIN || f.NOME_HOSPEDE || "N/A",
        CPF: f.CPF ?? undefined,
        RG: f.RG ?? undefined,
        SEXO: f.SEXO ?? undefined,
        DATA_NASCIMENTO: f.DATA_NASCIMENTO ?? undefined,
        EMAIL: f.EMAIL ?? undefined,
        TELEFONE: f.TELEFONE ?? undefined,
        TIPO: 1,
        ATIVO: f.ATIVO ?? true,
      };
      pushIfNew(item);
    });

    data = Array.from(map.values());
  } else {
    data = apiData[activeTab] || [];

    // Filtro para hóspedes
    if (activeTab === "hospedes") {
      data = data.filter((d: any) => d.TIPO === 0);
    }

    // Filtro para funcionários (join com hospedes)
    if (activeTab === "funcionarios") {
      data = data.map((f: any) => {
        const h = apiData.usuarios.find((u: any) => u.ID_USUARIO === f.ID_USUARIO);
        return { ...f, NOME_HOSPEDE: h?.NOME_HOSPEDE || "N/A" };
      });
    }
  }

  const filteredData = data.filter((item: any) =>
    Object.values(item).some(v =>
      v?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

// ============================================================
// Parte 6 - Utilitário de Feedback Visual (Toast)
// ============================================================
// 1. Função `showToast` exibe mensagens temporárias de sucesso ou erro.
// 2. Define tipo do toast (`success` ou `error`) e limpa automaticamente após 3 segundos.
// 3. Usada por todas as ações de UI para dar feedback imediato ao usuário.
// 4. Centraliza o comportamento de notificações, evitando repetição de código.
// 5. Integrada diretamente nas funções de ação (criar, editar, excluir).

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

// ============================================================
// Parte 7 - Carregamento de Dados do Backend (quando USE_MOCK = false)
// ============================================================
// 1. `useEffect` monitora mudanças em `activeTab` e dispara requisições apenas se mock estiver desativado.
// 2. Define base URL do backend e mapeamento detalhado de abas para endpoints REST reais.
// 3. Suporta endpoints únicos ou múltiplos (ex: "usuarios" consulta dois endpoints).
// 4. Desembrulha envelope de resposta padrão do backend (`res.data.dados`) com fallback seguro.
// 5. Trata erros com toast e console, mantendo a UI estável mesmo com falhas de rede.

  // Quando NÃO usar mock, buscar os dados da aba atual no backend
  useEffect(() => {
    if (USE_MOCK) return;

    const BACKEND_BASE = 'http://localhost:8000'; // adjust if your API is hosted elsewhere

    // Mapear chaves locais das abas para endpoints REST no backend (caminho completo após o host)
    // Extremamente importante:

    const backendMap: { [key: string]: string | string[] } = {
      usuarios: ['/rest/sistema/v1/hospede/listar', '/rest/sistema/v1/funcionario/listar'],
      hospedes: '/rest/sistema/v1/hospede/listar',
      funcionarios: '/rest/sistema/v1/funcionario/listar',
      funcoes: '/rest/sistema/v1/funcao/listar',
      'tipos-quarto': '/rest/sistema/v1/tipo-quarto/listar',
      quartos: '/rest/sistema/v1/quarto/listar',
      'status-reserva': '/rest/sistema/v1/status-reserva/listar',
      reservas: '/rest/sistema/v1/reserva/listar',
      servicos: '/rest/sistema/v1/servico/listar',
      'hospede-servico': '/rest/sistema/v1/hospede-servico/listar',
    };

    const fetchData = async () => {
    try {
        const mapping = backendMap[activeTab];

        if (!mapping) {
          showToast('Endpoint backend não mapeado para esta aba', 'error');
          return;
        }

  // suportar endpoint único ou múltiplos (ex.: 'usuarios' que junta 2 endpoints)
  const endpoints = Array.isArray(mapping) ? mapping : [mapping];
  const results: any[] = [];

        for (const ep of endpoints) {
          const fullUrl = `${BACKEND_BASE}${ep}`;
          const res = await axios.get(fullUrl);
          // O backend normalmente devolve um envelope (ex.: { sucesso: true, dados: [...] })
          // portanto tentamos desembrulhar `res.data.dados` quando presente.
          const payload = res?.data?.dados ?? res?.data ?? [];
          // Se o payload não for array, colocamos no array para manter a uniformidade
          results.push(Array.isArray(payload) ? payload : [payload]);
        }

        // mesclar resultados (flatten) quando a aba consultou múltiplos endpoints
        const merged = ([] as any[]).concat(...results);

        setApiData(prev => ({ ...prev, [activeTab]: merged }));
      } catch (err) {
        console.error(err);
        showToast('Erro ao carregar dados do servidor', 'error');
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

// ============================================================
// Parte 8 - Funções de Ação do Usuário (CRUD Simulado)
// ============================================================
// 1. `handleCreate`: exibe toast informando que a criação está em desenvolvimento.
// 2. `handleEdit`: navega para tela de atualização via `ROTA` e exibe toast de confirmação.
// 3. `handleDelete`: solicita confirmação via `confirm()` e exibe toast de sucesso simulado.
// 4. Todas as funções mantêm feedback visual imediato via `showToast`.
// 5. Estrutura preparada para integração futura com chamadas reais ao backend.

  // Ao clicar no botão "Criar", mostra a mensagem de toast

  const handleCreate = () => showToast("Funcionalidade de criação em desenvolvimento", "success");

  // como tava antes:
  // const handleEdit = (id: number) => showToast(`Editar item ID: ${id}`, "success");
  const handleEdit = (id: number) => {
    try {
      // Navega para a rota de atualização de hóspede (adaptação direta)
      navigate(`${ROTA.HOSPEDE.ATUALIZAR}/${id}`);
    } catch (err) {
      console.error('Erro ao navegar:', err);
    }

    // O TOAST é importante para para feedback rápido (não deve ser removido), e eu gostei dele também
    showToast(`Editar item ID: ${id}`, "success");
  };
  const handleDelete = (id: number) => {
    if (confirm(`Tem certeza que deseja excluir o item ID: ${id}?`)) {
      showToast(`Item ID ${id} excluído com sucesso!`, "success");
    }
  };

// ============================================================
// Parte 9 - Formatação de Valores para Exibição
// ============================================================
// 1. Função `formatValue` recebe chave e valor, retornando representação amigável.
// 2. Converte booleanos para "Sim"/"Não", datas para formato brasileiro, valores monetários com R$.
// 3. Aplica badges estilizados para status de quarto com classes CSS específicas.
// 4. Retorna fallback "-" para valores nulos ou indefinidos.
// 5. Garante consistência visual em toda a tabela, independentemente da origem dos dados.

  const formatValue = (key: string, value: any): string | ReactNode => {
    if (value === true) return "Sim";
    if (value === false) return "Não";
    if (key.includes("DATA")) return new Date(value).toLocaleDateString("pt-BR");
    if (key.includes("VALOR") || key === "PRECO") return `R$ ${parseFloat(value).toFixed(2)}`;
    if (key === "STATUS_QUARTO") {
      const status = value === "LIVRE" ? "status-livre" : value === "OCUPADO" ? "status-ocupado" : "status-manutencao";
      return <span className={`status-badge ${status}`}>{value}</span>;
    }
    return value?.toString() || "-";
  };

// ============================================================
// Parte 10 - Renderização JSX (Estrutura Visual Completa)
// ============================================================
// 1. Container principal com classes semânticas para estilização.
// 2. Breadcrumb com navegação para dashboard e indicação de página atual.
// 3. Banner com ícone, título e subtítulo explicativo do propósito da ferramenta.
// 4. Seção de abas com rolagem horizontal e destaque visual da aba ativa.
// 5. Área principal com busca, botão de criação, tabela responsiva, ações por linha e toast flutuante.

  return (
    <div className="devtools-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <div className="container flex items-center space-x-2 text-sm">
          <NavLink 
            to="/sistema/dashboard"
            className="text-blue-600 hover:text-blue-700"
          >
            Home
          </NavLink>
          <i className="fas fa-chevron-right text-gray-400"></i>
          <span className="text-gray-600">Dev Tools</span>
        </div>
      </nav>

      {/* Banner */}
      <section className="devtools-banner">
        <div className="container text-center">
          <i className="fas fa-tools text-6xl mb-4"></i>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Dev Tools</h1>
          <p className="text-xl">Painel de Administração - Simulação DDL</p>
        </div>
      </section>

      {/* Tabs */}
      <section className="devtools-tabs">
        <div className="container">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`devtools-tab ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(tab.key);
                  setSearchTerm("");
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container py-8">
        {/* Toast */}
        {toast && (
          <div className="fixed top-20 right-4 z-50">
            <div className={`toast ${toast.type === "error" ? "error" : ""}`}>
              <div className="flex items-center">
                <i className={`fas ${toast.type === "success" ? "fa-check" : "fa-exclamation-triangle"} mr-2`}></i>
                <span>{toast.message}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tabela */}
        <div className="devtools-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">{currentTab.label}</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Buscar..."
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                <i className="fas fa-plus mr-1"></i>Criar
              </button>

            </div>
          </div>
          <div className="table-container">
            <table className="dev-table">
              <thead>
                <tr>
                  {currentTab.columns.map(col => (
                    <th key={col}>{col}</th>
                  ))}
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={currentTab.columns.length + 1} className="text-center py-4 text-gray-500">
                      Nenhum registro encontrado.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item: any) => {
                    const id = item.ID_USUARIO || item.ID_QUARTO || item.ID_RESERVA || item.CODIGO_FUNCAO || item.CODIGO_TIPO_QUARTO || item.CODIGO_STATUS || item.CODIGO_SERVICO || item.ID_SOLICITACAO;
                    return (
                      <tr key={id}>
                        {currentTab.columns.map(col => (
                          <td key={col}>{formatValue(col, item[col])}</td>
                        ))}

                        <td className="actions">

                          <button onClick={() => handleEdit(id)} className="btn-edit">
                            <i className="fas fa-edit"></i>
                          </button>

                          <button onClick={() => handleDelete(id)} className="btn-delete">
                            <i className="fas fa-trash"></i>
                          </button>

                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}