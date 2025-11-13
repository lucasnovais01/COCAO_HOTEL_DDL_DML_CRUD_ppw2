import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Funcao } from "../../type/2-funcao";
import { apiPostFuncao } from "../../services/2-funcao/api/api.funcao";
import { FUNCAO } from "../../services/2-funcao/constants/funcao.constants";
import { ROTA } from "../../services/router/url";

export default function CriarFuncao() {
  const navigate = useNavigate();
  const [model, setModel] = useState<Funcao>({ nomeFuncao: "", descricao: "", nivelAcesso: 1 });
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleChange = (key: keyof Funcao, value: any) => {
    setModel((m) => ({ ...m, [key]: value }));
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      const payload: any = { ...model };
      payload.nivelAcesso = Number(payload.nivelAcesso) || 0;

      const res = await apiPostFuncao(payload);
      const mensagem = res?.data?.mensagem ?? "Função criada com sucesso";
      showToast(mensagem, "success");
      // Para manter o usuário na página de criação (toast visível), não navegamos automaticamente.
      // Para navegar e passar toast para a lista, usar:
      // navigate(ROTA.FUNCAO.LISTAR, { state: { toast: { message: mensagem, type: 'success' } } });
    } catch (err: any) {
      console.error("Erro ao criar função:", err);
      const msg = err?.response?.data?.mensagem ?? "Erro ao criar função";
      showToast(msg, "error");
    }
  };

  return (
    <div className="container py-8">
      {toast && (
        <div className={`toast ${toast.type === "error" ? "error" : ""}`}>
          <div className="flex items-center">
            <i className={`fas ${toast.type === "success" ? "fa-check" : "fa-exclamation-triangle"} mr-2`}></i>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <div className="devtools-card max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{FUNCAO.TITULO.CRIAR}</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Nome da Função</label>
            <input
              value={model.nomeFuncao ?? ""}
              onChange={(e) => handleChange("nomeFuncao", e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              value={model.descricao ?? ""}
              onChange={(e) => handleChange("descricao", e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Nível de Acesso</label>
            <select
              value={model.nivelAcesso ?? 1}
              onChange={(e) => handleChange("nivelAcesso", Number(e.target.value))}
              className="px-3 py-2 border rounded"
            >
              <option value={1}>1 - Básico</option>
              <option value={2}>2 - Intermediário</option>
              <option value={3}>3 - Avançado</option>
            </select>
          </div>

          <div className="flex space-x-2 mt-4">
            <button type="submit" className="btn-primary">
              Salvar
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate((ROTA as any).FUNCAO.LISTAR)}>
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
