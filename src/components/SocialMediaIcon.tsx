import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Icon } from './Icon';
import './SocialMediaIcon.css';

interface SocialMediaIconProps {
   readonly icon: IconDefinition;
   readonly href?: string;
   readonly id?: string;
   readonly className?: string;
   readonly suffix?: string;
   readonly label?: string;
}

export function SocialMediaIcon({ icon, href, id, className, suffix, label }: SocialMediaIconProps) {
    return href ? <a href={href} target="_blank" rel="noreferrer" aria-label={suffix ? undefined : label}
         className={`small-media-icon ${className ?? ''}`} id={id}>
         <Icon icon={icon} /> {suffix}
      </a> : <span className={`small-media-icon ${className ?? ''}`} ><Icon icon={icon} id={id} />{suffix}</span>;
}
