import { useMemo } from 'react';
import { type ReactNode } from 'react';
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import { Tooltip } from 'react-tooltip';
import '../../components/BibliographySummary.css';
import { BibDataMain, BibDataPoster, BibDataTalks, BibDataOther } from './BibliographyData';
import { getServiceRoleInfo } from './ServiceData';
import { getGrantCount, formatEuro } from './HonorsData';
import { getThesisCounts } from './ThesesData';
import { getTeachingDutySplitInfo } from './TeachingsData';

const ttStyle    = { padding: '2px 6px', margin: '-6px 0px' } as const;
const ttInner    = { maxWidth: '320px', wordBreak: 'break-word' } as const;
const linkStyle  = { color: 'inherit', textDecoration: 'none' } as const;
const yearSuffix = / '\d{2,4}$/;

const CSL_LABEL: Record<string, string> = {
  'paper-conference': 'Paper',
  'speech':           'Talk',
  'graphic':          'Poster',
  'book':             'Book',
  'article-journal':  'Article',
};

function parseBib(content: string, label?: string) {
  const data    = new Cite(content).data as Record<string, unknown>[];
  const byConf  = new Map<string, number>();
  const byType  = new Map<string, number>();
  for (const entry of data) {
    const ev  = entry['event'] ?? entry['event-title'] ?? '';
    const raw = typeof ev === 'string' ? ev.trim() : '';
    if (raw) {
      const conf = raw.replace(yearSuffix, '').trim() || raw;
      byConf.set(conf, (byConf.get(conf) ?? 0) + 1);
    } else {
      byConf.set('Other', (byConf.get('Other') ?? 0) + 1);
    }
    const t = typeof entry['type'] === 'string' ? entry['type'] : '';
    if (t) byType.set(t, (byType.get(t) ?? 0) + 1);
  }
  const detail = Array.from(byConf.entries())
    .sort(([a], [b]) => a === 'Other' ? 1 : b === 'Other' ? -1 : a.localeCompare(b))
    .map(([c, n]) => n > 1 ? `${c} (${n}×)` : c)
    .join(', ');
  if (!label) {
    const topType = Array.from(byType.entries()).sort(([, a], [, b]) => b - a)[0]?.[0] ?? '';
    const base    = CSL_LABEL[topType] ?? 'Other';
    label = data.length === 1 ? base : `${base}s`;
  }
  return { total: data.length, detail, label };
}

function Badge({ id, href, count, label, tooltipContent }: {
  id: string; href: string; count: number; label: string; tooltipContent: ReactNode;
}) {
  return <a id={id} href={href} className="conf-entry" style={linkStyle}>
    <span className="conf-count">{count}×</span>{label}
    <Tooltip anchorSelect={`#${id}`} render={() => <>{tooltipContent}</>}
      place="top" style={ttStyle} positionStrategy="fixed" />
  </a>;
}

export function PageSummary() {
  const pubEntries = useMemo(() => [
    { ...parseBib(BibDataMain,   'Publications'), key: 'papers',  href: '#papers'             },
    { ...parseBib(BibDataTalks,  'Talks'),        key: 'talks',   href: '#talks'              },
    { ...parseBib(BibDataPoster, 'Posters'),      key: 'posters', href: '#posters'            },
    { ...parseBib(BibDataOther),                  key: 'other',   href: '#other-publications' },
  ], []);

  const serviceRoles                               = getServiceRoleInfo();
  const { count: grantCount, grants: grantList }   = getGrantCount();
  const { ba, ma }                                 = getThesisCounts();
  const teachingDuties                             = getTeachingDutySplitInfo();

  return <div className="bib-summary-children" style={{ marginTop: '1em', marginBottom: '-.5em', textAlign: 'center' }}>
    {pubEntries.filter(e => e.total > 0).map(({ key, href, label, total, detail }) =>
      <Badge key={key} id={`page-sum-${key}`} href={href} count={total} label={label} tooltipContent={detail} />
    )}

    <div className="conf-year-banner"> / </div>

    {serviceRoles.map(({ abbr, full, count, confs }) =>
      <Badge key={abbr}
        id={`page-sum-svc-${abbr.toLowerCase().replace(/[^a-z]+/g, '-')}`}
        href="#service" count={count} label={abbr}
        tooltipContent={`${full}: ${confs.join(', ')}`} />
    )}

    {(ba.count > 0 || ma.count > 0 || teachingDuties.lecturer.count > 0 || teachingDuties.teachingAssistant.count > 0) && <>
      <br />
      {teachingDuties.lecturer.count > 0 && <Badge id="page-sum-teaching-lecturer" href="#teaching" count={teachingDuties.lecturer.count} label="Lecturer"
        tooltipContent={<div style={ttInner}>
          Lecturer duties, including guest lectures: {teachingDuties.lecturer.duties.join(', ')}
        </div>} />}
      {teachingDuties.teachingAssistant.count > 0 && <Badge id="page-sum-teaching-ta" href="#teaching" count={teachingDuties.teachingAssistant.count} label="Teaching Assistant"
        tooltipContent={<div style={ttInner}>
          Teaching assistant duties: {teachingDuties.teachingAssistant.duties.join(', ')}
        </div>} />}
      {(teachingDuties.lecturer.count > 0 || teachingDuties.teachingAssistant.count > 0) && (ba.count > 0 || ma.count > 0) && <div className="conf-year-banner"> / </div>}
      {ba.count > 0 && <Badge id="page-sum-ba" href="#bachelor-theses" count={ba.count} label="BA"
        tooltipContent={<div style={ttInner}>
          Supervised Bachelor's Theses: {[...ba.students].sort((a, b) => a.localeCompare(b)).join(', ')}
        </div>} />}
      {ma.count > 0 && <Badge id="page-sum-ma" href="#master-theses" count={ma.count} label="MA"
        tooltipContent={<div style={ttInner}>
          Supervised Master's Theses: {[...ma.students].sort((a, b) => a.localeCompare(b)).join(', ')}
        </div>} />}
    </>}
    
    {grantCount > 0 && <>
      <div className="conf-year-banner"> / </div>
      <Badge id="page-sum-grants" href="#honors-awards-and-grants" count={grantCount} label="Grants"
        tooltipContent={<div style={ttInner}>
          {grantList.slice(0, 3).map(({ title, amount }, i) => {
            const short = title.length > 45 ? `${title.slice(0, 42)}…` : title;
            return <div key={i}>{short}{amount !== undefined && ` (${formatEuro(amount)})`}</div>;
          })}
          {grantList.length > 3 && <div>…</div>}
        </div>} />
    </>}
  </div>;
}
