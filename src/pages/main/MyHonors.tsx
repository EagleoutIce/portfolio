import { getHonors } from './HonorsData';
import './MyHonors.css';
import { getService } from './ServiceData';

export function MyHonors() {
  return <>
    So far, me and my work received the following honors, awards, and grants:
    
    <ul className='honors-list'>
      {getHonors()}
    </ul>
 </>;
}

