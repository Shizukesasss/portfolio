'use client';

import { useRef, useEffect, useState, useMemo, useId } from 'react';
import './CurvedLoop.css';

const DEFAULT_SKILLS_TEXT =
  'FRONT END ✦ WEB DEVELOPMENT ✦ UI/UX ✦ REACT & TYPESCRIPT ✦ DESIGN SYSTEMS ✦ FULL STACK ✦';

const CurvedLoop = ({
  marqueeText = DEFAULT_SKILLS_TEXT,
  speed = 1.6,
  className = '',
  curveAmount = 0, // 0 = Perfectly straight sideways line
  direction = 'left',
  interactive = true,
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0\u00A0\u00A0\u00A0';
  }, [marqueeText]);

  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const pathRef = useRef(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [viewWidth, setViewWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1440));

  const uid = useId();
  const pathId = `straight-loop-${uid.replace(/:/g, '')}`;

  // Keep viewWidth responsive to window size so SVG never letterboxes
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setViewWidth(containerRef.current.offsetWidth || window.innerWidth);
      } else {
        setViewWidth(window.innerWidth);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Centered vertically inside height
  const pathY = 36;
  const pathD = `M-200,${pathY} Q${viewWidth / 2},${pathY + curveAmount} ${viewWidth + 2400},${pathY}`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const repeatCount = textLength ? Math.ceil((viewWidth * 3) / textLength) + 3 : 3;
  const ready = spacing > 0;

  useEffect(() => {
    if (measureRef.current) {
      setSpacing(measureRef.current.getComputedTextLength());
    }
  }, [text, className, viewWidth]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute('startOffset', initial + 'px');
      setOffset(initial);
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;

        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;

        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
        setOffset(newOffset);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const onPointerDown = (e) => {
    if (!interactive) return;
    dragRef.current = true;
    setIsDragging(true);
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;

    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;

    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive || !dragRef.current) return;
    dragRef.current = false;
    setIsDragging(false);
    if (Math.abs(velRef.current) > 0.5) {
      dirRef.current = velRef.current > 0 ? 'right' : 'left';
    }
  };

  const cursorStyle = interactive ? (isDragging ? 'grabbing' : 'grab') : 'auto';

  // Split text by ✦ so we can highlight the star separator in orange (#E58E26)
  const renderStyledSegments = (copyIdx) => {
    const parts = text.split('✦');
    return parts.map((part, idx) => (
      <tspan key={`${copyIdx}-${idx}`}>
        <tspan className="curved-loop-label">{part}</tspan>
        {idx < parts.length - 1 && (
          <tspan className="curved-loop-star">✦</tspan>
        )}
      </tspan>
    ));
  };

  return (
    <div
      ref={containerRef}
      className="curved-loop-jacket"
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="curved-loop-svg"
        viewBox={`0 0 ${viewWidth} 60`}
        preserveAspectRatio="none"
      >
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
        >
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text xmlSpace="preserve" className={className}>
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={offset + 'px'}
              xmlSpace="preserve"
            >
              {Array.from({ length: repeatCount }).map((_, i) =>
                renderStyledSegments(i)
              )}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
