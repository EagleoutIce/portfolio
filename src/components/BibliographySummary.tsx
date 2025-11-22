import { useMemo } from "react";
import "./BibliographySummary.css";
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import { Tooltip } from "react-tooltip";

export interface BibliographySummaryProps {
   readonly biblatexContent: { [type: string]: string };
}

export function BibliographySummary({ biblatexContent }: BibliographySummaryProps) {
   const bib = useMemo(() => {
      const confTypeCount: Map<string, Map<string, number>> = new Map();
      for(const [type, content] of Object.entries(biblatexContent)) {   
         const cite = new Cite(content);
         // maps conference id to count of types
         for(const entry of cite.data) { 
            const conf = entry['event'] ?? entry['event-title'] ?? '??';
            if(!confTypeCount.has(conf)) {
               confTypeCount.set(conf, new Map());
            }
            const typeMap = confTypeCount.get(conf) as Map<string, number>;
            typeMap.set(type, (typeMap.get(type) ?? 0) + 1);
         }
      }
      
      // assume that conference names follow the scheme `<name> '<year>`
      const yearMatch = /([^']*) '(\d{2,4})$/;
      const byYear: Map<number, Map<string, Map<string, number>>> = new Map();
      for(const [conf, typeMap] of confTypeCount.entries()) {
         const match = conf.match(yearMatch);
         let year: number;
         if(match) {
            year = parseInt(match[2].length === 2 ? match[2] : match[2].slice(-2));
         } else {
            continue;
         }
         const confName = match[1].trim();
         if(!byYear.has(year)) {
            byYear.set(year, new Map());
         }
         byYear.get(year)?.set(confName, typeMap);  
      }
         
      
      const children: JSX.Element[] = []
      const years = [...byYear.keys()].sort((a, b) => b - a);
      for(const year of years) {
         children.push(<div key={`year-${year}`} className="conf-year-banner">• 20{year}</div>)
         const entries = Array.from(byYear.get(year)?.entries() ?? []);
         entries.sort((a, b) => a[0].localeCompare(b[0]));
         for(const [conf, typeMap] of entries) {
            const total = Array.from(typeMap.values()).reduce((a, b) => a + b, 0);
            const byType: string[] = []
            for(const [type, count] of typeMap.entries()) {
               byType.push(`${count}×${type}${count === 1 ? '' : 's'}`);
            }
            children.push(
               <span key={`conf-${year}-${conf}`} id={`conf-${year}-${conf}`} className="conf-entry">
                  <span className='conf-count'>{total}×</span>
                  {conf}
               <Tooltip anchorSelect={`#conf-${year}-${conf}`} content={byType.join(', ')} key={`tt-conf-${year}-${conf}`} place="bottom" style={{ padding: '2px 6px', margin: '-6px 0px' }}/>
               </span>
            );
         }
      }
      
      return <div className='bib-summary-children'> { children } </div>;
   }, [biblatexContent]);

   return bib;
}