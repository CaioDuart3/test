import { ExternalLink, Music2 } from 'lucide-react';
import { type PlaylistContent } from '../../data/siteContent';
import { Reveal } from '../Reveal/Reveal';
import styles from './Playlist.module.css';

interface PlaylistProps {
  content: PlaylistContent;
  title: string;
  description: string;
}

const providerLabel: Record<PlaylistContent['provider'], string> = {
  spotify: 'Spotify',
  youtube: 'YouTube',
};

function hasAutoplay(url: string) {
  return /[?&]autoplay=1\b/.test(url);
}

export function Playlist({ content, title, description }: PlaylistProps) {
  const shouldRenderEmbed = content.embedUrl && !hasAutoplay(content.embedUrl);
  const externalUrl = content.externalUrl || content.embedUrl;

  return (
    <section id="musica" className={styles.section} aria-labelledby="playlist-title">
      <Reveal className="section-shell">
        <div className={styles.layout}>
          <div className={styles.copy}>
            <span className="section-kicker">05 / musica</span>
            <h2 id="playlist-title">{title}</h2>
            <p>{description}</p>
            <div className={styles.meta}>
              <Music2 aria-hidden="true" size={18} />
              {content.title}
            </div>
            {content.description ? <p className={styles.note}>{content.description}</p> : null}
            {externalUrl ? (
              <a className={styles.openLink} href={externalUrl} target="_blank" rel="noreferrer">
                Abrir playlist
                <ExternalLink aria-hidden="true" size={17} />
              </a>
            ) : null}
          </div>

          <div className={styles.embed}>
            {shouldRenderEmbed ? (
              <iframe
                title={`Playlist: ${content.title}`}
                src={content.embedUrl}
                loading="lazy"
                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            ) : (
              <div className={styles.empty} role="img" aria-label="Placeholder da playlist">
                <Music2 aria-hidden="true" size={26} />
                <span>{providerLabel[content.provider]}</span>
                <strong>{content.title}</strong>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
