import { useState } from "react";
import "./News.css"
import { LastUpdated, getLastUpdated } from "./LastUpdated";

interface News {
   when: Date,
   text: string,
   link?: string
}

const news: News[] = []

news.push({
   when: new Date("2025-05-26"),
   text: 'Presentation at the GRK 2624 Seminar',
   link: 'https://grk2624.statistik.tu-dortmund.de/seminar/'
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
   text: 'Reviewing for RSECon25',
   link: 'https://rsecon25.society-rse.org/'
})
news.push({
   when: new Date("2025-04-23"),
   text: 'Accepted at the CSV 2025',
   link: 'https://unive-ssv.github.io/csv.html'
})
news.push({
   when: new Date("2025-04-14"),
   text: 'Master\'s thesis by R. Dunkel on Feature Slicing',
})
news.push({
   when: new Date("2025-04-11"),
   text: 'Accepted at the 12th Heidelberg Laureate Forum',
   link: 'https://www.heidelberg-laureate-forum.org/forum/12th-hlf-2025/'
})
news.push({
   when: new Date("2025-04-09"),
   text: 'Workshop on LateX at the ConVeY Retreat',
   link: 'https://convey.ifi.lmu.de/workshops/2025/spring/program.html'
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



news.sort((a, b) => b.when.getTime() - a.when.getTime());

export function News() {
   const [showLast, setShowLast] = useState(5);
   
   return <div className="news">
      <h4>News <span style={{fontSize: 'small', fontWeight: 'normal'}}>as of {getLastUpdated()}</span></h4>
      <ul>
         {news.slice(0, showLast).map((item, index) => (
            <li key={index} style={{
               opacity: showLast <= 5 && news.length > 5 ? 
                  1 - (index / 5) : 1
            }}>
               <span className="date">{item.when.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
               })}:</span> <span className="news-content">{item.link ? <a href={item.link} target="_blank" rel="noreferrer" className="link">{item.text}</a> : <span className="link" style={{ color: 'black' }}>{item.text}</span>}</span>
            </li>
         ))}
         {
            news.length > showLast ? 
            <li className="show-more">
               <button onClick={() => setShowLast(showLast + 5)}>
                  Show more
               </button>
            </li> : 
            <li className="show-more">
               <button onClick={() => setShowLast(5)}>
                  Show less
               </button>
            </li>
         }
      </ul>
   </div>;
}