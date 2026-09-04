import { MaybeLink } from "../../components/MaybeLink";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import { SocialMediaIcon } from "../../components/SocialMediaIcon";
import ShortLong from "../../components/Acronym";
import { escapeId } from "../../util/id";
import type { CatDef, CatItem } from "../../components/CategorizedList";
import { monthToString } from "./Honors";
import teachingData from "../../data/teaching.json";
import slidesData from "../../data/slides.json";
import documentsData from "../../data/documents.json";
import { useEffect, useMemo, useState } from 'react';
import { StaticQuickLinks } from '../../components/QuickLinks';
import { SectionHeading } from '../../components/SectionHeading';
import { Pagination } from '../../components/Pagination';
import { Collapsible } from '../../components/Collapsible';
import './Teaching.css';
import { getTheses, getThesisTypes, type ThesisType } from './Theses';

interface Term {
   year: number;
   term: 'WT' | 'ST';
   /** short topic supervised that term, shown next to the term */
   topic?: string;
   /** full title behind the topic, shown as its tooltip */
   desc?: string;
   href?: string;
   github?: string;
   /** free-form addition, e.g. "[some lecturing]" */
   suffix?: string;
}

interface Teaching {
   name: string;
   role: 'teaching-assistant' | 'tutor' | 'lecturer' | 'guest-lecturer';
   /** category on the detail page, defaults to the role */
   category?: string;
   note?: string;
   link?: string;
   material?: { label: string; href: string }[];
   terms: Term[];
}

interface Ressource {
   title: string;
   href: string;
   cover: string;
}

const teaching = teachingData as Teaching[];
const slides = slidesData as Ressource[];
const documents = documentsData as Ressource[];

export type TeachingRole = Teaching['role'];

const RoleMap: Record<TeachingRole, { short: string; long: string }> = {
   'teaching-assistant': { short: 'ta', long: 'Teaching Assistant (Exercise Instructor)' },
   'tutor': { short: 't', long: 'Tutor' },
   'lecturer': { short: 'l', long: 'Lecturer' },
   'guest-lecturer': { short: 'gl', long: 'Guest Lecturer' }
};

const LECTURE_CATEGORIES: Record<string, CatDef> = {
   'lecturer': { label: 'Lecturer', short: 'LEC', color: '#3b7bb8' },
   'project': { label: 'Project', short: 'PRJ', color: '#c0524b' },
   'guest-lecturer': { label: 'Guest Lecturer', short: 'GL', color: '#7a6fb0' },
   'teaching-assistant': { label: 'Teaching Assistant', short: 'TA', color: '#4f8a5b' },
   'tutor': { label: 'Tutor', short: 'TUT', color: '#b8873b' },
};

function termLabel({ year, term }: Term) {
   const short = <span className='small-caps'>{term.toLowerCase()}</span>;
   return term === 'WT'
      ? <><ShortLong short={short} long="Winter Term" />&nbsp;{year}/{String((year + 1) % 100).padStart(2, '0')}</>
      : <><ShortLong short={short} long="Summer Term" />&nbsp;{year}</>;
}

function termNode(name: string, t: Term) {
   const label = <span style={{ whiteSpace: 'nowrap' }}>{termLabel(t)}</span>;
   if(t.topic) {
      return <>{label}&nbsp;<ShortLong id={escapeId(`${name}-${t.year}-${t.term}`)} long={t.desc ?? t.topic}
         short={<>({t.topic})&nbsp;<SocialMediaIcon icon={faInfoCircle} className="small" href={t.href} label={`details on ${t.desc ?? t.topic}`} /></>} /></>;
   }
   if(t.github) {
      return <>{label}&nbsp;<SocialMediaIcon icon={faGithub} className="small" href={t.github} label={`${name} material on GitHub`} /></>;
   }
   return t.suffix ? <>{label}&nbsp;{t.suffix}</> : label;
}

export function getLecturesList(): { categories: Record<string, CatDef>; order: string[]; items: CatItem[] } {
   const items: CatItem[] = [];
   for(const { name, role, category, link, note, material, terms } of teaching) {
      const links = [
         ...(link ? [{ label: 'course', href: link }] : []),
         ...(material ?? []),
      ];
      for(const t of terms) {
         const month = t.term === 'WT' ? 10 : 4;
         items.push({
            key: `${escapeId(name)}-${t.year}-${t.term}`,
            category: category ?? role,
            year: t.year,
            month,
            title: t.topic ? <>{name}&nbsp;&mdash;&nbsp;{t.topic}</> : name,
            people: note,
            date: monthToString[month - 1],
            venue: t.term === 'WT' ? 'Winter Term' : 'Summer Term',
            links: t.href ? [...links, { label: 'details', href: t.href }] : links,
            extra: t.desc,
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
   const roles = new Map<TeachingRole, number>();
   for(const { role, terms } of teaching) {
      roles.set(role, (roles.get(role) ?? 0) + terms.length);
   }
   const def = teaching
      .filter(({ role }) => !types || types.size === 0 || types.has(role))
      .toSorted((a, b) => a.name.localeCompare(b.name))
      .map(({ name, terms, link, role, note }): [JSX.Element, JSX.Element | undefined] => {
         const id = escapeId(name);
         const { short, long } = RoleMap[role];
         return [<li key={id}>
            <MaybeLink href={link}> <span style={{ fontSize: 'smaller', color: 'var(--soft-text)' }}>{terms.length}×</span><strong id={'link-' + id}>{name}</strong>&nbsp;&nbsp;<ShortLong short={<span className='small-caps'>{short}</span>} long={long} id={'type-' + name} /></MaybeLink><br />
            {terms.map((t, i) => <span key={`${t.year}-${t.term}`}>{termNode(name, t)}{i < terms.length - 1 ? ', ' : ''}</span>)}
         </li>,
         note ? <Tooltip anchorSelect={`#${'link-' + id}`} content={note} key={`tt-${'link-' + id}`} place="bottom" style={{ padding: '5px 9px', lineHeight: 1.35 }} /> : undefined];
      });
   return { def, roles };
}

/** teaching duties (everything but tutoring), split into lecturing and assisting */
export function getTeachingDutySplitInfo(): {
   lecturer: { count: number; duties: string[] };
   teachingAssistant: { count: number; duties: string[] };
} {
   const split = {
      lecturer: { count: 0, duties: [] as string[] },
      teachingAssistant: { count: 0, duties: [] as string[] }
   };
   for(const { name, role, terms } of teaching) {
      if(role === 'tutor') {
         continue;
      }
      const to = role === 'teaching-assistant' ? split.teachingAssistant : split.lecturer;
      to.count += terms.length;
      to.duties.push(`${name} (${terms.length}×)`);
   }
   split.lecturer.duties.sort((a, b) => a.localeCompare(b));
   split.teachingAssistant.duties.sort((a, b) => a.localeCompare(b));
   return split;
}

export function getSlides() {
   return slides.map(({ title, href, cover }) =>
      <div className="slide-container" key={title}><a href={href} target="_blank" rel="noreferrer">
         <div className="slide-caption" title={title}>{title}</div>
         <img src={cover} alt="" className="slide-cover" loading="lazy" decoding="async" />
      </a></div>);
}

export function getDocuments() {
   return documents.map(({ title, href, cover }) =>
      <div className="document-container" key={title}><a href={href} target="_blank" rel="noreferrer">
         <div className="document-caption" title={title}>{title}</div>
         <img src={cover} alt="" className="document-cover" loading="lazy" decoding="async" />
      </a></div>);
}

const THESES_PAGE_SIZE = 5;

/* doubles as the legend for the role abbreviations used in the list */
const roleLegend = [
   ['tutor', 't', 'Tutor'],
   ['teaching-assistant', 'ta', 'Teaching Assistant'],
   ['lecturer', 'l', 'Lecturer'],
   ['guest-lecturer', 'gl', 'Guest Lecturer']
] as const;

export function SupervisedTheses() {
   const [selectedType, setSelectedType] = useState<ThesisType | undefined>(undefined);
   const [page, setPage] = useState(0);
   const allTheses = useMemo(() => getTheses(), []);

   /* the news deep-link to single theses (#/link-<title>), make sure the
      target is on the visible page before the router scrolls to it */
   useEffect(() => {
      const jumpToTarget = () => {
         const hash = decodeURIComponent(window.location.hash);
         if(!hash.startsWith('#/link-')) {
            return;
         }
         const target = hash.slice('#/link-'.length);
         const index = allTheses.findIndex(t => t.id === target);
         if(index >= 0) {
            setSelectedType(undefined);
            setPage(Math.floor(index / THESES_PAGE_SIZE));
         }
      };
      jumpToTarget();
      window.addEventListener('hashchange', jumpToTarget);
      return () => window.removeEventListener('hashchange', jumpToTarget);
   }, [allTheses]);

   const toggle = (type: ThesisType) => {
      setSelectedType(prev => prev === type ? undefined : type);
      setPage(0);
   };

   const visible = selectedType === undefined ? allTheses : allTheses.filter(t => t.type === selectedType);
   const totalPages = Math.ceil(visible.length / THESES_PAGE_SIZE);
   const currentPage = Math.min(page, Math.max(0, totalPages - 1));

   return <>
      <div className='filter-row'>
         {getThesisTypes().map(({ key, abbr, label, count }) =>
            <button key={key} className={selectedType === key ? 'filter-active' : 'filter-inactive'}
               title="shows entries of the selected type (exclusive)" onClick={() => toggle(key)}>
               <span className='filter-count'>{count}&times;</span>
               <span className='small-caps'>{abbr}</span> = {label}
            </button>
         )}
         <span className='filter-mode'>(exclusive)</span>
      </div>
      {/* reversed enumeration so the newest entry shows the total count */}
      <ol className='teachings-list theses-list' reversed start={visible.length - currentPage * THESES_PAGE_SIZE}>
         {visible.slice(currentPage * THESES_PAGE_SIZE, (currentPage + 1) * THESES_PAGE_SIZE).map(t => t.li)}
      </ol>
      <Pagination current={currentPage} total={totalPages} onChange={setPage} label="Supervised theses" />
   </>;
}

// TODO: move wrapper into get* fns
const SLIDES_PREVIEW = 2;

export function MyTeaching() {
   const [roles, setRoles] = useState<ReadonlySet<TeachingRole>>(new Set());
   const toggle = (role: TeachingRole) => setRoles(prev => {
      const next = new Set(prev);
      if(next.has(role)) {
         next.delete(role);
      } else {
         next.add(role);
      }
      return next;
   });
   const { def: teachings, roles: teachingCounts } = getTeachings(roles);
   const slides = getSlides();
   const documents = getDocuments();
   return <>
      <StaticQuickLinks sections={{
         lectures: { page: 'lectures' },
         theses: { page: 'theses' },
         slides: { page: 'slides' },
         documents: { page: 'documents' }
      }}></StaticQuickLinks>

      <SectionHeading id="lectures" as="h3" href="#/all-lectures" linkHint="detailed list">Lectures, Seminars, and Projects</SectionHeading>
      As part of my work at Ulm University, I am involved in teaching:

      <div className='filter-row'>
         {roleLegend.map(([type, abbr, lab]) =>
            <button key={type} className={roles.has(type) ? 'filter-active' : 'filter-inactive'}
               title="shows entries matching any selected role" onClick={() => toggle(type)}>
               <span className='filter-count'>{teachingCounts.get(type)}&times;</span>
               <span className='small-caps'>{abbr}</span> = {lab}
            </button>
         )}
         <span className='filter-mode'>(matches any)</span>
      </div>

      <ul className='teachings-list lectures-columns'>
         {teachings.map(t => t[0])}
      </ul>
      {teachings.map(t => t[1]).filter(e => e !== undefined)}

      I have also created various teaching materials, including partial and complete lectures (e.g., with "<a className="link" target="_blank" rel="noreferrer" href="https://www.uni-ulm.de/in/sp/teaching/grundlagen-der-praktischen-informatik/">Grundlagen der praktischen Informatik</a>", "<a className="link" target="_blank" rel="noreferrer" href="https://www.uni-ulm.de/in/sp/teaching/software-quality-assurance/">Software Quality Assurance</a>", and "<a className="link" target="_blank" rel="noreferrer" href="https://www.uni-ulm.de/in/sp/teaching/functional-programming-2/">Functional Programming 2</a>").

      <SectionHeading id="theses" as="h3" href="#/all-theses" linkHint="detailed list">Supervised Theses</SectionHeading>

      So far, I had the pleasure of supervising the following theses:
      <div style={{ fontSize: 'smaller', color: 'var(--soft-text)' }}>
         Please note that this list only contains theses whose authors agreed to be listed and named publicly.
      </div>

      <SupervisedTheses />

      <SectionHeading id="slides" as="h3">Slides</SectionHeading>
      <div className='slides-list'>
         {slides.slice(0, SLIDES_PREVIEW)}
      </div>
      {slides.length > SLIDES_PREVIEW &&
         <Collapsible title='More slides' light count={`${slides.length - SLIDES_PREVIEW} more`}>
            <div className='slides-list'>
               {slides.slice(SLIDES_PREVIEW)}
            </div>
         </Collapsible>
      }
      <div className='no-outer main'>
         For more, check out my <a target="_blank" rel="noreferrer" href="https://github.com/EagleoutIce" >GitHub Page</a>.
      </div>

      <Collapsible title={<SectionHeading id="documents" as="h3">Documents</SectionHeading>}
         count={`${documents.length} ${documents.length === 1 ? 'document' : 'documents'}`}>
         <div className='documents-list'>
            {documents}
         </div>
         <div className='no-outer main'>
            For more, check out my <a target="_blank" rel="noreferrer" href="https://github.com/EagleoutIce" >GitHub Page</a>.
         </div>
      </Collapsible>
   </>;
}
