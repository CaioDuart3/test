import {
  motion,
  useReducedMotion as useMotionReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useRef } from 'react';
import { type TimelineItem } from '../../data/siteContent';
import { MemoryCard } from '../MemoryCard/MemoryCard';
import { Reveal } from '../Reveal/Reveal';
import styles from './Timeline.module.css';

interface TimelineProps {
  items: TimelineItem[];
  title: string;
  description: string;
}

export function Timeline({ items, title, description }: TimelineProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMotionReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 65%'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [0, 1]);

  return (
    <section id="momentos" ref={ref} className={styles.section} aria-labelledby="timeline-title">
      <div className="section-shell">
        <Reveal>
          <span className="section-kicker">03 / momentos</span>
          <div className={styles.heading}>
            <h2 id="timeline-title">{title}</h2>
            <p>{description}</p>
          </div>
        </Reveal>
        <div className={styles.timeline}>
          <span className={styles.track} aria-hidden="true" />
          <motion.span className={styles.progress} style={{ scaleY }} aria-hidden="true" />
          {items.map((item, index) => (
            <Reveal key={`${item.date}-${index}`} delay={index * 0.05}>
              <MemoryCard item={item} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
