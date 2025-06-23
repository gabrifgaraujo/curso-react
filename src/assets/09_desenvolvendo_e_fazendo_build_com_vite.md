## 9. Desenvolvendo e Fazendo Build com Vite

Vite se destaca por sua experiência de desenvolvimento rápida e configuração simplificada. Entender como ele funciona durante o desenvolvimento e como ele prepara sua aplicação para produção é importante.

### Estrutura de um Projeto Vite com React

Quando você cria um projeto React com Vite usando `npm create vite@latest` e selecionando o template React, a estrutura de pastas inicial é geralmente assim:

```
meu-app-react/
├── node_modules/
├── public/
│   └── vite.svg  // Exemplo de ativo estático
├── src/
│   ├── assets/
│   │   └── react.svg // Exemplo de ativo importado pelo JS
│   ├── components/ // (Você pode criar esta pasta para seus componentes)
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── index.html       // Ponto de entrada principal
├── package-lock.json
├── package.json
└── vite.config.js
```

**Principais Arquivos e Pastas:**

*   **`index.html`:** Este é o ponto de entrada da sua aplicação. Diferente de projetos criados com Create React App (CRA), o `index.html` fica na raiz do projeto e não na pasta `public`. Durante o desenvolvimento, Vite serve este arquivo. Seu JavaScript é injetado nele através de uma tag `<script type="module" src="/src/main.jsx"></script>`.
*   **`src/`:** Contém todo o seu código fonte (componentes React, lógica, estilos, etc.).
    *   **`main.jsx`:** É o ponto de entrada do seu JavaScript/React. Ele renderiza o componente principal da sua aplicação (geralmente `<App />`) no DOM.
    *   **`App.jsx`:** O componente raiz da sua aplicação.
    *   **`assets/`:** Para arquivos de mídia (imagens, fontes) que são importados e processados pelo seu código JavaScript.
*   **`public/`:** Para ativos estáticos que não são importados diretamente no seu código JavaScript, mas precisam ser servidos como estão (ex: `favicon.ico`, `robots.txt`, ou imagens que você referencia diretamente no `index.html`). Eles são copiados para a raiz do diretório de build sem processamento.
*   **`vite.config.js` (ou `.ts`):** Arquivo de configuração do Vite. Aqui você pode customizar plugins, configurar o servidor de desenvolvimento, otimizações de build, etc.
*   **`package.json`:** Define os metadados do projeto, dependências e scripts (como `dev`, `build`, `preview`).

### Servidor de Desenvolvimento e Hot Module Replacement (HMR)

Uma das maiores vantagens do Vite é seu servidor de desenvolvimento extremamente rápido.

*   **Como Iniciar:**
    ```bash
    npm run dev
    ```
*   **Native ESM (ES Modules):** Durante o desenvolvimento, Vite serve seu código fonte usando módulos ES nativos do navegador. Isso significa que não há um processo de "bundling" (empacotamento) de toda a aplicação antes que o servidor esteja pronto. O navegador solicita os módulos conforme necessário, e o Vite os transforma e serve sob demanda. Isso resulta em tempos de inicialização quase instantâneos.
*   **Hot Module Replacement (HMR):** Vite possui um HMR muito eficiente. Quando você edita um arquivo:
    *   **Componentes React:** O HMR do Vite (usando o plugin `@vitejs/plugin-react`) tenta atualizar apenas o componente modificado, preservando o estado de outros componentes na página. Isso torna o ciclo de feedback muito rápido.
    *   **CSS:** Alterações em arquivos CSS são injetadas instantaneamente sem recarregar a página ou perder o estado da aplicação.
*   **Pré-Bundling de Dependências:** Na primeira vez que você roda `npm run dev` (ou após adicionar/atualizar dependências), Vite pré-empacota suas dependências (módulos de `node_modules`) usando esbuild. Esbuild é um empacotador escrito em Go, extremamente rápido. Isso é feito por duas razões:
    1.  Converter dependências CommonJS e UMD para ESM.
    2.  Melhorar a performance, agrupando módulos com muitas importações internas em um único módulo para reduzir o número de requisições do navegador.

### Comandos de Build para Produção

Quando você está pronto para implantar sua aplicação, Vite usa o Rollup (um empacotador altamente otimizado) para criar um build de produção eficiente.

*   **Como Fazer o Build:**
    ```bash
    npm run build
    ```
*   **O que Acontece:**
    1.  **Bundling:** Seu código e o das dependências são empacotados em alguns poucos arquivos JavaScript e CSS otimizados.
    2.  **Minificação:** Código JavaScript e CSS são minificados para reduzir o tamanho.
    3.  **Code Splitting:** Vite (via Rollup) automaticamente divide o código em pedaços menores (chunks). Isso permite que o navegador carregue apenas o código necessário para a visualização inicial, melhorando o tempo de carregamento percebido. Chunks adicionais são carregados sob demanda (lazy loading).
    4.  **Otimizações de Ativos:** Imagens e outros ativos podem ser otimizados.
    5.  **Geração de Hashes nos Nomes dos Arquivos:** Arquivos gerados (JS, CSS) recebem hashes em seus nomes (ex: `index-a1b2c3d4.js`). Isso permite um cache agressivo no navegador, pois se o conteúdo do arquivo mudar, o hash mudará, e o navegador baixará a nova versão.
*   **Diretório de Saída:** Por padrão, os arquivos de build são colocados em um diretório `dist/` na raiz do seu projeto.
    ```
    meu-app-react/
    ├── dist/
    │   ├── assets/
    │   │   ├── index-a1b2c3d4.js
    │   │   └── index-e5f6g7h8.css
    │   └── index.html
    │   └── vite.svg (exemplo de ativo da pasta public)
    └── ... (outros arquivos do projeto)
    ```
    O `dist/index.html` é modificado para apontar para os arquivos JS e CSS gerados com hash.

*   **Visualizando o Build de Produção Localmente:**
    Após rodar `npm run build`, você pode testar o build de produção localmente usando o comando:
    ```bash
    npm run preview
    ```
    Isso iniciará um servidor estático simples que serve os arquivos da pasta `dist/`. É uma boa maneira de verificar se tudo funciona como esperado antes de implantar.

**Configurações de Build em `vite.config.js`:**

Você pode personalizar o processo de build através da opção `build` no seu `vite.config.js`.

```javascript
// vite.config.js
export default defineConfig({
  // ... outras configs
  build: {
    outDir: 'build', // Mudar o diretório de saída para 'build' em vez de 'dist'
    sourcemap: true, // Gerar sourcemaps para produção (útil para debugging, mas pode expor código)
    rollupOptions: {
      // Opções avançadas do Rollup
      output: {
        manualChunks(id) {
          // Exemplo de como criar chunks customizados
          if (id.includes('node_modules/react')) {
            return 'vendor-react';
          }
        }
      }
    }
  }
});
```

Vite simplifica muito o fluxo de trabalho de desenvolvimento e build para aplicações React modernas, oferecendo performance excepcional e uma experiência de desenvolvedor agradável.

