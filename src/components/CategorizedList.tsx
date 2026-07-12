import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import '../pages/publications/PublicationsPage.css';

export interface CatDef {
   readonly label: string;
   readonly short: string;
   readonly color: string;
}

export interface CatItem {
   readonly key: string;
   readonly category: string;
   readonly year: number;
   /** used to order entries within a year (newest month first) */
   readonly month?: number;
   readonly title: ReactNode;
   readonly people?: ReactNode;
   readonly venue?: ReactNode;
   readonly links?: { label: string; href: string }[];
   readonly extra?: ReactNode;
}

interface CategorizedListProps {
   readonly categories: Record<string, CatDef>;
   readonly order: string[];
   readonly items: CatItem[];
   readonly lead?: ReactNode;
   /** show a running count (newest first) in front of each entry */
   readonly numbered?: boolean;
}

export function CategorizedList({ categories, order, items, lead, numbered }: CategorizedListProps) {
   const [active, setActive] = useState<ReadonlySet<string>>(new Set());

   const counts = useMemo(() => {
      const c = new Map<string, number>();
      for(const it of items) c.set(it.category, (c.get(it.category) ?? 0) + 1);
      return c;
   }, [items]);

   const shown = items.filter(it => active.size === 0 || active.has(it.category));

   const byYear = useMemo(() => {
      const m = new Map<number, CatItem[]>();
      for(const it of shown) {
         if(!m.has(it.year)) m.set(it.year, []);
         m.get(it.year)!.push(it);
      }
      for(const list of m.values()) {
         list.sort((a, b) => (b.month ?? 0) - (a.month ?? 0));
      }
      return Array.from(m.entries()).sort((a, b) => b[0] - a[0]);
   }, [shown]);

   const toggle = (c: string) => setActive(prev => {
      const next = new Set(prev);
      if(next.has(c)) next.delete(c); else next.add(c);
      return next;
   });

   const jump = (year: number) =>
      document.getElementById(`y-${year}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

   const entryHref = (key: string) => `${window.location.hash.split('?')[0]}?e=${encodeURIComponent(key)}`;

   /* running number per entry (newest first), only when numbered */
   const numbers = useMemo(() => {
      const m = new Map<string, number>();
      let n = shown.length;
      for(const [, entries] of byYear) for(const it of entries) m.set(it.key, n--);
      return m;
   }, [byYear, shown.length]);

   /* deep-link: #/all-…?e=<key> scrolls to that entry, unfolds its details,
      and briefly highlights it */
   useEffect(() => {
      const query = window.location.hash.split('?')[1];
      const target = query ? new URLSearchParams(query).get('e') : null;
      if(!target) return;
      const el = document.getElementById(`e-${target}`);
      if(!el) return;
      el.querySelectorAll('details').forEach(d => { d.open = true; });
      requestAnimationFrame(() => {
         el.scrollIntoView({ block: 'start' });
         el.classList.add('pub-entry-flash');
      });
   }, []);

   return <>
      {lead && <p className="pub-lead">{lead}</p>}
      <div className="pub-legend">
         {order.filter(c => counts.has(c)).map(c =>
            <button key={c}
               className={`pub-legend-chip${active.has(c) ? ' active' : ''}`}
               style={{ ['--cat-color']: categories[c].color } as CSSProperties}
               aria-pressed={active.has(c)}
               onClick={() => toggle(c)}>
               <span className="pub-legend-dot" />
               {categories[c].label}
               <span className="pub-legend-count">{counts.get(c)}</span>
            </button>
         )}
         {order.filter(c => counts.has(c)).length > 1 &&
            <span className="pub-legend-mode">(matches any)</span>}
      </div>

      <div className="pub-list">
         {byYear.map(([year, entries], i) =>
            <section className="pub-year-group" id={`y-${year}`} key={year}>
               <div className="pub-year">
                  {i > 0 &&
                     <button className="pub-year-nav up" aria-label="Previous (newer) year"
                        onClick={() => jump(byYear[i - 1][0])} />}
                  <span className="pub-year-label">{year}</span>
                  {i < byYear.length - 1 &&
                     <button className="pub-year-nav down" aria-label="Next (older) year"
                        onClick={() => jump(byYear[i + 1][0])} />}
               </div>
               <ul className="pub-year-entries">
                  {entries.map(it =>
                     <li className="pub-entry" id={`e-${it.key}`} key={it.key} style={{ ['--cat-color']: categories[it.category].color } as CSSProperties}>
                        <div className="pub-tagcol">
                           <a className="pub-tag" href={entryHref(it.key)} title={`${categories[it.category].label} (link to this entry)`}>{categories[it.category].short}</a>
                           {numbered && <span className="pub-num">{numbers.get(it.key)}</span>}
                        </div>
                        <div className="pub-body">
                           <div className="pub-entry-title">{it.title}</div>
                           {it.people && <div className="pub-authors">{it.people}</div>}
                           {(it.venue || (it.links && it.links.length > 0)) &&
                              <div className="pub-meta">
                                 {it.venue && <span className="pub-venue">{it.venue}</span>}
                                 {it.links && it.links.length > 0 &&
                                    <span className="pub-links">
                                       {it.links.map(l =>
                                          <a key={l.href} className="pub-link" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
                                       )}
                                    </span>}
                              </div>}
                           {it.extra && <div className="pub-extra">{it.extra}</div>}
                        </div>
                     </li>
                  )}
               </ul>
            </section>
         )}
      </div>
   </>;
}
