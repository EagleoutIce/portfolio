import { SiteNotice } from './SiteNotice';
import { LastUpdated } from './LastUpdated';

export function PageFooter() {
   return <footer>
      <SiteNotice />
      <LastUpdated />
   </footer>;
}
