import type { ReactNode } from 'react';
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import { BibDataMain, BibDataPoster, BibDataTalks, BibDataOther } from '../main/BibliographyData';
import type { CatDef, CatItem } from '../../components/CategorizedList';
import { PUB_ABSTRACTS } from './abstracts';
import { escapeId } from '../../util/id';

/* one visual class per venue kind, in the spirit of the coloured lists on
   academic homepages. colours are fixed hues (independent of the page accent)
   chosen to stay legible on both the light and dark background. */
export type Category = 'journal' | 'conference' | 'workshop' | 'demo' | 'doctoral' | 'master-thesis' | 'bachelor-thesis' | 'book' | 'talk' | 'poster' | 'other';

export const CATEGORY: Record<Category, CatDef> = {
   journal: { label: 'Journal', short: 'JOUR', color: '#3b7bb8' },
   conference: { label: 'Conference', short: 'CONF', color: '#4f8a5b' },
   workshop: { label: 'Workshop', short: 'WORK', color: '#b8873b' },
   demo: { label: 'Tool Demo', short: 'DEMO', color: '#7a6fb0' },
   doctoral: { label: 'Doctoral Symposium', short: 'DOCT', color: '#9c8b5a' },
   'master-thesis': { label: "Master's Thesis", short: 'MA', color: '#8d4e86' },
   'bachelor-thesis': { label: "Bachelor's Thesis", short: 'BA', color: '#b06fa6' },
   book: { label: 'Book', short: 'BOOK', color: '#9c6b4a' },
   talk: { label: 'Talk', short: 'TALK', color: '#3e9ca0' },
   poster: { label: 'Poster', short: 'POST', color: '#c0524b' },
   other: { label: 'Other', short: 'MISC', color: '#8a8a8a' },
};

/* the order categories appear in the legend / are grouped visually */
export const CATEGORY_ORDER: Category[] = ['journal', 'conference', 'workshop', 'demo', 'doctoral', 'master-thesis', 'bachelor-thesis', 'book', 'talk', 'poster', 'other'];

export interface Author {
   readonly text: string;
   readonly isMe: boolean;
}

export interface Pub {
   /** clean, human-readable deep-link slug (e.g. sihler-2025-statically-analyzing) */
   readonly key: string;
   /** original BibTeX id, used to look up the abstract */
   readonly id: string;
   readonly title: string;
   readonly authors: Author[];
   readonly year: number;
   readonly month: number;
   readonly venue: string;
   readonly category: Category;
   readonly links: { label: string; href: string }[];
   readonly abstract?: string;
}

const sources: { content: string; source: 'paper' | 'talk' | 'poster' | 'other' }[] = [
   { content: BibDataMain, source: 'paper' },
   { content: BibDataTalks, source: 'talk' },
   { content: BibDataPoster, source: 'poster' },
   { content: BibDataOther, source: 'other' },
];

function stripBraces(value: unknown): string {
   return typeof value === 'string' ? value.replace(/[{}]/g, '').replace(/\s+/g, ' ').trim() : '';
}

/* genre carries markup (award badges) and extra notes; keep it as a plain,
   readable venue fallback for entries without a container/event (e.g. theses) */
function cleanGenre(value: unknown): string {
   return typeof value === 'string' ? value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() : '';
}

function formatAuthor(a: Record<string, unknown>): Author {
   const literal = stripBraces(a['literal']);
   if(literal) {
      return { text: literal, isMe: false };
   }
   const family = stripBraces(a['family']);
   const given = stripBraces(a['given']);
   const text = [given, family].filter(Boolean).join(' ');
   const isMe = family === 'Sihler' && given.startsWith('Florian');
   return { text: text || family, isMe };
}

/* short list of words dropped from the leading title words of a slug so keys
   stay readable (e.g. "on-the-anatomy" → "anatomy") */
const SLUG_STOPWORDS = new Set(['a', 'an', 'the', 'of', 'on', 'in', 'for', 'to', 'and', 'towards', 'using']);

/* a clean, stable deep-link key: first author's family + year + a few title
   words, with slashes/spaces/punctuation collapsed to '-'. This replaces the
   raw BibTeX id (e.g. DBLP:conf/euromicro/…) which looked ugly in the URL. */
function pubSlug(firstFamily: string, year: number, title: string): string {
   const words = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w && !SLUG_STOPWORDS.has(w))
      .slice(0, 4)
      .join(' ');
   return escapeId(`${firstFamily} ${year} ${words}`).toLowerCase();
}

function categorize(entry: Record<string, unknown>, source: string): Category {
   if(source === 'talk') return 'talk';
   if(source === 'poster') return 'poster';

   const type = String(entry['type'] ?? '');
   const genre = String(entry['genre'] ?? '').toLowerCase();
   const haystack = [entry['container-title'], entry['event'], entry['event-title'], genre]
      .filter(Boolean).join(' ').toLowerCase();

   if(genre.includes('thesis')) return genre.includes('bachelor') ? 'bachelor-thesis' : 'master-thesis';
   if(genre.includes('doctoral') || haystack.includes('doctoral')) return 'doctoral';
   if(genre.includes('demonstration') || haystack.includes('demonstration')
      || haystack.includes('tool demo') || /\/td\b/.test(haystack)) return 'demo';
   if(type === 'book' || type === 'chapter') return 'book';
   if(type === 'article-journal' || type === 'article') return 'journal';
   if(source === 'other') return 'other';
   if(haystack.includes('workshop')) return 'workshop';
   return 'conference';
}

function buildLinks(entry: Record<string, unknown>): { label: string; href: string }[] {
   const links: { label: string; href: string }[] = [];
   const seen = new Set<string>();
   const push = (label: string, href: string) => {
      if(!href || seen.has(href)) return;
      seen.add(href);
      links.push({ label, href });
   };

   const doi = typeof entry['DOI'] === 'string' ? entry['DOI'].replace(/\\_/g, '_').trim() : '';
   if(doi) push('DOI', `https://doi.org/${doi}`);

   /* preprints are noted as "…, preprint: <url>" in the bib note field */
   const note = typeof entry['note'] === 'string' ? entry['note'] : '';
   const preprint = note.match(/preprint:\s*(\S+)/i);
   if(preprint) push('preprint', preprint[1].replace(/[.,;]+$/, ''));

   const url = typeof entry['URL'] === 'string' ? entry['URL'].trim() : '';
   if(url) {
      if(url.includes('arxiv.org')) push('arXiv', url);
      else if(!url.includes('doi.org')) push('link', url);
   }
   return links;
}

/** all publications (papers, talks, posters, other), newest first */
export function getPublications(): Pub[] {
   const pubs: Pub[] = [];
   const usedKeys = new Set<string>();
   for(const { content, source } of sources) {
      const cite = new Cite(content);
      for(const entry of cite.data as Record<string, unknown>[]) {
         if(!entry || typeof entry !== 'object') continue;
         const id = String(entry['id'] ?? entry['title'] ?? '');
         const dateParts = (entry['issued'] as { 'date-parts'?: number[][] } | undefined)?.['date-parts']?.[0] ?? [];
         const rawAuthors = Array.isArray(entry['author']) ? entry['author'] as Record<string, unknown>[] : [];
         const authors = rawAuthors.map(formatAuthor);
         const title = stripBraces(entry['title']);
         const year = Number(dateParts[0] ?? 0);
         const firstFamily = stripBraces(rawAuthors[0]?.['family'])
            || stripBraces(rawAuthors[0]?.['literal']).split(' ').pop() || '';
         const venue = stripBraces(entry['container-title']) || stripBraces(entry['event-title'])
            || stripBraces(entry['event']) || cleanGenre(entry['genre']);

         /* prefer a fetched abstract, fall back to one embedded in the .bib */
         const abstract = PUB_ABSTRACTS[id] ?? (stripBraces(entry['abstract']) || undefined);

         /* keep the deep-link slug clean but guaranteed unique */
         let key = pubSlug(firstFamily, year, title) || escapeId(id).toLowerCase();
         for(let n = 2; usedKeys.has(key); n++) key = `${key}-${n}`;
         usedKeys.add(key);

         pubs.push({
            key, id, title, authors, year,
            month: Number(dateParts[1] ?? 0),
            venue,
            category: categorize(entry, source),
            links: buildLinks(entry),
            abstract,
         });
      }
   }
   pubs.sort((a, b) => (b.year - a.year) || (b.month - a.month) || a.title.localeCompare(b.title));
   return pubs;
}

export function Authors({ authors }: { authors: Author[] }) {
   return <span className="pub-authors">
      {authors.map((a, i) =>
         <span key={i}>
            <span className={a.isMe ? 'pub-author-me' : undefined}>{a.text}</span>
            {i < authors.length - 1 ? ', ' : ''}
         </span>
      )}
   </span>;
}

/* section headers that appear inline in some abstracts (Crossref/OPARU keep the
   IMRaD structure). We surface them as small bold leads, mirroring the way the
   thesis abstracts are laid out. */
const ABSTRACT_HEADERS = ['Context', 'Background', 'Objective', 'Aim', 'Approach',
   'Method', 'Methods', 'Result', 'Results', 'Limitation', 'Limitations',
   'Conclusion', 'Conclusions', 'Contributions'];

const HEADER_RE = new RegExp(
   `(?:^|\\s)((?:${ABSTRACT_HEADERS.join('|')})|(?:${ABSTRACT_HEADERS.map(h => h.toUpperCase()).join('|')}))\\b:?\\s+`,
   'g');

function titleCase(word: string): string {
   return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/** render an abstract, promoting inline IMRaD headers to bold section leads */
export function renderAbstract(text: string): ReactNode {
   const matches = [...text.matchAll(HEADER_RE)];
   if(matches.length < 2) return <p className="pub-abstract-p">{text}</p>;

   const parts: { header?: string; body: string }[] = [];
   const preamble = text.slice(0, matches[0].index).trim();
   if(preamble) parts.push({ body: preamble });
   matches.forEach((m, i) => {
      const start = (m.index ?? 0) + m[0].length;
      const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
      parts.push({ header: titleCase(m[1]), body: text.slice(start, end).trim() });
   });

   return <>{parts.map((p, i) =>
      <p className="pub-abstract-p" key={i}>
         {p.header && <b className="pub-abstract-head">{p.header}. </b>}{p.body}
      </p>
   )}</>;
}

/** the abstract/details reveal shown under an entry, mirroring the theses page */
function abstractDetails(pub: Pub): ReactNode {
   if(!pub.abstract) return undefined;
   return <details className="pub-collapse">
      <summary>Abstract</summary>
      <div className="pub-collapse-body pub-abstract">{renderAbstract(pub.abstract)}</div>
   </details>;
}

/** the detailed publications list, as CategorizedList items */
export function getPublicationsItems(): CatItem[] {
   return getPublications().map(p => ({
      key: p.key,
      category: p.category,
      year: p.year,
      month: p.month,
      title: p.title,
      people: p.authors.length > 0 ? <Authors authors={p.authors} /> : undefined,
      venue: p.venue || undefined,
      links: p.links,
      extra: abstractDetails(p),
   }));
}
