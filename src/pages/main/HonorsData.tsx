import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { SocialMediaIcon } from "../../components/SocialMediaIcon";
import ShortLong from "../../components/Acronym";
import { Tooltip } from "react-tooltip";
import { escapeId } from "../../util/id";
import { faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface Honors {
   type: 'honor' | 'award' | 'grant' | 'fellowship' | 'scholarship';
   title: string;
   year: number;
   month: number;
   note?: string;
   link?: string;
}

const monthToString = [
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
   title: 'DAAD stipend for a research stay at the CU/CTU in Prague',
   year: 2025,
   month: 6,
   link: 'https://prl-prg.github.io/'
})
honors.push({
   type: 'grant',
   title: 'iwimint-grant by the University of Ulm for Waddle',
   year: 2025,
   month: 6,
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
   title: 'YoungRSE Prize at the deRSE 2024',
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

export function getHonors() {
   return honors.toSorted(
      (a, b) => b.year - a.year || b.month - a.month || a.title.localeCompare(b.title)
   )
   .map(({type, title, year, month, link, note}) => {
      const id = escapeId(title);
      return <><li key={id}>
         <a href={link} target="_blank" rel="noreferrer"><strong id={'link-' + id}>{TypeToStringMap[type]()}&nbsp;({monthToString[month - 1]}, {year}):</strong>&nbsp;{title}</a>
      </li>
      { note ? <Tooltip anchorSelect={`#${'link-' + id}`} content={note} key={`tt-${'link-' + id}`} place="bottom" style={{ padding: '2px 6px', margin: '-6px 0px' }}/> : '' }
      </>;
   });
}
