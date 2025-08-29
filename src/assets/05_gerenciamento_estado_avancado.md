## 5. Gerenciamento de Estado Avançado com TypeScript (Visão Geral)

À medida que suas aplicações React crescem em complexidade, gerenciar o estado pode se tornar um desafio. O `useState` é ótimo para estado local de componentes, e o `useContext` ajuda a evitar "prop drilling" para dados globais. No entanto, para estados globais mais complexos, com muitas atualizações ou lógica de negócios intrincada, essas ferramentas podem não ser suficientes ou podem levar a problemas de performance e organização.

É aqui que entram as bibliotecas de gerenciamento de estado dedicadas.

### Quando o Context API Pode Não Ser Suficiente

O Context API é uma ferramenta poderosa, mas tem algumas limitações em cenários de alta complexidade:

*   **Performance:** Quando um valor no Contexto muda, todos os componentes que consomem esse Contexto são re-renderizados, mesmo que não estejam interessados na parte específica do estado que mudou. Para estados que mudam com muita frequência ou são muito grandes, isso pode levar a gargalos de performance.
*   **Organização da Lógica de Atualização:** Para lógica de atualização de estado mais complexa (múltiplas ações que modificam o estado de maneiras diferentes), o Context API por si só não oferece uma estrutura robusta. Você acaba implementando seus próprios reducers e dispatchers, o que pode se tornar difícil de manter.
*   **Ferramentas de Debugging:** Bibliotecas dedicadas geralmente vêm com ferramentas de desenvolvimento (DevTools) que facilitam o debugging do estado da aplicação.

### Redux com TypeScript

Redux é uma das bibliotecas de gerenciamento de estado mais populares para aplicações JavaScript. Ela implementa o padrão Flux, onde o estado é armazenado em uma "store" centralizada, e as mudanças são feitas através de "actions" que são processadas por "reducers".

#### Conceitos Básicos do Redux

*   **Store:** Um objeto JavaScript que contém o estado global da aplicação.
*   **Actions:** Objetos JavaScript que descrevem o que aconteceu (ex: `{ type: 'ADD_TODO', payload: { text: 'Comprar leite' } }`).
*   **Reducers:** Funções puras que recebem o estado atual e uma action, e retornam um novo estado.
*   **Dispatch:** Método para enviar actions para o store, iniciando o processo de atualização do estado.

#### Configurando Redux com TypeScript

Primeiro, instale as dependências necessárias:

```bash
npm install redux react-redux @reduxjs/toolkit @types/react-redux
```

O Redux Toolkit (`@reduxjs/toolkit`) é a abordagem recomendada para escrever código Redux. Ele simplifica a configuração e reduz o boilerplate.

**Definindo Tipos:**

```tsx
// src/types/todo.ts
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

// Definindo o estado inicial
export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null
};
```

**Criando Slices com Redux Toolkit:**

```tsx
// src/features/todos/todosSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoState, initialState } from '../../types/todo';

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Adicionar uma nova tarefa
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false
      };
      state.todos.push(newTodo);
    },
    // Alternar o status de uma tarefa
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // Remover uma tarefa
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    }
  }
});

// Exportando actions e reducer
export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;
```

**Configurando a Store:**

```tsx
// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer
  }
});

// Inferindo os tipos `RootState` e `AppDispatch` da própria store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**Criando Hooks Tipados:**

```tsx
// src/app/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use em toda a aplicação em vez de `useDispatch` e `useSelector` padrão
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

**Provendo a Store para a Aplicação:**

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

**Usando Redux em Componentes:**

```tsx
// src/components/TodoList.tsx
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { addTodo, toggleTodo, removeTodo } from '../features/todos/todosSlice';

const TodoList: React.FC = () => {
  const [text, setText] = useState<string>('');
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector(state => state.todos);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Adicionar nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

### Zustand com TypeScript

Zustand é uma biblioteca de gerenciamento de estado minimalista que tem ganhado popularidade por sua simplicidade e facilidade de uso. Ela oferece uma API simples baseada em hooks, sem boilerplate, e é otimizada para TypeScript.

#### Instalação:

```bash
npm install zustand
```

#### Criando uma Store com Zustand:

```tsx
// src/stores/useTodoStore.ts
import create from 'zustand';

// Definindo a interface da store
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

// Criando a store
const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, {
      id: Date.now(),
      text,
      completed: false
    }]
  })),
  
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
  
  removeTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  }))
}));

export default useTodoStore;
```

#### Usando Zustand em Componentes:

```tsx
// src/components/TodoListZustand.tsx
import React, { useState } from 'react';
import useTodoStore from '../stores/useTodoStore';

const TodoListZustand: React.FC = () => {
  const [text, setText] = useState<string>('');
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <div>
      <h1>Lista de Tarefas (Zustand)</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Adicionar nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListZustand;
```

### Jotai com TypeScript

Jotai é uma biblioteca de gerenciamento de estado atômica para React, inspirada pelo Recoil. Ela permite que você defina pequenos pedaços de estado (átomos) e os combine para formar estados mais complexos.

#### Instalação:

```bash
npm install jotai
```

#### Criando Átomos com Jotai:

```tsx
// src/atoms/todoAtoms.ts
import { atom } from 'jotai';

// Definindo a interface para uma tarefa
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Átomo para a lista de tarefas
export const todosAtom = atom<Todo[]>([]);

// Átomo derivado para tarefas ativas (não concluídas)
export const activeTodosAtom = atom<Todo[]>(
  (get) => get(todosAtom).filter(todo => !todo.completed)
);

// Átomo derivado para tarefas concluídas
export const completedTodosAtom = atom<Todo[]>(
  (get) => get(todosAtom).filter(todo => todo.completed)
);

// Átomo para adicionar uma nova tarefa
export const addTodoAtom = atom(
  null, // null porque este átomo é apenas para escrita
  (get, set, text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    };
    set(todosAtom, [...get(todosAtom), newTodo]);
  }
);

// Átomo para alternar o status de uma tarefa
export const toggleTodoAtom = atom(
  null,
  (get, set, id: number) => {
    set(todosAtom, 
      get(todosAtom).map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
);

// Átomo para remover uma tarefa
export const removeTodoAtom = atom(
  null,
  (get, set, id: number) => {
    set(todosAtom, get(todosAtom).filter(todo => todo.id !== id));
  }
);
```

#### Usando Jotai em Componentes:

```tsx
// src/components/TodoListJotai.tsx
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { 
  todosAtom, 
  addTodoAtom, 
  toggleTodoAtom, 
  removeTodoAtom,
  activeTodosAtom,
  completedTodosAtom
} from '../atoms/todoAtoms';

const TodoListJotai: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [todos] = useAtom(todosAtom);
  const [activeTodos] = useAtom(activeTodosAtom);
  const [completedTodos] = useAtom(completedTodosAtom);
  const [, addTodo] = useAtom(addTodoAtom);
  const [, toggleTodo] = useAtom(toggleTodoAtom);
  const [, removeTodo] = useAtom(removeTodoAtom);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <div>
      <h1>Lista de Tarefas (Jotai)</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Adicionar nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>
      
      <div>
        <p>Total: {todos.length}, Ativas: {activeTodos.length}, Concluídas: {completedTodos.length}</p>
      </div>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListJotai;
```

### Comparação e Quando Usar Cada Um

**Redux:**
- **Prós:** Ecossistema maduro, DevTools excelentes, middleware para efeitos colaterais (Redux Saga, Redux Thunk), grande comunidade.
- **Contras:** Mais verboso, curva de aprendizado mais íngreme.
- **Quando usar:** Aplicações grandes com estado complexo, equipes grandes que precisam de convenções rígidas, quando você precisa de ferramentas de debugging avançadas.

**Zustand:**
- **Prós:** API simples e minimalista, pouco boilerplate, boa integração com TypeScript, performance sólida.
- **Contras:** Menos ferramentas de debugging em comparação com Redux, ecossistema menor.
- **Quando usar:** Aplicações pequenas a médias, quando você quer algo simples e direto ao ponto, quando Redux parece excessivo.

**Jotai:**
- **Prós:** Abordagem atômica que evita re-renderizações desnecessárias, boa integração com TypeScript, API simples.
- **Contras:** Abordagem diferente que pode exigir uma mudança de mentalidade, ecossistema em crescimento.
- **Quando usar:** Quando você precisa de granularidade fina no gerenciamento de estado, quando a performance de renderização é crítica.

### Considerações Finais

Não existe uma solução única para todos os casos. A escolha da biblioteca de gerenciamento de estado depende das necessidades específicas do seu projeto, do tamanho da equipe, da complexidade do estado e das preferências pessoais.

Para projetos menores ou quando você está começando, o Context API com `useReducer` pode ser suficiente. À medida que seu projeto cresce, considere adotar uma das bibliotecas mencionadas acima.

Independentemente da biblioteca escolhida, o TypeScript adiciona uma camada valiosa de segurança de tipos que ajuda a evitar bugs comuns relacionados ao estado e torna o código mais fácil de entender e manter.
