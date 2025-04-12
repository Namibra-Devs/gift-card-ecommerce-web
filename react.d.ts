// src/react.d.ts
import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    section?: boolean;
    // Add other missing attributes
  }
  
  // Fix for useContext children
  interface ProviderProps<T> {
    value: T;
    children?: ReactNode;
  }
}