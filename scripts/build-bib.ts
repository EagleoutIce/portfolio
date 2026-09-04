/* Renders the .bib sources with citation-js once, at build time, into
   src/data/bibliography.json. Keeping citation-js out of the browser bundle
   saves ~160 kB gzip on every page load; run via the pre-scripts in
   package.json whenever a .bib file changes. */
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-csl';
import { readFileSync, writeFileSync } from 'node:fs';

const SOURCES: Record<string, string> = {
   paper: 'publications.bib',
   talk: 'talks.bib',
   poster: 'posters.bib',
   other: 'other.bib'
};

interface RenderedSource {
   entries: string[];
   data: CslEntry[];
}

function cleanUpData(cite: Cite): void {
   cite.set(cite.data.map(entry => {
      if(entry === undefined || typeof entry !== 'object') {
         return entry;
      }
      if(typeof entry.DOI === 'string') {
         entry.DOI = entry.DOI.replaceAll(String.raw`\_`, '_').trim();
      }
      return entry;
   }));
}

function sortAccordingToYear(cite: Cite): void {
   cite.sort(({ issued: a }, { issued: b }) => {
      const yearA = a?.['date-parts'][0][0] ?? 0;
      const yearB = b?.['date-parts'][0][0] ?? 0;
      if(yearA !== yearB) {
         return yearB - yearA;
      }
      return (b?.['date-parts'][0][1] ?? 0) - (a?.['date-parts'][0][1] ?? 0);
   });
}

const out: Record<string, RenderedSource> = {};
for(const [source, file] of Object.entries(SOURCES)) {
   const cite = new Cite(readFileSync(`src/resources/bibliographies/${file}`, 'utf8'));
   cleanUpData(cite);
   sortAccordingToYear(cite);

   const rendered = cite.format('bibliography', {
      format: 'html',
      template: 'apa',
      lang: 'en-US',
      asEntryArray: true,
      nosort: true,
      prepend(entry) {
         let prefix = '<div style="position: relative">';
         if(typeof entry.DOI === 'string') {
            prefix += '<a href="https://doi.org/' + entry.DOI + '" target="_blank" rel="noreferrer">';
         } else if(entry.URL !== undefined) {
            prefix += '<a href="' + entry.URL + '" target="_blank" rel="noreferrer">';
         }
         if(entry.event !== undefined) {
            prefix += ` <div class="breadcrumb-container"><span class="breadcrumb">${entry.event}</span></div>`;
         }
         return prefix;
      },
      append(entry) {
         let suffix = '';
         if(entry.DOI !== undefined || entry.URL !== undefined) {
            suffix += '</a>';
         }
         if(entry.note !== undefined) {
            suffix += `&emsp;${entry.note}`;
         }
         return suffix + '</div>';
      }
   });

   /* _graph is citation-js' provenance trail (megabytes of it) — the page only
      ever reads the CSL fields */
   const data = cite.data.map(({ _graph, ...entry }) => entry);
   out[source] = { entries: rendered.map(([, entry]) => entry), data };
}

writeFileSync('src/data/bibliography.json', JSON.stringify(out) + '\n');
const counts = Object.entries(out).map(([k, v]) => `${k}: ${v.entries.length}`).join(', ');
console.log(`bibliography.json written (${counts})`);
