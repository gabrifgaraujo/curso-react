## 10. Projeto Prático: Desenvolvendo uma Aplicação (Lista de Tarefas Interativa)

Vamos colocar em prática muitos dos conceitos que aprendemos construindo uma aplicação de Lista de Tarefas (To-Do List) interativa com React e Vite. Este projeto ajudará a solidificar seu entendimento sobre componentes, estado, props, eventos e hooks.

**Funcionalidades da Nossa Lista de Tarefas:**

1.  Adicionar novas tarefas.
2.  Marcar tarefas como concluídas/não concluídas.
3.  Remover tarefas.
4.  Filtrar tarefas (todas, ativas, concluídas) - (Opcional, como um desafio extra).
5.  Persistência básica usando Local Storage do navegador (para que as tarefas não sumam ao recarregar a página).

### Estrutura do Projeto

Vamos organizar nossos componentes da seguinte forma (dentro da pasta `src/components/`):

*   `TodoApp.jsx`: Componente principal que orquestra toda a aplicação.
*   `TodoForm.jsx`: Formulário para adicionar novas tarefas.
*   `TodoList.jsx`: Lista que exibe as tarefas.
*   `TodoItem.jsx`: Componente para cada item individual da lista.

### Passo 1: Configuração Inicial e Componente Principal (`TodoApp.jsx`)

Primeiro, crie a pasta `src/components/` se ainda não existir.

**`src/components/TodoApp.jsx`:**

```jsx
import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './TodoApp.css'; // Criaremos este arquivo para estilos

const CHAVE_LOCAL_STORAGE = 'reactTodoApp.tarefas';

function TodoApp() {
  const [tarefas, setTarefas] = useState([]);

  // Carregar tarefas do Local Storage ao montar o componente
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem(CHAVE_LOCAL_STORAGE);
    if (tarefasSalvas) {
      setTarefas(JSON.parse(tarefasSalvas));
    }
  }, []);

  // Salvar tarefas no Local Storage sempre que a lista de tarefas mudar
  useEffect(() => {
    localStorage.setItem(CHAVE_LOCAL_STORAGE, JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = (textoTarefa) => {
    if (!textoTarefa || textoTarefa.trim() === '') return; // Não adiciona tarefa vazia
    const novaTarefa = {
      id: Date.now(), // ID simples baseado no timestamp
      texto: textoTarefa.trim(),
      concluida: false,
    };
    setTarefas(prevTarefas => [novaTarefa, ...prevTarefas]); // Adiciona no início da lista
  };

  const alternarConclusaoTarefa = (idTarefa) => {
    setTarefas(prevTarefas =>
      prevTarefas.map(tarefa =>
        tarefa.id === idTarefa ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  const removerTarefa = (idTarefa) => {
    setTarefas(prevTarefas => prevTarefas.filter(tarefa => tarefa.id !== idTarefa));
  };

  return (
    <div className="todo-app">
      <h1>Minha Lista de Tarefas</h1>
      <TodoForm aoAdicionar={adicionarTarefa} />
      <TodoList
        tarefas={tarefas}
        aoAlternar={alternarConclusaoTarefa}
        aoRemover={removerTarefa}
      />
    </div>
  );
}

export default TodoApp;
```

**`src/App.jsx` (para usar o `TodoApp`):**

```jsx
import React from 'react';
import TodoApp from './components/TodoApp';
// Se você tiver outros estilos globais, mantenha-os ou importe App.css aqui também
// import './App.css'; 

function App() {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}

export default App;
```

### Passo 2: Formulário de Tarefas (`TodoForm.jsx`)

**`src/components/TodoForm.jsx`:**

```jsx
import React, { useState } from 'react';

function TodoForm({ aoAdicionar }) {
  const [textoInput, setTextoInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    aoAdicionar(textoInput);
    setTextoInput(''); // Limpa o input após adicionar
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={textoInput}
        onChange={(e) => setTextoInput(e.target.value)}
        placeholder="Adicionar nova tarefa..."
        className="todo-input"
      />
      <button type="submit" className="todo-button">Adicionar</button>
    </form>
  );
}

export default TodoForm;
```

### Passo 3: Lista de Tarefas (`TodoList.jsx`) e Item da Tarefa (`TodoItem.jsx`)

**`src/components/TodoItem.jsx`:**

```jsx
import React from 'react';

function TodoItem({ tarefa, aoAlternar, aoRemover }) {
  return (
    <li className={`todo-item ${tarefa.concluida ? 'concluida' : ''}`}>
      <span 
        onClick={() => aoAlternar(tarefa.id)}
        style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none', cursor: 'pointer' }}
      >
        {tarefa.texto}
      </span>
      <button onClick={() => aoRemover(tarefa.id)} className="remove-button">×</button>
    </li>
  );
}

export default TodoItem;
```

**`src/components/TodoList.jsx`:**

```jsx
import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tarefas, aoAlternar, aoRemover }) {
  if (tarefas.length === 0) {
    return <p className="sem-tarefas">Nenhuma tarefa na lista ainda!</p>;
  }

  return (
    <ul className="todo-list">
      {tarefas.map(tarefa => (
        <TodoItem
          key={tarefa.id}
          tarefa={tarefa}
          aoAlternar={aoAlternar}
          aoRemover={aoRemover}
        />
      ))}
    </ul>
  );
}

export default TodoList;
```

### Passo 4: Estilização (`TodoApp.css`)

Crie o arquivo **`src/components/TodoApp.css`**:

```css
/* src/components/TodoApp.css */
.todo-app {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.todo-app h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.todo-form {
  display: flex;
  margin-bottom: 20px;
}

.todo-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.todo-input:focus {
  outline: none;
  border-color: #777;
}

.todo-button {
  padding: 10px 15px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;
}

.todo-button:hover {
  background-color: #4cae4c;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s ease;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item.concluida span {
  color: #aaa;
  text-decoration: line-through;
}

.todo-item span {
  flex-grow: 1;
  cursor: pointer;
}

.remove-button {
  background: none;
  border: none;
  color: #ff4d4d;
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;
  line-height: 1;
}

.remove-button:hover {
  color: #cc0000;
}

.sem-tarefas {
  text-align: center;
  color: #777;
  margin-top: 20px;
}
```

### Passo 5: Executando o Projeto

1.  Certifique-se de que todos os arquivos foram salvos.
2.  No seu terminal, na raiz do projeto, execute `npm run dev`.
3.  Abra o navegador no endereço fornecido (geralmente `http://localhost:5173/`).

Você deverá ver sua Lista de Tarefas funcionando! Tente adicionar, concluir e remover tarefas. Recarregue a página para ver se as tarefas persistem (graças ao Local Storage).

### Desafios Adicionais (Opcional)

*   **Filtros:** Adicione botões para filtrar tarefas (Todas, Ativas, Concluídas).
    *   Você precisará de um novo estado para o filtro atual (ex: `const [filtro, setFiltro] = useState('todas');`).
    *   Modifique a lógica em `TodoList` para exibir apenas as tarefas que correspondem ao filtro selecionado.
*   **Edição de Tarefas:** Permita que o usuário edite o texto de uma tarefa existente.
*   **Melhorar Estilos:** Use uma biblioteca de componentes UI (como Material-UI, Chakra UI) ou aprimore os estilos com Tailwind CSS ou Styled Components.
*   **Validação Mais Robusta:** Adicione validação para não permitir tarefas duplicadas.

Este projeto prático cobre muitos dos fundamentos do React. Ao construí-lo, você ganha experiência valiosa que é diretamente aplicável a projetos do mundo real e a perguntas de entrevistas técnicas.

