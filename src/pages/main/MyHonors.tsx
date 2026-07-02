import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { formatEuro, getFeaturedAwards, getFeaturedGrants, getHonors, monthToString } from './HonorsData';
import './MyHonors.css';

export function MyHonors() {
  const grants = getFeaturedGrants();
  const awards = getFeaturedAwards();
  const others = getHonors(new Set([...grants, ...awards].map(f => f.title)));
  return <>
    So far, me and my work received the following honors, awards, and grants/stipends:

    <div className='featured-grants'>
      {grants.map(({ title, amount, link, year, month }) =>
        <a key={title} className='featured-grant' href={link} target="_blank" rel="noreferrer">
          <span className='featured-grant-amount'>{amount !== undefined ? formatEuro(amount) : year}</span>
          <span className='featured-grant-title'>{title}</span>
          <span className='featured-grant-meta'>Grant, {monthToString[month - 1]} {year}</span>
        </a>
      )}
    </div>

    <div className='featured-grants'>
      {awards.map(({ title, link, year, month }) =>
        <a key={title} className='featured-grant' href={link} target="_blank" rel="noreferrer">
          <span className='featured-grant-amount'><FontAwesomeIcon icon={faAward} /> {year}</span>
          <span className='featured-grant-title'>{title}</span>
          <span className='featured-grant-meta'>Award, {monthToString[month - 1]} {year}</span>
        </a>
      )}
    </div>

    <details className='collapse-section honors-other'>
      <summary>
        <span className='collapse-title'>Other honors, grants, and scholarships</span>
        <span className='collapse-count'>{others.length} {others.length === 1 ? 'entry' : 'entries'}</span>
        <span className='collapse-chevron' />
      </summary>
      <p className='note'>A couple more selected grants, honors, and scholarships (not everything makes it onto this page):</p>
      <ul className='honors-list'>
        {others.map(h => h[0])}
      </ul>
      {others.map(h => h[1]).filter(e => e !== undefined)}
    </details>
 </>;
}
