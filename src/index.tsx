import React, { lazy, Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './typography.css';
import MainPage from './pages/main/MainPage';
import { SiteNoticePage } from './pages/SiteNoticePage';
import { ThemeButton } from './components/ThemeButton';
import { AccentPicker } from './components/AccentPicker';
import { NotFound } from './pages/NotFound';
import { scrollTo } from './components/QuickLinks';
import { ErrorBoundary, useRoute } from './util/router';
import { Tooltip } from 'react-tooltip';
import { INLINE_TOOLTIP_ID } from './util/text';

/* the detail lists load on demand, keeping the initial bundle small */
const PublicationsPage = lazy(() => import('./pages/publications/PublicationsPage').then(m => ({ default: m.PublicationsPage })));
const TimelinePage = lazy(() => import('./pages/timeline/TimelinePage').then(m => ({ default: m.TimelinePage })));
const ServicePage = lazy(() => import('./pages/detail/DetailPages').then(m => ({ default: m.ServicePage })));
const ThesesPage = lazy(() => import('./pages/detail/DetailPages').then(m => ({ default: m.ThesesPage })));
const LecturesPage = lazy(() => import('./pages/detail/DetailPages').then(m => ({ default: m.LecturesPage })));
const EventsPage = lazy(() => import('./pages/detail/DetailPages').then(m => ({ default: m.EventsPage })));

function Lazy({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<p style={{ marginTop: '3em' }}>Loading…</p>}>{children}</Suspense>;
}

const PAGES: Record<string, JSX.Element> = {
  'all-publications': <Lazy><PublicationsPage /></Lazy>,
  'all-service': <Lazy><ServicePage /></Lazy>,
  'all-theses': <Lazy><ThesesPage /></Lazy>,
  'all-lectures': <Lazy><LecturesPage /></Lazy>,
  'all-events': <Lazy><EventsPage /></Lazy>,
  'timeline': <Lazy><TimelinePage /></Lazy>,
  'site-notice': <SiteNoticePage
    legalName="Florian Sihler"
    legalEmail="florian.sihler@uni-ulm.de"
    legalAddress={
      <div>
        Ulm University <br />
        Institute of Software Engineering and Programming Languages<br />
        James-Franck-Ring<br />
        Gebäudekreuz O27, Niveau 4<br />
        D-89081 Ulm
      </div>
    }
  />
};

function App() {
  const route = useRoute();
  const page = PAGES[route];
  /* any other path is treated as an anchor on the main page */
  useEffect(() => {
    if(route && !page) {
      const jump = setTimeout(() => scrollTo(route, false), 100);
      return () => clearTimeout(jump);
    }
  }, [route, page]);
  return page ?? <MainPage />;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <ErrorBoundary fallback={<NotFound />}>
      <App />
    </ErrorBoundary>
    {/* shared tooltip for [text](href "tooltip") links in the data files; it is
        mounted outside .content, so it scales itself to match the other tooltips
        (react-tooltip's 90% of the .7em .content text) */}
    <Tooltip id={INLINE_TOOLTIP_ID} place="bottom" style={{ padding: '5px 9px', lineHeight: 1.35, maxWidth: '24em', fontSize: '.63em' }} />
    <section aria-label="Appearance settings">
      <ThemeButton />
      <AccentPicker />
    </section>
  </React.StrictMode>
);
