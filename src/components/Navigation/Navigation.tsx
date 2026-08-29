import clsx from 'clsx';
import { Camera, Heart, MessageCircleHeart, Music, Sparkles } from 'lucide-react';
import { useMemo } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection';
import styles from './Navigation.module.css';

interface NavItem {
  id: string;
  label: string;
}

interface NavigationProps {
  initials: string;
  items: NavItem[];
}

const NAV_ICONS: Record<string, React.ReactNode> = {
  momentos: <Sparkles aria-hidden="true" size={13} />,
  fotos: <Camera aria-hidden="true" size={13} />,
  musica: <Music aria-hidden="true" size={13} />,
  mensagem: <MessageCircleHeart aria-hidden="true" size={13} />,
};

export function Navigation({ initials, items }: NavigationProps) {
  const sectionIds = useMemo(() => items.map((item) => item.id), [items]);
  const activeSection = useActiveSection(sectionIds);

  return (
    <header className={styles.header}>
      <nav className={styles.pill} aria-label="Navegação principal">
        <a className={styles.brand} href="#topo" aria-label="Voltar ao início">
          <Heart aria-hidden="true" size={15} strokeWidth={2.5} />
          {initials}
        </a>

        <div className={styles.divider} aria-hidden="true" />

        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id}>
              <a
                className={clsx(styles.link, activeSection === item.id && styles.active)}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? 'location' : undefined}
              >
                {NAV_ICONS[item.id]}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
