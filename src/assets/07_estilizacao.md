## 7. Estilização de Componentes React

Estilizar seus componentes React é uma parte crucial da criação de interfaces de usuário atraentes e funcionais. Existem várias abordagens para estilização em React, cada uma com suas vantagens e desvantagens. Vamos explorar as mais comuns.

### CSS Padrão e CSS Modules

#### 1. CSS Padrão (Global)

A forma mais simples é usar arquivos CSS globais, como você faria em um projeto HTML/CSS tradicional.

*   **Como usar:**
    1.  Crie um arquivo `.css` (ex: `App.css`, `index.css`).
    2.  Escreva suas regras CSS normalmente.
    3.  Importe o arquivo CSS no seu componente JavaScript principal (ex: `App.jsx` ou `main.jsx`).

    ```css
    /* src/App.css */
    .meu-botao {
      background-color: dodgerblue;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .meu-botao:hover {
      background-color: royalblue;
    }
    ```

    ```jsx
    // src/App.jsx
    import React from 'react';
    import './App.css'; // Importa o CSS global

    function MeuComponenteComCSSGlobal() {
      return (
        <div>
          <button className="meu-botao">Clique Aqui</button>
        </div>
      );
    }

    export default MeuComponenteComCSSGlobal;
    ```
*   **Vantagens:**
    *   Simples e familiar.
    *   Fácil de começar.
*   **Desvantagens:**
    *   Escopo global: Nomes de classes podem colidir entre diferentes componentes ou bibliotecas, levando a estilos inesperados. Difícil de gerenciar em aplicações grandes.

#### 2. CSS Modules

CSS Modules resolvem o problema do escopo global do CSS tradicional. Com CSS Modules, cada arquivo CSS é escopado localmente para o componente que o importa. Os nomes das classes são transformados para serem únicos em toda a aplicação.

Vite tem suporte embutido para CSS Modules. Arquivos nomeados com `.module.css` (ex: `MeuComponente.module.css`) são tratados como CSS Modules por padrão.

*   **Como usar:**
    1.  Crie um arquivo `.module.css` para o seu componente (ex: `Botao.module.css`).
    2.  Escreva suas classes CSS normalmente.
    3.  Importe o módulo CSS no seu componente. A importação retorna um objeto onde as chaves são os nomes das classes que você definiu e os valores são os nomes de classe gerados (únicos).

    ```css
    /* src/components/Botao.module.css */
    .botaoPrimario {
      background-color: seagreen;
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 4px;
    }

    .botaoPrimario:hover {
      background-color: darkgreen;
    }
    ```

    ```jsx
    // src/components/Botao.jsx
    import React from 'react';
    import styles from './Botao.module.css'; // Importa o CSS Module

    function Botao({ texto }) {
      return (
        <button className={styles.botaoPrimario}>
          {texto}
        </button>
      );
    }

    export default Botao;
    ```
    No exemplo acima, `styles.botaoPrimario` será transformado em algo como `Botao_botaoPrimario__aBc12` no HTML renderizado, garantindo que seja único.

*   **Vantagens:**
    *   Escopo local por padrão: Sem conflitos de nomes de classe.
    *   CSS mais modular e fácil de manter junto com os componentes.
    *   Permite usar nomes de classe simples sem se preocupar com colisões.
*   **Desvantagens:**
    *   Pode ser um pouco mais verboso referenciar as classes (`styles.minhaClasse`).
    *   Compartilhar estilos entre módulos requer uma abordagem mais explícita (ex: usando a diretiva `:global` ou a composição de classes do CSS Modules).

### Styled Components (CSS-in-JS)

Styled Components é uma biblioteca popular de CSS-in-JS. Ela permite que você escreva CSS real para estilizar seus componentes usando template literals do JavaScript. Ela cria componentes React reais com os estilos anexados.

*   **Instalação:**
    ```bash
    npm install styled-components
    ```

*   **Como usar:**

    ```jsx
    import React from 'react';
    import styled from 'styled-components';

    // Cria um componente <BotaoEstilizado> que renderiza uma tag <button> com estilos
    const BotaoEstilizado = styled.button`
      background-color: ${props => (props.primario ? 'palevioletred' : 'white')};
      color: ${props => (props.primario ? 'white' : 'palevioletred')};
      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      border: 2px solid palevioletred;
      border-radius: 3px;
      cursor: pointer;

      &:hover {
        background-color: ${props => (props.primario ? 'lightpink' : 'mistyrose')};
      }
    `;

    // Outro exemplo, um componente <InputEstilizado>
    const InputEstilizado = styled.input`
      padding: 0.5em;
      margin: 0.5em;
      color: palevioletred;
      background: papayawhip;
      border: none;
      border-radius: 3px;

      &:focus {
        outline-color: palevioletred;
      }
    `;

    function FormularioComStyledComponents() {
      return (
        <div>
          <BotaoEstilizado>Normal</BotaoEstilizado>
          <BotaoEstilizado primario>Primário</BotaoEstilizado>
          <InputEstilizado type="text" placeholder="Digite algo..." />
        </div>
      );
    }

    export default FormularioComStyledComponents;
    ```

*   **Vantagens:**
    *   Escopo automático: Os estilos são escopados para o componente.
    *   Estilos dinâmicos baseados em props: Facilidade para alterar estilos com base no estado ou props do componente.
    *   Remove o mapeamento entre componentes e estilos: Os estilos são parte do componente.
    *   Suporte a temas, estilos globais, etc.
*   **Desvantagens:**
    *   Curva de aprendizado para a sintaxe e os conceitos.
    *   Pode haver um pequeno overhead de runtime (embora geralmente otimizado).
    *   Alguns desenvolvedores preferem manter CSS e JS separados.

### Tailwind CSS (Utility-First CSS)

Tailwind CSS é um framework CSS "utility-first" que fornece um conjunto de classes de baixo nível altamente componentizáveis que você pode usar para construir designs personalizados diretamente no seu HTML/JSX.

*   **Instalação e Configuração com Vite:**
    A configuração do Tailwind CSS com Vite é bem documentada no site oficial do Tailwind: [https://tailwindcss.com/docs/guides/vite](https://tailwindcss.com/docs/guides/vite)
    Resumidamente, envolve:
    1.  Instalar `tailwindcss`, `postcss`, `autoprefixer`.
    2.  Criar os arquivos de configuração `tailwind.config.js` e `postcss.config.js`.
    3.  Especificar os caminhos dos seus arquivos de template no `tailwind.config.js` (para que o Tailwind possa encontrar as classes que você usa e gerar apenas o CSS necessário).
    4.  Importar as diretivas do Tailwind no seu arquivo CSS principal (ex: `index.css`).

    ```js
    // tailwind.config.js (exemplo mínimo)
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // Caminhos para seus arquivos
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

    ```css
    /* src/index.css (ou seu CSS principal) */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

*   **Como usar:**
    Você aplica as classes utilitárias diretamente nos seus elementos JSX.

    ```jsx
    import React from 'react';
  
    function CartaoComTailwind() {
      return (
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
          <div className="md:flex">
            <div className="md:shrink-0">
              {/* Suponha uma imagem aqui */}
              <img className="h-48 w-full object-cover md:h-full md:w-48" src="https://via.placeholder.com/150" alt="Placeholder" />
            </div>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-700">
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
      );
    }

    export default CartaoComTailwind;
    ```

*   **Vantagens:**
    *   Desenvolvimento rápido: Você não precisa sair do seu HTML/JSX para escrever CSS.
    *   Altamente customizável.
    *   CSS gerado é pequeno em produção (pois só inclui as classes que você usa).
    *   Evita nomes de classes arbitrários.
    *   Consistência no design.
*   **Desvantagens:**
    *   Pode poluir o JSX com muitas classes, especialmente para elementos complexos (pode ser mitigado criando componentes).
    *   Curva de aprendizado para memorizar as classes utilitárias (embora a documentação e o IntelliSense ajudem muito).
    *   Requer um processo de build para remover classes não utilizadas para produção.

**Qual abordagem escolher?**

*   **CSS Modules:** Uma ótima escolha para a maioria dos projetos React, pois oferece escopo local e mantém a familiaridade do CSS, com bom suporte do Vite.
*   **Styled Components:** Excelente se você prefere a abordagem CSS-in-JS, precisa de estilos dinâmicos baseados em props com frequência e gosta da ideia de componentes que já vêm estilizados.
*   **Tailwind CSS:** Muito popular e produtivo, especialmente se você gosta da abordagem utility-first e quer construir interfaces rapidamente sem escrever muito CSS customizado. Combina bem com a componentização do React.
*   **CSS Padrão Global:** Pode ser usado para estilos globais muito básicos (resets, fontes, etc.), mas geralmente é melhor combinado com uma das outras abordagens para estilização de componentes.

Para um desenvolvedor júnior, familiarizar-se com **CSS Modules** é um bom ponto de partida, pois é uma evolução natural do CSS tradicional e bem integrado ao ecossistema React/Vite. Ter uma noção de **Tailwind CSS** também é muito valioso, dada sua crescente popularidade no mercado.

