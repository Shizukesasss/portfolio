import { createContext, useContext, useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLenis } from '../motion/LenisProvider';
import { useReducedMotion } from '../motion/hooks';

const TransitionContext = createContext({
  navigateWithTransition: () => {},
  isTransitioning: false,
});

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const lenis = useLenis();
  const reduced = useReducedMotion();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayTitle, setDisplayTitle] = useState('');
  const overlayRef = useRef(null);

  const navigateWithTransition = useCallback(
    (to, title = '') => {
      if (location.pathname === to) return;

      if (reduced) {
        setIsTransitioning(true);
        setTimeout(() => {
          navigate(to);
          window.scrollTo(0, 0);
          if (lenis) lenis.scrollTo(0, { immediate: true });
          setIsTransitioning(false);
          ScrollTrigger.refresh();
        }, 150);
        return;
      }

      setIsTransitioning(true);
      setDisplayTitle(title);

      const overlay = overlayRef.current;
      if (!overlay) {
        navigate(to);
        setIsTransitioning(false);
        return;
      }

      gsap.killTweensOf(overlay);

      // Panel wipes up from bottom to cover screen (0.6s expo.inOut)
      gsap.fromTo(
        overlay,
        { yPercent: 100, display: 'flex' },
        {
          yPercent: 0,
          duration: 0.6,
          ease: 'expo.inOut',
          onComplete: () => {
            // At full cover: navigate, scroll to top immediately
            navigate(to);
            window.scrollTo(0, 0);
            if (lenis) lenis.scrollTo(0, { immediate: true });

            setTimeout(() => {
              // Move focus to h1 on route change for accessibility
              const h1 = document.querySelector('h1');
              if (h1) {
                h1.setAttribute('tabindex', '-1');
                h1.focus();
              }
              ScrollTrigger.refresh();
            }, 50);

            // Panel continues up to reveal page (0.6s expo.inOut)
            gsap.to(overlay, {
              yPercent: -100,
              duration: 0.6,
              ease: 'expo.inOut',
              onComplete: () => {
                gsap.set(overlay, { display: 'none', yPercent: 100 });
                setIsTransitioning(false);
                setDisplayTitle('');
              },
            });
          },
        }
      );
    },
    [location.pathname, navigate, lenis, reduced]
  );

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}

      {/* Full-viewport raised panel overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{ display: 'none' }}
        className="fixed inset-0 z-[9998] bg-raised border-y border-line text-bone flex items-center justify-center p-8 pointer-events-auto select-none"
      >
        <span
          className="font-sans font-bold text-bone tracking-tight text-center"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
        >
          {displayTitle}
        </span>
      </div>

      {/* Click blocker during transition */}
      {isTransitioning && <div className="fixed inset-0 z-[9997] pointer-events-auto" />}
    </TransitionContext.Provider>
  );
}

export function useTransitionNavigate() {
  const ctx = useContext(TransitionContext);
  return ctx.navigateWithTransition;
}

export function TransitionLink({ to, title, children, className = '', ...props }) {
  const transitionNavigate = useTransitionNavigate();

  const handleClick = (e) => {
    // Allow normal new tab opening
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    transitionNavigate(to, title);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
