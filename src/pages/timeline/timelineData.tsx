import type { CatDef, CatItem } from '../../components/CategorizedList';
import { getThesesList } from '../main/ThesesData';
import { getEventsList } from '../main/EventsData';
import { getLecturesList } from '../main/TeachingsData';
import { getServiceList } from '../main/ServiceData';
import { getHonorsTimeline } from '../main/HonorsData';
import { getSeminarsTimeline } from '../main/SeminarsData';
import { getPublicationsItems } from '../publications/publicationsData';
import { TL_CATEGORIES, TL_ORDER, TL_SOURCES, type SourceId } from './timelineSources';

interface CatList {
   categories: Record<string, CatDef>;
   order: string[];
   items: CatItem[];
}

/* every source already tags its entries with a fine-grained category (venue
   kind, teaching role, service role, honor type, thesis level, …). the timeline
   keeps those verbatim so the granular, family-coloured legend can separate
   them — only the outreach events collapse into a single bucket. */
const keepCategory = (it: CatItem) => it.category;

/** the merged, chronological timeline of everything with a date */
export function getTimelineList(): CatList {
   const items: CatItem[] = [];

   const add = (source: SourceId, list: CatItem[], catOf: (it: CatItem) => string = keepCategory) => {
      const { prefix, page, label, section } = { section: false, ...TL_SOURCES[source] };
      for(const it of list) {
         items.push({
            ...it,
            key: `${prefix}-${it.key}`,
            category: catOf(it),
            crosslink: {
               href: section ? `#/${page}` : `#/${page}?e=${it.key}`,
               label,
               title: `Show in ${label}`,
            },
         });
      }
   };

   add('publication', getPublicationsItems());
   add('thesis', getThesesList().items);
   add('teaching', getLecturesList().items);
   add('event', getEventsList().items);
   add('service', getServiceList().items);
   add('honor', getHonorsTimeline());
   add('seminar', getSeminarsTimeline());

   return { categories: TL_CATEGORIES, order: TL_ORDER, items };
}
