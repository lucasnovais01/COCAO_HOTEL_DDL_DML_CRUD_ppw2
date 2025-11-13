export default function Dashboard() {
  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h1>Dashboard</h1>
        <p>Bem-vindo ao sistema de hotel</p>
      </div>




    </div>
  );
}

/*
Agora vou explicar com poucas palavras:

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