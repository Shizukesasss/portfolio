import { CONTENT } from '../content';
import { useLenis } from '../motion/LenisProvider';
import { Magnetic } from '../motion/Magnetic';

export function Footer() {
  const lenis = useLenis();

  const handleBackToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-line py-12 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-stone text-xs font-mono select-none">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
        <span>© {new Date().getFullYear()} {CONTENT.profile.name}</span>
        <span className="hidden sm:inline" aria-hidden="true">/</span>
        <span>All rights reserved</span>
      </div>

      <div className="flex items-center gap-6">
        <a
          href={CONTENT.profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-smoke hover:text-bone transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-amber rounded-sm"
        >
          GitHub
        </a>
        <a
          href={CONTENT.profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-smoke hover:text-bone transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-amber rounded-sm"
        >
          LinkedIn
        </a>
        <Magnetic strength={0.4} radius={60}>
          <button
            type="button"
            onClick={handleBackToTop}
            className="text-smoke hover:text-amber transition-colors px-3 py-1.5 border border-line rounded-full hover:border-stone focus:outline-none focus-visible:ring-1 focus-visible:ring-amber"
            aria-label="Back to top"
          >
            Back to top ↑
          </button>
        </Magnetic>
      </div>
    </footer>
  );
}
