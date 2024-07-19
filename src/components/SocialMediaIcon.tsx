import {
   IconProp,
 } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './SocialMediaIcon.css';

interface SocialMediaIconProps {
   readonly icon: IconProp;
   readonly href?: string;
   readonly id?: string;
   readonly className?: string;
}

export function SocialMediaIcon({ icon, href, id, className }: SocialMediaIconProps) {
    return href ? <a href={href} target="_blank" rel="noreferrer" className={`sm-icon ${className}`} id={id}>
         <FontAwesomeIcon icon={icon} />  
      </a> : <FontAwesomeIcon icon={icon} className={`sm-icon ${className}`} id={id} />;
}
       