import { useState } from 'react';
import './MyService.css';
import '../../components/BibliographySummary.css';
import { getService, getServiceSummary, getServiceTypes, type ServiceType } from './ServiceData';

export function MyService() {
  const [types, setTypes] = useState<ReadonlySet<ServiceType>>(new Set());
  const toggle = (type: ServiceType) => setTypes(prev => {
    const next = new Set(prev);
    if(next.has(type)) {
      next.delete(type);
    } else {
      next.add(type);
    }
    return next;
  });
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
   </div>
   <ul className='service-grid'>
      {getService(types)}
   </ul>
 </>;
}
