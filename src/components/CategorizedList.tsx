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
   /** small diamond cross-link to the same entry elsewhere (e.g. the global
       timeline, or — from the timeline — back to the source list) */
   readonly crosslink?: { href: string; label: string; title?: string };
}

interface CategorizedListProps {
   readonly categories: Record<string, CatDef>;
   readonly order: string[];
   readonly items: CatItem[];
   readonly lead?: ReactNode;
   /** show a running count (newest first) in front of each entry */
   readonly numbered?: boolean;
   /** when given, the legend is split into labelled family groups whose header
       toggles the whole family at once */
   readonly groups?: { label: string; cats: string[] }[];
}

export function CategorizedList({ categories, order, items, lead, numbered, groups }: CategorizedListProps) {
   const [active, setActive] = useState<ReadonlySet<string>>(new Set());
   /* families collapsed to just their header; the group legend starts fully
      collapsed so the filter bar stays compact until you dig in */
   const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(
      () => new Set((groups ?? []).map(g => g.label)));

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

   /* the family dot selects the whole family, or clears it when already full */
   const toggleGroup = (cats: string[]) => setActive(prev => {
      const present = cats.filter(c => counts.has(c));
      const allOn = present.every(c => prev.has(c));
      const next = new Set(prev);
      for(const c of present) { if(allOn) next.delete(c); else next.add(c); }
      return next;
   });

   const toggleCollapse = (label: string) => setCollapsed(prev => {
      const next = new Set(prev);
      if(next.has(label)) next.delete(label); else next.add(label);
      return next;
   });

   /* scroll by an absolute document offset rather than scrollIntoView: the year
      rail is position:sticky, and scrollIntoView on a group whose first child is
      sticky lands inconsistently in Chromium, so the jump felt unreliable */
   const jump = (year: number) => {
      const el = document.getElementById(`y-${year}`);
      if(!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 8;
      window.scrollTo({ top, behavior: 'smooth' });
   };

   const entryHref = (key: string) => `${window.location.hash.split('?')[0]}?e=${encodeURIComponent(key)}`;

   /* running number per entry (newest first), only when numbered. numbered over
      the full list, not the filtered one, so applying a filter hides entries but
      never renumbers the ones still shown */
   const numbers = useMemo(() => {
      const ordered = [...items].sort((a, b) => (b.year - a.year) || ((b.month ?? 0) - (a.month ?? 0)));
      const m = new Map<string, number>();
      let n = ordered.length;
      for(const it of ordered) m.set(it.key, n--);
      return m;
   }, [items]);

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

   const chip = (c: string) =>
      <button key={c}
         className={`pub-legend-chip${active.has(c) ? ' active' : ''}`}
         style={{ ['--cat-color']: categories[c].color } as CSSProperties}
         aria-pressed={active.has(c)}
         title={categories[c].label}
         onClick={() => toggle(c)}>
         <span className="pub-legend-dot" />
         {categories[c].label}
         <span className="pub-legend-count">{counts.get(c)}</span>
      </button>;

   const presentGroups = groups
      ?.map(g => ({ ...g, cats: g.cats.filter(c => counts.has(c)) }))
      .filter(g => g.cats.length > 0);

   return <>
      {lead && <p className="pub-lead">{lead}</p>}
      {presentGroups
         ? <div className="pub-legend-grouped">
            {presentGroups.map(g => {
               const isCollapsed = collapsed.has(g.label);
               const allOn = g.cats.every(c => active.has(c));
               const activeN = g.cats.filter(c => active.has(c)).length;
               return <div className={`pub-legend-group${isCollapsed ? ' collapsed' : ''}${activeN ? ' filtering' : ''}`}
                  key={g.label} style={{ ['--g']: categories[g.cats[0]].color } as CSSProperties}>
                  <div className="pub-legend-grouphead">
                     <button className={`pub-legend-groupdot${allOn ? ' all' : ''}`} aria-pressed={allOn}
                        title={`Filter all ${g.label}`} onClick={() => toggleGroup(g.cats)} />
                     <button className="pub-legend-groupname" aria-expanded={!isCollapsed}
                        onClick={() => toggleCollapse(g.label)}>
                        <span className="pub-legend-grouplabel">{g.label}</span>
                        <span className="pub-legend-groupcount">{activeN || g.cats.length}</span>
                        <span className="pub-legend-chevron" aria-hidden />
                     </button>
                  </div>
                  {!isCollapsed && <div className="pub-legend-chips">{g.cats.map(chip)}</div>}
               </div>;
            })}
            {active.size > 0 &&
               <button className="pub-legend-reset" onClick={() => setActive(new Set())}>clear filters</button>}
         </div>
         : <div className="pub-legend">
            {order.filter(c => counts.has(c)).map(chip)}
            {order.filter(c => counts.has(c)).length > 1 &&
               <span className="pub-legend-mode">(matches any)</span>}
         </div>}

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
                           {(it.people || it.crosslink) &&
                              <div className="pub-authors">
                                 {it.people}
                                 {it.crosslink &&
                                    <a className="pub-crosslink" href={it.crosslink.href} title={it.crosslink.title ?? it.crosslink.label}>
                                       <span className="pub-crosslink-diamond" aria-hidden>◆</span>{it.crosslink.label}
                                    </a>}
                              </div>}
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
