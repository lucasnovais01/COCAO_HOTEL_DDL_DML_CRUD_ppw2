import type { RouteObject } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import Dashboard from "../../views/Dashboard";
import DevTools from "../../views/DevTools";
// Observação: usar um redirect da raiz para o DevTools para que
// acessar '/' não gere erro de rota inexistente.
import { Navigate } from "react-router-dom";

// Importações do módulo Hóspede
import ListarHospede from "../../views/1-hospede/Listar";
import CriarHospede from "../../views/1-hospede/Criar";
import AlterarHospede from "../../views/1-hospede/Alterar";
import ExcluirHospede from "../../views/1-hospede/Excluir";
import ConsultarHospede from "../../views/1-hospede/Consultar";

// Importação do módulo Função
import ListarFuncao from "../../views/2-funcao/Listar";
import CriarFuncao from "../../views/2-funcao/Criar";
import AlterarFuncao from "../../views/2-funcao/Alterar";
import ExcluirFuncao from "../../views/2-funcao/Excluir";
import ConsultarFuncao from "../../views/2-funcao/Consultar";

// Importação do módulo Funcionário
import ListarFuncionario from "../../views/3-funcionario/Listar";
import CriarFuncionario from "../../views/3-funcionario/Criar";
import AlterarFuncionario from "../../views/3-funcionario/Alterar";
import ExcluirFuncionario from "../../views/3-funcionario/Excluir";
import ConsultarFuncionario from "../../views/3-funcionario/Consultar";

// Importação do módulo Tipo Quarto
import ListarTipoQuarto from "../../views/4-tipo-quarto/Listar";
import CriarTipoQuarto from "../../views/4-tipo-quarto/Criar";
import AlterarTipoQuarto from "../../views/4-tipo-quarto/Alterar";
import ExcluirTipoQuarto from "../../views/4-tipo-quarto/Excluir";
import ConsultarTipoQuarto from "../../views/4-tipo-quarto/Consultar";

// Importação do módulo Quarto
import ListarQuarto from "../../views/5-quarto/Listar";
import CriarQuarto from "../../views/5-quarto/Criar";
import AlterarQuarto from "../../views/5-quarto/Alterar";
import ExcluirQuarto from "../../views/5-quarto/Excluir";
import ConsultarQuarto from "../../views/5-quarto/Consultar";
/*
*/
// 6-módulo reserva (futuro)

//
import { ROTA } from "./url";

// ============================================================
// CORREÇÃO: Usar <Outlet /> no Layout (padrão do professor)
// Remover {children} do Layout.tsx
// ============================================================
export const routes: RouteObject[] = [
  // Redirecionamento da raiz '/' para o Dashboard
  // Motivo: abrir http://localhost:5173/ (ou :5174) deve levar ao
  // Dashboard do sistema; sem esse redirect a aplicação retorna "No route matches URL '/'".
  {
    path: '/',
    element: <Navigate to="/sistema/dashboard" replace />,
  },

  {
    path: '/sistema',
    element: <Layout />, // SEM children
    children: [
      {
        path: '/sistema/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/sistema/devtools',
        element: <DevTools />,
      },
      {
        path: ROTA.HOSPEDE.LISTAR,
        element: <ListarHospede />,
      },
      {
        path: ROTA.HOSPEDE.CRIAR,
        element: <CriarHospede />,
      },
      {
        path: `${ROTA.HOSPEDE.ATUALIZAR}/:idUsuario`,
        element: <AlterarHospede />,
      },
      {
        path: `${ROTA.HOSPEDE.EXCLUIR}/:idUsuario`,
        element: <ExcluirHospede />,
      },
      {
        path: `${ROTA.HOSPEDE.POR_ID}/:idUsuario`,
        element: <ConsultarHospede />,
      },
      // Rotas do módulo 2-funcao
      {
        path: ROTA.FUNCAO.LISTAR,
        element: <ListarFuncao />,
      },
      {
        path: ROTA.FUNCAO.CRIAR,
        element: <CriarFuncao />,
      },
      {
        path: `${ROTA.FUNCAO.ATUALIZAR}/:id`,
        element: <AlterarFuncao />,
      },
      {
        path: `${ROTA.FUNCAO.EXCLUIR}/:id`,
        element: <ExcluirFuncao />,
      },
      {
        path: `${ROTA.FUNCAO.POR_ID}/:id`,
        element: <ConsultarFuncao />,
      },

      // Rotas do módulo 3-funcionario
      {
        path: ROTA.FUNCIONARIO.LISTAR,
        element: <ListarFuncionario />,
      },
      {
        path: ROTA.FUNCIONARIO.CRIAR,
        element: <CriarFuncionario />,
      },
      {
        path: `${ROTA.FUNCIONARIO.ATUALIZAR}/:idUsuario`,
        element: <AlterarFuncionario />,
      },
      {
        path: `${ROTA.FUNCIONARIO.EXCLUIR}/:idUsuario`,
        element: <ExcluirFuncionario />,
      },
      {
        path: `${ROTA.FUNCIONARIO.POR_ID}/:idUsuario`,
        element: <ConsultarFuncionario />,
      },

      // Rotas do módulo 4-tipo-quarto
      {
        path: ROTA.TIPO_QUARTO.LISTAR,
        element: <ListarTipoQuarto />,
      },
      {
        path: ROTA.TIPO_QUARTO.CRIAR,
        element: <CriarTipoQuarto />,
      },
      {
        path: `${ROTA.TIPO_QUARTO.ATUALIZAR}/:codigoTipoQuarto`,
        element: <AlterarTipoQuarto />,
      },
      {
        path: `${ROTA.TIPO_QUARTO.EXCLUIR}/:codigoTipoQuarto`,
        element: <ExcluirTipoQuarto />,
      },
      {
        path: `${ROTA.TIPO_QUARTO.POR_ID}/:codigoTipoQuarto`,
        element: <ConsultarTipoQuarto />,
      },


      // Rotas do módulo 5-quarto
      {
        path: ROTA.QUARTO.LISTAR,
        element: <ListarQuarto />,
      },
      {
        path: ROTA.QUARTO.CRIAR,
        element: <CriarQuarto />,
      },
      {
        path: `${ROTA.QUARTO.ATUALIZAR}/:idQuarto`,
        element: <AlterarQuarto />,
      },
      {
        path: `${ROTA.QUARTO.EXCLUIR}/:idQuarto`,
        element: <ExcluirQuarto />,
      },
      {
        path: `${ROTA.QUARTO.POR_ID}/:idQuarto`,
        element: <ConsultarQuarto />,
      },
/*
*/
      // Rotas do módulo 6-reserva (futuro)

    ],
  },
];