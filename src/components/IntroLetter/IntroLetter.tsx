import { type MemojiAccentContent, type SiteContent } from '../../data/siteContent';
import { MemojiAccent } from '../MemojiAccent/MemojiAccent';
import { Reveal } from '../Reveal/Reveal';
import styles from './IntroLetter.module.css';

type IntroContent = SiteContent['introduction'];

interface IntroLetterProps {
  content: IntroContent;
  memoji: MemojiAccentContent;
}

export function IntroLetter({ content, memoji }: IntroLetterProps) {
  return (
    <section className={styles.section} aria-labelledby="intro-title">
      <Reveal className={styles.shell}>
        <MemojiAccent accent={memoji} variant="letter" />
        <span className="section-kicker">02 / carta</span>
        <div className={styles.letter}>
          <h2 id="intro-title">{content.title}</h2>
          <p>{content.text}</p>
        </div>
      </Reveal>
    </section>
  );
}
