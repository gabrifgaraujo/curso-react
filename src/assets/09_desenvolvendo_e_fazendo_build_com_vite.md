## 9. Desenvolvendo e Fazendo Build com Vite e TypeScript

O Vite é uma ferramenta de build moderna que oferece uma experiência de desenvolvimento extremamente rápida para projetos web. Combinado com TypeScript, ele proporciona um ambiente de desenvolvimento poderoso e eficiente para aplicações React.

### Por que usar Vite com TypeScript?

1. **Desenvolvimento extremamente rápido**: O Vite utiliza ESM nativo do navegador durante o desenvolvimento, o que significa que não há bundling durante o desenvolvimento, resultando em tempos de inicialização e hot module replacement (HMR) muito mais rápidos.

2. **Configuração mínima**: O Vite vem com suporte integrado para TypeScript, React, e outras tecnologias modernas, exigindo configuração mínima para começar.

3. **Build otimizado**: Para produção, o Vite utiliza Rollup para criar builds altamente otimizados.

4. **Experiência de desenvolvedor aprimorada**: A combinação de TypeScript com Vite proporciona feedback de tipo em tempo real, autocompletar, e detecção de erros durante o desenvolvimento.

### Criando um Projeto React com Vite e TypeScript

Para criar um novo projeto React com Vite e TypeScript:

```bash
# Usando npm
npm create vite@latest my-react-app -- --template react-ts

# Usando yarn
yarn create vite my-react-app --template react-ts

# Usando pnpm
pnpm create vite my-react-app --template react-ts
```

Este comando cria um novo projeto com a seguinte estrutura básica:

```
my-react-app/
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
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### Entendendo os Arquivos de Configuração

#### tsconfig.json

O arquivo `tsconfig.json` contém as configurações do TypeScript para o projeto:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Algumas configurações importantes:

- `target`: Define a versão do ECMAScript para a qual o TypeScript deve compilar.
- `lib`: Especifica quais bibliotecas de definição de tipo devem ser incluídas.
- `jsx`: Define como o JSX deve ser transformado (`react-jsx` é o modo moderno que não requer importar React).
- `strict`: Habilita todas as verificações de tipo estritas.
- `noUnusedLocals` e `noUnusedParameters`: Ajudam a manter o código limpo, alertando sobre variáveis e parâmetros não utilizados.

#### vite.config.ts

O arquivo `vite.config.ts` contém as configurações do Vite:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
```

Este é um arquivo de configuração básico que inclui o plugin React. Você pode estender esta configuração para adicionar mais plugins ou personalizar o comportamento do Vite.

### Comandos do Vite

Os comandos principais do Vite são:

```bash
# Iniciar o servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Visualizar a build de produção localmente
npm run preview
```

### Configurações Avançadas do Vite

#### Aliases de Importação

Você pode configurar aliases para facilitar a importação de módulos:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
```

Também é necessário atualizar o `tsconfig.json` para que o TypeScript reconheça esses aliases:

```json
{
  "compilerOptions": {
    // ... outras configurações
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

Agora você pode importar módulos usando os aliases:

```typescript
// Antes
import Button from '../../components/Button';

// Depois
import Button from '@components/Button';
```

#### Variáveis de Ambiente

O Vite tem suporte integrado para variáveis de ambiente:

```typescript
// .env
VITE_API_URL=https://api.example.com

// .env.development
VITE_API_URL=https://dev-api.example.com

// .env.production
VITE_API_URL=https://prod-api.example.com
```

Para usar as variáveis de ambiente em seu código:

```typescript
// src/api/client.ts
const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${apiUrl}/${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json() as Promise<T>;
}
```

Para ter tipagem para as variáveis de ambiente, crie um arquivo de declaração:

```typescript
// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // adicione outras variáveis de ambiente aqui
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

#### Configurando Proxy para Desenvolvimento

Para evitar problemas de CORS durante o desenvolvimento, você pode configurar um proxy:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

### Otimizando a Build para Produção

#### Code Splitting

O Vite faz code splitting automaticamente, mas você pode otimizar ainda mais usando importações dinâmicas:

```typescript
// src/App.tsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';

// Importações estáticas para componentes críticos
import Header from './components/Header';
import Footer from './components/Footer';

// Importações dinâmicas para componentes de rota
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
```

#### Compressão de Arquivos

Você pode adicionar plugins para comprimir os arquivos de saída:

```bash
npm install vite-plugin-compression --save-dev
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip', // ou 'brotliCompress'
      ext: '.gz', // extensão do arquivo comprimido
    }),
  ],
});
```

#### Análise de Bundle

Para analisar o tamanho do seu bundle:

```bash
npm install rollup-plugin-visualizer --save-dev
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // abre automaticamente o relatório após a build
      filename: 'dist/stats.html', // caminho para o arquivo de relatório
      gzipSize: true, // mostra o tamanho gzipped
      brotliSize: true, // mostra o tamanho brotli
    }),
  ],
});
```

### Configurando ESLint e Prettier com TypeScript

Para garantir a qualidade do código, é recomendável configurar ESLint e Prettier:

```bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks prettier eslint-plugin-prettier eslint-config-prettier --save-dev
```

Crie um arquivo `.eslintrc.js`:

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Suas regras personalizadas aqui
    'react/react-in-jsx-scope': 'off', // Não é necessário importar React com o novo JSX Transform
  },
};
```

Crie um arquivo `.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

Adicione scripts ao `package.json`:

```json
{
  "scripts": {
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,scss}\""
  }
}
```

### Configurando Testes com Vitest

O Vitest é uma ferramenta de teste moderna que funciona muito bem com Vite:

```bash
npm install vitest @testing-library/react @testing-library/jest-dom jsdom --save-dev
```

Configure o Vitest no `vite.config.ts`:

```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
```

Crie um arquivo `src/setupTests.ts`:

```typescript
import '@testing-library/jest-dom';
```

Adicione scripts ao `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Configurando PWA com Vite

Para transformar sua aplicação em um Progressive Web App (PWA):

```bash
npm install vite-plugin-pwa --save-dev
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'My React App',
        short_name: 'React App',
        description: 'My Awesome React App',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
```

### Configurando Internacionalização (i18n)

Para adicionar suporte a múltiplos idiomas:

```bash
npm install i18next react-i18next i18next-browser-languagedetector --save
```

```typescript
// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importando arquivos de tradução
import translationEN from './locales/en/translation.json';
import translationPT from './locales/pt/translation.json';

// Tipos para as traduções
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof translationEN;
    };
  }
}

const resources = {
  en: {
    translation: translationEN,
  },
  pt: {
    translation: translationPT,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // não é necessário para React
    },
  });

export default i18n;
```

```typescript
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

```typescript
// src/components/LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next';

function LanguageSwitcher(): JSX.Element {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string): void => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('pt')}>Português</button>
    </div>
  );
}

export default LanguageSwitcher;
```

```typescript
// src/components/Welcome.tsx
import { useTranslation } from 'react-i18next';

function Welcome(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <p>{t('welcome.description')}</p>
    </div>
  );
}

export default Welcome;
```

### Melhores Práticas para Projetos Vite com TypeScript

1. **Estrutura de Diretórios Organizada**:
   ```
   src/
   ├── assets/        # Imagens, fontes, etc.
   ├── components/    # Componentes reutilizáveis
   │   ├── ui/        # Componentes de UI básicos
   │   └── layout/    # Componentes de layout
   ├── hooks/         # Hooks personalizados
   ├── pages/         # Componentes de página
   ├── services/      # Serviços de API, etc.
   ├── store/         # Gerenciamento de estado global
   ├── types/         # Definições de tipos
   ├── utils/         # Funções utilitárias
   ├── App.tsx        # Componente raiz
   └── main.tsx       # Ponto de entrada
   ```

2. **Tipagem Estrita**:
   - Habilite `strict: true` no `tsconfig.json`
   - Evite usar `any` sempre que possível
   - Use tipos genéricos para componentes e funções reutilizáveis

3. **Importações Absolutas**:
   - Configure aliases para evitar importações relativas profundas
   - Mantenha as importações organizadas e agrupadas por tipo

4. **Code Splitting**:
   - Use importações dinâmicas para componentes de rota
   - Divida seu código em chunks lógicos

5. **Otimização de Performance**:
   - Use `React.memo` para componentes que renderizam frequentemente
   - Utilize `useMemo` e `useCallback` para valores e funções computacionalmente intensivas
   - Implemente virtualização para listas longas

6. **Acessibilidade**:
   - Use elementos semânticos HTML
   - Adicione atributos ARIA quando necessário
   - Teste com leitores de tela

7. **Testes**:
   - Escreva testes para componentes e hooks críticos
   - Use mocks para serviços externos
   - Mantenha uma boa cobertura de código

### Conclusão

O Vite combinado com TypeScript oferece uma experiência de desenvolvimento moderna e eficiente para projetos React. Com tempos de inicialização rápidos, hot module replacement instantâneo e builds otimizadas para produção, você pode focar no que realmente importa: construir uma aplicação incrível.

A tipagem estática do TypeScript adiciona uma camada extra de segurança ao seu código, ajudando a pegar erros mais cedo no ciclo de desenvolvimento e tornando seu código mais robusto e fácil de manter.

Ao seguir as melhores práticas e aproveitar as ferramentas disponíveis no ecossistema Vite e TypeScript, você pode criar aplicações React de alta qualidade, performáticas e escaláveis.
