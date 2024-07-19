import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainPage from './pages/main/MainPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteNoticePage } from './pages/SiteNoticePage';
import { ThemeButton } from './components/ThemeButton';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
          {/* TODO: penguin not found etc */}
          <Route path="site-notice" element={<SiteNoticePage
            legalName="Florian Sihler"
            legalAddress={
              <div>
                University Ulm <br />
                Institute of Software Engineering and Programming Languages<br />
                James-Franck-Ring<br />
                Gebäudekreuz O27, Niveau 4<br />
                D-89081 Ulm
              </div>
            }
          />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ThemeButton />
  </React.StrictMode>
);
