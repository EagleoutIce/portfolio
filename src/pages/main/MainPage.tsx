import { useState } from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
import { onMobileDevice } from '../../util/mobile';

function Divider() {
  const [hovered, setHovered] = useState(false);
  const isMobile = onMobileDevice();

  return <div
    onMouseEnter={isMobile ? undefined : () => setHovered(true)}
    onMouseLeave={isMobile ? undefined : () => setHovered(false)}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.9rem',
      color: 'var(--main-color)',
      userSelect: 'none',
      pointerEvents: 'none',
      marginTop: '2.2rem',
      marginBottom: '0.5rem',
      transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
      transition: isMobile ? 'none' : 'transform 180ms ease'
    }}>
    <span style={{
      flex: '1 1 120px',
      height: '1px',
      background: 'linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--main-color) 55%, transparent) 22%, var(--main-color) 100%)',
      boxShadow: '0 0 8px color-mix(in srgb, var(--main-color) 35%, transparent)',
      transform: hovered ? 'scaleX(1.03)' : 'scaleX(1)',
      transformOrigin: 'center',
      transition: isMobile ? 'none' : 'transform 180ms ease, opacity 180ms ease'
    }} />
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '2.25rem',
      height: '2.25rem',
      borderRadius: '999px',
      border: '1px solid color-mix(in srgb, var(--main-color) 55%, transparent)',
      background: 'linear-gradient(180deg, color-mix(in srgb, var(--main-color) 12%, transparent), transparent)',
      boxShadow: '0 0 0 4px color-mix(in srgb, var(--main-color) 8%, transparent), 0 8px 18px rgba(0, 0, 0, 0.10)',
      filter: 'drop-shadow(0px 1px 1px color-mix(in srgb, var(--main-color) 35%, transparent))',
      transform: hovered ? 'translateY(-2px) scale(1.04)' : 'translateY(0) scale(1)',
      transition: isMobile ? 'none' : 'transform 180ms ease, box-shadow 180ms ease, filter 180ms ease'
    }}>
      <FontAwesomeIcon icon={faDiamond} style={{
        fontSize: '0.8rem',
        opacity: hovered ? 1 : 0.92,
        transition: isMobile ? 'none' : 'opacity 180ms ease'
      }} />
    </span>
    <span style={{
      flex: '1 1 120px',
      height: '1px',
      background: 'linear-gradient(90deg, var(--main-color) 0%, color-mix(in srgb, var(--main-color) 55%, transparent) 78%, transparent 100%)',
      boxShadow: '0 0 8px color-mix(in srgb, var(--main-color) 35%, transparent)',
      transform: hovered ? 'scaleX(1.03)' : 'scaleX(1)',
      transformOrigin: 'center',
      transition: isMobile ? 'none' : 'transform 180ms ease, opacity 180ms ease'
    }} />
    </div>
}

function MainPage() {
  return (<>
    <MyHeader />
    <Content>
      <MyIntro />
      <Divider />
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
        
        Alongside my work on waddle and flowR, I contributed to and organized the following events:
        
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
