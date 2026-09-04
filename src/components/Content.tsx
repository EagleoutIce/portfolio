import { PropsWithChildren } from "react";
import "./Content.css";

export interface ContentProps extends PropsWithChildren<{}> {
}

export function Content({ children }: ContentProps) {
   return <main id="main-content" className="content">
      {children}
   </main>;
}