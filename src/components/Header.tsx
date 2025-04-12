import { PropsWithChildren, useEffect, useRef } from "react";
import "./Header.css";
import { onMobileDevice } from "../util/mobile";

interface HeaderProps extends PropsWithChildren<{}> {
}

async function ifPropertyHoldsForTime(property: () => boolean, ms: number, then: () => void, otherwise: () => void): Promise<void> {
   if(!property()) {
      otherwise();
      return;
   }
   await new Promise(resolve => setTimeout(resolve, ms));
   if(property()) {
      then();
   } else {
      otherwise();
   }
}

export function headerIsSticky(id = 'header'): boolean {
   const header = document.getElementById(id);
   if(!header) {
      return false;
   }
   return header.classList.contains('sticky');
}


export function Header({ children }: HeaderProps) {
   const headerRef = useRef<HTMLDivElement>(null);
   let mobile = onMobileDevice();
   setTimeout(() => {
      onResize();
      checkOnScroll();
   }, 50);
   let stickyTop = 0;
   
   useEffect(() => {
      window.addEventListener('scroll', checkOnScroll);
      window.addEventListener('resize', onResize);
      return () => {
         window.removeEventListener('scroll', checkOnScroll);
         window.removeEventListener('resize', onResize);
      }
   }, []);
   
   useEffect(() => {
      stickyTop = (headerRef.current?.offsetTop ?? 0) + 0.33 * (headerRef.current?.clientHeight ?? 0);
   }, [headerRef.current]);
   
   const checkOnScroll = () => {
      if(mobile) {
         // assure sticky
         ensureSticky();
         return;
      }
      void ifPropertyHoldsForTime(() => window.scrollY - stickyTop > 0, 50, () => {
         headerRef.current?.classList.add('sticky');
      }, () => {
         headerRef.current?.classList.remove('sticky');
      })
   }
   
   const onResize = () => {
      mobile = onMobileDevice();
      
      if(mobile) {
         headerRef.current?.classList.add('sticky');
      } else {
         headerRef.current?.classList.remove('sticky');
      }
   }

   return <header ref={headerRef} className="header" id="header">
         {children}
         <div className="header-glue" />
      </header>;

   function ensureSticky() {
      if(!headerRef.current?.classList.contains('sticky')) {
         headerRef.current?.classList.add('sticky');
      }
   }
}
   