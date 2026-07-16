import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { SocialMediaIcon } from "../../components/SocialMediaIcon";
import ShortLong from "../../components/Acronym";
import { Tooltip } from "react-tooltip";
import { escapeId } from "../../util/id";
import { faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import type { CatItem } from "../../components/CategorizedList";

interface Honors {
   type: 'honor' | 'award' | 'grant' | 'fellowship' | 'scholarship';
   title: string;
   year: number;
   month: number;
   note?: string;
   link?: string;
   // in Euro
   amount?: number;
}

export const monthToString = [
   'January', 'February', 'March', 'April', 'May', 'June',
   'July', 'August', 'September', 'October', 'November', 'December'
];

export const TypeToStringMap = {
   'honor': () => <>Honor</>,
   'award': () => <>Award</>,
   'grant': () => <>Grant</>,
   'scholarship': () => <>Scholarship</>,
   'fellowship': () => <>Fellowship</>
} as const
   

const honors: Honors[] = [];
honors.push({
   type: 'grant',
   title: 'Unrestricted Gift by Posit for a "Security and Taint Analysis for R"',
   year: 2026,
   month: 1,
   amount: 60000,
   link: 'https://www.uni-ulm.de/in/sp/institute/news-detail/article/flowr-receives-unrestricted-gift-from-posit/'
})
honors.push({
   type: 'award',
   title: 'Rising Star Award at RSECon \'25',
   year: 2025,
   month: 9,
   link: 'https://www.uni-ulm.de/in/sp/institute/news-detail/article/rising-star-award-at-rsecon25/'
})
honors.push({
   type: 'grant',
   title: 'DAAD stipend for a research stay at the CU/CTU in Prague',
   year: 2025,
   month: 6,
   amount: 2000,
   link: 'https://prl-prg.github.io/'
})
honors.push({
   type: 'grant',
   title: 'iwimint-grant by Ulm University for Waddle',
   year: 2025,
   month: 6,
   amount: 4200,
   link: 'https://www.uni-ulm.de/in/sp/institute/news-detail/article/waddle-receives-iwimint-funding/'
})
honors.push({
   type: 'grant',
   title: 'Abbe Grant by the Carl-Zeiss-Stiftung',
   year: 2025,
   month: 6,
   link: 'https://www.uni-ulm.de/in/sp/institute/news-detail/article/florian-sihler-accepted-at-the-12th-heidelberg-laureate-forum/'
})
honors.push({
   type: 'award',
   title: 'Best Master\'s Degree in Computer Science at Ulm University',
   year: 2024,
   month: 6,
   link: 'https://www.uni-ulm.de/in/sp/institute/news-detail/article/award-for-the-best-masters-degree/'
})
honors.push({
   type: 'award',
   title: 'YoungRSE Award at deRSE \'24',
   year: 2024,
   month: 3,
   link: 'https://www.uni-ulm.de/in/sp/institute/news-detail/article/youngrse-award-at-derse24/'
})
honors.push({
   type: 'award',
   title: 'Various prizes for the Abitur',
   year: 2018,
   month: 7,
   note: 'Ferry Porsche Award, Physics Abitur Award (DPG), Paul-Schempp Award, Math Abitur Award (DMV)',
})
honors.push({
   type: 'scholarship',
   title: 'e-fellows online scholarship',
   year: 2018,
   month: 7
})
honors.push({
   type: 'scholarship',
   title: 'Glemser Stiftung For Future Excellency',
   year: 2018,
   month: 6
})

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
      people: <>{TypeToStringMap[h.type]()}{h.amount !== undefined && <> &middot; {formatEuro(h.amount)}</>}</>,
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
         <a href={link} target="_blank" rel="noreferrer">
            <strong id={'link-' + id}>{TypeToStringMap[type]()}&nbsp;({monthToString[month - 1]}, {year}):</strong>
            &nbsp;{title}{amount !== undefined && <>&ensp;<span style={{ color: 'var(--soft-text)', fontSize: 'smaller' }}>({formatEuro(amount)})</span></>}
         </a>
      </li>,
      note ? <Tooltip anchorSelect={`#${'link-' + id}`} content={note} key={`tt-${'link-' + id}`} place="bottom" style={{ padding: '5px 9px', lineHeight: 1.35 }}/> : undefined];
   });
}
