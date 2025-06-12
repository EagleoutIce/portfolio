import { faEnvelope, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Header } from "../../components/Header";
import TitleName from "../../components/TitleName";
import { faGithub, faGoogleScholar, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import me from '../../resources/me.jpg';
import QuickLinks from '../../components/QuickLinks';
import './MyHeader.css';

export function MyHeader() {
   return <Header>
   <TitleName
     name="Florian Sihler"
     subtitle="PhD Student at Ulm University"
     imageSrc={me}
     mediaLinks={{
       'GitHub Profile': {
         icon: faGithub,
         href: 'https://github.com/EagleoutIce'
       },
       'University Website': {
         icon: faGraduationCap,
         href: 'https://www.uni-ulm.de/en/in/sp/team/florian-sihler/'
       },
       'LinkedIn Profile': {
         icon: faLinkedin,
         href: 'https://www.linkedin.com/in/florian-sihler-334050293/'
       },
       'Google Scholar': {
         icon: faGoogleScholar,
         href: 'https://scholar.google.de/citations?user=DnwmgrsAAAAJ'
       },
       'E-Mail': {
         icon: faEnvelope,
         href: 'mailto:florian.sihler@uni-ulm.de'
       }
     }}
   />
   <div className="header-row"></div>
   <QuickLinks sections={{
      projects: { page: 'my-projects'},
      publications: { page: 'publications'},
      service: { page: 'service'},
      honors: { page: 'honors-awards-and-grants'},
      teaching: { page: 'teaching'},
   }}></QuickLinks>
 </Header>;
}