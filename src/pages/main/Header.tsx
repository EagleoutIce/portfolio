import { faEnvelope, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Header } from "../../components/Header";
import TitleName from "../../components/TitleName";
import { faGithub, faGoogleScholar, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import me from '../../resources/me.webp';
import QuickLinks from '../../components/QuickLinks';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import profile from '../../data/profile.json';

const ICONS: Record<string, IconDefinition> = {
   github: faGithub, university: faGraduationCap, linkedin: faLinkedin,
   scholar: faGoogleScholar, mail: faEnvelope
};

const mediaLinks = Object.fromEntries(profile.links.map(({ label, icon, href }) => [label, { icon: ICONS[icon], href }]));

const sections = {
   projects: { page: 'my-projects' },
   publications: { page: 'publications' },
   service: { page: 'service' },
   honors: { page: 'honors-awards-and-grants' },
   teaching: { page: 'teaching' },
};

/* drifting noise displacement for the avatar's glass (see TitleName.css) */
function GlassFilter() {
   return <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <filter id="profile-glass" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
         <feTurbulence type="fractalNoise" baseFrequency="0.014 0.022" numOctaves={2} seed={7} result="noise">
            <animate attributeName="baseFrequency" dur="26s" repeatCount="indefinite"
               values="0.014 0.022; 0.022 0.014; 0.014 0.022" />
         </feTurbulence>
         <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" />
      </filter>
   </svg>;
}

export function MyHeader() {
   return <><GlassFilter /><Header compact={<>
      <TitleName
         name={profile.name}
         subtitle={profile.subtitle}
         imageSrc={me}
         mediaLinks={mediaLinks}
         idPrefix="sticky-"
      />
      <QuickLinks sections={sections} />
   </>}>
      <TitleName
         heading
         name={profile.name}
         subtitle={profile.subtitle}
         imageSrc={me}
         mediaLinks={mediaLinks}
      />
      <QuickLinks sections={sections} />
   </Header></>;
}
