import { faGithub, faDocker } from "@fortawesome/free-brands-svg-icons";
import { ProjectCard } from "../../components/ProjectCard";
import flowR from '../../resources/flowR.svg';

import waddle0 from '../../resources/idle-0.png';
import animation from '../../resources/animation.gif';
import pengu0 from '../../resources/minimal-0.png';
import fancyqr from '../../resources/fqr.png';
import montage from '../../resources/montage.png';
import texchr from '../../resources/texchr.svg';
import listings from '../../resources/listings.svg';

import "./MyCurrentProjects.css";
import { SocialMediaIcon } from "../../components/SocialMediaIcon";
import { faCode, faPlay, faBoxOpen, faDatabase, faVials, faPenNib, faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

const flowrEcosystem: { name: string; desc: string; href: string; icon: IconProp; tags: string[] }[] = [
   { name: 'Extension for Positron & VS Code', desc: 'Analyze and slice your R code directly inside Positron and VS Code.', href: 'https://github.com/flowr-analysis/vscode-flowr', icon: faCode, tags: ['TypeScript', 'extension'] },
   { name: 'R Adapter', desc: 'Use flowR directly as a library from within R.', href: 'https://github.com/flowr-analysis/flowr-r-adapter', icon: faBoxOpen, tags: ['R', 'library'] },
   { name: 'Addin for RStudio', desc: 'Slice and analyze your R code from within RStudio.', href: 'https://github.com/flowr-analysis/rstudio-addin-flowr', icon: faPuzzlePiece, tags: ['R', 'extension'] },
   { name: 'Docker Image', desc: 'Run the full flowR server or REPL straight from a ready-to-use Docker image.', href: 'https://hub.docker.com/r/eagleoutice/flowr', icon: faDocker, tags: ['Docker', 'server'] },
   { name: 'Script Taint Checker', desc: 'A ready-to-use Docker image that taint-checks R scripts with flowR.', href: 'https://hub.docker.com/r/eagleoutice/taint-checker', icon: faDocker, tags: ['Docker', 'security'] },
   { name: 'Real-World R Sources', desc: 'An open dataset of real-world R scripts, useful for anyone analyzing R (not just flowR).', href: 'https://doi.org/10.5281/zenodo.18927873', icon: faDatabase, tags: ['dataset', 'R'] },
];

const sampleAnalyzers = [
   { name: 'How to query projects', repo: 'sample-analyzer-project-query', href: 'https://github.com/flowr-analysis/sample-analyzer-project-query' },
   { name: 'How to diff dataflows', repo: 'sample-analyzer-df-diff', href: 'https://github.com/flowr-analysis/sample-analyzer-df-diff' },
];

const notationHelpers = [
   { name: 'The flowR logo', repo: 'flowr-logo', href: 'https://github.com/flowr-analysis/flowr-logo' },
   { name: 'flowR visualizations', repo: 'texels', href: 'https://github.com/flowr-analysis/texels' },
   { name: 'Reusable TeX macros', repo: 'tex-notations', href: 'https://github.com/flowr-analysis/tex-notations' },
];

export function MyCurrentProjects() {
   return <>
      <div className="projects">
         <ProjectCard
            title={<>flowR&nbsp;<SocialMediaIcon className="small" icon={faGithub} key="flowr-github" /></>}
            description="A Dataflow Analysis Framework for R (Dependency Analysis, Program Slicing,&nbsp;...)."
            image={flowR}
            link={"https://github.com/flowr-analysis/flowr"}
            extraClasses="project-card-rotating-img"
            crumbs={["R", "static analysis", "program comprehension"]}
         />
      </div>
      <details className="peeker">
         <summary>flowR Ecosystem</summary>

         <ul className="ecosystem-list">
            {flowrEcosystem.map(e =>
               <li key={e.name}>
                  <a href={e.href} target="_blank" rel="noreferrer" className="ecosystem-item">
                     <FontAwesomeIcon icon={e.icon} className="ecosystem-icon" />
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
            <li className="ecosystem-group">
               <div className="ecosystem-group-head">
                  <FontAwesomeIcon icon={faVials} className="ecosystem-icon" />
                  <span className="ecosystem-text">
                     <span className="ecosystem-name">Sample Analyzers</span>
                     <span className="ecosystem-desc">Small, self-contained example analyzers built on flowR.</span>
                  </span>
               </div>
               <div className="ecosystem-subgrid">
                  {sampleAnalyzers.map(r =>
                     <a className="ecosystem-subcard" key={r.name} href={r.href} title={r.repo} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faGithub} className="ecosystem-subcard-icon" />
                        {r.name}
                     </a>
                  )}
               </div>
            </li>
            <li className="ecosystem-group">
               <div className="ecosystem-group-head">
                  <FontAwesomeIcon icon={faPenNib} className="ecosystem-icon" />
                  <span className="ecosystem-text">
                     <span className="ecosystem-name">Notation Helpers</span>
                     <span className="ecosystem-desc">The LaTeX helpers behind flowR's figures, logo, and notations.</span>
                  </span>
               </div>
               <div className="ecosystem-subgrid">
                  {notationHelpers.map(r =>
                     <a className="ecosystem-subcard" key={r.name} href={r.href} title={r.repo} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faGithub} className="ecosystem-subcard-icon" />
                        {r.name}
                     </a>
                  )}
               </div>
            </li>
         </ul>

         <div className='no-outer main'>
         For more, check out the <a target="_blank" rel="noreferrer" href="https://github.com/flowr-analysis">flowR GitHub organization</a>.
         </div>
      </details>
   </>;
}


export function MyPenguinCurrentProjects() {
   return <div className="projects">
      <ProjectCard
         title=<>Waddle&nbsp;<SocialMediaIcon className="small" icon={faPlay} key="waddle-play" suffix="&nbsp;&nbsp;&nbsp;(de)" /></>
         description="Learning game for children, introducing programming concepts."
         image={<div>
            <img id='waddle-static' src={waddle0} alt={"A cute penguin"} loading="lazy" decoding="async" />
            <img id='waddle-play' src={animation} alt={"A cute penguin"} loading="lazy" decoding="async" />
         </div>}
         extraClasses="waddle-anim"
         link={"https://exia.informatik.uni-ulm.de/waddle"}
         crumbs={["TypeScript", "game", "program comprehension"]}
      />
      <ProjectCard
         title=<>TikZpingus&nbsp;<SocialMediaIcon className="small" icon={faGithub} key="tikzpingus-github" /></>
         description="Cute Penguins in LaTeX with TikZ."
         image={pengu0}
         extraClasses="pengu-anim"
         link={"https://github.com/EagleoutIce/tikzpingus"}
         crumbs={["LaTeX", "tikz", "package"]}
      />
   </div>;
}

export function MyCurrentTypographyProjects() {
   return <>
      <div className="projects">
         <ProjectCard
            title=<>fancyqr&nbsp;<SocialMediaIcon className="small" icon={faGithub} key="fancyqr-github" /></>
            description="Creating rounded and colorful QR codes in LaTeX."
            image={fancyqr}
            extraClasses="project-card-dangle-3d-img"
            link={"https://github.com/EagleoutIce/fancyqr"}
            crumbs={["LaTeX", "qr"]}
         />

         <ProjectCard
            title=<>beamer-themes&nbsp;<SocialMediaIcon className="small" icon={faGithub} key="fancyqr-github" /></>
            description="A collection of beamer-themes I have created over the years."
            image={montage}
            extraClasses="project-card-pulsating-img"
            link={"https://github.com/EagleoutIce/beamer-themes"}
            crumbs={["LaTeX", "beamer"]}
         />
         <ProjectCard
            title=<>sopra-collection&nbsp;<SocialMediaIcon className="small" icon={faGithub} key="fancyqr-github" /></>
            description="A collection of various useful LaTeX packages."
            image={listings}
            extraClasses="project-card-pulsating-img fwhite"
            link={"https://github.com/EagleoutIce/sopra-collection"}
            crumbs={["LaTeX", "packages"]}
         />
         <ProjectCard
            title=<>TexCHR&nbsp;<SocialMediaIcon className="small" icon={faGithub} key="fancyqr-github" /></>
            description="A plain-tex implementation of FreeCHR."
            image={texchr}
            extraClasses="project-card-pulsating-img fwhite"
            link={"https://github.com/EagleoutIce/TeXCHR"}
            crumbs={["TeX", "CHR"]}
         />
      </div>
      <details className="peeker">
         <summary>More Projects</summary>
         
         <div style={{paddingBottom: '25px'}}>
         For a complete list of public projects, check out my <a target="_blank" rel="noreferrer" href="https://github.com/EagleoutIce?tab=repositories&q=&type=public&language=tex" >GitHub Page</a>. 
         </div>
      </details>
   </>;
}