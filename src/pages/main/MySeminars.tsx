import './MySeminars.css';
import { getSeminars } from './SeminarsData';



export function MySeminars() {
  return <>
   I was allowed to visit the following summer schools and seminars:
   <ul className='seminars-list'>
      {getSeminars()}
   </ul>
 </>;
}

