import { useMemo } from "react";
import "./Bibliography.css";
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-csl';


export interface BibliographyProps {
   readonly biblatexContent: string;
}

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
            if('DOI' in entry || 'URL' in entry) {
               return '</a>';
            } else {
               return '';
            }
         }
      });
      return res.map(
         ([_, entry]: string[], index: number) => {
            /* TODO: generalize? */
            return `<div key=${index} class="bib-entry">
            <div class="bib-index">[<span class="bib-number">${res.length - index}</span>]</div> ${entry.replace('Sihler, F.', '<b>Sihler, F.</b>')}</div>`;
         }
      ).join('');
   }, [biblatexContent]);

   return <div className="bibliography" dangerouslySetInnerHTML={{ __html: bib }} />;
}