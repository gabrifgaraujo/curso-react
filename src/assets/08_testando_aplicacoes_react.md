## 8. Testando Aplicações React

Escrever testes para suas aplicações React é fundamental para garantir a qualidade do código, prevenir regressões (bugs que reaparecem) e facilitar a refatoração e manutenção a longo prazo. Para desenvolvedores júnior, entender os conceitos básicos de teste e saber como escrever testes simples para componentes é uma habilidade valiosa.

As ferramentas mais comuns para testar aplicações React são **Jest** (um test runner popular) e **React Testing Library** (uma biblioteca que ajuda a testar componentes React da maneira como os usuários os utilizam).

Vite já vem com uma configuração básica para testes usando Vitest (um test runner compatível com a API do Jest e otimizado para Vite) ou você pode configurar o Jest manualmente.

### A Importância dos Testes

*   **Confiança:** Testes dão confiança para fazer alterações no código, sabendo que se algo quebrar, os testes irão falhar.
*   **Documentação Viva:** Testes bem escritos servem como uma forma de documentação, mostrando como os componentes devem se comportar.
*   **Qualidade do Código:** O processo de escrever testes muitas vezes leva a um design de código melhor e mais modular.
*   **Detecção Antecipada de Bugs:** Encontrar bugs durante o desenvolvimento é muito mais barato e fácil do que encontrá-los em produção.

### Tipos Comuns de Testes em Frontend

*   **Testes Unitários:** Testam a menor unidade de código isoladamente (ex: uma função, um componente React simples).
*   **Testes de Integração:** Testam a interação entre múltiplas unidades (ex: vários componentes trabalhando juntos, um componente interagindo com um serviço).
*   **Testes End-to-End (E2E):** Testam o fluxo completo da aplicação do ponto de vista do usuário, geralmente usando ferramentas que automatizam o navegador (ex: Cypress, Playwright).

Nesta seção, focaremos nos testes unitários e de integração de componentes React usando Jest (ou Vitest) e React Testing Library.

### Introdução ao Jest e React Testing Library

#### Jest

*   **O que é?** Jest é um framework de teste JavaScript desenvolvido pelo Facebook. Ele inclui um test runner, uma biblioteca de asserções (para verificar se os resultados são os esperados) e funcionalidades de mocking.
*   **Principais Características:**
    *   Configuração zero (para muitos projetos).
    *   Execução rápida de testes (paralelização).
    *   API de asserções clara e intuitiva (`expect`, `toBe`, `toEqual`, etc.).
    *   Suporte a snapshots para rastrear mudanças na UI.
    *   Funcionalidades de mocking e spying.

#### React Testing Library (RTL)

*   **O que é?** RTL é uma família de bibliotecas que fornecem utilitários leves para testar componentes React de uma forma que se assemelha a como os usuários interagem com eles. Ela não testa detalhes de implementação, mas sim o comportamento observável do componente.
*   **Filosofia Principal:** "Quanto mais seus testes se assemelharem à forma como seu software é usado, mais confiança eles podem lhe dar."
*   **Principais Características:**
    *   Foco em interações do usuário: Encoraja a encontrar elementos da mesma forma que um usuário faria (por texto, label, role, etc.).
    *   Evita testar detalhes de implementação (estado interno, métodos específicos), tornando os testes mais resilientes a refatorações.
    *   Fornece utilitários para renderizar componentes, disparar eventos e fazer asserções sobre o DOM.

### Configurando o Ambiente de Teste com Vite (usando Vitest)

Vite tem excelente integração com **Vitest**, um test runner extremamente rápido e compatível com a API do Jest, construído sobre o Vite.

1.  **Instalação:**
    ```bash
    npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
    ```
    *   `vitest`: O test runner.
    *   `@testing-library/react`: Utilitários para testar componentes React.
    *   `@testing-library/jest-dom`: Adiciona matchers customizados do Jest-DOM para asserções mais expressivas sobre o DOM (ex: `toBeInTheDocument`, `toHaveTextContent`).
    *   `jsdom`: Um ambiente DOM simulado para executar testes fora de um navegador real.

2.  **Configuração no `vite.config.js` (ou `vite.config.ts`):**
    Adicione a configuração de teste ao seu arquivo de configuração do Vite.

    ```javascript
    // vite.config.js
    /// <reference types="vitest" />
    import { defineConfig } from "vite";
    import react from "@vitejs/plugin-react";

    export default defineConfig({
      plugins: [react()],
      test: {
        globals: true, // Para não precisar importar describe, it, expect, etc.
        environment: "jsdom", // Ambiente para simular o DOM
        setupFiles: "./src/setupTests.js", // (Opcional) Arquivo de configuração para os testes
        css: true, // Se você precisa processar CSS nos testes (ex: CSS Modules)
      },
    });
    ```

3.  **(Opcional) Criar `src/setupTests.js`:**
    Este arquivo é usado para configurar coisas que você quer que estejam disponíveis globalmente para todos os seus testes, como importar matchers do Jest-DOM.

    ```javascript
    // src/setupTests.js
    import "@testing-library/jest-dom";
    ```

4.  **Adicionar Scripts ao `package.json`:**

    ```json
    // package.json
    {
      // ... outras configurações
      "scripts": {
        "dev": "vite",
        "build": "vite build",
        "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
        "preview": "vite preview",
        "test": "vitest",
        "test:ui": "vitest --ui", // Para uma interface gráfica dos testes
        "coverage": "vitest run --coverage" // Para gerar relatório de cobertura
      }
      // ...
    }
    ```

### Escrevendo seu Primeiro Teste

Vamos criar um componente simples e escrever um teste para ele.

**Componente `Saudacao.jsx`:**

```jsx
// src/components/Saudacao.jsx
import React from "react";

function Saudacao({ nome }) {
  if (!nome) {
    return <span>Olá, Visitante!</span>;
  }
  return <span>Olá, {nome}!</span>;
}

export default Saudacao;
```

**Teste `Saudacao.test.jsx`:**

Crie um arquivo com o mesmo nome do componente, mas com a extensão `.test.jsx` (ou `.spec.jsx`) na mesma pasta ou em uma pasta `__tests__`.

```jsx
// src/components/Saudacao.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Saudacao from "./Saudacao";

// `describe` agrupa testes relacionados
describe("Componente Saudacao", () => {
  // `it` ou `test` define um caso de teste individual
  it("deve renderizar a saudação padrão se nenhum nome for fornecido", () => {
    render(<Saudacao />); // Renderiza o componente
    
    // `screen` fornece queries para encontrar elementos no DOM renderizado
    // `getByText` encontra um elemento pelo seu conteúdo de texto (pode usar regex)
    const elementoSaudacao = screen.getByText(/Olá, Visitante!/i);
    
    // `expect` é usado para fazer asserções
    // `toBeInTheDocument` é um matcher do @testing-library/jest-dom
    expect(elementoSaudacao).toBeInTheDocument();
  });

  it("deve renderizar a saudação com o nome fornecido", () => {
    const nomeTeste = "Maria";
    render(<Saudacao nome={nomeTeste} />);
    
    const elementoSaudacao = screen.getByText(`Olá, ${nomeTeste}!`);
    expect(elementoSaudacao).toBeInTheDocument();

    // Exemplo de uma query que falharia (para demonstração)
    // const elementoInexistente = screen.queryByText(/Outro Texto/i);
    // expect(elementoInexistente).not.toBeInTheDocument(); // queryByText retorna null se não encontrar
  });
});
```

**Executando os Testes:**

No terminal, execute:

```bash
npm test
```

O Vitest (ou Jest) encontrará e executará todos os arquivos de teste.

### Principais Queries da React Testing Library

RTL fornece várias queries para encontrar elementos. Elas são priorizadas pela forma como os usuários encontram elementos:

1.  **Queries Acessíveis:**
    *   `getByRole`, `findByRole`, `queryByRole`: Encontra por role ARIA (ex: `button`, `navigation`).
    *   `getByLabelText`, `findByLabelText`, `queryByLabelText`: Encontra inputs pelo texto do seu label.
    *   `getByPlaceholderText`: Encontra por placeholder.
    *   `getByText`: Encontra por conteúdo de texto.
    *   `getByDisplayValue`: Encontra inputs/textareas/selects pelo seu valor atual.

2.  **Queries Semânticas:**
    *   `getByAltText`: Encontra imagens pelo seu texto `alt`.
    *   `getByTitle`: Encontra elementos pelo seu atributo `title`.

3.  **Test IDs (Último Recurso):**
    *   `getByTestId`, `findByTestId`, `queryByTestId`: Encontra elementos por um atributo `data-testid`.
        Use com moderação, apenas quando não for possível encontrar o elemento de forma mais acessível ou semântica.

**Variantes das Queries:**

*   `getBy...`: Retorna o elemento correspondente ou lança um erro se não encontrar (ou encontrar mais de um).
*   `queryBy...`: Retorna o elemento ou `null` se não encontrar. Útil para asserções de que um elemento *não* está presente.
*   `findBy...`: Retorna uma Promise que resolve quando o elemento é encontrado. Útil para elementos que aparecem de forma assíncrona (ex: após uma chamada de API). Requer `await screen.findBy...`.

### Testando Interações do Usuário

A biblioteca `@testing-library/user-event` simula interações do usuário de forma mais realista do que o `fireEvent` (que é mais baixo nível).

**Instalação (se ainda não tiver):**
```bash
npm install --save-dev @testing-library/user-event
```

**Exemplo: Testando um Contador**

```jsx
// src/components/Contador.jsx
import React, { useState } from "react";

function Contador() {
  const [contagem, setContagem] = useState(0);
  return (
    <div>
      <p>Contagem: {contagem}</p>
      <button onClick={() => setContagem(contagem + 1)}>Incrementar</button>
      <button onClick={() => setContagem(contagem - 1)} disabled={contagem === 0}>
        Decrementar
      </button>
    </div>
  );
}
export default Contador;

// src/components/Contador.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Importa userEvent
import Contador from "./Contador";

describe("Componente Contador", () => {
  it("deve renderizar a contagem inicial como 0", () => {
    render(<Contador />);
    expect(screen.getByText(/Contagem: 0/i)).toBeInTheDocument();
  });

  it("deve incrementar a contagem quando o botão de incrementar é clicado", async () => {
    const user = userEvent.setup(); // Configura userEvent
    render(<Contador />);
    
    const botaoIncrementar = screen.getByRole("button", { name: /incrementar/i });
    await user.click(botaoIncrementar);
    
    expect(screen.getByText(/Contagem: 1/i)).toBeInTheDocument();
  });

  it("deve decrementar a contagem quando o botão de decrementar é clicado", async () => {
    const user = userEvent.setup();
    render(<Contador />);
    
    // Clica para incrementar primeiro, para poder decrementar
    const botaoIncrementar = screen.getByRole("button", { name: /incrementar/i });
    await user.click(botaoIncrementar); // Contagem vai para 1

    const botaoDecrementar = screen.getByRole("button", { name: /decrementar/i });
    await user.click(botaoDecrementar);
    
    expect(screen.getByText(/Contagem: 0/i)).toBeInTheDocument();
  });

  it("o botão de decrementar deve estar desabilitado quando a contagem é 0", () => {
    render(<Contador />);
    const botaoDecrementar = screen.getByRole("button", { name: /decrementar/i });
    expect(botaoDecrementar).toBeDisabled();
  });
});
```

### Mocking

Às vezes, seus componentes dependem de módulos externos, chamadas de API ou funções que são difíceis de controlar em um ambiente de teste. Jest (e Vitest) fornecem funcionalidades de mocking para substituir essas dependências por "mocks" (simulacros).

*   **Mocking de Módulos:** `vi.mock("./meuModulo")` (em Vitest) ou `jest.mock("./meuModulo")`.
*   **Mocking de Funções:** `vi.fn()` ou `jest.fn()` para criar funções mock que podem rastrear chamadas, argumentos e retornar valores específicos.

**Exemplo: Mockando uma Chamada de API**

Suponha um componente que busca dados:

```jsx
// src/services/api.js
export const buscarUsuario = async (id) => {
  const resposta = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!resposta.ok) throw new Error("Falha ao buscar usuário");
  return resposta.json();
};

// src/components/InfoUsuarioAPI.jsx
import React, { useState, useEffect } from "react";
import { buscarUsuario } from "../services/api";

function InfoUsuarioAPI({ idUsuario }) {
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    buscarUsuario(idUsuario)
      .then(setUsuario)
      .catch(err => setErro(err.message));
  }, [idUsuario]);

  if (erro) return <p>Erro: {erro}</p>;
  if (!usuario) return <p>Carregando...</p>;

  return <p>Nome do Usuário: {usuario.name}</p>;
}
export default InfoUsuarioAPI;
```

Teste com mock:

```jsx
// src/components/InfoUsuarioAPI.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import InfoUsuarioAPI from "./InfoUsuarioAPI";
import { buscarUsuario } from "../services/api"; // Importa a função original

// Faz o mock do módulo da API
vi.mock("../services/api"); // Para Vitest. Para Jest: jest.mock("../services/api");

describe("Componente InfoUsuarioAPI", () => {
  it("deve exibir o nome do usuário após a chamada da API", async () => {
    const mockUsuario = { id: 1, name: "Fulano de Tal" };
    // Configura a função mockada para retornar o usuário mockado
    buscarUsuario.mockResolvedValue(mockUsuario);

    render(<InfoUsuarioAPI idUsuario={1} />);

    // Espera o texto aparecer (pois a chamada é assíncrona)
    // findByText retorna uma Promise
    const elementoNome = await screen.findByText(`Nome do Usuário: ${mockUsuario.name}`);
    expect(elementoNome).toBeInTheDocument();

    // Verifica se a função mockada foi chamada com o ID correto
    expect(buscarUsuario).toHaveBeenCalledWith(1);
  });

  it("deve exibir mensagem de erro se a API falhar", async () => {
    const mensagemErro = "Falha na API";
    buscarUsuario.mockRejectedValue(new Error(mensagemErro));

    render(<InfoUsuarioAPI idUsuario={1} />);

    const elementoErro = await screen.findByText(`Erro: ${mensagemErro}`);
    expect(elementoErro).toBeInTheDocument();
  });
});
```

### O que Testar?

*   Renderiza corretamente com diferentes props?
*   Renderiza corretamente com diferentes estados?
*   Eventos do usuário funcionam como esperado (cliques, digitação)?
*   Chamadas de API (mockadas) são feitas corretamente?
*   O componente lida com erros de API corretamente?
*   Textos, labels e roles importantes estão presentes para acessibilidade?

Testar é uma habilidade que se desenvolve com a prática. Comece com testes simples para seus componentes e, gradualmente, explore cenários mais complexos. O objetivo não é 100% de cobertura de código a qualquer custo, mas sim testes significativos que aumentem sua confiança na aplicação.

