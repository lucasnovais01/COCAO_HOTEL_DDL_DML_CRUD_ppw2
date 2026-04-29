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
    <div className="container mx-auto px-4 py-12">
      {/* BANNER ESTILO ORIGINAL */}
      <section className="bg-gradient-to-r from-gray-600 to-gray-800 py-16 rounded-xl mb-12 text-center">
        <i className="fas fa-tools text-6xl text-white mb-4"></i>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Dev Tools</h1>
        <p className="text-xl text-gray-100">Painel de Administração - Simulação DDL</p>
      </section>

      {/* TABS ESTILO ORIGINAL */}
      <section className="bg-white shadow-sm rounded-xl overflow-hidden mb-8">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`dev-tab px-6 py-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* CONTEÚDO COM CARD BRANCO ESTILO ORIGINAL */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="overflow-x-auto">
          <table className="dev-table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
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
                        item.status === "LIVRE" ? "status-disponivel" : "status-ocupado"
                      }`}
                    >
                      {item.status || (item.ativo ? "Ativo" : "Inativo")}
                    </span>
                  </td>
                  <td>
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="text-red-600 hover:text-red-800">
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