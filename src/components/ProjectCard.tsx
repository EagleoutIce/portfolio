import "./ProjectCard.css";

interface ProjectCard {
   readonly title: JSX.Element | string;
   readonly description: string;
   readonly image: string | JSX.Element;
   readonly link: string;
   readonly extraClasses?: string;
   readonly crumbs?: (JSX.Element | string)[];
}

export function ProjectCard({ title, description, image, link, extraClasses, crumbs }: ProjectCard) {
   return <a className={`project-card ${extraClasses}`} href={link} rel="noreferrer" target="_blank">
         <div>{ typeof image === 'string' ? <img src={image} alt={description} /> : image }</div>
         <div className="project-card-title">
            {title}
         </div>
         <div className="project-card-description">
            {description}
         </div>
         <div className="project-card-breadcrumbs">
            {crumbs?.map(crumb => 
               typeof crumb === 'string' ?
               <div className="breadcrumb" key={`crumb-${crumb}`}>{crumb}</div> :
               <div className="breadcrumb-raw" key={`crumb-${crumb.key}`}>{crumb}</div>
            )}
         </div>
   </a>;
}