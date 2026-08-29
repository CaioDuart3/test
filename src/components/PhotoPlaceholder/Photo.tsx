import { type PhotoContent } from '../../data/siteContent';
import { PhotoPlaceholder } from './PhotoPlaceholder';

interface PhotoProps {
  photo: PhotoContent;
  className?: string;
  imageClassName?: string;
  compact?: boolean;
  loading?: 'eager' | 'lazy';
}

export function Photo({ photo, className, imageClassName, compact, loading = 'lazy' }: PhotoProps) {
  if (!photo.src) {
    return (
      <PhotoPlaceholder
        className={className}
        compact={compact}
        label={photo.placeholder}
        caption={photo.caption}
      />
    );
  }

  return (
    <figure className={className}>
      <img
        className={imageClassName}
        src={photo.src}
        alt={photo.alt}
        loading={loading}
        decoding="async"
      />
      {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
    </figure>
  );
}
