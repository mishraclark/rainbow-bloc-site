import type { CollectionEntry } from "astro:content";

export type EventOccurrence = {
  entry: CollectionEntry<"events">;
  start: Date;
  end?: Date;
};

const MS_DAY = 24 * 60 * 60 * 1000;
const DEFAULT_HORIZON_DAYS = 365;
const MAX_OCCURRENCES = 520;

function addDays(d: Date, n: number): Date {
  return new Date(d.getTime() + n * MS_DAY);
}

function addMonths(d: Date, n: number): Date {
  const out = new Date(d);
  out.setMonth(out.getMonth() + n);
  return out;
}

export function expandEvent(
  entry: CollectionEntry<"events">,
  now: Date,
  horizonDays = DEFAULT_HORIZON_DAYS,
): EventOccurrence[] {
  const { start, end, recurrence, recurrenceUntil } = entry.data;
  if (!recurrence) return [{ entry, start, end }];

  const horizon = recurrenceUntil ?? addDays(now, horizonDays);
  const duration = end ? end.getTime() - start.getTime() : 0;
  const step =
    recurrence === "weekly"
      ? (d: Date) => addDays(d, 7)
      : recurrence === "biweekly"
        ? (d: Date) => addDays(d, 14)
        : (d: Date) => addMonths(d, 1);

  const out: EventOccurrence[] = [];
  let occ = start;
  while (occ <= horizon && out.length < MAX_OCCURRENCES) {
    out.push({
      entry,
      start: occ,
      end: end ? new Date(occ.getTime() + duration) : undefined,
    });
    occ = step(occ);
  }
  return out;
}
