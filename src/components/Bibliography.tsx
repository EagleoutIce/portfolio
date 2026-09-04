import { useEffect, useMemo, useState } from "react";
import "./Bibliography.css";
import { Pagination } from "./Pagination";
import bibliography from "../data/bibliography.json";
import { loadBib } from "../data/bibSources";


export type BibSource = keyof typeof bibliography;

export interface BibliographyProps {
   /** key into the pre-rendered bibliography.json */
   readonly source: BibSource;
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
      .replace(arxivregex, ' <span class="bib-link"><a target="_blank" rel="noreferrer" href="$1">arXiv:$2</a></span>')
      .replace(urlregex,  (s) => {
        return (s.length > 30 ? '<br/>' : '') + `<div class="bib-link">${s}</div>`;
})
      ;
}

async function downloadBib(source: BibSource, name: string): Promise<void> {
   const blob = new Blob([await loadBib(source)], { type: 'text/plain' });
   const link = document.createElement('a');
   link.href = URL.createObjectURL(blob);
   link.download = name.toLocaleLowerCase().replace(/[^a-z0-9]/g, '-') + '.bib';
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
}

const PAGE_SIZE = 10;

// https://citation.js.org/api/0.3/tutorial-output_formats.html
export function Bibliography({ source, type, filters, pageSize = PAGE_SIZE }: BibliographyProps) {
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
      const { entries, data } = bibliography[source];
      const formatted = entries.map((entry, index) =>
         `<div key=${index} class="bib-entry">
            <div class="bib-index">[<span class="bib-number">${entries.length - index}</span>]</div> ${entryReplace(entry)}</div>`);
      return { formatted, data: data as Record<string, unknown>[] };
   }, [source]);

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
      <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} label={type} />
   );

   return <>
      <div className="bibliography-header"><button type="button" onClick={() => void downloadBib(source, type)}>download <span className="code">.bib</span></button></div>
      <div className="bibliography-filters">
         {filterElems.length > 0 ? <>{filterElems}<span className='filter-mode'>(matches all)</span></> : <span></span>}
      </div>
      <div className="bibliography" dangerouslySetInnerHTML={{ __html: bib }} />
      {pagination}
   </>;
}
