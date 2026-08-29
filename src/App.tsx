import { FinalMessage } from './components/FinalMessage/FinalMessage';
import { Hero } from './components/Hero/Hero';
import { IntroLetter } from './components/IntroLetter/IntroLetter';
import { Navigation } from './components/Navigation/Navigation';
import { PhotoCarousel } from './components/PhotoCarousel/PhotoCarousel';
import { Playlist } from './components/Playlist/Playlist';
import { Timeline } from './components/Timeline/Timeline';
import { siteContent } from './data/siteContent';
import { useReducedMotion } from './hooks/useReducedMotion';
import styles from './App.module.css';

const navItems = [
  { id: 'momentos', label: 'Momentos' },
  { id: 'fotos', label: 'Fotos' },
  { id: 'musica', label: 'Musica' },
  { id: 'mensagem', label: 'Mensagem' },
];

function App() {
  useReducedMotion();

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Navigation initials={siteContent.initials} items={navItems} />
      <main id="conteudo" className={styles.main} tabIndex={-1}>
        <Hero content={siteContent.hero} memoji={siteContent.memojis.hero} />
        <IntroLetter content={siteContent.introduction} memoji={siteContent.memojis.letter} />
        <Timeline
          items={siteContent.timeline}
          title={siteContent.sections.timelineTitle}
          description={siteContent.sections.timelineDescription}
        />
        <PhotoCarousel
          photos={siteContent.gallery}
          title={siteContent.sections.galleryTitle}
          description={siteContent.sections.galleryDescription}
          memoji={siteContent.memojis.gallery}
        />
        <Playlist
          content={siteContent.playlist}
          title={siteContent.sections.playlistTitle}
          description={siteContent.sections.playlistDescription}
        />
        <FinalMessage message={siteContent.finalMessage} signature={siteContent.signature} />
      </main>
    </>
  );
}

export default App;
