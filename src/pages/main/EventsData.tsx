import { Tooltip } from "react-tooltip";
import { escapeId } from "../../util/id";
import { monthToString } from "./HonorsData";
import './MyEvents.css'

interface Event {
   when: JSX.Element[];
   where: string;
   note?: string;
   link?: string;
}

function time(month: number | 'no', year: number) {
   return <span key={`time-${month}-${year}`}>{month === 'no' ? '' : monthToString[month - 1] + ' '}{year}</span>;
}



const events = new Map<string, Event>();

// LaDeWi, BOGY, Girls' Day, Summer Science Camp
events.set('Summer Science Camp', {
   when: [time('no', 2024)],
   where: 'Ulm University',
   link: 'https://www.uni-ulm.de/einrichtungen/ulmer-3-generationen-uni/science-camps/'
});
events.set('BOGY (Berufs-Orientierung an Gymnasien)', {
   when: [time(4, 2024), time(5, 2024), time(4, 2025),<>{time(1,2026)} (thank you to J. Schubert)</>, time(2, 2026)],
   where: 'Ulm University',
   link: 'https://www.uni-ulm.de/studium/studienberatung/veranstaltungen-fuer-studieninteressierte/'
});
events.set('Girls\' Day', {
   when: [time( 'no', 2024), time( 'no', 2025)],
   where: 'Ulm University',
   link: 'https://www.uni-ulm.de/einrichtungen/ulmer-3-generationen-uni/girls-boys-day/'
});
events.set('Langer Abend der Wissenschaft', {
   when: [time( 'no', 2024), time( 'no', 2025)],
   where: 'Ulm University',
   link: 'https://www.uni-ulm.de/universitaet/hochschulkommunikation/veranstaltungen/langer-abend-der-wissenschaft/'
});

export function MyEvents(): JSX.Element {
   const entries = Array.from(events.entries());
   const e = entries.toSorted(
      ([a,], [b,]) => a.localeCompare(b)
   ).map(([name, { when, link, where, note }]) => {
      const id = escapeId(name);
      
      return [<li key={id}>
         <a href={link} target="_blank" rel="noreferrer"> <span style={{ fontSize: 'smaller', color: 'gray' }}>{when.length}×</span><strong id={'link-' + id}>{name}</strong>&nbsp;&nbsp;({where})</a><br /> 
         {when.map((w, i) => <>{w}{i < when.length - 1 ? ', ' : ''}</>)}
      </li>, 
      note ? <Tooltip anchorSelect={`#${'link-' + id}`} content={note} key={`tt-${'link-' + id}`} place="bottom" style={{ padding: '2px 6px', margin: '-6px 0px' }}/> : undefined];
   });
   
   return <>
      <ul className='events-list'>
         {e.map(t => t[0])}
      </ul>
      {e.map(t => t[1]).filter(e => e !== undefined)}
   </>
}

