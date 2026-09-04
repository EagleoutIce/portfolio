import { Content } from "../components/Content";

interface SiteNoticePageProps {
   readonly legalName: string,
   readonly legalEmail?: string,
   readonly legalAddress: JSX.Element;
}

export function SiteNoticePage({ legalName, legalEmail, legalAddress }: SiteNoticePageProps) {
   return <Content>
      <h1>Site Notice</h1>
      <i>{legalName}</i>
      {legalEmail && <><br />
         <a href={`mailto:${legalEmail}`}>{legalEmail}</a>
      </>}
      <br /><br />{legalAddress}<br />
      <button
         onClick={e => {
            e.preventDefault();
            window.history.back();
         }}>Back</button>
   </Content>;
}  