import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import type { Hospede } from "../../type/1-hospede";

import { apiPostHospede } from "../../services/1-hospede/api/api.hospede";
import { HOSPEDE } from "../../services/1-hospede/constants/hospede.constants";
import { ROTA } from "../../services/router/url";

// Criar Hóspede - formulário básico com validações simples
export default function CriarHospede() {
  const navigate = useNavigate();
  const [model, setModel] = useState<Hospede>(HOSPEDE.DADOS_INICIAIS as unknown as Hospede);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Atualiza um campo do formulário
  const handleChange = (name: keyof Hospede, value: any) => {
    setModel((prev) => ({ ...prev, [name]: value }));
  };

  // Exibe toast de feedback
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Mensagens de ajuda por campo
  const getHelpMessage = (fieldName: string): string | null => {
    if (focusedField !== fieldName) return null;
    const messages: { [key: string]: string } = {
      [String(HOSPEDE.FIELDS.NOME)]: HOSPEDE.INPUT_ERROR.NOME.MIN_LEN,
      [String(HOSPEDE.FIELDS.CPF)]: HOSPEDE.INPUT_ERROR.CPF.EXACT_LEN,
      [String(HOSPEDE.FIELDS.RG)]: HOSPEDE.INPUT_ERROR.RG.BLANK,
      [String(HOSPEDE.FIELDS.SEXO)]: HOSPEDE.INPUT_ERROR.SEXO.BLANK,
      [String(HOSPEDE.FIELDS.DATA_NASCIMENTO)]: HOSPEDE.INPUT_ERROR.DATA_NASCIMENTO.BLANK,
      [String(HOSPEDE.FIELDS.EMAIL)]: HOSPEDE.INPUT_ERROR.EMAIL.VALID,
      [String(HOSPEDE.FIELDS.TELEFONE)]: HOSPEDE.INPUT_ERROR.TELEFONE.BLANK,
      [String(HOSPEDE.FIELDS.TIPO)]: HOSPEDE.INPUT_ERROR.TIPO.BLANK,
    };
    return messages[fieldName] || null;
  };

  // Envia a criação para a API
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      /*
        PROBLEMA: O backend retornava 400 Bad Request mesmo com URL correta.
        
        CAUSA: 
        1. Enviávamos idUsuario: 0 (não deve ser enviado em CREATE, é auto-gerado)
        2. Campos opcionais vazios eram enviados como "" (backend esperava null/undefined)
        
        SOLUÇÃO:
        - Remover idUsuario do payload (não incluir na requisição)
        - Converter campos vazios de strings para null (rg, email, telefone)
        - Garantir tipo e ativo como números, não strings
      */
      const hospedeToSend = {
        nomeHospede: model.nomeHospede,
        cpf: model.cpf,
        rg: model.rg || null,
        sexo: model.sexo,
        dataNascimento: model.dataNascimento ? String(model.dataNascimento) : "",
        email: model.email || null,
        telefone: model.telefone || null,
        tipo: Number(model.tipo),
        ativo: Number(model.ativo),
      };
      
      console.log('[onSubmit] Dados a enviar (sem idUsuario, opcionais como null):', JSON.stringify(hospedeToSend, null, 2));
      
      await apiPostHospede(hospedeToSend as unknown as Hospede);
      showToast(HOSPEDE.OPERACAO.CRIAR.SUCESSO, "success");

      // Mantemos o usuário na página de criação para que o toast permaneça visível.
      // Se quisermos redirecionar automaticamente para a lista e exibir o
      // toast lá, podemos navegar passando o toast via state. Exemplo (comentado):

      setTimeout(() => navigate(ROTA.HOSPEDE.LISTAR, {
        state: { toast: { message: HOSPEDE.OPERACAO.CRIAR.SUCESSO, type: 'success' } }
      }), 1500);
      
    } catch (error: any) {
      console.error('[onSubmit] Erro:', error);
      showToast(HOSPEDE.OPERACAO.CRIAR.ERRO, "error");
    }
  };

  return (
    <div className="hospede-criar-page">
      
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <div className="container flex items-center space-x-2 text-sm">
          <a href="/sistema/dashboard" className="text-blue-600 hover:text-blue-700">
            Home
          </a>
          <i className="fas fa-chevron-right text-gray-400"></i>
          <a href={ROTA.HOSPEDE.LISTAR} className="text-blue-600 hover:text-blue-700">
            Hóspedes
          </a>
          <i className="fas fa-chevron-right text-gray-400"></i>
          <span className="text-gray-600">Novo Hóspede</span>
        </div>
      </nav>

      {/* Banner - deixa COMENTADO para referência
      <section className="hospede-banner">
        <div className="container text-center">
          <i className="fas fa-user-plus text-6xl mb-4"></i>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Novo Hóspede</h1>
          <p className="text-xl">Adicione um novo hóspede ao sistema</p>
        </div>
      </section>
        */}
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

      {/* Content */}
      <main className="container py-8">
        <div className="flex justify-center">
          <div className="card animated fadeInDown w-full max-w-2xl">

          
        <h2>{HOSPEDE.TITULO.CRIAR}</h2>

        <form onSubmit={onSubmit}>
          {/* Campo: Nome */}
          <div className="mb-2">
            <label className="appLabel">{HOSPEDE.LABEL.NOME} : </label>
            
            <input
              value={model.nomeHospede}
              onChange={(e) => handleChange(HOSPEDE.FIELDS.NOME as keyof Hospede, e.target.value)}
              onFocus={() => setFocusedField(String(HOSPEDE.FIELDS.NOME))}
              onBlur={() => setFocusedField(null)}
              className="form-control"
              required
            />
            {getHelpMessage(String(HOSPEDE.FIELDS.NOME)) && (
              <p className="text-red-600 text-sm mt-1">{getHelpMessage(String(HOSPEDE.FIELDS.NOME))}</p>
            )}
          </div>

          {/* Campo: CPF */}
          <div className="mb-2">
            <label className="appLabel">{HOSPEDE.LABEL.CPF}  </label>
            <input
              value={model.cpf}
              onChange={(e) => handleChange(HOSPEDE.FIELDS.CPF as keyof Hospede, e.target.value)}
              onFocus={() => setFocusedField(String(HOSPEDE.FIELDS.CPF))}
              onBlur={() => setFocusedField(null)}
              className="form-control"
              maxLength={11}
              required
            />
            {getHelpMessage(String(HOSPEDE.FIELDS.CPF)) && (
              <p className="text-red-600 text-sm mt-1">{getHelpMessage(String(HOSPEDE.FIELDS.CPF))}</p>
            )}
          </div>

          {/* Campo: RG */}
          <div className="mb-2">
            <label className="appLabel">{HOSPEDE.LABEL.RG} </label>
            <input
              value={model.rg}
              onChange={(e) => handleChange(HOSPEDE.FIELDS.RG as keyof Hospede, e.target.value)}
              onFocus={() => setFocusedField(String(HOSPEDE.FIELDS.RG))}
              onBlur={() => setFocusedField(null)}
              className="form-control"
            />
            {getHelpMessage(String(HOSPEDE.FIELDS.RG)) && (
              <p className="text-red-600 text-sm mt-1">{getHelpMessage(String(HOSPEDE.FIELDS.RG))}</p>
            )}
          </div>

          {/* Campo: Sexo */}
          <div className="mb-2">
            <label className="appLabel">{HOSPEDE.LABEL.SEXO}</label>
            <select
              value={model.sexo}
              onChange={(e) => handleChange(HOSPEDE.FIELDS.SEXO as keyof Hospede, e.target.value)}
              onFocus={() => setFocusedField(String(HOSPEDE.FIELDS.SEXO))}
              onBlur={() => setFocusedField(null)}
              className="form-control"
            >
              <option value="">Selecione...</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
            {getHelpMessage(String(HOSPEDE.FIELDS.SEXO)) && (
              <p className="text-red-600 text-sm mt-1">{getHelpMessage(String(HOSPEDE.FIELDS.SEXO))}</p>
            )}
          </div>

          {/* Campo: Data de Nascimento */}
          <div className="mb-2">
            <label className="appLabel">{HOSPEDE.LABEL.DATA_NASCIMENTO}</label>
            <input
              type="date"
              value={
                model.dataNascimento instanceof Date
                  ? model.dataNascimento.toISOString().split('T')[0]
                  : model.dataNascimento || ""
              }
              onChange={(e) => handleChange(HOSPEDE.FIELDS.DATA_NASCIMENTO as keyof Hospede, e.target.value)}
              onFocus={() => setFocusedField(String(HOSPEDE.FIELDS.DATA_NASCIMENTO))}
              onBlur={() => setFocusedField(null)}
              className="form-control"
            />
            {getHelpMessage(String(HOSPEDE.FIELDS.DATA_NASCIMENTO)) && (
              <p className="text-red-600 text-sm mt-1">{getHelpMessage(String(HOSPEDE.FIELDS.DATA_NASCIMENTO))}</p>
            )}
          </div>

          {/* Campo: E-mail */}
          <div className="mb-2">
            <label className="appLabel">{HOSPEDE.LABEL.EMAIL}</label>
            <input
              type="email"
              value={model.email}
              onChange={(e) => handleChange(HOSPEDE.FIELDS.EMAIL as keyof Hospede, e.target.value)}
              onFocus={() => setFocusedField(String(HOSPEDE.FIELDS.EMAIL))}
              onBlur={() => setFocusedField(null)}
              className="form-control"
            />
            {getHelpMessage(String(HOSPEDE.FIELDS.EMAIL)) && (
              <p className="text-red-600 text-sm mt-1">{getHelpMessage(String(HOSPEDE.FIELDS.EMAIL))}</p>
            )}
          </div>

          {/* Campo: Telefone */}
          <div className="mb-2">
            <label className="appLabel">{HOSPEDE.LABEL.TELEFONE}</label>
            <input
              value={model.telefone}
              onChange={(e) => handleChange(HOSPEDE.FIELDS.TELEFONE as keyof Hospede, e.target.value)}
              onFocus={() => setFocusedField(String(HOSPEDE.FIELDS.TELEFONE))}
              onBlur={() => setFocusedField(null)}
              className="form-control"
            />
            {getHelpMessage(String(HOSPEDE.FIELDS.TELEFONE)) && (
              <p className="text-red-600 text-sm mt-1">{getHelpMessage(String(HOSPEDE.FIELDS.TELEFONE))}</p>
            )}
          </div>

          {/* Campo: Tipo */}
          <div className="mb-2">
            <label className="appLabel">{HOSPEDE.LABEL.TIPO}</label>
            <select
              value={model.tipo}
              onChange={(e) => handleChange(HOSPEDE.FIELDS.TIPO as keyof Hospede, parseInt(e.target.value))}
              onFocus={() => setFocusedField(String(HOSPEDE.FIELDS.TIPO))}
              onBlur={() => setFocusedField(null)}
              className="form-control"
            >
              <option value={0}>Hóspede</option>
              <option value={1}>Funcionário</option>
            </select>
            {getHelpMessage(String(HOSPEDE.FIELDS.TIPO)) && (
              <p className="text-red-600 text-sm mt-1">{getHelpMessage(String(HOSPEDE.FIELDS.TIPO))}</p>
            )}
          </div>

          {/* Campo: Ativo */}
          <div className="mb-2">
            <label className="appLabel">{HOSPEDE.LABEL.ATIVO}</label>
            <select
              value={model.ativo}
              onChange={(e) => handleChange(HOSPEDE.FIELDS.ATIVO as keyof Hospede, parseInt(e.target.value))}
              className="form-control"
            >
              <option value={1}>Sim</option>
              <option value={0}>Não</option>
            </select>
          </div>

          {/* Ações: Salvar / Cancelar */}
          <div className="btn-content mt-4">
            <button type="submit" className="btn btn-sucess">
              <span className="btn-icon"><FaSave /></span>
              Salvar
            </button>

            <button type="button" className="btn btn-cancel" onClick={() => navigate(ROTA.HOSPEDE.LISTAR)}>
              <span className="btn-icon"><MdCancel /></span>
              Cancelar
            </button>
          </div>
        </form>
          </div>
        </div>
      </main>
    </div>
  );
}