import { PropsWithChildren, useEffect, useRef } from "react";
import "./Header.css";
import { onMobileDevice } from "../util/mobile";

interface HeaderProps extends PropsWithChildren<{}> {
}

export function headerIsSticky(id = 'header'): boolean {
   const header = document.getElementById(id);
   if(!header) return false;
   return header.classList.contains('sticky');
}

export function Header({ children }: HeaderProps) {
   const headerRef = useRef<HTMLDivElement>(null);
   let mobile = onMobileDevice();
   let stickyTop = 0;

   useEffect(() => {
      const measure = () => {
         if(!headerRef.current?.classList.contains('sticky')) {
            stickyTop = (headerRef.current?.offsetTop ?? 0) + 0.33 * (headerRef.current?.clientHeight ?? 0);
         }
      };
      mobile = onMobileDevice();
      measure();
      checkOnScroll();
      const lateInit = setTimeout(() => { measure(); checkOnScroll(); }, 100);
      window.addEventListener('scroll', checkOnScroll, { passive: true });
      window.addEventListener('resize', onResize);
      return () => {
         clearTimeout(lateInit);
         window.removeEventListener('scroll', checkOnScroll);
         window.removeEventListener('resize', onResize);
      };
   }, []);

   const checkOnScroll = () => {
      if(!headerRef.current) return;
      const p = mobile
         ? 1
         : stickyTop > 0
            ? Math.min(Math.max(window.scrollY / stickyTop, 0), 1)
            : 0;
      headerRef.current.style.setProperty('--p', p.toFixed(4));
      headerRef.current.classList.toggle('sticky', p >= 1);
   };

   const onResize = () => {
      mobile = onMobileDevice();
      if(!mobile && !headerRef.current?.classList.contains('sticky')) {
         stickyTop = (headerRef.current?.offsetTop ?? 0) + 0.33 * (headerRef.current?.clientHeight ?? 0);
      }
      checkOnScroll();
   };

   return <header ref={headerRef} className="header" id="header">
         {children}
         <div className="header-glue" />
      </header>;
}
