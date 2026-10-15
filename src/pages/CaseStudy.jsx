import { useEffect, useRef, useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CONTENT } from '../content';
import { Reveal } from '../motion/Reveal';
import { Magnetic } from '../motion/Magnetic';
import { TransitionLink } from '../components/RouteTransition';
import { useReducedMotion } from '../motion/hooks';

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudy() {
  const { slug } = useParams();
  const project = useMemo(() => CONTENT.projects.find((p) => p.slug === slug), [slug]);
  const reduced = useReducedMotion();

  const heroImgRef = useRef(null);
  const heroContainerRef = useRef(null);
  const nextCoverRef = useRef(null);
  const [nextHovered, setNextHovered] = useState(false);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — ${CONTENT.profile.name}`;
      window.scrollTo(0, 0);
    }
  }, [project]);

  // Hero clip-path reveal & parallax (±8%)
  useEffect(() => {
    if (reduced || !project || !heroImgRef.current || !heroContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance reveal: clip-path wipe
      gsap.fromTo(
        heroContainerRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'expo.inOut',
          delay: 0.1,
        }
      );

      // Parallax ±8%
      gsap.to(heroImgRef.current, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [reduced, project]);

  if (!project) return <Navigate to="/404" replace />;

  const { caseStudy: cs } = project;
  const projectIndex = CONTENT.projects.indexOf(project);
  const nextProject = CONTENT.projects[(projectIndex + 1) % CONTENT.projects.length];

  // Prepare gallery items into alternating full-width and 2-up rows
  const gallery = cs.gallery || [];
  const galleryRows = [];
  let gi = 0;
  let isFull = true;
  while (gi < gallery.length) {
    if (isFull) {
      galleryRows.push({ type: 'full', images: [gallery[gi]] });
      gi += 1;
      isFull = false;
    } else {
      if (gi + 1 < gallery.length) {
        galleryRows.push({ type: 'pair', images: [gallery[gi], gallery[gi + 1]] });
        gi += 2;
      } else {
        galleryRows.push({ type: 'full', images: [gallery[gi]] });
        gi += 1;
      }
      isFull = true;
    }
  }

  return (
    <main id="main-content" className="pt-28 min-h-screen">
      {/* Title & Meta Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <Reveal>
          <TransitionLink
            to="/work"
            title="All Work"
            className="font-mono text-stone hover:text-amber text-xs uppercase tracking-wider transition-colors mb-8 inline-flex items-center gap-2"
          >
            ← Back to all work
          </TransitionLink>
        </Reveal>

        <Reveal delay={0.05}>
          <h1
            className="font-sans font-extrabold text-bone tracking-tight leading-none mb-8"
            style={{ fontSize: 'clamp(2.75rem, 7.5vw, 6.5rem)' }}
          >
            {project.title}
          </h1>
        </Reveal>

        {/* Mono meta row: Year, Role, Category, Stack */}
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs text-stone border-t border-line pt-8">
            <div>
              <span className="block text-smoke/50 uppercase tracking-widest text-[10px] mb-1">Year</span>
              <span className="text-bone">{project.year}</span>
            </div>
            <div>
              <span className="block text-smoke/50 uppercase tracking-widest text-[10px] mb-1">Role</span>
              <span className="text-bone">{project.role}</span>
            </div>
            <div>
              <span className="block text-smoke/50 uppercase tracking-widest text-[10px] mb-1">Category</span>
              <span className="text-bone">{project.category}</span>
            </div>
            <div>
              <span className="block text-smoke/50 uppercase tracking-widest text-[10px] mb-1">Stack</span>
              <span className="text-bone">{project.stack.join(', ')}</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Full-bleed 16:9 Hero with Clip-path reveal and Parallax */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div
          ref={heroContainerRef}
          className="relative aspect-video w-full rounded-2xl overflow-hidden bg-raised shadow-2xl border border-line"
        >
          <img
            ref={heroImgRef}
            src={project.hero || project.image}
            alt={project.imageAlt || project.title}
            className="w-full h-[116%] -top-[8%] object-cover relative"
          />
        </div>
      </div>

      {/* Overview */}
      <section className="max-w-4xl mx-auto px-6 mb-28">
        <Reveal>
          <span className="font-mono text-stone text-xs tracking-widest uppercase block mb-3">
            Overview
          </span>
          <p
            className="font-sans font-medium text-bone leading-relaxed"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}
          >
            {cs.overview}
          </p>
        </Reveal>
      </section>

      {/* Challenge / Outcome Two-Column */}
      <section className="max-w-7xl mx-auto px-6 mb-28">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 border-t border-line pt-14">
          <Reveal>
            <div>
              <span className="font-mono text-stone text-xs tracking-widest uppercase block mb-3">
                01 / The Challenge
              </span>
              <h2 className="font-sans font-bold text-bone text-2xl mb-4">
                Friction & Complexity
              </h2>
              <p className="font-sans text-smoke text-base leading-relaxed">
                {cs.challenge}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <span className="font-mono text-stone text-xs tracking-widest uppercase block mb-3">
                02 / The Outcome
              </span>
              <h2 className="font-sans font-bold text-bone text-2xl mb-4">
                Precision & Impact
              </h2>
              <p className="font-sans text-smoke text-base leading-relaxed">
                {cs.outcome}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery: Alternating Full-width and 2-up rows */}
      <section className="max-w-7xl mx-auto px-6 mb-28">
        <Reveal>
          <span className="font-mono text-stone text-xs tracking-widest uppercase block mb-10">
            Selected Screens & Artifacts
          </span>
        </Reveal>

        <div className="flex flex-col gap-10">
          {galleryRows.map((row, rIdx) => {
            if (row.type === 'full') {
              return (
                <Reveal key={rIdx} delay={0.05}>
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-raised border border-line group">
                    <img
                      src={row.images[0]}
                      alt={`${project.title} gallery item`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </Reveal>
              );
            } else {
              return (
                <div key={rIdx} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {row.images.map((img, iIdx) => (
                    <Reveal key={iIdx} delay={iIdx * 0.08}>
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-raised border border-line group">
                        <img
                          src={img}
                          alt={`${project.title} screen ${iIdx + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </Reveal>
                  ))}
                </div>
              );
            }
          })}
        </div>
      </section>

      {/* Magnetic Live Site & Repo Buttons */}
      <section className="max-w-7xl mx-auto px-6 mb-32 flex flex-wrap gap-4 items-center">
        <Magnetic strength={0.35} radius={70}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-bone text-night font-sans font-semibold text-sm rounded-full hover:bg-amber transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
          >
            Open live site ↗
          </a>
        </Magnetic>

        <Magnetic strength={0.35} radius={70}>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 border border-line text-bone font-sans font-semibold text-sm rounded-full hover:border-stone transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
          >
            View source code ↗
          </a>
        </Magnetic>
      </section>

      {/* Next Project Teaser with Hover Backdrop Cover */}
      <section className="relative border-t border-line overflow-hidden bg-night">
        {/* Next project cover backdrop that fades in on hover */}
        <div
          ref={nextCoverRef}
          className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-700 pointer-events-none opacity-0 ${
            nextHovered ? '!opacity-30' : ''
          }`}
          style={{
            backgroundImage: `url(${nextProject.cover || nextProject.image})`,
          }}
          aria-hidden="true"
        />

        <TransitionLink
          to={`/work/${nextProject.slug}`}
          title={nextProject.title}
          onMouseEnter={() => setNextHovered(true)}
          onMouseLeave={() => setNextHovered(false)}
          onFocus={() => setNextHovered(true)}
          onBlur={() => setNextHovered(false)}
          className="relative z-10 block px-6 py-28 max-w-7xl mx-auto group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
        >
          <span className="font-mono text-stone text-xs tracking-widest uppercase block mb-4 group-hover:text-amber transition-colors">
            (Next Project)
          </span>
          <h2
            className="font-sans font-extrabold text-bone group-hover:text-amber transition-colors tracking-tight leading-none"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
          >
            {nextProject.title} →
          </h2>
        </TransitionLink>
      </section>
    </main>
  );
}
