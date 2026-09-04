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
   readonly label?: string;
}

export function Pagination({ current, total, onChange, label }: PaginationProps) {
   if(total <= 1) {
      return null;
   }
   return <nav className="pagination" aria-label={label ? `${label} pagination` : 'Pagination'}>
      <span className="page-label">Pages:</span>
      <button type="button" className={current > 0 ? 'page-link page-arrow' : 'page-arrow page-arrow-disabled'}
         aria-label="previous page" disabled={current === 0}
         onClick={() => current > 0 && onChange(current - 1)}>&lsaquo;</button>
      {pageItems(current, total).map((item, i) =>
         item === '...'
            ? <span key={`ellipsis-${i}`} className="page-ellipsis">&hellip;</span>
            : <button
                 type="button"
                 key={item}
                 className={item === current ? 'page-current' : 'page-link'}
                 aria-label={`page ${item + 1}`}
                 aria-current={item === current ? 'page' : undefined}
                 onClick={() => onChange(item)}
              >{item + 1}</button>
      )}
      <button type="button" className={current < total - 1 ? 'page-link page-arrow' : 'page-arrow page-arrow-disabled'}
         aria-label="next page" disabled={current === total - 1}
         onClick={() => current < total - 1 && onChange(current + 1)}>&rsaquo;</button>
   </nav>;
}
