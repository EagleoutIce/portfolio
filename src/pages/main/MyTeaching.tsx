import { useEffect, useMemo, useState } from 'react';
import { StaticQuickLinks } from '../../components/QuickLinks';
import { SectionHeading } from '../../components/SectionHeading';
import { Pagination } from '../../components/Pagination';
import './MyTeaching.css';
import { getDocuments, getSlides, getTeachings, type TeachingRole } from './TeachingsData';
import { getTheses, getThesisTypes, type ThesisType } from './ThesesData';

const THESES_PAGE_SIZE = 5;

/* doubles as the legend for the role abbreviations used in the list */
const roleLegend = [
   ['tutor', 't', 'Tutor'],
   ['teaching-assistant', 'ta', 'Teaching Assistant'],
   ['lecturer', 'l', 'Lecturer'],
   ['guest-lecturer', 'gl', 'Guest Lecturer']
] as const;

function SupervisedTheses() {
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
      <Pagination current={currentPage} total={totalPages} onChange={setPage} />
   </>;
}

// TODO: move wrapper into get* fns
const SLIDES_PREVIEW = 2;

export function MyTeaching() {
   const [roles, setRoles] = useState<ReadonlySet<TeachingRole>>(new Set());
   const [showAllSlides, setShowAllSlides] = useState(false);
   const [showDocuments, setShowDocuments] = useState(false);
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

      <SectionHeading id="lectures" as="h3">Lectures, Seminars, and Projects</SectionHeading>
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

      <SectionHeading id="theses" as="h3">Supervised Theses</SectionHeading>

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
         <details className='collapse-section' open={showAllSlides}
            onToggle={e => setShowAllSlides((e.target as HTMLDetailsElement).open)}>
            <summary>
               <span className='collapse-title light'>More slides</span>
               <span className='collapse-count'>{slides.length - SLIDES_PREVIEW} more</span>
               <span className='collapse-chevron' />
            </summary>
            {showAllSlides &&
               <div className='slides-list'>
                  {slides.slice(SLIDES_PREVIEW)}
               </div>
            }
         </details>
      }
      <div className='no-outer main'>
         For more, check out my <a target="_blank" rel="noreferrer" href="https://github.com/EagleoutIce" >GitHub Page</a>.
      </div>

      <details className='collapse-section' open={showDocuments}
         onToggle={e => setShowDocuments((e.target as HTMLDetailsElement).open)}>
         <summary>
            <SectionHeading id="documents" as="h3">Documents</SectionHeading>
            <span className='collapse-count'>{documents.length} {documents.length === 1 ? 'document' : 'documents'}</span>
            <span className='collapse-chevron' />
         </summary>
         {showDocuments && <>
            <div className='documents-list'>
               {documents}
            </div>
            <div className='no-outer main'>
               For more, check out my <a target="_blank" rel="noreferrer" href="https://github.com/EagleoutIce" >GitHub Page</a>.
            </div>
         </>}
      </details>
   </>;
}

