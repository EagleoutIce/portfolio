import { Content } from "../components/Content";
import NotFoundPenguin from "../resources/404.svg";
import "./NotFound.css"

export function NotFound() {
   return <Content>
      <img src={NotFoundPenguin} alt="404 Penguin" className="penguin-404" />
      <h1>
         Oh no! This page is not to be found!
      </h1>
      If you consider this to be an error, please contact me at <a href="mailto:florian.siher@uni-ulm.de">florian.sihler@uni-ulm.de</a>.
      <div className="main">
      <a href="/portfolio/">
         Back to the main page
      </a>
      </div>
   </Content>;
}  