// add new ones at the top
export const BibDataMain = `
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
booktitle = {Proceedings of the 39th IEEE/ACM International Conference on Automated Software Engineering (Tool Demonstrations)},
pages = {2390–2393},
numpages = {4},
keywords = {program slicing, static analysis, R programming language},
location = {Sacramento, CA, USA},
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
booktitle = {Proceedings of the 39th IEEE/ACM International Conference on Automated Software Engineering (Doctoral Symposium)},
pages = {2490–2493},
numpages = {4},
keywords = {program comprehension, hybrid analysis, R, doctoral thesis},
location = {Sacramento, CA, USA},
series = {ASE '24}
}
  
@inproceedings{10576984,
   author={Neumüller, Denis and Sihler, Florian and Straub, Raphael and Tichy, Matthias},
   booktitle={2024 4th International Conference on Code Quality (ICCQ)}, 
   title={Exploring the Effectiveness of Abstract Syntax Tree Patterns for Algorithm Recognition}, 
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
@misc{sihler2025deRSE,
   title={Assisting Data Analysis using Program Slicing with flowR},
   author={Sihler, Florian},
   year={2025},
   publisher={deRSE '25},
   url={https://events.hifis.net/event/1741/contributions/13407/},
   type={<i>Accepted</i>}
}
   
@misc{sihler2024deRSE,
   title={flowR: A Program Slicer for the R Programming Language},
   author={Sihler, Florian},
   year={2024},
   publisher={deRSE '24},
   url={https://events.hifis.net/event/994/contributions/7978/},
   note={<a href="https://www.youtube.com/watch?v=PyuHqRYy3e0" class="bib-link">YouTube</a>},
   type={<b>YoungRSE Award</b>}
 }

 @misc{sihler2023irser,
   title={Statically Analyzing the Dataflow of R Programs With flowR},
   author={Sihler, Florian},
   year={2024},
   publisher={IRSER '24},
   url={https://fg-rse.gi.de/veranstaltung/international-research-software-engineering-research-community-meetup}
 }
`;

export const BibDataPoster = `
@misc{ase-2024-flowr-poster,
  author = {Sihler, Florian and Tichy, Matthias},
  title = {Static Dataflow Analysis of R Programs},
  year = {2024},
  publisher = {ASE '24},
  url = {https://conf.researchr.org/details/ase-2024/ase-2024-posters/7/Static-Dataflow-Analysis-of-R-Programs}
}

 @misc{sihler2023se,
   title={One-way Model Transformations in the Context of Technology Roadmapping },
   author={Sihler, Florian},
   year={2023},
   publisher={SE '23},
   url={https://se-2023.gi.de/fileadmin/GI/user_upload/poster_sihler.pdf}
 }
`;