## 6. Consumindo APIs com React e TypeScript

Consumir dados de APIs é uma parte fundamental de muitas aplicações React modernas. Com TypeScript, podemos adicionar tipagem estática às nossas chamadas de API, tornando o código mais seguro e fornecendo melhor autocompletar e documentação.

### Métodos para Consumir APIs

Existem várias maneiras de fazer requisições HTTP em aplicações React:

1. **Fetch API**: API nativa do navegador para fazer requisições HTTP
2. **Axios**: Biblioteca popular baseada em Promises para requisições HTTP
3. **React Query**: Biblioteca para gerenciamento de estado de dados remotos
4. **SWR**: Biblioteca para busca de dados com estratégias de cache e revalidação

Vamos explorar cada uma delas com TypeScript.

### Fetch API com TypeScript

A Fetch API é nativa do navegador e não requer instalação de pacotes adicionais.

**Exemplo Básico:**

```tsx
// Definindo a interface para os dados que esperamos receber
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Componente que busca e exibe um post
function PostComponent(): JSX.Element {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Função assíncrona para buscar dados
    const fetchPost = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        // Verificando se a resposta foi bem-sucedida
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        // Convertendo a resposta para JSON com tipagem
        const data: Post = await response.json();
        setPost(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido');
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!post) return <p>Nenhum post encontrado</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
```

**Enviando Dados com POST:**

```tsx
// Interface para os dados que vamos enviar
interface NewPost {
  title: string;
  body: string;
  userId: number;
}

// Interface para a resposta esperada
interface PostResponse extends NewPost {
  id: number;
}

// Função para criar um novo post
async function createPost(postData: NewPost): Promise<PostResponse> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  return response.json() as Promise<PostResponse>;
}

// Uso em um componente
function CreatePostForm(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [createdPost, setCreatedPost] = useState<PostResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    const newPost: NewPost = {
      title,
      body,
      userId: 1 // Valor fixo para exemplo
    };

    try {
      setIsSubmitting(true);
      setError(null);
      
      const result = await createPost(newPost);
      setCreatedPost(result);
      
      // Limpar o formulário
      setTitle('');
      setBody('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Criar Novo Post</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="body">Conteúdo:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Criar Post'}
        </button>
      </form>
      
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      
      {createdPost && (
        <div>
          <h3>Post criado com sucesso!</h3>
          <p>ID: {createdPost.id}</p>
          <p>Título: {createdPost.title}</p>
        </div>
      )}
    </div>
  );
}
```

### Axios com TypeScript

Axios é uma biblioteca popular para fazer requisições HTTP. Ela oferece uma API mais amigável que a Fetch API e funciona tanto no navegador quanto no Node.js.

**Instalação:**

```bash
npm install axios
```

**Exemplo Básico:**

```tsx
import axios from 'axios';
import { useState, useEffect } from 'react';

// Definindo a interface para os dados
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

function UserProfile({ userId }: { userId: number }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Função para buscar dados do usuário
    const fetchUser = async (): Promise<void> => {
      try {
        setLoading(true);
        // Axios já converte automaticamente a resposta para JSON
        const response = await axios.get<User>(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        
        setUser(response.data);
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          // Erro específico do Axios
          setError(err.response?.data?.message || err.message);
        } else {
          // Erro genérico
          setError('Ocorreu um erro desconhecido');
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!user) return <p>Usuário não encontrado</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Telefone: {user.phone}</p>
      <p>Website: {user.website}</p>
    </div>
  );
}
```

**Criando uma Instância do Axios:**

```tsx
// src/services/api.ts
import axios, { AxiosInstance } from 'axios';

// Criando uma instância do Axios com configuração personalizada
const api: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // Você pode adicionar headers padrão aqui, como tokens de autenticação
    // 'Authorization': `Bearer ${token}`
  }
});

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    // Você pode modificar a configuração da requisição aqui
    // Por exemplo, adicionar um token de autenticação
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para respostas
api.interceptors.response.use(
  (response) => {
    // Você pode processar a resposta aqui antes de retorná-la
    return response;
  },
  (error) => {
    // Tratamento global de erros
    if (error.response) {
      // O servidor respondeu com um status de erro
      console.error('Erro de resposta:', error.response.status, error.response.data);
      
      // Exemplo: redirecionar para login se o status for 401 (não autorizado)
      // if (error.response.status === 401) {
      //   // Redirecionar para a página de login
      // }
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      console.error('Erro de requisição:', error.request);
    } else {
      // Algo aconteceu na configuração da requisição que gerou um erro
      console.error('Erro:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

**Usando a Instância do Axios:**

```tsx
// src/services/userService.ts
import api from './api';

// Interfaces
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  phone: string;
  website: string;
}

// Funções para operações relacionadas a usuários
export const userService = {
  // Buscar todos os usuários
  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },
  
  // Buscar um usuário pelo ID
  getById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
  
  // Criar um novo usuário
  create: async (userData: CreateUserData): Promise<User> => {
    const response = await api.post<User>('/users', userData);
    return response.data;
  },
  
  // Atualizar um usuário
  update: async (id: number, userData: Partial<CreateUserData>): Promise<User> => {
    const response = await api.put<User>(`/users/${id}`, userData);
    return response.data;
  },
  
  // Excluir um usuário
  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  }
};
```

**Usando o Serviço em um Componente:**

```tsx
// src/components/UserList.tsx
import { useState, useEffect } from 'react';
import { userService, User } from '../services/userService';

function UserList(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async (): Promise<void> => {
      try {
        setLoading(true);
        const data = await userService.getAll();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar usuários');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleDeleteUser = async (id: number): Promise<void> => {
    try {
      await userService.delete(id);
      // Atualiza a lista removendo o usuário excluído
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError('Falha ao excluir usuário');
      console.error(err);
    }
  };

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (users.length === 0) return <p>Nenhum usuário encontrado</p>;

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
            <button onClick={() => handleDeleteUser(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```

### React Query com TypeScript

React Query é uma biblioteca para gerenciamento de estado de dados remotos. Ela facilita o fetching, caching, sincronização e atualização de dados do servidor.

**Instalação:**

```bash
npm install @tanstack/react-query
```

**Configuração:**

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import './index.css';

// Cria um cliente do React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Desativa o refetch automático quando a janela ganha foco
      retry: 1, // Número de tentativas em caso de falha
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} /> {/* Ferramenta de desenvolvimento */}
    </QueryClientProvider>
  </React.StrictMode>
);
```

**Hooks Personalizados com React Query:**

```tsx
// src/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, User, CreateUserData } from '../services/userService';

// Hook para buscar todos os usuários
export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });
}

// Hook para buscar um usuário específico
export function useUser(id: number) {
  return useQuery<User, Error>({
    queryKey: ['users', id],
    queryFn: () => userService.getById(id),
    enabled: !!id, // Só executa se o ID for válido
  });
}

// Hook para criar um usuário
export function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation<User, Error, CreateUserData>({
    mutationFn: userService.create,
    onSuccess: () => {
      // Invalida a query 'users' para forçar um refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// Hook para atualizar um usuário
export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation<User, Error, { id: number; data: Partial<CreateUserData> }>({
    mutationFn: ({ id, data }) => userService.update(id, data),
    onSuccess: (data) => {
      // Atualiza o cache para o usuário específico
      queryClient.setQueryData(['users', data.id], data);
      // Invalida a query 'users' para forçar um refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// Hook para excluir um usuário
export function useDeleteUser() {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, number>({
    mutationFn: userService.delete,
    onSuccess: (_, id) => {
      // Remove o usuário do cache
      queryClient.removeQueries({ queryKey: ['users', id] });
      // Atualiza a lista de usuários
      queryClient.setQueryData<User[] | undefined>(['users'], (oldData) => {
        return oldData ? oldData.filter(user => user.id !== id) : undefined;
      });
    },
  });
}
```

**Usando os Hooks em Componentes:**

```tsx
// src/components/UserListWithReactQuery.tsx
import { useUsers, useDeleteUser } from '../hooks/useUsers';

function UserListWithReactQuery(): JSX.Element {
  const { data: users, isLoading, error } = useUsers();
  const deleteUser = useDeleteUser();

  const handleDeleteUser = (id: number): void => {
    deleteUser.mutate(id);
  };

  if (isLoading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro: {error.message}</p>;
  if (!users || users.length === 0) return <p>Nenhum usuário encontrado</p>;

  return (
    <div>
      <h1>Lista de Usuários</h1>
      {deleteUser.isLoading && <p>Excluindo usuário...</p>}
      {deleteUser.isError && <p>Erro ao excluir: {deleteUser.error.message}</p>}
      
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
            <button 
              onClick={() => handleDeleteUser(user.id)}
              disabled={deleteUser.isLoading}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserListWithReactQuery;
```

```tsx
// src/components/UserForm.tsx
import { useState } from 'react';
import { useCreateUser } from '../hooks/useUsers';
import { CreateUserData } from '../services/userService';

function UserForm(): JSX.Element {
  const [userData, setUserData] = useState<CreateUserData>({
    name: '',
    email: '',
    phone: '',
    website: ''
  });

  const createUser = useCreateUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    createUser.mutate(userData, {
      onSuccess: () => {
        // Limpar o formulário após sucesso
        setUserData({
          name: '',
          email: '',
          phone: '',
          website: ''
        });
      }
    });
  };

  return (
    <div>
      <h2>Adicionar Usuário</h2>
      
      {createUser.isLoading && <p>Enviando...</p>}
      {createUser.isError && <p>Erro: {createUser.error.message}</p>}
      {createUser.isSuccess && <p>Usuário criado com sucesso!</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone">Telefone:</label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={userData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="website">Website:</label>
          <input
            id="website"
            name="website"
            type="text"
            value={userData.website}
            onChange={handleChange}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={createUser.isLoading}
        >
          Adicionar Usuário
        </button>
      </form>
    </div>
  );
}

export default UserForm;
```

### SWR com TypeScript

SWR (stale-while-revalidate) é uma biblioteca para busca de dados desenvolvida pela Vercel. Ela implementa estratégias de cache e revalidação para manter os dados sempre atualizados.

**Instalação:**

```bash
npm install swr
```

**Configuração:**

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SWRConfig } from 'swr';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SWRConfig 
      value={{
        fetcher: (url: string) => fetch(url).then(res => {
          if (!res.ok) {
            throw new Error('Falha na requisição');
          }
          return res.json();
        }),
        revalidateOnFocus: false,
        shouldRetryOnError: false
      }}
    >
      <App />
    </SWRConfig>
  </React.StrictMode>
);
```

**Hooks Personalizados com SWR:**

```tsx
// src/hooks/useSWRUsers.ts
import useSWR, { mutate } from 'swr';
import { User, CreateUserData } from '../services/userService';
import api from '../services/api';

const API_URL = 'https://jsonplaceholder.typicode.com';

// Hook para buscar todos os usuários
export function useUsers() {
  return useSWR<User[], Error>(`${API_URL}/users`);
}

// Hook para buscar um usuário específico
export function useUser(id: number | null) {
  return useSWR<User, Error>(id ? `${API_URL}/users/${id}` : null);
}

// Função para criar um usuário
export async function createUser(userData: CreateUserData): Promise<User> {
  const response = await api.post<User>('/users', userData);
  
  // Atualiza o cache
  await mutate(`${API_URL}/users`);
  
  return response.data;
}

// Função para atualizar um usuário
export async function updateUser(id: number, userData: Partial<CreateUserData>): Promise<User> {
  const response = await api.put<User>(`/users/${id}`, userData);
  
  // Atualiza o cache
  await mutate(`${API_URL}/users/${id}`);
  await mutate(`${API_URL}/users`);
  
  return response.data;
}

// Função para excluir um usuário
export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}`);
  
  // Atualiza o cache
  await mutate(`${API_URL}/users`, (users: User[] | undefined) => {
    return users ? users.filter(user => user.id !== id) : undefined;
  }, false);
}
```

**Usando os Hooks em Componentes:**

```tsx
// src/components/UserListWithSWR.tsx
import { useState } from 'react';
import { useUsers, deleteUser } from '../hooks/useSWRUsers';

function UserListWithSWR(): JSX.Element {
  const { data: users, error, isLoading } = useUsers();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDeleteUser = async (id: number): Promise<void> => {
    try {
      setIsDeleting(true);
      setDeleteError(null);
      await deleteUser(id);
    } catch (err) {
      setDeleteError('Falha ao excluir usuário');
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro: {error.message}</p>;
  if (!users || users.length === 0) return <p>Nenhum usuário encontrado</p>;

  return (
    <div>
      <h1>Lista de Usuários</h1>
      {isDeleting && <p>Excluindo usuário...</p>}
      {deleteError && <p>{deleteError}</p>}
      
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
            <button 
              onClick={() => handleDeleteUser(user.id)}
              disabled={isDeleting}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserListWithSWR;
```

### Tratamento de Erros e Loading States

Independentemente da biblioteca que você escolher, é importante tratar adequadamente os estados de carregamento e erro:

```tsx
// Componente genérico para estados de carregamento/erro
interface AsyncContentProps<T> {
  isLoading: boolean;
  error: Error | null;
  data: T | null | undefined;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  children: (data: T) => React.ReactNode;
}

function AsyncContent<T>({
  isLoading,
  error,
  data,
  loadingComponent = <p>Carregando...</p>,
  errorComponent,
  emptyComponent = <p>Nenhum dado encontrado</p>,
  children
}: AsyncContentProps<T>): JSX.Element {
  if (isLoading) {
    return <>{loadingComponent}</>;
  }

  if (error) {
    return <>{errorComponent || <p>Erro: {error.message}</p>}</>;
  }

  if (!data) {
    return <>{emptyComponent}</>;
  }

  return <>{children(data)}</>;
}

// Uso:
function UserDetails({ userId }: { userId: number }): JSX.Element {
  const { data, isLoading, error } = useUser(userId);

  return (
    <AsyncContent
      isLoading={isLoading}
      error={error}
      data={data}
      loadingComponent={<p>Carregando detalhes do usuário...</p>}
      emptyComponent={<p>Usuário não encontrado</p>}
    >
      {(user) => (
        <div>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Telefone: {user.phone}</p>
        </div>
      )}
    </AsyncContent>
  );
}
```

### Considerações Finais

Ao consumir APIs com React e TypeScript, considere:

1. **Tipagem:** Defina interfaces claras para seus dados e respostas de API.
2. **Tratamento de Erros:** Implemente tratamento de erros robusto para diferentes cenários.
3. **Estados de Carregamento:** Forneça feedback visual durante operações assíncronas.
4. **Caching:** Use bibliotecas como React Query ou SWR para gerenciar cache e revalidação.
5. **Abstração:** Crie serviços e hooks personalizados para encapsular a lógica de API.

A escolha entre Fetch API, Axios, React Query ou SWR depende das necessidades específicas do seu projeto. Para aplicações simples, Fetch ou Axios podem ser suficientes. Para aplicações mais complexas com necessidades avançadas de gerenciamento de estado e cache, React Query ou SWR são excelentes opções.

Independentemente da escolha, TypeScript adiciona uma camada valiosa de segurança de tipos que ajuda a evitar bugs comuns relacionados a dados e torna o código mais fácil de entender e manter.
