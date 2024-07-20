import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainPage from './pages/main/MainPage';
import { BrowserRouter, Routes, Route, RouterProvider, createHashRouter } from "react-router-dom";
import { SiteNoticePage } from './pages/SiteNoticePage';
import { ThemeButton } from './components/ThemeButton';
import { NotFound } from './pages/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createHashRouter([
  { 
    path: '/', 
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: 'site-notice', element: <SiteNoticePage
      legalName="Florian Sihler"
      legalEmail="florian.sihler@uni-ulm.de"
      legalAddress={
        <div>
          University of Ulm <br />
          Institute of Software Engineering and Programming Languages<br />
          James-Franck-Ring<br />
          Gebäudekreuz O27, Niveau 4<br />
          D-89081 Ulm
        </div>
      }
    />
      }
    ]
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ThemeButton />
  </React.StrictMode>
);
