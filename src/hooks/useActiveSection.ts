import { useEffect, useRef, useState } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');
  // Keep a ref to the latest sectionIds so the scroll handler stays current
  const idsRef = useRef(sectionIds);
  useEffect(() => {
    idsRef.current = sectionIds;
  }, [sectionIds]);

  useEffect(() => {
    function getActive(): string {
      const ids = idsRef.current;
      const viewportMid = window.scrollY + window.innerHeight * 0.4;

      let closest = ids[0] ?? '';
      let closestDist = Infinity;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const dist = Math.abs(top - viewportMid);
        if (dist < closestDist) {
          closestDist = dist;
          closest = id;
        }
      }

      return closest;
    }

    // Run once on mount to set the correct initial active section
    setActiveSection(getActive());

    let rafId: number;
    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setActiveSection(getActive());
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []); // empty — idsRef keeps it fresh without re-subscribing

  return activeSection;
}
