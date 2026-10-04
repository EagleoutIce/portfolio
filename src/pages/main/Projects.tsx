import { Icon } from '../../components/Icon';
import { faGithub, faDocker } from "@fortawesome/free-brands-svg-icons";
import { faCode, faPlay, faBoxOpen, faDatabase, faVials, faPenNib, faPuzzlePiece, faGlobe } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ProjectCard } from "../../components/ProjectCard";
import { SocialMediaIcon } from "../../components/SocialMediaIcon";
import ecosystem from "../../data/flowr-ecosystem.json";
import projects from "../../data/projects.json";

import flowRBack from '../../resources/flowR-back.svg';
import flowRFront from '../../resources/flowR-front.svg';
import waddle0 from '../../resources/idle-0.png';
import waddle0Scarf from '../../resources/idle-0-scarf.png';
import waddleSheet from '../../resources/waddle-sheet.png';
import waddleSheetScarf from '../../resources/waddle-sheet-scarf.png';
import pengu0 from '../../resources/minimal-0.webp';
import pengu0Tie from '../../resources/minimal-0-tie.webp';
import fancyqr from '../../resources/fqr.webp';
import montageBack from '../../resources/montage-back.webp';
import montageMid from '../../resources/montage-mid.webp';
import montageFront from '../../resources/montage-front.webp';
import texchr from '../../resources/texchr.svg';
import listings from '../../resources/listings.svg';
import lambda from '../../resources/lambda.svg';
import lambdaArrows from '../../resources/lambda-arrows.svg';
import ghciBase from '../../resources/magic-haskell-base.svg';
import ghciAnswer from '../../resources/magic-haskell-answer.svg';
import ghciCursor from '../../resources/magic-haskell-cursor.svg';
import satex from '../../resources/satex.svg';
import satexLine1 from '../../resources/satex-line1.svg';
import satexLine2 from '../../resources/satex-line2.svg';

import "./Projects.css";

const ICONS: Record<string, IconDefinition> = {
   github: faGithub, docker: faDocker, code: faCode, box: faBoxOpen, globe: faGlobe,
   play: faPlay, puzzle: faPuzzlePiece, database: faDatabase, vials: faVials, pen: faPenNib
};

const IMAGES: Record<string, string> = { fancyqr, texchr, listings };

/** the animation classes a project card can opt into */
const ANIMATIONS: Record<string, string> = {
   rotating: 'project-card-rotating-img',
   'pulsating-white': 'project-card-pulsating-img fwhite',
   dangle: 'project-card-dangle-3d-img',
   waddle: 'waddle-anim',
   pengu: 'pengu-anim',
   jelly: 'project-card-jelly-img fwhite',
   deck: 'project-card-deck-img',
   ghci: 'project-card-ghci-img',
   reduce: 'project-card-reduce-img',
   typeset: 'project-card-typeset-img fhue accent-glow'
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

/** a logo built from layers stacked in one grid cell, each with its own class
    to animate or tint it */
function stack(layers: [src: string, cls: string][], cls = '') {
   return <div className={`logo-stack ${cls}`}>
      {layers.map(([src, c], i) => <img key={i} className={c} src={src} alt="" loading="lazy" decoding="async" />)}
   </div>;
}

/** `tint` layers are hue-rotated toward the accent */
function layers(base: string, tint?: string, cls = '') {
   return stack(tint ? [[base, ''], [tint, 'tint']] : [[base, '']], cls);
}

/** the penguin swaps to an animated sprite sheet on hover; the scarf is a
    separate layer so it can follow the accent, which is why this is not a gif
    (two gifs would not stay in sync) */
const waddleImage = <div>
   <div id='waddle-static'>{layers(waddle0, waddle0Scarf)}</div>
   <div id='waddle-play'>{layers(waddleSheet, waddleSheetScarf, 'sprite')}</div>
</div>;

const LAYERED: Record<string, JSX.Element> = {
   waddle: waddleImage,
   pengu: layers(pengu0, pengu0Tie),
   /* the two petal rings spin at different speeds */
   flowr: stack([[flowRBack, 'flowr-back'], [flowRFront, 'flowr-front']]),
   /* the slides fan out */
   montage: stack([[montageBack, 'deck-back'], [montageMid, 'deck-mid'], [montageFront, 'deck-front']]),
   /* GHCi types its answer while the cursor blinks */
   ghci: stack([[ghciBase, ''], [ghciAnswer, 'ghci-answer'], [ghciCursor, 'ghci-cursor']]),
   /* the β-arrow draws, then the step happens; the arrow layer repeats the
      term (it lies exactly on the base) and is clipped to the arrow's band */
   lambda: stack([[lambda, 'lc-rows'], [lambdaArrows, 'lc-arrow']]),
   /* title and both tagline lines animate separately */
   satex: <div className="logo-col">
      {[[satex, 'satex-title'], [satexLine1, 'satex-line1'], [satexLine2, 'satex-line2']].map(([src, c]) =>
         <img key={c} className={c} src={src} alt="" loading="lazy" decoding="async" />)}
   </div>
};

function card(p: Project) {
   return <ProjectCard key={p.name}
      title={<>{p.name}&nbsp;<SocialMediaIcon className="small" icon={ICONS[p.icon]} suffix={p.suffix && `\u00a0\u00a0\u00a0${p.suffix}`} /></>}
      description={p.desc}
      image={LAYERED[p.image] ?? IMAGES[p.image]}
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