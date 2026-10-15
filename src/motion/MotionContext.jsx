import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * Global motion pause context.
 * Components that should stop ambient loops (marquee, auto-wave) read `paused`.
 * The toggle button sets `setPaused`.
 * Persists to localStorage under 'motion-paused'.
 */
const MotionContext = createContext({ paused: false, togglePaused: () => {} });

export function MotionProvider({ children }) {
  const [paused, setPaused] = useState(() => {
    try {
      return localStorage.getItem('motion-paused') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('motion-paused', String(paused));
    } catch {
      // ignore
    }
  }, [paused]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPaused(true);
    }
  }, []);

  const togglePaused = useCallback(() => setPaused((p) => !p), []);

  return (
    <MotionContext.Provider value={{ paused, togglePaused }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  return useContext(MotionContext);
}
