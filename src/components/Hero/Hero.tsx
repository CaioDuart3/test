import { MoveDown } from 'lucide-react';
import {
  motion,
  useReducedMotion as useMotionReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useRef } from 'react';
import { type MemojiAccentContent, type SiteContent } from '../../data/siteContent';
import { MemojiAccent } from '../MemojiAccent/MemojiAccent';
import { Photo } from '../PhotoPlaceholder/Photo';
import styles from './Hero.module.css';

type HeroContent = SiteContent['hero'];

interface HeroProps {
  content: HeroContent;
  memoji: MemojiAccentContent;
  introComplete?: boolean;
}

export function Hero({ content, memoji, introComplete = true }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMotionReducedMotion();
  const shouldAnimate = !prefersReducedMotion && introComplete;
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0px', prefersReducedMotion ? '0px' : '26px'],
  );

  return (
    <section id="topo" ref={heroRef} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.shell}>
        <motion.div
          className={styles.copy}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.eyebrow}>{content.eyebrow}</span>
          <h1 id="hero-title">{content.title}</h1>
          {content.subtitle ? <p>{content.subtitle}</p> : null}
          <a className={styles.scrollLink} href="#momentos">
            <MoveDown aria-hidden="true" size={18} />
            Continuar
          </a>
        </motion.div>

        <motion.div
          className={styles.photoWrap}
          style={{ y: imageY }}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <span className={styles.index} aria-hidden="true">
            01
          </span>
          <span className={styles.orbit} aria-hidden="true" />
          <MemojiAccent accent={memoji} variant="hero" />
          <Photo
            photo={content.photo}
            className={styles.photo}
            imageClassName={styles.image}
            loading="eager"
          />
        </motion.div>
      </div>
    </section>
  );
}
