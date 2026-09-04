export const BibSources = {
   paper:  () => import('../resources/bibliographies/publications.bib?raw'),
   talk:   () => import('../resources/bibliographies/talks.bib?raw'),
   poster: () => import('../resources/bibliographies/posters.bib?raw'),
   other:  () => import('../resources/bibliographies/other.bib?raw')
};

export async function loadBib(source: keyof typeof BibSources): Promise<string> {
   return (await BibSources[source]()).default;
}

export async function loadAllBib(): Promise<string> {
   const all = await Promise.all(Object.values(BibSources).map(async load => (await load()).default));
   return all.join('\n\n');
}
