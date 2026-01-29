import { Content } from '../../components/Content';
import { SiteNotice } from '../../components/SiteNotice';
import { MyHeader } from './MyHeader';
import { MyCurrentProjects, MyCurrentTypographyProjects, MyPenguinCurrentProjects } from './MyCurrentProjects';
import { Bibliography } from '../../components/Bibliography';
import { BibDataMain, BibDataPoster, BibDataTalks, BibDataOther } from './BibliographyData';
import { MyIntro } from './MyIntro';
import { MyTeaching } from './MyTeaching';
import { MySeminars } from './MySeminars';
import { MyService } from './MyService';
import { StaticQuickLinks } from '../../components/QuickLinks';
import { LastUpdated } from '../../components/LastUpdated';
import { News } from '../../components/News';
import { MyHonors } from './MyHonors';
import { BibliographySummary } from '../../components/BibliographySummary';
import { MyEvents } from './EventsData';

function MainPage() {
  return (<>
    <MyHeader />
    <Content>
      <MyIntro />
      
      <News />
      
      <h2 id="my-projects">My Projects</h2>
      <MyCurrentProjects />

      <h3 id="penguins">Penguins</h3>
      <MyPenguinCurrentProjects />

      <h3 id="typography">TeX, Typst, and Typography</h3>
      <MyCurrentTypographyProjects />

      <h2 id="publications">Publications and Travel</h2>
         <StaticQuickLinks sections={{
            papers: { page: 'papers'},
            talks: { page: 'talks'},
            posters: { page: 'posters'},
            other: { page: 'other-publications'},
            events: { page: 'events'},
            seminars: { page: 'schools-seminars'}
         }}></StaticQuickLinks>
         
         <BibliographySummary biblatexContent={{
          paper:  BibDataMain, 
          talk:   BibDataTalks,
          poster: BibDataPoster,
          other:  BibDataOther
        }} />
         
        <h3 id="papers">Papers</h3>
        <Bibliography biblatexContent={BibDataMain} type='Papers' 
          filters = {{
            ['first author']: (entry: Record<string, unknown>) => {
                if('author' in entry && Array.isArray(entry['author']) && entry['author'].length > 0) {
                    return entry['author'][0].given === 'Florian' && entry['author'][0].family === 'Sihler';
                }
                return false;
            },
            ['main paper']: (entry: Record<string, unknown>) => {
              const smallVenues = ['SEAA', 'SE', 'deRSE', 'RSE', 'RCore', 'ICCQ', 'IRSER', 'CSV', 'SPLASH-E', 'GenBench', 'HLF', 'JOT', 'JSS']
              return ('event-title' in entry && typeof entry['event-title'] === 'string' &&
                !smallVenues.some(venue => (entry['event-title'] as string).startsWith(venue))
              ) && !((entry['genre'] as string)?.includes('Doctoral Symposium'));
            }
          }}
        />
              
        <h3 id="talks">Talks</h3>
        
        <p>Talks refer to all presentations that do not have an accompanying full/short paper publication, e.g., invited talks or talks at workshops without proceedings.</p>

        <Bibliography biblatexContent={BibDataTalks} type='Talks'/>

        <h3 id="posters">Posters</h3>
        <Bibliography biblatexContent={BibDataPoster} type='Posters'/>
      
        <h3 id="other-publications">Other</h3>
        <Bibliography biblatexContent={BibDataOther} type='Other Publications'/>

        <h3 id="events">Events</h3>
        
        Alongside my work on waddle and flowR, I contributed to and participated in the following events:
        
        <MyEvents/>

        <h3 id="schools-seminars">Summer Schools and Seminars</h3>
        <MySeminars />

      <h2 id="service">Academic Service</h2>
      <MyService />

      <h2 id="honors-awards-and-grants">Honors, Awards, and Grants</h2>
      <MyHonors />

      <h2 id="teaching">Teaching</h2>
      <MyTeaching />
    </Content>
    <SiteNotice />
    <LastUpdated />
  </>
  );
}

export default MainPage;
