import { useMemo, useRef, useState } from "react";
import "./News.css"
import { LastUpdated, getLastUpdated } from "./LastUpdated";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface News {
   when: Date,
   text: string,
   link?: string
}

const news: News[] = []
news.push({
   when: new Date("2025-07-21"),
   text: 'Released flowR v2.3.0 (Data Frame Shape Inference)',
   link: 'https://github.com/flowr-analysis/flowr/releases/tag/v2.3.0'
})
news.push({
   when: new Date("2025-06-27"),
   text: 'Received a DAAD stipend for a research stay at CTU',
   link: 'https://prl-prg.github.io/'
})
news.push({
   when: new Date("2025-06-24"),
   text: 'Received the iwimint-grant for Waddle',
   link: 'https://www.uni-ulm.de/in/sp/institute/news-detail/article/waddle-receives-iwimint-funding/'
})
news.push({
   when: new Date("2025-06-24"),
   text: 'Poster and flash presentation accepted at the 12th HLF',
   link: 'https://www.uni-ulm.de/in/sp/institute/news-detail/article/florian-sihler-accepted-at-the-12th-heidelberg-laureate-forum/'
})
news.push({
   when: new Date("2025-06-24"),
   text: 'Paper accepted at the SEEA 2025',
   link: 'https://dsd-seaa.com/seaa2025/'
})
news.push({
   when: new Date("2025-06-13"),
   text: 'Presentation accepted at the 2025 RSECon',
   link: 'https://rsecon25.society-rse.org/'
})
news.push({
   when: new Date("2025-06-11"),
   text: 'Received the Abbe Grant by the Carl-Zeiss-Stiftung',
   link: 'https://www.uni-ulm.de/in/sp/institute/news-detail/article/florian-sihler-accepted-at-the-12th-heidelberg-laureate-forum/'
})
news.push({
   when: new Date("2025-06-09"),
   text: 'Presentation at the tidyteam meeting',
   link: 'https://github.com/tidyverse'
})
news.push({
   when: new Date("2025-06-05"),
   text: 'Presentation at the CSV 25 on Regression Analysis',
   link: 'https://unive-ssv.github.io/events/2025/06/05/csv.html'
})
news.push({
   when: new Date("2025-06-02"),
   text: 'Released flowR v2.2.15 (Value-Vector-Support)',
   link: 'https://github.com/flowr-analysis/flowr/releases/tag/v2.2.15'
})
news.push({
   when: new Date("2025-05-31"),
   text: 'Released flowR v2.2.14 (Linting)',
   link: 'https://github.com/flowr-analysis/flowr/releases/tag/v2.2.14'
})
news.push({
   when: new Date("2025-05-27"),
   text: 'Released flowR v2.2.13 (CFG, Graphics, Aliasing)',
   link: 'https://github.com/flowr-analysis/flowr/releases/tag/v2.2.13'
})
news.push({
   when: new Date("2025-05-26"),
   text: 'Presentation at the GRK 2624 Seminar',
   link: 'https://grk2624.statistik.tu-dortmund.de/seminar/'
})
news.push({
   when: new Date("2025-05-23"),
   text: 'Booth for Waddle at the Uni-Ulm LaDeWi 2025',
   link: 'https://www.uni-ulm.de/in/fakultaet/in-detailseiten/news-detail/article/langer-abend-der-wissenschaft-2025/'
})
news.push({
   when: new Date("2025-05-01"),
   text: 'Book on Algorithmic Game Theory published',
   link: 'https://www.lehmanns.de/shop/mathematik-informatik/76728693-9783965435797-algorithmische-spieltheorie'
})
news.push({
   when: new Date("2025-05-15"),
   text: 'Presentation at the 42nd HiRSE (YoungRSE Award)',
   link: 'https://www.helmholtz-hirse.de/series/2025_05_15-seminar_42.html'
})
news.push({
   when: new Date("2025-05-02"),
   text: 'Reviewing for RSECon 2025',
   link: 'https://rsecon25.society-rse.org/'
})
news.push({
   when: new Date("2025-04-23"),
   text: 'Accepted presentation at the CSV 2025',
   link: 'https://unive-ssv.github.io/csv.html'
})
news.push({
   when: new Date("2025-04-14"),
   text: 'Master\'s thesis by R. Dunkel on Feature Slicing',
})
news.push({
   when: new Date("2025-04-11"),
   text: 'Accepted at the 12th Heidelberg Laureate Forum',
   link: 'https://www.uni-ulm.de/in/sp/institute/news-detail/article/florian-sihler-accepted-at-the-12th-heidelberg-laureate-forum/'
})
news.push({
   when: new Date("2025-04-09"),
   text: 'Workshop on LaTeX at the ConVeY Retreat 2025',
   link: 'https://convey.ifi.lmu.de/workshops/2025/spring/program.html'
})
news.push({
   when: new Date("2025-04-03"),
   text: 'Workshop for Waddle at the Girl\'s and Boy\'s day 2025',
   link: 'https://www.girls-day.de'
})
news.push({
   when: new Date("2025-04-1"),
   text: 'Bachelor\'s thesis by F. Schlegel on Pointer Analysis',
})
news.push({
   when: new Date("2025-03-17"),
   text: 'Released flowR v2.2.12 (Vectors, Graphics, String Eval)',
   link: 'https://github.com/flowr-analysis/flowr/releases/tag/v2.2.12'
})
news.push({
   when: new Date("2025-03-02"),
   text: 'Released flowR v2.2.11 (Compression, Projects)',
   link: 'https://github.com/flowr-analysis/flowr/releases/tag/v2.2.11'
})
news.push({
   when: new Date("2025-02-27"),
   text: 'Extended abstract accepted at SE 2025',
   link: 'https://doi.org/10.18420/se2025-27'
})
news.push({
   when: new Date("2025-02-26"),
   text: 'Presentation at the deRSE 2025',
   link: 'https://events.hifis.net/event/1741/contributions/13407/'
})
news.push({
   when: new Date("2025-02-23"),
   text: 'Released flowR v2.2.10 (Linking Definitions and setNames)',
   link: 'https://github.com/flowr-analysis/flowr/releases/tag/v2.2.10'
})
news.push({
   when: new Date("2025-01-21"),
   text: 'Presentation at the DLR'
})
news.push({
   when: new Date("2025-01-02"),
   text: 'Master\'s thesis by L. Pietzschmann on Slicing Coverage',
})
news.push({
   when: new Date("2023-08-13"),
   text: 'Master\'s thesis by me on flowR',
   link: 'http://dx.doi.org/10.18725/OPARU-50107'
})
news.push({
   when: new Date("2021-11-30"),
   text: 'Bachelor\'s thesis by me on One-Way Transformations',
   link: 'http://dx.doi.org/10.18725/OPARU-47275'
})


news.sort((a, b) => b.when.getTime() - a.when.getTime());

export function News() {
   const [showLast, setShowLast] = useState(5);
   const [filter, setFilter] = useState('');
   
   const filteredNews = useMemo(() => {
      const filterFor = new RegExp(filter.toLowerCase().replace(/\s+/g, '.*').trim(), 'i');
      return news.filter(item => 
         filterFor.test(item.text) || filterFor.test(getDate(item))  || filterFor.test(getDate(item, false))
      );
   }, [filter])
   
   return <div className="news">
      <h4 style={{textAlign: "left" }}>News <span style={{fontSize: 'small', fontWeight: 'normal'}}>as of {getLastUpdated()}&emsp;<input type="text" className="news-filter" placeholder="filter news" value={filter}
         onChange={(e) => {
            setFilter(e.target.value);
         }}
      />{filter.length > 0 ? <button className='clear-news' onClick={() => {
            setFilter('');
      }}><FontAwesomeIcon icon={faTimes} /></button> : <></> }</span></h4>
      <ul>
         {filteredNews.slice(0, showLast).map((item, index) => (
            <li key={index} style={{
               opacity: showLast <= 5 && filteredNews.length > 5 ? 
                  1 - (index / 5) : 1
            }}>
               <span className="date">{getDate(item)}:</span> <span className="news-content">{item.link ? <a href={item.link} target="_blank" rel="noreferrer" className="link">{item.text}</a> : <span className="link" style={{ color: 'var(--text)' }}>{item.text}</span>}</span>
            </li>
         ))}
         {
            filteredNews.length > showLast ? 
            <li className="show-more">
               <button onClick={() => setShowLast(filteredNews.length)}>
                  show all
               </button>
               &emsp;
               <button onClick={() => setShowLast(showLast + 5)}>
                  show more
               </button>
               &emsp;
               {showLast > 5 ? 
               <><button onClick={() => setShowLast(showLast - 5)}>
                  show less
               </button>
               &emsp;
               <button onClick={() => setShowLast(5)}>
                  reset
               </button>
               </> : <></>}
            </li> : filteredNews.length >= 5 ? 
            <li className="show-more">
               <button onClick={() => setShowLast(showLast - 5)}>
                  show less
               </button>
               &emsp;
               <button onClick={() => setShowLast(5)}>
                  reset
               </button>
            </li> : <></>
         }
      </ul>
   </div>;
}

function getDate(item: News, short = true) {
   return item.when.toLocaleDateString('en-US', {
      year: 'numeric',
      month: short ? 'short' : 'long',
      day: 'numeric'
   });
}
