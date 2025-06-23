## 2. Fundamentos do React

Agora que temos nosso ambiente configurado, vamos mergulhar nos conceitos fundamentais do React. Entender bem esses blocos de construção é crucial para se tornar um desenvolvedor React proficiente.

### JSX: A Sintaxe do React

JSX (JavaScript XML) é uma extensão de sintaxe para JavaScript que se parece muito com HTML. Ele permite que você escreva estruturas semelhantes a HTML diretamente no seu código JavaScript. O React não exige o uso de JSX, mas a maioria dos desenvolvedores o considera útil como um auxílio visual ao trabalhar com UI dentro do código JavaScript. Além disso, o React mostra mensagens de erro e aviso mais úteis quando se usa JSX.

**Exemplo Básico de JSX:**

```jsx
const elemento = <h1>Olá, Mundo!</h1>;
```

Neste exemplo, `<h1>Olá, Mundo!</h1>` não é uma string nem HTML puro. É JSX. O Babel (um transpilador JavaScript que o Vite usa por baixo dos panos) compila o JSX para chamadas de função `React.createElement()`.

O exemplo acima seria transpilado para algo como:

```javascript
const elemento = React.createElement('h1', null, 'Olá, Mundo!');
```

**Principais Características do JSX:**

*   **Expressões JavaScript em JSX:** Você pode embutir qualquer expressão JavaScript válida dentro do JSX usando chaves `{}`.
    ```jsx
    const nome = 'Usuário';
    const elemento = <h1>Olá, {nome}!</h1>; // Renderiza: Olá, Usuário!

    function formatarNome(usuario) {
      return usuario.primeiroNome + ' ' + usuario.ultimoNome;
    }

    const usuario = {
      primeiroNome: 'Fulano',
      ultimoNome: 'de Tal'
    };

    const elementoCompleto = (
      <h1>
        Olá, {formatarNome(usuario)}!
      </h1>
    );
    ```
*   **Atributos JSX:** Você pode usar atributos HTML padrão, mas eles são escritos em `camelCase` (por exemplo, `className` em vez de `class`, `tabIndex` em vez de `tabindex`).
    ```jsx
    const elementoComClasse = <div className="minha-classe">Conteúdo</div>;
    const imagem = <img src={urlDaImagem} alt="Descrição da Imagem" />;
    ```
*   **JSX Deve Ter um Único Elemento Raiz:** Se você quiser retornar múltiplos elementos, eles devem estar envolvidos por um único elemento pai. Pode ser uma `div`, ou, para evitar adicionar nós desnecessários ao DOM, você pode usar Fragmentos (`<React.Fragment>...</React.Fragment>` ou a sintaxe curta `<>...</>`).
    ```jsx
    // Correto
    const elementosAgrupados = (
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
    ```jsx
    const elementoInput = <input type="text" />;
    const linhaHorizontal = <hr />;
    ```

### Componentes: Blocos de Construção

Componentes são o coração do React. Eles permitem que você divida a UI em pedaços independentes e reutilizáveis. Pense neles como funções JavaScript que aceitam entradas arbitrárias (chamadas "props") e retornam elementos React descrevendo o que deve aparecer na tela.

Existem dois tipos principais de componentes no React moderno:

1.  **Componentes Funcionais (Functional Components):** São a forma preferida e mais moderna de escrever componentes, especialmente com o advento dos Hooks. São literalmente funções JavaScript.

    ```jsx
    // Componente funcional simples
    function BemVindo(props) {
      return <h1>Olá, {props.nome}!</h1>;
    }

    // Usando o componente
    const app = <BemVindo nome="Maria" />;
    ```

2.  **Componentes de Classe (Class Components):** Eram a forma principal de criar componentes com estado e ciclo de vida antes dos Hooks. Embora ainda sejam suportados, novos projetos geralmente preferem componentes funcionais.

    ```jsx
    import React from 'react';

    class BemVindoClasse extends React.Component {
      render() {
        return <h1>Olá, {this.props.nome}!</h1>;
      }
    }

    // Usando o componente
    const appClasse = <BemVindoClasse nome="João" />;
    ```

**Nomeando Componentes:** Nomes de componentes devem sempre começar com uma letra maiúscula (ex: `MeuComponente` e não `meuComponente`). Isso é importante para que o React os diferencie de tags HTML comuns.

**Composição de Componentes:** Componentes podem referenciar outros componentes em sua saída. Isso permite que você use a mesma abstração de componente em qualquer nível de detalhe.

```jsx
function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}

function InfoUsuario(props) {
  return (
    <div className="InfoUsuario">
      <Avatar user={props.user} />
      <div className="InfoUsuario-nome">
        {props.user.name}
      </div>
    </div>
  );
}

function Comentario(props) {
  return (
    <div className="Comentario">
      <InfoUsuario user={props.autor} />
      <div className="Comentario-texto">
        {props.texto}
      </div>
      <div className="Comentario-data">
        {/* Supondo uma função para formatar data */}
        {formatarData(props.data)}
      </div>
    </div>
  );
}

// Exemplo de uso
const dadosComentario = {
  autor: {
    avatarUrl: 'https://exemplo.com/avatar.jpg',
    name: 'Ana'
  },
  texto: 'Adorei este guia de React!',
  data: new Date()
};

const appComentario = <Comentario autor={dadosComentario.autor} texto={dadosComentario.texto} data={dadosComentario.data} />;
```

### Props: Passando Dados

"Props" (abreviação de "properties") são como argumentos de função em JavaScript e atributos em HTML. Elas são a forma de passar dados de um componente pai para um componente filho.

*   **Props são Somente Leitura:** Um componente nunca deve modificar suas próprias props. Elas são recebidas do pai e são imutáveis do ponto de vista do componente filho. Todas as funções React devem agir como "funções puras" com respeito às suas props.

No exemplo do `BemVindo` acima, `nome` é uma prop:

```jsx
function BemVindo(props) {
  // props.nome é acessado aqui
  return <h1>Olá, {props.nome}!</h1>;
}

// "Maria" é passada como a prop 'nome' para o componente BemVindo
const elemento = <BemVindo nome="Maria" />;
```

Você pode passar qualquer tipo de dado JavaScript como prop: strings, números, booleanos, arrays, objetos, funções, etc.

**Props Padrão (Default Props):** Você pode definir valores padrão para props caso elas não sejam fornecidas pelo componente pai.

```jsx
function Botao(props) {
  return <button style={{ backgroundColor: props.cor }}>{props.texto}</button>;
}

Botao.defaultProps = {
  cor: 'blue',
  texto: 'Clique Aqui'
};

// Uso:
// <Botao /> (usará cor azul e texto 'Clique Aqui')
// <Botao texto="Enviar" cor="green" /> (usará os valores fornecidos)
```

### State: Gerenciando o Estado com `useState`

Enquanto props são passadas de pai para filho, o "state" (estado) é um dado que é gerenciado *dentro* de um componente. O estado permite que os componentes React alterem sua saída ao longo do tempo em resposta a ações do usuário, respostas de rede, ou qualquer outra coisa.

O Hook `useState` é a forma principal de adicionar estado a componentes funcionais.

*   **Declarando o Estado:** `useState` retorna um par: o valor do estado atual e uma função que permite atualizá-lo.

    ```jsx
    import React, { useState } from 'react';

    function Contador() {
      // Declara uma nova variável de estado chamada 

contagem" e uma função para atualizá-la "setContagem"
      const [contagem, setContagem] = useState(0); // 0 é o valor inicial

      return (
        <div>
          <p>Você clicou {contagem} vezes</p>
          <button onClick={() => setContagem(contagem + 1)}>
            Clique aqui
          </button>
        </div>
      );
    }
    ```
*   **Lendo o Estado:** Você pode usar a variável de estado diretamente no seu JSX ou em qualquer lógica dentro do componente (ex: `{contagem}`).
*   **Atualizando o Estado:** Chame a função de atualização (ex: `setContagem`) com o novo valor. Quando você chama essa função, o React agenda uma nova renderização do componente com o novo valor do estado. O React preserva o estado entre as renderizações.
*   **Atualizações de Estado São Assíncronas:** O React pode agrupar múltiplas chamadas `setState` em uma única atualização para melhor performance. Por isso, não confie no valor do estado logo após chamara função de atualização se você precisar do valor anterior para calcular o próximo. Se o novo estado depende do estado anterior, você pode passar uma função para a função de atualização do estado:
    ```jsx
    // Forma segura de atualizar o estado baseado no estado anterior
    setContagem(prevContagem => prevContagem + 1);
    ```

### Eventos: Interagindo com o Usuário

Lidar com eventos em elementos React é muito semelhante a lidar com eventos em elementos DOM, mas com algumas diferenças sintáticas:

*   Eventos React são nomeados usando `camelCase`, em vez de minúsculas (ex: `onClick` em vez de `onclick`).
*   Com JSX, você passa uma função como o manipulador de eventos, em vez de uma string.

**Exemplo de Manipulador de Evento `onClick`:**

```jsx
import React, { useState } from 'react';

function BotaoDeAlerta() {
  function handleClick() {
    alert('Botão clicado!');
  }

  return (
    <button onClick={handleClick}>
      Clique em Mim
    </button>
  );
}

// Passando argumentos para manipuladores de evento
function BotaoComMensagem(props) {
  function handleClickComMensagem(mensagem) {
    alert(mensagem);
  }

  // Usamos uma arrow function para chamar o manipulador com um argumento
  return (
    <button onClick={() => handleClickComMensagem(props.mensagem)}>
      {props.textoBotao}
    </button>
  );
}

function AppEventos() {
  return (
    <>
      <BotaoDeAlerta />
      <BotaoComMensagem mensagem="Olá do segundo botão!" textoBotao="Clique para Mensagem" />
    </>
  );
}
```

Outros eventos comuns incluem `onChange` (para inputs), `onSubmit` (para formulários), `onMouseOver`, etc.

**O Objeto de Evento Sintético:** O React passa um "evento sintético" para os manipuladores de evento. Esses eventos sintéticos têm a mesma interface que os eventos nativos do navegador, incluindo `stopPropagation()` e `preventDefault()`, mas funcionam de forma idêntica em todos os navegadores.

### Renderização Condicional

Frequentemente, você desejará renderizar diferentes elementos ou componentes com base em certas condições (por exemplo, o estado da aplicação, props recebidas, etc.). O React permite que você use construções JavaScript padrão para isso.

*   **`if` / `else`:**

    ```jsx
    import React, { useState } from 'react';

    function SaudacaoCondicional(props) {
      const [logado, setLogado] = useState(false);

      function BotaoLogin(props) {
        return <button onClick={props.onClick}>Login</button>;
      }

      function BotaoLogout(props) {
        return <button onClick={props.onClick}>Logout</button>;
      }

      if (logado) {
        return (
          <>
            <p>Bem-vindo de volta!</p>
            <BotaoLogout onClick={() => setLogado(false)} />
          </>
        );
      } else {
        return (
          <>
            <p>Por favor, faça o login.</p>
            <BotaoLogin onClick={() => setLogado(true)} />
          </>
        );
      }
    }
    ```

*   **Operador Ternário (`condicao ? exprSeVerdadeiro : exprSeFalso`):** Útil para condições inline dentro do JSX.

    ```jsx
    import React, { useState } from 'react';

    function StatusUsuario() {
      const [estaLogado, setEstaLogado] = useState(false);

      return (
        <div>
          <p>O usuário está {estaLogado ? 'logado' : 'deslogado'}.</p>
          <button onClick={() => setEstaLogado(!estaLogado)}>
            {estaLogado ? 'Sair' : 'Entrar'}
          </button>
        </div>
      );
    }
    ```

*   **Operador Lógico `&&` (Curto-Circuito):** Útil quando você quer renderizar algo *apenas se* uma condição for verdadeira, e nada caso contrário.

    ```jsx
    import React from 'react';

    function CaixaDeEntrada(props) {
      const mensagensNaoLidas = props.mensagensNaoLidas;
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

    ```jsx
    function Aviso(props) {
      if (!props.mostrarAviso) {
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

Você frequentemente precisará renderizar listas de elementos. Em JavaScript, você pode usar a função `map()` para transformar um array de dados em um array de elementos React.

```jsx
import React from 'react';

function ListaDeNumeros(props) {
  const numeros = props.numeros; // Ex: [1, 2, 3, 4, 5]
  const itensDaLista = numeros.map((numero) =>
    // ATENÇÃO: Falta a prop "key" aqui, vamos corrigir abaixo!
    <li>{numero}</li>
  );

  return (
    <ul>{itensDaLista}</ul>
  );
}

// Uso:
// const numeros = [1, 2, 3, 4, 5];
// <ListaDeNumeros numeros={numeros} />
```

**A Prop `key`:**

Quando você renderiza uma lista de elementos, o React precisa de uma forma de identificar unicamente cada item da lista para poder atualizar, adicionar ou remover itens de forma eficiente. Para isso, você deve fornecer uma prop especial chamada `key` para cada item da lista.

*   **O que usar como `key`?** A `key` deve ser uma string única entre os irmãos da lista. Geralmente, você usará IDs dos seus dados como `key`.

    ```jsx
    const tarefas = [
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

```jsx
import React from 'react';

// Componente para um item individual da lista
function ItemDaLista(props) {
  // A key deve ser colocada no elemento <ItemDaLista />, não aqui dentro.
  return <li>{props.valor}</li>;
}

function MinhaLista(props) {
  const itens = props.itens; // Ex: [{id: 1, valor: 'Maçã'}, {id: 2, valor: 'Banana'}]
  const elementosDaLista = itens.map((item) =>
    // Correto: key no elemento retornado pelo map
    <ItemDaLista key={item.id} valor={item.valor} />
  );
  return <ul>{elementosDaLista}</ul>;
}
```

Dominar esses fundamentos é o primeiro grande passo para se tornar um desenvolvedor React. Pratique cada um desses conceitos criando pequenos componentes e experimentando com eles!

