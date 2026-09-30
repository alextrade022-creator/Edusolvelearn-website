// Date formatting with the built-in Intl API (no date library needed).

const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "2026-09-15" → "15 Sept 2026" */
export const formatDate = (isoDate: string): string => DATE_FORMAT.format(new Date(`${isoDate}T00:00:00Z`));
