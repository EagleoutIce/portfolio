import { StaticQuickLinks } from '../../components/QuickLinks';
import { SectionHeading } from '../../components/SectionHeading';
import './MyTeaching.css';
import { TypeToStringMap, getDocuments, getSlides, getTeachings } from './TeachingsData';
import { getTheses } from './ThesesData';



// TODO: move wrapper into get* fns
export function MyTeaching() {
   const { def: teachings, roles: teachingCounts } = getTeachings();
   return <>
      <StaticQuickLinks sections={{
         lectures: { page: 'lectures' },
         theses: { page: 'theses' },
         slides: { page: 'slides' },
         documents: { page: 'documents' }
      }}></StaticQuickLinks>

      <SectionHeading id="lectures" as="h3">Lectures, Seminars, and Projects</SectionHeading>
      As part of my work at the University of Ulm, I am involved in teaching:

      <div className='note'> 
         {
            ([['tutor', 'Tutor'], ['teaching-assistant', 'Teaching Assistant'], ['lecturer', 'Lecturer'], ['guest-lecturer', 'Guest Lecturer']] as const).map(([type, lab]) => 
                  <span key={type} className={'sample-' + type}>
                     <span style={{ fontSize: 'smaller', color: 'gray' }}>{teachingCounts.get(type)}×</span> 
                     {TypeToStringMap[type]('sample-' + type)} = {lab}
                  </span>
               )
               .reduce((prev, curr) => [prev, <>,&emsp;</>, curr] as never)
         }
      </div>

      <ul className='teachings-list lectures-columns'>
         {teachings.map(t => t[0])}
      </ul>
      {teachings.map(t => t[1]).filter(e => e !== undefined)}

      I have also created various teaching materials, including partial and complete lectures (e.g., with "Grundlagen der praktischen Informatik", "Software Quality Assurance", and "Functional Programming 2").

      <SectionHeading id="theses" as="h3">Supervised Theses</SectionHeading>

      <StaticQuickLinks sections={{
         "master": { page: 'master-theses' },
         "bachelor": { page: 'bachelor-theses' }
      }}></StaticQuickLinks>

      So far, I had the pleasure of supervising the following theses:

      {getTheses('master', c => <h4 id="master-theses">{c}Master's Theses</h4>)}

      {getTheses('bachelor', c => <h4 id="bachelor-theses">{c}Bachelor's Theses</h4>)}

      <SectionHeading id="slides" as="h3">Slides</SectionHeading>
      <div className='slides-list'>
         {getSlides()}
         <div>
         </div>
      </div>
      <div className='no-outer main'>
         For more, check out my <a target="_blank" rel="noreferrer" href="https://github.com/EagleoutIce" >GitHub Page</a>.
      </div>

      <SectionHeading id="documents" as="h3">Documents</SectionHeading>
      <div className='documents-list'>
         {getDocuments()}
      </div>
      <div className='no-outer main'>
         For more, check out my <a target="_blank" rel="noreferrer" href="https://github.com/EagleoutIce" >GitHub Page</a>.
      </div>
   </>;
}

