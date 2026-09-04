interface CslEntry {
   DOI?: string;
   URL?: string;
   event?: string;
   note?: string;
   issued?: { 'date-parts': number[][] };
   _graph?: unknown;
   [field: string]: unknown;
}

interface FormatOptions {
   format: 'html' | 'string';
   template: string;
   lang: string;
   asEntryArray: true;
   nosort: boolean;
   prepend(entry: CslEntry): string;
   append(entry: CslEntry): string;
}

declare module '@citation-js/core' {
   export class Cite {
      constructor(input: string);
      data: CslEntry[];
      set(data: CslEntry[]): void;
      sort(compare: (a: CslEntry, b: CslEntry) => number): void;
      format(type: 'bibliography', options: FormatOptions): [string, string][];
   }
}

declare module '@citation-js/plugin-bibtex';
declare module '@citation-js/plugin-csl';
