import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONTENT } from '../content';
import { Reveal } from '../motion/Reveal';
import { TransitionLink } from '../components/RouteTransition';
import { usePointerFine, useReducedMotion } from '../motion/hooks';

export default function Work() {
  const isFine = usePointerFine();
  const reduced = useReducedMotion();

  // Remember view mode in sessionStorage ('list' | 'grid')
  const [viewMode, setViewMode] = useState(() => {
    try {
      return sessionStorage.getItem('portfolio-work-view') || 'list';
    } catch {
      return 'list';
    }
  });

  const [hoveredProject, setHoveredProject] = useState(null);

  // Floating preview refs
  const previewRef = useRef(null);
  const mousePos = useRef({ x: -500, y: -500 });
  const previewPos = useRef({ x: -500, y: -500 });
  const velocityRef = useRef(0);
  const lastMouseX = useRef(0);

  useEffect(() => {
    document.title = `Work — ${CONTENT.profile.name}`;
  }, []);

  const handleToggleView = (mode) => {
    setViewMode(mode);
    try {
      sessionStorage.setItem('portfolio-work-view', mode);
    } catch {
      // ignore
    }
  };

  // Hover preview cursor following with tilt ±6° & lerp 0.12 (fine pointers only)
  useEffect(() => {
    if (!isFine || reduced) return;

    let rafId = null;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      const deltaX = e.clientX - lastMouseX.current;
      lastMouseX.current = e.clientX;
      velocityRef.current = deltaX;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const loop = () => {
      const el = previewRef.current;
      if (el) {
        // Lerp 0.12
        previewPos.current.x += (mousePos.current.x - previewPos.current.x) * 0.12;
        previewPos.current.y += (mousePos.current.y - previewPos.current.y) * 0.12;

        // Damp velocity tilt: clamp between -6 and +6 degrees
        const tilt = Math.max(-6, Math.min(6, velocityRef.current * 0.5));
        velocityRef.current *= 0.85; // decay velocity

        gsap.set(el, {
          x: previewPos.current.x + 24,
          y: previewPos.current.y - 150,
          rotation: tilt,
        });
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isFine, reduced]);

  // Floating preview show/hide tween
  useEffect(() => {
    if (!isFine || reduced || !previewRef.current) return;
    const el = previewRef.current;

    if (hoveredProject) {
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    } else {
      gsap.to(el, {
        opacity: 0,
        scale: 0.85,
        duration: 0.25,
        ease: 'power2.in',
        overwrite: 'auto',
      });
    }
  }, [hoveredProject, isFine, reduced]);

  return (
    <main id="main-content" className="pt-32 pb-24 min-h-screen px-6 max-w-7xl mx-auto">
      {/* Kinetic H1 & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
        <div>
          <span className="font-mono text-stone text-xs tracking-widest uppercase block mb-3">
            Index
          </span>
          <h1
            className="font-sans font-extrabold text-bone tracking-tight leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            All Work
          </h1>
        </div>

        {/* List | Grid Toggle */}
        <div className="flex items-center gap-1 p-1 bg-raised border border-line rounded-full w-fit">
          <button
            type="button"
            onClick={() => handleToggleView('list')}
            className={`font-mono text-xs px-4 py-1.5 rounded-full transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-amber ${viewMode === 'list'
                ? 'bg-amber text-night font-bold shadow-sm'
                : 'text-smoke hover:text-bone'
              }`}
          >
            List
          </button>
          <button
            type="button"
            onClick={() => handleToggleView('grid')}
            className={`font-mono text-xs px-4 py-1.5 rounded-full transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-amber ${viewMode === 'grid'
                ? 'bg-amber text-night font-bold shadow-sm'
                : 'text-smoke hover:text-bone'
              }`}
          >
            Grid
          </button>
        </div>
      </div>

      {/* Floating 4:5 Cursor Preview (fine pointers only) */}
      {isFine && !reduced && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className="fixed top-0 left-0 w-60 h-72 rounded-xl overflow-hidden pointer-events-none z-50 shadow-2xl border border-line bg-raised opacity-0 will-change-transform"
        >
          {hoveredProject && (
            <img
              src={hoveredProject.cover || hoveredProject.image}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="flex flex-col border-t border-line transition-opacity duration-300">
          {CONTENT.projects.map((project, i) => {
            const isHovered = hoveredProject?.id === project.id;
            const isOtherHovered = hoveredProject !== null && !isHovered;

            return (
              <Reveal key={project.id} delay={i * 0.05}>
                <TransitionLink
                  to={`/work/${project.slug}`}
                  title={project.title}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onFocus={() => setHoveredProject(project)}
                  onBlur={() => setHoveredProject(null)}
                  className={`group flex flex-col md:flex-row items-baseline gap-4 md:gap-12 py-8 border-b border-line transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber ${isOtherHovered && isFine ? 'opacity-40' : 'opacity-100'
                    }`}
                >
                  <span className="font-mono text-stone text-xs tracking-wider w-8 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Inline thumbnail for touch devices */}
                  {!isFine && (
                    <div className="w-full md:hidden aspect-[16/9] rounded-lg overflow-hidden bg-night mb-2">
                      <img
                        src={project.cover || project.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <h2 className="font-sans font-bold text-bone text-2xl md:text-3xl group-hover:text-amber transition-colors">
                      {project.title}
                    </h2>
                    <p className="font-sans text-xs text-smoke mt-2 line-clamp-1 max-w-2xl">
                      {project.result}
                    </p>
                  </div>

                  <span className="font-mono text-xs text-stone uppercase tracking-wider">
                    {project.category}
                  </span>

                  <span className="font-mono text-xs text-stone">
                    {project.year}
                  </span>
                </TransitionLink>
              </Reveal>
            );
          })}
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 transition-opacity duration-300">
          {CONTENT.projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.06}>
              <TransitionLink
                to={`/work/${project.slug}`}
                title={project.title}
                className="group block rounded-2xl overflow-hidden bg-raised border border-line focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
              >
                <div className="aspect-[4/5] overflow-hidden bg-night relative">
                  <img
                    src={project.cover || project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-night/80 backdrop-blur-sm px-3 py-1 rounded-full border border-line font-mono text-xs text-stone">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <h2 className="font-sans font-bold text-bone text-2xl group-hover:text-amber transition-colors">
                      {project.title}
                    </h2>
                    <span className="font-mono text-xs text-stone">{project.year}</span>
                  </div>
                  <p className="font-sans text-xs text-smoke line-clamp-2 mb-4 leading-relaxed">
                    {project.result}
                  </p>
                  <div className="flex items-center justify-between border-t border-line/60 pt-4 font-mono text-xs">
                    <span className="text-stone">{project.category}</span>
                    <span className="text-amber">View study →</span>
                  </div>
                </div>
              </TransitionLink>
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
