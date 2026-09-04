import type { ReactNode } from 'react';

interface MaybeLinkProps {
   readonly href?: string;
   readonly className?: string;
   readonly children: ReactNode;
}

export function MaybeLink({ href, className, children }: MaybeLinkProps) {
   return href
      ? <a href={href} className={className} target="_blank" rel="noreferrer">{children}</a>
      : <span className={className}>{children}</span>;
}
