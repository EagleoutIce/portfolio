import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainPage from './pages/main/MainPage';
import { RouterProvider, createHashRouter } from "react-router-dom";
import { SiteNoticePage } from './pages/SiteNoticePage';
import { ThemeButton } from './components/ThemeButton';
import { AccentPicker } from './components/AccentPicker';
import { NotFound } from './pages/NotFound';
import { scrollTo } from './components/QuickLinks';
import { DetailPage } from './components/DetailPage';
import { CategorizedList } from './components/CategorizedList';
import { getServiceList } from './pages/main/ServiceData';
import { getThesesList } from './pages/main/ThesesData';
import { getEventsList } from './pages/main/EventsData';
import { getLecturesList } from './pages/main/TeachingsData';

/* citation-js dominates the bundle, so the detailed list loads on demand */
const PublicationsPage = lazy(() => import('./pages/publications/PublicationsPage').then(m => ({ default: m.PublicationsPage })));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createHashRouter([
  { 
    path: '/', 
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: 'all-publications', element:
        <Suspense fallback={<p style={{ marginTop: '3em' }}>Loading publications...</p>}>
          <PublicationsPage />
        </Suspense>
      },
      { path: 'all-service', element: <DetailPage title="Academic Service" back="service"><CategorizedList {...getServiceList()} /></DetailPage> },
      { path: 'all-theses', element: <DetailPage title="Supervised Theses" back="theses"><CategorizedList {...getThesesList()} numbered /></DetailPage> },
      { path: 'all-lectures', element: <DetailPage title="Lectures, Seminars, and Projects" back="lectures"><CategorizedList {...getLecturesList()} /></DetailPage> },
      { path: 'all-events', element: <DetailPage title="Events and Travel" back="events"><CategorizedList {...getEventsList()} /></DetailPage> },
      { path: 'site-notice', element: <SiteNoticePage
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
      },
      /* for any other path, try to jump to an id with the same name */
      { 
        path: '*',
        element: <MainPage />,
        loader: async ({ params }) => {
          const id = params['*'];
          if (id) {
            setTimeout(() => scrollTo(id, false), 100);
          }
          return null;
      }}
    ]
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ThemeButton />
    <AccentPicker />
  </React.StrictMode>
);
