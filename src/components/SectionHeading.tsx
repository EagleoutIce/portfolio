import { PropsWithChildren } from "react";
import "./SectionHeading.css";

interface SectionHeadingProps extends PropsWithChildren<{}> {
   readonly id: string;
   /** heading level to render, defaults to h2 */
   readonly as?: 'h2' | 'h3';
   /** when set, the heading text becomes a link (e.g. to a detailed subpage) */
   readonly href?: string;
   /** hint shown next to a linked heading */
   readonly linkHint?: string;
}

export function SectionHeading({ id, as: Tag = 'h2', href, linkHint, children }: SectionHeadingProps) {
   return <Tag id={id} className="section-heading">
      <a className="heading-anchor" href={`#/${id}`} aria-label={`Permalink to this section`}>#</a>
      {href
         ? <a className="heading-link" href={href}>
              {children}
              <span className="heading-link-hint">{linkHint ?? 'details'}&nbsp;&rarr;</span>
           </a>
         : children}
   </Tag>;
}
