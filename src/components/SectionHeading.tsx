import { PropsWithChildren } from "react";
import "./SectionHeading.css";

interface SectionHeadingProps extends PropsWithChildren<{}> {
   readonly id: string;
   /** heading level to render, defaults to h2 */
   readonly as?: 'h2' | 'h3';
}

export function SectionHeading({ id, as: Tag = 'h2', children }: SectionHeadingProps) {
   return <Tag id={id} className="section-heading">
      <a className="heading-anchor" href={`#/${id}`} aria-label={`Permalink to this section`}>#</a>
      {children}
   </Tag>;
}
