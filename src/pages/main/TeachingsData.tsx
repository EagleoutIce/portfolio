interface Teaching {
   terms: string[];
   link: string;
}

function wt(first: number, last: number) {
   return `Winter Term ${first}/${last}`;
}
function st(term: number) {
   return `Summer Term ${term}`;
}
   

const teaching = new Map<string, Teaching>();

teaching.set('Functional Programming', {
   terms: [wt(2022, 23), wt(2023, 24)],
   link: 'https://www.uni-ulm.de/in/sp/teaching/functional-programming/'
});
teaching.set('Functional Programming 2', {
   terms: [st(2024)],
   link: 'https://www.uni-ulm.de/in/sp/teaching/functional-programming-2/'
});
teaching.set('Grundlagen der praktischen Informatik', {
   terms: [wt(2022, 23)],
   link: 'https://www.uni-ulm.de/in/sp/teaching/grundlagen-der-praktischen-informatik/'
});
teaching.set('Objektorientierte Programmierung', {
   terms: [st(2024)],
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


interface Ressource {
   title: string;
   href: string; 
   coverSource: string;
}

const slides: Ressource[] = [
   {
      title: 'Intermediate Presentation (Master\'s Thesis, 2023)',
      href: 'https://media.githubusercontent.com/media/EagleoutIce/ma-slicing-interim/gh-pages/noanim_ma-interim-r-slicing.pdf',
      coverSource: 'https://media.githubusercontent.com/media/EagleoutIce/ma-slicing-interim/gh-pages/preview-01.png'
   }, {
      title: 'Seminar Presentation on Trusting Trust (2021)',
      href: 'https://media.githubusercontent.com/media/EagleoutIce/slides-rtds-trusting-trust/gh-pages/noanim-noannot-atvs-presentation.pdf',
      coverSource: 'https://github.com/EagleoutIce/slides-rtds-trusting-trust/raw/gh-pages/preview-1.png?raw=true'
   }, {
      title: 'Seminar Presentation on Gnu Parallel (2022)',
      href: 'https://media.githubusercontent.com/media/EagleoutIce/ccpdp-lightning-ss22-gnu-parallel/gh-pages/noanim_ccpdp-gnu-parallel.pdf',
      coverSource: 'https://github.com/EagleoutIce/ccpdp-lightning-ss22-gnu-parallel/raw/gh-pages/slides/preview-01.png?raw=true'
   }, {
      title: 'LaTeX Introduction for the KIT (2022)',
      href: 'https://media.githubusercontent.com/media/EagleoutIce/kit-latex-intro/gh-pages/kit-latex-intro.pdf',
      coverSource: 'https://media.githubusercontent.com/media/EagleoutIce/kit-latex-intro/gh-pages/preview.png?raw=true'
   }
]

export function getSlides() {
   return slides.map(({ title, href, coverSource }) => {
      return <div className="slide-container" key={title}><a href={href} target="_blank" rel="noreferrer">
         <div className="slide-caption">{title}</div>
         <img src={coverSource} alt={title} className="slide-cover" loading="lazy"/>
      </a></div>;
   })
};


const documents: Ressource[] = [
   {
      title: 'Master\'s Thesis (2023)',
      href: 'http://dx.doi.org/10.18725/OPARU-50107',
      coverSource: 'https://oparu.uni-ulm.de/server/api/core/bitstreams/c168c7df-0e02-479c-b18c-e016284a98a0/content'
   },
   {
      title: 'Limitations of Science (2021)',
      href: 'https://media.githubusercontent.com/media/EagleoutIce/asq-limitations-of-science/gh-pages/asq-20th-ausarbeitung.pdf',
      coverSource: 'https://github.com/EagleoutIce/asq-limitations-of-science/raw/gh-pages/preview-1.png?raw=true'
   }, {
      title: 'TikZ Image Collection (2022)',
      href: 'https://github.com/EagleoutIce/latex-image-collection',
      coverSource: 'https://github.com/EagleoutIce/image-collection/raw/gh-pages/preview-01.png?raw=true'
   }
]

export function getDocuments() {
   return documents.map(({ title, href, coverSource }) => {
      return <div className="document-container" key={title}><a href={href} target="_blank" rel="noreferrer">
         <div className="document-caption">{title}</div>
         <img src={coverSource} alt={title} className="document-cover" loading="lazy"/>
      </a></div>;
   })
};