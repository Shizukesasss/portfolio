import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ShapeGrid from '../ShapeGrid';
import { CONTENT } from '../content';
import { Reveal } from '../motion/Reveal';
import { Magnetic } from '../motion/Magnetic';
import { Marquee } from '../components/Marquee';
import { SelectedWork } from '../components/SelectedWork';
import { Certificates } from '../components/Certificates';
import { TransitionLink } from '../components/RouteTransition';
import { useMotion } from '../motion/MotionContext';
import { useLenis } from '../motion/LenisProvider';
import { useReducedMotion, usePointerFine } from '../motion/hooks';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// 1. KINETIC TYPE HERO (Items 6 & 12)
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  const { paused } = useMotion();
  const reduced = useReducedMotion();
  const isFine = usePointerFine();
  const lenis = useLenis();

  const heroRef = useRef(null);
  const nameWrapperRef = useRef(null);
  const charsRef = useRef([]);
  const charRectsRef = useRef([]);
  const scrollHintRef = useRef(null);
  const weightsRef = useRef([]);

  const nameChars = useMemo(() => CONTENT.profile.name.split(''), []);

  // Cache character client rects
  const cacheCharRects = useCallback(() => {
    charRectsRef.current = charsRef.current.map((charEl) => {
      if (!charEl) return { cx: 0, cy: 0 };
      const r = charEl.getBoundingClientRect();
      return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
    });
  }, []);

  // Entrance animation
  useEffect(() => {
    if (reduced) return;

    gsap.set(charsRef.current, { yPercent: 110, opacity: 0 });
    gsap.to(charsRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.03,
      ease: 'expo.out',
      delay: 0.1,
      onComplete: cacheCharRects,
    });
  }, [reduced, cacheCharRects]);

  // Scrubbed exit: name drifts up ~15% and fades to ~30% as user scrolls away
  useEffect(() => {
    if (reduced || !nameWrapperRef.current || !heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(nameWrapperRef.current, {
        yPercent: -15,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Scroll hint disappears after 50px of scroll
      if (scrollHintRef.current) {
        gsap.to(scrollHintRef.current, {
          opacity: 0,
          y: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '50px top',
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [reduced]);

  // Variable font interaction (wght 200..800, wdth 75..100)
  useEffect(() => {
    if (reduced) return;

    cacheCharRects();
    window.addEventListener('resize', cacheCharRects, { passive: true });

    // Initialize weights array
    weightsRef.current = nameChars.map(() => ({ wght: 500, wdth: 90 }));

    let rafId = null;
    let targetX = -9999;
    let targetY = -9999;
    let waveAngle = 0;

    const onPointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    if (isFine) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }

    const render = () => {
      if (!paused) {
        if (!isFine) {
          // Touch / coarse pointer: slow automatic wave
          waveAngle += 0.03;
          charsRef.current.forEach((el, i) => {
            if (!el) return;
            const wght = 400 + Math.sin(waveAngle + i * 0.4) * 250;
            const wdth = 85 + Math.sin(waveAngle + i * 0.4) * 15;
            el.style.fontVariationSettings = `'wght' ${wght.toFixed(0)}, 'wdth' ${wdth.toFixed(0)}`;
          });
        } else if (targetX > -1000) {
          // Fine pointer: distance-based weight & width
          charRectsRef.current.forEach((rect, i) => {
            const el = charsRef.current[i];
            const w = weightsRef.current[i];
            if (!el || !w) return;

            const dist = Math.hypot(targetX - rect.cx, targetY - rect.cy);
            const radius = 240;
            const proximity = Math.max(0, 1 - dist / radius);

            const targetWght = 400 + proximity * 400; // 400 -> 800
            const targetWdth = 80 + proximity * 20;   // 80 -> 100

            // Smooth lerp
            w.wght += (targetWght - w.wght) * 0.15;
            w.wdth += (targetWdth - w.wdth) * 0.15;

            el.style.fontVariationSettings = `'wght' ${w.wght.toFixed(0)}, 'wdth' ${w.wdth.toFixed(0)}`;
          });
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', cacheCharRects);
      if (isFine) window.removeEventListener('pointermove', onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isFine, reduced, paused, nameChars, cacheCharRects]);

  const handleScrollDown = () => {
    if (lenis) {
      lenis.scrollTo('#statement', { offset: -60 });
    } else {
      const el = document.getElementById('statement');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-between px-6 pt-24 pb-8 overflow-hidden bg-night select-none"
    >
      {/* ShapeGrid backdrop — dimmed */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" aria-hidden="true">
        <ShapeGrid
          shape="square"
          direction="diagonal"
          lineColor="#2E2A22"
          hoverColor="#E58E26"
          hoverFillColor="#E58E26"
          fillOpacity={0.07}
          cellSize={42}
          speed={0.25}
          tiltX={0}
          tiltY={0}
          rainbow={false}
        />
      </div>

      {/* Top Easter-Egg meta tag */}
      <div className="relative z-10 flex justify-center pt-4">
        <span
          className="font-mono text-stone hover:text-amber text-xs tracking-widest uppercase transition-colors px-3 py-1 rounded-full border border-line/40 hover:border-amber/50 select-none"
        >
          (Portfolio / ©{new Date().getFullYear()})
        </span>
      </div>

      {/* Giant Name + Bio + CTAs */}
      <div className="relative z-10 text-center max-w-6xl mx-auto flex flex-col items-center justify-center my-auto w-full">
        <div ref={nameWrapperRef} className="w-full">
          <h1
            className="font-sans font-extrabold text-bone tracking-tight leading-[0.9] flex flex-wrap justify-center overflow-hidden py-2"
            style={{ fontSize: 'clamp(3.5rem, 13vw, 13.5rem)' }}
            aria-label={CONTENT.profile.name}
          >
            {nameChars.map((char, index) => (
              <span
                key={index}
                className="overflow-hidden inline-block"
                aria-hidden="true"
              >
                <span
                  ref={(el) => {
                    charsRef.current[index] = el;
                  }}
                  className="inline-block transition-transform duration-75 will-change-transform"
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <p className="font-sans text-smoke text-base sm:text-xl max-w-2xl mx-auto mt-8 mb-10 leading-relaxed font-normal">
          {CONTENT.profile.shortBio}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Magnetic strength={0.35} radius={80}>
            <TransitionLink
              to="/work"
              title="Work"
              className="inline-block px-8 py-4 bg-bone text-night font-sans font-semibold text-sm rounded-full hover:bg-amber transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              See the work →
            </TransitionLink>
          </Magnetic>

          <a
            href={CONTENT.profile.resume || '/Jeffrey_Cruel_Resume.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-smoke hover:text-bone text-xs uppercase tracking-wider transition-colors px-4 py-2 border border-line rounded-full hover:border-stone focus:outline-none focus-visible:ring-1 focus-visible:ring-amber"
          >
            Resume ↗
          </a>
        </div>
      </div>

      {/* Bobbing Scroll hint */}
      <div
        ref={scrollHintRef}
        className="relative z-10 flex justify-center text-center animate-bounce duration-1000"
      >
        <button
          type="button"
          onClick={handleScrollDown}
          className="font-mono text-[11px] text-stone tracking-widest uppercase hover:text-amber transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-amber px-3 py-1 rounded"
        >
          ↓ Scroll, gently
        </button>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. SCROLL-LIT STATEMENT (Item 8)
// ─────────────────────────────────────────────────────────────────────────────
function Statement() {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);
  const reduced = useReducedMotion();

  // Parse words & highlighted markers (supports [bracketed] words or **double-asterisks**)
  const tokens = useMemo(() => {
    const rawTokens = CONTENT.statement.split(' ');
    return rawTokens.map((token) => {
      const isHighlighted = token.includes('**') || token.includes('[') || token.includes(']');
      const cleanText = token.replace(/\*\*|\[|\]/g, '');
      return { text: cleanText, isHighlighted };
    });
  }, []);

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const words = wordsRef.current;
    gsap.set(words, { opacity: 0.15, color: '#5A5446' }); // stone

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: true,
        },
      });

      words.forEach((el, i) => {
        const token = tokens[i];
        tl.to(
          el,
          {
            opacity: 1,
            color: token.isHighlighted ? '#E58E26' : '#EDE8DB',
            duration: 0.2,
            ease: 'power1.out',
          },
          i * 0.05
        );
      });
    });

    return () => ctx.revert();
  }, [reduced, tokens]);

  return (
    <section
      id="statement"
      ref={sectionRef}
      className="py-32 px-6 max-w-5xl mx-auto select-none"
    >
      <div className="font-sans font-semibold leading-[1.25] tracking-tight flex flex-wrap gap-x-[0.3em] gap-y-[0.1em]" style={{ fontSize: 'clamp(1.35rem, 2.75vw, 2.4rem)' }}>
        {tokens.map((token, i) => (
          <span
            key={i}
            ref={(el) => {
              wordsRef.current[i] = el;
            }}
            className={token.isHighlighted ? 'text-[#E58E26]' : (reduced ? 'text-bone' : 'transition-colors')}
          >
            {token.text}
          </span>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. SELECTED WORK (04) — SPLIT-SCREEN PORTFOLIO SECTION
// ─────────────────────────────────────────────────────────────────────────────
// (See src/components/SelectedWork.jsx)

// ─────────────────────────────────────────────────────────────────────────────
// 4. ABOUT & SKILLS
// ─────────────────────────────────────────────────────────────────────────────
function About() {
  const skillsByGroup = useMemo(() => {
    return CONTENT.skills.reduce((acc, skill) => {
      if (!acc[skill.group]) acc[skill.group] = [];
      acc[skill.group].push(skill);
      return acc;
    }, {});
  }, []);

  return (
    <section id="about" className="py-28 px-6 max-w-7xl mx-auto border-t border-line scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left column: Bio & Background */}
        <div className="lg:col-span-5">
          <Reveal>
            <span className="font-mono text-stone text-xs tracking-widest uppercase block mb-2">
              Background
            </span>
            <h2 className="font-sans font-bold text-bone text-3xl sm:text-4xl mb-6">
              About
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-smoke text-base sm:text-lg leading-relaxed mb-8">
              {CONTENT.profile.about}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="border-t border-line pt-6 flex flex-col gap-3 font-mono text-xs text-stone">
              {CONTENT.profile.facts.map((fact, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <span className="text-[#E58E26]">›</span>
                  <span className="text-smoke">{fact}</span>
                </div>
              ))}
            </div>
          </Reveal>
          {CONTENT.profile.resume && (
            <Reveal delay={0.2}>
              <div className="pt-6">
                <a
                  href={CONTENT.profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-smoke hover:text-bone border border-line hover:border-amber rounded-full px-4 py-2 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-amber"
                >
                  <span>View Full Resume</span>
                  <span>↗</span>
                </a>
              </div>
            </Reveal>
          )}
        </div>

        {/* Right column: Grouped Skills with Pill Stagger */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          <Reveal>
            <span className="font-mono text-stone text-xs tracking-widest uppercase block mb-2">
              Toolkit
            </span>
            <h3 className="font-sans font-bold text-bone text-2xl mb-4">
              Skills & Disciplines
            </h3>
          </Reveal>

          {Object.entries(skillsByGroup).map(([group, skills], gi) => (
            <Reveal key={group} delay={gi * 0.08}>
              <div className="border-b border-line pb-6">
                <h4 className="font-mono text-xs text-stone uppercase tracking-wider mb-4">
                  {group}
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="font-mono text-xs text-smoke bg-raised border border-line px-3.5 py-1.5 rounded-full hover:border-amber hover:text-bone transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. CONTACT CTA (Item 18)
// ─────────────────────────────────────────────────────────────────────────────
function ContactCTA() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTENT.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-7xl mx-auto border-t border-line scroll-mt-24">
      <Reveal>
        <span className="font-mono text-stone text-xs tracking-widest uppercase block mb-3">
          Initiate collaboration
        </span>
        <h2 className="sr-only">Contact {CONTENT.profile.name}</h2>
      </Reveal>

      <Reveal delay={0.1}>
        <a
          href={`mailto:${CONTENT.profile.email}`}
          data-cursor="Play"
          className="font-sans font-extrabold text-bone hover:text-amber transition-colors block mb-10 tracking-tight leading-none"
          style={{ fontSize: 'clamp(2rem, 6.5vw, 6.5rem)' }}
        >
          {CONTENT.profile.email}
        </a>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="flex flex-wrap gap-4 items-center">
          <Magnetic strength={0.35} radius={70}>
            <TransitionLink
              to="/contact"
              title="Contact"
              className="inline-block px-8 py-4 bg-bone text-night font-sans font-semibold text-sm rounded-full hover:bg-amber transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              Let's talk →
            </TransitionLink>
          </Magnetic>

          <button
            type="button"
            onClick={handleCopy}
            className="font-mono text-xs text-smoke hover:text-bone border border-line hover:border-stone rounded-full px-5 py-3 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-amber"
          >
            {copied ? '✓ Copied to clipboard' : 'Copy email'}
          </button>

          <a
            href={CONTENT.profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider text-smoke hover:text-bone transition-colors px-4 py-3 rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-amber"
          >
            GitHub ↗
          </a>
          <a
            href={CONTENT.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider text-smoke hover:text-bone transition-colors px-4 py-3 rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-amber"
          >
            LinkedIn ↗
          </a>
          {CONTENT.profile.resume && (
            <a
              href={CONTENT.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-smoke hover:text-bone transition-colors px-4 py-3 rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-amber"
            >
              Resume ↗
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  useEffect(() => {
    document.title = `${CONTENT.profile.name} — ${CONTENT.profile.role}`;
  }, []);

  return (
    <>
      <Hero />
      <Marquee />
      <Statement />
      <SelectedWork />
      <About />
      <Certificates />
      <ContactCTA />
    </>
  );
}
