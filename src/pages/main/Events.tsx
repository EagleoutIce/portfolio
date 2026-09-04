import { MaybeLink } from "../../components/MaybeLink";
import { Tooltip } from "react-tooltip";
import { escapeId } from "../../util/id";
import { monthToString } from "./Honors";
import type { CatDef, CatItem } from "../../components/CategorizedList";
import eventsData from "../../data/events.json";
import './Events.css'

interface Occurrence {
   year: number;
   month?: number;
   note?: string;
   /** page for this specific occurrence, if the event published a dated one
       (e.g. an archived per-year program page); falls back to the event's
       own `link` when not given */
   href?: string;
}

type EventKind = 'multiday' | 'practicum' | 'singleday';

interface Event {
   name: string;
   occ: Occurrence[];
   where: string;
   kind: EventKind;
   note?: string;
   link?: string;
   /** the event is run together with the Waddle outreach group */
   waddle?: boolean;
   /** credit line shown instead of the default Waddle-group credit */
   credit?: string;
}

/* the outreach events are carried by the Waddle group (Florian included); the
   TODO names can be filled in once confirmed */
const WADDLE_CREDIT = <>the <a className="link" href="https://exia.informatik.uni-ulm.de/waddle" target="_blank" rel="noreferrer">Waddle</a> group (incl. Florian&nbsp;Sihler)</>;

const events = eventsData as Event[];

function occTime(o: Occurrence, fallbackLink?: string) {
   const now = new Date();
   const isFuture = o.year > now.getFullYear()
      || (o.year === now.getFullYear() && o.month !== undefined && o.month > now.getMonth() + 1);
   const href = o.href ?? fallbackLink;
   const className = 'event-time' + (isFuture ? ' future-time' : '');
   const label = <>{o.month !== undefined ? monthToString[o.month - 1] + ' ' : ''}{o.year}</>;
   return <span key={`t-${o.month ?? 'x'}-${o.year}`}>
      {href
         ? <a className={className} href={href} target="_blank" rel="noreferrer">{label}</a>
         : <span className={className}>{label}</span>}
      {o.note ? <span className="event-note"> ({o.note})</span> : null}
   </span>;
}

export function MyEvents(): JSX.Element {
   const e = events.toSorted((a, b) => a.name.localeCompare(b.name)).map(({ name, occ, link, where, note }) => {
      const id = escapeId(name);
      const when = occ.map(o => occTime(o, link));
      return [<li key={id}>
         <MaybeLink href={link}> <span style={{ fontSize: 'smaller', color: 'var(--soft-text)' }}>{occ.length}×</span><strong id={'link-' + id}>{name}</strong>&nbsp;&nbsp;({where})</MaybeLink><br />
         {when}
      </li>,
      note ? <Tooltip anchorSelect={`#${'link-' + id}`} content={note} key={`tt-${'link-' + id}`} place="bottom" style={{ padding: '5px 9px', lineHeight: 1.35 }} /> : undefined];
   });

   return <>
      <ul className='events-list'>
         {e.map(t => t[0])}
      </ul>
      {e.map(t => t[1]).filter(e => e !== undefined)}
   </>
}

const EVENT_CATEGORIES: Record<string, CatDef> = {
   multiday: { label: 'Camp', short: 'CAMP', color: '#4f8a5b' },
   practicum: { label: 'Practica', short: 'PRAC', color: '#b8873b' },
   singleday: { label: 'Single-Day Event', short: 'DAY', color: '#7a6fb0' },
};

export function getEventsList(): { categories: Record<string, CatDef>; order: string[]; items: CatItem[] } {
   const items: CatItem[] = [];
   for(const { name, occ, where, link, kind, waddle, credit } of events) {
      for(const o of occ) {
         items.push({
            key: `${escapeId(name)}-${o.year}-${o.month ?? 'x'}`,
            category: kind,
            year: o.year,
            month: o.month,
            title: name,
            people: credit ? <>{where} &middot; {credit}</> : waddle ? <>{where} &middot; with {WADDLE_CREDIT}</> : where,
            date: o.month !== undefined ? monthToString[o.month - 1] : undefined,
            links: link ? [{ label: 'link', href: link }] : [],
         });
      }
   }
   return { categories: EVENT_CATEGORIES, order: ['multiday', 'practicum', 'singleday'], items };
}
