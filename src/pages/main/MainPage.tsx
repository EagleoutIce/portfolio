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
            seminars: { page: 'schools-seminars'}
         }}></StaticQuickLinks>
         
        <h3 id="papers">Papers</h3>
        <Bibliography biblatexContent={BibDataMain} type='Papers' />
              
        <h3 id="talks">Talks</h3>
        
        <p>Talks refer to all presentations that do not have an accompanying full/short paper publication, e.g., invited talks or talks at workshops without proceedings.</p>

        <Bibliography biblatexContent={BibDataTalks} type='Talks'/>

        <h3 id="posters">Posters</h3>
        <Bibliography biblatexContent={BibDataPoster} type='Posters'/>
      
        <h3 id="other-publications">Other</h3>
        <Bibliography biblatexContent={BibDataOther} type='Other Publications'/>

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
