## 3. Hooks Essenciais do React

Os Hooks são uma adição relativamente nova ao React (introduzidos na versão 16.8) que permitem que você use estado e outros recursos do React sem escrever uma classe. Eles revolucionaram a forma como os componentes funcionais são escritos, tornando-os mais poderosos e fáceis de gerenciar.

### `useState`: Gerenciando Estado

Já introduzimos o `useState` na seção de Fundamentos, mas vamos revisitar e aprofundar um pouco.

*   **Propósito:** Adicionar estado local a componentes funcionais.
*   **Sintaxe:** `const [estado, setEstado] = useState(valorInicial);`
    *   Retorna um array com dois elementos: o valor atual do estado e uma função para atualizá-lo.
    *   `valorInicial` é o valor que o estado terá na primeira renderização. Pode ser um valor direto ou uma função que retorna o valor inicial (útil para cálculos iniciais caros).

**Exemplo Detalhado:**

```jsx
import React, { useState } from 'react';

function FormularioSimples() {
  // Estado para o valor do input de texto
  const [nome, setNome] = useState('');
  // Estado para controlar se o formulário foi submetido
  const [submetido, setSubmetido] = useState(false);

  const handleChangeNome = (evento) => {
    setNome(evento.target.value);
    if (submetido) {
      setSubmetido(false); // Reseta o status de submissão se o usuário começar a digitar novamente
    }
  };

  const handleSubmit = (evento) => {
    evento.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
    if (nome.trim() === '') {
      alert('Por favor, insira um nome.');
      return;
    }
    setSubmetido(true);
    // Aqui você normalmente enviaria os dados para um servidor
    console.log('Nome submetido:', nome);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nomeInput">Nome:</label>
        <input
          type="text"
          id="nomeInput"
          value={nome} // Controla o valor do input com o estado
          onChange={handleChangeNome}
        />
      </div>
      <button type="submit">Enviar</button>
      {submetido && <p>Obrigado por submeter, {nome}!</p>}
    </form>
  );
}

export default FormularioSimples;
```

**Múltiplas Variáveis de Estado:** Você pode usar `useState` várias vezes em um único componente para diferentes pedaços de estado.

**Atualizando Estado Baseado no Estado Anterior:** Se o novo estado depende do valor anterior, use a forma funcional de `setEstado` para garantir que você está trabalhando com o valor mais recente.

```jsx
// Exemplo de contador, forma segura de incrementar
const [contador, setContador] = useState(0);

const incrementar = () => {
  setContador(prevContador => prevContador + 1);
};
```

### `useEffect`: Lidando com Efeitos Colaterais

O Hook `useEffect` permite que você execute "efeitos colaterais" (side effects) em componentes funcionais. Efeitos colaterais são operações que acontecem fora do fluxo normal de renderização, como:

*   Busca de dados (data fetching) de APIs.
*   Inscrições (subscriptions) a eventos.
*   Manipulação manual do DOM (embora deva ser evitada o máximo possível em React).
*   Configuração de timers (setTimeout, setInterval).

*   **Sintaxe:** `useEffect(() => { /* seu efeito aqui */ }, [arrayDeDependencias]);`
    *   O primeiro argumento é uma função que contém a lógica do efeito.
    *   O segundo argumento (opcional) é um array de dependências. O React só re-executará o efeito se algum valor nesse array mudar entre as renderizações.

**Comportamento do Array de Dependências:**

1.  **Sem array de dependências (omitido):** O efeito roda *após cada renderização* do componente. Use com cuidado, pois pode levar a loops infinitos se o efeito também causar uma re-renderização.
    ```jsx
    useEffect(() => {
      console.log('Componente renderizou ou atualizou');
      // CUIDADO: Se este efeito mudar um estado que causa re-renderização, pode criar um loop.
    });
    ```

2.  **Array de dependências vazio (`[]`):** O efeito roda *apenas uma vez*, após a primeira renderização (montagem do componente). É ideal para buscar dados iniciais ou configurar inscrições que não dependem de props ou estado.
    ```jsx
    useEffect(() => {
      console.log('Componente montou! Buscando dados...');
      // fetch('/api/dados').then(...);
    }, []); // Array vazio significa: rodar apenas na montagem
    ```

3.  **Array com dependências (`[prop1, estado1]`):** O efeito roda após a primeira renderização e sempre que *qualquer uma* das dependências listadas mudar de valor.
    ```jsx
    const [userId, setUserId] = useState(1);

    useEffect(() => {
      console.log(`Buscando dados para o usuário ${userId}`);
      // fetch(`/api/usuarios/${userId}`).then(...);
    }, [userId]); // Roda quando userId muda
    ```

**Função de Limpeza (Cleanup Function):**

Alguns efeitos precisam ser "limpos" quando o componente é desmontado ou antes que o efeito seja re-executado. Por exemplo, remover event listeners, cancelar timers ou fechar conexões de websocket.

Para isso, a função passada para `useEffect` pode retornar outra função. Essa função de retorno será executada pelo React antes de desmontar o componente ou antes de re-executar o efeito devido a uma mudança nas dependências.

```jsx
useEffect(() => {
  const timerId = setInterval(() => {
    console.log('Tick');
  }, 1000);

  // Função de limpeza
  return () => {
    console.log('Limpando o intervalo...');
    clearInterval(timerId);
  };
}, []); // Roda na montagem, limpa na desmontagem
```

**Exemplo: Buscando Dados com `useEffect`**

```jsx
import React, { useState, useEffect } from 'react';

function PerfilUsuario({ idUsuario }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setCarregando(true);
    setErro(null);
    fetch(`https://jsonplaceholder.typicode.com/users/${idUsuario}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao buscar dados do usuário');
        }
        return response.json();
      })
      .then(dados => {
        setUsuario(dados);
        setCarregando(false);
      })
      .catch(error => {
        setErro(error.message);
        setCarregando(false);
      });

    // Se idUsuario pudesse mudar e quiséssemos cancelar a requisição anterior,
    // precisaríamos de uma lógica de limpeza mais complexa (ex: AbortController)
  }, [idUsuario]); // Re-executa se idUsuario mudar

  if (carregando) return <p>Carregando perfil...</p>;
  if (erro) return <p>Erro: {erro}</p>;
  if (!usuario) return <p>Nenhum usuário encontrado.</p>;

  return (
    <div>
      <h1>{usuario.name}</h1>
      <p>Email: {usuario.email}</p>
      <p>Telefone: {usuario.phone}</p>
    </div>
  );
}

export default PerfilUsuario;
```

### `useContext`: Compartilhando Estado Globalmente

O Hook `useContext` permite que você acesse o valor de um Contexto React. Contexto fornece uma maneira de passar dados através da árvore de componentes sem ter que passar props manualmente em cada nível (evitando o "prop drilling").

É útil para dados que podem ser considerados "globais" para uma árvore de componentes React, como o usuário autenticado atual, tema (claro/escuro) ou configurações de idioma.

**Como Usar `useContext`:**

1.  **Criar um Contexto:** Use `React.createContext()`.
    ```javascript
    // temaContext.js
    import React from 'react';

    // Cria um contexto com um valor padrão (opcional)
    const TemaContext = React.createContext('claro'); // 'claro' é o valor padrão

    export default TemaContext;
    ```

2.  **Prover o Contexto:** Use o componente `Context.Provider` para envolver a parte da sua árvore de componentes que precisa ter acesso ao contexto. O `Provider` aceita uma prop `value` que será passada para os componentes consumidores.
    ```jsx
    // App.js
    import React, { useState } from 'react';
    import TemaContext from './temaContext';
    import Painel from './Painel';

    function App() {
      const [tema, setTema] = useState('claro');

      const alternarTema = () => {
        setTema(temaAtual => (temaAtual === 'claro' ? 'escuro' : 'claro'));
      };

      return (
        <TemaContext.Provider value={{ tema, alternarTema }}>
          <div>
            <h1>App com Contexto de Tema</h1>
            <Painel />
            <button onClick={alternarTema}>Alternar Tema</button>
          </div>
        </TemaContext.Provider>
      );
    }

    export default App;
    ```

3.  **Consumir o Contexto:** Em um componente funcional filho, use o Hook `useContext` para ler o valor atual do contexto.
    ```jsx
    // Painel.js
    import React, { useContext } from 'react';
    import TemaContext from './temaContext';

    function Painel() {
      const { tema, alternarTema } = useContext(TemaContext);

      const estiloPainel = {
        backgroundColor: tema === 'claro' ? '#eee' : '#333',
        color: tema === 'claro' ? '#333' : '#eee',
        padding: '20px',
        margin: '20px 0'
      };

      return (
        <div style={estiloPainel}>
          <p>O tema atual é: {tema}</p>
          <p>Este painel usa o tema do contexto.</p>
          {/* O botão para alternar o tema está no App.js, mas poderia ser chamado daqui também */}
        </div>
      );
    }

    export default Painel;
    ```

**Quando Usar Contexto:**

*   Para dados que precisam ser acessados por muitos componentes em diferentes níveis de aninhamento.
*   Evite usá-lo para tudo. Para estados que são locais a um componente ou a uma pequena subárvore, `useState` ou passagem de props ainda são mais apropriados.
*   Contexto não é otimizado para atualizações de alta frequência. Se o valor do contexto muda frequentemente, todos os componentes que consomem esse contexto serão re-renderizados. Para gerenciamento de estado global mais complexo e otimizado, bibliotecas como Redux ou Zustand podem ser mais adequadas (veremos uma visão geral delas mais tarde).

### Outros Hooks Úteis (`useRef`, `useMemo`, `useCallback`)

Além de `useState`, `useEffect` e `useContext`, existem outros Hooks embutidos que são muito úteis em cenários específicos:

*   **`useRef`:**
    *   **Propósito Principal 1: Acessar Elementos DOM Diretamente.** Permite criar uma referência a um elemento DOM ou a um componente React.
        ```jsx
        import React, { useRef, useEffect } from 'react';

        function CampoDeFoco() {
          const inputRef = useRef(null);

          useEffect(() => {
            // Foca o input quando o componente monta
            inputRef.current.focus();
          }, []);

          return <input ref={inputRef} type="text" />;
        }
        ```
    *   **Propósito Principal 2: Manter Valores Mutáveis que Não Causam Re-renderização.** `useRef` retorna um objeto mutável com uma propriedade `.current`. Alterar `.current` não dispara uma nova renderização. Isso é útil para armazenar valores que você quer persistir entre renderizações sem causar o ciclo de vida de atualização (ex: IDs de timers, conexões de socket).
        ```jsx
        import React, { useRef, useState, useEffect } from 'react';

        function Cronometro() {
          const [segundos, setSegundos] = useState(0);
          const intervalRef = useRef(null);

          useEffect(() => {
            intervalRef.current = setInterval(() => {
              setSegundos(s => s + 1);
            }, 1000);

            return () => clearInterval(intervalRef.current);
          }, []);

          const pararCronometro = () => {
            clearInterval(intervalRef.current);
          };

          return (
            <div>
              <p>Segundos: {segundos}</p>
              <button onClick={pararCronometro}>Parar</button>
            </div>
          );
        }
        ```

*   **`useMemo`:**
    *   **Propósito:** Memorizar (cachear) o resultado de um cálculo caro para que ele não seja re-executado em cada renderização, a menos que suas dependências mudem.
    *   **Sintaxe:** `const valorMemorizado = useMemo(() => calcularValor(a, b), [a, b]);`
    *   A função `calcularValor(a, b)` só será re-executada se `a` ou `b` mudarem.
    *   Útil para otimizar performance quando você tem cálculos que consomem muito processamento dentro de um componente que renderiza frequentemente.

    ```jsx
    import React, { useState, useMemo } from 'react';

    function CalculoPesadoComponente({ numero }) {
      const calcularFatorial = (n) => {
        console.log('Calculando fatorial de', n);
        if (n <= 1) return 1;
        let resultado = 1;
        for (let i = 2; i <= n; i++) {
          resultado *= i;
        }
        return resultado;
      };

      // Memoriza o resultado do fatorial
      // Só recalcula se 'numero' mudar
      const fatorial = useMemo(() => calcularFatorial(numero), [numero]);

      const [contador, setContador] = useState(0);

      return (
        <div>
          <p>Fatorial de {numero} é {fatorial}</p>
          <p>Contador (apenas para forçar re-render): {contador}</p>
          <button onClick={() => setContador(c => c + 1)}>Incrementar Contador</button>
        </div>
      );
    }
    // Se você clicar em "Incrementar Contador", o fatorial não será recalculado
    // a menos que a prop 'numero' também mude.
    ```

*   **`useCallback`:**
    *   **Propósito:** Memorizar uma *função* para que ela não seja recriada em cada renderização, a menos que suas dependências mudem.
    *   **Sintaxe:** `const funcaoMemorizada = useCallback(() => { fazerAlgo(a, b); }, [a, b]);`
    *   É particularmente útil quando você passa callbacks para componentes filhos otimizados (que usam `React.memo` ou `shouldComponentUpdate`) que dependem da igualdade referencial para evitar re-renderizações desnecessárias.

    ```jsx
    import React, { useState, useCallback } from 'react';

    // Suponha que Botao seja um componente otimizado com React.memo
    const Botao = React.memo(({ onClick, texto }) => {
      console.log('Botão renderizou:', texto);
      return <button onClick={onClick}>{texto}</button>;
    });

    function ContadorComCallback() {
      const [contador1, setContador1] = useState(0);
      const [contador2, setContador2] = useState(0);

      // Sem useCallback, esta função seria recriada em cada renderização,
      // fazendo com que o Botao para contador1 re-renderizasse desnecessariamente
      // quando apenas contador2 mudasse.
      const incrementarContador1 = useCallback(() => {
        setContador1(c => c + 1);
      }, []); // Dependência vazia, a função nunca muda

      const incrementarContador2 = useCallback(() => {
        setContador2(c => c + 1);
      }, []);

      return (
        <div>
          <p>Contador 1: {contador1}</p>
          <Botao onClick={incrementarContador1} texto="Incrementar Contador 1" />
          <p>Contador 2: {contador2}</p>
          <Botao onClick={incrementarContador2} texto="Incrementar Contador 2" />
        </div>
      );
    }
    ```
    **`useMemo` vs `useCallback`:**
    *   `useMemo` retorna um *valor* memorizado.
    *   `useCallback` retorna uma *função* memorizada. `useCallback(fn, deps)` é equivalente a `useMemo(() => fn, deps)`.

