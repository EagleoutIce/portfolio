import { useRef, useState, type CSSProperties } from 'react';
import type { CatDef, CatItem } from '../../components/CategorizedList';

const TypeMap = {
   'reviewing': 'Reviewer',
   'artifact-eval': 'Artifact Evaluation',
   'junior-pc': 'Junior PC',
   'local-chair': 'Local Chair',
   'web-chair': 'Web Chair'
} as const;

interface Entry {
   readonly type: keyof typeof TypeMap;
   readonly conference: string;
   readonly shortTitle: string;
   readonly year: number;
   readonly link: string;
   readonly order?: number;
   readonly note?: string;
   /** overrides the role label (e.g. a combined "Reviewer / MHFA") */
   readonly role?: string;
   /** extra line shown in the reveal once the card opens */
   readonly detail?: string;
}

const entries: Entry[] = [{
   type: 'reviewing',
   conference: 'Research Software Engineering Conference',
   shortTitle: 'RSECon \'24',
   year: 2024,
   link: 'https://rsecon24.society-rse.org/'
}, {
   type: 'artifact-eval',
   conference: 'International Conference on Software Language Engineering',
   shortTitle: 'SLE \'25',
   year: 2025,
   link: 'https://conf.researchr.org/committee/sle-2025/sle-2025-papers-artifact-evaluation-committee'
}, {
   type: 'artifact-eval',
   conference: 'International Conference on Software Language Engineering',
   shortTitle: 'SLE \'26',
   year: 2026,
   order: 6,
   link: 'https://conf.researchr.org/home/sle-2026#Call-for-Artifacts'
}, {
   type: 'reviewing',
   conference: 'Research Software Engineering Conference',
   shortTitle: 'RSECon \'25',
   year: 2025,
   link: 'https://rsecon25.society-rse.org/'
}, {
   type: 'junior-pc',
   conference: 'International Conference on Mining Software Repositories',
   shortTitle: 'MSR \'26',
   year: 2026,
   order: 1,
   link: 'https://2026.msrconf.org/committee/msr-2026-junior-pc-technical-papers---junior-program-committee'
}, {
   type: 'artifact-eval',
   conference: 'European Conference on Object-Oriented Programming',
   shortTitle: 'ECOOP \'26',
   year: 2026,
   order: 2,
   link: 'https://2026.ecoop.org/committee/ecoop-2026-artifact-evaluation-artifact-evaluation-committee'
}, {
   type: 'artifact-eval',
   conference: 'International Conference on Systems, Programming, Languages and Applications: Software for Humanity',
   shortTitle: 'OOPSLA \'26',
   year: 2026,
   order: 3,
   note: '1&2',
   link: 'https://2026.splashcon.org/committee/splash-2026-artifact-evaluation-artifact-evaluation-committee'
}, {
   type: 'artifact-eval',
   conference: 'Static Analysis Symposium',
   shortTitle: 'SAS \'26',
   year: 2026,
   order: 4,
   link: 'https://conf.researchr.org/home/splash-issta-2026/sas-2026'
}, {
   type: 'reviewing',
   conference: 'Research Software Engineering Conference',
   shortTitle: 'RSECon \'26',
   year: 2026,
   order: 5,
   role: 'Reviewer & MHFA & Awards',
   detail: 'Additionally volunteering as a Mental Health First Aid (MHFA) responder and serving as an awards reviewer.',
   link: 'https://rsecon26.society-rse.org/'
}, {
   type: 'reviewing',
   conference: 'International Conference on Systems, Programming, Languages and Applications: Software for Humanity (Educational Track)',
   shortTitle: 'SPLASH-E \'26',
   year: 2026,
   order: 10,
   link: 'https://2026.splashcon.org/committee/splash-2026-splash-e-program-committee'
}, {
   type: 'local-chair',
   conference: 'Frühjahrstagung der Deutschsprachigen Anwendervereinigung TeX',
   shortTitle: 'DANTE \'27',
   year: 2027,
   link: 'https://www.dante.de/veranstaltungen/dante2027/'
}, {
   type: 'artifact-eval',
   conference: 'International Conference on Automated Software Engineering',
   shortTitle: 'ASE \'26',
   year: 2026,
   order: 7,
   link: 'https://conf.researchr.org/home/ase-2026'
}, {
   type: 'artifact-eval',
   conference: 'International Symposium on Software Testing and Analysis',
   shortTitle: 'ISSTA \'26',
   year: 2026,
   order: 8,
   link: 'https://conf.researchr.org/home/issta-2026'
}, {
   type: 'web-chair',
   conference: 'International Conference on Systems, Programming, Languages and Applications: Software for Humanity',
   shortTitle: 'SPLASH \'27',
   year: 2027,
   order: 1,
   link: 'https://2027.splashcon.org/'
}];


/* the top-of-page summary groups service by the same high-level categories as
   the section filters, so Junior PC folds into Reviewer and the chair roles
   (Local/Web) collapse into a single "Chair" badge instead of listing apart */
export function getServiceRoleInfo(): Array<{ abbr: string; full: string; count: number; confs: string[]; }> {
   const byCat = new Map<ServiceCategory, { count: number; confs: string[]; }>();
   for(const entry of entries.toSorted((a, b) => b.year - a.year)) {
      const cat = typeToCategory[entry.type];
      if(!byCat.has(cat)) byCat.set(cat, { count: 0, confs: [] });
      const r = byCat.get(cat)!;
      r.count++;
      r.confs.push(entry.shortTitle);
   }
   return (Object.keys(CategoryMap) as ServiceCategory[])
      .filter(k => byCat.has(k))
      .map(k => ({
         abbr: CategoryMap[k].abbr,
         full: CategoryMap[k].full,
         ...byCat.get(k)!,
         confs: byCat.get(k)!.confs.toSorted((a, b) => a.localeCompare(b)),
      }));
}

const SERVICE_CATEGORIES: Record<ServiceCategory, CatDef> = {
   reviewer: { label: 'Reviewer', short: 'REV', color: '#3b7bb8' },
   'artifact-eval': { label: 'Artifact Evaluation', short: 'AE', color: '#4f8a5b' },
   chair: { label: 'Chair', short: 'CHR', color: '#b8873b' },
};

export function getServiceList(): { categories: Record<string, CatDef>; order: string[]; items: CatItem[] } {
   const items: CatItem[] = entries.map((e, i) => ({
      key: `svc-${e.shortTitle}-${e.role ?? e.type}-${i}`,
      category: typeToCategory[e.type],
      year: e.year,
      title: e.conference,
      people: e.role ?? TypeMap[e.type],
      venue: e.shortTitle,
      links: [{ label: 'link', href: e.link }],
      extra: e.detail,
   }));
   return { categories: SERVICE_CATEGORIES, order: ['reviewer', 'artifact-eval', 'chair'], items };
}

export function ServiceSummary() {
   const [showOlder, setShowOlder] = useState(false);
   const byYear = new Map<number, Map<ServiceCategory, number>>();
   for(const entry of entries) {
      if(!byYear.has(entry.year)) byYear.set(entry.year, new Map());
      const catMap = byYear.get(entry.year)!;
      const cat = typeToCategory[entry.type];
      catMap.set(cat, (catMap.get(cat) ?? 0) + 1);
   }

   const renderYear = (year: number): JSX.Element[] => {
      const nodes: JSX.Element[] = [<div key={`year-${year}`} className="conf-year-banner">• {year}</div>];
      for(const cat of Object.keys(CategoryMap) as ServiceCategory[]) {
         const count = byYear.get(year)!.get(cat);
         if(!count) continue;
         nodes.push(
            <span key={`service-${year}-${cat}`} className="conf-entry">
               <span className='conf-count'>{count}×</span>
               {CategoryMap[cat].abbr}
            </span>
         );
      }
      return nodes;
   };

   const years = Array.from(byYear.keys()).sort((a, b) => b - a);
   const recent = years.slice(0, 2);
   const older = years.slice(2);

   return <div className='bib-summary-children'>
      {recent.flatMap(renderYear)}
      {showOlder && older.flatMap(renderYear).map(n => <span key={`older-${n.key}`} className='bib-summary-older'>{n}</span>)}
      {older.length > 0 &&
         <button type='button' className='bib-summary-toggle' aria-expanded={showOlder} onClick={() => setShowOlder(v => !v)}>
            {showOlder ? 'show fewer' : `${older.length} earlier ${older.length === 1 ? 'year' : 'years'}`}
            <span className='bib-summary-toggle-chevron' />
         </button>}
   </div>;
}

export type ServiceType = keyof typeof TypeMap;

/* higher-level filter categories: several related roles collapse into one
   toggle (Junior PC counts as reviewing, all chair roles as "Chair") */
const CategoryMap = {
   'reviewer': { full: 'Reviewer', abbr: 'Reviewer', types: ['reviewing', 'junior-pc'] },
   'artifact-eval': { full: 'Artifact Evaluation', abbr: 'AE', types: ['artifact-eval'] },
   'chair': { full: 'Chair', abbr: 'Chair', types: ['local-chair', 'web-chair'] },
} as const satisfies Record<string, { full: string; abbr: string; types: readonly ServiceType[] }>;

export type ServiceCategory = keyof typeof CategoryMap;

const typeToCategory = (() => {
   const map = {} as Record<ServiceType, ServiceCategory>;
   for(const key of Object.keys(CategoryMap) as ServiceCategory[]) {
      for(const t of CategoryMap[key].types) {
         map[t] = key;
      }
   }
   return map;
})();

/** filter categories present in the data with their totals, in display order */
export function getServiceTypes(): Array<{ key: ServiceCategory; full: string; count: number }> {
   const counts = new Map<ServiceCategory, number>();
   for(const e of entries) {
      const cat = typeToCategory[e.type];
      counts.set(cat, (counts.get(cat) ?? 0) + 1);
   }
   return (Object.keys(CategoryMap) as ServiceCategory[])
      .filter(k => counts.has(k))
      .map(k => ({ key: k, full: CategoryMap[k].full, count: counts.get(k)! }));
}

/** one compact card: role + conference pill, full name revealed on hover */
function serviceCard({ type, conference, shortTitle, link, note, role, detail }: Entry, age: number) {
   // fade gently with age; upcoming (not-yet-happened) entries are dimmed too
   const opacity = age < 0 ? 0.75 : Math.max(0.55, 1 - age * 0.12);
   return <li key={`${shortTitle}-${role ?? type}`}>
      <a href={link} target="_blank" rel="noreferrer" style={{ ['--card-opacity']: opacity } as CSSProperties}>
         <span className='service-card-top'>
            <span className='service-role'>{role ?? TypeMap[type]}</span>
            <span className='service-conf'>
               {shortTitle.replace(/\s*'\d{2}$/, '')}{note && <span className='service-note'> ({note})</span>}
            </span>
         </span>
         <span className='service-reveal'>
            <span className='service-conference' title={conference}>
               {conference}{detail && <span className='service-detail'>{detail}</span>}
            </span>
         </span>
      </a>
   </li>;
}

/* the cards of one year. hovering a card reveals the full names of every card
   that shares its visual row (same offsetTop), so a wrapped grid expands one
   row at a time instead of the whole year */
function ServiceGrid({ entries, age }: { entries: Entry[]; age: number }) {
   const ref = useRef<HTMLUListElement>(null);

   const highlightRow = (target: HTMLElement | null) => {
      const ul = ref.current;
      if(!ul) return;
      const top = target ? target.offsetTop : null;
      for(const li of Array.from(ul.children) as HTMLElement[]) {
         li.classList.toggle('row-hover', top !== null && li.offsetTop === top);
      }
   };

   return <ul className='service-grid' ref={ref}
      onMouseMove={e => highlightRow((e.target as HTMLElement).closest('li'))}
      onMouseLeave={() => highlightRow(null)}>
      {entries.map(e => serviceCard(e, age))}
   </ul>;
}

/** a whole year, its label on the left rail and its cards to the right */
function serviceYearGroup(year: number, es: Entry[], age: number) {
   return <section className='service-year-group' key={`yg-${year}`}>
      <div className='service-year-head'>{year}</div>
      <ServiceGrid entries={es} age={age} />
   </section>;
}

export function getService(cats?: ReadonlySet<ServiceCategory>) {
   const now = new Date();
   const nowFraction = now.getFullYear() + now.getMonth() / 12;

   const sorted = entries
      .filter(e => !cats || cats.size === 0 || cats.has(typeToCategory[e.type]))
      .toSorted((a, b) => {
         if(b.year - a.year !== 0) return b.year - a.year;
         if((a.order ?? 0) - (b.order ?? 0) !== 0) return (b.order ?? 0) - (a.order ?? 0);
         return a.conference.localeCompare(b.conference);
      });

   // group by year (desc) so the timeline reads in strict chronological order
   const byYear = new Map<number, Entry[]>();
   for(const e of sorted) {
      if(!byYear.has(e.year)) byYear.set(e.year, []);
      byYear.get(e.year)!.push(e);
   }

   // keep recent service in view, collapse whole years older than 2 years
   const current: JSX.Element[] = [];
   const older: JSX.Element[] = [];
   let olderCount = 0;
   for(const [year, es] of byYear) {
      const age = nowFraction - year;
      if(age > 2) {
         older.push(serviceYearGroup(year, es, age));
         olderCount += es.length;
      } else {
         current.push(serviceYearGroup(year, es, age));
      }
   }
   return { current, older, olderCount };
}
