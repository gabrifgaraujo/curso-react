## 4. Roteamento em Aplicações React com React Router

A maioria das aplicações web não consiste em uma única página. Os usuários precisam navegar entre diferentes seções ou visualizações. Em aplicações de página única (SPAs - Single Page Applications) como as construídas com React, o roteamento do lado do cliente (client-side routing) permite que a navegação ocorra sem recarregar a página inteira, proporcionando uma experiência de usuário mais fluida.

React Router é a biblioteca de roteamento mais popular para aplicações React.

### Introdução ao React Router

React Router permite que você defina rotas na sua aplicação, mapeando URLs para componentes específicos. Quando a URL no navegador muda, o React Router renderiza o componente correspondente à nova URL.

**Principais Componentes do React Router (v6, a versão mais recente):**

*   **`<BrowserRouter>` (ou `<HashRouter>`):** O componente que envolve sua aplicação e habilita o roteamento. `<BrowserRouter>` usa a API de Histórico do HTML5 para manter sua UI sincronizada com a URL, enquanto `<HashRouter>` usa a parte hash da URL (`window.location.hash`). Geralmente, `<BrowserRouter>` é preferido para novos projetos.
*   **`<Routes>`:** Um container para múltiplas rotas. Ele examina todas as suas rotas filhas `<Route>` e renderiza a primeira que corresponde à URL atual.
*   **`<Route>`:** Define o mapeamento entre um caminho (path) da URL e um componente React (`element`).
*   **`<Link>`:** Usado para criar links de navegação. Ele renderiza uma tag `<a>` no DOM, mas previne o comportamento padrão de recarregamento da página e, em vez disso, atualiza a URL e a UI via React Router.
*   **`useNavigate`:** Um Hook que fornece uma função para navegar programaticamente (por exemplo, após o envio de um formulário).
*   **`useParams`:** Um Hook para acessar parâmetros de URL dinâmicos (ex: `/usuarios/:id`).

### Configuração de Rotas Básicas

1.  **Instalação:**
    Primeiro, instale o React Router no seu projeto Vite:
    ```bash
    npm install react-router-dom
    ```

2.  **Configuração no `main.jsx` (ou `index.jsx`):**
    Envolva seu componente principal (`<App />`) com `<BrowserRouter>`.

    ```jsx
    // src/main.jsx
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';
    import './index.css'; // Ou seu arquivo de estilos principal
    import { BrowserRouter } from 'react-router-dom';

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
    ```

3.  **Definindo Rotas no `App.jsx` (ou em um componente de rotas dedicado):**

    ```jsx
    // src/App.jsx
    import React from 'react';
    import { Routes, Route, Link } from 'react-router-dom';

    // Componentes de exemplo para as páginas
    function PaginaInicial() {
      return (
        <div>
          <h2>Página Inicial</h2>
          <p>Bem-vindo à nossa aplicação!</p>
        </div>
      );
    }

    function Sobre() {
      return (
        <div>
          <h2>Sobre Nós</h2>
          <p>Esta é a página sobre.</p>
        </div>
      );
    }

    function Contato() {
      return (
        <div>
          <h2>Contato</h2>
          <p>Entre em contato conosco!</p>
        </div>
      );
    }

    function NaoEncontrado() {
      return (
        <div>
          <h2>404 - Página Não Encontrada</h2>
          <p>Oops! A página que você procura não existe.</p>
          <Link to="/">Voltar para a Página Inicial</Link>
        </div>
      );
    }

    function App() {
      return (
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Início</Link>
              </li>
              <li>
                <Link to="/sobre">Sobre</Link>
              </li>
              <li>
                <Link to="/contato">Contato</Link>
              </li>
            </ul>
          </nav>

          <hr />

          {/* Onde os componentes da rota serão renderizados */}
          <Routes>
            <Route path="/" element={<PaginaInicial />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            {/* Rota "catch-all" para páginas não encontradas */}
            <Route path="*" element={<NaoEncontrado />} />
          </Routes>
        </div>
      );
    }

    export default App;
    ```

**Explicação:**

*   Importamos `Routes`, `Route` e `Link` de `react-router-dom`.
*   Criamos componentes simples para cada "página" (`PaginaInicial`, `Sobre`, `Contato`, `NaoEncontrado`).
*   No componente `App`, criamos uma navegação simples usando `<Link to="URL_DESEJADA">Texto do Link</Link>`.
*   O componente `<Routes>` envolve todas as definições de `<Route>`.
*   Cada `<Route>` tem:
    *   `path`: A URL que esta rota irá corresponder. `path="/"` é para a página inicial.
    *   `element`: O componente React que será renderizado quando o `path` corresponder.
*   A rota `path="*"` atua como um curinga (catch-all) para qualquer URL que não corresponda às rotas anteriores, útil para exibir uma página 404.

### Navegação Programática e Links

*   **`<Link>`:** Como vimos, é usado para navegação declarativa. Ele renderiza uma tag `<a>` com um `href` apropriado para que a navegação funcione mesmo se o JavaScript estiver desabilitado (embora a SPA não funcione completamente sem JS).

*   **`useNavigate` Hook:** Para navegar programaticamente (por exemplo, após o login de um usuário ou o envio de um formulário), você pode usar o Hook `useNavigate`.

    ```jsx
    import React from 'react';
    import { useNavigate } from 'react-router-dom';

    function FormularioLogin() {
      const navigate = useNavigate();

      const handleLogin = () => {
        // Lógica de autenticação aqui...
        // Se o login for bem-sucedido:
        navigate('/painel'); // Redireciona para a página do painel
        // Você também pode navegar para trás ou para frente no histórico:
        // navigate(-1); // Volta uma página
      };

      return (
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          {/* Campos do formulário */}
          <button type="submit">Entrar</button>
        </form>
      );
    }
    ```

### Parâmetros de Rota (Rotas Dinâmicas)

Muitas vezes, você precisará de rotas que capturem segmentos dinâmicos da URL, como IDs de usuários ou produtos.

*   **Definindo uma Rota com Parâmetros:** Use a sintaxe `:nomeDoParametro` no `path`.

    ```jsx
    // Em App.jsx ou onde suas rotas estão definidas
    import { useParams } from 'react-router-dom';

    function PerfilUsuario() {
      // O Hook useParams retorna um objeto com os parâmetros da URL
      const { idUsuario } = useParams(); // idUsuario corresponde a :idUsuario no path

      // Aqui você poderia buscar dados do usuário com base no idUsuario
      return (
        <div>
          <h2>Perfil do Usuário</h2>
          <p>ID do Usuário: {idUsuario}</p>
          {/* Exibir informações do usuário com base no ID */}
        </div>
      );
    }

    // ... dentro do <Routes>
    <Route path="/usuarios/:idUsuario" element={<PerfilUsuario />} />
    ```
    Agora, se você navegar para `/usuarios/123`, o componente `PerfilUsuario` será renderizado, e `idUsuario` dentro dele será a string `"123"`.

### Rotas Aninhadas (Nested Routes)

React Router suporta rotas aninhadas, o que é útil para layouts complexos onde partes da UI são compartilhadas entre várias sub-rotas.

*   **Componente `<Outlet>`:** Para renderizar o componente filho de uma rota aninhada, o componente pai da rota deve usar o componente `<Outlet>`.

    ```jsx
    // src/App.jsx (ou um componente de layout)
    import React from 'react';
    import { Routes, Route, Link, Outlet, useParams } from 'react-router-dom';

    // ... (PaginaInicial, Sobre, Contato, NaoEncontrado como antes)

    function LayoutPainel() {
      return (
        <div>
          <h2>Painel do Usuário</h2>
          <nav>
            <Link to="perfil">Meu Perfil</Link> | {" "}
            <Link to="configuracoes">Configurações</Link>
          </nav>
          <hr />
          {/* O conteúdo da rota aninhada será renderizado aqui */}
          <Outlet />
        </div>
      );
    }

    function PainelBoasVindas() {
      return <p>Bem-vindo ao seu painel!</p>;
    }

    function PerfilDoPainel() {
      return <p>Estas são as informações do seu perfil.</p>;
    }

    function ConfiguracoesDoPainel() {
      return <p>Ajuste suas configurações aqui.</p>;
    }

    function App() {
      return (
        <div>
          {/* Navegação principal */}
          <nav>
            <ul>
              <li><Link to="/">Início</Link></li>
              <li><Link to="/sobre">Sobre</Link></li>
              <li><Link to="/painel">Painel</Link></li>
            </ul>
          </nav>
          <hr />
          <Routes>
            <Route path="/" element={<PaginaInicial />} />
            <Route path="/sobre" element={<Sobre />} />
            
            {/* Rota Pai para o Painel */}
            <Route path="/painel" element={<LayoutPainel />}>
              {/* Rotas Filhas (aninhadas) */}
              {/* A rota "index" é a rota padrão para o pai */}
              <Route index element={<PainelBoasVindas />} /> 
              <Route path="perfil" element={<PerfilDoPainel />} />
              <Route path="configuracoes" element={<ConfiguracoesDoPainel />} />
            </Route>

            <Route path="*" element={<NaoEncontrado />} />
          </Routes>
        </div>
      );
    }

    export default App;
    ```

**Explicação das Rotas Aninhadas:**

*   A rota `/painel` renderiza `LayoutPainel`.
*   Dentro de `LayoutPainel`, o `<Outlet />` é o local onde os componentes das rotas filhas serão renderizados.
*   As rotas filhas são definidas *dentro* da tag `<Route path="/painel" ...>`.
    *   `<Route index element={<PainelBoasVindas />} />`: A prop `index` significa que este componente será renderizado quando a URL for exatamente `/painel`.
    *   `<Route path="perfil" element={<PerfilDoPainel />} />`: Será renderizado quando a URL for `/painel/perfil`.
    *   `<Route path="configuracoes" element={<ConfiguracoesDoPainel />} />`: Será renderizado quando a URL for `/painel/configuracoes`.

React Router é uma ferramenta poderosa e flexível para gerenciar a navegação em suas aplicações React. Dominar seus conceitos básicos e avançados é essencial para construir SPAs complexas e fáceis de usar.

