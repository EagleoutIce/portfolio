import { useLayoutEffect, useMemo } from 'react';
import './PublicationsPage.css';
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import { BibDataMain, BibDataPoster, BibDataTalks, BibDataOther } from '../main/BibliographyData';
import { LastUpdated } from '../../components/LastUpdated';
import { SiteNotice } from '../../components/SiteNotice';
import { CategorizedList, type CatItem } from '../../components/CategorizedList';

/* one visual class per venue kind, in the spirit of the coloured lists on
   academic homepages. colours are fixed hues (independent of the page accent)
   chosen to stay legible on both the light and dark background. */
type Category = 'journal' | 'conference' | 'workshop' | 'demo' | 'doctoral' | 'thesis' | 'book' | 'talk' | 'poster' | 'other';

const CATEGORY: Record<Category, { label: string; short: string; color: string }> = {
   journal: { label: 'Journal', short: 'JOUR', color: '#3b7bb8' },
   conference: { label: 'Conference', short: 'CONF', color: '#4f8a5b' },
   workshop: { label: 'Workshop', short: 'WORK', color: '#b8873b' },
   demo: { label: 'Tool Demo', short: 'DEMO', color: '#7a6fb0' },
   doctoral: { label: 'Doctoral Symposium', short: 'DOCT', color: '#9c8b5a' },
   thesis: { label: 'Thesis', short: 'THES', color: '#a05a7a' },
   book: { label: 'Book', short: 'BOOK', color: '#9c6b4a' },
   talk: { label: 'Talk', short: 'TALK', color: '#3e9ca0' },
   poster: { label: 'Poster', short: 'POST', color: '#c0524b' },
   other: { label: 'Other', short: 'MISC', color: '#8a8a8a' },
};

/* the order categories appear in the legend / are grouped visually */
const CATEGORY_ORDER: Category[] = ['journal', 'conference', 'workshop', 'demo', 'doctoral', 'thesis', 'book', 'talk', 'poster', 'other'];

interface Author {
   readonly text: string;
   readonly isMe: boolean;
}

interface Pub {
   readonly key: string;
   readonly title: string;
   readonly authors: Author[];
   readonly year: number;
   readonly month: number;
   readonly venue: string;
   readonly category: Category;
   readonly links: { label: string; href: string }[];
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
   const text = [given, family].filter(Boolean).join(' ');
   const isMe = family === 'Sihler' && given.startsWith('Florian');
   return { text: text || family, isMe };
}

function categorize(entry: Record<string, unknown>, source: string): Category {
   if(source === 'talk') return 'talk';
   if(source === 'poster') return 'poster';

   const type = String(entry['type'] ?? '');
   const genre = String(entry['genre'] ?? '').toLowerCase();
   const haystack = [entry['container-title'], entry['event'], entry['event-title'], genre]
      .filter(Boolean).join(' ').toLowerCase();

   if(genre.includes('thesis')) return 'thesis';
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

function parse(): Pub[] {
   const pubs: Pub[] = [];
   for(const { content, source } of sources) {
      const cite = new Cite(content);
      for(const entry of cite.data as Record<string, unknown>[]) {
         if(!entry || typeof entry !== 'object') continue;
         const dateParts = (entry['issued'] as { 'date-parts'?: number[][] } | undefined)?.['date-parts']?.[0] ?? [];
         const authors = Array.isArray(entry['author']) ? entry['author'].map(formatAuthor) : [];
         const venue = stripBraces(entry['container-title']) || stripBraces(entry['event-title'])
            || stripBraces(entry['event']) || cleanGenre(entry['genre']);
         pubs.push({
            key: String(entry['id'] ?? entry['title'] ?? Math.random()),
            title: stripBraces(entry['title']),
            authors,
            year: Number(dateParts[0] ?? 0),
            month: Number(dateParts[1] ?? 0),
            venue,
            category: categorize(entry, source),
            links: buildLinks(entry),
         });
      }
   }
   pubs.sort((a, b) => (b.year - a.year) || (b.month - a.month) || a.title.localeCompare(b.title));
   return pubs;
}

function downloadAllBib() {
   const content = [BibDataMain, BibDataTalks, BibDataPoster, BibDataOther].join('\n\n');
   const url = URL.createObjectURL(new Blob([content], { type: 'application/x-bibtex' }));
   const a = document.createElement('a');
   a.href = url;
   a.download = 'sihler-publications.bib';
   a.click();
   URL.revokeObjectURL(url);
}

function Authors({ authors }: { authors: Author[] }) {
   return <span className="pub-authors">
      {authors.map((a, i) =>
         <span key={i}>
            <span className={a.isMe ? 'pub-author-me' : undefined}>{a.text}</span>
            {i < authors.length - 1 ? ', ' : ''}
         </span>
      )}
   </span>;
}

export function PublicationsPage() {
   useLayoutEffect(() => { window.scrollTo(0, 0); }, []);
   const items = useMemo<CatItem[]>(() => parse().map(p => ({
      key: p.key,
      category: p.category,
      year: p.year,
      month: p.month,
      title: p.title,
      people: p.authors.length > 0 ? <Authors authors={p.authors} /> : undefined,
      venue: p.venue || undefined,
      links: p.links,
   })), []);

   return <div className="pub-page">
      <div className="pub-topbar">
         <a className="pub-back" href="#/publications">&larr; back to overview</a>
      </div>

      <h1 className="pub-title">Publications</h1>
      <p className="pub-lead">
         A detailed, color-coded listing of my publications, talks, and posters. You can
         {' '}<a className="pub-inline-link" href="#" onClick={e => { e.preventDefault(); downloadAllBib(); }}>download the <span className="code">.bib</span> files</a>{' '}
         or see the compact overview on the <a className="pub-inline-link" href="#/publications">main page</a>.
      </p>

      <CategorizedList categories={CATEGORY} order={CATEGORY_ORDER} items={items} />

      <SiteNotice />
      <LastUpdated />
   </div>;
}
