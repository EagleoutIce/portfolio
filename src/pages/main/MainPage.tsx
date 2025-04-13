import { Content } from '../../components/Content';
import { SiteNotice } from '../../components/SiteNotice';
import { MyHeader } from './MyHeader';
import { MyCurrentProjects, MyCurrentTypographyProjects, MyPenguinCurrentProjects } from './MyCurrentProjects';
import { Bibliography } from '../../components/Bibliography';
import { BibDataMain, BibDataPoster, BibDataTalks } from './BibliographyData';
import { MyIntro } from './MyIntro';
import { MyTeaching } from './MyTeaching';
import { MySeminars } from './MySeminars';
import { MyService } from './MyService';
import QuickLinks, { StaticQuickLinks } from '../../components/QuickLinks';

function MainPage() {
  return (<>
    <MyHeader />
    <Content>
      <MyIntro />
      
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
            posters: { page: 'posters'}
         }}></StaticQuickLinks>
         
        <h3 id="papers">Papers</h3>
        <Bibliography biblatexContent={BibDataMain} />
              
        <h3 id="talks">Talks</h3>
        <Bibliography biblatexContent={BibDataTalks} />

        <h3 id="posters">Posters</h3>
        <Bibliography biblatexContent={BibDataPoster} />
      
      <h2 id="schools-seminars">Summer Schools and Seminars</h2>
      <MySeminars />

      <h2 id="service">Service</h2>
      <MyService />

      <h2 id="teaching">Teaching</h2>
      <MyTeaching />
    </Content>
    <SiteNotice />
  </>
  );
}

export default MainPage;
