import './MyTeaching.css';
import { getDocuments, getSlides, getTeachings } from './TeachingsData';



// TODO: move wrapper into get* fns
export function MyTeaching() {
  return <>
   As part of my work at the University of Ulm, I am involved in teaching:
   <ul className='teachings-list'>
      {getTeachings()}
   </ul>
   
   <h3 id="slides">Slides</h3>
   <div className='slides-list'>
    {getSlides()}
    <div>
    </div>
   </div>
   <div className='no-outer main'>
    For more, check out my <a target="_blank" rel="noreferrer" href="https://github.com/EagleoutIce" >GitHub Page</a>.
  </div>
      
   <h3 id="documents">Documents</h3>
   <div className='documents-list'>
    {getDocuments()}
   </div>
   <div className='no-outer main'>
      For more, check out my <a target="_blank" rel="noreferrer" href="https://github.com/EagleoutIce" >GitHub Page</a>.
    </div>
 </>;
}

