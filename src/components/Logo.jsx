import React from 'react';

/**
 * EP Logo Component
 * A custom circular badge emblem featuring stylized geometric "E" and "P" monograms,
 * styled after the minimal aperture/badge aesthetic with subtle micro-interactions on hover.
 */
export function Logo({ className = 'w-7 h-7' }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden transition-all duration-300 ease-out group-hover:scale-105 group-hover:rotate-6 ring-1 ring-line/80 group-hover:ring-amber/60 shadow-sm ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none"
      >
        {/* Disc background - warm muted silver transitioning to bone on hover */}
        <circle
          cx="50"
          cy="50"
          r="49"
          className="fill-smoke group-hover:fill-bone transition-colors duration-300"
        />

        {/* Dynamic Curved EP Monogram in dark night fill */}
        <g className="fill-night transition-colors duration-300">
          {/* Dynamic 'E' on left with curved perimeter hugging the circle */}
          <path d="M43 25 C31 25 21 34 20 46 H41 V54 H20 C21 66 31 75 43 75 V67 C35 67 29 61 28 54 H35 V46 H28 C29 39 35 33 43 33 V25 Z" />

          {/* Dynamic 'P' on right with upper loop hugging the circle and stem */}
          <path d="M53 25 V75 H61 V53 C71 53 79 46 79 38 C79 30 71 25 61 25 H53 Z M61 32 C67 32 71 34.5 71 38 C71 41.5 67 45 61 45 V32 Z" />
        </g>
      </svg>
    </span>
  );
}

export default Logo;
