import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CONTENT } from '../content';
import { Reveal } from '../motion/Reveal';
import { Magnetic } from '../motion/Magnetic';
import { submitContact } from '../lib/submitContact';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    service: preselectedService,
    _honeypot: '',
  });

  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [copied, setCopied] = useState(false);
  const [ariaAnnounce, setAriaAnnounce] = useState('');

  useEffect(() => {
    document.title = `Contact — ${CONTENT.profile.name}`;
  }, []);

  // Update selected service if query param changes
  useEffect(() => {
    if (preselectedService) {
      setFormState((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const validate = (values) => {
    const errs = {};
    if (!values.name.trim()) {
      errs.name = 'Please provide your name.';
    }
    if (!values.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!values.message.trim()) {
      errs.message = 'Please include a brief message about your project.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((s) => ({ ...s, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...formState, [name]: value });
      setErrors(errs);
    }
  };

  const handleBlur = (field) => {
    setFocusedField(null);
    setTouched((t) => ({ ...t, [field]: true }));
    const errs = validate(formState);
    setErrors(errs);
    if (errs[field]) {
      setAriaAnnounce(errs[field]);
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formState._honeypot) return; // bot detected

    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errs = validate(formState);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      setAriaAnnounce('Please fix the errors in the form before submitting.');
      return;
    }

    setStatus('sending');
    setAriaAnnounce('Sending message...');

    try {
      await submitContact(formState, CONTENT.profile.email);
      setStatus('sent');
      setAriaAnnounce('Message sent successfully. Thank you!');
    } catch {
      setStatus('idle');
      setAriaAnnounce('Could not send message. Please try emailing directly.');
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTENT.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main id="main-content" className="pt-32 pb-28 min-h-screen px-6 max-w-4xl mx-auto">
      {/* Polite live region for screen readers */}
      <div role="status" aria-live="polite" className="sr-only">
        {ariaAnnounce}
      </div>

      <Reveal>
        <span className="font-mono text-stone text-xs tracking-widest uppercase block mb-3">
          Get in touch
        </span>
        <h1
          className="font-sans font-extrabold text-bone tracking-tight leading-none mb-6"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
        >
          Let's talk
        </h1>
      </Reveal>

      <Reveal delay={0.06}>
        <p className="font-sans text-smoke text-base sm:text-lg mb-12 max-w-xl leading-relaxed">
          Have an upcoming project, a design challenge, or simply want to connect? Send a note and I will get back within 24 hours.
        </p>
      </Reveal>

      {/* Direct Email & Copy Action */}
      <Reveal delay={0.1}>
        <div className="flex flex-wrap items-center gap-4 mb-16 pb-10 border-b border-line">
          <a
            href={`mailto:${CONTENT.profile.email}`}
            className="font-sans font-bold text-bone text-xl sm:text-2xl hover:text-amber transition-colors"
          >
            {CONTENT.profile.email}
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="font-mono text-xs text-smoke hover:text-bone border border-line hover:border-stone rounded-full px-4 py-1.5 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-amber"
          >
            {copied ? '✓ Copied' : 'Copy email'}
          </button>
          {CONTENT.profile.resume && (
            <a
              href={CONTENT.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-smoke hover:text-bone border border-line hover:border-stone rounded-full px-4 py-1.5 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-amber"
            >
              Resume ↗
            </a>
          )}
        </div>
      </Reveal>

      {/* Service Pre-selection Chips */}
      {CONTENT.services.length > 0 && (
        <Reveal delay={0.12}>
          <div className="mb-12">
            <span className="font-mono text-stone text-xs uppercase tracking-widest block mb-4">
              Select an area of interest
            </span>
            <div className="flex flex-wrap gap-2.5">
              {CONTENT.services.map((svc) => {
                const isSelected = formState.service === svc.slug;
                return (
                  <button
                    key={svc.slug}
                    type="button"
                    onClick={() =>
                      setFormState((s) => ({
                        ...s,
                        service: isSelected ? '' : svc.slug,
                      }))
                    }
                    className={`font-mono text-xs px-4 py-2 rounded-full border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber ${isSelected
                        ? 'border-amber bg-amber/15 text-amber font-semibold'
                        : 'border-line text-stone hover:border-stone hover:text-smoke'
                      }`}
                  >
                    {svc.title}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
      )}

      {/* Interactive Contact Form */}
      <Reveal delay={0.15}>
        {status === 'sent' ? (
          <div className="py-20 text-center border border-line rounded-2xl bg-raised/50 p-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-amber/10 text-amber flex items-center justify-center font-mono text-xl">
              ✓
            </div>
            <h2 className="font-sans font-bold text-bone text-2xl sm:text-3xl mb-3">
              Message received
            </h2>
            <p className="font-sans text-smoke text-sm max-w-md mx-auto mb-8">
              Thank you for reaching out. I have received your note and will review it shortly.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setFormState({ name: '', email: '', message: '', service: '', _honeypot: '' });
                setTouched({ name: false, email: false, message: false });
              }}
              className="font-mono text-xs text-smoke hover:text-bone underline underline-offset-4"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
            {/* Honeypot field (hidden from screen reader & real users) */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="_honeypot">Leave this blank</label>
              <input
                id="_honeypot"
                type="text"
                name="_honeypot"
                tabIndex={-1}
                value={formState._honeypot}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            {/* Name Input with Floating Label and Scaling Underline */}
            <div className="relative pt-6">
              <label
                htmlFor="name"
                className={`absolute left-0 transition-all duration-200 pointer-events-none font-mono text-xs uppercase tracking-wider ${focusedField === 'name' || formState.name
                    ? 'top-0 text-amber scale-90 origin-left'
                    : 'top-7 text-stone'
                  }`}
              >
                Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={formState.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={() => handleBlur('name')}
                aria-invalid={Boolean(touched.name && errors.name)}
                aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                className="w-full bg-transparent border-b border-line text-bone font-sans text-lg py-2 focus:outline-none placeholder-transparent"
              />
              {/* Bottom Accent Underline scaling in left->right on focus */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber origin-left transition-transform duration-300 pointer-events-none"
                style={{
                  transform: focusedField === 'name' ? 'scaleX(1)' : 'scaleX(0)',
                }}
                aria-hidden="true"
              />
              {touched.name && errors.name && (
                <p id="name-error" className="font-mono text-xs text-red-400 mt-2">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Input with Floating Label and Scaling Underline */}
            <div className="relative pt-6">
              <label
                htmlFor="email"
                className={`absolute left-0 transition-all duration-200 pointer-events-none font-mono text-xs uppercase tracking-wider ${focusedField === 'email' || formState.email
                    ? 'top-0 text-amber scale-90 origin-left'
                    : 'top-7 text-stone'
                  }`}
              >
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formState.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                aria-invalid={Boolean(touched.email && errors.email)}
                aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                className="w-full bg-transparent border-b border-line text-bone font-sans text-lg py-2 focus:outline-none placeholder-transparent"
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber origin-left transition-transform duration-300 pointer-events-none"
                style={{
                  transform: focusedField === 'email' ? 'scaleX(1)' : 'scaleX(0)',
                }}
                aria-hidden="true"
              />
              {touched.email && errors.email && (
                <p id="email-error" className="font-mono text-xs text-red-400 mt-2">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message Textarea with Floating Label and Scaling Underline */}
            <div className="relative pt-6">
              <label
                htmlFor="message"
                className={`absolute left-0 transition-all duration-200 pointer-events-none font-mono text-xs uppercase tracking-wider ${focusedField === 'message' || formState.message
                    ? 'top-0 text-amber scale-90 origin-left'
                    : 'top-7 text-stone'
                  }`}
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formState.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={() => handleBlur('message')}
                aria-invalid={Boolean(touched.message && errors.message)}
                aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
                className="w-full bg-transparent border-b border-line text-bone font-sans text-lg py-2 focus:outline-none resize-none placeholder-transparent"
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber origin-left transition-transform duration-300 pointer-events-none"
                style={{
                  transform: focusedField === 'message' ? 'scaleX(1)' : 'scaleX(0)',
                }}
                aria-hidden="true"
              />
              {touched.message && errors.message && (
                <p id="message-error" className="font-mono text-xs text-red-400 mt-2">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Magnetic Submit Button with Idle -> Sending -> Sent */}
            <div className="pt-4">
              <Magnetic strength={0.35} radius={80}>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="px-8 py-4 bg-bone text-night font-sans font-semibold text-sm rounded-full hover:bg-amber transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-night animate-ping" />
                      <span>Sending inquiry…</span>
                    </>
                  ) : (
                    <span>Send inquiry →</span>
                  )}
                </button>
              </Magnetic>
            </div>
          </form>
        )}
      </Reveal>
    </main>
  );
}
