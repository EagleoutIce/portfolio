import './MyTeaching.css';
import { getTeachings } from './TeachingsData';



export function MyTeaching() {
  return <>
   As part of my work at the University of Ulm, I am involved in teaching:
   <ul className='teachings-list'>
      {getTeachings()}
   </ul>
   
         
   <h3 id="slides">Slides</h3>
      
   <h3 id="documents">Documents</h3>

 </>;
}

