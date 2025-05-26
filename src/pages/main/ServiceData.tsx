const TypeMap = {
   'reviewing': 'Reviewer',
   'artifact-eval': 'Artifact Evaluation'
} as const

interface Entry {
   readonly type:       keyof typeof TypeMap;
   readonly conference: string;
   readonly shortTitle: string;
   readonly year:       number;
   readonly link:       string;
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
   type: 'reviewing',
   conference: 'Research Software Engineering Conference',
   shortTitle: 'RSECon \'25',
   year: 2025,
   link: 'https://rsecon25.society-rse.org/'
}]


export function getService() {
   return entries.toSorted(
      (a, b) => {
         if(b.year - a.year !== 0) {
            return b.year - a.year;
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
