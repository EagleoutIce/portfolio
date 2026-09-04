import { MaybeLink } from "../../components/MaybeLink";
import { Tooltip } from "react-tooltip";
import { escapeId } from "../../util/id";
import type { CatItem } from "../../components/CategorizedList";
import honorsData from "../../data/honors.json";
import { Icon } from '../../components/Icon';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { Collapsible } from '../../components/Collapsible';
import './Honors.css';

export interface Honors {
   type: 'honor' | 'award' | 'grant' | 'fellowship' | 'scholarship';
   title: string;
   year: number;
   month: number;
   note?: string;
   link?: string;
   /** in Euro */
   amount?: number;
}

const honors = honorsData as Honors[];

export const monthToString = [
   'January', 'February', 'March', 'April', 'May', 'June',
   'July', 'August', 'September', 'October', 'November', 'December'
];

const TypeToString: Record<Honors['type'], string> = {
   'honor': 'Honor',
   'award': 'Award',
   'grant': 'Grant',
   'scholarship': 'Scholarship',
   'fellowship': 'Fellowship'
};


export function formatEuro(amount: number): string {
   return `€${amount.toLocaleString('en-US')}`;
}

function grantsByImportance(): Honors[] {
   return honors
      .filter(h => h.type === 'grant')
      .toSorted((a, b) =>
         (b.amount ?? -1) - (a.amount ?? -1) || b.year - a.year || b.month - a.month
      );
}

export function getGrantCount(): { count: number; grants: Array<{ title: string; amount?: number }> } {
   const grants = grantsByImportance();
   return { count: grants.length, grants: grants.map(g => ({ title: g.title, amount: g.amount })) };
}

export function getFeaturedGrants(n = 3): Honors[] {
   return grantsByImportance().slice(0, n);
}

export function getFeaturedAwards(n = 3): Honors[] {
   return honors
      .filter(h => h.type === 'award')
      .toSorted((a, b) => b.year - a.year || b.month - a.month)
      .slice(0, n);
}

/** honors/awards/grants as timeline entries (category is the global bucket) */
export function getHonorsTimeline(): CatItem[] {
   return honors.map(h => ({
      key: escapeId(`${h.title}-${h.year}`),
      category: h.type,
      year: h.year,
      month: h.month,
      title: h.title,
      people: <>{TypeToString[h.type]}{h.amount !== undefined && <> &middot; {formatEuro(h.amount)}</>}</>,
      date: monthToString[h.month - 1],
      links: h.link ? [{ label: 'link', href: h.link }] : [],
      extra: h.note,
   }));
}

export function getHonors(exclude?: ReadonlySet<string>): [li: JSX.Element, tooltip: JSX.Element | undefined][] {
   return honors.toSorted(
      (a, b) => b.year - a.year || b.month - a.month || a.title.localeCompare(b.title)
   )
   .filter(({title}) => !exclude?.has(title))
   .map(({type, title, year, month, link, note, amount}) => {
      const id = escapeId(title).substring(0,10);

      return [<li key={`list-${id}`}>
         <MaybeLink href={link}>
            <strong id={'link-' + id}>{TypeToString[type]}&nbsp;({monthToString[month - 1]}, {year}):</strong>
            &nbsp;{title}{amount !== undefined && <>&ensp;<span style={{ color: 'var(--soft-text)', fontSize: 'smaller' }}>({formatEuro(amount)})</span></>}
         </MaybeLink>
      </li>,
      note ? <Tooltip anchorSelect={`#${'link-' + id}`} content={note} key={`tt-${'link-' + id}`} place="bottom" style={{ padding: '5px 9px', lineHeight: 1.35 }}/> : undefined];
   });
}

export function MyHonors() {
  const grants = getFeaturedGrants();
  const awards = getFeaturedAwards();
  const others = getHonors(new Set([...grants, ...awards].map(f => f.title)));
  return <>
    So far, me and my work received the following honors, awards, and grants/stipends:

    <div className='featured-grants'>
      {grants.map(({ title, amount, link, year, month }) =>
        <a key={title} className='featured-grant' href={link} target="_blank" rel="noreferrer" title={title}>
          <span className='featured-grant-amount'>{amount !== undefined ? formatEuro(amount) : year}</span>
          <span className='featured-grant-title'>{title}</span>
          <span className='featured-grant-meta'>Grant, {monthToString[month - 1]} {year}</span>
        </a>
      )}
    </div>

    <div className='featured-grants'>
      {awards.map(({ title, link, year, month }) =>
        <a key={title} className='featured-grant' href={link} target="_blank" rel="noreferrer" title={title}>
          <span className='featured-grant-amount'><Icon icon={faAward} /> {year}</span>
          <span className='featured-grant-title'>{title}</span>
          <span className='featured-grant-meta'>Award, {monthToString[month - 1]} {year}</span>
        </a>
      )}
    </div>

    <Collapsible className='honors-other' title='Other honors, grants, and scholarships'
      count={`${others.length} ${others.length === 1 ? 'entry' : 'entries'}`}>
      <p className='note'>A couple more selected grants, honors, and scholarships (not everything makes it onto this page):</p>
      <ul className='honors-list'>
        {others.map(h => h[0])}
      </ul>
      {others.map(h => h[1]).filter(e => e !== undefined)}
    </Collapsible>
 </>;
}
