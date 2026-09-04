import { Component, useEffect, useState, type ReactNode } from 'react';

function currentRoute() {
   return window.location.hash.replace(/^#\/?/, '').split('?')[0];
}

/** the current hash route, e.g. "#/timeline?e=x" becomes "timeline" */
export function useRoute(): string {
   const [route, setRoute] = useState(currentRoute);
   useEffect(() => {
      const onChange = () => setRoute(currentRoute());
      window.addEventListener('hashchange', onChange);
      return () => window.removeEventListener('hashchange', onChange);
   }, []);
   return route;
}

interface BoundaryProps {
   readonly fallback: ReactNode;
   readonly children: ReactNode;
}

export class ErrorBoundary extends Component<BoundaryProps, { failed: boolean }> {
   override state = { failed: false };

   static getDerivedStateFromError() {
      return { failed: true };
   }

   override render() {
      return this.state.failed ? this.props.fallback : this.props.children;
   }
}
