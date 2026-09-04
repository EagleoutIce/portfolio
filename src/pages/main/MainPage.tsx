import { PageFooter } from '../../components/PageFooter';
import { Icon } from '../../components/Icon';
import { Content } from '../../components/Content';
import { MyHeader } from './Header';
import { MyCurrentProjects, MyCurrentTypographyProjects, MyPenguinCurrentProjects } from './Projects';
import { Bibliography, type BibliographyProps } from '../../components/Bibliography';
import bibliography from '../../data/bibliography.json';
import { BibliographySummary } from '../../components/BibliographySummary';
import { PageSummary } from './PageSummary';
import { MyIntro } from './Intro';
import { MyTeaching } from './Teaching';
import { MySeminars } from './Seminars';
import { MyService } from './Service';
import { StaticQuickLinks } from '../../components/QuickLinks';
import { News } from '../../components/News';
import { MyHonors } from './Honors';
import { MyEvents } from './Events';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
import { SectionHeading } from '../../components/SectionHeading';
import { Collapsible } from '../../components/Collapsible';
import './Divider.css';

interface CollapsibleBibliographyProps extends BibliographyProps {
  readonly id: string;
  readonly heading: string;
  readonly intro?: JSX.Element;
  readonly defaultOpen?: boolean;
}

function CollapsibleBibliography({ id, heading, intro, defaultOpen, ...bib }: CollapsibleBibliographyProps) {
  const count = bibliography[bib.source].entries.length;
  return <Collapsible defaultOpen={defaultOpen} count={`${count} ${count === 1 ? 'entry' : 'entries'}`}
    title={<SectionHeading id={id} as="h3">{heading}</SectionHeading>}>
    {intro}
    <Bibliography {...bib} />
  </Collapsible>;
}

function Divider() {
  return <div className="divider">
    <span className="divider-line left" />
    <a className="divider-icon divider-link" href="#/timeline" title="Open the global timeline — everything with a date"
      aria-label="Open the global timeline">
      <Icon icon={faDiamond} />
    </a>
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

      <Collapsible count="4 projects"
        title={<SectionHeading id="typography" as="h3">TeX, Typst, and Typography</SectionHeading>}>
        <MyCurrentTypographyProjects />
      </Collapsible>

      <SectionHeading id="publications" href="#/all-publications" linkHint="detailed list">Publications and Travel</SectionHeading>
         <StaticQuickLinks sections={{
            papers: { page: 'papers'},
            talks: { page: 'talks'},
            posters: { page: 'posters'},
            other: { page: 'other-publications'},
            events: { page: 'events'},
            seminars: { page: 'schools-seminars'}
         }}></StaticQuickLinks>
         
         <BibliographySummary sources={{
            paper:  'paper',
            talk:   'talk',
            poster: 'poster',
            other:  'other'
         }} />
         
        <CollapsibleBibliography id="papers" heading="Papers" defaultOpen pageSize={5} source='paper' type='Papers'
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
              
        <CollapsibleBibliography id="talks" heading="Talks" source='talk' type='Talks'
          intro={<p>Talks refer to all presentations that do not have an accompanying full/short paper publication, e.g., invited talks or talks at workshops without proceedings.</p>} />

        <CollapsibleBibliography id="posters" heading="Posters" source='poster' type='Posters' />

        <CollapsibleBibliography id="other-publications" heading="Other" source='other' type='Other Publications' />

        <SectionHeading id="events" as="h3" href="#/all-events" linkHint="detailed list">Events</SectionHeading>

        Alongside my work on Waddle and flowR, I contributed to and organized the following events:
        
        <MyEvents/>

        <SectionHeading id="schools-seminars" as="h3">Summer Schools and Seminars</SectionHeading>
        <MySeminars />

      <SectionHeading id="service" href="#/all-service" linkHint="detailed list">Academic Service</SectionHeading>
      <MyService />

      <SectionHeading id="honors-awards-and-grants">Honors, Awards, and Grants</SectionHeading>
      <MyHonors />

      <SectionHeading id="teaching">Teaching</SectionHeading>
      <MyTeaching />
    </Content>
    <PageFooter />
  </>
  );
}

export default MainPage;
