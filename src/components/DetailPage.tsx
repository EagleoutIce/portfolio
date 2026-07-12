import { useLayoutEffect, type ReactNode } from 'react';
import '../pages/publications/PublicationsPage.css';
import './DetailPage.css';
import { SiteNotice } from './SiteNotice';
import { LastUpdated } from './LastUpdated';

interface DetailPageProps {
   readonly title: string;
   /** section id on the overview to return to */
   readonly back: string;
   readonly children: ReactNode;
}

export function DetailPage({ title, back, children }: DetailPageProps) {
   useLayoutEffect(() => { window.scrollTo(0, 0); }, []);
   return <div className="pub-page detail-page">
      <div className="pub-topbar">
         <a className="pub-back" href={`#/${back}`}>&larr; back to overview</a>
      </div>
      <h1 className="pub-title">{title}</h1>
      {children}
      <SiteNotice />
      <LastUpdated />
   </div>;
}
