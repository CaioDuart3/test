import clsx from 'clsx';
import { motion, useReducedMotion as useMotionReducedMotion } from 'motion/react';
import { type MemojiAccentContent } from '../../data/siteContent';
import styles from './MemojiAccent.module.css';

type MemojiVariant = 'hero' | 'letter' | 'gallery';

interface MemojiAccentProps {
  accent: MemojiAccentContent;
  variant: MemojiVariant;
  className?: string;
}

const floatMotion: Record<MemojiVariant, { y: number[]; rotate: number[]; scale: number[] }> = {
  hero: { y: [0, -8, 0], rotate: [-4, -1, -4], scale: [1, 1.015, 1] },
  letter: { y: [0, -6, 0], rotate: [5, 2, 5], scale: [1, 1.01, 1] },
  gallery: { y: [0, -7, 0], rotate: [-3, -6, -3], scale: [1, 1.012, 1] },
};

export function MemojiAccent({ accent, variant, className }: MemojiAccentProps) {
  const prefersReducedMotion = useMotionReducedMotion();

  return (
    <motion.div
      className={clsx(styles.accent, styles[variant], className)}
      data-memoji-accent={variant}
      aria-hidden="true"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.img
        src={accent.src}
        alt=""
        draggable="false"
        animate={prefersReducedMotion ? undefined : floatMotion[variant]}
        transition={{
          duration: variant === 'letter' ? 6.8 : 7.6,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />
      <span>{accent.label}</span>
    </motion.div>
  );
}
