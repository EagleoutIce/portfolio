import { useMemo } from 'react';
import { DetailPage } from '../../components/DetailPage';
import { CategorizedList } from '../../components/CategorizedList';
import { getTimelineList } from './timelineData';
import { TL_GROUPS } from './timelineSources';
import './TimelinePage.css';

export function TimelinePage() {
   const list = useMemo(() => getTimelineList(), []);
   return <DetailPage title="Timeline" back="">
      <p className="pub-lead">
         Everything with a date, in one place: papers, talks and posters, theses, teaching,
         outreach, service, honors, and summer schools. Colors mark what belongs together,
         and the <span className="tl-diamond">◆</span> on an entry leads to its full record.
      </p>
      <CategorizedList {...list} groups={TL_GROUPS} numbered />
   </DetailPage>;
}
