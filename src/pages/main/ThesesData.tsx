import { escapeId } from "../../util/id";
import { monthToString } from "./HonorsData";

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
   'rh': <a className='link' href='https://www.uni-ulm.de/in/sp/team/prof-dr-robert-heinrich/'>Prof. Dr. Robert Heinrich</a>
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
theses.push({
   author: 'Oliver Gerstl',
   type: 'master-thesis',
   year: 2025,
   month: 8,
   title: 'Tracking the Shape of Data Frames in R Programs Using Abstract Interpretation',
   abstract: <>
In this thesis, we propose a theoretical concept and a proof-of-concept implementation to infer the shape of data frames in R programs using abstract interpretation.
<p/>
R is a programming language widely used in data science and statistical programming that is mostly used by people without a background in computer science. However, there is a lack of sufficient static code analysis tools for R. One of the most important data structures in R is the data
frame which is used to store, transform, and visualize data in R scripts.
<p/>
Therefore, we provide the theoretical concept and a proof-of-concept implementation to track the shape of data frames in R programs using abstract interpretation. We identify data frame operations and transformations that are relevant to track shape information about data frames, define a formal concept to abstract the concrete semantics of the data frame operations, discuss the implementation of the abstract interpretation of data frame shapes, and evaluate our implementation on a large set of real-world R scripts.
<p/>
We first identify relevant data frame operations by analyzing the most commonly used data frame functions in R scripts and R packages. Then, we define the abstract domain to track the shape of data frames in R programs. We abstract the concrete data frame functions to abstract data frame operations to describe the abstract semantics of these abstract operations with respect to shape constraints for the data frames. Based on the theoretical concept, we develop an <a href="https://github.com/flowr-analysis/flowr/tree/7f17ef8772f5e40156c92fc98a7a0b1462532f7f/src/abstract-interpretation/data-frame" target="_blank">implementation</a> of the abstract interpretation of data frame shapes in flowR, an open-source static analyzer for the R programming language. Using the implementation, we provide a query to retrieve the shape of data frames and a linter rule to validate accessed columns and rows of data frames in R. Finally, we evaluate our implementation on a set of labelled real-world R scripts with a ground truth to analyze the correctness and accuracy of our implementation, and perform a large-scale evaluation on 33&nbsp;314 real-world R scripts to determine how many constraints can be inferred by our implementation and measure the runtime performance of the implementation.
<p/>
The supported features of our concept and implementation are limited, as there are many different data frame functions in R with many edge cases. Moreover, there is no formal definition of the operational semantics of R and most semantics are defined implicitly. As the scope of this thesis is limited, we focus on a subset of data frame operations identified based on the most common data frame functions in R scripts and R packages. Our implementation was correct for all points of interest of the evaluated labelled R scripts. We inferred data frame shapes for 73.4&nbsp;% of the evaluated points of interest that represent data frames. Of the total number of 33&nbsp;314&nbsp;real-world R scripts, our implementation inferred data frames shapes for 66.9&nbsp;% of all scripts. In total, we inferred data frame shape constraints for 406&nbsp;890 data frame expressions with partial shape information for 34.1&nbsp;% and full shape information for 2.6&nbsp;% of the data frame expressions. Our implementation required, on average, 4.16&nbsp;s with high outliers and a median of 209&nbsp;ms. The average runtime of the total analysis, including the parsing, data flow graph construction, and control flow graph generation, was 4.9&nbsp;s with a median of 598&nbsp;ms. We consider the median total runtime of 598&nbsp;ms to be fast enough for most use cases.</>,
   examiners: ['mtt', 'rh'],
})
theses.push({
   author: 'Julian Schubert',
   type: 'bachelor-thesis',
   year: 2025,
   month: 8,
   title: 'Designing a Query Language for Linting R Scripts to Improve Reproducibility',
   abstract: <>In this bachelor’s thesis, we develop a query language which allows
analyzing semantic information extracted from R scripts. We create an
extendable linting framework with the help of our query language and
implement and evaluate the performance of four reproducibility-focused
linting rules.
<p/>
The R programming language is frequently used in data science research,
where R scripts are included as part of reproducibility packages to replicate
researchers’ findings. In many cases, such scripts fail to complete without
errors or do not replicate the findings described in their accompanying
research. In addition, there is a lack of tools that support developers in the
creation of reproducible R scripts.
<p/>
We describe and implement a query language which can be used to implement reproducibility-focused linting rules as part of flowR. Specifically, we
select common reproducibility issues, which we remedy through a set of
linting rules created with the help of the query language. We then evaluate
the linter based on multiple criteria on a set of real-world R scripts.
<p/>
We propose and implement a set of query language operations in the form
of query generators and subsequent transformers. Further, we implement
a linting framework that uses the query language to detect and output
issues in R scripts. Using the linting framework, we implement four linting
rules for reproducibility issues inspired by related tools and frequently
found in the literature. Then, we evaluate the correctness and performance
of the query language and our linting rules through 341&nbsp;unit tests as well
as a combination of automatic performance measurements and manual
spot-checks on an extensive dataset of real-world R&nbsp;scripts.
<p/>
This work focuses on the implementation and validity testing of the query
language, linting framework and our rules, and does not account for
whether the rules are considered helpful to users. Additionally, our linter’s
usability is limited to commandline interaction and does not yet expose
editor functionality.
<p/>
We find that our query language is practical for the creation of complex
linting rules based on a combination of simple query operations. Executing
our linting framework on a dataset of 35&nbsp;373 real-world R scripts, we find
that our linting rules return frequent matches in practice, with only 13&nbsp;%
of files containing no match. Our evaluation additionally shows that our
linter requires a median time of 695&nbsp;ms, with the average time of 7&nbsp;259&nbsp;ms
being heavily affected by outliers in the form of very large scripts in our
dataset.</>,
   examiners: ['mtt'],
})
theses.push({
   author: 'Simon Martin',
   type: 'bachelor-thesis',
   year: 2025,
   month: 8,
   title: 'Improving Linting for Semantic Errors in the Data Science Domain With the Help of Large Language Models',
   abstract: <>In this bachelor’s thesis, we explore the use of Large Language Models&nbsp;(LLMs) to search for semantic errors in a given R&nbsp;file. We aim to investigate the effectiveness of LLMs in linting for semantic errors and examine their advantages and disadvantages. 
<p/>
In today’s digitalized world, programming is becoming increasingly essential, especially for non-domain experts. Researchers in different kinds of study areas need to analyse their data reliably. Therefore, they create their own programs. The development process of these programs can be supported by various tools, such as linters, to identify errors in the created programs. Yet, creating such linters is challenging and requires a lot of work, especially for problems that require a semantic understanding of a specific domain. We aim to investigate whether LLMs can narrow this gap by finding these errors without requiring complex linter rules.
<p/>
Our goal is to construct a model that can identify what we call high level error types, like a wrong statistical test method error, which are too complex for typical static analysis tools. We want to achieve this by prompting a LLM to find them. The advantage of this method is that we can simply explain the error in natural language and tell the LLM to search for it. Therefore, we do not need to create a complex linter rule, which requires a lot of work, such as analyzing the structure of data frames.
<p/>
To analyze the capabilities of this method, we first conduct a prestudy to determine the optimal setup for prompting an LLM to identify errors in an R file. In addition to the high level error types, the model should identify what we call low level error types, which can be detected by typical static analysers. As ground truth for these errors, we use lintr. To analyse the model, we let it search for three low level and two high level error types in a total of about 12&nbsp;500&nbsp;randomly selected R&nbsp;files from a dataset of more than 33&nbsp;000&nbsp;files. The found low level errors are then automatically compared to found instances by the R&nbsp;linter lintr, whereas the high level ones are compared to placed errors in modified files. Moreover, a subset
of the found errors is checked manually. 
<p/>
In the described analysis, we only test the models ’s capabilities for the five selected error types and only for the programming language R. We do not know whether the setup works similarly for other error types and programming languages.
<p/>
We observe that the capabilities of our created model, which utilizes zero-shot learning, and a code snippet of 50&nbsp;lines as the context size, are limited. We compare its performance, when using Llama3.1:70b and ChatGPT 4o-mini as LLM; however we do not see too big differences. For the evaluation, we use a ground truth of automatically placed errors with a modified version of mutation testing, and found errors by lintr. The comparison reveals, that our model does not even find every 10th&nbsp;error, which we consider to be insufficient. Its precision is better; however, compared to other static analysers the results are again not satisfactory. However, not all error types perform this poorly. We observe a trend where low level error types perform worse than the high level ones, and conclude that our created model is not a possible replacement for lintr. For high level error types that perform well, however, it can be a useful tool, especially since no other tool is known to us that can identify them. Therefore, a hybrid approach to find all error types could be a successful solution.
</>,
   examiners: ['mtt'],
})

export function getTheses(type: 'master' | 'bachelor'): JSX.Element[] {
   return theses
   .filter(t => t.type === (type + '-thesis'))
   .toSorted(
      ({year, month}, {year: yearB, month: monthB}) => yearB - year || monthB - month
   )
   .map(({ title, author, examiners, abstract, link, year, month}) => {
      const id = escapeId(title);
      return <li key={id}>
         <strong id={'link-' + id}>{title} <span className='theses-author-meta'>({author !== 'anonymous' ? author + ', ' : ''}{monthToString[month - 1]}&nbsp;{year})</span></strong><br />
         <span>Examiners: {joinLastWith(examiners.map(e => ExaminerMap[e]))}</span>
         <details style={{ margin: '0.5em 0 1em 0' }}>
            <summary><i>Abstract</i></summary>
            <p>{abstract}</p>
         </details>
         
         {link && <a href={link} target="_blank" rel="noreferrer">Link to Thesis</a>}
      </li>;
   });
}

