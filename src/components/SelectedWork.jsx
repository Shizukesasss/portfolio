import { useState, useRef, useEffect, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useInView,
} from 'framer-motion';
import { CONTENT } from '../content';
import { useMotion } from '../motion/MotionContext';
import { useReducedMotion } from '../motion/hooks';
import { TransitionLink, useTransitionNavigate } from './RouteTransition';

function ProjectRow({
  project,
  index,
  activeIndex,
  setActiveIndex,
  setHoveredIndex,
  onNavigate,
}) {
  const rowRef = useRef(null);

  // Trigger active state when row crosses the vertical center of the screen (50% center band)
  const isInCenter = useInView(rowRef, {
    margin: '-45% 0px -45% 0px',
  });

  useEffect(() => {
    if (isInCenter) {
      setActiveIndex(index);
    }
  }, [isInCenter, index, setActiveIndex]);

  const isActive = activeIndex === index;

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => {
        setActiveIndex(index);
        setHoveredIndex(index);
      }}
      onMouseLeave={() => setHoveredIndex(null)}
      onClick={() => onNavigate(project.slug, project.title)}
      className="group relative border-b border-white/10 py-14 md:py-20 pl-6 md:pl-8 pr-4 cursor-pointer transition-colors"
    >
      {/* Smooth Gliding Orange Active Bar (#E58E26) */}
      {isActive && (
        <motion.div
          layoutId="activeOrangeBar"
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#E58E26] shadow-[0_0_12px_rgba(229,142,38,0.8)]"
        />
      )}

      <motion.div
        animate={{
          opacity: isActive ? 1 : 0.35,
          x: isActive ? 8 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col justify-between gap-6"
      >
        {/* Top Row: Number + Year / Category */}
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-400">
          <span>#{project.id}</span>
          <span>
            {project.category} · {project.year}
          </span>
        </div>

        {/* Big Display Title */}
        <h3 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white group-hover:text-white transition-colors">
          {project.title}
        </h3>

        {/* Bottom Row: Description + VIEW PROJECT link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
          <p className="text-sm text-neutral-300/90 max-w-lg leading-relaxed">
            {project.description}
          </p>

          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white group-hover:text-[#E58E26] transition-colors shrink-0">
            <span>VIEW PROJECT</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              ↗
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { paused: globalPaused, togglePaused } = useMotion();
  const reduced = useReducedMotion();
  const transitionNavigate = useTransitionNavigate();

  const [motionPaused, setMotionPaused] = useState(() => globalPaused || reduced);

  useEffect(() => {
    if (globalPaused || reduced) {
      setMotionPaused(true);
    }
  }, [globalPaused, reduced]);

  const handleToggleMotion = () => {
    setMotionPaused((prev) => {
      const next = !prev;
      if (next === globalPaused) {
        togglePaused();
      }
      return next;
    });
  };

  // Map all projects from CONTENT
  const projects = useMemo(() => {
    return CONTENT.projects.map((p, i) => ({
      id: String(i + 1).padStart(2, '0'),
      title: p.title,
      category: p.category,
      year: p.year,
      description: p.result,
      image: p.cover || p.image,
      slug: p.slug,
      stack: p.stack,
    }));
  }, []);

  const activeProject = projects[activeIndex] || projects[0];

  // Smooth spring physics for the floating cursor preview card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 220, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 28, mass: 0.5 });

  const handleMouseMove = (e) => {
    // Center the 300px floating card near cursor
    mouseX.set(e.clientX - 150);
    mouseY.set(e.clientY - 190);
  };

  const isHoveringRow = hoveredIndex !== null && !motionPaused && !reduced;

  const yearRange = useMemo(() => {
    const years = projects.map((p) => parseInt(p.year, 10)).filter((y) => !isNaN(y));
    if (years.length === 0) return 'Recent';
    const min = Math.min(...years);
    const max = Math.max(...years);
    return min === max ? `${min}` : `${min} — ${max}`;
  }, [projects]);

  const handleNavigate = (slug, title) => {
    transitionNavigate(`/work/${slug}`, title);
  };

  return (
    <section
      id="work"
      onMouseMove={handleMouseMove}
      className="relative bg-[#0e0d0c] text-[#f3f2ef] py-20 px-6 md:px-14 lg:px-20 select-none border-t border-white/10"
    >
      {/* Top Section Header Bar */}
      <div className="max-w-7xl mx-auto pb-8 border-b border-white/10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
            PORTFOLIO ({yearRange})
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Selected work{' '}
            <span className="font-mono font-normal text-neutral-500 text-2xl md:text-4xl">
              (0{projects.length})
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider">
          <button
            type="button"
            onClick={handleToggleMotion}
            className="text-neutral-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-3.5 py-1.5 rounded-full"
          >
            [ {motionPaused ? 'RESUME MOTION' : 'PAUSE MOTION'} ]
          </button>
          <TransitionLink
            to="/work"
            title="All Work"
            className="text-neutral-400 hover:text-white transition-colors hidden sm:inline"
          >
            All work →
          </TransitionLink>
        </div>
      </div>

      {/* Main Split-Screen Container (Natural Scroll Left + Sticky Right) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-6">
        {/* LEFT COLUMN: Natural Scrolling Project List (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              setHoveredIndex={setHoveredIndex}
              onNavigate={handleNavigate}
            />
          ))}
        </div>

        {/* RIGHT COLUMN: Sticky Preview Box + Progress Bar (5 cols) */}
        <div className="hidden lg:flex lg:col-span-5 sticky top-28 flex-col pt-6">
          <div
            tabIndex={0}
            role="button"
            aria-label={`View ${activeProject.title} project`}
            onClick={() => handleNavigate(activeProject.slug, activeProject.title)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavigate(activeProject.slug, activeProject.title);
              }
            }}
            className="relative aspect-[4/4.5] w-full rounded-2xl border border-white/10 bg-[#121211] overflow-hidden cursor-pointer shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E58E26]"
          >
            {/* Giant Muted Wireframe Number (Visible when hovering left row) */}
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
              <span className="font-sans text-[120px] font-extrabold tracking-tighter text-white/10">
                {activeProject.id}
              </span>
            </div>

            {/* Sticky Preview Image with Vertical Clip-Path Reveal (Hides when cursor-floating card pops out) */}
            <AnimatePresence mode="wait">
              {!isHoveringRow && (
                <motion.div
                  key={activeProject.id}
                  initial={{
                    opacity: 0,
                    scale: 1.05,
                    clipPath: 'inset(100% 0% 0% 0%)',
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    clipPath: 'inset(0% 0% 0% 0%)',
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.98,
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-10 overflow-hidden"
                >
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-5 left-5 z-20 pointer-events-none">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white/90 bg-black/60 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                      {activeProject.category} · {activeProject.year}
                    </span>
                  </div>

                  {/* Inner Card Bottom HUD */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4">
                    <span className="text-xl font-semibold text-white drop-shadow-md">
                      {activeProject.title}
                    </span>
                    <span className="rounded-full border border-white/20 bg-black/60 backdrop-blur-md px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white hover:border-[#E58E26] transition-colors shrink-0">
                      VIEW PROJECT ↗
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Progress Line & Metadata (01 / 04) */}
          <div className="mt-6">
            {/* Progress Track */}
            <div className="h-[2px] w-full bg-white/15 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#E58E26]"
                animate={{
                  width: `${((activeIndex + 1) / projects.length) * 100}%`,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-400 mt-3.5">
              <span className="font-medium text-white/80">
                ({activeProject.id} / 0{projects.length})
              </span>
              <span className="text-neutral-400">
                {activeProject.category.toUpperCase()} — {activeProject.year}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING CURSOR PREVIEW CARD (Pops out on left row hover like in Michael Wilcock's site) */}
      <AnimatePresence>
        {isHoveringRow && hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              x: springX,
              y: springY,
            }}
            className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:block w-[300px] h-[380px] rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-[#161615] will-change-transform"
          >
            <img
              src={projects[hoveredIndex].image}
              alt={projects[hoveredIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-white drop-shadow">
                {projects[hoveredIndex].title}
              </span>
              <span className="font-mono text-[10px] uppercase bg-[#E58E26] text-black font-semibold px-2 py-0.5 rounded shadow">
                {projects[hoveredIndex].category}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
