import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { CONTENT } from '../content';
import { useLenis } from '../motion/LenisProvider';
import { useReducedMotion } from '../motion/hooks';

export function MenuOverlay({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const footerRef = useRef(null);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  // Stop/start Lenis when menu opens/closes
  useEffect(() => {
    if (isOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    }
    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    };
  }, [isOpen, lenis]);

  // Trap focus and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = overlayRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Entrance and exit animations
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isOpen) {
      if (reduced) {
        gsap.set(overlay, { display: 'flex', opacity: 1, clipPath: 'none' });
        return;
      }

      gsap.killTweensOf([overlay, linksRef.current, footerRef.current]);
      gsap.set(overlay, {
        display: 'flex',
        clipPath: 'inset(0 0 100% 100%)',
      });
      gsap.set(linksRef.current, { y: 60, opacity: 0 });
      gsap.set(footerRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline();
      tl.to(overlay, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.8,
        ease: 'expo.inOut',
      });

      tl.to(
        linksRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.07,
          ease: 'expo.out',
        },
        '-=0.4'
      );

      tl.to(
        footerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    } else {
      if (reduced) {
        gsap.set(overlay, { display: 'none', opacity: 0 });
        return;
      }

      gsap.to(overlay, {
        clipPath: 'inset(0 0 100% 100%)',
        duration: 0.6,
        ease: 'expo.inOut',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
        },
      });
    }
  }, [isOpen, reduced]);

  const navLinks = [
    { num: '01', label: 'Home', to: '/' },
    { num: '02', label: 'Work', to: '/work' },
    { num: '03', label: 'About', to: '/#about' },
    { num: '04', label: 'Contact', to: '/contact' },
  ];

  return (
    <aside
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      style={{ display: 'none' }}
      className="fixed inset-0 z-40 bg-raised text-bone flex-col justify-between p-8 md:p-16 select-none"
    >
      <div className="pt-20 flex-1 flex flex-col justify-center">
        <nav aria-label="Mobile menu links">
          <ul className="flex flex-col gap-6 md:gap-8">
            {navLinks.map((item, index) => (
              <li key={item.to} className="overflow-hidden">
                <div
                  ref={(el) => {
                    linksRef.current[index] = el;
                  }}
                >
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className="group inline-flex items-baseline gap-4 font-sans font-bold text-bone hover:text-amber transition-colors"
                    style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
                  >
                    <span className="font-mono text-xs md:text-sm text-stone group-hover:text-amber transition-colors">
                      {item.num}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div
        ref={footerRef}
        className="border-t border-line pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-smoke"
      >
        <a
          href={`mailto:${CONTENT.profile.email}`}
          className="hover:text-bone transition-colors"
        >
          {CONTENT.profile.email}
        </a>
        <span className="text-stone">{CONTENT.profile.city}</span>
        <div className="flex gap-4">
          <a
            href={CONTENT.profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-bone transition-colors"
          >
            GitHub
          </a>
          <a
            href={CONTENT.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-bone transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </aside>
  );
}
