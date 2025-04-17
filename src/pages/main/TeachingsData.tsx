import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { SocialMediaIcon } from "../../components/SocialMediaIcon";
import Acronym from "../../components/Acronym";
import { Tooltip } from "react-tooltip";
import { escapeId } from "../../util/id";

interface Teaching {
   terms: JSX.Element[];
   type: 'teaching-assistant' | 'tutor' | 'lecturer';
   note?: string;
   link?: string;
}

export const TypeToStringMap = {
   'teaching-assistant': (id: string) => <Acronym short={<span className='small-caps'>ta</span>} long="Teaching Assistant (Exercise Instructor)" id={id}/>,
   'tutor': (id: string) => <Acronym short={<span className='small-caps'>t</span>} long="Tutor" id={id}/>,
   'lecturer': (id: string) => <Acronym short={<span className='small-caps'>l</span>} long="Lecturer" id={id}/>
} as const

function wt(first: number, last?: number) {
   last ??= first-2000 + 1
   return <span key={'wt' + first + last}><Acronym short={<span className='small-caps'>wt</span>} long="Winter Term"/> {first}/{last}</span>;
}
function st(term: number) {
   return <span key={'st' + term}><Acronym short={<span className='small-caps'>st</span>} long="Summer Term"/> {term}</span>;
}
   

const teaching = new Map<string, Teaching>();

teaching.set('Bachelor Seminar: Static Program Analysis', {
   terms: [st(2025)],
   type: 'lecturer',
   link: 'https://www.uni-ulm.de/en/in/sp/teaching/seminar-fortgeschrittene-konzepte-der-softwaretechnik-static-program-analysis/'
});
teaching.set('Functional Programming', {
   terms: [wt(2022), wt(2023), wt(2024)],
   type: 'teaching-assistant',
   link: 'https://www.uni-ulm.de/in/sp/teaching/functional-programming/'
});
teaching.set('Functional Programming 2', {
   terms: [st(2024)],
   type: 'teaching-assistant',
   link: 'https://www.uni-ulm.de/in/sp/teaching/functional-programming-2/'
});
teaching.set('Grundlagen der praktischen Informatik', {
   terms: [wt(2022)],
   type: 'tutor',
   note: 'Supporting the creation of the lecture and the slides',
   link: 'https://www.uni-ulm.de/in/sp/teaching/grundlagen-der-praktischen-informatik/'
});
teaching.set('Object-Oriented Programming', {
   terms: [st(2024), st(2025)],
   type: 'teaching-assistant',
   link: 'https://www.uni-ulm.de/in/sp/teaching/objektorientierte-programmierung/'
});
teaching.set('Introduction to Computer Science', {
   terms: [wt(2019), st(2020), wt(2020), st(2021), <>{wt(2021)}&nbsp;<SocialMediaIcon icon={faGithub} className="small" href="https://github.com/EagleoutIce/uulm-eidi-tut-ws2021-22-slides"/></>, <>{st(2022)}&nbsp;<SocialMediaIcon icon={faGithub} className="small" href="https://github.com/EagleoutIce/uulm-eidi-tut-ss2022-slides"/></>],
   type: 'tutor',
});
teaching.set('Software Quality Assurance (Static Analysis)', {
   terms: [<>{wt(2024)}&nbsp;<SocialMediaIcon icon={faGithub} href="https://github.com/EagleoutIce/sqa-static-analysis" className="small" /></>],
   type: 'lecturer',
   note: 'Specifically for two lectures on static analysis',
   link: 'https://www.uni-ulm.de/in/sp/teaching/software-quality-assurance/'
});

export function getTeachings() {
   const entries = Array.from(teaching.entries());
   return entries.toSorted(
      ([a,], [b,]) => a.localeCompare(b)
   )
   .map(([name, { terms, link, type, note }]) => {
      const id = escapeId(name);
      return <><li key={id}>
         <a href={link} target="_blank" rel="noreferrer"> <strong id={'link-' + id}>{name}</strong>&nbsp;&nbsp;{TypeToStringMap[type]('type-' + name)}</a><br /> 
         {terms.map((term, i) => <>{term}{i < terms.length - 1 ? ', ' : ''}</>)}
      </li>
      { note ? <Tooltip anchorSelect={`#${'link-' + id}`} content={note} key={`tt-${'link-' + id}`} place="bottom" style={{ padding: '2px 6px', margin: '-6px 0px' }}/> : '' }
      </>;
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