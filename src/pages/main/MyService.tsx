import './MyService.css';
import { getService } from './ServiceData';

export function MyService() {
  return <>
   I serve(d) as chair, reviewer or artifact evaluator for the following conferences:
   <ul className='seminars-list'>
      {getService()}
   </ul>
 </>;
}

