import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useReducedMotion } from './hooks';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal — fade + rise on scroll.
 * Wraps children in a div and animates opacity + y when scrolled into view.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.8,
  once = true,
  className = '',
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    const el = ref.current;
    gsap.set(el, { opacity: 0, y });

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'expo.out',
        });
      },
      onLeaveBack: once
        ? undefined
        : () => gsap.set(el, { opacity: 0, y }),
      once,
    });

    return () => {
      st.kill();
      gsap.killTweensOf(el);
    };
  }, [reduced, delay, y, duration, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
