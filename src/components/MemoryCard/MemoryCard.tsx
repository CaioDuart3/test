import { type TimelineItem } from '../../data/siteContent';
import { Photo } from '../PhotoPlaceholder/Photo';
import styles from './MemoryCard.module.css';

interface MemoryCardProps {
  item: TimelineItem;
  index: number;
}

export function MemoryCard({ item, index }: MemoryCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.marker} aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className={styles.copy}>
        <p className={styles.date}>{item.date}</p>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
      {item.photo ? (
        <Photo photo={item.photo} className={styles.photo} imageClassName={styles.image} compact />
      ) : null}
    </article>
  );
}
