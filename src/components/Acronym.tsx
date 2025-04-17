import { Tooltip } from "react-tooltip";
import { escapeId } from "../util/id";

interface AcronymProps {
   readonly short: string | JSX.Element;
   readonly long: string;
   readonly id?: string
}

export default function Acronym({ short, long, id = long }: AcronymProps) {
   const idKey = 'acronym-' + escapeId(id);
   return <>
      <span id={idKey} style={{ cursor: 'help' }}>{short}</span>
      <Tooltip anchorSelect={`#${idKey}`} content={long} key={`tt-${idKey}`} place="bottom" style={{ padding: '2px 6px', margin: '-6px 0px' }}/>
   </>
}