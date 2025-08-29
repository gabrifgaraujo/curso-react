## 3. Hooks Essenciais do React com TypeScript

Os Hooks são uma adição relativamente nova ao React (introduzidos na versão 16.8) que permitem que você use estado e outros recursos do React sem escrever uma classe. Eles revolucionaram a forma como os componentes funcionais são escritos, tornando-os mais poderosos e fáceis de gerenciar. Com TypeScript, os Hooks ganham ainda mais poder através da tipagem estática.

### `useState`: Gerenciando Estado com Tipagem

Já introduzimos o `useState` na seção de Fundamentos, mas vamos revisitar e aprofundar um pouco, agora com foco na tipagem.

*   **Propósito:** Adicionar estado local a componentes funcionais.
*   **Sintaxe:** `const [estado, setEstado] = useState<TipoDoEstado>(valorInicial);`
    *   Retorna um array com dois elementos: o valor atual do estado e uma função para atualizá-lo.
    *   `valorInicial` é o valor que o estado terá na primeira renderização. Pode ser um valor direto ou uma função que retorna o valor inicial (útil para cálculos iniciais caros).

**Exemplo Detalhado:**

```tsx
import React, { useState } from 'react';

function FormularioSimples(): JSX.Element {
  // Estado para o valor do input de texto
  const [nome, setNome] = useState<string>('');
  // Estado para controlar se o formulário foi submetido
  const [submetido, setSubmetido] = useState<boolean>(false);

  const handleChangeNome = (evento: React.ChangeEvent<HTMLInputElement>): void => {
    setNome(evento.target.value);
    if (submetido) {
      setSubmetido(false); 
    }
  };

  const handleSubmit = (evento: React.FormEvent<HTMLFormElement>): void => {
    evento.preventDefault();
    setSubmetido(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          id="nome"
          type="text"
          value={nome}
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

```tsx
// Exemplo de contador, forma segura de incrementar
const [contador, setContador] = useState<number>(0);

const incrementar = (): void => {
  setContador(prevContador => prevContador + 1);
};
```

**Tipando Estados Complexos:**

```tsx
// Definindo uma interface para o estado
interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfis: string[];
}

// Usando a interface com useState
const [usuario, setUsuario] = useState<Usuario | null>(null);

// Para objetos com propriedades opcionais
interface Formulario {
  nome: string;
  email: string;
  telefone?: string; // Propriedade opcional
  preferencias: {
    receberEmails: boolean;
    tema: 'claro' | 'escuro'; // Union type
  };
}

const [formulario, setFormulario] = useState<Formulario>({
  nome: '',
  email: '',
  preferencias: {
    receberEmails: true,
    tema: 'claro'
  }
});

// Atualizando estado complexo de forma imutável
const atualizarNome = (novoNome: string): void => {
  setFormulario(prev => ({
    ...prev,
    nome: novoNome
  }));
};

const alternarTema = (): void => {
  setFormulario(prev => ({
    ...prev,
    preferencias: {
      ...prev.preferencias,
      tema: prev.preferencias.tema === 'claro' ? 'escuro' : 'claro'
    }
  }));
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
    ```tsx
    useEffect(() => {
      console.log('Componente renderizou ou atualizou');
      // CUIDADO: Se este efeito mudar um estado que causa re-renderização, pode criar um loop.
    });
    ```

2.  **Array de dependências vazio (`[]`):** O efeito roda *apenas uma vez*, após a primeira renderização (montagem do componente). É ideal para buscar dados iniciais ou configurar inscrições que não dependem de props ou estado.
    ```tsx
    useEffect(() => {
      console.log('Componente montou! Buscando dados...');
      // fetch('/api/dados').then(...);
    }, []); // Array vazio significa: rodar apenas na montagem
    ```

3.  **Array com dependências (`[prop1, estado1]`):** O efeito roda após a primeira renderização e sempre que *qualquer uma* das dependências listadas mudar de valor.
    ```tsx
    const [userId, setUserId] = useState<number>(1);

    useEffect(() => {
      console.log(`Buscando dados para o usuário ${userId}`);
      // fetch(`/api/usuarios/${userId}`).then(...);
    }, [userId]); // Roda quando userId muda
    ```

**Função de Limpeza (Cleanup Function):**

Alguns efeitos precisam ser "limpos" quando o componente é desmontado ou antes que o efeito seja re-executado. Por exemplo, remover event listeners, cancelar timers ou fechar conexões de websocket.

Para isso, a função passada para `useEffect` pode retornar outra função. Essa função de retorno será executada pelo React antes de desmontar o componente ou antes de re-executar o efeito devido a uma mudança nas dependências.

```tsx
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

**Exemplo: Buscando Dados com `useEffect` e TypeScript**

```tsx
import React, { useState, useEffect } from 'react';

// Definindo a interface para os dados do usuário
interface Usuario {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface PerfilUsuarioProps {
  idUsuario: number;
}

function PerfilUsuario({ idUsuario }: PerfilUsuarioProps): JSX.Element {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    // Função assíncrona para buscar dados
    const buscarDados = async (): Promise<void> => {
      try {
        setCarregando(true);
        setErro(null);
        
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${idUsuario}`);
        
        if (!response.ok) {
          throw new Error('Falha ao buscar dados do usuário');
        }
        
        const dados: Usuario = await response.json();
        setUsuario(dados);
      } catch (error) {
        setErro(error instanceof Error ? error.message : 'Erro desconhecido');
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();

    // Se idUsuario pudesse mudar e quiséssemos cancelar a requisição anterior,
    // poderíamos usar AbortController
    return () => {
      // Limpeza se necessário
    };
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

**Como Usar `useContext` com TypeScript:**

1.  **Criar um Contexto com Tipo:**
    ```tsx
    // temaContext.ts
    import React, { createContext } from 'react';

    // Definindo a interface para o valor do contexto
    export interface TemaContextType {
      tema: 'claro' | 'escuro';
      alternarTema: () => void;
    }

    // Valor padrão com tipagem
    const valorPadrao: TemaContextType = {
      tema: 'claro',
      alternarTema: () => {} // Função vazia como padrão
    };

    // Cria um contexto com o valor padrão tipado
    const TemaContext = createContext<TemaContextType>(valorPadrao);

    export default TemaContext;
    ```

2.  **Prover o Contexto:**
    ```tsx
    // App.tsx
    import React, { useState } from 'react';
    import TemaContext, { TemaContextType } from './temaContext';
    import Painel from './Painel';

    function App(): JSX.Element {
      const [tema, setTema] = useState<'claro' | 'escuro'>('claro');

      const alternarTema = (): void => {
        setTema(temaAtual => (temaAtual === 'claro' ? 'escuro' : 'claro'));
      };

      // Criando o valor do contexto
      const valorContexto: TemaContextType = {
        tema,
        alternarTema
      };

      return (
        <TemaContext.Provider value={valorContexto}>
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

3.  **Consumir o Contexto:**
    ```tsx
    // Painel.tsx
    import React, { useContext } from 'react';
    import TemaContext, { TemaContextType } from './temaContext';

    function Painel(): JSX.Element {
      // useContext com o tipo correto
      const { tema, alternarTema } = useContext<TemaContextType>(TemaContext);

      const estiloPainel: React.CSSProperties = {
        backgroundColor: tema === 'claro' ? '#eee' : '#333',
        color: tema === 'claro' ? '#333' : '#eee',
        padding: '20px',
        margin: '20px 0'
      };

      return (
        <div style={estiloPainel}>
          <p>O tema atual é: {tema}</p>
          <p>Este painel usa o tema do contexto.</p>
          <button onClick={alternarTema}>Alternar Tema (do Painel)</button>
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
        ```tsx
        import React, { useRef, useEffect } from 'react';

        function CampoDeFoco(): JSX.Element {
          // Tipando a referência para um elemento input
          const inputRef = useRef<HTMLInputElement>(null);

          useEffect(() => {
            // Foca o input quando o componente monta
            // O operador '?' garante que só acessamos .focus() se inputRef.current não for null
            inputRef.current?.focus();
          }, []);

          return <input ref={inputRef} type="text" />;
        }
        ```
    *   **Propósito Principal 2: Manter Valores Mutáveis que Não Causam Re-renderização.** `useRef` retorna um objeto mutável com uma propriedade `.current`. Alterar `.current` não dispara uma nova renderização. Isso é útil para armazenar valores que você quer persistir entre renderizações sem causar o ciclo de vida de atualização (ex: IDs de timers, conexões de socket).
        ```tsx
        import React, { useRef, useState, useEffect } from 'react';

        function Cronometro(): JSX.Element {
          const [segundos, setSegundos] = useState<number>(0);
          // Tipando a referência para um NodeJS.Timeout
          const intervalRef = useRef<NodeJS.Timeout | null>(null);

          useEffect(() => {
            intervalRef.current = setInterval(() => {
              setSegundos(s => s + 1);
            }, 1000);

            return () => {
              // Verificação de segurança antes de limpar
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }
            };
          }, []);

          const pararCronometro = (): void => {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
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
    *   **Sintaxe:** `const valorMemorizado = useMemo<TipoRetorno>(() => calcularValor(a, b), [a, b]);`
    *   A função `calcularValor(a, b)` só será re-executada se `a` ou `b` mudarem.
    *   Útil para otimizar performance quando você tem cálculos que consomem muito processamento dentro de um componente que renderiza frequentemente.

    ```tsx
    import React, { useState, useMemo } from 'react';

    function CalculoPesadoComponente({ numero }: { numero: number }): JSX.Element {
      const calcularFatorial = (n: number): number => {
        console.log('Calculando fatorial de', n);
        if (n <= 1) return 1;
        let resultado = 1;
        for (let i = 2; i <= n; i++) {
          resultado *= i;
        }
        return resultado;
      };

      // Memoriza o resultado do fatorial com tipo explícito
      // Só recalcula se 'numero' mudar
      const fatorial = useMemo<number>(() => calcularFatorial(numero), [numero]);

      const [contador, setContador] = useState<number>(0);

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
    *   **Sintaxe:** `const funcaoMemorizada = useCallback<(arg: TipoArg) => TipoRetorno>((arg) => { fazerAlgo(arg); }, [dependencias]);`
    *   É particularmente útil quando você passa callbacks para componentes filhos otimizados (que usam `React.memo` ou `shouldComponentUpdate`) que dependem da igualdade referencial para evitar re-renderizações desnecessárias.

    ```tsx
    import React, { useState, useCallback } from 'react';

    // Definindo o tipo das props do botão
    interface BotaoProps {
      onClick: () => void;
      texto: string;
    }

    // Suponha que Botao seja um componente otimizado com React.memo
    const Botao = React.memo(({ onClick, texto }: BotaoProps): JSX.Element => {
      console.log('Botão renderizou:', texto);
      return <button onClick={onClick}>{texto}</button>;
    });

    function ContadorComCallback(): JSX.Element {
      const [contador1, setContador1] = useState<number>(0);
      const [contador2, setContador2] = useState<number>(0);

      // Sem useCallback, esta função seria recriada em cada renderização,
      // fazendo com que o Botao para contador1 re-renderizasse desnecessariamente
      // quando apenas contador2 mudasse.
      const incrementarContador1 = useCallback((): void => {
        setContador1(c => c + 1);
      }, []); // Dependência vazia, a função nunca muda

      const incrementarContador2 = useCallback((): void => {
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

### Criando Seus Próprios Hooks (Custom Hooks)

Custom Hooks são uma convenção poderosa que permite extrair lógica de componentes reutilizável em funções TypeScript.

*   **Convenção de Nomenclatura:** Nomes de Custom Hooks devem começar com `use` (ex: `useFormInput`, `useFetchData`).
*   **O que eles são:** São funções TypeScript que podem chamar outros Hooks (como `useState`, `useEffect`, etc.).
*   **Por que usá-los?**
    *   **Reutilização de Lógica:** Evita duplicação de código entre componentes.
    *   **Abstração:** Esconde a complexidade da lógica de estado ou efeitos colaterais.
    *   **Organização:** Mantém os componentes mais limpos e focados na UI.

**Exemplo: Um Custom Hook `useFormInput` com TypeScript**

```tsx
import { useState, ChangeEvent } from 'react';

// Definindo o tipo de retorno do hook
interface UseFormInputReturn {
  valor: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
}

function useFormInput(valorInicial: string): UseFormInputReturn {
  const [valor, setValor] = useState<string>(valorInicial);

  function handleChange(evento: ChangeEvent<HTMLInputElement>): void {
    setValor(evento.target.value);
  }

  function reset(): void {
    setValor(valorInicial);
  }

  return {
    valor,
    onChange: handleChange,
    reset
  };
}

// Como usar no componente:
function MeuFormularioCustomHook(): JSX.Element {
  const nomeInput = useFormInput('');
  const emailInput = useFormInput('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    alert(`Nome: ${nomeInput.valor}, Email: ${emailInput.valor}`);
    
    // Resetando os campos após o envio
    nomeInput.reset();
    emailInput.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nome">Nome: </label>
        <input id="nome" type="text" {...nomeInput} />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input id="email" type="email" {...emailInput} />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}
```

**Exemplo: Custom Hook para Buscar Dados**

```tsx
import { useState, useEffect } from 'react';

// Definindo tipos genéricos para o hook
interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// Hook genérico que pode buscar qualquer tipo de dados
function useFetch<T>(url: string): UseFetchState<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async (): Promise<void> => {
      setState(prev => ({ ...prev, loading: true }));
      
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch abortado');
        } else {
          setState({ data: null, loading: false, error: error instanceof Error ? error : new Error(String(error)) });
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return state;
}

// Uso do hook com interface específica
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function PostComponent(): JSX.Element {
  const { data, loading, error } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts');

  if (loading) return <p>Carregando posts...</p>;
  if (error) return <p>Erro: {error.message}</p>;
  if (!data) return <p>Nenhum dado encontrado</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Dominar esses Hooks essenciais e entender como criar seus próprios Custom Hooks com TypeScript é fundamental para escrever código React moderno, eficiente, reutilizável e com segurança de tipos.
