import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useParams, useNavigate, NavLink } from "react-router-dom";

import { apiGetHospede, apiPutHospede } from "../../services/1-hospede/api/api.hospede";
import type { Hospede } from "../../type/1-hospede";
import { HOSPEDE } from "../../services/1-hospede/constants/hospede.constants";

export default function AlterarHospede() {
  // ============================================================
  // ADAPTAÇÃO 1: Mudança de idCidade para idUsuario
  // O professor usava idCidade (string), agora usamos idUsuario (number)
  // Precisamos converter string → number com parseInt()
  // ============================================================
  const { idUsuario } = useParams<{ idUsuario: string }>();
  const navigate = useNavigate();
  const [model, setModel] = useState<Hospede | null>(null);

  // ============================================================
  // useEffect para buscar os dados do hóspede ao carregar a página
  // ============================================================
  useEffect(() => {
    async function getHospede() {
      try {
        if (idUsuario) {
          // ADAPTAÇÃO: Converter string para number antes de enviar para a API
          const id = parseInt(idUsuario, 10);
          const response = await apiGetHospede(id);
          console.log(response.data.dados);

          if (response.data.dados) {
            setModel(response.data.dados);
          }
        }
      } catch (error: any) {
        console.log(error);
        alert(HOSPEDE.OPERACAO.POR_ID.ERRO);
      }
    }

    getHospede();
  }, [idUsuario]);

  // ============================================================
  // Função para atualizar os campos do formulário
  // ============================================================
  const handleChangeField = (name: keyof Hospede, value: string) => {
    setModel((prev) => ({ ...prev, [name]: value }));
  };

  // ============================================================
  // Função para enviar o formulário
  // ============================================================
  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idUsuario || !model) {
      alert("Dados incompletos para atualização");
      return;
    }

    try {
      // ADAPTAÇÃO: Converter string para number
      const id = parseInt(idUsuario, 10);
      await apiPutHospede(id, model);
      alert(HOSPEDE.OPERACAO.ATUALIZAR.SUCESSO);
      navigate("/sistema/hospede/listar"); // Redirecionar após sucesso
    } catch (error: any) {
      console.log(error);
      alert(HOSPEDE.OPERACAO.ATUALIZAR.ERRO);
    }
  };

  // ============================================================
  // Função para cancelar e voltar para a listagem
  // ============================================================
  const onCancel = () => {
    navigate("/sistema/hospede/listar");
  };

  // ============================================================
  // Classe CSS para os inputs
  // ============================================================
  const getInputClass = () => {
    return "form-control app-label mt-2";
  };

  // ============================================================
  // RENDERIZAÇÃO DO FORMULÁRIO
  // ============================================================
  return (
    <div className="display">
      <div className="card animated fadeInDown">
        {/* Breadcrumb: Home > DevTools > Alterar */}
        <nav className="breadcrumb mb-4">
          <div className="container flex items-center space-x-2 text-sm">
            <NavLink to="/sistema/dashboard" className="text-blue-600 hover:text-blue-700">Home</NavLink>
            <i className="fas fa-chevron-right text-gray-400"></i>
            <NavLink to="/sistema/devtools" className="text-blue-600 hover:text-blue-700">DevTools</NavLink>
            <i className="fas fa-chevron-right text-gray-400"></i>
            <span className="text-gray-600">Alterar</span>
          </div>
        </nav>

        {/* Banner idêntico ao DevTools (contexto: páginas administrativas) */}
        <section className="devtools-banner mb-6">
          <div className="container text-center">
            <i className="fas fa-tools text-6xl mb-4"></i>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Dev Tools</h1>
            <p className="text-xl">Painel de Administração - Simulação DDL</p>
          </div>
        </section>

        <h2>{HOSPEDE.TITULO.ATUALIZAR}</h2>

        <form onSubmit={onSubmitForm}>
          {/* ============================================================
              ADAPTAÇÃO 2: Campos do formulário baseados na tabela COCAO_HOSPEDE
              Cidade tinha apenas: codCidade e nomeCidade
              Hóspede tem: nome, CPF, RG, sexo, data nascimento, email, telefone
              ============================================================ */}

          {/* Campo: Nome Completo */}
          <div className="mb-2 mt-4">
            <label htmlFor={HOSPEDE.FIELDS.NOME} className="appLabel">
              {HOSPEDE.LABEL.NOME}
            </label>
            <input
              id={HOSPEDE.FIELDS.NOME}
              name={HOSPEDE.FIELDS.NOME}
              value={model?.nomeHospede || ""}
              className={getInputClass()}
              readOnly={false}
              disabled={false}
              autoComplete="off"
              onChange={(e) => handleChangeField(HOSPEDE.FIELDS.NOME, e.target.value)}
            />
          </div>

          {/* Campo: CPF */}
          <div className="mb-2 mt-4">
            <label htmlFor={HOSPEDE.FIELDS.CPF} className="appLabel">
              {HOSPEDE.LABEL.CPF}
            </label>
            <input
              id={HOSPEDE.FIELDS.CPF}
              name={HOSPEDE.FIELDS.CPF}
              value={model?.cpf || ""}
              className={getInputClass()}
              readOnly={false}
              disabled={false}
              autoComplete="off"
              maxLength={11}
              onChange={(e) => handleChangeField(HOSPEDE.FIELDS.CPF, e.target.value)}
            />
          </div>

          {/* Campo: RG */}
          <div className="mb-2 mt-4">
            <label htmlFor={HOSPEDE.FIELDS.RG} className="appLabel">
              {HOSPEDE.LABEL.RG}
            </label>
            <input
              id={HOSPEDE.FIELDS.RG}
              name={HOSPEDE.FIELDS.RG}
              value={model?.rg || ""}
              className={getInputClass()}
              readOnly={false}
              disabled={false}
              autoComplete="off"
              maxLength={20}
              onChange={(e) => handleChangeField(HOSPEDE.FIELDS.RG, e.target.value)}
            />
          </div>

          {/* Campo: Sexo */}
          <div className="mb-2 mt-4">
            <label htmlFor={HOSPEDE.FIELDS.SEXO} className="appLabel">
              {HOSPEDE.LABEL.SEXO}
            </label>
            <select
              id={HOSPEDE.FIELDS.SEXO}
              name={HOSPEDE.FIELDS.SEXO}
              value={model?.sexo || ""}
              className={getInputClass()}
              onChange={(e) => handleChangeField(HOSPEDE.FIELDS.SEXO, e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
          </div>

          {/* Campo: Data de Nascimento */}
          <div className="mb-2 mt-4">
            <label htmlFor={HOSPEDE.FIELDS.DATA_NASCIMENTO} className="appLabel">
              {HOSPEDE.LABEL.DATA_NASCIMENTO}
            </label>
            <input
              id={HOSPEDE.FIELDS.DATA_NASCIMENTO}
              name={HOSPEDE.FIELDS.DATA_NASCIMENTO}
              type="date"
              value={model?.dataNascimento ? new Date(model.dataNascimento).toISOString().split("T")[0] : ""}
              className={getInputClass()}
              readOnly={false}
              disabled={false}
              onChange={(e) => handleChangeField(HOSPEDE.FIELDS.DATA_NASCIMENTO, e.target.value)}
            />
          </div>

          {/* Campo: E-mail */}
          <div className="mb-2 mt-4">
            <label htmlFor={HOSPEDE.FIELDS.EMAIL} className="appLabel">
              {HOSPEDE.LABEL.EMAIL}
            </label>
            <input
              id={HOSPEDE.FIELDS.EMAIL}
              name={HOSPEDE.FIELDS.EMAIL}
              type="email"
              value={model?.email || ""}
              className={getInputClass()}
              readOnly={false}
              disabled={false}
              autoComplete="off"
              onChange={(e) => handleChangeField(HOSPEDE.FIELDS.EMAIL, e.target.value)}
            />
          </div>

          {/* Campo: Telefone */}
          <div className="mb-2 mt-4">
            <label htmlFor={HOSPEDE.FIELDS.TELEFONE} className="appLabel">
              {HOSPEDE.LABEL.TELEFONE}
            </label>
            <input
              id={HOSPEDE.FIELDS.TELEFONE}
              name={HOSPEDE.FIELDS.TELEFONE}
              type="tel"
              value={model?.telefone || ""}
              className={getInputClass()}
              readOnly={false}
              disabled={false}
              autoComplete="off"
              onChange={(e) => handleChangeField(HOSPEDE.FIELDS.TELEFONE, e.target.value)}
            />
          </div>

          {/* Botões de Ação */}
          <div className="btn-content mt-4">
            <button
              id="submit"
              type="submit"
              className="btn btn-sucess"
              title={HOSPEDE.OPERACAO.ATUALIZAR.ACAO}
            >
              <span className="btn-icon">
                <i>
                  <FaSave />
                </i>
              </span>
              Salvar
            </button>

            <button
              id="cancel"
              type="button"
              className="btn btn-cancel"
              title="Cancelar atualização"
              onClick={onCancel}
            >
              <span className="btn-icon">
                <i>
                  <MdCancel />
                </i>
              </span>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}