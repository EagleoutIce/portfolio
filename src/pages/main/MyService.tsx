import { useState } from 'react';
import './MyService.css';
import '../../components/BibliographySummary.css';
import { getService, getServiceSummary, getServiceTypes, type ServiceCategory } from './ServiceData';

export function MyService() {
  const [types, setTypes] = useState<ReadonlySet<ServiceCategory>>(new Set());
  const [showOlder, setShowOlder] = useState(false);
  const toggle = (type: ServiceCategory) => setTypes(prev => {
    const next = new Set(prev);
    if(next.has(type)) {
      next.delete(type);
    } else {
      next.add(type);
    }
    return next;
  });
  const { current, older, olderCount } = getService(types);
  return <>
   I serve(d) as chair, reviewer, or artifact evaluator for the following conferences:
   {getServiceSummary()}
   <div className='filter-row'>
      {getServiceTypes().map(({ key, full, count }) =>
        <button key={key} className={types.has(key) ? 'filter-active' : 'filter-inactive'}
          title="shows entries matching any selected role" onClick={() => toggle(key)}>
          <span className='filter-count'>{count}&times;</span>{full}
        </button>
      )}
      <span className='filter-mode'>(matches any)</span>
   </div>
   <div className='service-timeline'>
      {current}
   </div>
   {older.length > 0 &&
      <details className='collapse-section' open={showOlder}
         onToggle={e => setShowOlder((e.target as HTMLDetailsElement).open)}>
         <summary>
            <span className='collapse-title light'>Earlier service</span>
            <span className='collapse-count'>{olderCount} {olderCount === 1 ? 'entry' : 'entries'}</span>
            <span className='collapse-chevron' />
         </summary>
         {showOlder && <div className='service-timeline service-timeline-older'>{older}</div>}
      </details>
   }
 </>;
}
