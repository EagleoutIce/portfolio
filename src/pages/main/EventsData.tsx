import { Tooltip } from "react-tooltip";
import { escapeId } from "../../util/id";
import { monthToString } from "./HonorsData";
import type { CatDef, CatItem } from "../../components/CategorizedList";
import './MyEvents.css'

interface Occurrence {
   year: number;
   month?: number;
   note?: string;
}

type EventKind = 'multiday' | 'practicum' | 'singleday';

interface Event {
   occ: Occurrence[];
   where: string;
   kind: EventKind;
   note?: string;
   link?: string;
}

const events = new Map<string, Event>();

events.set('Summer Science Camp', {
   occ: [{ month: 8, year: 2024 }, { month: 8, year: 2026 }],
   where: 'Ulm University',
   kind: 'multiday',
   link: 'https://www.uni-ulm.de/einrichtungen/ulmer-3-generationen-uni/science-camps/'
});
events.set('Pupil Internships', {
   occ: [{ month: 5, year: 2026 }],
   where: 'Ulm University',
   kind: 'practicum',
});
events.set('BOGY (Berufs-Orientierung an Gymnasien)', {
   occ: [{ month: 4, year: 2024 }, { month: 5, year: 2024 }, { month: 4, year: 2025 },
      { month: 1, year: 2026, note: 'thank you to J. Schubert' }, { month: 2, year: 2026 },
      { month: 4, year: 2026 }, { month: 5, year: 2026 }],
   where: 'Ulm University',
   kind: 'singleday',
   link: 'https://www.uni-ulm.de/studium/studienberatung/veranstaltungen-fuer-studieninteressierte/'
});
events.set('Girls\' Day', {
   occ: [{ month: 4, year: 2024 }, { month: 4, year: 2025 }, { month: 4, year: 2026 }],
   where: 'Ulm University',
   kind: 'singleday',
   link: 'https://www.uni-ulm.de/einrichtungen/ulmer-3-generationen-uni/girls-boys-day/'
});
events.set('Langer Abend der Wissenschaft', {
   occ: [{ month: 6, year: 2024 }, { month: 5, year: 2025 }, { month: 5, year: 2026 }],
   where: 'Ulm University',
   kind: 'singleday',
   link: 'https://www.uni-ulm.de/universitaet/hochschulkommunikation/veranstaltungen/langer-abend-der-wissenschaft/'
});

function occTime(o: Occurrence) {
   const now = new Date();
   const isFuture = o.year > now.getFullYear()
      || (o.year === now.getFullYear() && o.month !== undefined && o.month > now.getMonth() + 1);
   return <span key={`t-${o.month ?? 'x'}-${o.year}`}>
      <span className={'event-time' + (isFuture ? ' future-time' : '')}>
         {o.month !== undefined ? monthToString[o.month - 1] + ' ' : ''}{o.year}
      </span>
      {o.note ? <span className="event-note"> ({o.note})</span> : null}
   </span>;
}

export function MyEvents(): JSX.Element {
   const e = Array.from(events.entries()).toSorted(([a], [b]) => a.localeCompare(b)).map(([name, { occ, link, where, note }]) => {
      const id = escapeId(name);
      const when = occ.map(occTime);
      return [<li key={id}>
         <a href={link} target="_blank" rel="noreferrer"> <span style={{ fontSize: 'smaller', color: 'var(--soft-text)' }}>{occ.length}×</span><strong id={'link-' + id}>{name}</strong>&nbsp;&nbsp;({where})</a><br />
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
   for(const [name, { occ, where, link, kind }] of events.entries()) {
      for(const o of occ) {
         items.push({
            key: `${escapeId(name)}-${o.year}-${o.month ?? 'x'}`,
            category: kind,
            year: o.year,
            month: o.month,
            title: name,
            people: where,
            venue: o.month !== undefined ? monthToString[o.month - 1] : undefined,
            links: link ? [{ label: 'link', href: link }] : [],
         });
      }
   }
   return { categories: EVENT_CATEGORIES, order: ['multiday', 'practicum', 'singleday'], items };
}
