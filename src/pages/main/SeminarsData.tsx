const types = {
   'summer-school': 'Summer School',
   'seminar': 'Seminar'
} as const

interface Entry {
   readonly type: keyof typeof types;
   readonly title: string;
   readonly shortTitle: string;
   readonly startDate: Date;
   readonly endDate: Date;
   readonly location: string;
   readonly link: string;
}

const entries: Entry[] = [{
   type: 'seminar',
   title: 'Software Engineering Forschungsmethodentraining',
   shortTitle: 'SEFMT \'23',
   startDate: new Date('2023-10-25'),
   endDate: new Date('2023-10-27'),
   location: 'Dagstuhl',
   link: 'https://www.dagstuhl.de/23433'
}, {
   type: 'summer-school',
   title: 'Programming Language Implementation Summer School',
   shortTitle: 'PLISS \'23',
   link: 'https://pliss.org/2023/',
   startDate: new Date('2023-09-03'),
   endDate: new Date('2023-09-09'),
   location: 'Bertinoro'
}, {
   type: 'summer-school',
   title: 'Lipari Summer School on Abstract Interpretation',
   shortTitle: 'AbsInt \'24',
   link: 'https://absint24.liparischool.it/',
   startDate: new Date('2024-09-01'),
   endDate: new Date('2024-09-07'),
   location: 'Lipari'
}
]

function readableDateRange(startDate: Date, endDate: Date) {
   const dateOptions = {
      month: 'short',
      day: 'numeric'
   } as const;
  if(startDate.getFullYear() === endDate.getFullYear()) {
   if(startDate.getMonth() === endDate.getMonth()) {
      return `${startDate.toLocaleDateString('en-US', dateOptions)} - ${endDate.getDate()}, ${endDate.getFullYear()}`;
   }
  }
   return `${startDate.toLocaleDateString('en-US', dateOptions)} - ${endDate.toLocaleDateString('en-US', dateOptions)}`;
}

export function getSeminars() {
   return entries.toSorted(
      (a, b) => b.startDate.getTime() - a.startDate.getTime()
   )
   .map(({
      type,
      title,
      shortTitle,
      startDate,
      endDate,
      location,
      link
   }) => {
      return <li key={title}>
         <a href={link} target="_blank" rel="noreferrer">
            <strong>{title} ({shortTitle})</strong><br />
            {types[type]}, {readableDateRange(startDate, endDate)}, {location}
         </a>
      </li>;
   });
}
