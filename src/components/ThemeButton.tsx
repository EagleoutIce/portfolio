import { useLayoutEffect, useState } from "react";
import "./ThemeButton.css";

const themes = ['light-theme', 'dark-theme'];

function updateTheme(theme: string) {
   const body = document.querySelector('body');
   if(!body) {
      return;
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

export function getDefaultTheme() {
   // use local date time to determine the theme
   const hours = new Date().getHours();
   return hours < 6 || hours > 22 ? 'dark-theme' : 'light-theme';
}

/* https://codepen.io/alvarotrigo/pen/PoOXJpM */
export function ThemeButton() {
   // load theme from session storage
   const [theme, setTheme] = useState(() => sessionStorage.getItem('theme') ?? getDefaultTheme());

   /* apply before paint to avoid a wrongly-themed flash */
   useLayoutEffect(() => {
      updateTheme(theme);
   }, [theme]);

   const changeTheme = () => {
      setTheme(t => t === 'light-theme' ? 'dark-theme' : 'light-theme');
   };

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
