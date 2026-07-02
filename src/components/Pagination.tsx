function pageItems(current: number, total: number): (number | '...')[] {
   if(total <= 7) return Array.from({ length: total }, (_, i) => i);
   const visible = new Set<number>([0, total - 1]);
   for(let i = Math.max(0, current - 1); i <= Math.min(total - 1, current + 1); i++) visible.add(i);
   const sorted = Array.from(visible).sort((a, b) => a - b);
   const result: (number | '...')[] = [];
   for(let i = 0; i < sorted.length; i++) {
      if(i > 0 && sorted[i] - sorted[i - 1] > 1) {
         result.push('...');
      }
      result.push(sorted[i]);
   }
   return result;
}

export interface PaginationProps {
   readonly current: number;
   readonly total: number;
   readonly onChange: (page: number) => void;
}

export function Pagination({ current, total, onChange }: PaginationProps) {
   if(total <= 1) {
      return null;
   }
   return <div className="pagination">
      <span className="page-label">Pages:</span>
      <a className={current > 0 ? 'page-link page-arrow' : 'page-arrow page-arrow-disabled'}
         aria-label="previous page" onClick={() => current > 0 && onChange(current - 1)}>&lsaquo;</a>
      {pageItems(current, total).map((item, i) =>
         item === '...'
            ? <span key={`ellipsis-${i}`} className="page-ellipsis">&hellip;</span>
            : <a
                 key={item}
                 className={item === current ? 'page-current' : 'page-link'}
                 onClick={() => onChange(item)}
              >{item + 1}</a>
      )}
      <a className={current < total - 1 ? 'page-link page-arrow' : 'page-arrow page-arrow-disabled'}
         aria-label="next page" onClick={() => current < total - 1 && onChange(current + 1)}>&rsaquo;</a>
   </div>;
}
