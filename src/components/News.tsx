import { Icon } from './Icon';
import { useMemo, useState } from "react";
import { Collapsible } from "./Collapsible";
import "./News.css"
import { getLastUpdated } from "./LastUpdated";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { news, type NewsItem } from "../data/news";

export function News() {
   const [showLast, setShowLast] = useState(5);
   const [filter, setFilter] = useState('');

   const filteredNews = useMemo(() => {
      const filterFor = new RegExp(filter.toLowerCase().replace(/\s+/g, '.*').trim(), 'i');
      return news.filter(item =>
         filterFor.test(item.text) || filterFor.test(getDate(item))  || filterFor.test(getDate(item, false))
      );
   }, [filter])

   return <Collapsible className="news" title="News" extra={open => <>
      {!open && <span className="news-teaser">{getDate(news[0])}: {news[0].text}</span>}
      {/* preventDefault keeps clicks on the filter from toggling the details */}
      {open && <span className="news-filter-box" onClick={e => e.preventDefault()}>
         <input type="text" className="news-filter" placeholder="filter news" value={filter}
            onChange={e => setFilter(e.target.value)}
         />{filter.length > 0 &&
            <button className='clear-news' aria-label='clear the news filter' onClick={() => setFilter('')}><Icon icon={faTimes} /></button>}
      </span>}
   </>}>
      <ul>
         {filteredNews.slice(0, showLast).map((item, index) => (
            <li key={index} style={{
               opacity: showLast <= 5 && filteredNews.length > 5 ? 
                  1 - (index / 5) : 1
            }}>
               <span className="date">{getDate(item)}:</span> <span className="news-content">{item.link ? <a href={item.link} {...item.link.startsWith('#') ? {} : { target: '_blank', rel: 'noreferrer' }} className="link">{item.text}</a> : <span className="link" style={{ color: 'var(--text)' }}>{item.text}</span>}</span>
            </li>
         ))}
         <li className="show-more">
            {filteredNews.length > showLast ?
            <><button onClick={() => setShowLast(showLast + 5)}>
               show more
            </button>
            &emsp;</> : <></>}
            {(showLast > 5 || filteredNews.length <= showLast) && filteredNews.length >= 5 ?
            <><button onClick={() => setShowLast(showLast - 5)}>
               show less
            </button>
            &emsp;
            <button onClick={() => setShowLast(5)}>
               reset
            </button>
            &emsp;</> : <></>}
            <span className="news-asof">as of {getLastUpdated()}</span>
         </li>
      </ul>
   </Collapsible>;
}

function getDate(item: NewsItem, short = true) {
   return item.when.toLocaleDateString('en-US', {
      year: 'numeric',
      month: short ? 'short' : 'long',
      day: 'numeric'
   });
}
