import clsx from 'clsx';
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

export function Navigation({ initials, items }: NavigationProps) {
  const sectionIds = useMemo(() => items.map((item) => item.id), [items]);
  const activeSection = useActiveSection(sectionIds);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navegação principal">
        <a className={styles.brand} href="#topo" aria-label="Voltar ao início">
          {initials}
        </a>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id}>
              <a
                className={clsx(styles.link, activeSection === item.id && styles.active)}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? 'location' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
