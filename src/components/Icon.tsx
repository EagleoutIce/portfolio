import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface IconProps {
   readonly icon: IconDefinition;
   readonly className?: string;
   readonly id?: string;
   /** set when the icon is the only content of its control, so it needs a name */
   readonly label?: string;
}

export function Icon({ icon, className, id, label }: IconProps) {
   const [width, height, , , path] = icon.icon;
   return <svg id={id} className={`icon${className ? ` ${className}` : ''}`}
      xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}
      role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}
      focusable="false">
      <path fill="currentColor" d={Array.isArray(path) ? path.join('') : path} />
   </svg>;
}
