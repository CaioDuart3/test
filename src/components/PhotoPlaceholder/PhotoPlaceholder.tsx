import clsx from 'clsx';
import styles from './PhotoPlaceholder.module.css';

interface PhotoPlaceholderProps {
  label: string;
  caption?: string;
  className?: string;
  compact?: boolean;
}

export function PhotoPlaceholder({
  label,
  caption,
  className,
  compact = false,
}: PhotoPlaceholderProps) {
  return (
    <figure className={clsx(styles.placeholder, compact && styles.compact, className)}>
      <div className={styles.frame} aria-label={label} role="img">
        <span className={styles.crossline} />
        <span className={styles.label}>{label}</span>
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
