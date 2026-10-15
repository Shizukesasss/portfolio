import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePointerFine, useReducedMotion } from '../motion/hooks';

export function Cursor() {
  const isFine = usePointerFine();
  const reduced = useReducedMotion();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  const [cursorLabel, setCursorLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (!isFine || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let rafId = null;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Dot tracks immediately
      gsap.set(dot, { x: mouse.x, y: mouse.y });

      // Check data-cursor target
      let target = e.target;
      let label = '';
      while (target && target !== document.body) {
        if (target.dataset && target.dataset.cursor) {
          label = target.dataset.cursor;
          break;
        }
        target = target.parentElement;
      }
      setCursorLabel(label);
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Trailing ring with lerp 0.15
    const render = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.15;
      ringPos.y += (mouse.y - ringPos.y) * 0.15;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isFine, reduced, isVisible]);

  if (!isFine || reduced) return null;

  const hasLabel = Boolean(cursorLabel);
  const ringSize = hasLabel ? 68 : isPressed ? 28 : 36;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      aria-hidden="true"
    >
      {/* 10px exact dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full bg-bone mix-blend-difference pointer-events-none"
      />

      {/* Trailing ring with mix-blend-mode: difference */}
      <div
        ref={ringRef}
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          marginLeft: `-${ringSize / 2}px`,
          marginTop: `-${ringSize / 2}px`,
        }}
        className={`fixed top-0 left-0 rounded-full border border-bone mix-blend-difference pointer-events-none flex items-center justify-center transition-[width,height,margin] duration-200 ease-out ${hasLabel ? 'bg-bone text-night border-transparent' : ''
          }`}
      >
        {hasLabel && (
          <span
            ref={labelRef}
            className="font-mono text-[10px] font-bold uppercase tracking-wider text-night select-none"
          >
            {cursorLabel}
          </span>
        )}
      </div>
    </div>
  );
}
