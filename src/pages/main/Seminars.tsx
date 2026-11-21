import { MaybeLink } from "../../components/MaybeLink";
import { escapeId } from "../../util/id";
import type { CatItem } from "../../components/CategorizedList";
import seminarsData from "../../data/seminars.json";
import { useState } from "react";
import './Seminars.css';
/* reuses the inline "N earlier years" toggle look of the publication summary */
import { typeset } from "../../util/text";
import '../../components/BibliographySummary.css';

/* the timeline shows this many entries, then fades out behind a toggle */
const VISIBLE = 5;

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
   /** optional: entries without a page render as plain text */
   readonly link?: string;
}

const entries: Entry[] = seminarsData.map(e => ({
   ...e,
   type: e.type as Entry['type'],
   startDate: new Date(e.start),
   endDate: new Date(e.end)
}));

function readableDateRange(startDate: Date, endDate: Date) {
   const dateOptions = {
      month: 'short',
      day: 'numeric'
   } as const;
  if(startDate.getFullYear() === endDate.getFullYear()) {
   if(startDate.getMonth() === endDate.getMonth()) {
      return `${startDate.toLocaleDateString('en-US', dateOptions)}\u2013${endDate.getDate()}, ${endDate.getFullYear()}`;
   }
   return `${startDate.toLocaleDateString('en-US', dateOptions)}\u2013${endDate.toLocaleDateString('en-US', dateOptions)}, ${endDate.getFullYear()}`;
  }
   return `${startDate.toLocaleDateString('en-US', dateOptions)}, ${startDate.getFullYear()}\u2009\u2013\u2009${endDate.toLocaleDateString('en-US', dateOptions)}, ${endDate.getFullYear()}`;
}

/** summer schools and seminars as timeline entries */
export function getSeminarsTimeline(): CatItem[] {
   return entries.map(e => ({
      key: escapeId(e.shortTitle),
      category: e.type,
      year: e.startDate.getFullYear(),
      month: e.startDate.getMonth() + 1,
      title: <>{typeset(e.title)} <span className="seminar-short">({typeset(e.shortTitle)})</span></>,
      people: types[e.type],
      venue: `${readableDateRange(e.startDate, e.endDate)} · ${e.location}`,
      links: e.link ? [{ label: 'link', href: e.link }] : undefined,
   }));
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
      const upcoming = startDate.getTime() > Date.now();
      return <li key={shortTitle} className={upcoming ? 'seminar-upcoming' : undefined}>
         <MaybeLink href={link}>
            <strong>{typeset(title)} <span className='seminar-short'>({typeset(shortTitle)})</span></strong><br />
            <span className='seminar-meta'>{types[type]}, {readableDateRange(startDate, endDate)}, {location}{upcoming ? ' (upcoming)' : ''}</span>
         </MaybeLink>
      </li>;
   });
}

export function MySeminars() {
   const [showAll, setShowAll] = useState(false);
   const all = getSeminars();
   const hidden = all.length - VISIBLE;
   const collapsed = hidden > 0 && !showAll;
   return <>
      I was allowed to visit the following summer schools and seminars:
      <ul className={`seminars-list${collapsed ? ' seminars-collapsed' : ''}`}>
         {collapsed ? all.slice(0, VISIBLE) : all}
      </ul>
      {hidden > 0 &&
         <button type='button' className='bib-summary-toggle seminars-toggle' aria-expanded={showAll} onClick={() => setShowAll(v => !v)}>
            {showAll ? 'show fewer' : `${hidden} earlier ${hidden === 1 ? 'event' : 'events'}`}
            <span className='bib-summary-toggle-chevron' />
         </button>}
   </>;
}
