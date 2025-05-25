import { Tooltip } from "react-tooltip";
import { escapeId } from "../util/id";

interface ShortLongProps {
   readonly short: string | JSX.Element;
   readonly long: string;
   readonly id?: string
}

export default function ShortLong({ short, long, id = long }: ShortLongProps) {
   const idKey = 'short-long-' + escapeId(id);
   return <>
      <span id={idKey} style={{ cursor: 'help' }}>{short}</span>
      <Tooltip anchorSelect={`#${idKey}`} content={long} key={`tt-${idKey}`} place="bottom" style={{ padding: '2px 6px', margin: '-6px 0px' }}/>
   </>
}