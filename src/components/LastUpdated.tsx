import "./LastUpdated.css"

/** updated automatically in the ci */
const LAST_UPDATED = "2024-01-01T00:00:00";

export function getLastUpdated(): string {
   // we do the string cast here so TS isn't confused whenever the comparison is incompatible
   return new Date(LAST_UPDATED as string === "2024-01-01T00:00:00" ? Date.now() : LAST_UPDATED).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
   })
}

export function LastUpdated() {
   return <div className="last-updated-position">
      Updated <span className="last-updated-date">{
         getLastUpdated()
      }</span>
   </div>;
}