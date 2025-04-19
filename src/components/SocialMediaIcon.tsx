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
   readonly suffix?: string;
}

export function SocialMediaIcon({ icon, href, id, className, suffix }: SocialMediaIconProps) {
    return href ? <a href={href} target="_blank" rel="noreferrer" className={`small-media-icon ${className ?? ''}`} id={id}>
         <FontAwesomeIcon icon={icon} /> {suffix}
      </a> : <span className={`small-media-icon ${className ?? ''}`} ><FontAwesomeIcon icon={icon} id={id} />{suffix}</span>;
}
       