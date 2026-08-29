import memojiCool from '../assets/primeira.png';
import memojiPlayful from '../assets/segunda.png';
import memojiWink from '../assets/terceira.png';

export interface PhotoContent {
  src: string;
  alt: string;
  caption?: string;
  placeholder: string;
}

export interface MemojiAccentContent {
  src: string;
  label: string;
}

export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  photo?: PhotoContent;
}

export interface PlaylistContent {
  provider: 'spotify' | 'youtube';
  embedUrl: string;
  title: string;
  description?: string;
  externalUrl?: string;
}

export interface SiteContent {
  initials: string;
  meta: {
    title: string;
    description: string;
  };
  memojis: {
    hero: MemojiAccentContent;
    letter: MemojiAccentContent;
    gallery: MemojiAccentContent;
  };
  sections: {
    timelineTitle: string;
    timelineDescription: string;
    galleryTitle: string;
    galleryDescription: string;
    playlistTitle: string;
    playlistDescription: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle?: string;
    photo: PhotoContent;
  };
  introduction: {
    title: string;
    text: string;
  };
  timeline: TimelineItem[];
  gallery: PhotoContent[];
  playlist: PlaylistContent;
  finalMessage: string;
  signature: string;
}

export const siteContent: SiteContent = {
  initials: '[INICIAIS]',
  meta: {
    title: '[TITULO EDITAVEL DO SITE]',
    description: '[DESCRICAO EDITAVEL DO SITE]',
  },
  memojis: {
    hero: {
      src: memojiCool,
      label: 'Memoji decorativo com oculos coloridos',
    },
    letter: {
      src: memojiWink,
      label: 'Memoji decorativo piscando',
    },
    gallery: {
      src: memojiPlayful,
      label: 'Memoji decorativo sorrindo',
    },
  },
  sections: {
    timelineTitle: '[TITULO DA LINHA DO TEMPO]',
    timelineDescription: '[TEXTO CURTO PARA APRESENTAR OS MOMENTOS]',
    galleryTitle: '[TITULO DA GALERIA]',
    galleryDescription: '[TEXTO CURTO PARA APRESENTAR AS FOTOS]',
    playlistTitle: '[TITULO DA SECAO DE MUSICA]',
    playlistDescription: '[TEXTO CURTO PARA APRESENTAR A PLAYLIST]',
  },
  hero: {
    eyebrow: '[PEQUENA FRASE ACIMA DO TITULO]',
    title: '[FRASE CURTA DE ABERTURA]',
    subtitle: '[SUBTEXTO OPCIONAL]',
    photo: {
      src: '',
      alt: '[DESCRICAO DA FOTO PRINCIPAL]',
      placeholder: 'FOTO PRINCIPAL',
      caption: '[LEGENDA OPCIONAL]',
    },
  },
  introduction: {
    title: '[TITULO DA INTRODUCAO]',
    text: '[EXPLIQUE AQUI POR QUE VOCE CRIOU ESTA PAGINA]',
  },
  timeline: [
    {
      date: '[DATA OU PERIODO 01]',
      title: '[TITULO DO MOMENTO]',
      description: '[LEMBRANCA CURTA]',
      photo: {
        src: '',
        alt: '[DESCRICAO DA FOTO DO MOMENTO 01]',
        placeholder: 'FOTO DO MOMENTO 01',
      },
    },
    {
      date: '[DATA OU PERIODO 02]',
      title: '[TITULO DO MOMENTO]',
      description: '[LEMBRANCA CURTA]',
    },
    {
      date: '[DATA OU PERIODO 03]',
      title: '[TITULO DO MOMENTO]',
      description: '[LEMBRANCA CURTA]',
      photo: {
        src: '',
        alt: '[DESCRICAO DA FOTO DO MOMENTO 03]',
        placeholder: 'FOTO DO MOMENTO 03',
      },
    },
  ],
  gallery: [
    {
      src: '',
      alt: '[DESCRICAO DA FOTO 01]',
      placeholder: 'FOTO 01',
      caption: '[LEGENDA OPCIONAL]',
    },
    {
      src: '',
      alt: '[DESCRICAO DA FOTO 02]',
      placeholder: 'FOTO 02',
      caption: '[LEGENDA OPCIONAL]',
    },
    {
      src: '',
      alt: '[DESCRICAO DA FOTO 03]',
      placeholder: 'FOTO 03',
      caption: '[LEGENDA OPCIONAL]',
    },
    {
      src: '',
      alt: '[DESCRICAO DA FOTO 04]',
      placeholder: 'FOTO 04',
      caption: '[LEGENDA OPCIONAL]',
    },
  ],
  playlist: {
    provider: 'spotify',
    embedUrl: '',
    externalUrl: '',
    title: '[TITULO DA PLAYLIST]',
    description: '[TEXTO OPCIONAL SOBRE A PLAYLIST]',
  },
  finalMessage: '[MENSAGEM FINAL]',
  signature: '[ASSINATURA OU INICIAIS]',
};

// Substitua os textos entre colchetes pelos textos reais antes de publicar.
// Para fotos, coloque os arquivos em public/photos e use caminhos como "/photos/nome.webp".
// Deixe src vazio enquanto nao houver foto; o site renderiza placeholders elegantes.
// Para a playlist, cole apenas URLs de embed publicas do Spotify ou YouTube, sem chaves ou APIs.
// Os memojis sao decorativos; troque os imports acima se quiser substituir as imagens.
