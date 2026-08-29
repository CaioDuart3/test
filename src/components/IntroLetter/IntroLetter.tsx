import { type SiteContent } from '../../data/siteContent';
import { Reveal } from '../Reveal/Reveal';
import styles from './IntroLetter.module.css';

type IntroContent = SiteContent['introduction'];

interface IntroLetterProps {
  content: IntroContent;
}

export function IntroLetter({ content }: IntroLetterProps) {
  return (
    <section className={styles.section} aria-labelledby="intro-title">
      <Reveal className={styles.shell}>
        <span className="section-kicker">02 / carta</span>
        <div className={styles.letter}>
          <h2 id="intro-title">{content.title}</h2>
          <p>{content.text}</p>
        </div>
      </Reveal>
    </section>
  );
}
