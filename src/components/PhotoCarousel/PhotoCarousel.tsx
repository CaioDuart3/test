import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { type PhotoContent } from '../../data/siteContent';
import { Photo } from '../PhotoPlaceholder/Photo';
import { Reveal } from '../Reveal/Reveal';
import styles from './PhotoCarousel.module.css';

interface PhotoCarouselProps {
  photos: PhotoContent[];
  title: string;
  description: string;
}

export function PhotoCarousel({ photos, title, description }: PhotoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateState = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return undefined;
    }

    updateState();
    emblaApi.on('select', updateState);
    emblaApi.on('reInit', updateState);

    return () => {
      emblaApi.off('select', updateState);
      emblaApi.off('reInit', updateState);
    };
  }, [emblaApi, updateState]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollPrev();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollNext();
    }
  };

  return (
    <section id="fotos" className={styles.section} aria-labelledby="gallery-title">
      <div className="section-shell">
        <Reveal>
          <div className={styles.heading}>
            <div>
              <span className="section-kicker">04 / fotos</span>
              <h2 id="gallery-title">{title}</h2>
            </div>
            <p>{description}</p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className={styles.carousel} onKeyDown={handleKeyDown}>
            <div className={styles.viewport} ref={emblaRef}>
              <div className={styles.container}>
                {photos.map((photo, index) => (
                  <div className={styles.slide} key={`${photo.placeholder}-${index}`}>
                    <Photo photo={photo} className={styles.photo} imageClassName={styles.image} />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.controls}>
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Foto anterior"
              >
                <ArrowLeft aria-hidden="true" size={18} />
              </button>
              <p className={styles.counter} aria-live="polite" aria-atomic="true">
                {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                {String(photos.length).padStart(2, '0')}
              </p>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Próxima foto"
              >
                <ArrowRight aria-hidden="true" size={18} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
