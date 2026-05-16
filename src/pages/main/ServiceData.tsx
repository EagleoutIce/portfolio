const TypeMap = {
   'reviewing':     'Reviewer',
   'artifact-eval': 'Artifact Evaluation',
   'junior-pc':     'Junior PC',
   'local-chair':   'Local Chair'
} as const

const TypeDisplayMap = {
   'reviewing':     { abbr: 'Reviewer',  full: TypeMap['reviewing']     },
   'artifact-eval': { abbr: 'AEC',   full: TypeMap['artifact-eval'] },
   'junior-pc':     { abbr: 'Junior PC',   full: TypeMap['junior-pc']     },
   'local-chair':   { abbr: 'Local Chair',    full: TypeMap['local-chair']   },
} as const

interface Entry {
   readonly type:       keyof typeof TypeMap;
   readonly conference: string;
   readonly shortTitle: string;
   readonly year:       number;
   readonly link:       string;
   readonly order?:     number;
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
   order: 5,
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
   conference: ' European Conference on Object-Oriented Programming',
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
},  {
   type: 'reviewing',
   conference: 'Research Software Engineering Conference',
   shortTitle: 'RSECon \'26',
   year: 2026,
   order: 4,
   link: 'https://rsecon26.society-rse.org/'
}, {
   type: 'local-chair',
   conference: 'Frühjahrstagung der Deutschsprachigen Anwendervereinigung TeX',
   shortTitle: 'DANTE \'27',
   year: 2027,
   link: 'https://www.dante.de/veranstaltungen/dante2027/'
}]


export function getServiceRoleInfo(): Array<{ abbr: string; full: string; count: number; confs: string[] }> {
   const byType = new Map<keyof typeof TypeMap, { count: number; confs: string[] }>();
   for (const entry of entries.toSorted((a, b) => b.year - a.year)) {
      if (!byType.has(entry.type)) byType.set(entry.type, { count: 0, confs: [] });
      const r = byType.get(entry.type)!;
      r.count++;
      r.confs.push(entry.shortTitle);
   }
   return (Object.keys(TypeDisplayMap) as (keyof typeof TypeDisplayMap)[])
      .filter(k => byType.has(k))
      .map(k => ({ ...TypeDisplayMap[k], ...byType.get(k)!, confs: byType.get(k)!.confs.toSorted((a, b) => a.localeCompare(b)) }));
}

export function getServiceSummary() {
   const byYear = new Map<number, Map<keyof typeof TypeMap, number>>();
   for (const entry of entries) {
      if (!byYear.has(entry.year)) byYear.set(entry.year, new Map());
      const typeMap = byYear.get(entry.year)!;
      typeMap.set(entry.type, (typeMap.get(entry.type) ?? 0) + 1);
   }

   const children: JSX.Element[] = [];
   for (const year of Array.from(byYear.keys()).sort((a, b) => b - a)) {
      children.push(<div key={`year-${year}`} className="conf-year-banner">• {year}</div>);
      for (const type of Object.keys(TypeDisplayMap) as (keyof typeof TypeDisplayMap)[]) {
         const count = byYear.get(year)!.get(type);
         if (!count) continue;
         children.push(
            <span key={`service-${year}-${type}`} className="conf-entry">
               <span className='conf-count'>{count}×</span>
               {TypeDisplayMap[type].abbr}
            </span>
         );
      }
   }
   return <div className='bib-summary-children'>{children}</div>;
}

export function getService() {
   const currentYear = new Date().getFullYear();

   return entries.toSorted(
      (a, b) => {
         if(b.year - a.year !== 0) {
            return b.year - a.year;
         } else if((a.order ?? 0) - (b.order ?? 0) !== 0) {
            return (b.order ?? 0) - (a.order ?? 0);
         } else {
            return a.conference.localeCompare(b.conference);
         }
      }
   )
   .map(({
      type,
      conference,
      shortTitle,
      link,
      year
   }) => {
      return <li key={shortTitle} style={year > currentYear ? { opacity: 0.72 } : undefined}>
         <a href={link} target="_blank" rel="noreferrer">
            <strong>{TypeMap[type]}</strong> for {shortTitle}<br/>
            {conference}
         </a>
      </li>;
   });
}
