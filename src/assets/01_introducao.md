## 1. Introdução ao React com TypeScript e Vite

### O que é React?

React é uma biblioteca JavaScript (agora com suporte completo para TypeScript) para construir interfaces de usuário, desenvolvida pelo Facebook. Diferente de frameworks completos, o React foca especificamente na camada de visualização (view layer) de aplicações web.

#### Principais características do React:

*   **Baseado em Componentes:** Interfaces são divididas em componentes reutilizáveis e independentes.
*   **Virtual DOM:** Representação em memória do DOM real para otimizar atualizações.
*   **Fluxo de Dados Unidirecional:** Dados fluem de componentes pais para filhos, tornando o código mais previsível.
*   **JSX/TSX:** Extensão de sintaxe que permite escrever HTML dentro do TypeScript.
*   **Ecossistema Rico:** Grande comunidade e diversas bibliotecas complementares.

### Por que TypeScript com React?

TypeScript é um superset tipado de JavaScript que adiciona tipagem estática opcional. Ao usar TypeScript com React, você ganha:

*   **Detecção de erros em tempo de compilação:** Erros são capturados antes da execução
*   **Melhor documentação:** Os tipos servem como documentação viva do código
*   **Melhor experiência de desenvolvimento:** Autocompletar e sugestões mais precisas no editor
*   **Refatoração mais segura:** O compilador avisa sobre problemas ao modificar o código
*   **Melhor manutenção:** Especialmente útil em projetos grandes e equipes

### O que é Vite?

Vite (pronuncia-se "vit") é uma ferramenta de build moderna para desenvolvimento web, criada por Evan You (criador do Vue.js). Vite oferece uma experiência de desenvolvimento significativamente mais rápida que ferramentas tradicionais como Create React App.

#### Vantagens do Vite:

*   **Inicialização Instantânea:** Não precisa empacotar toda a aplicação para iniciar o servidor de desenvolvimento.
*   **Hot Module Replacement (HMR) Ultrarrápido:** Atualizações são refletidas instantaneamente no navegador.
*   **Otimizado para Produção:** Usa Rollup para builds de produção altamente otimizados.
*   **Suporte Nativo para TypeScript:** Não requer configuração adicional para usar TypeScript.
*   **Configuração Simples:** Menos complexidade comparado a ferramentas como Webpack.

### Configurando o Ambiente de Desenvolvimento

Vamos configurar um ambiente de desenvolvimento React com TypeScript usando Vite no Windows 10.

#### Pré-requisitos:

1.  **Node.js:** Baixe e instale a versão LTS mais recente do [site oficial](https://nodejs.org/).
2.  **Visual Studio Code:** Baixe e instale o [VS Code](https://code.visualstudio.com/).
3.  **Extensões recomendadas para VS Code:**
    *   ESLint
    *   Prettier
    *   ES7+ React/Redux/React-Native snippets
    *   TypeScript React code snippets

#### Criando um Projeto React com TypeScript usando Vite:

Abra o terminal (PowerShell ou CMD) e execute os seguintes comandos:

```bash
# Crie um novo projeto Vite com template React + TypeScript
npm create vite@latest meu-app-react -- --template react-ts

# Navegue até a pasta do projeto
cd meu-app-react

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Após executar esses comandos, o Vite iniciará um servidor de desenvolvimento e você poderá acessar sua aplicação em `http://localhost:5173` (ou outra porta, se a 5173 estiver ocupada).

#### Estrutura Básica do Projeto:

```
meu-app-react/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### Entendendo os Arquivos Principais:

*   **main.tsx:** Ponto de entrada da aplicação, onde o React é inicializado.
*   **App.tsx:** Componente principal da aplicação.
*   **vite-env.d.ts:** Arquivo de declaração de tipos para o Vite.
*   **tsconfig.json:** Configuração do TypeScript.
*   **vite.config.ts:** Configuração do Vite.

### Exemplo Básico de Componente React com TypeScript:

```tsx
// src/App.tsx
import { useState } from 'react';
import './App.css';

// Definindo uma interface para as props do componente
interface BemVindoProps {
  nome: string;
  idade?: number; // O '?' indica que é opcional
}

// Componente funcional com tipagem de props
function BemVindo({ nome, idade }: BemVindoProps) {
  return (
    <div>
      <h1>Olá, {nome}!</h1>
      {idade !== undefined && <p>Você tem {idade} anos.</p>}
    </div>
  );
}

// Componente principal App
function App() {
  // useState com tipagem
  const [contador, setContador] = useState<number>(0);

  return (
    <div className="App">
      <BemVindo nome="Maria" idade={25} />
      <BemVindo nome="João" />
      
      <div>
        <h2>Contador: {contador}</h2>
        <button onClick={() => setContador(contador + 1)}>
          Incrementar
        </button>
      </div>
    </div>
  );
}

export default App;
```

### Próximos Passos

Agora que você tem seu ambiente configurado e entende os conceitos básicos, nos próximos capítulos vamos explorar:

*   Componentes funcionais e props com TypeScript
*   Hooks do React com tipagem adequada
*   Gerenciamento de estado
*   Roteamento
*   Consumo de APIs
*   E muito mais!

Lembre-se de que a documentação oficial do React e TypeScript são excelentes recursos para consulta:

*   [Documentação do React](https://reactjs.org/docs/getting-started.html)
*   [TypeScript e React](https://www.typescriptlang.org/docs/handbook/react.html)
*   [Documentação do Vite](https://vitejs.dev/guide/)
