import './MyTeaching.css';
import { TypeToStringMap, getDocuments, getSlides, getTeachings } from './TeachingsData';



// TODO: move wrapper into get* fns
export function MyTeaching() {
  return <>
   <h3 id="lectures">Lectures</h3>
   As part of my work at the University of Ulm, I am involved in teaching:
      
   <div className='note'> {TypeToStringMap['tutor']('sample-t')} = Tutor, {TypeToStringMap['teaching-assistant']('sample-ta')} = Teaching Assistant, {TypeToStringMap['lecturer']('sample-l')} = Lecturer</div>

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

