## 10. Projeto Prático: TodoList com TypeScript

Neste capítulo, vamos desenvolver um projeto prático completo: uma aplicação TodoList usando React com TypeScript e Vite. Este projeto irá consolidar os conceitos que aprendemos até agora e demonstrar como aplicá-los em um cenário real.

### Configuração Inicial do Projeto

Primeiro, vamos criar um novo projeto React com TypeScript usando Vite:

```bash
npm create vite@latest todo-list-ts -- --template react-ts
cd todo-list-ts
npm install
```

### Estrutura de Diretórios

Vamos organizar nosso projeto com a seguinte estrutura:

```
src/
├── components/       # Componentes reutilizáveis
│   ├── TodoForm.tsx
│   ├── TodoItem.tsx
│   └── TodoList.tsx
├── contexts/         # Contextos para gerenciamento de estado
│   └── TodoContext.tsx
├── hooks/            # Hooks personalizados
│   └── useTodos.ts
├── types/            # Definições de tipos
│   └── todo.ts
├── utils/            # Funções utilitárias
│   └── storage.ts
├── App.tsx           # Componente principal
└── main.tsx          # Ponto de entrada
```

### Definindo os Tipos

Vamos começar definindo os tipos para nossas tarefas:

```typescript
// src/types/todo.ts
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export type TodoStatus = 'all' | 'active' | 'completed';

export interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  filter: TodoStatus;
  setFilter: (filter: TodoStatus) => void;
  remainingCount: number;
  completedCount: number;
}
```

### Implementando o Armazenamento Local

Vamos criar um utilitário para persistir as tarefas no localStorage:

```typescript
// src/utils/storage.ts
import { Todo } from '../types/todo';

// Chave para armazenamento no localStorage
const STORAGE_KEY = 'todos-react-ts';

// Função para carregar tarefas do localStorage
export function loadTodos(): Todo[] {
  const todosJson = localStorage.getItem(STORAGE_KEY);
  
  if (!todosJson) {
    return [];
  }
  
  try {
    // Precisamos converter as strings de data de volta para objetos Date
    return JSON.parse(todosJson, (key, value) => {
      if (key === 'createdAt') {
        return new Date(value);
      }
      return value;
    });
  } catch (e) {
    console.error('Erro ao carregar tarefas do localStorage:', e);
    return [];
  }
}

// Função para salvar tarefas no localStorage
export function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
```

### Criando o Contexto para Gerenciamento de Estado

Vamos criar um contexto para gerenciar o estado das tarefas:

```typescript
// src/contexts/TodoContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoStatus, TodoContextType } from '../types/todo';
import { loadTodos, saveTodos } from '../utils/storage';

// Criando o contexto com um valor inicial undefined
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Props para o provedor de contexto
interface TodoProviderProps {
  children: ReactNode;
}

// Provedor de contexto
export function TodoProvider({ children }: TodoProviderProps): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoStatus>('all');

  // Carregar tarefas do localStorage ao iniciar
  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  // Salvar tarefas no localStorage quando mudam
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // Adicionar uma nova tarefa
  const addTodo = (text: string): void => {
    if (text.trim()) {
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          text: text.trim(),
          completed: false,
          createdAt: new Date()
        }
      ]);
    }
  };

  // Alternar o status de uma tarefa
  const toggleTodo = (id: string): void => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Excluir uma tarefa
  const deleteTodo = (id: string): void => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Limpar todas as tarefas concluídas
  const clearCompleted = (): void => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Contadores
  const remainingCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - remainingCount;

  // Valor do contexto
  const value: TodoContextType = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    filter,
    setFilter,
    remainingCount,
    completedCount
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

// Hook personalizado para usar o contexto
export function useTodoContext(): TodoContextType {
  const context = useContext(TodoContext);
  
  if (context === undefined) {
    throw new Error('useTodoContext deve ser usado dentro de um TodoProvider');
  }
  
  return context;
}
```

### Criando o Hook Personalizado para Filtrar Tarefas

```typescript
// src/hooks/useTodos.ts
import { useMemo } from 'react';
import { Todo, TodoStatus } from '../types/todo';
import { useTodoContext } from '../contexts/TodoContext';

export function useTodos() {
  const { todos, filter } = useTodoContext();
  
  // Filtra as tarefas com base no filtro atual
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);
  
  // Ordena as tarefas por data de criação (mais recentes primeiro)
  const sortedTodos = useMemo(() => {
    return [...filteredTodos].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }, [filteredTodos]);
  
  return sortedTodos;
}
```

### Implementando os Componentes

Agora, vamos implementar os componentes da nossa aplicação:

```typescript
// src/components/TodoForm.tsx
import React, { useState, FormEvent } from 'react';
import { useTodoContext } from '../contexts/TodoContext';

function TodoForm(): JSX.Element {
  const [text, setText] = useState<string>('');
  const { addTodo } = useTodoContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="O que precisa ser feito?"
        className="todo-input"
      />
      <button type="submit" className="todo-button">
        Adicionar
      </button>
    </form>
  );
}

export default TodoForm;
```

```typescript
// src/components/TodoItem.tsx
import React from 'react';
import { Todo } from '../types/todo';
import { useTodoContext } from '../contexts/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps): JSX.Element {
  const { toggleTodo, deleteTodo } = useTodoContext();

  // Formata a data de criação
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(todo.createdAt);

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="todo-checkbox"
        />
        <span className="todo-text">{todo.text}</span>
        <small className="todo-date">{formattedDate}</small>
      </div>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="todo-delete"
        aria-label="Excluir tarefa"
      >
        ×
      </button>
    </li>
  );
}

export default TodoItem;
```

```typescript
// src/components/TodoList.tsx
import React from 'react';
import TodoItem from './TodoItem';
import { useTodos } from '../hooks/useTodos';
import { useTodoContext } from '../contexts/TodoContext';
import { TodoStatus } from '../types/todo';

function TodoList(): JSX.Element {
  const todos = useTodos();
  const {
    filter,
    setFilter,
    remainingCount,
    completedCount,
    clearCompleted
  } = useTodoContext();

  // Função para alternar o filtro
  const handleFilterChange = (newFilter: TodoStatus): void => {
    setFilter(newFilter);
  };

  return (
    <div className="todo-list-container">
      {todos.length > 0 ? (
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : (
        <p className="empty-message">
          {filter === 'all'
            ? 'Nenhuma tarefa adicionada.'
            : filter === 'active'
            ? 'Nenhuma tarefa ativa.'
            : 'Nenhuma tarefa concluída.'}
        </p>
      )}

      <div className="todo-footer">
        <span className="todo-count">
          {remainingCount} {remainingCount === 1 ? 'tarefa' : 'tarefas'} restante
          {remainingCount !== 1 ? 's' : ''}
        </span>

        <div className="todo-filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => handleFilterChange('all')}
          >
            Todas
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => handleFilterChange('active')}
          >
            Ativas
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => handleFilterChange('completed')}
          >
            Concluídas
          </button>
        </div>

        {completedCount > 0 && (
          <button className="clear-completed" onClick={clearCompleted}>
            Limpar concluídas
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoList;
```

### Implementando o Componente Principal

```typescript
// src/App.tsx
import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { TodoProvider } from './contexts/TodoContext';
import './App.css';

function App(): JSX.Element {
  return (
    <TodoProvider>
      <div className="todo-app">
        <h1>Lista de Tarefas</h1>
        <TodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
```

### Estilizando a Aplicação

Vamos adicionar alguns estilos para nossa aplicação:

```css
/* src/App.css */
:root {
  --primary-color: #4caf50;
  --secondary-color: #f44336;
  --text-color: #333;
  --bg-color: #f9f9f9;
  --item-bg: #fff;
  --border-color: #ddd;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--bg-color);
  padding: 20px;
}

.todo-app {
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--item-bg);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.todo-form {
  display: flex;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.todo-button {
  padding: 10px 15px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;
}

.todo-button:hover {
  background-color: #45a049;
}

.todo-list {
  list-style: none;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #888;
}

.todo-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.todo-checkbox {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}

.todo-text {
  flex: 1;
}

.todo-date {
  margin-left: 10px;
  color: #888;
  font-size: 12px;
}

.todo-delete {
  background-color: transparent;
  border: none;
  color: var(--secondary-color);
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;
}

.todo-delete:hover {
  color: #d32f2f;
}

.todo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  font-size: 14px;
  flex-wrap: wrap;
}

.todo-count {
  color: #777;
}

.todo-filters {
  display: flex;
}

.todo-filters button {
  background-color: transparent;
  border: 1px solid transparent;
  color: #777;
  margin: 0 5px;
  padding: 3px 7px;
  border-radius: 3px;
  cursor: pointer;
}

.todo-filters button.active {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.clear-completed {
  background-color: transparent;
  border: none;
  color: #888;
  cursor: pointer;
}

.clear-completed:hover {
  text-decoration: underline;
  color: var(--secondary-color);
}

.empty-message {
  text-align: center;
  color: #888;
  padding: 20px 0;
}

@media (max-width: 600px) {
  .todo-footer {
    flex-direction: column;
    gap: 10px;
  }
  
  .todo-filters {
    order: -1;
    margin-bottom: 10px;
  }
}
```

### Configurando o Ponto de Entrada

```typescript
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Instalando Dependências Adicionais

Precisamos instalar a biblioteca uuid para gerar IDs únicos:

```bash
npm install uuid
npm install --save-dev @types/uuid
```

### Executando a Aplicação

Para executar a aplicação:

```bash
npm run dev
```

### Adicionando Funcionalidades Avançadas

Vamos adicionar algumas funcionalidades avançadas à nossa aplicação:

#### 1. Edição de Tarefas

Vamos modificar o componente `TodoItem` para permitir a edição de tarefas:

```typescript
// src/contexts/TodoContext.tsx (adicionar função)
// ...
// Atualizar o texto de uma tarefa
const updateTodoText = (id: string, text: string): void => {
  if (text.trim()) {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: text.trim() } : todo
      )
    );
  }
};

// Adicionar ao valor do contexto
const value: TodoContextType = {
  // ...
  updateTodoText,
  // ...
};
// ...
```

```typescript
// src/types/todo.ts (atualizar interface)
export interface TodoContextType {
  // ...
  updateTodoText: (id: string, text: string) => void;
  // ...
}
```

```typescript
// src/components/TodoItem.tsx (modificar)
import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../types/todo';
import { useTodoContext } from '../contexts/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps): JSX.Element {
  const { toggleTodo, deleteTodo, updateTodoText } = useTodoContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);
  const editInputRef = useRef<HTMLInputElement>(null);

  // Formata a data de criação
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(todo.createdAt);

  // Focar no input quando entrar no modo de edição
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const handleSave = (): void => {
    if (editText.trim() !== todo.text) {
      updateTodoText(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="todo-checkbox"
        />
        
        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="todo-edit-input"
          />
        ) : (
          <span className="todo-text" onDoubleClick={handleEdit}>
            {todo.text}
          </span>
        )}
        
        <small className="todo-date">{formattedDate}</small>
      </div>
      
      <button
        onClick={() => deleteTodo(todo.id)}
        className="todo-delete"
        aria-label="Excluir tarefa"
      >
        ×
      </button>
    </li>
  );
}

export default TodoItem;
```

Adicione os estilos para o input de edição:

```css
/* src/App.css (adicionar) */
.todo-edit-input {
  flex: 1;
  padding: 5px;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  font-size: 16px;
}
```

#### 2. Drag and Drop para Reordenar Tarefas

Vamos adicionar a funcionalidade de arrastar e soltar para reordenar as tarefas:

```bash
npm install react-beautiful-dnd
npm install --save-dev @types/react-beautiful-dnd
```

```typescript
// src/contexts/TodoContext.tsx (adicionar função)
// ...
// Reordenar tarefas
const reorderTodos = (startIndex: number, endIndex: number): void => {
  const result = Array.from(todos);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  setTodos(result);
};

// Adicionar ao valor do contexto
const value: TodoContextType = {
  // ...
  reorderTodos,
  // ...
};
// ...
```

```typescript
// src/types/todo.ts (atualizar interface)
export interface TodoContextType {
  // ...
  reorderTodos: (startIndex: number, endIndex: number) => void;
  // ...
}
```

```typescript
// src/components/TodoList.tsx (modificar)
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';
import { useTodos } from '../hooks/useTodos';
import { useTodoContext } from '../contexts/TodoContext';
import { TodoStatus } from '../types/todo';

function TodoList(): JSX.Element {
  const todos = useTodos();
  const {
    filter,
    setFilter,
    remainingCount,
    completedCount,
    clearCompleted,
    reorderTodos
  } = useTodoContext();

  // Função para alternar o filtro
  const handleFilterChange = (newFilter: TodoStatus): void => {
    setFilter(newFilter);
  };

  // Função para lidar com o fim do arrasto
  const handleDragEnd = (result: DropResult): void => {
    // Ignorar se não foi solto em uma área válida
    if (!result.destination) {
      return;
    }

    // Ignorar se a posição não mudou
    if (
      result.destination.index === result.source.index
    ) {
      return;
    }

    // Reordenar as tarefas
    reorderTodos(result.source.index, result.destination.index);
  };

  return (
    <div className="todo-list-container">
      {todos.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todo-list">
            {(provided) => (
              <ul
                className="todo-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todos.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    draggableId={todo.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoItem todo={todo} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <p className="empty-message">
          {filter === 'all'
            ? 'Nenhuma tarefa adicionada.'
            : filter === 'active'
            ? 'Nenhuma tarefa ativa.'
            : 'Nenhuma tarefa concluída.'}
        </p>
      )}

      <div className="todo-footer">
        <span className="todo-count">
          {remainingCount} {remainingCount === 1 ? 'tarefa' : 'tarefas'} restante
          {remainingCount !== 1 ? 's' : ''}
        </span>

        <div className="todo-filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => handleFilterChange('all')}
          >
            Todas
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => handleFilterChange('active')}
          >
            Ativas
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => handleFilterChange('completed')}
          >
            Concluídas
          </button>
        </div>

        {completedCount > 0 && (
          <button className="clear-completed" onClick={clearCompleted}>
            Limpar concluídas
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoList;
```

Adicione estilos para melhorar a experiência de arrastar e soltar:

```css
/* src/App.css (adicionar) */
.todo-item {
  /* ... estilos existentes ... */
  cursor: grab;
  transition: background-color 0.2s;
}

.todo-item:active {
  cursor: grabbing;
}
```

#### 3. Tema Escuro

Vamos adicionar um tema escuro à nossa aplicação:

```typescript
// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  // Tenta obter o tema do localStorage ou usa 'light' como padrão
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme === 'dark' ? 'dark' : 'light') as Theme;
  });

  // Atualiza o localStorage e o atributo data-theme no documento quando o tema muda
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  
  return context;
}
```

```typescript
// src/components/ThemeToggle.tsx
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

function ThemeToggle(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeToggle;
```

```typescript
// src/App.tsx (modificar)
import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';
import { TodoProvider } from './contexts/TodoContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <TodoProvider>
        <div className="todo-app">
          <div className="app-header">
            <h1>Lista de Tarefas</h1>
            <ThemeToggle />
          </div>
          <TodoForm />
          <TodoList />
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
```

Adicione os estilos para o tema escuro:

```css
/* src/App.css (modificar) */
:root {
  --primary-color: #4caf50;
  --secondary-color: #f44336;
  --text-color: #333;
  --bg-color: #f9f9f9;
  --item-bg: #fff;
  --border-color: #ddd;
}

[data-theme='dark'] {
  --primary-color: #66bb6a;
  --secondary-color: #ff5252;
  --text-color: #f5f5f5;
  --bg-color: #121212;
  --item-bg: #1e1e1e;
  --border-color: #333;
}

/* ... estilos existentes ... */

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.theme-toggle:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

[data-theme='dark'] .theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
```

### Conclusão

Neste projeto prático, criamos uma aplicação TodoList completa usando React com TypeScript e Vite. Implementamos várias funcionalidades:

1. Gerenciamento de estado com Context API
2. Persistência de dados com localStorage
3. Filtragem de tarefas
4. Edição de tarefas
5. Drag and Drop para reordenar tarefas
6. Tema claro/escuro

Este projeto demonstra como TypeScript pode ser usado para criar aplicações React robustas e bem tipadas. A tipagem estática nos ajuda a evitar erros comuns e torna o código mais fácil de entender e manter.

Você pode expandir este projeto adicionando mais funcionalidades, como:

- Categorias ou tags para tarefas
- Datas de vencimento
- Notificações
- Sincronização com um backend
- Testes automatizados

O código completo deste projeto está disponível no repositório do curso. Sinta-se à vontade para usá-lo como base para seus próprios projetos!
