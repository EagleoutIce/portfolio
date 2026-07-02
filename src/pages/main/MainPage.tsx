import { lazy, Suspense, useMemo, useState } from 'react';
import { Content } from '../../components/Content';
import { SiteNotice } from '../../components/SiteNotice';
import { MyHeader } from './MyHeader';
import { MyCurrentProjects, MyCurrentTypographyProjects, MyPenguinCurrentProjects } from './MyCurrentProjects';
import type { BibliographyProps } from '../../components/Bibliography';
import { BibDataMain, BibDataPoster, BibDataTalks, BibDataOther } from './BibliographyData';
import { MyIntro } from './MyIntro';
import { MyTeaching } from './MyTeaching';
import { MySeminars } from './MySeminars';
import { MyService } from './MyService';
import { PageSummary } from './PageSummary';
import { StaticQuickLinks } from '../../components/QuickLinks';
import { LastUpdated } from '../../components/LastUpdated';
import { News } from '../../components/News';
import { MyHonors } from './MyHonors';
import { BibliographySummary } from '../../components/BibliographySummary';
import { MyEvents } from './EventsData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
import { SectionHeading } from '../../components/SectionHeading';
import './Divider.css';

/* citation-js with the csl plugin dominates the bundle, load it on demand */
const LazyBibliography = lazy(() => import('../../components/Bibliography').then(m => ({ default: m.Bibliography })));

function Bibliography(props: BibliographyProps) {
  return <Suspense fallback={<p>Loading publications...</p>}>
    <LazyBibliography {...props} />
  </Suspense>;
}

interface CollapsibleBibliographyProps extends BibliographyProps {
  readonly id: string;
  readonly heading: string;
  readonly intro?: JSX.Element;
  readonly defaultOpen?: boolean;
}

/* only renders (and formats) the entries while expanded */
function CollapsibleBibliography({ id, heading, intro, defaultOpen = false, ...bib }: CollapsibleBibliographyProps) {
  const [open, setOpen] = useState(defaultOpen);
  const count = useMemo(() => (bib.biblatexContent.match(/^\s*@/gm) ?? []).length, [bib.biblatexContent]);
  return <details className="collapse-section" open={open} onToggle={e => setOpen((e.target as HTMLDetailsElement).open)}>
    <summary>
      <SectionHeading id={id} as="h3">{heading}</SectionHeading>
      <span className="collapse-count">{count} {count === 1 ? 'entry' : 'entries'}</span>
      <span className="collapse-chevron" />
    </summary>
    {intro}
    {open && <Bibliography {...bib} />}
  </details>;
}

function Divider() {
  return <div className="divider">
    <span className="divider-line left" />
    <span className="divider-icon"><FontAwesomeIcon icon={faDiamond} /></span>
    <span className="divider-line right" />
  </div>;
}

function MainPage() {
  return (<>
    <MyHeader />
    <Content>
      <MyIntro />
      <PageSummary />
      <Divider />
      <News />
      
      <SectionHeading id="my-projects">My Projects</SectionHeading>
      <MyCurrentProjects />

      <SectionHeading id="penguins" as="h3">Penguins</SectionHeading>
      <MyPenguinCurrentProjects />

      <SectionHeading id="typography" as="h3">TeX, Typst, and Typography</SectionHeading>
      <MyCurrentTypographyProjects />

      <SectionHeading id="publications">Publications and Travel</SectionHeading>
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
         
        <CollapsibleBibliography id="papers" heading="Papers" defaultOpen pageSize={5} biblatexContent={BibDataMain} type='Papers'
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
              
        <CollapsibleBibliography id="talks" heading="Talks" biblatexContent={BibDataTalks} type='Talks'
          intro={<p>Talks refer to all presentations that do not have an accompanying full/short paper publication, e.g., invited talks or talks at workshops without proceedings.</p>} />

        <CollapsibleBibliography id="posters" heading="Posters" biblatexContent={BibDataPoster} type='Posters' />

        <CollapsibleBibliography id="other-publications" heading="Other" biblatexContent={BibDataOther} type='Other Publications' />

        <SectionHeading id="events" as="h3">Events</SectionHeading>
        
        Alongside my work on waddle and flowR, I contributed to and organized the following events:
        
        <MyEvents/>

        <SectionHeading id="schools-seminars" as="h3">Summer Schools and Seminars</SectionHeading>
        <MySeminars />

      <SectionHeading id="service">Academic Service</SectionHeading>
      <MyService />

      <SectionHeading id="honors-awards-and-grants">Honors, Awards, and Grants</SectionHeading>
      <MyHonors />

      <SectionHeading id="teaching">Teaching</SectionHeading>
      <MyTeaching />
    </Content>
    <SiteNotice />
    <LastUpdated />
  </>
  );
}

export default MainPage;
