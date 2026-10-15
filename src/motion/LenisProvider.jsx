import { createContext, useContext, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useReducedMotion } from './hooks';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      document.documentElement.style.removeProperty('scroll-behavior');
      return;
    }

    document.documentElement.style.scrollBehavior = 'auto';

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    setLenis(instance);

    const onTick = (time) => instance.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    instance.on('scroll', ScrollTrigger.update);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      gsap.ticker.remove(onTick);
      instance.destroy();
      setLenis(null);
      document.documentElement.style.removeProperty('scroll-behavior');
    };
  }, [reduced]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
