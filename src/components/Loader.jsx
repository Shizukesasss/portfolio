import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONTENT } from '../content';
import { useLenis } from '../motion/LenisProvider';
import { useReducedMotion } from '../motion/hooks';

export function Loader({ onHeroEnter, onComplete }) {
  const [active, setActive] = useState(() => {
    try {
      return !sessionStorage.getItem('portfolio-loader-seen');
    } catch {
      return true;
    }
  });

  const [count, setCount] = useState(0);
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const counterRef = useRef(null);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !active) {
      if (onHeroEnter) onHeroEnter();
      if (onComplete) onComplete();
      return;
    }

    // Stop Lenis while loader runs
    if (lenis) lenis.stop();

    const counterObj = { val: 0 };
    let fontReady = false;
    let timerFinished = false;
    let exitTriggered = false;

    // Safety timeout to cap wait at 3s
    const maxTimeout = setTimeout(() => {
      fontReady = true;
      tryTriggerExit();
    }, 3000);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        fontReady = true;
        tryTriggerExit();
      });
    } else {
      fontReady = true;
    }

    const tryTriggerExit = () => {
      if (fontReady && timerFinished && !exitTriggered) {
        exitTriggered = true;
        clearTimeout(maxTimeout);
        runExit();
      }
    };

    // 000 -> 100 counter over ~1.8s
    const counterTween = gsap.to(counterObj, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.round(counterObj.val));
      },
      onComplete: () => {
        timerFinished = true;
        tryTriggerExit();
      },
    });

    const runExit = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem('portfolio-loader-seen', 'true');
          } catch {
            // ignore
          }
          if (lenis) lenis.start();
          setActive(false);
          if (onComplete) onComplete();
        },
      });

      // Text & counter slide up
      tl.to([textRef.current, counterRef.current], {
        y: -30,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      });

      // Overlay lifts away yPercent: -100 over 0.9s expo.inOut
      tl.to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.9,
          ease: 'expo.inOut',
        },
        '-=0.1'
      );

      // Hero entrance starts ~0.3s before overlay finishes lifting
      tl.call(() => {
        if (onHeroEnter) onHeroEnter();
      }, null, '-=0.3');
    };

    return () => {
      clearTimeout(maxTimeout);
      counterTween.kill();
      if (lenis) lenis.start();
    };
  }, [active, reduced, lenis, onHeroEnter, onComplete]);

  if (!active || reduced) return null;

  return (
    <aside
      ref={overlayRef}
      aria-label="Loading screen"
      aria-live="polite"
      className="fixed inset-0 z-[9990] bg-night flex flex-col justify-between p-8 md:p-16 select-none"
    >
      <div className="flex justify-between items-start">
        <span className="font-mono text-xs text-stone tracking-widest uppercase">
          {CONTENT.profile.name}
        </span>
        <span className="font-mono text-xs text-stone tracking-widest uppercase">
          {CONTENT.profile.role}
        </span>
      </div>

      <div ref={textRef} className="my-auto max-w-xl">
        <p className="font-sans text-stone text-sm mb-2">Welcome</p>
        <h2 className="font-sans text-bone text-2xl md:text-3xl font-semibold tracking-tight">
          Crafting thoughtful digital experiences.
        </h2>
      </div>

      <div className="flex justify-between items-end border-t border-line pt-6">
        <span className="font-mono text-xs text-stone tracking-wider">
          Initializing experience
        </span>
        <div ref={counterRef} className="font-mono text-3xl md:text-5xl font-light text-bone tracking-tighter">
          {String(count).padStart(3, '0')}
        </div>
      </div>
    </aside>
  );
}
