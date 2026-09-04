import { renderText } from "../../util/text";
import profile from "../../data/profile.json";
import "./Intro.css";

export function MyIntro() {
   return <div className="main" style={{ marginBottom: '0em' }}>
      {renderText(profile.intro, 'intro-p')}
   </div>;
}
