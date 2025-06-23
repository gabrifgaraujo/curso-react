## 6. Consumindo APIs Externas

Aplicações web modernas frequentemente precisam interagir com servidores para buscar ou enviar dados. Essas interações geralmente ocorrem através de APIs (Application Programming Interfaces), sendo as APIs RESTful (que usam HTTP e JSON) as mais comuns.

Em React, você normalmente consumirá APIs dentro do Hook `useEffect` para buscar dados quando o componente monta ou quando certas dependências mudam. Vamos explorar as duas formas mais comuns de fazer requisições HTTP em JavaScript: a Fetch API nativa e a biblioteca Axios.

### Usando a Fetch API

A Fetch API é uma interface moderna, baseada em Promises, para fazer requisições de rede. Ela é embutida nos navegadores modernos, então não requer instalação de pacotes adicionais.

**Requisição GET Básica:**

```jsx
import React, { useState, useEffect } from 'react';

function ListaDePosts() {
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Função assíncrona para buscar os dados
    async function buscarPosts() {
      try {
        setCarregando(true);
        const resposta = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5'); // Limita a 5 posts
        
        if (!resposta.ok) {
          // Se a resposta não for bem-sucedida (status não for 2xx)
          throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        
        const dados = await resposta.json(); // Converte a resposta para JSON
        setPosts(dados);
        setErro(null);
      } catch (e) {
        console.error("Erro ao buscar posts:", e);
        setErro(e.message);
        setPosts([]); // Limpa posts em caso de erro
      } finally {
        setCarregando(false);
      }
    }

    buscarPosts();
  }, []); // Array de dependências vazio: roda apenas na montagem

  if (carregando) return <p>Carregando posts...</p>;
  if (erro) return <p>Erro ao carregar posts: {erro}</p>;

  return (
    <div>
      <h1>Posts Recentes</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDePosts;
```

**Explicação:**

1.  Usamos `useState` para gerenciar `posts`, `carregando` e `erro`.
2.  Dentro de `useEffect`, definimos uma função `async buscarPosts`.
3.  `fetch('URL_DA_API')` faz uma requisição GET por padrão.
4.  `await fetch(...)` pausa a execução até que a Promise da requisição seja resolvida (a resposta do servidor chegue).
5.  `resposta.ok` verifica se o status HTTP está na faixa de sucesso (200-299).
6.  `await resposta.json()` converte o corpo da resposta (que é um ReadableStream) em um objeto JavaScript.
7.  Usamos um bloco `try...catch...finally` para tratamento de erros e para garantir que `setCarregando(false)` seja chamado.

**Requisição POST com Fetch:**

Para enviar dados (por exemplo, criar um novo recurso), você precisa configurar o método, cabeçalhos e corpo da requisição.

```jsx
async function criarNovoPost(dadosDoPost) {
  try {
    const resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST', // Especifica o método HTTP
      headers: {
        'Content-Type': 'application/json' // Informa ao servidor que estamos enviando JSON
      },
      body: JSON.stringify(dadosDoPost) // Converte o objeto JavaScript para uma string JSON
    });

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const postCriado = await resposta.json();
    console.log('Post criado:', postCriado);
    return postCriado;
  } catch (e) {
    console.error('Erro ao criar post:', e);
    throw e; // Re-lança o erro para ser tratado por quem chamou a função
  }
}

// Exemplo de uso:
// criarNovoPost({ title: 'Meu Novo Post', body: 'Conteúdo incrível!', userId: 1 });
```

### Axios: Uma Alternativa Popular

Axios é uma biblioteca de cliente HTTP baseada em Promise para o navegador e Node.js. Ela oferece algumas conveniências em relação à Fetch API nativa:

*   Transformação automática para JSON (tanto para envio quanto para recebimento).
*   Melhor tratamento de erros HTTP (Promises são rejeitadas para erros 4xx/5xx por padrão).
*   Proteção contra XSRF.
*   Capacidade de interceptar requisições e respostas.
*   Cancelamento de requisições.

**Instalação:**

```bash
npm install axios
```

**Requisição GET com Axios:**

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa o Axios

function ListaDeUsuariosAxios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarUsuarios() {
      try {
        setCarregando(true);
        // A resposta do Axios já contém os dados em `resposta.data`
        const resposta = await axios.get('https://jsonplaceholder.typicode.com/users?_limit=5');
        setUsuarios(resposta.data);
        setErro(null);
      } catch (e) {
        // Axios rejeita a promise para status de erro automaticamente
        console.error("Erro ao buscar usuários com Axios:", e);
        setErro(e.message);
        setUsuarios([]);
      } finally {
        setCarregando(false);
      }
    }

    buscarUsuarios();
  }, []);

  if (carregando) return <p>Carregando usuários...</p>;
  if (erro) return <p>Erro ao carregar usuários: {erro}</p>;

  return (
    <div>
      <h1>Usuários (com Axios)</h1>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            {usuario.name} ({usuario.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDeUsuariosAxios;
```

**Requisição POST com Axios:**

```javascript
import axios from 'axios';

async function adicionarTarefa(novaTarefa) {
  try {
    // O segundo argumento do axios.post é o corpo da requisição (payload)
    // Axios automaticamente define 'Content-Type': 'application/json' se o payload for um objeto
    const resposta = await axios.post('https://jsonplaceholder.typicode.com/todos', novaTarefa);
    console.log('Tarefa adicionada:', resposta.data);
    return resposta.data;
  } catch (e) {
    console.error('Erro ao adicionar tarefa com Axios:', e);
    throw e;
  }
}

// Exemplo de uso:
// adicionarTarefa({ title: 'Aprender Axios', completed: false, userId: 1 });
```

### Lidando com Respostas e Erros

Independentemente de usar Fetch ou Axios, um bom tratamento de estado de carregamento e erros é crucial para uma boa experiência do usuário.

**Padrão Comum:**

1.  **Estado de Carregamento (`loading`):**
    *   Defina `loading` como `true` antes de iniciar a requisição.
    *   Defina `loading` como `false` no bloco `finally` (ou após sucesso/erro) para garantir que ele seja sempre atualizado.
    *   Use o estado `loading` para exibir um indicador visual (spinner, mensagem "Carregando...").

2.  **Estado de Erro (`error`):**
    *   Defina `error` com a mensagem de erro no bloco `catch`.
    *   Limpe `error` (defina como `null`) no início de uma nova tentativa de requisição.
    *   Use o estado `error` para exibir uma mensagem de erro ao usuário.

3.  **Estado de Dados (`data`):**
    *   Atualize o estado `data` com os dados recebidos em caso de sucesso.
    *   Considere limpar ou redefinir `data` em caso de erro, dependendo da UI.

**Cancelamento de Requisições (Avançado, mas importante):**

Se um componente é desmontado enquanto uma requisição está em andamento, tentar atualizar o estado (`setData`, `setError`, etc.) nesse componente desmontado causará um erro no React ("Can't perform a React state update on an unmounted component").

Para evitar isso, você deve cancelar a requisição na função de limpeza do `useEffect`.

*   **Com Fetch API:** Use `AbortController`.

    ```jsx
    useEffect(() => {
      const abortController = new AbortController();
      const signal = abortController.signal;

      async function fetchData() {
        try {
          const response = await fetch(url, { signal }); // Passa o signal para o fetch
          // ... processar resposta
        } catch (error) {
          if (error.name === 'AbortError') {
            console.log('Requisição abortada');
          } else {
            // tratar outros erros
          }
        }
      }
      fetchData();

      return () => {
        abortController.abort(); // Aborta a requisição quando o componente desmonta
      };
    }, [url]);
    ```

*   **Com Axios:** Axios suporta cancelamento usando um `CancelToken` (legado) ou, mais recentemente, também integrando-se com `AbortController`.

    ```jsx
    // Usando AbortController com Axios (recomendado para novas versões)
    useEffect(() => {
      const abortController = new AbortController();

      async function fetchData() {
        try {
          const response = await axios.get(url, { signal: abortController.signal });
          // ... processar resposta
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Requisição Axios abortada:', error.message);
          } else {
            // tratar outros erros
          }
        }
      }
      fetchData();

      return () => {
        abortController.abort();
      };
    }, [url]);
    ```

Consumir APIs é uma tarefa fundamental no desenvolvimento frontend. Escolher entre Fetch e Axios muitas vezes é uma questão de preferência e dos requisitos específicos do projeto, mas ambas são capazes de realizar o trabalho. O mais importante é entender o fluxo assíncrono, o tratamento de Promises e como integrar essas operações de forma segura e eficiente nos seus componentes React.

