// add new ones at the top
export const BibDataMain = `
@inproceedings{sihler2025statically,
  author = {Sihler, Florian and Tichy, Matthias},
  title = {Statically Analyzing the Dataflow of R Programs},
  year = {2025},
  booktitle = {OOPSLA '25},
  publisher={ACM New York, NY, USA},
  journal={Proceedings of the ACM on Programming Languages},
  volume={9},
  number={OOPSLA2},
  pages={1034--1062},
  address = {New York, NY, USA},
  url = {https://doi.org/10.1145/3763087},
  doi = {10.1145/3763087},
  shorttitle = {OOPSLA '25},
  series = {OOPSLA '25},
}
  
@inproceedings{DBLP:conf/euromicro/StraubSTWGKT25,
  author       = {Raphael Straub and
                  Florian Sihler and
                  Ali Torbati and
                  Cong Wang and
                  Raffaela Groner and
                  Verena Klös and
                  Matthias Tichy},
  editor       = {Davide Taibi and
                  Darja Smite},
  title        = {Explainability in Self-Adaptive Systems: {A} Systematic Literature
                  Review},
  shorttitle   = {SEAA '25},
  booktitle    = {Software Engineering and Advanced Applications - 51st Euromicro Conference,
                  {SEAA} 2025, Salerno, Italy, September 10-12, 2025, Proceedings, Part
                  {II}},
  shorttitle   = {SEAA '25},
  series       = {Lecture Notes in Computer Science},
  volume       = {16082},
  pages        = {280--297},
  publisher    = {Springer},
  year         = {2025},
  url          = {https://doi.org/10.1007/978-3-032-04200-2\_19},
  doi          = {10.1007/978-3-032-04200-2\_19},
  timestamp    = {Thu, 25 Sep 2025 17:54:31 +0200},
  biburl       = {https://dblp.org/rec/conf/euromicro/StraubSTWGKT25.bib},
  bibsource    = {dblp computer science bibliography, https://dblp.org}
}

@inproceedings{DBLP:conf/se/SihlerP0TDD25,
  author       = {Florian Sihler and
                  Lukas Pietzschmann and
                  Raphael Straub and
                  Matthias Tichy and
                  Andor Diera and
                  Abdelhalim Hafedh Dahou},
  editor       = {Anne Koziolek and
                  Anna{-}Lena Lamprecht and
                  Thomas Thüm and
                  Erik Burger},
  title        = {On the Anatomy of Real-World {R} Code for Static Analysis (Extended Abstract)},
  booktitle    = {Software Engineering 2025, Fachtagung des GI-Fachbereichs Softwaretechnik,
                  Karlsruhe, Germany, February 24-28, 2025},
  shorttitle   = {SE '25},
  series       = {{LNI}},
  volume       = {{P-360}},
  pages        = {27},
  publisher    = {Gesellschaft für Informatik e.V.},
  issn         = {2944-7682},
  eissn        = {2944-7682},
  year         = {2025},
  url          = {https://doi.org/10.18420/se2025-27},
  doi          = {10.18420/SE2025-27},
  timestamp    = {Fri, 21 Feb 2025 16:22:30 +0100},
  biburl       = {https://dblp.org/rec/conf/se/SihlerP0TDD25.bib},
  bibsource    = {dblp computer science bibliography, https://dblp.org}
}
   
@inproceedings{10.1145/3691620.3695359,
author = {Sihler, Florian and Tichy, Matthias},
title = {flowR: A Static Program Slicer for R},
year = {2024},
isbn = {9798400712487},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3691620.3695359},
doi = {10.1145/3691620.3695359},
abstract = {Context Many researchers rely on the R programming language to perform their statistical analyses and visualizations in the form of R scripts. However, recent research and experience show, that many of these scripts contain problems. From being hard to comprehend by combining several analyses and plots into a single source file to being non-reproducible, with a lack of analysis tools supporting the writing of correct and maintainable code. Objective In this work, we address the problem of comprehending and maintaining R scripts by proposing flowR, a program slicer and static dataflow analyzer for the R programming language, which can be integrated directly into Visual Studio Code. Given a set of variables of interest, like the generation of a single figure in a script, flowR automatically reduces the program to the parts relevant for the output of interest, like the value of a variable. Method First, we use static program analysis to construct a detailed dataflow graph of the R script. The analysis supports loops, function calls, side effects, sourcing external files, and even redefinitions of R's primitive constructs. Subsequently, we calculate the program slice by solving a reachability problem on the graph, collecting all required parts and presenting them to the user. Results Providing several interactive ways of slicing the program, we require an average of 16 ms to calculate the slice on a given dataflow graph, reducing the code by around 94\% of tokens.The demonstration video is available at https://youtu.be/Zgq6rnbvvhk. For the full source code and extensive documentation, refer to https://github.com/Code-Inspect/flowr. To try the docker image, use docker run -rm -it eagleoutice/flowr.},
booktitle = {Proceedings of the 39th IEEE/ACM International Conference on Automated Software Engineering},
pages = {2390–2393},
shorttitle = {ASE '24},
numpages = {4},
keywords = {program slicing, static analysis, R programming language},
location = {Sacramento, CA, USA},
type = {Tool Demonstrations},
series = {ASE '24}
}

@inproceedings{10.1145/3691620.3695603,
author = {Sihler, Florian},
title = {Improving the Comprehension of R Programs by Hybrid Dataflow Analysis},
year = {2024},
isbn = {9798400712487},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3691620.3695603},
doi = {10.1145/3691620.3695603},
abstract = {Context Comprehending code is crucial in all areas of software development, with many existing supporting tools and techniques for various languages. However, for R, a widely used programming language, especially in the field of statistical computing, the support is limited. R offers a large number of packages as well as dynamic features, which make it challenging to analyze and understand. Objective We aim to (i) gain a better understanding of how R is used in the real world, (ii) devise better analysis strategies for R, which are able to handle its dynamic nature, and (iii) improve the comprehension of R scripts by using these analyses, providing new methods and procedures applicable to program comprehension in general. Method In eight contributions, we analyze feature usage in R scripts, develop a new static dataflow analysis intertwining control and dataflow, and more. We enable and propose new techniques for program comprehension using a combination of static and dynamic analysis.},
booktitle = {Proceedings of the 39th IEEE/ACM International Conference on Automated Software Engineering},
shorttitle = {ASE '24},
pages = {2490–2493},
numpages = {4},
keywords = {program comprehension, hybrid analysis, R, doctoral thesis},
location = {Sacramento, CA, USA},
type={Doctoral Symposium},
series = {ASE '24}
}
  
@inproceedings{10576984,
   author={Neumüller, Denis and Sihler, Florian and Straub, Raphael and Tichy, Matthias},
   booktitle={2024 4th International Conference on Code Quality (ICCQ)}, 
   title={Exploring the Effectiveness of Abstract Syntax Tree Patterns for Algorithm Recognition}, 
   shorttitle={ICCQ '24},
   year={2024},
   volume={},
   number={},
   pages={1-18},
   keywords={Software maintenance;Codes;Scalability;Software algorithms;Prototypes;Syntactics;Usability;algorithm recognition;program comprehension;pattern matching;abstract syntax tree;domain-specific language;reverse engineering;maintenance},
   doi={10.1109/ICCQ60895.2024.10576984}
}


@inproceedings{DBLP:conf/msr/SihlerPSTDD24,
  author       = {Florian Sihler and
                  Lukas Pietzschmann and
                  Raphael Straub and
                  Matthias Tichy and
                  Andor Diera and
                  Abdelhalim Dahou},
  title        = {On the Anatomy of Real-World {R} Code for Static Analysis},
  booktitle    = {21st {IEEE/ACM} International Conference on Mining Software Repositories,
                  {MSR} 2024, Lisbon, Portugal, April 15-16, 2024},
  shorttitle   = {MSR '24},
  pages        = {619--630},
  publisher    = {{ACM}},
  year         = {2024},
  url          = {https://doi.org/10.1145/3643991.3644911},
  doi          = {10.1145/3643991.3644911},
  timestamp    = {Wed, 03 Jul 2024 16:57:34 +0200},
  biburl       = {https://dblp.org/rec/conf/msr/SihlerPSTDD24.bib},
  bibsource    = {dblp computer science bibliography, https://dblp.org}
}

@inproceedings{diera-etal-2023-gencodesearchnet,
   title = "{G}en{C}ode{S}earch{N}et: A Benchmark Test Suite for Evaluating Generalization in Programming Language Understanding",
   author = "Diera, Andor  and
     Dahou, Abdelhalim  and
     Galke, Lukas  and
     Karl, Fabian  and
     Sihler, Florian  and
     Scherp, Ansgar",
   booktitle = "Proceedings of the 1st GenBench Workshop on (Benchmarking) Generalisation in NLP",
   shorttitle = "{G}en{B}ench '23",
   month = dec,
   year = "2023",
   address = "Singapore",
   publisher = "Association for Computational Linguistics",
   url = "https://acGenBenchlanthology.org/2023.genbench-1.2",
   doi = "10.18653/v1/2023.genbench-1.2",
   pages = "12--24",
   type = {<b>Best Paper Award</b>}
}

@misc{sihler2023constructing,
   title={Constructing a static program slicer for R programs},
   author={Sihler, Florian},
   year={2023},
   publisher={Ulm University},
   type={Master's Thesis, <b>Award for Best Master's Degree</b>},
   doi={10.18725/OPARU-50107}
 }
 

@article{DBLP:journals/jot/SihlerTP23,
  author       = {Florian Sihler and
                  Matthias Tichy and
                  Jakob Pietron},
  title        = {One-Way Model Transformations in the Context of the Technology-Roadmapping
                  Tool {IRIS}},
  journal      = {J. Object Technol.},
  shorttitle   = {JOT '23},
  volume       = {22},
  number       = {2},
  pages        = {1--14},
  year         = {2023},
  url          = {https://doi.org/10.5381/jot.2023.22.2.a2},
  doi          = {10.5381/JOT.2023.22.2.A2},
  timestamp    = {Sat, 30 Sep 2023 10:20:03 +0200},
  biburl       = {https://dblp.org/rec/journals/jot/SihlerTP23.bib},
  bibsource    = {dblp computer science bibliography, https://dblp.org}
}

@misc{sihler2023one,
   title={One-way Model Transformation: On structural and semantical one-way transformations for constraint-based models, exemplified in the context of roadmapping},
   author={Sihler, Florian},
   year={2023},
   publisher={Ulm University},
   type={Bachelor's Thesis},
   doi={10.18725/OPARU-47275}
 }
 
@article{DBLP:journals/jss/BreckelPJST22,
  author       = {Alexander Breckel and
                  Jakob Pietron and
                  Katharina Juhnke and
                  Florian Sihler and
                  Matthias Tichy},
  title        = {A domain-specific language for modeling and analyzing solution spaces
                  for technology roadmapping},
  journal      = {J. Syst. Softw.},
  shorttitle   = {JSS '22},
  volume       = {184},
  pages        = {111094},
  year         = {2022},
  url          = {https://doi.org/10.1016/j.jss.2021.111094},
  doi          = {10.1016/J.JSS.2021.111094},
  timestamp    = {Sat, 08 Jan 2022 02:23:26 +0100},
  biburl       = {https://dblp.org/rec/journals/jss/BreckelPJST22.bib},
  bibsource    = {dblp computer science bibliography, https://dblp.org}
}
`;

export const BibDataTalks = `
@misc{sihler2025splashe,
   title={Waddle: A Serious Game to Teach Writing, Reading, and Debugging Programs},
   author={Sihler, Florian and Panda, Naomi and Berlinger, Simon and Tichy, Matthias},
   year={2025},
   month={October},
   publisher={SPLASH-E 2025},
   shorttitle={SPLASH-E '25},
   note={Singapore, Singapore (non-archival paper)},
}
  
@misc{sihler2025rcore,
   title={Improving Static Analysis Support for R},
   author={Sihler, Florian and Tichy, Matthias},
   year={2025},
   month={September},
   publisher={R Core Team Meeting 2025},
   shorttitle={RCore '25},
   note={Vienna, Austria}
}

@misc{sihler2025hlf,
   title={Program Analysis to Improve Program Comprehension and Reuse},
   author={Sihler, Florian},
   year={2025},
   month={September},
   publisher={12th Heidelberg Laureate Forum (2025)},
   shorttitle={HLF '25},
   note={Heidelberg, Germany&emsp;<a target="_blank" href="https://www.youtube.com/watch?v=9C05VuVf6ik&t=1585s" class="bib-link">YouTube</a>},
   url={https://www.youtube.com/watch?v=9C05VuVf6ik&t=1585s},
}

@misc{sihler2025rse,
   title={flowR: Program Slicing and Dependency Analysis to Improve the Reuse of R Scripts},
   author={Sihler, Florian and Scheck, Johanna, and Tichy, Matthias},
   year={2025},
   month={September},
   publisher={Research Software Engineering Conference 2025},
   shorttitle={RSE '25},
   note={Coventry, England},
   url={https://virtual.oxfordabstracts.com/event/75166/submission/31},
   type={<b>Rising Star Award</b>}
}
  
@misc{sihler2025tidy,
  title={flowR: static program analysis and program slicing for R},
  author={Sihler, Florian},
  year={2025},
  month={June},
  publisher={Tidyteam Meeting},
  note={Online&nbsp;(Invited Talk)},
  url={https://github.com/tidyverse}
}

@misc{sihler2025csv,
  title={Abstract Interpretation to Support Reproducibility of R},
  author={Sihler, Florian},
  year={2025},
  month={June},
  publisher={Challenges of Software Verification Symposium 2025},
  shorttitle={CSV '25},
  note={Venice, Italy},
  url={https://unive-ssv.github.io/events/2025/06/05/csv.html}
}

@misc{sihler2025grk,
  title={Using flowR to improve the work with R code},
  author={Sihler, Florian},
  year={2025},
  month={May},
  publisher={GRK 2624},
  note={Dortmund, Germany&nbsp;(Invited Talk)},
  url={https://grk2624.statistik.tu-dortmund.de/seminar/}
}

@misc{sihler2025hirse,
   title={(Award Presentation) flowR: A Program Slicer for the R Programming Language},
   author={Sihler, Florian},
   year={2025},
   month={May},
   publisher={42nd HiRSE},
   shorttitle={HiRSE '25},
   note={Online&nbsp;(Invited Talk)},
   url={https://www.helmholtz-hirse.de/series/2025_05_15-seminar_42.html}
}

@misc{sihler2025convey,
   title={LaTeX Workshop},
   author={Sihler, Florian},
   year={2025},
   month={April},
   publisher={ConVeY '25},
   note={Burghausen, Germany&nbsp;(Invited Talk)},
   url={https://convey.ifi.lmu.de/workshops/2025/spring/program.html}
}

@misc{sihler2025deRSE,
   title={Assisting Data Analysis using Program Slicing with flowR},
   author={Sihler, Florian},
   year={2025},
   month={February},
   publisher={German RSE Conference 2025},
   shorttitle={deRSE '25},
   note={Karlsruhe, Germany},
   url={https://events.hifis.net/event/1741/contributions/13407/}
}

@misc{sihler2025dlr,
  title={An Introduction to Static Code Analysis},
  author={Sihler, Florian},
  year={2025},
  month={January},
  note={Deutsches Zentrum für Luft- und Raumfahrt (DLR) Ulm, Germany&nbsp;(Invited Talk)}
}

@misc{sihler2024deRSE,
   title={flowR: A Program Slicer for the R Programming Language},
   author={Sihler, Florian},
   year={2024},
   month={March},
   publisher={German RSE Conference 2024},
   shorttitle={deRSE '24},
   url={https://events.hifis.net/event/994/contributions/7978/},
   note={Würzburg, Germany&emsp;<a target="_blank" href="https://www.youtube.com/watch?v=PyuHqRYy3e0" class="bib-link">YouTube</a>},
   type={<b>YoungRSE Award</b>}
 }

 @misc{sihler2024irser,
   title={Statically Analyzing the Dataflow of R Programs With flowR},
   author={Sihler, Florian},
   year={2024},
   month={January},
   publisher={International Research Software Engineering Research Community Meetup 2024},
   shorttitle={IRSER '24},
   url={https://fg-rse.gi.de/veranstaltung/international-research-software-engineering-research-community-meetup}
 }
`;

export const BibDataPoster = `
@misc{oopsla-2025-flowr-poster,
  author = {Sihler, Florian and Tichy, Matthias},
  title = {Statically Analyzing the Dataflow of R Programs},
  year = {2025},
  publisher = {OOPSLA '25},
  shorttitle = {OOPSLA '25},
  note={<a target="_blank" href="https://doi.org/10.5281/zenodo.17395146" class="bib-link">Poster (PDF)</a>},
  url = {https://2025.splashcon.org/details/OOPSLA/103/Statically-Analyzing-the-Dataflow-of-R-Programs}
}

@misc{hlf-2025-flowr-poster,
  author = {Sihler, Florian},
  title = {Program Analysis to Improve Comprehension and Reuse},
  year = {2025},
  publisher = {12<sup>th</sup> Heidelberg Laureate Forum},
  shorttitle = {HLF '25},
  note={<a target="_blank" href="https://doi.org/10.5281/zenodo.17147872" class="bib-link">Poster (PDF)</a>}
}

@misc{ase-2024-flowr-poster,
  author = {Sihler, Florian and Tichy, Matthias},
  title = {Static Dataflow Analysis of R Programs},
  year = {2024},
  publisher = {ASE '24},
  shorttitle = {ASE '24},
  note={<a target="_blank" href="https://doi.org/10.5281/zenodo.14575532" class="bib-link">Poster (PDF)</a>},
  url = {https://conf.researchr.org/details/ase-2024/ase-2024-posters/7/Static-Dataflow-Analysis-of-R-Programs}
}

 @misc{sihler2023se,
   title={One-way Model Transformations in the Context of Technology Roadmapping },
   author={Sihler, Florian},
   year={2023},
   publisher={SE '23},
  shorttitle={SE '23},
   note={<a target="_blank" href="https://se-2023.gi.de/fileadmin/GI/user_upload/poster_sihler.pdf" class="bib-link">Poster (PDF)</a>},
   url={https://se-2023.gi.de/programm/student-research-competition}
 }
`;


export const BibDataOther = `
@book{game-theory-book25,
  author = {Nickerl, Julian and Sihler, Florian and Torán, Jacobo},
  title = {Algorithmische Spieltheorie},
  note = {Lehrbuch},
  year = {2025},
  publisher = {Lehmanns Media},
  url = {https://www.lehmanns.de/shop/mathematik-informatik/76728693-9783965435797-algorithmische-spieltheorie},
  isbn = 9783965435797 
}
`;