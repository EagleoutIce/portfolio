import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./TitleName.css";
import { SocialMediaIcon } from "./SocialMediaIcon";
import { Tooltip } from "react-tooltip";
import { headerIsSticky } from "./Header";

export interface TitleNameProps {
   readonly name: string;
   readonly subtitle: string;
   readonly imageSrc: string;
   readonly mediaLinks: {
      [key: string]: {
         icon: IconProp;
         href: string;
      };
   };
}


export default function TitleName({ name, subtitle, imageSrc, mediaLinks }: TitleNameProps) {
   return <div className="title-name-card">
      <img src={imageSrc} alt={name} className="profile-image" onClick={() => {
         if(headerIsSticky()) {
            window.scrollTo({top: 0, behavior: 'smooth'});
         }
      }} />
      <div>
         <span className="profile-name">{name} <br /></span>
         <span className="profile-subtitle">{subtitle}<br /></span>
         <span className="profile-sm">{
            Object.entries(mediaLinks).map(([key, {icon, href}]) => {
               const idKey = key.replace(/\s/g, '-').toLowerCase();
               return <div key={idKey} style={{display: 'inline'}}>
                  <SocialMediaIcon href={href} icon={icon} key={idKey} id={`small-media-icon-${idKey}`} />
                  <Tooltip anchorSelect={`#small-media-icon-${idKey}`} content={key} key={`tt-${idKey}`} place="bottom" noArrow style={{ padding: '2px 6px'}}/>
               </div>;
            })
         }</span>
      </div>
   </div>;
}