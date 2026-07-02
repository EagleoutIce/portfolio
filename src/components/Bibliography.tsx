import { useEffect, useMemo, useState } from "react";
import "./Bibliography.css";
import { Pagination } from "./Pagination";
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-csl';


export interface BibliographyProps {
   readonly biblatexContent: string;
   readonly type: string;
   readonly pageSize?: number;
   readonly filters?: { [name: string]:
         (entry: Record<string, unknown>) => boolean
   }
}

const doiregex = /[^"]https?:\/\/(doi.org[^ "]+)/gm;
const urlregex = /[^">]https?:\/\/((?!doi\.org)([^"<]+))/gm;
const arxivregex = /[^"](https?:\/\/arxiv.org\/abs\/([^ "<]+))/gm;

function entryReplace(entry: string): string {
   return entry.replace('Sihler, F.', '<b>Sihler, F.</b>')
      .replace(doiregex, ' <span class="bib-link">$1</span>')
      .replace(arxivregex, ' <span class="bib-link"><a target="_blank" href="$1">arXiv:$2</a></span>')
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

interface IssuedObject {
   issued: {
      'date-parts': [year: number, month?: number, day?: number][];
   }
}

const PAGE_SIZE = 10;

// https://citation.js.org/api/0.3/tutorial-output_formats.html
export function Bibliography({ biblatexContent, type, filters, pageSize = PAGE_SIZE }: BibliographyProps) {
   const [activeFilters, setActiveFilters] = useState<{ [name: string]: boolean }>(() => {
      const init: { [name: string]: boolean } = {};
      if(filters) {
         for(const name of Object.keys(filters)) {
            init[name] = false;
         }
      }
      return init;
   });
   const [currentPage, setCurrentPage] = useState(0);

   const { formatted, data } = useMemo(() => {
      const cite = new Cite(biblatexContent);
      cleanUpData(cite);
      sortAccordingToYear(cite);

      const res = cite.format('bibliography', {
         format: 'html',
         template: 'apa',
         lang: 'en-US',
         asEntryArray: true,
         nosort: true,
         prepend(entry: object) {
            let prefix: string = '<div style="position: relative">';
            if('DOI' in entry && typeof entry['DOI'] === 'string') {
               prefix += '<a href="https://doi.org/' + entry['DOI'] + '" target="_blank" rel="noreferrer">';
            } else if('URL' in entry) {
               prefix += '<a href="' + entry['URL'] + '" target="_blank" rel="noreferrer">';
            }
            if('event' in entry) {
               prefix += ` <div class="breadcrumb-container"><span class="breadcrumb">${entry['event']}</span></div>`;
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

      const formatted = res.map(
         ([_, entry]: string[], index: number) => {
            return `<div key=${index} class="bib-entry">
            <div class="bib-index">[<span class="bib-number">${res.length - index}</span>]</div> ${entryReplace(entry)}</div>`;
         }
      );
      return { formatted, data: cite.data as Record<string, unknown>[] };
   }, [biblatexContent]);

   const allEntries = useMemo(() => formatted.filter((_entry: string, index: number) => {
      if(!filters) {
         return true;
      }
      for(const [name, predicate] of Object.entries(filters)) {
         if(activeFilters[name]) {
            if(!predicate(data[index])) {
               return false;
            }
         }
      }
      return true;
   }), [formatted, data, activeFilters]);

   useEffect(() => { setCurrentPage(0); }, [allEntries]);

   const needsPagination = allEntries.length >= pageSize;
   const totalPages = needsPagination ? Math.ceil(allEntries.length / pageSize) : 1;
   const pagedEntries = needsPagination
      ? allEntries.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
      : allEntries;
   const bib = pagedEntries.join('');

   const filterElems: JSX.Element[] = [];
   if(filters) {
      for(const [name, predicate] of Object.entries(filters)) {
         const count = data.filter(d => predicate(d)).length;
         filterElems.push(
            <button
               key={`filter-btn-${name}`}
               className={activeFilters[name] ? 'filter-active' : 'filter-inactive'}
               title="entries have to match all selected filters"
               onClick={() => {
                  setActiveFilters((prev) => {
                     const newState = { ...prev };
                     newState[name] = !newState[name];
                     return newState;
                  });
               }}
            >
              <span className='filter-count'>{count}&times;</span>{name}
            </button>
         );
      }
   }

   const pagination = needsPagination && (
      <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />
   );

   return <>
      <div className="bibliography-header"><a onClick={() => downloadBib(biblatexContent, type)}>download <span className="code">.bib</span></a></div>
      <div className="bibliography-filters filters-and">
         {filterElems.length > 0 ? <>{filterElems}</> : <span></span>}
      </div>
      <div className="bibliography" dangerouslySetInnerHTML={{ __html: bib }} />
      {pagination}
   </>;
}

function sortAccordingToYear(cite: any) {
   cite.sort(({ issued: a }: IssuedObject, { issued: b }: IssuedObject) => {
      const yearA = a['date-parts'][0][0];
      const yearB = b['date-parts'][0][0];
      if(yearA !== yearB) {
         return yearB - yearA;
      }
      const monthA = a['date-parts'][0][1] || 0;
      const monthB = b['date-parts'][0][1] || 0;
      return monthB - monthA;
   });
}

function cleanUpData(cite: any) {
   cite.set(cite.data.map((entry: object) => {
      if(entry === undefined || typeof entry !== 'object') {
         return entry;
      }
      if('DOI' in entry && typeof entry['DOI'] === 'string') {
         entry['DOI'] = entry['DOI'].replaceAll(String.raw`\_`, '_').trim();
      }
      return entry;
   }));
}
