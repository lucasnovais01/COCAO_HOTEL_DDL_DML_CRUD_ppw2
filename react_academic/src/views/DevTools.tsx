// src/views/DevTools.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import type { ReactNode } from "react";

const mockApi: { [key: string]: any[] } = {
  usuarios: [
    { ID_USUARIO: 1, NOME_HOSPEDE: "João Silva Santos", CPF: "12345678901", RG: "MG1234567", SEXO: "M", DATA_NASCIMENTO: "1985-03-15", EMAIL: "joao@email.com", TELEFONE: "(11) 99999-1234", TIPO: 1, ATIVO: true },
    { ID_USUARIO: 2, NOME_HOSPEDE: "Maria Oliveira", CPF: "98765432109", RG: "SP9876543", SEXO: "F", DATA_NASCIMENTO: "1990-07-22", EMAIL: "maria@email.com", TELEFONE: "(11) 88888-5678", TIPO: 0, ATIVO: true },
  ],
  hospedes: [
    { ID_USUARIO: 1, NOME_HOSPEDE: "Ana Lima", CPF: "11122233344", RG: "RJ111222", SEXO: "F", DATA_NASCIMENTO: "1995-05-10", EMAIL: "ana@email.com", TELEFONE: "(21) 98765-4321", TIPO: 0, ATIVO: true },
  ],
  funcionarios: [
    { ID_USUARIO: 1, NOME_LOGIN: "gerente", CODIGO_FUNCAO: 1, DATA_CONTRATACAO: "2023-10-15", ATIVO: true },
  ],
  funcoes: [
    { CODIGO_FUNCAO: 1, NOME_FUNCAO: "Gerente Geral", DESCRICAO: "Gestão geral", NIVEL_ACESSO: 3 },
  ],
  tiposQuarto: [
    { CODIGO_TIPO_QUARTO: 1, NOME_TIPO: "Standard", CAPACIDADE_MAXIMA: 2, VALOR_DIARIA: 250.00 },
  ],
  quartos: [
    { ID_QUARTO: 1, NUMERO: "201", CODIGO_TIPO_QUARTO: 1, STATUS_QUARTO: "LIVRE", ANDAR: "2º" },
  ],
  statusReserva: [
    { CODIGO_STATUS: 1, DESCRICAO: "Confirmada" },
  ],
  reservas: [
    { ID_RESERVA: 1, ID_USUARIO: 2, ID_QUARTO: 1, DATA_CHECK_IN: "2025-11-01", DATA_CHECK_OUT: "2025-11-05", NUMERO_HOSPEDES: 2, VALOR_TOTAL: 1250.00, NUMERO_DIARIAS: 5, CODIGO_STATUS: 1 },
  ],
  servicos: [
    { CODIGO_SERVICO: 1, NOME_SERVICO: "Café da Manhã", PRECO: 25.00, ATIVO: true },
  ],
  hospedeServico: [
    { ID_SOLICITACAO: 1, ID_USUARIO: 2, CODIGO_SERVICO: 1, ID_RESERVA: 1, DATA_SOLICITACAO: "2025-11-01", QUANTIDADE: 2 },
  ],
};

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

export default function DevTools() {
  const [activeTab, setActiveTab] = useState("usuarios");
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  // Toggle this to false to fetch from backend instead of using mock data
  const USE_MOCK = true;

  // apiData holds either mock data (default) or remote data when fetching
  const [apiData, setApiData] = useState<{ [key: string]: any[] }>(mockApi);

  const currentTab = tabs.find(t => t.key === activeTab)!;
  let data: any[] = [];

  // If 'usuarios' tab, merge users/hospedes/funcionarios and deduplicate by ID_USUARIO
  if (activeTab === "usuarios") {
    const map = new Map<number | string, any>();

    const pushIfNew = (item: any) => {
      const id = item?.ID_USUARIO;
      if (id == null) return;
      if (!map.has(id)) map.set(id, item);
      else {
        // merge missing fields from item into existing entry
        const existing = map.get(id);
        map.set(id, { ...item, ...existing });
      }
    };

    (apiData.usuarios || []).forEach(pushIfNew);
    (apiData.hospedes || []).forEach(pushIfNew);
    // map funcionarios to user-like shape before pushing
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

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // When not using mock, fetch the current tab's data from backend
  useEffect(() => {
    if (USE_MOCK) return;
    const fetchData = async () => {
      try {
        const url = `/${activeTab}`; // expects backend endpoints like /usuarios, /hospedes, /funcionarios...
        const res = await axios.get(url);
        setApiData(prev => ({ ...prev, [activeTab]: res.data }));
      } catch (err) {
        console.error(err);
        showToast('Erro ao carregar dados do servidor', 'error');
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleCreate = () => showToast("Funcionalidade de criação em desenvolvimento", "success");
  const handleEdit = (id: number) => showToast(`Editar item ID: ${id}`, "success");
  const handleDelete = (id: number) => {
    if (confirm(`Tem certeza que deseja excluir o item ID: ${id}?`)) {
      showToast(`Item ID ${id} excluído com sucesso!`, "success");
    }
  };

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

  return (
    <div className="devtools-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <div className="container flex items-center space-x-2 text-sm">
          <a href="/" className="text-blue-600 hover:text-blue-700">Home</a>
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