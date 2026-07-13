import { useRef, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./TitleName.css";
import { SocialMediaIcon } from "./SocialMediaIcon";
import { Tooltip } from "react-tooltip";
import { headerIsSticky } from "./Header";

export interface TitleNameProps {
   readonly name: string;
   readonly subtitle: string;
   readonly imageSrc: string;
   readonly mediaLinks: {
      [key: string]: {
         icon: IconProp;
         href: string;
      };
   };
   /** keeps element ids unique when the component is rendered more than once */
   readonly idPrefix?: string;
}

// based on https://stackoverflow.com/a/1284335
function getEaster(year: number): [number, number] {
   var C = Math.floor(year/100);
   var N = year - 19*Math.floor(year/19);
   var K = Math.floor((C - 17)/25);
   var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
   I = I - 30*Math.floor((I/30));
   I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
   var J = year + Math.floor(year/4) + I + 2 - C + Math.floor(C/4);
   J = J - 7*Math.floor(J/7);
   var L = I - J;
   var M = 3 + Math.floor((L + 40)/44);
   var D = L + 28 - 31*Math.floor(M/4);

   return [M, D];
}

function isInRangeOfDate(date: Date, base: Date, days: number): boolean {
   const start = new Date(base.getTime() - days * 24 * 60 * 60 * 1000);
   const end = new Date(base.getTime() + (days + 1) * 24 * 60 * 60 * 1000);
   return date >= start && date <= end;
}

function specials() {
   const today = new Date();
   // check easter 
   const [month, day] = getEaster(today.getFullYear());
   const easter = new Date(today.getFullYear(), month - 1, day);
   // if 2 days before or after easter
   if (isInRangeOfDate(today, easter, 1)) {
      return 'easter';
   }
   return '';
}


export default function TitleName({ name, subtitle, imageSrc, mediaLinks, idPrefix = '' }: TitleNameProps) {
   /* two classes so the shape can morph in and out: egg-active turns on the
      width/height transition (kept for the whole cycle), egg is the shape */
   const [eggActive, setEggActive] = useState(false);
   const [eggShape, setEggShape] = useState(false);
   const clicks = useRef<number[]>([]);
   const eggTimers = useRef<number[]>([]);

   const revertEgg = () => {
      eggTimers.current.forEach(clearTimeout);
      setEggShape(false);
      eggTimers.current = [window.setTimeout(() => setEggActive(false), 450)];
   };

   const hatchEgg = () => {
      eggTimers.current.forEach(clearTimeout);
      setEggActive(true);
      setEggShape(true);
      /* hatches back on its own after a while, or sooner on seven more taps */
      eggTimers.current = [window.setTimeout(() => revertEgg(), 10000)];
   };

   const onImageClick = () => {
      if(headerIsSticky()) {
         window.scrollTo({top: 0, behavior: 'smooth'});
         history.replaceState(null, '', window.location.pathname + window.location.search);
         return;
      }
      /* seven quick taps hatch the avatar into an easter egg; seven more (or a
         ten-second wait) hatch it back */
      const now = Date.now();
      clicks.current = clicks.current.filter(t => now - t < 1200);
      clicks.current.push(now);
      if(clicks.current.length >= 7) {
         clicks.current = [];
         if(eggShape) {
            revertEgg();
         } else {
            hatchEgg();
         }
      }
   };

   return <div className="title-name-card">
      <img src={imageSrc} alt={name} decoding="async"
         className={`profile-image ${specials()}${eggActive ? ' egg-active' : ''}${eggShape ? ' egg' : ''}`}
         onClick={onImageClick} />
      <div>
         <span className="profile-name">{name} <br /></span>
         <span className="profile-subtitle">{subtitle}<br /></span>
         <span className="profile-sm">{
            Object.entries(mediaLinks).map(([key, {icon, href}]) => {
               const idKey = idPrefix + key.replace(/\s/g, '-').toLowerCase();
               return <div key={idKey} style={{display: 'inline'}}>
                  <SocialMediaIcon href={href} icon={icon} key={idKey} id={`small-media-icon-${idKey}`} />
                  <Tooltip anchorSelect={`#small-media-icon-${idKey}`} content={key} key={`tt-${idKey}`} place="bottom" noArrow style={{ padding: '5px 9px', lineHeight: 1.35}}/>
               </div>;
            })
         }</span>
      </div>
   </div>;
}