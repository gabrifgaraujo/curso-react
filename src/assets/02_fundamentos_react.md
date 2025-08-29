## 2. Fundamentos do React com TypeScript

Agora que temos nosso ambiente configurado, vamos mergulhar nos conceitos fundamentais do React com TypeScript. Entender bem esses blocos de construção é crucial para se tornar um desenvolvedor React proficiente.

### TSX: A Sintaxe do React com TypeScript

TSX é a versão TypeScript do JSX - uma extensão de sintaxe para TypeScript que se parece muito com HTML. Ele permite que você escreva estruturas semelhantes a HTML diretamente no seu código TypeScript. O React não exige o uso de TSX, mas a maioria dos desenvolvedores o considera útil como um auxílio visual ao trabalhar com UI dentro do código TypeScript. Além disso, o React mostra mensagens de erro e aviso mais úteis quando se usa TSX.

**Exemplo Básico de TSX:**

```tsx
const elemento: JSX.Element = <h1>Olá, Mundo!</h1>;
```

Neste exemplo, `<h1>Olá, Mundo!</h1>` não é uma string nem HTML puro. É TSX. O TypeScript (com o compilador adequado) compila o TSX para chamadas de função `React.createElement()`.

O exemplo acima seria transpilado para algo como:

```typescript
const elemento: JSX.Element = React.createElement('h1', null, 'Olá, Mundo!');
```

**Principais Características do TSX:**

*   **Expressões TypeScript em TSX:** Você pode embutir qualquer expressão TypeScript válida dentro do TSX usando chaves `{}`.
    ```tsx
    const nome: string = 'Usuário';
    const elemento: JSX.Element = <h1>Olá, {nome}!</h1>; // Renderiza: Olá, Usuário!

    function formatarNome(usuario: { primeiroNome: string; ultimoNome: string }): string {
      return usuario.primeiroNome + ' ' + usuario.ultimoNome;
    }

    const usuario = {
      primeiroNome: 'Fulano',
      ultimoNome: 'de Tal'
    };

    const elementoCompleto: JSX.Element = (
      <h1>
        Olá, {formatarNome(usuario)}!
      </h1>
    );
    ```
*   **Atributos TSX:** Você pode usar atributos HTML padrão, mas eles são escritos em `camelCase` (por exemplo, `className` em vez de `class`, `tabIndex` em vez de `tabindex`).
    ```tsx
    const elementoComClasse: JSX.Element = <div className="minha-classe">Conteúdo</div>;
    const imagem: JSX.Element = <img src={urlDaImagem} alt="Descrição da Imagem" />;
    ```
*   **TSX Deve Ter um Único Elemento Raiz:** Se você quiser retornar múltiplos elementos, eles devem estar envolvidos por um único elemento pai. Pode ser uma `div`, ou, para evitar adicionar nós desnecessários ao DOM, você pode usar Fragmentos (`<React.Fragment>...</React.Fragment>` ou a sintaxe curta `<>...</>`).
    ```tsx
    // Correto
    const elementosAgrupados: JSX.Element = (
      <>
        <h1>Título</h1>
        <p>Parágrafo</p>
      </>
    );

    // Incorreto (causaria erro)
    // const elementosErrados = (
    //   <h1>Título</h1>
    //   <p>Parágrafo</p>
    // );
    ```
*   **Tags Vazias Devem Ser Fechadas:** Assim como em XML, tags que não têm filhos devem ser auto-fechadas com `/>`.
    ```tsx
    const elementoInput: JSX.Element = <input type="text" />;
    const linhaHorizontal: JSX.Element = <hr />;
    ```

### Componentes: Blocos de Construção

Componentes são o coração do React. Eles permitem que você divida a UI em pedaços independentes e reutilizáveis. Pense neles como funções TypeScript que aceitam entradas tipadas (chamadas "props") e retornam elementos React descrevendo o que deve aparecer na tela.

Existem dois tipos principais de componentes no React moderno:

1.  **Componentes Funcionais (Functional Components):** São a forma preferida e mais moderna de escrever componentes, especialmente com o advento dos Hooks. São literalmente funções TypeScript.

    ```tsx
    // Definindo o tipo das props
    interface BemVindoProps {
      nome: string;
    }

    // Componente funcional com tipagem
    function BemVindo(props: BemVindoProps): JSX.Element {
      return <h1>Olá, {props.nome}!</h1>;
    }

    // Usando o componente
    const app = <BemVindo nome="Maria" />;
    ```

2.  **Componentes de Classe (Class Components):** Era a forma padrão antes dos Hooks. Ainda são suportados, mas menos comuns em código novo.

    ```tsx
    import React, { Component } from 'react';

    // Definindo interfaces para props e state
    interface BemVindoProps {
      nome: string;
    }

    interface BemVindoState {
      contador: number;
    }

    class BemVindo extends Component<BemVindoProps, BemVindoState> {
      // Inicializando o state
      state: BemVindoState = {
        contador: 0
      };

      render(): JSX.Element {
        return <h1>Olá, {this.props.nome}!</h1>;
      }
    }
    ```

### Props: Passando Dados com Tipagem

Props (abreviação de "propriedades") são a maneira de passar dados de um componente pai para um componente filho. Com TypeScript, podemos definir exatamente quais props um componente aceita e de que tipo elas são.

**Definindo Props com TypeScript:**

```tsx
// Definindo uma interface para as props
interface PerfilUsuarioProps {
  nome: string;
  idade: number;
  email?: string; // O '?' indica que esta prop é opcional
  cargo: 'desenvolvedor' | 'designer' | 'gerente'; // Union type - só aceita esses valores
  onSalvar: (id: number) => void; // Tipo de função
}

// Componente com props tipadas
function PerfilUsuario(props: PerfilUsuarioProps): JSX.Element {
  return (
    <div>
      <h2>{props.nome}</h2>
      <p>Idade: {props.idade}</p>
      {props.email && <p>Email: {props.email}</p>}
      <p>Cargo: {props.cargo}</p>
      <button onClick={() => props.onSalvar(1)}>Salvar</button>
    </div>
  );
}

// Usando o componente
function App(): JSX.Element {
  const handleSalvar = (id: number): void => {
    console.log(`Salvando usuário ${id}`);
  };

  return (
    <PerfilUsuario
      nome="João Silva"
      idade={28}
      cargo="desenvolvedor"
      onSalvar={handleSalvar}
    />
  );
}
```

**Desestruturação de Props:**

Uma prática comum é desestruturar as props diretamente nos parâmetros da função, o que torna o código mais limpo:

```tsx
function PerfilUsuario({ nome, idade, email, cargo, onSalvar }: PerfilUsuarioProps): JSX.Element {
  return (
    <div>
      <h2>{nome}</h2>
      <p>Idade: {idade}</p>
      {email && <p>Email: {email}</p>}
      <p>Cargo: {cargo}</p>
      <button onClick={() => onSalvar(1)}>Salvar</button>
    </div>
  );
}
```

**Props para Crianças (Children):**

Para componentes que aceitam elementos filhos (children), você pode usar o tipo `React.ReactNode`:

```tsx
interface CardProps {
  titulo: string;
  children: React.ReactNode;
}

function Card({ titulo, children }: CardProps): JSX.Element {
  return (
    <div className="card">
      <h3>{titulo}</h3>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Uso:
function App(): JSX.Element {
  return (
    <Card titulo="Informações Importantes">
      <p>Este é o conteúdo do card.</p>
      <button>Clique Aqui</button>
    </Card>
  );
}
```

### State: Gerenciando o Estado com `useState`

O Hook `useState` permite adicionar estado local a componentes funcionais. Com TypeScript, podemos definir o tipo do estado para maior segurança.

**Exemplo Básico:**

```tsx
import React, { useState } from 'react';

function Contador(): JSX.Element {
  // Especificando o tipo do estado como number
  const [contador, setContador] = useState<number>(0);

  return (
    <div>
      <p>Você clicou {contador} vezes</p>
      <button onClick={() => setContador(contador + 1)}>
        Clique aqui
      </button>
    </div>
  );
}
```

**Estado com Tipos Complexos:**

```tsx
interface Usuario {
  id: number;
  nome: string;
  email: string;
  ativo: boolean;
}

function PerfilGerenciador(): JSX.Element {
  // Estado com tipo complexo
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  // Estado com union type
  const [status, setStatus] = useState<'carregando' | 'sucesso' | 'erro'>('carregando');

  // Simulando carregamento de usuário
  const carregarUsuario = (): void => {
    setStatus('carregando');
    
    // Simulando uma chamada API
    setTimeout(() => {
      setUsuario({
        id: 1,
        nome: 'Ana Silva',
        email: 'ana@exemplo.com',
        ativo: true
      });
      setStatus('sucesso');
    }, 1500);
  };

  return (
    <div>
      {status === 'carregando' && <p>Carregando...</p>}
      {status === 'erro' && <p>Erro ao carregar usuário.</p>}
      {status === 'sucesso' && usuario && (
        <div>
          <h2>{usuario.nome}</h2>
          <p>Email: {usuario.email}</p>
          <p>Status: {usuario.ativo ? 'Ativo' : 'Inativo'}</p>
        </div>
      )}
      <button onClick={carregarUsuario}>
        {usuario ? 'Recarregar Usuário' : 'Carregar Usuário'}
      </button>
    </div>
  );
}
```

### Eventos: Interagindo com o Usuário

Com TypeScript, podemos tipar corretamente os eventos do React para obter autocompletar e verificação de tipo.

**Exemplo de Manipulação de Eventos:**

```tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

function Formulario(): JSX.Element {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [erro, setErro] = useState<string | null>(null);

  // Evento de mudança em input com tipo específico
  const handleChangeNome = (e: ChangeEvent<HTMLInputElement>): void => {
    setNome(e.target.value);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    
    // Validação simples de email
    if (!e.target.value.includes('@')) {
      setErro('Email inválido');
    } else {
      setErro(null);
    }
  };

  // Evento de submissão de formulário
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (erro) {
      alert('Por favor, corrija os erros antes de enviar.');
      return;
    }
    
    alert(`Nome: ${nome}, Email: ${email}`);
    // Aqui você normalmente enviaria os dados para um servidor
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
          required
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
      </div>
      
      <button type="submit">Enviar</button>
    </form>
  );
}
```

**Tipos Comuns de Eventos React:**

- `React.ChangeEvent<HTMLInputElement>` - Para eventos de mudança em inputs
- `React.FormEvent<HTMLFormElement>` - Para eventos de submissão de formulário
- `React.MouseEvent<HTMLButtonElement>` - Para eventos de clique em botões
- `React.KeyboardEvent<HTMLInputElement>` - Para eventos de teclado

### Renderização Condicional

A renderização condicional em React com TypeScript funciona da mesma forma que em JavaScript, mas com a vantagem da verificação de tipos.

**Principais Abordagens:**

*   **Operador Ternário (`? :`):** Útil para escolher entre duas alternativas.

    ```tsx
    interface MensagemProps {
      isLogado: boolean;
    }

    function Mensagem({ isLogado }: MensagemProps): JSX.Element {
      return (
        <div>
          {isLogado 
            ? <h1>Bem-vindo de volta!</h1> 
            : <h1>Por favor, faça login.</h1>
          }
        </div>
      );
    }
    ```

*   **Operador Lógico `&&` (Curto-Circuito):** Útil quando você quer renderizar algo *apenas se* uma condição for verdadeira, e nada caso contrário.

    ```tsx
    interface CaixaDeEntradaProps {
      mensagensNaoLidas: string[];
    }

    function CaixaDeEntrada({ mensagensNaoLidas }: CaixaDeEntradaProps): JSX.Element {
      return (
        <div>
          <h1>Olá!</h1>
          {mensagensNaoLidas.length > 0 &&
            <h2>
              Você tem {mensagensNaoLidas.length} mensagens não lidas.
            </h2>
          }
        </div>
      );
    }

    // Exemplo de uso:
    // <CaixaDeEntrada mensagensNaoLidas={['msg1', 'msg2']} /> // Renderiza o h2
    // <CaixaDeEntrada mensagensNaoLidas={[]} /> // Não renderiza o h2
    ```

*   **Retornar `null` para Não Renderizar Nada:** Em alguns casos, você pode querer que um componente não renderize nada. Você pode fazer isso retornando `null`.

    ```tsx
    interface AvisoProps {
      mostrarAviso: boolean;
    }

    function Aviso({ mostrarAviso }: AvisoProps): JSX.Element | null {
      if (!mostrarAviso) {
        return null; // Não renderiza nada
      }

      return (
        <div className="aviso">
          Atenção!
        </div>
      );
    }
    ```

### Listas e Chaves

Você frequentemente precisará renderizar listas de elementos. Em TypeScript, você pode definir tipos para os itens da lista para maior segurança.

```tsx
interface Numero {
  id: number;
  valor: number;
}

interface ListaDeNumerosProps {
  numeros: Numero[];
}

function ListaDeNumeros({ numeros }: ListaDeNumerosProps): JSX.Element {
  const itensDaLista = numeros.map((numero) =>
    <li key={numero.id.toString()}>{numero.valor}</li>
  );

  return (
    <ul>{itensDaLista}</ul>
  );
}

// Uso:
// const numeros: Numero[] = [
//   { id: 1, valor: 1 },
//   { id: 2, valor: 2 },
//   { id: 3, valor: 3 }
// ];
// <ListaDeNumeros numeros={numeros} />
```

**A Prop `key`:**

Quando você renderiza uma lista de elementos, o React precisa de uma forma de identificar unicamente cada item da lista para poder atualizar, adicionar ou remover itens de forma eficiente. Para isso, você deve fornecer uma prop especial chamada `key` para cada item da lista.

*   **O que usar como `key`?** A `key` deve ser uma string única entre os irmãos da lista. Geralmente, você usará IDs dos seus dados como `key`.

    ```tsx
    interface Tarefa {
      id: string;
      texto: string;
    }

    const tarefas: Tarefa[] = [
      { id: 'a', texto: 'Aprender React' },
      { id: 'b', texto: 'Criar um projeto' },
      { id: 'c', texto: 'Conseguir um emprego' }
    ];

    const itensDeTarefa = tarefas.map((tarefa) =>
      <li key={tarefa.id}>
        {tarefa.texto}
      </li>
    );
    ```

*   **Quando não usar o índice do array como `key`:** Usar o índice do array como `key` (`map((item, index) => <li key={index}>...</li>)`) é geralmente desencorajado se a ordem dos itens pode mudar. Isso pode levar a problemas de performance e bugs com o estado dos componentes, pois o React usará a `key` para identificar o item, e se a ordem muda, a `key` (índice) pode acabar se referindo a um item diferente do que antes.
    *   É seguro usar o índice como `key` se a lista for estática e nunca for reordenada, ou se os itens não tiverem estado interno.

**Onde colocar a `key`?** As `keys` devem ser especificadas dentro do array que está sendo mapeado, no elemento que está sendo retornado diretamente pela função `map()`.

```tsx
import React from 'react';

interface Item {
  id: number;
  valor: string;
}

interface ItemDaListaProps {
  valor: string;
}

// Componente para um item individual da lista
function ItemDaLista({ valor }: ItemDaListaProps): JSX.Element {
  // A key deve ser colocada no elemento <ItemDaLista />, não aqui dentro.
  return <li>{valor}</li>;
}

interface MinhaListaProps {
  itens: Item[];
}

function MinhaLista({ itens }: MinhaListaProps): JSX.Element {
  const elementosDaLista = itens.map((item) =>
    // Correto: key no elemento retornado pelo map
    <ItemDaLista key={item.id} valor={item.valor} />
  );
  return <ul>{elementosDaLista}</ul>;
}
```

Dominar esses fundamentos é o primeiro grande passo para se tornar um desenvolvedor React com TypeScript. Pratique cada um desses conceitos criando pequenos componentes e experimentando com eles!
