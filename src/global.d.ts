// ===============================
// Suporte para arquivos Markdown
// ===============================
declare module '*.md' {
  const content: string;
  export default content;
}
// ===============================
// Suporte para CSS, SCSS e similares
// ===============================
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';
declare module '*.styl';

// ===============================
// Suporte para imagens
// ===============================
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.webp';

// ===============================
// Suporte para SVG
// ===============================
// Caso queira SVG como componente React:
declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export { ReactComponent };
  const src: string;
  export default src;
}

// ===============================
// Suporte para fontes
// ===============================
declare module '*.woff';
declare module '*.woff2';
declare module '*.eot';
declare module '*.ttf';
declare module '*.otf';

// ===============================
// JSON como módulo
// ===============================
declare module '*.json' {
  const value: any;
  export default value;
}

// ===============================
// Fallback para libs sem @types
// ===============================
declare module '*';
