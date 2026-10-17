import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONTENT } from '../content';
import { useReducedMotion } from '../motion/hooks';
import { useLenis } from '../motion/LenisProvider';
import { Magnetic } from '../motion/Magnetic';
import { MenuOverlay } from './MenuOverlay';
import { Logo } from './Logo';

const NAV_ITEMS = [
  { label: 'Work', to: '/work', isHash: false },
  { label: 'About', to: '/#about', isHash: true },
  { label: 'Contact', to: '/contact', isHash: false },
];

export function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const lastScrollY = useRef(0);
  const reduced = useReducedMotion();
  const lenis = useLenis();

  // Scroll hide/show & logo progress update
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      if (!reduced) {
        setHidden(y > lastScrollY.current && y > 100);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;

      // Update --progress variable on root for logo gradient fill
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressPercent = docHeight > 0 ? Math.min(100, Math.max(0, (y / docHeight) * 100)) : 0;
      document.documentElement.style.setProperty('--progress', `${progressPercent.toFixed(1)}%`);

      // Detect active hash section on home page
      if (location.pathname === '/') {
        const aboutEl = document.getElementById('about');
        if (aboutEl) {
          const rect = aboutEl.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 100) {
            setActiveHash('#about');
          } else {
            setActiveHash('');
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced, location.pathname]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Handle smooth anchor scroll
  const handleNavClick = (e, item) => {
    if (item.isHash) {
      if (location.pathname === '/') {
        e.preventDefault();
        const target = document.getElementById('about');
        if (target) {
          if (lenis) {
            lenis.scrollTo(target, { offset: -80 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  };

  return (
    <>
      {/* Accessibility skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-amber focus:text-night focus:font-mono focus:text-sm focus:rounded"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-night/85 backdrop-blur-md border-b border-line shadow-sm' : 'bg-transparent border-b border-transparent'
        } ${hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Wordmark with EP logo & scroll-driven gradient fill */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-sans font-bold text-lg tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm group select-none"
            aria-label={`${CONTENT.profile.name} — Home`}
          >
            <Logo className="w-7 h-7" />
            <span
              style={{
                background: 'linear-gradient(to right, #EDE8DB var(--progress, 0%), #5A5446 var(--progress, 0%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              className="transition-colors duration-150 inline-block font-sans font-bold"
            >
              {CONTENT.profile.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const isCurrent =
                  (item.to === '/work' && location.pathname.startsWith('/work')) ||
                  (item.to === '/contact' && location.pathname === '/contact') ||
                  (item.isHash && activeHash === '#about');

                return (
                  <li key={item.label} className="relative flex items-center">
                    <Link
                      to={item.to}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`text-sm font-medium transition-colors hover:text-bone focus:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm flex items-center gap-1.5 ${
                        isCurrent ? 'text-bone' : 'text-smoke'
                      }`}
                    >
                      {/* Active-section dot */}
                      {isCurrent && (
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-amber inline-block animate-pulse"
                          aria-hidden="true"
                        />
                      )}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
              {CONTENT.profile.resume && (
                <li>
                  <a
                    href={CONTENT.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-wider text-smoke hover:text-bone px-3 py-1.5 border border-line rounded-full hover:border-amber transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                  >
                    Resume ↗
                  </a>
                </li>
              )}
            </ul>
          </nav>

          {/* Mobile Menu Button with Magnetic wrapper */}
          <div className="md:hidden">
            <Magnetic strength={0.3} radius={50}>
              <button
                type="button"
                className="font-mono text-xs uppercase tracking-wider text-smoke hover:text-bone px-3 py-1.5 border border-line rounded-full hover:border-stone transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMenuOpen((o) => !o)}
              >
                {menuOpen ? 'Close' : 'Menu'}
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
