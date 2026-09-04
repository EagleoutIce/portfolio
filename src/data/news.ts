import { escapeId } from '../util/id';
import raw from './news.json';

export interface NewsItem {
   readonly when: Date;
   readonly text: string;
   readonly link?: string;
}

interface RawNewsItem {
   readonly date: string;
   readonly text: string;
   readonly link?: string;
   readonly thesis?: string;
}

export const news: NewsItem[] = (raw as RawNewsItem[])
   .map(({ date, text, link, thesis }) => ({
      when: new Date(date),
      text,
      link: thesis ? `#/link-${escapeId(thesis)}` : link
   }))
   .sort((a, b) => b.when.getTime() - a.when.getTime());
