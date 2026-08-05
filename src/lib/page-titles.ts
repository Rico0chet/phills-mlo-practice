export const PAGE_SUBTITLES: Record<string, string> = {
  "1-1": "Conforming vs Non-Conforming",
  "1-2": "Conforming vs Non-Conforming (continued)",
  "1-3": "FHA",
  "1-4": "V.A.",
  "1-5": "USDA Loans",
  "1-6": "Non-QM",
  "2-1": "RESPA (RESPA 1974)",
  "4-1": "Mortgage Mathematics",
};


export function getPageSubtitle(chapter: number, page: number): string | null {
  return PAGE_SUBTITLES[`${chapter}-${page}`] ?? null;
}

export function getPageLabel(chapter: number, page: number): string {
  return getPageSubtitle(chapter, page) ?? `Page ${page}`;
}
