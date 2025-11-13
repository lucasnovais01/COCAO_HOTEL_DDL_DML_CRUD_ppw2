import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Funcao } from "../../type/2-funcao";
import { apiGetFuncao, apiPutFuncao } from "../../services/2-funcao/api/api.funcao";
import { ROTA } from "../../services/router/url";

export default function AlterarFuncao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<Funcao | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        if (!id) return;
        const res = await apiGetFuncao(Number(id));
        const dados = res?.data?.dados ?? null;
        setModel(dados);
      } catch (err) {
        console.error(err);
        showToast("Erro ao carregar função", "error");
      }
    }
    load();
  }, [id]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (key: keyof Funcao, value: any) => {
    setModel((m) => (m ? { ...m, [key]: value } : m));
  };

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      if (!id || !model) return showToast("Modelo inválido", "error");
      const payload: any = { ...model };
      payload.nivelAcesso = Number(payload.nivelAcesso) || 0;
      const res = await apiPutFuncao(Number(id), payload);
      showToast(res?.data?.mensagem ?? "Atualizado com sucesso", "success");
      navigate((ROTA as any).FUNCAO.LISTAR, { state: { toast: { message: res?.data?.mensagem ?? "Atualizado", type: "success" } } });
    } catch (err: any) {
      console.error(err);
      showToast(err?.response?.data?.mensagem ?? "Erro ao atualizar", "error");
    }
  };

  if (!model) return <div className="container py-8">Carregando...</div>;

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
        <h2 className="text-2xl font-semibold mb-4">Alterar Função</h2>
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
            <button type="submit" className="btn-primary">Salvar</button>
            <button type="button" className="btn-secondary" onClick={() => navigate((ROTA as any).FUNCAO.LISTAR)}>Voltar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
