import './MyService.css';
import '../../components/BibliographySummary.css';
import { getService, getServiceSummary } from './ServiceData';

export function MyService() {
  return <>
   I serve(d) as chair, reviewer, or artifact evaluator for the following conferences:
   {getServiceSummary()}
   <ul className='service-grid'>
      {getService()}
   </ul>
 </>;
}

