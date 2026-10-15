import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePointerFine } from './hooks';

/**
 * Magnetic — pulls its child element toward the pointer.
 *
 * Props:
 *   strength  — pull factor 0–1 (default 0.35)
 *   radius    — activation radius in px (default 80)
 *   children  — elements to wrap
 */
export function Magnetic({ children, strength = 0.35, radius = 80, className = '' }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const rectRef = useRef(null);
  const isPointerFine = usePointerFine();

  // Cache rect — refresh on resize
  const cacheRect = useCallback(() => {
    if (wrapRef.current) {
      rectRef.current = wrapRef.current.getBoundingClientRect();
    }
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    cacheRect();
    window.addEventListener('resize', cacheRect, { passive: true });

    const el = wrapRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const onMove = (e) => {
      const rect = rectRef.current;
      if (!rect) return;

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        const factor = (1 - dist / radius) * strength;
        gsap.to(el, {
          x: dx * factor,
          y: dy * factor,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(inner, {
          x: dx * factor * 0.5,
          y: dy * factor * 0.5,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('resize', cacheRect);
      window.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(el);
      gsap.killTweensOf(inner);
    };
  }, [isPointerFine, radius, strength, cacheRect]);

  return (
    <span ref={wrapRef} className={`inline-block ${className}`}>
      <span ref={innerRef} className="inline-block">
        {children}
      </span>
    </span>
  );
}
