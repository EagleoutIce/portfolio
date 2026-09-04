import type { ReactNode } from 'react';

const INLINE = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;

/** inline markup used by the data files: [text](href), **bold**, *italic*, `code` */
export function renderInline(text: string): ReactNode {
   const out: ReactNode[] = [];
   let last = 0;
   for(const m of text.matchAll(INLINE)) {
      const [full, label, href, strong, em, code] = m;
      if(m.index > last) {
         out.push(text.slice(last, m.index));
      }
      out.push(label !== undefined
         ? <a key={m.index} className="link" href={href} target="_blank" rel="noreferrer">{renderInline(label)}</a>
         : strong !== undefined ? <b key={m.index}>{strong}</b>
         : em !== undefined ? <i key={m.index}>{em}</i>
         : <code key={m.index}>{code}</code>);
      last = m.index + full.length;
   }
   out.push(text.slice(last));
   return out;
}

/** blank-line separated paragraphs, each with inline markup */
export function renderText(text: string, className?: string): ReactNode {
   return text.split(/\n{2,}/).map((p, i) => <p className={className} key={i}>{renderInline(p)}</p>);
}
