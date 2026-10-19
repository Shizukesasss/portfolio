import { useState, useEffect, useCallback } from 'react';
import { CONTENT } from '../content';
import { Reveal } from '../motion/Reveal';

export function Certificates() {
  const [activeModalCert, setActiveModalCert] = useState(null);
  const [expandedCert, setExpandedCert] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const certificates = CONTENT.certificates || [];
  const proCerts = certificates.filter((c) => c.badge === 'Professional Certificate');
  const courseCerts = certificates.filter((c) => c.badge !== 'Professional Certificate');

  // Handle ESC key to close modal
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && activeModalCert) {
        setActiveModalCert(null);
      }
    },
    [activeModalCert]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (activeModalCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModalCert, handleKeyDown]);

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleExpand = (certId) => {
    setExpandedCert((prev) => (prev === certId ? null : certId));
  };

  return (
    <section
      id="certificates"
      className="py-28 px-6 max-w-7xl mx-auto border-t border-line scroll-mt-24"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <Reveal>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-stone text-xs tracking-widest uppercase">
                05 / Verified Credentials
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber/10 text-amber border border-amber/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                Google Career Certificates
              </span>
            </div>
            <h2 className="font-sans font-bold text-bone text-3xl sm:text-4xl lg:text-5xl tracking-tight">
              Certifications <span className="text-amber">.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-smoke">
            <span className="px-3 py-1 bg-raised border border-line rounded-full">
              2 Specializations
            </span>
            <span className="px-3 py-1 bg-raised border border-line rounded-full">
              16+ Courses Completed
            </span>
            <span className="px-3 py-1 bg-raised border border-line rounded-full text-bone">
              Coursera Verified
            </span>
          </div>
        </Reveal>
      </div>

      {/* Professional Certificates Grid */}
      <div className="flex flex-col gap-12 mb-14">
        {proCerts.map((cert, index) => {
          const isExpanded = expandedCert === cert.id;

          return (
            <Reveal key={cert.id} delay={index * 0.1}>
              <div className="group relative bg-raised/70 hover:bg-raised transition-all duration-300 border border-line hover:border-amber/40 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  {/* Left Column: Certificate Image Frame */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <div
                      onClick={() => setActiveModalCert(cert)}
                      className="relative rounded-xl overflow-hidden border border-line/80 bg-night group-hover:border-amber/50 cursor-pointer shadow-md transition-all duration-300 hover:shadow-amber/10 hover:shadow-xl"
                      title="Click to view full certificate"
                    >
                      <img
                        src={cert.image}
                        alt={`${cert.title} preview`}
                        className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      {/* Zoom overlay badge */}
                      <div className="absolute inset-0 bg-night/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-night/90 text-bone border border-line font-mono text-xs uppercase tracking-wider shadow-lg">
                          Inspect Full Certificate
                        </span>
                      </div>
                    </div>

                    {/* Quick credential verification info */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone px-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-smoke">Verified by Coursera</span>
                      </div>
                      {cert.credentialId && (
                        <button
                          type="button"
                          onClick={() => handleCopyId(cert.credentialId)}
                          className="hover:text-amber transition-colors flex items-center gap-1"
                          title="Copy Credential ID"
                        >
                          <span>ID: {cert.credentialId}</span>
                          <span className="text-[10px] text-amber">
                            {copiedId === cert.credentialId ? '✓ Copied' : '⧉'}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Certificate Meta & Actions */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Google branding & date */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          {/* Google colorful indicator dots */}
                          <div className="flex gap-1" aria-hidden="true">
                            <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
                            <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
                            <span className="w-2 h-2 rounded-full bg-[#FBBC05]" />
                            <span className="w-2 h-2 rounded-full bg-[#34A853]" />
                          </div>
                          <span className="font-mono text-xs uppercase tracking-wider text-smoke font-medium">
                            {cert.issuer}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-stone">
                          {cert.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-sans font-bold text-bone text-2xl sm:text-3xl tracking-tight mb-4">
                        {cert.title}
                      </h3>

                      {/* Description */}
                      <p className="font-sans text-smoke text-sm sm:text-base leading-relaxed mb-6">
                        {cert.description}
                      </p>

                      {/* Skills Covered */}
                      <div className="mb-6">
                        <h4 className="font-mono text-xs text-stone uppercase tracking-wider mb-2.5">
                          Core Competencies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.map((skill) => (
                            <span
                              key={skill}
                              className="font-mono text-xs text-smoke bg-night/60 border border-line px-3 py-1 rounded-full hover:border-stone hover:text-bone transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-line/60 flex flex-wrap items-center gap-3">
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bone text-night font-sans font-semibold text-xs sm:text-sm hover:bg-amber transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                      >
                        <span>Verify Credential</span>
                        <span>↗</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setActiveModalCert(cert)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-line hover:border-amber text-smoke hover:text-bone font-mono text-xs uppercase tracking-wider transition-colors"
                      >
                        Inspect Picture
                      </button>

                      {cert.courses && cert.courses.length > 0 && (
                        <button
                          type="button"
                          onClick={() => toggleExpand(cert.id)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-line/80 hover:border-stone text-stone hover:text-smoke font-mono text-xs uppercase tracking-wider transition-colors"
                        >
                          <span>{isExpanded ? 'Hide Courses' : `View ${cert.courses.length} Courses`}</span>
                          <span className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                            ↓
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable Included Courses Section */}
                {isExpanded && cert.courses && (
                  <div className="mt-8 pt-8 border-t border-line/70 animate-fadeIn">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-stone">
                        Included Course Curriculum ({cert.courses.length} Completed)
                      </h4>
                      <span className="font-mono text-[11px] text-smoke">
                        Individual Coursera Share Links
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cert.courses.map((course, idx) => (
                        <div
                          key={course.slug || idx}
                          className="bg-night/70 border border-line/70 hover:border-amber/50 rounded-xl p-4 flex flex-col justify-between transition-colors group/item"
                        >
                          <div>
                            {course.thumbnail && (
                              <div className="relative mb-3 rounded-lg overflow-hidden border border-line/50 bg-night aspect-[16/9]">
                                <img
                                  src={course.thumbnail}
                                  alt={course.name}
                                  className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-stone font-mono text-[11px] mb-1">
                              <span>Module 0{idx + 1}</span>
                              <span>•</span>
                              <span>Google</span>
                            </div>
                            <h5 className="font-sans font-semibold text-bone text-sm mb-2 line-clamp-2">
                              {course.name}
                            </h5>
                            <p className="font-sans text-smoke text-xs line-clamp-3 mb-4 leading-relaxed">
                              {course.description}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-line/40 flex justify-end">
                            <a
                              href={course.shareUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-amber hover:text-bone transition-colors"
                            >
                              <span>Coursera Link</span>
                              <span>↗</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Specialized Foundation Course (Foundations of Business Intelligence) */}
      {courseCerts.length > 0 && (
        <Reveal delay={0.2}>
          <div className="bg-raised/40 border border-line rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <span className="font-mono text-stone text-xs tracking-widest uppercase block mb-1">
                  Additional Course Specialization
                </span>
                <h3 className="font-sans font-bold text-bone text-xl sm:text-2xl">
                  Business Intelligence & Analytics
                </h3>
              </div>
              <span className="px-3 py-1 bg-night border border-line rounded-full font-mono text-xs text-smoke">
                Google Verified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseCerts.map((course) => (
                <div
                  key={course.id}
                  className="bg-night/60 border border-line hover:border-amber/40 rounded-xl p-5 flex flex-col justify-between transition-all"
                >
                  <div>
                    {course.thumbnail && (
                      <div className="rounded-lg overflow-hidden border border-line/60 mb-4 aspect-[16/9]">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2 font-mono text-[11px] text-stone mb-1.5">
                      <span className="text-amber">›</span>
                      <span>{course.issuer}</span>
                      <span>•</span>
                      <span>{course.date}</span>
                    </div>
                    <h4 className="font-sans font-bold text-bone text-base mb-2">
                      {course.title}
                    </h4>
                    <p className="font-sans text-smoke text-xs leading-relaxed mb-4">
                      {course.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {course.skills?.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[10px] text-stone bg-raised px-2.5 py-0.5 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-line/50 flex justify-between items-center">
                    <span className="font-mono text-[11px] text-stone">Certificate Share</span>
                    <a
                      href={course.shareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-bone hover:text-amber transition-colors"
                    >
                      <span>View on Coursera</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Modal / Lightbox for viewing full certificate image */}
      {activeModalCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-night/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveModalCert(null)}
        >
          <div
            className="relative bg-raised border border-line rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-night/50">
              <div className="flex items-center gap-3">
                <div className="flex gap-1" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
                </div>
                <div>
                  <h3 id="cert-modal-title" className="font-sans font-bold text-bone text-base sm:text-lg">
                    {activeModalCert.title}
                  </h3>
                  <p className="font-mono text-xs text-stone">
                    Issued to Jeffrey Cruel • {activeModalCert.date}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalCert(null)}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full bg-night border border-line hover:border-amber text-smoke hover:text-bone flex items-center justify-center transition-colors font-mono text-base focus:outline-none focus-visible:ring-1 focus-visible:ring-amber"
              >
                ✕
              </button>
            </div>

            {/* Modal Image View */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-night/80">
              <img
                src={activeModalCert.image}
                alt={activeModalCert.title}
                className="max-h-[68vh] w-auto object-contain rounded-lg shadow-xl border border-line/60"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-line bg-night/60 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 font-mono text-xs text-smoke">
                <span>Credential ID:</span>
                <span className="text-bone bg-night px-2.5 py-1 rounded border border-line">
                  {activeModalCert.credentialId}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyId(activeModalCert.credentialId)}
                  className="text-amber hover:underline"
                >
                  {copiedId === activeModalCert.credentialId ? '✓ Copied' : 'Copy'}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={activeModalCert.image}
                  download={`${activeModalCert.id}.jpeg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-line hover:border-amber text-smoke hover:text-bone font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  Open Original ↗
                </a>
                <a
                  href={activeModalCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-amber text-night font-sans font-semibold text-xs sm:text-sm hover:bg-bone transition-colors"
                >
                  Verify on Coursera ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
