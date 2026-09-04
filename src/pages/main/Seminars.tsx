import { MaybeLink } from "../../components/MaybeLink";
import { escapeId } from "../../util/id";
import type { CatItem } from "../../components/CategorizedList";
import seminarsData from "../../data/seminars.json";
import './Seminars.css';

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
      return `${startDate.toLocaleDateString('en-US', dateOptions)} - ${endDate.getDate()}, ${endDate.getFullYear()}`;
   }
   return `${startDate.toLocaleDateString('en-US', dateOptions)} - ${endDate.toLocaleDateString('en-US', dateOptions)}, ${endDate.getFullYear()}`;
  }
   return `${startDate.toLocaleDateString('en-US', dateOptions)}, ${startDate.getFullYear()} - ${endDate.toLocaleDateString('en-US', dateOptions)}, ${endDate.getFullYear()}`;
}

/** summer schools and seminars as timeline entries */
export function getSeminarsTimeline(): CatItem[] {
   return entries.map(e => ({
      key: escapeId(e.shortTitle),
      category: e.type,
      year: e.startDate.getFullYear(),
      month: e.startDate.getMonth() + 1,
      title: <>{e.title} <span className="seminar-short">({e.shortTitle})</span></>,
      people: types[e.type],
      venue: `${readableDateRange(e.startDate, e.endDate)} · ${e.location}`,
      links: [{ label: 'link', href: e.link }],
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
            <strong>{title} <span className='seminar-short'>({shortTitle})</span></strong><br />
            <span className='seminar-meta'>{types[type]}, {readableDateRange(startDate, endDate)}, {location}{upcoming ? ' (upcoming)' : ''}</span>
         </MaybeLink>
      </li>;
   });
}

export function MySeminars() {
  return <>
   I was allowed to visit the following summer schools and seminars:
   <ul className='seminars-list'>
      {getSeminars()}
   </ul>
 </>;
}
