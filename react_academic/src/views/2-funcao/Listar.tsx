import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import type { Funcao } from "../../type/2-funcao";

import { apiGetFuncoes } from "../../services/2-funcao/api/api.funcao";
import { FUNCAO } from "../../services/2-funcao/constants/funcao.constants";
import { ROTA } from "../../services/router/url";

export default function ListarFuncao() {
  const [funcoes, setFuncoes] = useState<Funcao[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const columns = ["codigoFuncao", "nomeFuncao", "descricao", "nivelAcesso"];

  useEffect(() => {
    async function load() {
      try {
        const res = await apiGetFuncoes();
        const dados = res?.data?.dados ?? [];
        if (Array.isArray(dados)) setFuncoes(dados);
      } catch (err) {
        console.error("Erro ao buscar funções:", err);
        showToast("Erro ao carregar funções", "error");
      }
    }
    load();
  }, []);

  useEffect(() => {
    const anyState: any = location.state;
    if (anyState && anyState.toast) {
      const t = anyState.toast as { message: string; type: "success" | "error" };
      showToast(t.message, t.type);
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const filteredData = funcoes.filter((f) =>
    Object.values(f).some((v) => v?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = () => {
    navigate((ROTA as any).FUNCAO.CRIAR);
    showToast("Redirecionando para criação...", "success");
  }; 

  const handleEdit = (id?: number) => {
    if (id == null) return showToast("ID inválido", "error");
    navigate(`${(ROTA as any).FUNCAO.ATUALIZAR}/${id}`);
    showToast(`Editar função código: ${id}`, "success");
  }; 

  const handleDelete = (id?: number) => {
    if (id == null) return showToast("ID inválido", "error");
    navigate(`${(ROTA as any).FUNCAO.EXCLUIR}/${id}`);
  }; 

  const handleConsult = (id?: number) => {
    if (id == null) return showToast("ID inválido", "error");
    navigate(`${(ROTA as any).FUNCAO.POR_ID}/${id}`);
    showToast(`Consultando função código: ${id}`, "success");
  };

  const formatValue = (key: string, value: any): string | ReactNode => {
    if (value === true) return "Sim";
    if (value === false) return "Não";
    const k = key.toLowerCase();
    if (k.includes("data")) {
      const d = new Date(value);
      return isNaN(d.getTime()) ? "-" : d.toLocaleDateString("pt-BR");
    }
    if (k === "nivelacesso") return value?.toString() || "-";
    return value?.toString() || "-";
  };

  return (
    <div className="funcao-listar-page">
      <nav className="breadcrumb">
        <div className="container flex items-center space-x-2 text-sm">
          <NavLink to="/sistema/dashboard" className="text-blue-600 hover:text-blue-700">
            Home
          </NavLink>
          <i className="fas fa-chevron-right text-gray-400"></i>
          <span className="text-gray-600">Listar Funções</span>
        </div>
      </nav>

      <section className="funcao-banner">
        <div className="container text-center">
          <i className="fas fa-briefcase text-6xl mb-4"></i>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gerenciamento de Funções</h1>
          <p className="text-xl">Lista completa de funções</p>
        </div>
      </section>

      <main className="container py-8">
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

        <div className="devtools-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">{FUNCAO.TITULO.LISTA}</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Buscar..."
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                <i className="fas fa-plus mr-1"></i>Novo
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="dev-table">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center py-4 text-gray-500">
                      Nenhuma função encontrada.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((f) => (
                    <tr key={f.codigoFuncao ?? Math.random()}>
                      {columns.map((col) => (
                        <td key={col}>{formatValue(col, (f as any)[col])}</td>
                      ))}
                      <td className="actions">
                        <button onClick={() => handleConsult(f.codigoFuncao)} className="btn-show" title="Consultar">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button onClick={() => handleEdit(f.codigoFuncao)} className="btn-edit" title="Editar">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button onClick={() => handleDelete(f.codigoFuncao)} className="btn-delete" title="Excluir">
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
      </main>
    </div>
  );
}
