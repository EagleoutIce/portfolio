import { useEffect, useMemo, useState } from "react";
import "./QuickLinks.css";
import { headerIsSticky } from "./Header";

export interface QuickLinkProps {
   readonly sections: {
      [label: string]: {
         page: string;
      };
   };
}


function scrollHelper(id: string, offset = 200) {
   if(id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
   }
   const element = document.getElementById(id);
   if (element) {
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetTop = elementTop - offset;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
   }
}
function scrollTo(id: string) {
   scrollHelper(id);
   setTimeout(() => {
      scrollHelper(id);
   }, 100);
   setTimeout(() => {
      scrollHelper(id);
   }, 200);
}

export function QuickLink({ label, page }: { label: string; page: string }) {
   return (
      <div className="quick-link" onClick={() => scrollTo(page)}>
         [<span className="quick-link-label">{label}</span>]
      </div>
   )
}

export function StaticQuickLinks({ sections }: QuickLinkProps) {
   return <div className="static-quick-links">
      {
         [...Object.entries(sections)].map(([k, v]) => 
            (<QuickLink label={k} page={v.page} key={k} />)
         )
      }
   </div>;
}

export default function QuickLinks({ sections }: QuickLinkProps) {
   const [activeSections, setActiveSections] = useState(sections);
   function updateIfDifferent(updateWith: typeof activeSections) {
      if (JSON.stringify(activeSections) !== JSON.stringify(updateWith)) {
         setActiveSections(updateWith);
      }
   }
   function update() {
      // if less than X px, only offer the action "jump to top"
      if(window.innerWidth < 650) {
         if(headerIsSticky() && window.scrollY > 200) {
            updateIfDifferent({
               'Jump to top': { page: 'top' }
            });
         } else {
            updateIfDifferent({
            });
         }
      } else {
         updateIfDifferent(sections);
      }
   }
   window.addEventListener('resize', () => update());
   window.addEventListener('scroll', () => update());
   useEffect(() => {
      update();
      setTimeout(() => update(), 150);
   });
   return <div className="quick-links">
     {
      [...Object.entries(activeSections)].map(([k, v]) => 
         (<QuickLink label={k} page={v.page} key={k} />)
      )
     }
   </div>;
}