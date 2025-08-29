## 8. Testando Aplicações React com TypeScript

Testes são uma parte essencial do desenvolvimento de software moderno. Com TypeScript, podemos adicionar uma camada extra de segurança aos nossos testes, garantindo que os componentes e funções sejam testados de acordo com seus tipos definidos.

### Ferramentas de Teste para React com TypeScript

Existem várias ferramentas populares para testar aplicações React com TypeScript:

1. **Jest**: Framework de teste com suporte a mocking, snapshots e cobertura de código
2. **React Testing Library**: Biblioteca para testar componentes React de forma centrada no usuário
3. **Vitest**: Alternativa moderna ao Jest, otimizada para Vite
4. **Cypress**: Ferramenta para testes end-to-end
5. **Testing Library/User Event**: Biblioteca para simular interações do usuário

Vamos explorar como usar essas ferramentas com TypeScript.

### Configurando Jest com TypeScript

Para configurar Jest com TypeScript em um projeto Vite:

```bash
npm install -D jest @types/jest ts-jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

**Configuração do Jest (jest.config.js):**

```typescript
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json'
    }]
  }
};
```

**Arquivo de configuração de testes (src/setupTests.ts):**

```typescript
// src/setupTests.ts
import '@testing-library/jest-dom';
```

**Adicionar scripts no package.json:**

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Configurando Vitest com TypeScript

Se você estiver usando Vite, Vitest é uma alternativa moderna ao Jest que se integra perfeitamente:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**Configuração do Vitest (vite.config.ts):**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true
  }
});
```

**Arquivo de configuração de testes (src/setupTests.ts):**

```typescript
// src/setupTests.ts
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// Estende os matchers do Vitest com os do testing-library
expect.extend(matchers);

// Limpa após cada teste
afterEach(() => {
  cleanup();
});
```

**Adicionar scripts no package.json:**

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Testando Componentes React com TypeScript

Vamos ver como testar componentes React com TypeScript usando React Testing Library:

**Componente a ser testado:**

```tsx
// src/components/Counter.tsx
import { useState } from 'react';

interface CounterProps {
  initialValue?: number;
  step?: number;
  onCountChange?: (count: number) => void;
}

function Counter({ 
  initialValue = 0, 
  step = 1,
  onCountChange
}: CounterProps): JSX.Element {
  const [count, setCount] = useState<number>(initialValue);

  const increment = (): void => {
    const newCount = count + step;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  const decrement = (): void => {
    const newCount = count - step;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={decrement} aria-label="Decrement">-</button>
      <button onClick={increment} aria-label="Increment">+</button>
    </div>
  );
}

export default Counter;
```

**Teste do componente com Jest e React Testing Library:**

```tsx
// src/components/Counter.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter Component', () => {
  test('renders with default initial value', () => {
    render(<Counter />);
    expect(screen.getByText(/counter: 0/i)).toBeInTheDocument();
  });

  test('renders with custom initial value', () => {
    render(<Counter initialValue={10} />);
    expect(screen.getByText(/counter: 10/i)).toBeInTheDocument();
  });

  test('increments counter when increment button is clicked', async () => {
    render(<Counter />);
    
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    await userEvent.click(incrementButton);
    
    expect(screen.getByText(/counter: 1/i)).toBeInTheDocument();
  });

  test('decrements counter when decrement button is clicked', async () => {
    render(<Counter initialValue={5} />);
    
    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    await userEvent.click(decrementButton);
    
    expect(screen.getByText(/counter: 4/i)).toBeInTheDocument();
  });

  test('uses custom step value', async () => {
    render(<Counter step={5} />);
    
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    await userEvent.click(incrementButton);
    
    expect(screen.getByText(/counter: 5/i)).toBeInTheDocument();
  });

  test('calls onCountChange callback when count changes', async () => {
    const handleCountChange = jest.fn();
    render(<Counter onCountChange={handleCountChange} />);
    
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    await userEvent.click(incrementButton);
    
    expect(handleCountChange).toHaveBeenCalledWith(1);
  });
});
```

**Teste do componente com Vitest:**

```tsx
// src/components/Counter.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Counter from './Counter';

describe('Counter Component', () => {
  it('renders with default initial value', () => {
    render(<Counter />);
    expect(screen.getByText(/counter: 0/i)).toBeInTheDocument();
  });

  it('renders with custom initial value', () => {
    render(<Counter initialValue={10} />);
    expect(screen.getByText(/counter: 10/i)).toBeInTheDocument();
  });

  it('increments counter when increment button is clicked', async () => {
    render(<Counter />);
    
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    await userEvent.click(incrementButton);
    
    expect(screen.getByText(/counter: 1/i)).toBeInTheDocument();
  });

  it('decrements counter when decrement button is clicked', async () => {
    render(<Counter initialValue={5} />);
    
    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    await userEvent.click(decrementButton);
    
    expect(screen.getByText(/counter: 4/i)).toBeInTheDocument();
  });

  it('uses custom step value', async () => {
    render(<Counter step={5} />);
    
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    await userEvent.click(incrementButton);
    
    expect(screen.getByText(/counter: 5/i)).toBeInTheDocument();
  });

  it('calls onCountChange callback when count changes', async () => {
    const handleCountChange = vi.fn();
    render(<Counter onCountChange={handleCountChange} />);
    
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    await userEvent.click(incrementButton);
    
    expect(handleCountChange).toHaveBeenCalledWith(1);
  });
});
```

### Testando Hooks Personalizados

Testar hooks personalizados é uma parte importante do desenvolvimento React. Com TypeScript, podemos garantir que nossos hooks sejam testados de acordo com seus tipos definidos.

**Hook personalizado:**

```tsx
// src/hooks/useCounter.ts
import { useState, useCallback } from 'react';

interface UseCounterOptions {
  initialValue?: number;
  step?: number;
  min?: number;
  max?: number;
}

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (value: number) => void;
}

function useCounter({
  initialValue = 0,
  step = 1,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER
}: UseCounterOptions = {}): UseCounterReturn {
  const [count, setCount] = useState<number>(initialValue);

  const increment = useCallback((): void => {
    setCount((prevCount) => {
      const nextCount = prevCount + step;
      return nextCount <= max ? nextCount : prevCount;
    });
  }, [step, max]);

  const decrement = useCallback((): void => {
    setCount((prevCount) => {
      const nextCount = prevCount - step;
      return nextCount >= min ? nextCount : prevCount;
    });
  }, [step, min]);

  const reset = useCallback((): void => {
    setCount(initialValue);
  }, [initialValue]);

  const setCountSafe = useCallback((value: number): void => {
    setCount(Math.min(Math.max(value, min), max));
  }, [min, max]);

  return {
    count,
    increment,
    decrement,
    reset,
    setCount: setCountSafe
  };
}

export default useCounter;
```

**Teste do hook personalizado:**

```tsx
// src/hooks/useCounter.test.tsx
import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

describe('useCounter Hook', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  test('should initialize with custom initial value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 10 }));
    expect(result.current.count).toBe(10);
  });

  test('should increment counter', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  test('should decrement counter', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5 }));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });

  test('should use custom step value', () => {
    const { result } = renderHook(() => useCounter({ step: 5 }));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(5);
  });

  test('should reset counter', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 10 }));
    
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    
    expect(result.current.count).toBe(10);
  });

  test('should respect min value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5, min: 0 }));
    
    act(() => {
      result.current.decrement();
      result.current.decrement();
      result.current.decrement();
      result.current.decrement();
      result.current.decrement();
      result.current.decrement(); // Tenta ir abaixo de 0
    });
    
    expect(result.current.count).toBe(0);
  });

  test('should respect max value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 8, max: 10 }));
    
    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment(); // Tenta ir acima de 10
    });
    
    expect(result.current.count).toBe(10);
  });

  test('should set count directly', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.setCount(15);
    });
    
    expect(result.current.count).toBe(15);
  });

  test('should respect min/max when setting count directly', () => {
    const { result } = renderHook(() => useCounter({ min: 0, max: 10 }));
    
    act(() => {
      result.current.setCount(-5); // Tenta definir abaixo do mínimo
    });
    expect(result.current.count).toBe(0);
    
    act(() => {
      result.current.setCount(15); // Tenta definir acima do máximo
    });
    expect(result.current.count).toBe(10);
  });
});
```

### Testando Funções de Utilidade

Funções de utilidade são fáceis de testar porque geralmente são funções puras que não dependem do estado do React.

**Função de utilidade:**

```tsx
// src/utils/formatters.ts

/**
 * Formata um número como moeda brasileira (BRL)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

/**
 * Formata uma data no padrão brasileiro (DD/MM/YYYY)
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(date);
}

/**
 * Trunca um texto para o tamanho máximo especificado
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Converte uma string para slug (URL amigável)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}
```

**Teste da função de utilidade:**

```tsx
// src/utils/formatters.test.ts
import { formatCurrency, formatDate, truncateText, slugify } from './formatters';

describe('Formatters', () => {
  describe('formatCurrency', () => {
    test('formats number as Brazilian currency', () => {
      expect(formatCurrency(1000)).toBe('R$ 1.000,00');
      expect(formatCurrency(1234.56)).toBe('R$ 1.234,56');
      expect(formatCurrency(0)).toBe('R$ 0,00');
    });
  });

  describe('formatDate', () => {
    test('formats date in Brazilian format', () => {
      const date = new Date(2023, 0, 15); // 15/01/2023
      expect(formatDate(date)).toBe('15/01/2023');
    });
  });

  describe('truncateText', () => {
    test('returns original text if shorter than maxLength', () => {
      expect(truncateText('Hello', 10)).toBe('Hello');
    });

    test('truncates text and adds ellipsis if longer than maxLength', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...');
    });

    test('handles empty string', () => {
      expect(truncateText('', 5)).toBe('');
    });
  });

  describe('slugify', () => {
    test('converts text to URL-friendly slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('Olá Mundo!')).toBe('ola-mundo');
      expect(slugify('React & TypeScript')).toBe('react-typescript');
      expect(slugify('  Espaços  Extras  ')).toBe('espacos-extras');
    });

    test('handles special characters and accents', () => {
      expect(slugify('Café com açúcar')).toBe('cafe-com-acucar');
      expect(slugify('Maçã & Pêra')).toBe('maca-pera');
    });
  });
});
```

### Testando Componentes com Props Complexas

Quando temos componentes com props complexas, TypeScript nos ajuda a garantir que estamos testando todos os casos corretamente.

**Componente com props complexas:**

```tsx
// src/components/UserProfile.tsx
import React from 'react';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  status: 'active' | 'inactive' | 'pending';
  address?: Address;
  avatarUrl?: string;
}

interface UserProfileProps {
  user: User;
  showAddress?: boolean;
  onStatusChange?: (userId: number, newStatus: User['status']) => void;
}

function UserProfile({ 
  user, 
  showAddress = false,
  onStatusChange
}: UserProfileProps): JSX.Element {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newStatus = e.target.value as User['status'];
    onStatusChange?.(user.id, newStatus);
  };

  return (
    <div className="user-profile">
      <div className="user-header">
        {user.avatarUrl && (
          <img 
            src={user.avatarUrl} 
            alt={`${user.name}'s avatar`} 
            className="user-avatar"
          />
        )}
        <h2>{user.name}</h2>
      </div>
      
      <div className="user-details">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        
        <div className="user-status">
          <label htmlFor="status">Status: </label>
          <select 
            id="status" 
            value={user.status} 
            onChange={handleStatusChange}
            disabled={!onStatusChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      
      {showAddress && user.address && (
        <div className="user-address">
          <h3>Address</h3>
          <p>{user.address.street}</p>
          <p>{user.address.city}, {user.address.state} {user.address.zipCode}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
```

**Teste do componente com props complexas:**

```tsx
// src/components/UserProfile.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import UserProfile, { User } from './UserProfile';

// Mock de usuário para testes
const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  status: 'active',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'ST',
    zipCode: '12345'
  },
  avatarUrl: 'https://example.com/avatar.jpg'
};

describe('UserProfile Component', () => {
  test('renders user information correctly', () => {
    render(<UserProfile user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/john@example\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/admin/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('active');
  });

  test('renders avatar when avatarUrl is provided', () => {
    render(<UserProfile user={mockUser} />);
    
    const avatar = screen.getByAltText(`${mockUser.name}'s avatar`);
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockUser.avatarUrl);
  });

  test('does not render avatar when avatarUrl is not provided', () => {
    const userWithoutAvatar = { ...mockUser, avatarUrl: undefined };
    render(<UserProfile user={userWithoutAvatar} />);
    
    expect(screen.queryByAltText(`${mockUser.name}'s avatar`)).not.toBeInTheDocument();
  });

  test('does not show address by default', () => {
    render(<UserProfile user={mockUser} />);
    
    expect(screen.queryByText('Address')).not.toBeInTheDocument();
    expect(screen.queryByText(mockUser.address!.street)).not.toBeInTheDocument();
  });

  test('shows address when showAddress prop is true', () => {
    render(<UserProfile user={mockUser} showAddress />);
    
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText(mockUser.address!.street)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.address!.city}, ${mockUser.address!.state} ${mockUser.address!.zipCode}`)).toBeInTheDocument();
  });

  test('does not show address section when address is not provided', () => {
    const userWithoutAddress = { ...mockUser, address: undefined };
    render(<UserProfile user={userWithoutAddress} showAddress />);
    
    expect(screen.queryByText('Address')).not.toBeInTheDocument();
  });

  test('calls onStatusChange when status is changed', () => {
    const handleStatusChange = jest.fn();
    render(
      <UserProfile 
        user={mockUser} 
        onStatusChange={handleStatusChange} 
      />
    );
    
    const statusSelect = screen.getByRole('combobox');
    fireEvent.change(statusSelect, { target: { value: 'inactive' } });
    
    expect(handleStatusChange).toHaveBeenCalledWith(mockUser.id, 'inactive');
  });

  test('status select is disabled when onStatusChange is not provided', () => {
    render(<UserProfile user={mockUser} />);
    
    const statusSelect = screen.getByRole('combobox');
    expect(statusSelect).toBeDisabled();
  });
});
```

### Testando Componentes com Context

Testar componentes que usam Context pode ser um pouco mais complexo, mas TypeScript nos ajuda a garantir que estamos fornecendo os valores corretos.

**Contexto:**

```tsx
// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export function ThemeProvider({ 
  children, 
  initialTheme = 'light' 
}: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const toggleTheme = (): void => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

**Componente que usa o contexto:**

```tsx
// src/components/ThemeToggle.tsx
import { useTheme } from '../contexts/ThemeContext';

function ThemeToggle(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      className={`theme-toggle ${theme}`}
    >
      Current theme: {theme}
    </button>
  );
}

export default ThemeToggle;
```

**Teste do componente com contexto:**

```tsx
// src/components/ThemeToggle.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from '../contexts/ThemeContext';

describe('ThemeToggle Component', () => {
  test('renders with default light theme', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    expect(screen.getByText(/current theme: light/i)).toBeInTheDocument();
  });

  test('renders with initial dark theme when provided', () => {
    render(
      <ThemeProvider initialTheme="dark">
        <ThemeToggle />
      </ThemeProvider>
    );
    
    expect(screen.getByText(/current theme: dark/i)).toBeInTheDocument();
  });

  test('toggles theme when clicked', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    // Inicialmente é light
    expect(screen.getByText(/current theme: light/i)).toBeInTheDocument();
    
    // Clica no botão para alternar
    fireEvent.click(screen.getByRole('button'));
    
    // Agora deve ser dark
    expect(screen.getByText(/current theme: dark/i)).toBeInTheDocument();
    
    // Clica novamente
    fireEvent.click(screen.getByRole('button'));
    
    // Volta para light
    expect(screen.getByText(/current theme: light/i)).toBeInTheDocument();
  });

  test('has correct aria-label based on current theme', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    // Inicialmente é light, então o aria-label deve indicar mudança para dark
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark theme');
    
    // Clica no botão para alternar
    fireEvent.click(screen.getByRole('button'));
    
    // Agora é dark, então o aria-label deve indicar mudança para light
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light theme');
  });

  test('applies theme class to button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    const button = screen.getByRole('button');
    
    // Inicialmente tem a classe light
    expect(button).toHaveClass('light');
    
    // Clica no botão para alternar
    fireEvent.click(button);
    
    // Agora deve ter a classe dark
    expect(button).toHaveClass('dark');
  });
});
```

### Testando Componentes Assíncronos

Testar componentes que fazem requisições assíncronas é uma parte importante do desenvolvimento React.

**Componente assíncrono:**

```tsx
// src/components/UserList.tsx
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserList(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data: User[] = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p data-testid="loading">Loading users...</p>;
  if (error) return <p data-testid="error">Error: {error}</p>;
  if (users.length === 0) return <p data-testid="no-users">No users found</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul data-testid="user-list">
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```

**Teste do componente assíncrono:**

```tsx
// src/components/UserList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';

// Mock do fetch global
global.fetch = jest.fn();

describe('UserList Component', () => {
  // Resetar mocks antes de cada teste
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('shows loading state initially', () => {
    // Mock da implementação do fetch
    (global.fetch as jest.Mock).mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: () => Promise.resolve([])
      }), 100))
    );

    render(<UserList />);
    
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('renders users when fetch is successful', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];

    // Mock da implementação do fetch
    (global.fetch as jest.Mock).mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers)
      })
    );

    render(<UserList />);
    
    // Espera o componente terminar de carregar
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
    
    // Verifica se a lista de usuários foi renderizada
    expect(screen.getByTestId('user-list')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  test('shows error message when fetch fails', async () => {
    // Mock da implementação do fetch com erro
    (global.fetch as jest.Mock).mockImplementationOnce(() => 
      Promise.resolve({
        ok: false,
        status: 500
      })
    );

    render(<UserList />);
    
    // Espera o componente terminar de carregar
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
    
    // Verifica se a mensagem de erro foi renderizada
    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByText(/failed to fetch users/i)).toBeInTheDocument();
  });

  test('shows "No users found" when fetch returns empty array', async () => {
    // Mock da implementação do fetch com array vazio
    (global.fetch as jest.Mock).mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      })
    );

    render(<UserList />);
    
    // Espera o componente terminar de carregar
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
    
    // Verifica se a mensagem de "nenhum usuário" foi renderizada
    expect(screen.getByTestId('no-users')).toBeInTheDocument();
    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });
});
```

### Melhores Práticas para Testes com TypeScript

1. **Use Tipos Explícitos:**
   - Defina interfaces claras para props, estados e retornos de funções
   - Use tipos genéricos para componentes e hooks reutilizáveis

2. **Teste Casos de Borda:**
   - Teste valores nulos, indefinidos e casos extremos
   - Verifique se a tipagem está correta em todos os cenários

3. **Mock Inteligente:**
   - Use tipos para garantir que seus mocks correspondam às interfaces reais
   - Crie factories tipadas para gerar dados de teste

4. **Teste Acessibilidade:**
   - Use `getByRole` e outros queries baseados em acessibilidade
   - Verifique atributos ARIA e comportamento do teclado

5. **Organize Testes por Comportamento:**
   - Agrupe testes relacionados com `describe`
   - Use nomes descritivos que explicam o comportamento esperado

6. **Evite Testes Frágeis:**
   - Não teste detalhes de implementação
   - Foque em testar o comportamento do componente do ponto de vista do usuário

7. **Mantenha Cobertura de Código:**
   - Use ferramentas de cobertura para identificar código não testado
   - Mire em alta cobertura, mas priorize qualidade sobre quantidade

### Conclusão

Testar aplicações React com TypeScript adiciona uma camada extra de segurança ao seu código. A combinação de testes bem escritos e tipagem estática ajuda a pegar erros mais cedo no ciclo de desenvolvimento e torna seu código mais robusto e fácil de manter.

Lembre-se de que o objetivo dos testes não é apenas verificar se o código funciona, mas também documentar o comportamento esperado e facilitar refatorações futuras. Com TypeScript, você pode ter ainda mais confiança de que suas mudanças não quebrarão funcionalidades existentes.
