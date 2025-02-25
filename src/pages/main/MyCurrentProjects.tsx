import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { ProjectCard } from "../../components/ProjectCard";
import flowR from '../../resources/flowR.svg';
import flowRvsc from '../../resources/flowR-vsc.svg';
import flowRrs from '../../resources/flowR-rs.svg';

import waddle0 from '../../resources/idle-0.png';
import animation from '../../resources/animation.gif';
import pengu0 from '../../resources/minimal-0.png';
import fancyqr from '../../resources/fqr.png';
import montage from '../../resources/montage.png';
import texchr from '../../resources/texchr.svg';
import listings from '../../resources/listings.svg';

import "./MyCurrentProjects.css";
import { SocialMediaIcon } from "../../components/SocialMediaIcon";
import { faCode, faPlay } from "@fortawesome/free-solid-svg-icons";

export function MyCurrentProjects() {
   return <>
      <div className="projects">
         <ProjectCard
            title={<>flowR <SocialMediaIcon className="small" icon={faGithub} key="flowr-github" /></>}
            description="A Dataflow Analyzer for R (Dependency Analysis, Program Slicing, ...)."
            image={flowR}
            link={"https://github.com/flowr-analysis/flowr"}
            extraClasses="project-card-rotating-img"
            crumbs={["R", "static analysis", "program comprehension"]}
         />
      </div>
      <details className="peeker">
         <summary>flowR Ecosystem</summary>

         <div className="projects">
            <ProjectCard
               title=<> Extension for Visual Studio Code <SocialMediaIcon className="small" icon={faCode} key="flowr-vsc-github" /> </>
               description="Directly analyze and slice your R code in Visual Studio Code."
               image={flowRvsc}
               extraClasses="project-card-pulsating-img small-img"
               link={"https://marketplace.visualstudio.com/items?itemName=code-inspect.vscode-flowr"}
               crumbs={["TypeScript", "extension"]}
            />
            <ProjectCard
               title=<> Addin for RStudio <SocialMediaIcon className="small" icon={faGithub} key="flowr-rs-github" /> </>
               description="Directly slice and analyze your R code in RStudio."
               image={flowRrs}
               extraClasses="project-card-pulsating-img small-img"
               link={"https://github.com/flowr-analysis/rstudio-addin-flowr"}
               crumbs={["R", "extension"]}
            />
         </div>
         
         <div className='no-outer main'>
         For more, check out the <a target="_blank" rel="noreferrer" href="https://github.com/flowr-analysis">flowR GitHub organization</a>.
         </div>
      </details>
   </>;
}


export function MyPenguinCurrentProjects() {
   return <div className="projects">
      <ProjectCard
         title=<>Waddle <SocialMediaIcon className="small" icon={faPlay} key="waddle-play" /></>
         description="Learning game for children, introducing programming concepts."
         image={<div>
            <img id='waddle-static' src={waddle0} alt={"A cute penguin"} />
            <img id='waddle-play' src={animation} alt={"A cute penguin"} />
         </div>}
         extraClasses="waddle-anim"
         link={"https://exia.informatik.uni-ulm.de/waddle"}
         crumbs={["TypeScript", "game", "program comprehension"]}
      />
      <ProjectCard
         title=<>TikZpingus <SocialMediaIcon className="small" icon={faGithub} key="tikzpingus-github" /></>
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
            title=<>fancyqr <SocialMediaIcon className="small" icon={faGithub} key="fancyqr-github" /></>
            description="Creating rounded and colorful QR codes in LaTeX."
            image={fancyqr}
            extraClasses="project-card-dangle-3d-img"
            link={"https://github.com/EagleoutIce/fancyqr"}
            crumbs={["LaTeX", "qr"]}
         />

         <ProjectCard
            title=<>beamer-themes <SocialMediaIcon className="small" icon={faGithub} key="fancyqr-github" /></>
            description="A collection of beamer-themes I have created over the years."
            image={montage}
            extraClasses="project-card-pulsating-img"
            link={"https://github.com/EagleoutIce/beamer-themes"}
            crumbs={["LaTeX", "beamer"]}
         />
         { /* TODO: sopra-collections, code-animation */}
         <ProjectCard
            title=<>sopra-collections <SocialMediaIcon className="small" icon={faGithub} key="fancyqr-github" /></>
            description="A collection of various useful LaTeX packages."
            image={listings}
            extraClasses="project-card-pulsating-img fwhite"
            link={"https://github.com/EagleoutIce/sopra-collection"}
            crumbs={["LaTeX", "packages"]}
         />
         <ProjectCard
            title=<>TexCHR <SocialMediaIcon className="small" icon={faGithub} key="fancyqr-github" /></>
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