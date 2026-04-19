const TypeMap = {
   'reviewing': 'Reviewer',
   'artifact-eval': 'Artifact Evaluation',
   'junior-pc': 'Junior PC',
   'local-chair': 'Local Chair'
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
}, {
   type: 'local-chair',
   conference: 'Frühjahrstagung der Deutschsprachigen Anwendervereinigung TeX',
   shortTitle: 'DANTE \'27',
   year: 2027,
   link: 'https://www.dante.de/veranstaltungen/dante2027/'
}]


export function getService() {
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
      link
   }) => {
      return <li key={shortTitle}>
         <a href={link} target="_blank" rel="noreferrer">
            <strong>{TypeMap[type]}</strong> for {shortTitle}<br/>
            {conference}
         </a>
      </li>;
   });
}
