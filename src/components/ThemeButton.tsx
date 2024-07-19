import { useState } from "react";
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
}

/* https://codepen.io/alvarotrigo/pen/PoOXJpM */
export function ThemeButton() {
   // load theme from session storage
   const [theme, setTheme] = useState(sessionStorage.getItem('theme') ?? 'dark-theme');
   updateTheme(theme);

   const changeTheme = () => {
      const newTheme = theme === 'light-theme' ? 'dark-theme' : 'light-theme';
      setTheme(newTheme);
   };

   return (<div className="wrapper">
      <input type="checkbox" id="hide-checkbox" onClick={changeTheme} ref={() => {
         setInitialTheme(theme);
      }} />
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

function setInitialTheme(theme: string) {
   if(theme === 'light-theme') {
      const checkbox = document.getElementById('hide-checkbox');
      // check the checkbox without click
      if(checkbox) {
         checkbox.setAttribute('checked', 'true');
      }
   }
}
