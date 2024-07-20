import { useNavigate } from "react-router-dom";
import { Content } from "../components/Content";

interface SiteNoticePageProps {
   readonly legalName: string,
   readonly legalAddress: JSX.Element;
}

export function SiteNoticePage({ legalName, legalAddress }: SiteNoticePageProps) {
   const navigate = useNavigate();

   return <Content>
      <h1>Site Notice</h1>
      <i>{legalName}</i>
      <br />{legalAddress}<br />
      <button
         onClick={e => {
            e.preventDefault();
            navigate(-1);
         }}>Back</button>
   </Content>;
}  