import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { SocialMediaIcon } from "../../components/SocialMediaIcon";
import ShortLong from "../../components/Acronym";
import { Tooltip } from "react-tooltip";
import { escapeId } from "../../util/id";
import { faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import type { CatDef, CatItem } from "../../components/CategorizedList";
import { monthToString } from "./HonorsData";

interface Teaching {
   terms: JSX.Element[];
   type: 'teaching-assistant' | 'tutor' | 'lecturer' | 'guest-lecturer';
   note?: string;
   link?: string;
}

export const TypeToStringMap = {
   'teaching-assistant': (id: string) => <ShortLong short={<span className='small-caps'>ta</span>} long="Teaching Assistant (Exercise Instructor)" id={id}/>,
   'tutor': (id: string) => <ShortLong short={<span className='small-caps'>t</span>} long="Tutor" id={id}/>,
   'lecturer': (id: string) => <ShortLong short={<span className='small-caps'>l</span>} long="Lecturer" id={id}/>,
   'guest-lecturer': (id: string) => <ShortLong short={<span className='small-caps'>gl</span>} long="Guest Lecturer" id={id}/>
} as const

function wt(first: number, last?: number) {
   last ??= first-2000 + 1
   return <span key={'wt' + first + last} style={{ whiteSpace: 'nowrap' }}><ShortLong short={<span className='small-caps'>wt</span>} long="Winter Term"/>&nbsp;{first}/{last}</span>;
}
function st(term: number) {
   return <span key={'st' + term} style={{ whiteSpace: 'nowrap' }}><ShortLong short={<span className='small-caps'>st</span>} long="Summer Term"/>&nbsp;{term}</span>;
}
   

const teaching = new Map<string, Teaching>();

teaching.set('Bachelor Seminar', {
   terms: [<>{wt(2024)}&nbsp;<ShortLong short={<>(Serious Games)&nbsp;<SocialMediaIcon icon={faInfoCircle} className="small" href="https://exia.informatik.uni-ulm.de/waddle/"/></>} long={'Bachelor Seminar: State-of-the-Art in Serious Games to Teach Programming'} id={'ba-serious-games-2425'}/></>, <>{st(2025)}&nbsp;<ShortLong short={<>(Static Analysis)&nbsp;<SocialMediaIcon icon={faInfoCircle} className="small" href="https://www.uni-ulm.de/en/in/sp/teaching/seminar-fortgeschrittene-konzepte-der-softwaretechnik-static-program-analysis/"/></>} long={'Bachelor Seminar: Static Program Analysis'} id={'ba-sa-25'}/></>],
   type: 'lecturer',
   link: 'https://www.uni-ulm.de/en/in/sp/teaching/seminar-fortgeschrittene-konzepte-der-softwaretechnik-static-program-analysis/'
});
teaching.set('Software Engineering Project (Bachelor and Master)', {
   terms: [<>{wt(2023)}&nbsp;<ShortLong short={<>(Code Reconstruction)&nbsp;<SocialMediaIcon icon={faInfoCircle} className="small" href="https://www.uni-ulm.de/in/fakultaet/studiumf-mi/studienplanung-se/apse-archiv/wise23/"/></>} long={'Optimizing the code reconstruction in flowR'} id={'se-flowr-layout'}/></>, <>{wt(2024)}&nbsp;<ShortLong short={<>(Waddle)&nbsp;<SocialMediaIcon icon={faInfoCircle} className="small" href="https://www.uni-ulm.de/in/fakultaet/studium/fachbereich-informatik/fuer-studierende/apse/"/></>} long={'Improving on the Language, Level-Editor, and Tutorial for Waddle'} id={'se-waddle-1-2425'}/></>, <>{st(2025)}&nbsp;<ShortLong short={<>(R Projects)&nbsp;<SocialMediaIcon icon={faInfoCircle} className="small" href="https://www.uni-ulm.de/in/fakultaet/studium/fachbereich-informatik/fuer-studierende/apse/"/></>} long={'Adding project support to flowR'} id={'se-flowr-1-25'}/></>, <>{st(2026)}&nbsp;<ShortLong short={<>(Security)&nbsp;<SocialMediaIcon icon={faInfoCircle} className="small" href="https://www.uni-ulm.de/in/fakultaet/studium/fachbereich-informatik/fuer-studierende/apse/"/></>} long={'Improving the security linting for flowR'} id={'se-flowr-1-26'}/></>],
   type: 'lecturer',
   link: 'https://www.uni-ulm.de/en/in/sp/teaching/seminar-fortgeschrittene-konzepte-der-softwaretechnik-static-program-analysis/'
});
teaching.set('Functional Programming', {
   terms: [wt(2022), wt(2023), wt(2024), wt(2025)],
   type: 'teaching-assistant',
   link: 'https://www.uni-ulm.de/in/sp/teaching/functional-programming/'
});
teaching.set('Functional Programming 2', {
   terms: [st(2024), st(2026)],
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
   terms: [<>{st(2024)}&nbsp;[some lecturing]</>, <>{st(2025)}&nbsp;[some lecturing]</>, st(2026)],
   type: 'teaching-assistant',
   link: 'https://www.uni-ulm.de/in/sp/teaching/objektorientierte-programmierung/'
});
teaching.set('Introduction to Computer Science', {
   terms: [wt(2019), st(2020), wt(2020), st(2021), <>{wt(2021)}&nbsp;<SocialMediaIcon icon={faGithub} className="small" href="https://github.com/EagleoutIce/uulm-eidi-tut-ws2021-22-slides"/></>, <>{st(2022)}&nbsp;<SocialMediaIcon icon={faGithub} className="small" href="https://github.com/EagleoutIce/uulm-eidi-tut-ss2022-slides"/></>],
   type: 'tutor',
});
teaching.set('Software Quality Assurance (Static Analysis)', {
   terms: [<>{wt(2024)}&nbsp;<SocialMediaIcon icon={faGithub} href="https://github.com/EagleoutIce/sqa-static-analysis" className="small" /></>, <>{wt(2025)}&nbsp;<SocialMediaIcon icon={faGithub} href="https://github.com/EagleoutIce/sqa-static-analysis" className="small" /></>],
   type: 'lecturer',
   note: 'Specifically for three lectures on static analysis',
   link: 'https://www.uni-ulm.de/in/sp/teaching/software-quality-assurance/'
});

teaching.set('Software Engineering 2 (Static Analysis)', {
   terms: [<>{st(2025)} at TU Braunschweig</>],
   type: 'guest-lecturer',
   note: 'I was invited to give a guest lecture on static analysis at the TU Braunschweig',
   link: 'https://www.tu-braunschweig.de/isf/teaching/se2'
});

export type TeachingRole = Teaching['type'];

const LECTURE_CATEGORIES: Record<string, CatDef> = {
   'lecturer': { label: 'Lecturer', short: 'LEC', color: '#3b7bb8' },
   'project': { label: 'Project', short: 'PRJ', color: '#c0524b' },
   'guest-lecturer': { label: 'Guest Lecturer', short: 'GL', color: '#7a6fb0' },
   'teaching-assistant': { label: 'Teaching Assistant', short: 'TA', color: '#4f8a5b' },
   'tutor': { label: 'Tutor', short: 'TUT', color: '#b8873b' },
};

/* courses shown under a category other than their teaching role on the detail page */
const lectureCategory: Record<string, string> = {
   'Software Engineering Project (Bachelor and Master)': 'project',
};

/* every term a course ran (mirrors the wt/st term list above; keep in sync).
   the detail page lists one entry per term, so terms in the same year show
   separately rather than being collapsed */
const lectureTerms: Record<string, { year: number; term: 'WT' | 'ST' }[]> = {
   'Bachelor Seminar': [{ year: 2024, term: 'WT' }, { year: 2025, term: 'ST' }],
   'Software Engineering Project (Bachelor and Master)': [{ year: 2023, term: 'WT' }, { year: 2024, term: 'WT' }, { year: 2025, term: 'ST' }, { year: 2026, term: 'ST' }],
   'Functional Programming': [{ year: 2022, term: 'WT' }, { year: 2023, term: 'WT' }, { year: 2024, term: 'WT' }, { year: 2025, term: 'WT' }],
   'Functional Programming 2': [{ year: 2024, term: 'ST' }, { year: 2026, term: 'ST' }],
   'Grundlagen der praktischen Informatik': [{ year: 2022, term: 'WT' }],
   'Object-Oriented Programming': [{ year: 2024, term: 'ST' }, { year: 2025, term: 'ST' }, { year: 2026, term: 'ST' }],
   'Introduction to Computer Science': [{ year: 2019, term: 'WT' }, { year: 2020, term: 'ST' }, { year: 2020, term: 'WT' }, { year: 2021, term: 'ST' }, { year: 2021, term: 'WT' }, { year: 2022, term: 'ST' }],
   'Software Quality Assurance (Static Analysis)': [{ year: 2024, term: 'WT' }, { year: 2025, term: 'WT' }],
   'Software Engineering 2 (Static Analysis)': [{ year: 2025, term: 'ST' }],
};

/* published teaching material (repos, slides) surfaced on the detailed page */
const lectureMaterial: Record<string, { label: string; href: string }[]> = {
   'Software Quality Assurance (Static Analysis)': [{ label: 'slides', href: 'https://github.com/EagleoutIce/sqa-static-analysis' }],
   'Introduction to Computer Science': [{ label: 'slides', href: 'https://github.com/EagleoutIce/uulm-eidi-tut-ws2021-22-slides' }],
   'Software Engineering Project (Bachelor and Master)': [{ label: 'topics', href: 'https://github.com/flowr-analysis/flowr-topics' }],
};

/* the specific project topic supervised that term (the course-level list
   above already shows this via the info-icon tooltip baked into `terms`; the
   timeline builds its items from lectureTerms instead, which only carries
   year/term, so it's kept here too — mirrors the wt/st term list, keep in sync) */
const lectureTopics: Record<string, { year: number; term: 'WT' | 'ST'; topic: string; desc: string; href: string }[]> = {
   'Software Engineering Project (Bachelor and Master)': [
      { year: 2023, term: 'WT', topic: 'Code Reconstruction', desc: 'Optimizing the code reconstruction in flowR', href: 'https://www.uni-ulm.de/in/fakultaet/studiumf-mi/studienplanung-se/apse-archiv/wise23/' },
      { year: 2024, term: 'WT', topic: 'Waddle', desc: 'Improving on the Language, Level-Editor, and Tutorial for Waddle', href: 'https://www.uni-ulm.de/in/fakultaet/studium/fachbereich-informatik/fuer-studierende/apse/' },
      { year: 2025, term: 'ST', topic: 'R Projects', desc: 'Adding project support to flowR', href: 'https://www.uni-ulm.de/in/fakultaet/studium/fachbereich-informatik/fuer-studierende/apse/' },
      { year: 2026, term: 'ST', topic: 'Security', desc: 'Improving the security linting for flowR', href: 'https://www.uni-ulm.de/in/fakultaet/studium/fachbereich-informatik/fuer-studierende/apse/' },
   ],
};

export function getLecturesList(): { categories: Record<string, CatDef>; order: string[]; items: CatItem[] } {
   const items: CatItem[] = [];
   for(const [name, { type, link, note }] of teaching.entries()) {
      const links = [
         ...(link ? [{ label: 'course', href: link }] : []),
         ...(lectureMaterial[name] ?? []),
      ];
      for(const { year, term } of lectureTerms[name] ?? []) {
         const topic = lectureTopics[name]?.find(t => t.year === year && t.term === term);
         const month = term === 'WT' ? 10 : 4;
         items.push({
            key: `${escapeId(name)}-${year}-${term}`,
            category: lectureCategory[name] ?? type,
            year,
            month,
            title: topic ? <>{name}&nbsp;&mdash;&nbsp;{topic.topic}</> : name,
            people: note,
            date: monthToString[month - 1],
            venue: term === 'WT' ? 'Winter Term' : 'Summer Term',
            links: topic ? [...links, { label: 'details', href: topic.href }] : links,
            extra: topic?.desc,
         });
      }
   }
   return {
      categories: LECTURE_CATEGORIES,
      order: ['lecturer', 'project', 'guest-lecturer', 'teaching-assistant', 'tutor'],
      items,
   };
}

export function getTeachings(types?: ReadonlySet<TeachingRole>): { def: [li: JSX.Element, tooltip: JSX.Element | undefined][], roles: Map<TeachingRole, number> } {
   const roleCounter = new Map<TeachingRole, number>();
   for(const { type, terms } of teaching.values()) {
      roleCounter.set(type, (roleCounter.get(type) ?? 0) + terms.length);
   }
   const entries = Array.from(teaching.entries())
      .filter(([, { type }]) => !types || types.size === 0 || types.has(type));
   return { 
      def: entries.toSorted(
         ([a,], [b,]) => a.localeCompare(b)
      )
      .map(([name, { terms, link, type, note }]) => {
         const id = escapeId(name);

         return [<li key={id}>
            <a href={link} target="_blank" rel="noreferrer"> <span style={{ fontSize: 'smaller', color: 'var(--soft-text)' }}>{terms.length}×</span><strong id={'link-' + id}>{name}</strong>&nbsp;&nbsp;{TypeToStringMap[type]('type-' + name)}</a><br />
            {terms.map((term, i) => <>{term}{i < terms.length - 1 ? ', ' : ''}</>)}
         </li>,
         note ? <Tooltip anchorSelect={`#${'link-' + id}`} content={note} key={`tt-${'link-' + id}`} place="bottom" style={{ padding: '5px 9px', lineHeight: 1.35 }}/> : undefined];
      }), roles: roleCounter
   };
}

export function getTeachingDutyInfo(): { count: number; duties: string[] } {
   const duties: string[] = [];
   let count = 0;

   for(const [name, { type, terms }] of teaching.entries()) {
      if(type === 'tutor') continue;

      count += terms.length;
      duties.push(`${name} (${terms.length}×)`);
   }

   return {
      count,
      duties: duties.toSorted((a, b) => a.localeCompare(b))
   };
}

export function getTeachingDutySplitInfo(): {
   lecturer: { count: number; duties: string[] };
   teachingAssistant: { count: number; duties: string[] };
} {
   const lecturerDuties: string[] = [];
   const teachingAssistantDuties: string[] = [];
   let lecturerCount = 0;
   let teachingAssistantCount = 0;

   for(const [name, { type, terms }] of teaching.entries()) {
      if(type === 'tutor') continue;

      const duty = `${name} (${terms.length}×)`;
      if(type === 'teaching-assistant') {
         teachingAssistantCount += terms.length;
         teachingAssistantDuties.push(duty);
      } else {
         lecturerCount += terms.length;
         lecturerDuties.push(duty);
      }
   }

   return {
      lecturer: {
         count: lecturerCount,
         duties: lecturerDuties.toSorted((a, b) => a.localeCompare(b))
      },
      teachingAssistant: {
         count: teachingAssistantCount,
         duties: teachingAssistantDuties.toSorted((a, b) => a.localeCompare(b))
      }
   };
}


interface Ressource {
   title: string;
   href: string; 
   coverSource: string;
}

const slides: Ressource[] = [
   {
      title: 'Introduction to Static Analysis (3 parts, 2025)',
      href: 'https://github.com/EagleoutIce/sqa-static-analysis/tree/gh-pages',
      coverSource: 'https://raw.githubusercontent.com/EagleoutIce/sqa-static-analysis/refs/heads/gh-pages/preview-sa.png'
   },
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
         <div className="slide-caption" title={title}>{title}</div>
         <img src={coverSource} alt={title} className="slide-cover" loading="lazy" decoding="async"/>
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
         <div className="document-caption" title={title}>{title}</div>
         <img src={coverSource} alt={title} className="document-cover" loading="lazy" decoding="async"/>
      </a></div>;
   })
};