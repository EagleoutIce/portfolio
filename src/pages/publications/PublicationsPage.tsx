import { useLayoutEffect, useMemo } from 'react';
import './PublicationsPage.css';
import { BibDataMain, BibDataPoster, BibDataTalks, BibDataOther } from '../main/BibliographyData';
import { LastUpdated } from '../../components/LastUpdated';
import { SiteNotice } from '../../components/SiteNotice';
import { CategorizedList, type CatItem } from '../../components/CategorizedList';
import { CATEGORY, CATEGORY_ORDER, getPublicationsItems } from './publicationsData';
import { withTimelineCrosslinks } from '../timeline/timelineSources';

function downloadAllBib() {
   const content = [BibDataMain, BibDataTalks, BibDataPoster, BibDataOther].join('\n\n');
   const url = URL.createObjectURL(new Blob([content], { type: 'application/x-bibtex' }));
   const a = document.createElement('a');
   a.href = url;
   a.download = 'sihler-publications.bib';
   a.click();
   URL.revokeObjectURL(url);
}

export function PublicationsPage() {
   useLayoutEffect(() => { window.scrollTo(0, 0); }, []);
   const items = useMemo<CatItem[]>(() => getPublicationsItems(), []);

   return <div className="pub-page">
      <div className="pub-topbar">
         <a className="pub-back" href="#/publications">&larr; back to overview</a>
      </div>

      <h1 className="pub-title">Publications</h1>
      <p className="pub-lead">
         A detailed, color-coded listing of my publications, talks, and posters. You can
         {' '}<a className="pub-inline-link" href="#" onClick={e => { e.preventDefault(); downloadAllBib(); }}>download the <span className="code">.bib</span> files</a>{' '}
         or see the compact overview on the <a className="pub-inline-link" href="#/publications">main page</a>.
      </p>

      <CategorizedList {...withTimelineCrosslinks({ categories: CATEGORY, order: CATEGORY_ORDER, items }, 'publication')} />

      <SiteNotice />
      <LastUpdated />
   </div>;
}
