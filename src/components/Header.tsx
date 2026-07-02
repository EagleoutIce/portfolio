import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from "react";
import "./Header.css";

interface HeaderProps extends PropsWithChildren<{}> {
   /** contents of the compact sticky bar; defaults to the regular children */
   readonly compact?: ReactNode;
}

export function headerIsSticky(id = 'header'): boolean {
   return document.getElementById(id)?.classList.contains('shown') ?? false;
}

export function Header({ children, compact }: HeaderProps) {
   const fullRef = useRef<HTMLElement>(null);
   const barRef = useRef<HTMLElement>(null);
   const [shown, setShown] = useState(false);

   useEffect(() => {
      const onScroll = () => {
         const full = fullRef.current;
         if(!full) return;
         /* slide the bar in once two thirds of the full header have scrolled away */
         const rect = full.getBoundingClientRect();
         setShown(rect.bottom <= rect.height / 3);
         if(barRef.current) {
            document.body.style.setProperty('--header-bar-height', `${barRef.current.offsetHeight}px`);
         }
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      return () => {
         window.removeEventListener('scroll', onScroll);
         window.removeEventListener('resize', onScroll);
      };
   }, []);

   /* let others (e.g. the theme toggle) restyle themselves for the compact bar */
   useEffect(() => {
      document.body.classList.toggle('compact-header', shown);
      return () => document.body.classList.remove('compact-header');
   }, [shown]);

   return <>
      <header ref={fullRef} className="header">
         {children}
      </header>
      <header ref={barRef} className={`header sticky${shown ? ' shown' : ''}`} id="header" aria-hidden={!shown}>
         {compact ?? children}
         <div className="header-glue" />
      </header>
   </>;
}
