import { useMemo } from "react";
import "./Bibliography.css";
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-csl';


export interface BibliographyProps {
   readonly biblatexContent: string;
}

const doiregex = /([^"]https?:\/\/doi.org[^ "]+)/gm;
const urlregex = /([^">]https?:\/\/(?!doi\.org)([^"]+)($|\s|.))/gm;

function entryReplace(entry: string): string {
   return entry.replace('Sihler, F.', '<b>Sihler, F.</b>')
      .replace(doiregex, '<span class="bib-link">$1</span>')
      .replace(urlregex, '<br/><span class="bib-link">$1</span>')
   ;
}

// https://citation.js.org/api/0.3/tutorial-output_formats.html
export function Bibliography({ biblatexContent }: BibliographyProps) {
   const bib = useMemo(() => {
      const cite = new Cite(biblatexContent);
      const res = cite.format('bibliography', {
         format: 'html',
         template: 'apa',
         lang: 'en-US',
         asEntryArray: true,
         nosort: true,
         prepend(entry: object) {
            if('DOI' in entry) {
               return '<a href="https://doi.org/' + entry['DOI'] + '" target="_blank" rel="noreferrer">';
            } else if ('URL' in entry) {
               return '<a href="' + entry['URL'] + '" target="_blank" rel="noreferrer">';
            } else {
               return '';
            }
         },
         append(entry: object) {
            let suffix = '';
            if('DOI' in entry || 'URL' in entry) {
               suffix += '</a>';
            }
            if('note' in entry) {
               suffix += `&emsp;&emsp;${entry['note']}`;
            }
            return suffix;
         }
      });
      return res.map(
         ([_, entry]: string[], index: number) => {
            /* TODO: generalize? */
            return `<div key=${index} class="bib-entry">
            <div class="bib-index">[<span class="bib-number">${res.length - index}</span>]</div> ${entryReplace(entry)}</div>`;
         }
      ).join('');
   }, [biblatexContent]);

   return <div className="bibliography" dangerouslySetInnerHTML={{ __html: bib }} />;
}