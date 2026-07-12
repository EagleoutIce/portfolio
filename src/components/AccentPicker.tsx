import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import "./AccentPicker.css";

/* the brand orange stays the default; the rest mirror the muted presets
   declared in index.css (body[data-accent="…"]) */
const accents = [
   { key: 'orange', color: 'rgba(255, 166, 0, 1)' },
   { key: 'red', color: '#e63946' },
   { key: 'blue', color: '#3b7bb8' },
   { key: 'green', color: '#4f8a5b' },
] as const;

type AccentKey = typeof accents[number]['key'];

/* first visit of a browser session rolls a weighted accent (mostly orange),
   then it sticks for the rest of the session */
const weights: [AccentKey, number][] = [['orange', 0.75], ['red', 0.15], ['blue', 0.05], ['green', 0.05]];

function weightedRandom(): AccentKey {
   const r = Math.random();
   let acc = 0;
   for(const [key, w] of weights) {
      acc += w;
      if(r < acc) return key;
   }
   return 'orange';
}

function applyAccent(accent: AccentKey) {
   /* orange is the default declared in the theme blocks, so it needs no
      attribute — dropping it keeps the markup clean */
   if(accent === 'orange') {
      delete document.body.dataset.accent;
   } else {
      document.body.dataset.accent = accent;
   }
   sessionStorage.setItem('accent', accent);
}

function isAccent(value: string | null): value is AccentKey {
   return accents.some(a => a.key === value);
}

/* touch devices have no hover to collapse the row, so there we drive the
   open/closed state explicitly: the first tap on the visible dot opens the
   row, the next tap picks a colour and closes it again */
function isTouch() {
   return typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
}

export function AccentPicker() {
   const [accent, setAccent] = useState<AccentKey>(() => {
      const stored = sessionStorage.getItem('accent');
      return isAccent(stored) ? stored : weightedRandom();
   });
   const [open, setOpen] = useState(false);
   const ref = useRef<HTMLDivElement>(null);

   /* apply before paint so the chosen accent never flashes orange first */
   useLayoutEffect(() => {
      applyAccent(accent);
   }, [accent]);

   /* while the touch row is open, a tap anywhere outside folds it back up */
   useEffect(() => {
      if(!open) return;
      const close = (e: PointerEvent) => {
         if(!ref.current?.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener('pointerdown', close);
      return () => document.removeEventListener('pointerdown', close);
   }, [open]);

   return <div ref={ref} className={`accent-picker${open ? ' open' : ''}`} role="group" aria-label="Accent color">
      {accents.map(a =>
         <button key={a.key}
            className={`accent-swatch${accent === a.key ? ' active' : ''}`}
            style={{ ['--swatch']: a.color } as CSSProperties}
            aria-label={`${a.key} accent`}
            aria-pressed={accent === a.key}
            title={a.key}
            onClick={e => {
               /* collapsed touch row: first tap only reveals the swatches */
               if(isTouch() && !open) { setOpen(true); return; }
               setAccent(a.key);
               setOpen(false);
               e.currentTarget.blur();
            }} />
      )}
   </div>;
}
