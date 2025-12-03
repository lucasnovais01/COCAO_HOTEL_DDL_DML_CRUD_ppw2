import { Link } from "react-router-dom";
import { ROTA } from "../services/router/url";

export default function Dashboard() {
  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h1>Dashboard</h1>
        <p>Bem-vindo ao sistema de hotel</p>

        {/* Grid com opções CRUD para Hóspede */}
        <div className="crud-container">
          <h2>Gerenciamento de Hóspedes</h2>

          <div className="crud-grid">
            {/* Botão Listar */}
            <Link to={ROTA.HOSPEDE.LISTAR} className="crud-btn crud-listar">
              <i className="fas fa-list"></i>
              <span>Listar</span>
            </Link>

            {/* Botão Buscar (Consultar) */}
            <Link
              to={ROTA.HOSPEDE.POR_ID + "/1"}
              className="crud-btn crud-buscar"
            >
              <i className="fas fa-search"></i>
              <span>Buscar</span>
            </Link>

            {/* Botão Criar */}
            <Link to={ROTA.HOSPEDE.CRIAR} className="crud-btn crud-criar">
              <i className="fas fa-plus"></i>
              <span>Criar</span>
            </Link>

            {/* Botão Alterar */}
            <Link
              to={ROTA.HOSPEDE.ATUALIZAR + "/1"}
              className="crud-btn crud-atualizar"
            >
              <i className="fas fa-edit"></i>
              <span>Alterar</span>
            </Link>

            {/* Botão Excluir */}
            <Link
              to={ROTA.HOSPEDE.EXCLUIR + "/1"}
              className="crud-btn crud-excluir"
            >
              <i className="fas fa-trash"></i>
              <span>Excluir</span>
            </Link>
          </div>
        </div>

        {/* Grid com opções CRUD para FUNCAO */}
        <div className="crud-container">
          <h2>Função</h2>

          <div className="crud-grid">
            {/* Botão Listar */}
            <Link to={ROTA.FUNCAO.LISTAR} className="crud-btn crud-listar">
              <i className="fas fa-list"></i>
              <span>Listar</span>
            </Link>

            {/* Botão Buscar (Consultar) */}
            <Link
              to={ROTA.FUNCAO.POR_ID + "/1"}
              className="crud-btn crud-buscar"
            >
              <i className="fas fa-search"></i>
              <span>Buscar</span>
            </Link>

            {/* Botão Criar */}
            <Link to={ROTA.FUNCAO.CRIAR} className="crud-btn crud-criar">
              <i className="fas fa-plus"></i>
              <span>Criar</span>
            </Link>

            {/* Botão Alterar */}
            <Link
              to={ROTA.FUNCAO.ATUALIZAR + "/1"}
              className="crud-btn crud-atualizar"
            >
              <i className="fas fa-edit"></i>
              <span>Alterar</span>
            </Link>

            {/* Botão Excluir */}
            <Link
              to={ROTA.FUNCAO.EXCLUIR + "/1"}
              className="crud-btn crud-excluir"
            >
              <i className="fas fa-trash"></i>
              <span>Excluir</span>
            </Link>
          </div>
        </div>

        {/* Grid com opções CRUD para FUNCIONARIO */}
        <div className="crud-container">
          <h2>Funcionário</h2>

          <div className="crud-grid">
            {/* Botão Listar */}
            <Link to={ROTA.FUNCIONARIO.LISTAR} className="crud-btn crud-listar">
              <i className="fas fa-list"></i>
              <span>Listar</span>
            </Link>

            {/* Botão Buscar (Consultar) */}
            <Link
              to={ROTA.FUNCIONARIO.POR_ID + "/1"}
              className="crud-btn crud-buscar"
            >
              <i className="fas fa-search"></i>
              <span>Buscar</span>
            </Link>

            {/* Botão Criar */}
            <Link to={ROTA.FUNCIONARIO.CRIAR} className="crud-btn crud-criar">
              <i className="fas fa-plus"></i>
              <span>Criar</span>
            </Link>

            {/* Botão Alterar */}
            <Link
              to={ROTA.FUNCIONARIO.ATUALIZAR + "/1"}
              className="crud-btn crud-atualizar"
            >
              <i className="fas fa-edit"></i>
              <span>Alterar</span>
            </Link>

            {/* Botão Excluir */}
            <Link
              to={ROTA.FUNCIONARIO.EXCLUIR + "/1"}
              className="crud-btn crud-excluir"
            >
              <i className="fas fa-trash"></i>
              <span>Excluir</span>
            </Link>
          </div>
        </div>

        {/* Grid com opções CRUD para TIPO DE QUARTO */}
        <div className="crud-container">
          <h2>Tipo de Quarto</h2>

          <div className="crud-grid">
            {/* Botão Listar */}
            <Link to={ROTA.TIPO_QUARTO.LISTAR} className="crud-btn crud-listar">
              <i className="fas fa-list"></i>
              <span>Listar</span>
            </Link>

            {/* Botão Buscar (Consultar) */}
            <Link to={ROTA.TIPO_QUARTO.POR_ID + "/1"} className="crud-btn crud-buscar">
              <i className="fas fa-search"></i>
              <span>Buscar</span>
            </Link>

            {/* Botão Criar */}
            <Link to={ROTA.TIPO_QUARTO.CRIAR} className="crud-btn crud-criar">
              <i className="fas fa-plus"></i>
              <span>Criar</span>
            </Link>

            {/* Botão Alterar */}
            <Link to={ROTA.TIPO_QUARTO.ATUALIZAR + "/1"} className="crud-btn crud-atualizar">
              <i className="fas fa-edit"></i>
              <span>Alterar</span>
            </Link>

            {/* Botão Excluir */}
            <Link to={ROTA.TIPO_QUARTO.EXCLUIR + "/1"} className="crud-btn crud-excluir">
              <i className="fas fa-trash"></i>
              <span>Excluir</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
TUTORIAL: Como o DASHBOARD está funcionando

Dashboard no meio da tela:
O card fica centralizado porque:

O Dashboard.tsx usa className="display" + className="card"
Esses estilos CSS (em seus arquivos .css) provavelmente têm display: flex, justify-content: center e align-items: center para centralizar o conteúdo
Dashboard virou página home:
Aconteceu por causa do roteamento:

Quando você acessa http://localhost:5173/ (a raiz), o React Router intercepta isso
No arquivo router.tsx, existe um redirect automático: quando alguém tenta acessar /, é redirecionado para /sistema/dashboard
O Dashboard está como child do Layout, então é renderizado dentro da estrutura do Layout (header + conteúdo)
Resumindo: CSS centraliza o card visualmente, e o router faz o Dashboard ser a página inicial automaticamente.

*/
