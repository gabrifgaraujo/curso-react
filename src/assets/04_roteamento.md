## 4. Roteamento com React Router e TypeScript

O roteamento é uma parte essencial de aplicações web modernas, permitindo a navegação entre diferentes "páginas" sem recarregar o navegador. No ecossistema React, a biblioteca mais popular para gerenciar rotas é o React Router.

### Introdução ao React Router

React Router é uma biblioteca de roteamento completa para React que permite "renderização condicional" baseada na URL atual do navegador. Ela fornece componentes para navegar entre diferentes partes da sua aplicação, mantendo a interface sincronizada com a URL.

### Instalação

Para começar a usar o React Router com TypeScript em um projeto Vite, instale o pacote:

```bash
npm install react-router-dom @types/react-router-dom
```

### Configuração Básica

Vamos configurar um roteamento básico para uma aplicação:

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

```tsx
// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="contato" element={<Contato />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
```

```tsx
// src/components/Layout.tsx
import { Outlet, Link } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </nav>
      </header>
      
      <main>
        <Outlet />
      </main>
      
      <footer>
        <p>© 2025 Minha Aplicação React</p>
      </footer>
    </div>
  );
}

export default Layout;
```

```tsx
// src/pages/Home.tsx
function Home(): JSX.Element {
  return (
    <div>
      <h1>Página Inicial</h1>
      <p>Bem-vindo à nossa aplicação React!</p>
    </div>
  );
}

export default Home;
```

```tsx
// src/pages/Sobre.tsx
function Sobre(): JSX.Element {
  return (
    <div>
      <h1>Sobre Nós</h1>
      <p>Esta é uma aplicação de exemplo usando React Router com TypeScript.</p>
    </div>
  );
}

export default Sobre;
```

```tsx
// src/pages/Contato.tsx
function Contato(): JSX.Element {
  return (
    <div>
      <h1>Contato</h1>
      <p>Entre em contato conosco pelo email: exemplo@email.com</p>
    </div>
  );
}

export default Contato;
```

```tsx
// src/pages/NotFound.tsx
function NotFound(): JSX.Element {
  return (
    <div>
      <h1>404 - Página Não Encontrada</h1>
      <p>A página que você está procurando não existe.</p>
    </div>
  );
}

export default NotFound;
```

### Componentes Principais do React Router

#### `BrowserRouter`

Envolve sua aplicação e cria um roteador que usa a API de histórico do navegador para manter a UI sincronizada com a URL.

```tsx
import { BrowserRouter } from 'react-router-dom';

// No seu arquivo de entrada (main.tsx)
<BrowserRouter>
  <App />
</BrowserRouter>
```

#### `Routes` e `Route`

`Routes` é um container para todas as suas rotas, e `Route` define uma rota individual.

```tsx
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/sobre" element={<Sobre />} />
</Routes>
```

#### `Link` e `NavLink`

Componentes para criar links de navegação.

```tsx
import { Link, NavLink } from 'react-router-dom';

// Link básico
<Link to="/sobre">Sobre</Link>

// NavLink - adiciona classe 'active' quando a rota está ativa
<NavLink 
  to="/sobre"
  className={({ isActive }) => isActive ? 'link-ativo' : ''}
>
  Sobre
</NavLink>
```

#### `Outlet`

Renderiza o componente filho da rota atual.

```tsx
import { Outlet } from 'react-router-dom';

// No seu componente de layout
function Layout(): JSX.Element {
  return (
    <div>
      <nav>{/* ... */}</nav>
      <main>
        <Outlet /> {/* Aqui será renderizado o componente da rota atual */}
      </main>
      <footer>{/* ... */}</footer>
    </div>
  );
}
```

### Rotas com Parâmetros

Você pode definir rotas com parâmetros dinâmicos:

```tsx
// src/App.tsx
<Routes>
  {/* ... outras rotas ... */}
  <Route path="/produtos/:id" element={<DetalhesProduto />} />
</Routes>
```

```tsx
// src/pages/DetalhesProduto.tsx
import { useParams } from 'react-router-dom';

// Definindo o tipo dos parâmetros
interface ProdutoParams {
  id: string;
}

function DetalhesProduto(): JSX.Element {
  // useParams com tipagem
  const { id } = useParams<keyof ProdutoParams>() as ProdutoParams;
  
  return (
    <div>
      <h1>Detalhes do Produto</h1>
      <p>Você está visualizando o produto com ID: {id}</p>
    </div>
  );
}

export default DetalhesProduto;
```

### Navegação Programática

Para navegar programaticamente (por exemplo, após um envio de formulário), use o hook `useNavigate`:

```tsx
// src/pages/Login.tsx
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    // Lógica de autenticação aqui...
    // Se autenticação bem-sucedida:
    navigate('/dashboard'); // Redireciona para o dashboard
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuário:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
```

### Rotas Protegidas

Para criar rotas que só são acessíveis a usuários autenticados:

```tsx
// src/components/RotaProtegida.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface RotaProtegidaProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}

function RotaProtegida({ 
  isAuthenticated, 
  redirectPath = '/login' 
}: RotaProtegidaProps): JSX.Element {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redireciona para o login, mas salva a localização atual
    // para poder voltar depois de autenticar
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default RotaProtegida;
```

```tsx
// src/App.tsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Perfil from './pages/Perfil';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import RotaProtegida from './components/RotaProtegida';

function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Função para autenticar o usuário (seria chamada no componente Login)
  const login = (): void => {
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login onLogin={login} />} />
        
        {/* Rotas protegidas */}
        <Route 
          element={<RotaProtegida isAuthenticated={isAuthenticated} />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
```

### Carregamento Lazy (Code Splitting)

Para melhorar a performance, você pode carregar componentes de forma lazy, dividindo seu código em chunks menores:

```tsx
// src/App.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Componentes carregados normalmente
import Home from './pages/Home';

// Componentes carregados de forma lazy
const Sobre = lazy(() => import('./pages/Sobre'));
const Contato = lazy(() => import('./pages/Contato'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        
        {/* Componentes lazy precisam ser envolvidos em Suspense */}
        <Route path="sobre" element={
          <Suspense fallback={<div>Carregando...</div>}>
            <Sobre />
          </Suspense>
        } />
        
        <Route path="contato" element={
          <Suspense fallback={<div>Carregando...</div>}>
            <Contato />
          </Suspense>
        } />
        
        <Route path="*" element={
          <Suspense fallback={<div>Carregando...</div>}>
            <NotFound />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
}

export default App;
```

### Acessando Parâmetros de Query

Para acessar parâmetros de query string (ex: `?search=termo`):

```tsx
// src/pages/Pesquisa.tsx
import { useSearchParams } from 'react-router-dom';

function Pesquisa(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const termo = searchParams.get('search') || '';

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const novoTermo = formData.get('termo') as string;
    
    // Atualiza a query string
    setSearchParams({ search: novoTermo });
  };

  return (
    <div>
      <h1>Pesquisa</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          name="termo" 
          defaultValue={termo} 
          placeholder="Digite sua pesquisa" 
        />
        <button type="submit">Pesquisar</button>
      </form>
      
      {termo && (
        <div>
          <h2>Resultados para: {termo}</h2>
          {/* Aqui você renderizaria os resultados da pesquisa */}
        </div>
      )}
    </div>
  );
}

export default Pesquisa;
```

### Melhores Práticas

1. **Organização de Rotas:**
   - Mantenha suas rotas organizadas em arquivos separados para aplicações maiores.
   - Use rotas aninhadas para representar hierarquias de UI.

2. **Tipagem:**
   - Sempre defina interfaces para seus parâmetros de rota e estados.
   - Use tipagem estrita com `useParams` e outros hooks do React Router.

3. **Lazy Loading:**
   - Use carregamento lazy para componentes de páginas grandes ou raramente acessadas.
   - Sempre forneça um fallback adequado em `Suspense`.

4. **Navegação:**
   - Prefira `Link` e `NavLink` para navegação declarativa.
   - Use `useNavigate` apenas para navegação programática (após submissões, autenticação, etc.).

5. **Rotas Protegidas:**
   - Implemente um sistema robusto de rotas protegidas para conteúdo que requer autenticação.
   - Salve a localização original para redirecionar o usuário após o login.

O React Router com TypeScript fornece uma maneira poderosa e tipada de gerenciar a navegação em suas aplicações React. Dominar esses conceitos é essencial para criar aplicações web modernas e responsivas.
