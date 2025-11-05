// src/views/DevTools.tsx
import { useState } from "react";

const mockData = {
  usuarios: [
    { id: 1, nome: "João Silva", tipo: "Funcionário", ativo: true },
    { id: 2, nome: "Maria Costa", tipo: "Hóspede", ativo: true },
  ],
  quartos: [
    { id: 1, numero: "201", tipo: "Standard", status: "LIVRE" },
    { id: 2, numero: "301", tipo: "Luxo", status: "OCUPADO" },
  ],
  // Outras abas serão adicionadas depois
};

export default function DevTools() {
  const [activeTab, setActiveTab] = useState("usuarios");

  const tabs = [
    { key: "usuarios", label: "Usuários (Todos)" },
    { key: "hospedes", label: "Hóspedes" },
    { key: "funcionarios", label: "Funcionários" },
    { key: "quartos", label: "Quartos" },
    { key: "reservas", label: "Reservas" },
  ];

  return (
    <div className="devtools-page">
      {/* BANNER */}
      <section className="devtools-banner">
        <i className="fas fa-tools"></i>
        <h1>Dev Tools</h1>
        <p>Painel de Administração - Simulação DDL</p>
      </section>

      {/* TABS */}
      <div className="devtools-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`devtools-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TABELA */}
      <div className="devtools-card">
        <div className="table-container">
          <table className="devtools-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome/Número</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockData[activeTab as keyof typeof mockData]?.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nome || item.numero}</td>
                  <td>{item.tipo || "-"}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        item.status === "LIVRE"
                          ? "status-disponivel"
                          : item.status === "OCUPADO"
                          ? "status-ocupado"
                          : item.ativo
                          ? "status-disponivel"
                          : "status-inativo"
                      }`}
                    >
                      {item.status || (item.ativo ? "Ativo" : "Inativo")}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="btn-edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn-delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}