import { useLayoutEffect, useRef, useState } from "react";
import "./ThemeButton.css";

const themes = ['light-theme', 'dark-theme'];

let themeTransitionTimer: number | undefined;

function updateTheme(theme: string, animate = true) {
   const body = document.querySelector('body');
   if(!body) {
      return;
   }
   /* fades every element in sync while the colors change, see index.css.
      skipped on the initial apply so the page doesn't animate from the
      pre-paint theme into itself (that fade read as lag on load) */
   if(animate) {
      body.classList.add('theme-transition');
      clearTimeout(themeTransitionTimer);
      themeTransitionTimer = window.setTimeout(() => body.classList.remove('theme-transition'), 1000);
   }
   for(const t of themes) {
      body.classList.remove(t);
   }
   body.classList.add(theme);
   sessionStorage.setItem('theme', theme);
   setTimeout(() => {
      window.getSelection()?.removeAllRanges();
   }, 50)
}

/* the light/dark theme the browser/device is asking for, if it expresses one */
export function getSystemTheme(): string | undefined {
   if(typeof window === 'undefined' || !window.matchMedia) return undefined;
   if(window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark-theme';
   if(window.matchMedia('(prefers-color-scheme: light)').matches) return 'light-theme';
   return undefined;
}

export function getDefaultTheme() {
   /* follow the browser/device preference first */
   const system = getSystemTheme();
   if(system) return system;
   /* only when the OS states no preference, fall back to the local time of day */
   const hours = new Date().getHours();
   return hours < 6 || hours > 22 ? 'dark-theme' : 'light-theme';
}

/* https://codepen.io/alvarotrigo/pen/PoOXJpM */
export function ThemeButton() {
   // load theme from session storage, else follow the device preference
   const [theme, setTheme] = useState(() => sessionStorage.getItem('theme') ?? getDefaultTheme());
   const firstApply = useRef(true);

   /* apply before paint to avoid a wrongly-themed flash */
   useLayoutEffect(() => {
      updateTheme(theme, !firstApply.current);
      firstApply.current = false;
   }, [theme]);

   const changeTheme = () => {
      setTheme(t => t === 'light-theme' ? 'dark-theme' : 'light-theme');
   };

   /* uncontrolled on purpose: the native checkbox drives the day/night toggle
      animation, so React must not re-assign `checked` and stutter it */
   return (<div className="wrapper">
      <input type="checkbox" id="hide-checkbox" defaultChecked={theme === 'light-theme'} onChange={changeTheme} />
      <label htmlFor="hide-checkbox" className="toggle">
         <span className="toggle-button" />
         <span className="star star-1"></span>
         <span className="star star-2"></span>
         <span className="star star-3"></span>
         <span className="star star-4"></span>
         <span className="star star-5"></span>
         <span className="star star-6"></span>
         <span className="star star-7"></span>
         <span className="star star-8"></span>
      </label>
   </div>);
}
