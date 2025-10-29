import { getHonors } from './HonorsData';
import './MyHonors.css';
import { getService } from './ServiceData';

export function MyHonors() {
  const honors = getHonors();
  return <>
    So far, me and my work received the following honors, awards, and grants/stipends:
    
    <ul className='honors-list'>
      {honors.map(h => h[0])}
    </ul>
    {honors.map(h => h[1]).filter(e => e !== undefined)}
 </>;
}

