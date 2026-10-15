import { useEffect } from 'react';
import { CONTENT } from '../content';
import { TransitionLink } from '../components/RouteTransition';
import { Magnetic } from '../motion/Magnetic';

export default function NotFound() {
  useEffect(() => {
    document.title = `404 — ${CONTENT.profile.name}`;
  }, []);

  return (
    <main id="main-content" className="pt-32 min-h-[70vh] flex flex-col items-center justify-center px-6 text-center select-none">
      <span className="font-mono text-xs uppercase tracking-widest text-stone mb-4">
        Error 404
      </span>
      <h1 className="font-sans font-extrabold text-bone text-4xl sm:text-6xl mb-6 tracking-tight">
        Page not found
      </h1>
      <p className="font-sans text-smoke text-base max-w-md mb-10 leading-relaxed">
        The link you followed may be broken or the page may have been removed.
      </p>
      <Magnetic strength={0.35} radius={60}>
        <TransitionLink
          to="/"
          title="Home"
          className="inline-block px-8 py-3.5 bg-bone text-night font-sans font-semibold text-sm rounded-full hover:bg-amber transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
        >
          ← Return home
        </TransitionLink>
      </Magnetic>
    </main>
  );
}
