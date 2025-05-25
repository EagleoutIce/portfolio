import { Tooltip } from "react-tooltip";
import { escapeId } from "../../util/id";

function joinLastWith(arr: JSX.Element[], separator = ',', lastSeparator = ' and ') {
   if (arr.length === 0) return '';
   if (arr.length === 1) return arr[0];
   if (arr.length === 2) return <>{arr[0]}{lastSeparator}{arr[1]}</>;
   return <>
      {arr.slice(0, -1).reduce((prev, curr) => <>{prev}, {curr}</>)}
      {lastSeparator}{arr[arr.length - 1]}
   </>;
}

const TypeToStringMap = {
   'bachelor-thesis': 'Bachelor\'s Thesis',
   'master-thesis': 'Master\'s Thesis'
} as const;

const ExaminerMap ={
   'mtt': <a className='link' href='https://www.uni-ulm.de/in/sp/team/tichy/'>Prof. Dr. Matthias Tichy</a>,
   'sw': <a className='link' href='https://www.stefan-winter.net/'>Prof. Dr. Stefan Winter</a>,
   'tt': <a className='link' href='https://www.tu-braunschweig.de/isf/team/thuem'>Prof. Dr. Thomas Thüm</a>,
}

interface Thesis {
   title: string;
   author: string | 'anonymous';
   examiners: (keyof typeof ExaminerMap)[];
   abstract: JSX.Element;
   type: keyof typeof TypeToStringMap;
   link?: string;
   year: number;
   month: number;
}

const theses: Thesis[] = [];

theses.push({
   title: 'Improving Code Coverage Metrics using Static Program Slicing for R',
   type: 'master-thesis',
   year: 2025,
   month: 1,
   abstract: <>
This thesis covers the development and evaluation of a novel way to determine coverage scores for the R programming language. We calculate a static backward program slice for all assertion criteria of a given test suite and use this information together with coverage information to determine the coverage of the tested code.
<p />
Testing software is a crucial part of the development process. However, determining when the software is sufficiently tested is an impossible task. Code coverage metrics aim to be a decision-making aid in this regard. But research shows, that they can be deceptive and in fact do not necessarily reflect the quality of a testsuite.
<p />
We propose slicing coverage as a novel approach that aims to enhance the accuracy of coverage scores by calculating them based on the program slice resulting from the test’s assertion criteria. We also provide a proof-of-concept implementation for the R programming language. Alongside the theoretical concept and a practical implementation, we evaluate our approach on a set of real-world R packages to demonstrate its potential benefits.
<p />
To calculate slicing coverage, we combine regular coverage information with the result of a static backward program slice for all assertions. This way, we can exclude code that was executed but had no influence on the test’s outcome, or in other words: code that was not checked by a assertion. To evaluate slicing coverage, we use two distinct experiments that i) record both slicing coverage and regular coverage scores, as well as execution time and memory usage, and ii) calculate the accuracy of slicing coverage by deliberately inserting faults into a program and measuring how many the test suite is able to detect.
<p />
Despite its potential benefits, slicing coverage’s results are inherently limited by the quality of the program slicer and coverage tool used. We also carry over some limitations of traditional coverage metrics like the inherent performance overhead. Besides those conceptual limitations, we also face practical challenges like our implementation being unable to handle implicit assumptions that are not directly encoded in the source or test code.
<p />
We find that, for the median package, the traditional and slicing coverage scores differ by 19.53&nbsp;%, with the slicing coverage score being lower. The median slicing coverage score over all packages lies at 44.09&nbsp;%.
With regards to memory usage, we deem our slicing coverage implementation to not be a burden on the user’s system, as, for the median package, our implementation only required 384.36&nbsp;MB of memory. The maximum required memory peaked at 2.11&nbsp;GB. With regards to the execution time, we come to a different conclusion. The median is, again, reasonable with 85.46&nbsp;s. However, the average and maximum of 35.01&nbsp;min and 11.74&nbsp;h respectively show that there are outliers that require a significant amount of time.
With regards to slicing coverage’s accuracy, we find that mutants introduced in covered code are detected more often than mutants inside the program slice (p&nbsp;=&nbsp;0.0212). This indicates that slicing coverage’s accuracy is lower than traditional coverage.
</>,
   author: 'Lukas Pietzschmann',
   examiners: ['mtt', 'sw'],
})
theses.push({
   author: 'Ruben Dunkel',
   type: 'master-thesis',
   year: 2025,
   month: 4,
   title: 'Cut to the Core – Automated Feature Extraction in R Using Program Slicing',
   abstract: <>
In this master thesis we describe the development and evaluating of a tool that tries to re-engineer R research scripts into a Software Product Line.
<p/>
R research scripts are rarely reproducible and a different user might have a hard time comprehending a badly structured script. This creates the need for tools to support them in understanding which plot was created through which chain of actions. Going even further, some aspects of the given R research script might be reusable for a new task, but finding them is not simple, so the tool should be able to analyze the script once and then create a representation where those aspects can be marked and selected.
<p/>
We propose GardenR a tool to transform a R research script by detecting Points of Interest, locating them in the source code, create dependencies for interactions with other features and annotate them in the source code through feature flags. Alongside GardenR, we collect a set of Points of Interest for the data science domain of the R programming language and use them to evaluate our tool. 
<p/>
First, we conceptualize the algorithms needed for the identification, localization and visualization of Points of Interest in research scripts. Then we implement those concepts, focusing on architectural decisions and specifics regarding the R programming language in particular as well as the collection of Points of Interest through labeling the exposed functions of R packages. Next, we benchmark the tool using real-world code examples.
<p/>
The capabilities of our tool are currently limited due to a not fully functioning process, with the annotation of the source code creating errors during the execution. Furthermore, there exists a memory leak in the tool, which is mitigated by restarting the tool upon triggering a death flag.
<p/>
We identify 12&nbsp;004&nbsp;functions that can be mapped to the data science process. Furthermore, our benchmarking of GardenR was able to analyze 958&nbsp;out of 1&nbsp;000&nbsp;real-world R research scripts, detecting a median of 91&nbsp;features per instance and a median increase by factor 1.29&nbsp;in lines of code. Without the tool creating executable scripts, we were unable to confirm the correctness of our approach against a outputs of the source, but used tests, sanity checks and manual labeling that were compared to the results of the execution to mitigate this.
</>,
   examiners: ['mtt', 'tt'],
})
theses.push({
   title: 'Field-Sensitive Pointer Analysis for Static Dataflow in the R Programming Language',
   author: 'Felix Schlegel',
   year: 2025,
   month: 4,
   abstract: <>In this bachelor thesis, we describe an algorithm for field-sensitive pointer analysis using the R programming language as an example.
<p/>
While there have been numerous implementations of pointer analyses for languages such as C, C++, or JavaScript, R lacks such comprehensive support. The frequent use of composite data structures and subsetting operators in R suggests a high degree of applicability for field-sensitivity.
<p/>
The described algorithm handles storing, managing, and reading pointer information. This information is used to manipulate the data flow graph in order to achieve field-sensitivity.
<p/>
We first elaborate a concept that we then apply to the flowR data flow framework. Afterward, we evaluate the artifact by running a sophisticated pipeline that uses two variants of flowR, one with pointer analysis enabled and one without.
<p/>
Our implementation’s capabilities are limited by the language subset that we support. In this thesis the support includes the constant definitions of atomic vectors and lists, and subsetting with constant arguments. The approach was designed to increase support for R, and we cannot apply the described algorithm to languages that treat pointers inherently differently.
<p/>
Our results show that our algorithm provides a solid proof of concept, while our implementation yields a slightly greater slicing reduction for the number of normalized tokens of 82.42&nbsp;&nbsp;15.59&nbsp;%, a tolerable runtime increase of 13.81&nbsp;ms in the median, and a doubling in data flow graph size on average.</>,
   type: 'bachelor-thesis',
   examiners: ['mtt']
})

export function getTheses() {
   return theses.toSorted(
      ({year, month}, {year: yearB, month: monthB}) => yearB - year || monthB - month
   )
   .map(({ title, author, examiners, abstract, type, link, year, month}) => {
      const id = escapeId(title);
      return <><li key={id}>
         <strong id={'link-' + id}>{TypeToStringMap[type]} ({author !== 'anonymous' ? author + ', ' : ''}{year}):<br/>{title}</strong><br />
         <span>Examiners: {joinLastWith(examiners.map(e => ExaminerMap[e]))}</span>
         <details style={{ margin: '0.5em 0 1em 0' }}>
            <summary><i>Abstract</i></summary>
            <p>{abstract}</p>
         </details>
         
         {link && <a href={link} target="_blank" rel="noreferrer">Link to Thesis</a>}
            <Tooltip anchorSelect={`#link-${id}`} content="Open Thesis Link" place="bottom" style={{ padding: '2px 6px', margin: '-6px 0px' }}/>
      </li>
      </>;
   });
}

