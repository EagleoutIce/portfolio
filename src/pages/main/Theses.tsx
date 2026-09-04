import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { escapeId } from "../../util/id";
import { monthToString } from "./Honors";
import { renderInline, renderText } from "../../util/text";
import type { CatDef, CatItem } from "../../components/CategorizedList";
import thesesData from "../../data/theses.json";

function joinLastWith(arr: JSX.Element[], lastSeparator = ' and ') {
   if(arr.length === 0) return '';
   if(arr.length === 1) return arr[0];
   return <>
      {arr.slice(0, -1).reduce((prev, curr) => <>{prev}, {curr}</>)}
      {lastSeparator}{arr[arr.length - 1]}
   </>;
}

const TypeToStringMap = {
   'bachelor-thesis': 'Bachelor\'s Thesis',
   'master-thesis': 'Master\'s Thesis'
} as const;

const ExaminerMap = {
   'mtt': <a className='link' href='https://www.uni-ulm.de/in/sp/team/tichy/'>Prof.&nbsp;Dr.&nbsp;Matthias Tichy</a>,
   'sw': <a className='link' href='https://www.stefan-winter.net/'>Prof.&nbsp;Dr.&nbsp;Stefan Winter</a>,
   'tt': <a className='link' href='https://www.tu-braunschweig.de/isf/team/thuem'>Prof.&nbsp;Dr.&nbsp;Thomas Thüm</a>,
   'rh': <a className='link' href='https://www.uni-ulm.de/in/sp/team/prof-dr-robert-heinrich/'>Prof.&nbsp;Dr.&nbsp;Robert Heinrich</a>,
   'va': <a className='link' href='https://vincenzoarceri.github.io/'>Prof.&nbsp;Vincenzo Arceri</a>
};

interface Institute {
   name: string;
   href: string;
   /** the university the institute belongs to */
   at: string;
}

/** institutes at which former students continue with their doctorate */
const InstituteMap = {
   'sp':  { name: 'Institute of Software Engineering and Programming Languages', href: 'https://www.uni-ulm.de/in/sp/', at: 'Ulm University' },
   'vs':  { name: 'Institute of Distributed Systems', href: 'https://www.uni-ulm.de/in/vs/', at: 'Ulm University' },
   'isf': { name: 'Institute of Software Engineering and Automotive Informatics', href: 'https://www.tu-braunschweig.de/isf/', at: 'TU Braunschweig' },
} satisfies Record<string, Institute>;

interface Thesis {
   title: string;
   author: string | 'anonymous';
   type: keyof typeof TypeToStringMap;
   year: number;
   month: number;
   link?: string;
   examiners: (keyof typeof ExaminerMap)[];
   /** replaces the examiners line, e.g. for external theses */
   supervisors?: (keyof typeof ExaminerMap)[];
   advisors?: string[];
   /** note shown below the title, e.g. an award or an exchange */
   extra?: string;
   /** where the author continues with a doctorate */
   phd?: Partial<Institute> & { institute?: keyof typeof InstituteMap; field?: string; href?: string };
   /** note shown above the abstract */
   note?: string;
}

const theses = thesesData as Thesis[];

function phdNote({ phd }: Thesis): JSX.Element | undefined {
   if(!phd) {
      return undefined;
   }
   const { name, at, href } = phd.institute ? InstituteMap[phd.institute] : phd as Institute;
   return <>Now pursuing a PhD in {phd.field ?? 'computer science'} at the <a className='link' href={phd.href ?? href} target="_blank" rel="noreferrer">{name}</a> ({at}).</>;
}

/** the award/exchange note and the doctorate note, as shown below the title */
function thesisNotes(t: Thesis): JSX.Element | undefined {
   const extra = t.extra ? <>{renderInline(t.extra)}</> : undefined;
   const phd = phdNote(t);
   if(!extra || !phd) {
      return extra ?? phd;
   }
   return <>{extra}<br />{phd}</>;
}

function committee({ examiners, supervisors, advisors }: Thesis): JSX.Element {
   const people = supervisors ?? examiners;
   const label = supervisors
      ? (supervisors.length === 1 ? 'Supervisor' : 'Supervisors')
      : (examiners.length === 1 ? 'Examiner' : 'Examiners');
   return <>
      {label}: {joinLastWith(people.map(e => ExaminerMap[e]))}
      {advisors && <><br />{advisors.length === 1 ? 'Advisor' : 'Advisors'}: {joinLastWith(advisors.map(a => <>{renderInline(a)}</>))}</>}
   </>;
}

type Abstracts = Record<string, string>;

let abstracts: Abstracts | undefined;
let pending: Promise<Abstracts> | undefined;

function loadAbstracts(): Promise<Abstracts> {
   pending ??= import('../../data/theses-abstracts.json')
      .then(m => (abstracts = m.default as Abstracts));
   return pending;
}

function Abstract({ title, note }: { title: string; note?: string }) {
   const [text, setText] = useState(() => abstracts?.[title]);
   useEffect(() => {
      let live = true;
      if(text === undefined) {
         loadAbstracts().then(a => live && setText(a[title]));
      }
      return () => { live = false; };
   }, [title, text]);
   return <>
      {note && <p className='thesis-abstract-note'>{note}</p>}
      {text === undefined ? <p className='abstract-p'>Loading&hellip;</p> : renderText(text, 'abstract-p')}
   </>;
}

function ThesisDetails({ summary, className, style, summaryStyle, children }: {
   summary: ReactNode;
   className?: string;
   style?: CSSProperties;
   summaryStyle?: CSSProperties;
   children: ReactNode;
}) {
   const [mounted, setMounted] = useState(false);
   return <details className={className} style={style}
      onToggle={e => (e.target as HTMLDetailsElement).open && setMounted(true)}>
      <summary style={summaryStyle}>{summary}</summary>
      {mounted && children}
   </details>;
}

export function getThesisCounts() {
   const sort = (a: Thesis, b: Thesis) => b.year - a.year || b.month - a.month;
   const ba = theses.filter(t => t.type === 'bachelor-thesis').toSorted(sort);
   const ma = theses.filter(t => t.type === 'master-thesis').toSorted(sort);
   const names = (list: Thesis[]) => list.filter(t => t.author !== 'anonymous').map(t => t.author as string);
   return {
      ba: { count: ba.length, students: names(ba) },
      ma: { count: ma.length, students: names(ma) },
   };
}

export type ThesisType = keyof typeof TypeToStringMap;

const ThesisAbbrMap = {
   'bachelor-thesis': 'ba',
   'master-thesis': 'ma'
} as const;

/** thesis types with their totals, in display order */
export function getThesisTypes(): Array<{ key: ThesisType; abbr: string; label: string; count: number }> {
   return (Object.keys(TypeToStringMap) as ThesisType[])
      .map(k => ({ key: k, abbr: ThesisAbbrMap[k], label: TypeToStringMap[k], count: theses.filter(t => t.type === k).length }))
      .filter(t => t.count > 0);
}

const THESIS_CATEGORIES: Record<ThesisType, CatDef> = {
   'master-thesis': { label: "Master's Thesis", short: 'MA', color: '#3b7bb8' },
   'bachelor-thesis': { label: "Bachelor's Thesis", short: 'BA', color: '#4f8a5b' },
};

export function getThesesList(): { categories: Record<string, CatDef>; order: string[]; items: CatItem[] } {
   const items: CatItem[] = theses
      .toSorted((a, b) => b.year - a.year || b.month - a.month)
      .map(t => {
         const date = <>{monthToString[t.month - 1]} {t.year}</>;
         return {
            key: t.author !== 'anonymous' ? escapeId(`${t.author} ${t.year}`) : escapeId(t.title),
            category: t.type,
            year: t.year,
            month: t.month,
            title: t.title,
            people: <>
               {t.author !== 'anonymous' ? <>{t.author} &middot; {date}</> : date}
               {t.link && <a className="pub-link" href={t.link} target="_blank" rel="noreferrer">PDF</a>}
            </>,
            venue: thesisNotes(t),
            extra: <ThesisDetails className="pub-collapse" summary={<>Abstract &amp; details</>}>
               <div className="pub-collapse-body">
                  {committee(t)}
                  <p /><b>Abstract</b>
                  <div><Abstract title={t.title} note={t.note} /></div>
               </div>
            </ThesisDetails>,
         };
      });
   return { categories: THESIS_CATEGORIES, order: ['master-thesis', 'bachelor-thesis'], items };
}

/** all theses sorted by recency, the id backs the news deep links */
export function getTheses(): { id: string; type: ThesisType; li: JSX.Element }[] {
   return theses
      .toSorted(
         ({year, month}, {year: yearB, month: monthB}) => yearB - year || monthB - month
      )
      .map(thesis => {
         const { title, author, link, year, month, type } = thesis;
         const notes = thesisNotes(thesis);
         const id = escapeId(title);
         const li = <li key={id}>
            <span className='small-caps thesis-type-tag'>{ThesisAbbrMap[type]}</span><strong id={'link-' + id}>{title}</strong> <span className='theses-author-meta'>({author !== 'anonymous' ? author + ', ' : ''}{monthToString[month - 1]}&nbsp;{year})</span>{link && <>&emsp;<a href={link} className="bib-link" target="_blank" rel="noreferrer">[PDF]</a></>}<br />
            {notes ? <><span> {notes} </span></> : null}
            <ThesisDetails style={{ margin: '0em 0 .5em 0' }}
               summaryStyle={{ cursor: 'pointer', userSelect: 'none' }} summary={<i>Details</i>}>
               <span>{committee(thesis)}</span><br/>
               <span>{link && <>Link: <a href={link} className="bib-link" target="_blank" rel="noreferrer">{link}</a></>}</span>
               <p />
               <b>Abstract</b>
               <div><Abstract title={thesis.title} note={thesis.note} /></div>
            </ThesisDetails>
         </li>;
         return { id, type, li };
      });
}

