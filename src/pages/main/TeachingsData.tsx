import { useMemo } from "react";

interface Teaching {
   terms: string[];
   link: string;
}

const teaching = new Map<string, Teaching>();

teaching.set('Functional Programming', {
   terms: ['Winter Term 2022/23', 'Winter Term 2023/24'],
   link: 'https://www.uni-ulm.de/in/sp/teaching/functional-programming/'
});
teaching.set('Functional Programming 2', {
   terms: ['Summer Term 2024'],
   link: 'https://www.uni-ulm.de/in/sp/teaching/functional-programming-2/'
});
teaching.set('Grundlagen der praktischen Informatik', {
   terms: ['Winter Term 2022/23'],
   link: 'https://www.uni-ulm.de/in/sp/teaching/grundlagen-der-praktischen-informatik/'
});
teaching.set('Objektorientierte Programmierung', {
   terms: ['Summer Term 2024'],
   link: 'https://www.uni-ulm.de/in/sp/teaching/objektorientierte-programmierung/'
});

export function getTeachings() {
   const entries = Array.from(teaching.entries());
   return entries.toSorted(
      ([a,], [b,]) => a.localeCompare(b)
   )
   .map(([name, { terms, link }]) => {
      return <li key={name}>
         <a href={link} target="_blank" rel="noreferrer"><strong>{name}</strong><br /> {terms.map((term, i) => <span key={term}>{term}{i < terms.length - 1 ? ', ' : ''}</span>)}</a>
      </li>;
   });
}