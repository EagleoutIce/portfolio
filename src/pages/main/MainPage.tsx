import { Content } from '../../components/Content';
import { SiteNotice } from '../../components/SiteNotice';
import { MyHeader } from './MyHeader';
import { MyCurrentProjects, MyCurrentTypographyProjects, MyPenguinCurrentProjects } from './MyCurrentProjects';
import { Bibliography } from '../../components/Bibliography';
import { BibDataMain, BibDataPoster, BibDataTalks } from './BibliographyData';
import { MyIntro } from './MyIntro';
import { MyTeaching } from './MyTeaching';
import { MySeminars } from './MySeminars';

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
      <Bibliography biblatexContent={BibDataMain} />
      
      <h2 id="talks">Talks</h2>
      <Bibliography biblatexContent={BibDataTalks} />
      <h2 id="talks">Posters</h2>
      <Bibliography biblatexContent={BibDataPoster} />
      
      <h2 id="schools-seminars">Summer Schools and Seminars</h2>
      <MySeminars />

      <h2 id="talks">Teaching</h2>
      <MyTeaching />
    </Content>
    <SiteNotice />
  </>
  );
}

export default MainPage;
