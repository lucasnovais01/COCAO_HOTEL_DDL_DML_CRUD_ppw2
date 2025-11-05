// src/views/DevTools.tsx
import { useState } from "react";

const mockData = {
  usuarios: [
    { id: 1, nome: "João Silva", tipo: "Funcionário", email: "joao@hotel.com", ativo: true },
    { id: 2, nome: "Maria Costa", tipo: "Hóspede", email: "maria@email.com", ativo: true },
  ],
  hospedes: [
    { id: 1, nome: "Ana Lima", cpf: "123.456.789-00", telefone: "(11) 98765-4321", ativo: true },
  ],
  funcionarios: [
    { id: 1, nome: "Carlos Souza", cargo: "Gerente", ativo: true },
  ],
  funcoes: [
    { id: 1, nome: "Gerente", descricao: "Gerencia o hotel" },
    { id: 2, nome: "Recepcionista", descricao: "Atende hóspedes" },
  ],
  tipos_quarto: [
    { id: 1, nome: "Standard", capacidade: 2, preco: 180 },
    { id: 2, nome: "Luxo", capacidade: 4, preco: 450 },
  ],
  quartos: [
    { id: 1, numero: "101", tipo: "Standard", status: "LIVRE", andar: 1 },
    { id: 2, numero: "201", tipo: "Luxo", status: "OCUPADO", andar: 2 },
  ],
  reservas: [
    { id: 1, hospede: "Ana Lima", quarto: "101", checkin: "2025-04-01", checkout: "2025-04-05", status: "Confirmada" },
  ],
  servicos: [
    { id: 1, nome: "Café da Manhã", preco: 35, descricao: "Servido das 7h às 10h" },
  ],
  solicitacoes: [
    { id: 1, hospede: "Maria Costa", servico: "Limpeza Extra", data: "2025-04-02", status: "Pendente" },
  ],
};

const allTabs = [
  { key: "usuarios", label: "Usuários (Todos)" },
  { key: "hospedes", label: "Hóspedes" },
  { key: "funcionarios", label: "Funcionários" },
  { key: "funcoes", label: "Funções" },
  { key: "tipos_quarto", label: "Tipos de Quarto" },
  { key: "quartos", label: "Quartos" },
  { key: "reservas", label: "Reservas" },
  { key: "servicos", label: "Serviços" },
  { key: "solicitacoes", label: "Solicitações" },
];

export default function DevTools() {
  const [activeTab, setActiveTab] = useState("usuarios");
  const [searchTerm, setSearchTerm] = useState("");

  const currentData = mockData[activeTab as keyof typeof mockData] || [];
  const filteredData = currentData.filter((item: any) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="devtools-container">
      {/* BANNER */}
      <div className="devtools-header">
        <i className="fas fa-tools"></i>
        <h1>Dev Tools</h1>
        <p>Gerenciamento completo do sistema</p>
      </div>

      {/* BARRA DE AÇÃO: BUSCA + CRIAR */}
      <div className="devtools-actions">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-create">
          <i className="fas fa-plus"></i>
          <span>Criar Novo</span>
        </button>
      </div>

      {/* ABAS */}
      <div className="devtools-tabs">
        {allTabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab-button ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tab.key);
              setSearchTerm("");
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TABELA */}
      <div className="devtools-table-container">
        <table className="devtools-table">
          <thead>
            <tr>
              <th>ID</th>
              {activeTab === "usuarios" && (
                <>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Email</th>
                  <th>Status</th>
                </>
              )}
              {activeTab === "hospedes" && (
                <>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th>Status</th>
                </>
              )}
              {activeTab === "funcionarios" && (
                <>
                  <th>Nome</th>
                  <th>Cargo</th>
                  <th>Status</th>
                </>
              )}
              {activeTab === "funcoes" && (
                <>
                  <th>Nome</th>
                  <th>Descrição</th>
                </>
              )}
              {activeTab === "tipos_quarto" && (
                <>
                  <th>Nome</th>
                  <th>Capacidade</th>
                  <th>Preço</th>
                </>
              )}
              {activeTab === "quartos" && (
                <>
                  <th>Número</th>
                  <th>Tipo</th>
                  <th>Andar</th>
                  <th>Status</th>
                </>
              )}
              {activeTab === "reservas" && (
                <>
                  <th>Hóspede</th>
                  <th>Quarto</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Status</th>
                </>
              )}
              {activeTab === "servicos" && (
                <>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Descrição</th>
                </>
              )}
              {activeTab === "solicitacoes" && (
                <>
                  <th>Hóspede</th>
                  <th>Serviço</th>
                  <th>Data</th>
                  <th>Status</th>
                </>
              )}
              <th className="actions-col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={10} className="no-data">
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              filteredData.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  {activeTab === "usuarios" && (
                    <>
                      <td>{item.nome}</td>
                      <td>{item.tipo}</td>
                      <td>{item.email}</td>
                      <td>
                        <span className={`status-badge ${item.ativo ? "status-disponivel" : "status-inativo"}`}>
                          {item.ativo ? "Ativo" : "Inativo"}
                        </span>
                      </td>
                    </>
                  )}
                  {activeTab === "hospedes" && (
                    <>
                      <td>{item.nome}</td>
                      <td>{item.cpf}</td>
                      <td>{item.telefone}</td>
                      <td>
                        <span className="status-badge status-disponivel">Ativo</span>
                      </td>
                    </>
                  )}
                  {activeTab === "funcionarios" && (
                    <>
                      <td>{item.nome}</td>
                      <td>{item.cargo}</td>
                      <td>
                        <span className="status-badge status-disponivel">Ativo</span>
                      </td>
                    </>
                  )}
                  {activeTab === "funcoes" && (
                    <>
                      <td>{item.nome}</td>
                      <td>{item.descricao}</td>
                    </>
                  )}
                  {activeTab === "tipos_quarto" && (
                    <>
                      <td>{item.nome}</td>
                      <td>{item.capacidade}</td>
                      <td>R$ {item.preco}</td>
                    </>
                  )}
                  {activeTab === "quartos" && (
                    <>
                      <td>{item.numero}</td>
                      <td>{item.tipo}</td>
                      <td>{item.andar}º</td>
                      <td>
                        <span className={`status-badge ${item.status === "LIVRE" ? "status-disponivel" : "status-ocupado"}`}>
                          {item.status}
                        </span>
                      </td>
                    </>
                  )}
                  {activeTab === "reservas" && (
                    <>
                      <td>{item.hospede}</td>
                      <td>{item.quarto}</td>
                      <td>{item.checkin}</td>
                      <td>{item.checkout}</td>
                      <td>
                        <span className="status-badge status-disponivel">{item.status}</span>
                      </td>
                    </>
                  )}
                  {activeTab === "servicos" && (
                    <>
                      <td>{item.nome}</td>
                      <td>R$ {item.preco}</td>
                      <td>{item.descricao}</td>
                    </>
                  )}
                  {activeTab === "solicitacoes" && (
                    <>
                      <td>{item.hospede}</td>
                      <td>{item.servico}</td>
                      <td>{item.data}</td>
                      <td>
                        <span className={`status-badge ${item.status === "Pendente" ? "status-ocupado" : "status-disponivel"}`}>
                          {item.status}
                        </span>
                      </td>
                    </>
                  )}
                  <td className="actions">
                    <button className="btn-edit" title="Alterar">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn-delete" title="Excluir">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}