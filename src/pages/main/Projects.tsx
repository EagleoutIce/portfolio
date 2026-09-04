import { Icon } from '../../components/Icon';
import { faGithub, faDocker } from "@fortawesome/free-brands-svg-icons";
import { faCode, faPlay, faBoxOpen, faDatabase, faVials, faPenNib, faPuzzlePiece, faGlobe } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ProjectCard } from "../../components/ProjectCard";
import { SocialMediaIcon } from "../../components/SocialMediaIcon";
import ecosystem from "../../data/flowr-ecosystem.json";
import projects from "../../data/projects.json";

import flowR from '../../resources/flowR.svg';
import waddle0 from '../../resources/idle-0.png';
import animation from '../../resources/animation.gif';
import pengu0 from '../../resources/minimal-0.webp';
import fancyqr from '../../resources/fqr.webp';
import montage from '../../resources/montage.webp';
import texchr from '../../resources/texchr.svg';
import listings from '../../resources/listings.svg';

import "./Projects.css";

const ICONS: Record<string, IconDefinition> = {
   github: faGithub, docker: faDocker, code: faCode, box: faBoxOpen, globe: faGlobe,
   play: faPlay, puzzle: faPuzzlePiece, database: faDatabase, vials: faVials, pen: faPenNib
};

const IMAGES: Record<string, string> = { flowr: flowR, pengu: pengu0, fancyqr, montage, texchr, listings };

/** the animation classes a project card can opt into */
const ANIMATIONS: Record<string, string> = {
   rotating: 'project-card-rotating-img',
   pulsating: 'project-card-pulsating-img',
   'pulsating-white': 'project-card-pulsating-img fwhite',
   dangle: 'project-card-dangle-3d-img',
   waddle: 'waddle-anim',
   pengu: 'pengu-anim'
};

interface Project {
   name: string;
   icon: string;
   suffix?: string;
   desc: string;
   image: string;
   anim: string;
   link: string;
   tags: string[];
}

/** the penguin swaps to an animated sprite on hover, so it ships two images */
const waddleImage = <div>
   <img id='waddle-static' src={waddle0} alt="A cute penguin" loading="lazy" decoding="async" />
   <img id='waddle-play' src={animation} alt="A cute penguin" loading="lazy" decoding="async" />
</div>;

function card(p: Project) {
   return <ProjectCard key={p.name}
      title={<>{p.name}&nbsp;<SocialMediaIcon className="small" icon={ICONS[p.icon]} suffix={p.suffix && `\u00a0\u00a0\u00a0${p.suffix}`} /></>}
      description={p.desc}
      image={p.image === 'waddle' ? waddleImage : IMAGES[p.image]}
      link={p.link}
      extraClasses={ANIMATIONS[p.anim]}
      crumbs={p.tags} />;
}

const { parts, groups } = ecosystem;

export function MyCurrentProjects() {
   return <>
      <div className="projects">
         {projects.main.map(card)}
      </div>
      <details className="peeker">
         <summary>flowR Ecosystem</summary>
         <div className="collapse-body">
         <ul className="ecosystem-list">
            {parts.map(e =>
               <li key={e.name}>
                  <a href={e.href} target="_blank" rel="noreferrer" className="ecosystem-item">
                     <Icon icon={ICONS[e.icon]} className="ecosystem-icon" />
                     <span className="ecosystem-text">
                        <span className="ecosystem-name">{e.name}</span>
                        <span className="ecosystem-desc">{e.desc}</span>
                     </span>
                     <span className="ecosystem-tags">
                        {e.tags.map(t => <span className="ecosystem-tag" key={t}>{t}</span>)}
                     </span>
                  </a>
               </li>
            )}
            {groups.map(g =>
               <li className="ecosystem-group" key={g.name}>
                  <div className="ecosystem-group-head">
                     <Icon icon={ICONS[g.icon]} className="ecosystem-icon" />
                     <span className="ecosystem-text">
                        <span className="ecosystem-name">{g.name}</span>
                        <span className="ecosystem-desc">{g.desc}</span>
                     </span>
                  </div>
                  <div className="ecosystem-subgrid">
                     {g.repos.map(r =>
                        <a className="ecosystem-subcard" key={r.name} href={r.href} title={r.repo} target="_blank" rel="noreferrer">
                           <Icon icon={faGithub} className="ecosystem-subcard-icon" />
                           {r.name}
                        </a>
                     )}
                  </div>
               </li>
            )}
         </ul>

         <div className='no-outer main'>
         For more, check out the <a target="_blank" rel="noreferrer" href="https://github.com/flowr-analysis">flowR GitHub organization</a>.
         </div>
         </div>
      </details>
   </>;
}


export function MyPenguinCurrentProjects() {
   return <div className="projects">
      {projects.penguins.map(card)}
   </div>;
}

export function MyCurrentTypographyProjects() {
   return <>
      <div className="projects">
         {projects.typography.map(card)}
      </div>
      <details className="peeker">
         <summary>More Projects</summary>
         <div className="collapse-body">
            <div style={{paddingBottom: '25px'}}>
            For a complete list of public projects, check out my <a target="_blank" rel="noreferrer" href="https://github.com/EagleoutIce?tab=repositories&q=&type=public&language=tex" >GitHub Page</a>.
            </div>
         </div>
      </details>
   </>;
}