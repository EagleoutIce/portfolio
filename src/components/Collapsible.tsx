import { useState, type ReactNode } from 'react';
import './Collapsible.css';

interface CollapsibleProps {
   readonly title: ReactNode;
   readonly count?: ReactNode;
   readonly extra?: (open: boolean) => ReactNode;
   readonly light?: boolean;
   readonly className?: string;
   readonly defaultOpen?: boolean;
   readonly children: ReactNode;
}

export function Collapsible({ title, count, extra, light, className, defaultOpen = false, children }: CollapsibleProps) {
   const [open, setOpen] = useState(defaultOpen);
   const [mounted, setMounted] = useState(defaultOpen);
   return <details className={`collapse-section${className ? ` ${className}` : ''}`} open={open}
      onToggle={e => {
         const isOpen = (e.target as HTMLDetailsElement).open;
         setOpen(isOpen);
         if(isOpen) {
            setMounted(true);
         }
      }}>
      <summary>
         {typeof title === 'string'
            ? <span className={`collapse-title${light ? ' light' : ''}`}>{title}</span>
            : title}
         {count !== undefined && <span className="collapse-count">{count}</span>}
         {extra?.(open)}
         <span className="collapse-chevron" />
      </summary>
      {mounted && <div className="collapse-body">{children}</div>}
   </details>;
}
