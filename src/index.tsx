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
