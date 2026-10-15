import { useEffect, useState } from 'react';

/**
 * Returns true when the user prefers reduced motion.
 * Reactive — updates if the preference changes at runtime.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

/**
 * Returns true when the device has a fine pointer AND supports hover.
 * Used to gate custom cursor, magnetic and hover-preview effects.
 */
export function usePointerFine() {
  const [fine, setFine] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const handler = (e) => setFine(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return fine;
}
