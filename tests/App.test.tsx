import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import { PhotoCarousel } from '../src/components/PhotoCarousel/PhotoCarousel';
import { Playlist } from '../src/components/Playlist/Playlist';
import { Timeline } from '../src/components/Timeline/Timeline';
import { siteContent } from '../src/data/siteContent';

describe('site romântico editorial', () => {
  it('renderiza placeholders quando as imagens estão vazias', () => {
    render(<App />);

    expect(screen.getByRole('img', { name: 'FOTO PRINCIPAL' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'FOTO 01' })).toBeInTheDocument();
    expect(
      screen.queryByRole('img', { name: '[DESCRICAO DA FOTO PRINCIPAL]' }),
    ).not.toBeInTheDocument();
  });

  it('renderiza a linha do tempo com datas, títulos e marcadores', () => {
    render(
      <Timeline
        items={siteContent.timeline}
        title={siteContent.sections.timelineTitle}
        description={siteContent.sections.timelineDescription}
      />,
    );

    expect(
      screen.getByRole('heading', { name: siteContent.sections.timelineTitle }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('[DATA OU PERIODO 01]')[0]).toBeInTheDocument();
    expect(screen.getAllByText('[TITULO DO MOMENTO]')).toHaveLength(3);
  });

  it('expõe navegação por âncoras', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: 'Momentos' })).toHaveAttribute('href', '#momentos');
    expect(screen.getByRole('link', { name: 'Fotos' })).toHaveAttribute('href', '#fotos');
    expect(screen.getByRole('link', { name: 'Musica' })).toHaveAttribute('href', '#musica');
    expect(screen.getByRole('link', { name: 'Mensagem' })).toHaveAttribute('href', '#mensagem');
  });

  it('mantém o carrossel controlável por botões e teclado', async () => {
    const user = userEvent.setup();
    render(
      <PhotoCarousel
        photos={siteContent.gallery}
        title={siteContent.sections.galleryTitle}
        description={siteContent.sections.galleryDescription}
      />,
    );

    const carousel = screen.getByRole('region', { name: siteContent.sections.galleryTitle });
    expect(within(carousel).getByText('01 / 04')).toBeInTheDocument();
    expect(within(carousel).getByRole('button', { name: 'Foto anterior' })).toBeInTheDocument();
    await user.keyboard('{ArrowRight}');
    expect(within(carousel).getByRole('button', { name: 'Próxima foto' })).toBeInTheDocument();
  });

  it('não renderiza iframe de playlist quando o embed está vazio', () => {
    render(
      <Playlist
        content={siteContent.playlist}
        title={siteContent.sections.playlistTitle}
        description={siteContent.sections.playlistDescription}
      />,
    );

    expect(screen.getByRole('img', { name: 'Placeholder da playlist' })).toBeInTheDocument();
    expect(screen.queryByTitle(`Playlist: ${siteContent.playlist.title}`)).not.toBeInTheDocument();
  });

  it('bloqueia embed com autoplay explícito', () => {
    render(
      <Playlist
        content={{
          ...siteContent.playlist,
          embedUrl: 'https://open.spotify.com/embed/playlist/test?autoplay=1',
        }}
        title={siteContent.sections.playlistTitle}
        description={siteContent.sections.playlistDescription}
      />,
    );

    expect(screen.getByRole('img', { name: 'Placeholder da playlist' })).toBeInTheDocument();
    expect(screen.queryByTitle(`Playlist: ${siteContent.playlist.title}`)).not.toBeInTheDocument();
  });

  it('aplica estado de redução de movimento no documento', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<App />);

    expect(document.documentElement).toHaveClass('reduce-motion');
  });
});
