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
         One chronological view of everything with a date &mdash; publications, talks, and
         posters, theses, teaching, outreach events, academic service, honors, and summer
         schools. Tap a family's dot to filter it, or expand a family to pick individual kinds.
         Follow the <span className="tl-diamond">◆</span> on any entry to its full record.
      </p>
      <CategorizedList {...list} groups={TL_GROUPS} numbered />
   </DetailPage>;
}
