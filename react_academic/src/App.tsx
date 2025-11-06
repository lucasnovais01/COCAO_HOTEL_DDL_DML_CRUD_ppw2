// Não estou usando o import abaixo mais, pq o App não cria mais as rotas diretamente.

// import { useRoutes } from 'react-router-dom'

// Nota: o Layout é usado pela configuração de rotas centralizada em
// `src/services/router/router.tsx` (via element: <Layout />). Mantemos
// a referência comentada aqui para documentação e fácil comparação, evitando
// a importação não utilizada que causaria warning/erro de lint.
// import Layout from './components/layout/Layout.tsx'

// Import das rotas centralizadas (baseadas no modelo do professor)
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./services/router/router";

/*
  Restaurando o padrão do professor (modelo em react_modelo):
  - O modelo usa `createBrowserRouter(routes)` + `<RouterProvider />`.
  - Essa forma é mais explícita e é o padrão seguido no material do curso.
  - Mantive as alterações anteriores (useRoutes) comentadas em histórico
    para referência, mas aqui preferi voltar ao modelo original conforme solicitado.
*/

const router = createBrowserRouter(routes as any);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;