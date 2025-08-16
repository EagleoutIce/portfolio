import { useMemo } from "react";
import "./Bibliography.css";
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-csl';


export interface BibliographyProps {
   readonly biblatexContent: string;
   readonly type: string;
}

const doiregex = /[^"]https?:\/\/(doi.org[^ "]+)/gm;
const urlregex = /[^">]https?:\/\/((?!doi\.org)([^"<]+))/gm;

function entryReplace(entry: string): string {
   return entry.replace('Sihler, F.', '<b>Sihler, F.</b>')
      .replace(doiregex, ' <span class="bib-link">$1</span>')
      .replace(urlregex,  (s) => {
        return (s.length > 30 ? '<br/>' : '') + `<div class="bib-link">${s}</div>`;
})
      ;
}

function downloadBib(content: string, name: string): void {
   const blob = new Blob([content], { type: 'text/plain' });
   const link = document.createElement('a');
   link.href = URL.createObjectURL(blob);
   link.download = name.toLocaleLowerCase().replace(/[^a-z0-9]/g, '-') + '.bib';
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
}

// https://citation.js.org/api/0.3/tutorial-output_formats.html
export function Bibliography({ biblatexContent, type }: BibliographyProps) {
   const bib = useMemo(() => {
      const cite = new Cite(biblatexContent);
      const res = cite.format('bibliography', {
         format: 'html',
         template: 'apa',
         lang: 'en-US',
         asEntryArray: true,
         nosort: true,
         prepend(entry: object) {
            let prefix: string = '<div style="position: relative">';
            if('DOI' in entry) {
               prefix += '<a href="https://doi.org/' + entry['DOI'] + '" target="_blank" rel="noreferrer">';
            } else if('URL' in entry) {
               prefix += '<a href="' + entry['URL'] + '" target="_blank" rel="noreferrer">';
            }
            if('title-short' in entry) {
               prefix += ` <div class="breadcrumb-container"><span class="breadcrumb">${entry['title-short']}</span></div>`;
            }
            return prefix;

         },
         append(entry: object) {
            let suffix = '';

            if('DOI' in entry || 'URL' in entry) {
               suffix += '</a>';
            }
            if('note' in entry) {
               suffix += `&emsp;${entry['note']}`;
            }
            suffix += '</div>';
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

   return <>
      <div className="bibliography-header"><a onClick={() => downloadBib(biblatexContent, type)}>download <span className="code">.bib</span></a></div>
      <div className="bibliography" dangerouslySetInnerHTML={{ __html: bib }} />
   </>;
}