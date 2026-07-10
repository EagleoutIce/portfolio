import type { CSSProperties } from 'react';

const TypeMap = {
   'reviewing': 'Reviewer',
   'artifact-eval': 'Artifact Evaluation',
   'junior-pc': 'Junior PC',
   'local-chair': 'Local Chair',
   'web-chair': 'Web Chair'
} as const;

const TypeDisplayMap = {
   'reviewing': { abbr: 'Reviewer', full: TypeMap['reviewing'] },
   'artifact-eval': { abbr: 'AEC', full: TypeMap['artifact-eval'] },
   'junior-pc': { abbr: 'Junior PC', full: TypeMap['junior-pc'] },
   'local-chair': { abbr: 'LC', full: TypeMap['local-chair'] },
   'web-chair': { abbr: 'Web', full: TypeMap['web-chair'] },
} as const;

interface Entry {
   readonly type: keyof typeof TypeMap;
   readonly conference: string;
   readonly shortTitle: string;
   readonly year: number;
   readonly link: string;
   readonly order?: number;
   readonly note?: string;
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


export function getServiceRoleInfo(): Array<{ abbr: string; full: string; count: number; confs: string[]; }> {
   const byType = new Map<keyof typeof TypeMap, { count: number; confs: string[]; }>();
   for(const entry of entries.toSorted((a, b) => b.year - a.year)) {
      if(!byType.has(entry.type)) byType.set(entry.type, { count: 0, confs: [] });
      const r = byType.get(entry.type)!;
      r.count++;
      r.confs.push(entry.shortTitle);
   }
   return (Object.keys(TypeDisplayMap) as (keyof typeof TypeDisplayMap)[])
      .filter(k => byType.has(k))
      .map(k => ({ ...TypeDisplayMap[k], ...byType.get(k)!, confs: byType.get(k)!.confs.toSorted((a, b) => a.localeCompare(b)) }));
}

export function getServiceSummary() {
   const byYear = new Map<number, Map<ServiceCategory, number>>();
   for(const entry of entries) {
      if(!byYear.has(entry.year)) byYear.set(entry.year, new Map());
      const catMap = byYear.get(entry.year)!;
      const cat = typeToCategory[entry.type];
      catMap.set(cat, (catMap.get(cat) ?? 0) + 1);
   }

   const children: JSX.Element[] = [];
   for(const year of Array.from(byYear.keys()).sort((a, b) => b - a)) {
      children.push(<div key={`year-${year}`} className="conf-year-banner">• {year}</div>);
      for(const cat of Object.keys(CategoryMap) as ServiceCategory[]) {
         const count = byYear.get(year)!.get(cat);
         if(!count) continue;
         children.push(
            <span key={`service-${year}-${cat}`} className="conf-entry">
               <span className='conf-count'>{count}×</span>
               {CategoryMap[cat].abbr}
            </span>
         );
      }
   }
   return <div className='bib-summary-children'>{children}</div>;
}

export type ServiceType = keyof typeof TypeMap;

/* higher-level filter categories: several related roles collapse into one
   toggle (Junior PC counts as reviewing, all chair roles as "Chair") */
const CategoryMap = {
   'reviewer': { full: 'Reviewer', abbr: 'Reviewer', types: ['reviewing', 'junior-pc'] },
   'artifact-eval': { full: 'Artifact Evaluation', abbr: 'AEC', types: ['artifact-eval'] },
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
function serviceCard({ type, conference, shortTitle, link, note }: Entry, age: number) {
   // fade gently with age; upcoming (not-yet-happened) entries are dimmed too
   const opacity = age < 0 ? 0.75 : Math.max(0.55, 1 - age * 0.12);
   return <li key={shortTitle}>
      <a href={link} target="_blank" rel="noreferrer" style={{ ['--card-opacity']: opacity } as CSSProperties}>
         <span className='service-card-top'>
            <span className='service-role'>{TypeMap[type]}</span>
            <span className='service-conf'>
               {shortTitle.replace(/\s*'\d{2}$/, '')}{note && <span className='service-note'> ({note})</span>}
            </span>
         </span>
         <span className='service-reveal'>
            <span className='service-conference' title={conference}>{conference}</span>
         </span>
      </a>
   </li>;
}

/** a whole year, its label on the left rail and its cards to the right */
function serviceYearGroup(year: number, es: Entry[], age: number) {
   return <section className='service-year-group' key={`yg-${year}`}>
      <div className='service-year-head'>{year}</div>
      <ul className='service-grid'>
         {es.map(e => serviceCard(e, age))}
      </ul>
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
