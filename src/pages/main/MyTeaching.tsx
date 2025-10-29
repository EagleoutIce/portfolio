import { StaticQuickLinks } from '../../components/QuickLinks';
import './MyTeaching.css';
import { TypeToStringMap, getDocuments, getSlides, getTeachings } from './TeachingsData';
import { getTheses } from './ThesesData';



// TODO: move wrapper into get* fns
export function MyTeaching() {
   const teachings = getTeachings();
   return <>
      <StaticQuickLinks sections={{
         lectures: { page: 'lectures' },
         theses: { page: 'theses' },
         slides: { page: 'slides' },
         documents: { page: 'documents' }
      }}></StaticQuickLinks>

      <h3 id="lectures">Lectures, Seminars, and Projects</h3>
      As part of my work at the University of Ulm, I am involved in teaching:

      <div className='note'> {TypeToStringMap['tutor']('sample-t')} = Tutor, {TypeToStringMap['teaching-assistant']('sample-ta')} = Teaching Assistant, {TypeToStringMap['lecturer']('sample-l')} = Lecturer, {TypeToStringMap['guest-lecturer']('sample-gl')} = Guest Lecturer</div>

      <ul className='teachings-list'>
         {teachings.map(t => t[0])}
      </ul>
      {teachings.map(t => t[1]).filter(e => e !== undefined)}

      <h3 id="theses">Supervised Theses</h3>

      <StaticQuickLinks sections={{
         "master": { page: 'master-theses' },
         "bachelor": { page: 'bachelor-theses' }
      }}></StaticQuickLinks>

      So far, I had the pleasure of supervising the following theses:

      {getTheses('master', c => <h4 id="master-theses">{c}Master's Theses</h4>)}


      {getTheses('bachelor', c => <h4 id="bachelor-theses">{c}Bachelor's Theses</h4>)}

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

