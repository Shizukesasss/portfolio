import { createContext, useContext } from 'react';

export const ACCENT_COLOR = '#E58E26';

const AccentContext = createContext({
  accent: { name: 'Amber', hex: '#E58E26', r: 229, g: 142, b: 38 },
  cycleAccent: () => {},
  toast: '',
});

export function AccentProvider({ children }) {
  // Clear any legacy dynamic accent stored in localStorage
  try {
    localStorage.removeItem('portfolio-accent');
  } catch {
    // ignore
  }

  return children;
}

export function useAccent() {
  return useContext(AccentContext);
}
