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

      <h2 id="publications">Publications</h2>
         <StaticQuickLinks sections={{
            papers: { page: 'papers'},
            talks: { page: 'talks'},
            posters: { page: 'posters'},
            other: { page: 'other-publications'}
         }}></StaticQuickLinks>
         
        <h3 id="papers">Papers</h3>
        <Bibliography biblatexContent={BibDataMain} type='Papers' />
              
        <h3 id="talks">Talks</h3>
        <Bibliography biblatexContent={BibDataTalks} type='Talks'/>

        <h3 id="posters">Posters</h3>
        <Bibliography biblatexContent={BibDataPoster} type='Posters'/>
      
        <h3 id="other-publications">Other</h3>
        <Bibliography biblatexContent={BibDataOther} type='Other Publications'/>

      <h2 id="schools-seminars">Summer Schools and Seminars</h2>
      <MySeminars />

      <h2 id="service">Service</h2>
      <MyService />

      <h2 id="teaching">Teaching</h2>
      <MyTeaching />
    </Content>
    <SiteNotice />
    <LastUpdated />
  </>
  );
}

export default MainPage;
