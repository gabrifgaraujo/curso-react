## 7. Estilização em React com TypeScript

A estilização é uma parte fundamental do desenvolvimento de interfaces de usuário. Com React e TypeScript, existem várias abordagens para estilizar seus componentes, cada uma com suas vantagens e casos de uso específicos.

### Abordagens de Estilização em React

1. **CSS Tradicional**: Arquivos CSS separados importados nos componentes
2. **CSS Modules**: Arquivos CSS com escopo local para componentes
3. **Styled Components**: CSS-in-JS com componentes estilizados
4. **Emotion**: Outra biblioteca CSS-in-JS com API flexível
5. **Tailwind CSS**: Utilitários CSS de baixo nível
6. **SASS/SCSS**: Pré-processador CSS com recursos avançados

Vamos explorar cada uma dessas abordagens com TypeScript.

### CSS Tradicional

A abordagem mais simples é usar arquivos CSS tradicionais e importá-los nos seus componentes React.

```tsx
// src/styles/Button.css
.button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #45a049;
}

.button.secondary {
  background-color: #008CBA;
}

.button.secondary:hover {
  background-color: #007B9A;
}
```

```tsx
// src/components/Button.tsx
import React from 'react';
import '../styles/Button.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button' 
}: ButtonProps): JSX.Element {
  const className = `button ${variant === 'secondary' ? 'secondary' : ''}`;
  
  return (
    <button 
      className={className}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
```

**Prós:**
- Familiar para quem já conhece CSS
- Fácil de implementar
- Bom para projetos pequenos

**Contras:**
- Sem escopo local (classes podem colidir)
- Sem verificação de tipos para classes CSS
- Difícil de manter em projetos grandes

### CSS Modules

CSS Modules resolve o problema de escopo global do CSS tradicional, criando nomes de classe únicos para cada componente.

```tsx
// src/components/Button.module.css
.button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #45a049;
}

.secondary {
  background-color: #008CBA;
}

.secondary:hover {
  background-color: #007B9A;
}
```

```tsx
// src/components/Button.tsx
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button' 
}: ButtonProps): JSX.Element {
  const className = `${styles.button} ${variant === 'secondary' ? styles.secondary : ''}`;
  
  return (
    <button 
      className={className}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
```

**Tipagem para CSS Modules:**

Para obter tipagem para seus módulos CSS, você pode criar um arquivo de declaração:

```typescript
// src/types/css.d.ts
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
```

**Prós:**
- Escopo local (evita colisões de nomes de classe)
- Sintaxe CSS familiar
- Bom para projetos de tamanho médio

**Contras:**
- Tipagem limitada para classes CSS
- Não permite lógica dinâmica dentro do CSS

### Styled Components

Styled Components é uma biblioteca popular de CSS-in-JS que permite escrever CSS real dentro dos seus componentes JavaScript/TypeScript.

**Instalação:**

```bash
npm install styled-components @types/styled-components
```

**Exemplo:**

```tsx
// src/components/Button.tsx
import styled from 'styled-components';

// Definindo tipos para as props do componente estilizado
interface StyledButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

// Criando um componente estilizado com TypeScript
const StyledButton = styled.button<StyledButtonProps>`
  padding: ${props => {
    switch (props.size) {
      case 'small': return '5px 10px';
      case 'large': return '15px 20px';
      default: return '10px 15px';
    }
  }};
  background-color: ${props => 
    props.variant === 'secondary' ? '#008CBA' : '#4CAF50'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: ${props => {
    switch (props.size) {
      case 'small': return '0.8rem';
      case 'large': return '1.2rem';
      default: return '1rem';
    }
  }};

  &:hover {
    background-color: ${props => 
      props.variant === 'secondary' ? '#007B9A' : '#45a049'};
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

// Interface para as props do componente React
interface ButtonProps extends StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

function Button({ 
  children, 
  variant = 'primary',
  size = 'medium',
  onClick, 
  type = 'button',
  disabled = false
}: ButtonProps): JSX.Element {
  return (
    <StyledButton 
      variant={variant}
      size={size}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
```

**Tema com Styled Components:**

```tsx
// src/styles/theme.ts
export const lightTheme = {
  colors: {
    primary: '#4CAF50',
    secondary: '#008CBA',
    text: '#333333',
    background: '#ffffff',
    error: '#f44336',
    success: '#4caf50',
    warning: '#ff9800',
  },
  fontSizes: {
    small: '0.8rem',
    medium: '1rem',
    large: '1.2rem',
    xlarge: '1.5rem',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '50%',
  },
};

export const darkTheme = {
  colors: {
    primary: '#66BB6A',
    secondary: '#29B6F6',
    text: '#f5f5f5',
    background: '#333333',
    error: '#e57373',
    success: '#81c784',
    warning: '#ffb74d',
  },
  fontSizes: lightTheme.fontSizes,
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
};

// Tipo para o tema
export type Theme = typeof lightTheme;
```

**Provedor de Tema:**

```tsx
// src/App.tsx
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Button from './components/Button';

function App(): JSX.Element {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const theme = isDarkTheme ? darkTheme : lightTheme;

  const toggleTheme = (): void => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <h1>Styled Components com TypeScript</h1>
        <Button onClick={toggleTheme}>
          Alternar para tema {isDarkTheme ? 'claro' : 'escuro'}
        </Button>
        <Button variant="secondary" size="large">
          Botão Secundário Grande
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

**Estilos Globais:**

```tsx
// src/styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    padding: ${({ theme }) => theme.spacing.lg};
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export default GlobalStyle;
```

**Tipagem para Tema:**

```tsx
// src/styled.d.ts
import 'styled-components';
import { Theme } from './styles/theme';

// Estendendo a definição de tipos do styled-components
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
```

**Prós:**
- Escopo local garantido
- Estilos dinâmicos baseados em props
- Tipagem forte com TypeScript
- Temas e estilos globais
- Sem necessidade de arquivos CSS separados

**Contras:**
- Curva de aprendizado para quem está acostumado com CSS tradicional
- Aumenta o tamanho do bundle JavaScript
- Pode ter impacto na performance em aplicações muito grandes

### Emotion

Emotion é outra biblioteca CSS-in-JS popular, com uma API flexível e boa integração com TypeScript.

**Instalação:**

```bash
npm install @emotion/react @emotion/styled
```

**Exemplo:**

```tsx
// src/components/ButtonEmotion.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

// Definindo tipos para as props
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

// Estilos base usando a API css
const buttonBaseStyles = css`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.2s;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

// Componente estilizado com Emotion
const StyledButton = styled.button<ButtonProps>`
  ${buttonBaseStyles}
  
  background-color: ${props => 
    props.variant === 'secondary' ? '#008CBA' : '#4CAF50'};
  color: white;
  
  padding: ${props => {
    switch (props.size) {
      case 'small': return '5px 10px';
      case 'large': return '15px 20px';
      default: return '10px 15px';
    }
  }};
  
  font-size: ${props => {
    switch (props.size) {
      case 'small': return '0.8rem';
      case 'large': return '1.2rem';
      default: return '1rem';
    }
  }};

  &:hover:not(:disabled) {
    background-color: ${props => 
      props.variant === 'secondary' ? '#007B9A' : '#45a049'};
  }
`;

function ButtonEmotion({ 
  children, 
  variant = 'primary',
  size = 'medium',
  onClick, 
  disabled = false
}: ButtonProps): JSX.Element {
  return (
    <StyledButton 
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
}

export default ButtonEmotion;
```

**Prós:**
- API flexível (suporta tanto styled quanto css prop)
- Boa integração com TypeScript
- Performance ligeiramente melhor que Styled Components em alguns casos
- Suporte a temas e estilos globais

**Contras:**
- Semelhantes aos do Styled Components
- Configuração adicional para JSX pragma ou plugin Babel

### Tailwind CSS

Tailwind CSS é uma abordagem de "utility-first" para estilização, onde você aplica classes utilitárias diretamente aos elementos HTML.

**Instalação:**

```bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Configuração (tailwind.config.js):**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Configuração (src/index.css):**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Exemplo:**

```tsx
// src/components/ButtonTailwind.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

function ButtonTailwind({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick, 
  type = 'button',
  disabled = false
}: ButtonProps): JSX.Element {
  // Mapeando variantes para classes Tailwind
  const variantClasses = {
    primary: 'bg-green-500 hover:bg-green-600',
    secondary: 'bg-blue-500 hover:bg-blue-600'
  };
  
  // Mapeando tamanhos para classes Tailwind
  const sizeClasses = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg'
  };
  
  // Combinando todas as classes
  const classes = `
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    text-white font-medium rounded
    focus:outline-none focus:ring-2 focus:ring-opacity-50
    ${variant === 'primary' ? 'focus:ring-green-400' : 'focus:ring-blue-400'}
    transition-colors
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;
  
  return (
    <button 
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default ButtonTailwind;
```

**Tipagem para Classes Tailwind:**

Para obter autocompletar e verificação de tipos para classes Tailwind, você pode usar o pacote `tailwind-merge` e criar um helper tipado:

```bash
npm install tailwind-merge clsx
```

```tsx
// src/utils/tailwind.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper para combinar classes Tailwind de forma segura
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

```tsx
// src/components/ButtonTailwindImproved.tsx
import React from 'react';
import { cn } from '../utils/tailwind';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string; // Para classes adicionais
}

function ButtonTailwindImproved({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick, 
  type = 'button',
  disabled = false,
  className
}: ButtonProps): JSX.Element {
  return (
    <button 
      className={cn(
        // Classes base
        "font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50",
        
        // Variantes
        variant === 'primary' && "bg-green-500 hover:bg-green-600 focus:ring-green-400",
        variant === 'secondary' && "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400",
        
        // Tamanhos
        size === 'small' && "py-1 px-2 text-sm",
        size === 'medium' && "py-2 px-4 text-base",
        size === 'large' && "py-3 px-6 text-lg",
        
        // Estado desabilitado
        disabled && "opacity-50 cursor-not-allowed",
        
        // Classes personalizadas
        className
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default ButtonTailwindImproved;
```

**Prós:**
- Desenvolvimento rápido sem escrever CSS
- Responsivo por padrão
- Altamente customizável
- Bom para prototipagem rápida

**Contras:**
- Classes podem tornar o JSX verboso
- Curva de aprendizado para memorizar as classes
- Pode ser difícil de manter em projetos muito grandes sem organização adequada

### SASS/SCSS

SASS/SCSS é um pré-processador CSS que adiciona recursos como variáveis, mixins, funções e aninhamento.

**Instalação:**

```bash
npm install sass
```

**Exemplo:**

```scss
// src/styles/variables.scss
$primary-color: #4CAF50;
$secondary-color: #008CBA;
$border-radius: 4px;

// Mixins
@mixin button-base {
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.2s;
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
}

@mixin button-size($padding-y, $padding-x, $font-size) {
  padding: $padding-y $padding-x;
  font-size: $font-size;
}
```

```scss
// src/components/Button.module.scss
@import '../styles/variables.scss';

.button {
  @include button-base;
  color: white;
  
  &.primary {
    background-color: $primary-color;
    
    &:hover:not(:disabled) {
      background-color: darken($primary-color, 5%);
    }
  }
  
  &.secondary {
    background-color: $secondary-color;
    
    &:hover:not(:disabled) {
      background-color: darken($secondary-color, 5%);
    }
  }
  
  &.small {
    @include button-size(5px, 10px, 0.8rem);
  }
  
  &.medium {
    @include button-size(10px, 15px, 1rem);
  }
  
  &.large {
    @include button-size(15px, 20px, 1.2rem);
  }
}
```

```tsx
// src/components/ButtonSass.tsx
import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

function ButtonSass({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick, 
  type = 'button',
  disabled = false
}: ButtonProps): JSX.Element {
  const className = `${styles.button} ${styles[variant]} ${styles[size]}`;
  
  return (
    <button 
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default ButtonSass;
```

**Tipagem para SCSS Modules:**

```typescript
// src/types/scss.d.ts
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
```

**Prós:**
- Recursos avançados como variáveis, mixins, funções
- Sintaxe familiar para quem conhece CSS
- Bom para projetos de médio a grande porte
- Pode ser usado com CSS Modules para escopo local

**Contras:**
- Requer um pré-processador
- Pode levar a CSS excessivamente aninhado se não for bem gerenciado
- Tipagem limitada para classes SCSS

### Escolhendo a Abordagem Certa

A escolha da abordagem de estilização depende de vários fatores:

1. **Tamanho do Projeto:**
   - Projetos pequenos: CSS tradicional ou CSS Modules
   - Projetos médios: CSS Modules, Styled Components, ou Tailwind CSS
   - Projetos grandes: Styled Components, Emotion, ou uma combinação de abordagens

2. **Preferências da Equipe:**
   - Equipes familiarizadas com CSS tradicional podem preferir CSS Modules ou SASS
   - Equipes com foco em JavaScript podem preferir Styled Components ou Emotion
   - Equipes que valorizam velocidade de desenvolvimento podem preferir Tailwind CSS

3. **Requisitos de Performance:**
   - CSS tradicional e CSS Modules têm melhor performance inicial
   - CSS-in-JS pode ter impacto na performance de renderização inicial, mas oferece mais recursos dinâmicos

4. **Integração com TypeScript:**
   - Styled Components e Emotion têm excelente integração com TypeScript
   - CSS Modules e SCSS requerem arquivos de declaração adicionais
   - Tailwind CSS pode ser tipado com utilitários como tailwind-merge e clsx

### Conclusão

Não existe uma abordagem "correta" para estilização em React com TypeScript. Cada método tem seus prós e contras, e a escolha depende das necessidades específicas do seu projeto e das preferências da sua equipe.

Uma estratégia comum é usar uma combinação de abordagens:
- CSS Modules ou SCSS para componentes estáticos
- Styled Components ou Emotion para componentes dinâmicos baseados em props
- Tailwind CSS para prototipagem rápida ou componentes simples

Independentemente da abordagem escolhida, TypeScript adiciona uma camada valiosa de segurança de tipos que ajuda a evitar bugs relacionados a estilos e torna o código mais fácil de entender e manter.
