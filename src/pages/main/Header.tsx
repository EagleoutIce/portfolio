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

export function MyHeader() {
   return <Header compact={<>
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
   </Header>;
}
