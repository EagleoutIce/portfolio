# Data files

Everything on the page that is content rather than layout lives here as JSON, so
updating the site usually means editing one of these files — no TSX involved.
The `.bib` files under `src/resources/bibliographies/` hold the publications,
talks, and posters; everything else is listed below.

`bibliography.json` is the one file here that is **generated** — `npm run bib`
(also run automatically before `npm start` and `npm run build`) renders the
`.bib` sources with citation-js into it, so the browser never has to load or
run citation-js. Edit the `.bib` files, not this one.

| file | drives |
| --- | --- |
| `profile.json` | name, subtitle, header links, and the intro text |
| `news.json` | the news list on the main page |
| `projects.json` | the project cards (main, penguins, typography) |
| `flowr-ecosystem.json` | the "flowR Ecosystem" reveal |
| `theses.json` | supervised theses |
| `theses-abstracts.json` | their abstracts, keyed by thesis title |
| `teaching.json` | courses, one entry per course with all its terms |
| `slides.json`, `documents.json` | the slide and document galleries |
| `service.json` | reviewing, artifact evaluation, and chair roles |
| `seminars.json` | summer schools and seminars |
| `events.json` | outreach events and their occurrences |
| `honors.json` | honors, awards, grants, and scholarships |

Order inside a file never matters: every list is sorted by date (or by name)
when it is rendered.

## Text conventions

Longer texts (`profile.json`'s `intro`, thesis abstracts, thesis notes) accept a
small markup subset, rendered by `src/util/text.tsx`:

| markup | result |
| --- | --- |
| `[label](https://…)` | link |
| `**text**` | bold |
| `*text*` | italic |
| `` `text` `` | code |
| a blank line | new paragraph |

Use a real non-breaking space (U+00A0) where a line break would read badly —
between a number and its unit (`576 ms`, `19.53 %`), inside `M. Di Agostino`,
and before a conference year (`RSECon '25`). In `.tsx` files write `&nbsp;`
instead; in plain JavaScript strings, `\u00a0`.

## File details

**`profile.json`** — `links[]` uses icon keys (`github`, `university`,
`linkedin`, `scholar`, `mail`) mapped in `Header.tsx`.

**`news.json`** — `{"date": "YYYY-MM-DD", "text": "…"}` plus either `link` (any
URL) or `thesis` (the exact title of a thesis in `theses.json`, which links to
its entry on this page).

**`projects.json`** — three groups (`main`, `penguins`, `typography`). `icon`,
`image`, and `anim` are keys resolved in `Projects.tsx`; add a new
image there first, then reference it by key. `tags` become the breadcrumbs.

**`theses.json`** — `examiners` are keys of `ExaminerMap` in `Theses.tsx`.
Set `supervisors` instead when the thesis lists a supervisor (external theses),
and `advisors` for advisor names (markup allowed). `phd` is either
`{"institute": "sp" | "vs" | "isf"}` or a full `{"name", "href", "at"}`, with an
optional `field` and an `href` override for a personal page. `extra` shows below
the title (award, exchange), `note` above the abstract.

**`theses-abstracts.json`** — one entry per thesis, keyed by the exact `title`
from `theses.json`. Kept separate because an abstract is only shown once its
entry is expanded, so the file is fetched on demand instead of riding along in
the initial bundle.

**`teaching.json`** — one entry per course; every term it ran goes into `terms`
as `{"year", "term": "WT" | "ST"}`. A term may add `topic` + `desc` + `href`
(shown as an info icon in the list and as the entry title in the timeline),
`github` (a repository icon), or `suffix` (free text). `role` picks the label,
`category` overrides the timeline bucket, `material` adds links to the detail
page.

**`service.json`** — `type` is one of `reviewing`, `artifact-eval`, `junior-pc`,
`local-chair`, `web-chair`. `order` sorts upcoming entries of the same year,
`role` overrides the role label, `detail` adds a line to the opened card.

**`events.json`** — `occ` lists the occurrences (`year`, optional `month`,
`note`, `href`). `waddle: true` credits the Waddle group; `credit` replaces that
credit line.

**`honors.json`** — `type` is `honor`, `award`, `grant`, `fellowship`, or
`scholarship`; `amount` is in Euro and drives the featured-grant ordering.
