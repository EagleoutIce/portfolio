import type { CatDef, CatItem } from '../../components/CategorizedList';

/* the timeline separates each activity into its own sub-kind, but colours them
   by *family* (a shared hue per group) so that, e.g., every publication venue
   reads as blue and every teaching role as green — making it obvious at a glance
   which entries belong together. hues are fixed (independent of the page accent)
   and legible on both the light and dark background. */
export const TL_CATEGORIES = {
   /* ── publications: blue family, one shade per venue kind ─────────────── */
   journal: { label: 'Journal', short: 'JOUR', color: '#2b6cb0' },
   conference: { label: 'Conf.', short: 'CONF', color: '#3d82c0' },
   workshop: { label: 'Workshop', short: 'WORK', color: '#5a9bd4' },
   demo: { label: 'Demo', short: 'DEMO', color: '#79b4e4' },
   doctoral: { label: 'Doctoral', short: 'DOCT', color: '#98c8ec' },
   book: { label: 'Book', short: 'BOOK', color: '#58749e' },
   other: { label: 'Other', short: 'MISC', color: '#a6bcd6' },
   /* ── talks & posters: shared teal family, two shades ─────────────────── */
   talk: { label: 'Talk', short: 'TALK', color: '#2f9ca0' },
   poster: { label: 'Poster', short: 'POST', color: '#57b8ad' },
   /* ── theses (own + supervised): purple family ────────────────────────── */
   'master-thesis': { label: 'MA', short: 'MA', color: '#8d4e86' },
   'bachelor-thesis': { label: 'BA', short: 'BA', color: '#b06fa6' },
   /* ── teaching: green family, one shade per role ──────────────────────── */
   lecturer: { label: 'Lecturer', short: 'LEC', color: '#2f8a5b' },
   project: { label: 'Project', short: 'PRJ', color: '#46a06d' },
   'guest-lecturer': { label: 'Guest', short: 'GL', color: '#62b485' },
   'teaching-assistant': { label: 'TA', short: 'TA', color: '#84c69c' },
   tutor: { label: 'Tutor', short: 'TUT', color: '#a6d6b8' },
   /* ── outreach events: indigo family, one shade per format ────────────── */
   multiday: { label: 'Camp', short: 'CAMP', color: '#6a63b4' },
   practicum: { label: 'Practicum', short: 'PRAC', color: '#8781c8' },
   singleday: { label: 'Single-day', short: 'DAY', color: '#a7a2dc' },
   /* ── academic service: orange family ─────────────────────────────────── */
   reviewer: { label: 'Reviewer', short: 'REV', color: '#c07a2c' },
   'artifact-eval': { label: 'AE', short: 'AE', color: '#d6923d' },
   chair: { label: 'Chair', short: 'CHR', color: '#e6ad5d' },
   /* ── honors & grants: gold family ────────────────────────────────────── */
   award: { label: 'Award', short: 'AWRD', color: '#c39a1f' },
   grant: { label: 'Grant', short: 'GRNT', color: '#d7b23f' },
   scholarship: { label: 'Scholarship', short: 'SCHL', color: '#e6cb6f' },
   fellowship: { label: 'Fellowship', short: 'FELL', color: '#efdc98' },
   honor: { label: 'Honor', short: 'HON', color: '#b6a44a' },
   /* ── schools & seminars: brown family ────────────────────────────────── */
   'summer-school': { label: 'Summer School', short: 'SUSC', color: '#97663f' },
   seminar: { label: 'Seminar', short: 'SEM', color: '#b1875f' },
} as const satisfies Record<string, CatDef>;

export type TLCategory = keyof typeof TL_CATEGORIES;

/* the legend is grouped by family so the many sub-kinds stay navigable and it
   is obvious which colours belong together */
export const TL_GROUPS: { label: string; cats: TLCategory[] }[] = [
   { label: 'Publications', cats: ['journal', 'conference', 'workshop', 'demo', 'doctoral', 'book', 'other'] },
   { label: 'Talks & Posters', cats: ['talk', 'poster'] },
   { label: 'Theses', cats: ['master-thesis', 'bachelor-thesis'] },
   { label: 'Teaching', cats: ['lecturer', 'project', 'guest-lecturer', 'teaching-assistant', 'tutor'] },
   { label: 'Outreach', cats: ['multiday', 'practicum', 'singleday'] },
   { label: 'Service', cats: ['reviewer', 'artifact-eval', 'chair'] },
   { label: 'Honors & Grants', cats: ['award', 'grant', 'scholarship', 'fellowship', 'honor'] },
   { label: 'Schools & Seminars', cats: ['summer-school', 'seminar'] },
];

/* family-contiguous flat order (fallback when no grouped legend is used) */
export const TL_ORDER: TLCategory[] = TL_GROUPS.flatMap(g => g.cats);

/* where each source list lives, so both directions of the cross-link agree on a
   single, globally-unique key (`<prefix>-<sourceKey>`). `section` sources have
   no dedicated detail page and are reached by scrolling to a main-page id. */
export interface SourceSpec {
   readonly prefix: string;
   /** detail-page route or (for `section`) the main-page element id */
   readonly page: string;
   readonly label: string;
   readonly section?: boolean;
}

export const TL_SOURCES = {
   publication: { prefix: 'pub', page: 'all-publications', label: 'Publications' },
   thesis: { prefix: 'thesis', page: 'all-theses', label: 'Theses' },
   event: { prefix: 'event', page: 'all-events', label: 'Events' },
   teaching: { prefix: 'teaching', page: 'all-lectures', label: 'Teaching' },
   service: { prefix: 'service', page: 'all-service', label: 'Service' },
   honor: { prefix: 'honor', page: 'honors-awards-and-grants', label: 'Honors', section: true },
   seminar: { prefix: 'seminar', page: 'schools-seminars', label: 'Seminars', section: true },
} as const satisfies Record<string, SourceSpec>;

export type SourceId = keyof typeof TL_SOURCES;

interface CatList {
   categories: Record<string, CatDef>;
   order: string[];
   items: CatItem[];
}

/** the timeline anchor a source entry maps to */
export function timelineHref(source: SourceId, key: string): string {
   return `#/timeline?e=${TL_SOURCES[source].prefix}-${key}`;
}

/** attach a small "timeline" cross-link to every entry of a detail list */
export function withTimelineCrosslinks(list: CatList, source: SourceId): CatList {
   return {
      ...list,
      items: list.items.map(it => ({
         ...it,
         crosslink: it.crosslink ?? {
            href: timelineHref(source, it.key),
            label: 'timeline',
            title: 'Show this entry on the global timeline',
         },
      })),
   };
}
