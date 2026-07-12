import { DetailPage } from '../../components/DetailPage';
import { CategorizedList } from '../../components/CategorizedList';
import { withTimelineCrosslinks } from '../timeline/timelineSources';
import { getServiceList } from '../main/ServiceData';
import { getThesesList } from '../main/ThesesData';
import { getLecturesList } from '../main/TeachingsData';
import { getEventsList } from '../main/EventsData';

/* the detail lists are bundled together into one lazily-loaded chunk so their
   markup (and CategorizedList) stays out of the initial page load. */

export function ServicePage() {
   return <DetailPage title="Academic Service" back="service">
      <CategorizedList {...withTimelineCrosslinks(getServiceList(), 'service')} />
   </DetailPage>;
}

export function ThesesPage() {
   return <DetailPage title="Supervised Theses" back="theses">
      <CategorizedList {...withTimelineCrosslinks(getThesesList(), 'thesis')} numbered />
   </DetailPage>;
}

export function LecturesPage() {
   return <DetailPage title="Lectures, Seminars, and Projects" back="lectures">
      <CategorizedList {...withTimelineCrosslinks(getLecturesList(), 'teaching')} />
   </DetailPage>;
}

export function EventsPage() {
   return <DetailPage title="Events and Travel" back="events">
      <CategorizedList {...withTimelineCrosslinks(getEventsList(), 'event')} />
   </DetailPage>;
}
