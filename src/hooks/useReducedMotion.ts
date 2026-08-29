import { useEffect, useState } from 'react';

const query = '(prefers-reduced-motion: reduce)';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => {
      setPrefersReducedMotion(media.matches);
      document.documentElement.classList.toggle('reduce-motion', media.matches);
    };

    update();
    media.addEventListener('change', update);

    return () => {
      media.removeEventListener('change', update);
      document.documentElement.classList.remove('reduce-motion');
    };
  }, []);

  return prefersReducedMotion;
}
