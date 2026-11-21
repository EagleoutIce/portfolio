import type { ReactNode } from 'react';

const INLINE = /\[([^\]]+)\]\(([^)\s]+)(?: "([^"]*)")?\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;

/** typographic punctuation for plain prose: curly quotes and apostrophes
    (incl. the elided-century '24), en dashes for spaced hyphens, a real
    ellipsis, and no-break spaces after one-letter words and initials. only ever applied to text, never to hrefs or `code`. */
export function typeset(text: string): string {
   return text
      .replace(/\.\.\./g, '\u2026')
      .replace(/ -{1,2} /g, '\u2009\u2013\u2009')
      .replace(/'(?=\d{2}\b)/g, '\u2019')
      .replace(/(\w)'/g, '$1\u2019')
      .replace(/'/g, '\u2018')
      .replace(/(^|[\s(\[\u2014\u2013])"/g, '$1\u201c')
      .replace(/"/g, '\u201d')
      /* glue single-letter words (I, a) and initials (M. Di Agostino) to the
         next word, and keep "Nov 9" together, so no line ends on a stub */
      .replace(/(^|[\s(\u00a0])([A-Za-z&]) (?=\S)/g, '$1$2\u00a0')
      .replace(/(^|[\s(\u00a0])([A-Za-z&]) (?=\S)/g, '$1$2\u00a0')
      .replace(/\b([A-Z])\. (?=\p{Lu})/gu, '$1.\u00a0')
      /* numbers stay with what they count or name: "12th Heidelberg",
         "17 entries", "deRSE '24", "e.g. this", "Dr. X" */
      .replace(/(\d+(?:st|nd|rd|th)?) (?=\p{L})/gu, '$1\u00a0')
      .replace(/ (?=\u2019\d{2}\b)/g, '\u00a0')
      .replace(/\b(e\.g\.|i\.e\.|cf\.|Dr\.|Prof\.|pp?\.|No\.|vs\.) /g, '$1\u00a0')
      .replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (?=\d)/g, '$1\u00a0');
}

export const INLINE_TOOLTIP_ID = 'inline-tooltip';

/* standalone runs of capitals: GI, IEEE, SPLASH-E, the RSE of de-RSE; never
   capitals inside a mixed-case name (YoungRSE, RSECon, useR, TeX) */
const ACRONYM = /(?<![A-Za-z])[A-Z][A-Z0-9]+(?:-[A-Z0-9]+)*(?![A-Za-z])/g;

/** wrap all-caps acronyms (GI, IEEE, HLF) so the serif face can set them in
    letter-spaced small caps (see typography.css) */
export function caps(t: string, key: number | string = 0): ReactNode[] {
   const out: ReactNode[] = [];
   let last = 0;
   for(const m of t.matchAll(ACRONYM)) {
      if(m.index > last) out.push(t.slice(last, m.index));
      out.push(<span className="caps" key={`${key}-${m.index}`}>{m[0]}</span>);
      last = m.index + m[0].length;
   }
   out.push(t.slice(last));
   return out;
}

/** typeset plain text and mark its acronyms */
function prose(text: string, key: number): ReactNode[] {
   return caps(typeset(text), key);
}

/** inline markup used by the data files: [text](href), [text](href "tooltip"),
    **bold**, *italic*, `code`. tooltips use the shared INLINE_TOOLTIP_ID tooltip */
export function renderInline(text: string): ReactNode {
   const out: ReactNode[] = [];
   let last = 0;
   for(const m of text.matchAll(INLINE)) {
      const [full, label, href, tip, strong, em, code] = m;
      if(m.index > last) {
         out.push(...prose(text.slice(last, m.index), last));
      }
      out.push(label !== undefined
         ? <a key={m.index} className="link" href={href} target="_blank" rel="noreferrer"
            {...tip ? { 'data-tooltip-id': INLINE_TOOLTIP_ID, 'data-tooltip-content': typeset(tip), 'aria-label': `${label} (${tip})` } : {}}>{renderInline(label)}</a>
         : strong !== undefined ? <b key={m.index}>{strong}</b>
         : em !== undefined ? <i key={m.index}>{em}</i>
         : <code key={m.index}>{code}</code>);
      last = m.index + full.length;
   }
   out.push(...prose(text.slice(last), last));
   return out;
}

/** blank-line separated paragraphs, each with inline markup */
export function renderText(text: string, className?: string): ReactNode {
   return text.split(/\n{2,}/).map((p, i) => <p className={className} key={i}>{renderInline(p)}</p>);
}
