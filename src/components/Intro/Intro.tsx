import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Intro.module.css';

/* ── Easing constants (Premium personality) ── */
const EASE_REVEAL = 'power3.out'; // decelerate — entrances
const EASE_EXIT = 'power2.inOut'; // smooth both ends — on-screen transforms
const EASE_CLIP = 'power4.inOut'; // dramatic — page reveal

/* ── Duration palette ── */
const DUR_QUICK = 0.4;
const DUR_STD = 0.55;
const DUR_SLOW = 0.7;

interface IntroProps {
  initials: string;
  onComplete: () => void;
}

export function Intro({ initials, onComplete }: IntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<SVGSVGElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const initialsRef = useRef<HTMLSpanElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const monogram = monogramRef.current;
    const rule = ruleRef.current;
    const initialsEl = initialsRef.current;
    const composition = compositionRef.current;

    if (!overlay || !monogram || !rule || !initialsEl || !composition) return;

    /* ── Reduced motion: skip everything ── */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      document.documentElement.classList.remove('intro-active');
      setRemoved(true);
      onComplete();
      return;
    }

    /* ── Lock scroll ── */
    document.documentElement.classList.add('intro-active');

    /* ── GSAP context for React cleanup ── */
    const ctx = gsap.context(() => {
      /* ── Set initial states ── */
      gsap.set(monogram, {
        clipPath: 'inset(100% 0 0 0)',
        opacity: 1,
        scale: 1,
      });
      gsap.set(rule, { width: 0, opacity: 0 });
      gsap.set(initialsEl, { opacity: 0, y: 12 });
      gsap.set(overlay, { clipPath: 'inset(0 0 0 0)' });

      /* ── Build timeline ── */
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove('intro-active');
          setRemoved(true);
          onComplete();
        },
      });

      /* 1. Monogram reveals via vertical wipe */
      tl.to(monogram, {
        clipPath: 'inset(0% 0 0 0)',
        duration: DUR_STD,
        ease: EASE_REVEAL,
      });

      /* 2. Gold rule expands */
      tl.to(
        rule,
        {
          width: 54,
          opacity: 1,
          duration: DUR_QUICK,
          ease: EASE_REVEAL,
        },
        '-=0.15',
      );

      /* 3. Initials fade in + slide up */
      tl.to(
        initialsEl,
        {
          opacity: 1,
          y: 0,
          duration: DUR_QUICK,
          ease: EASE_REVEAL,
        },
        '-=0.2',
      );

      /* 4. Hold — let it breathe */
      tl.to({}, { duration: 0.35 });

      /* 5. Composition lifts and scales down */
      tl.to(composition, {
        y: -30,
        scale: 0.88,
        opacity: 0,
        duration: DUR_STD,
        ease: EASE_EXIT,
      });

      /* 6. Overlay reveals page with circular clip-path */
      tl.to(
        overlay,
        {
          clipPath: 'inset(0 0 100% 0)',
          duration: DUR_SLOW,
          ease: EASE_CLIP,
        },
        '<+=0.1',
      );
    }, overlay);

    return () => {
      ctx.revert();
      document.documentElement.classList.remove('intro-active');
    };
  }, [onComplete]);

  if (removed) return null;

  return (
    <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
      <div ref={compositionRef} className={styles.composition}>
        {/* Monogram — extracted from favicon.svg */}
        <svg
          ref={monogramRef}
          className={styles.monogram}
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="64" height="64" rx="12" />
          <path
            className={styles.letterPath}
            d="M18 43V21h4v9h20v-9h4v22h-4v-9H22v9h-4Z"
          />
          <path
            className={styles.accentLine}
            d="M16 49h32"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Gold rule */}
        <div ref={ruleRef} className={styles.rule} />

        {/* Initials */}
        <span ref={initialsRef} className={styles.initials}>
          {initials}
        </span>
      </div>
    </div>
  );
}

