import type { CollectionEntry } from "astro:content";
import { combineDateTime } from "./datetime";

export type EventOccurrence = {
  entry: CollectionEntry<"events">;
  start: Date;
  end?: Date;
};

const MS_DAY = 24 * 60 * 60 * 1000;
const DEFAULT_HORIZON_DAYS = 365;
const MAX_OCCURRENCES = 520;

function addUTCDays(d: Date, n: number): Date {
  return new Date(d.getTime() + n * MS_DAY);
}

function addUTCMonths(d: Date, n: number): Date {
  const out = new Date(d);
  out.setUTCMonth(out.getUTCMonth() + n);
  return out;
}

export function expandEvent(
  entry: CollectionEntry<"events">,
  now: Date,
  horizonDays = DEFAULT_HORIZON_DAYS,
): EventOccurrence[] {
  const {
    startDate,
    startTime,
    endTime,
    recurrence,
    recurrenceUntil,
    start,
    end,
  } = entry.data;
  if (!recurrence) return [{ entry, start, end }];

  const horizon = recurrenceUntil
    ? combineDateTime(recurrenceUntil, "23:59")
    : addUTCDays(now, horizonDays);

  const duration = end ? end.getTime() - start.getTime() : 0;
  const step =
    recurrence === "weekly"
      ? (d: Date) => addUTCDays(d, 7)
      : recurrence === "biweekly"
        ? (d: Date) => addUTCDays(d, 14)
        : (d: Date) => addUTCMonths(d, 1);

  const out: EventOccurrence[] = [];
  let date = startDate;
  while (out.length < MAX_OCCURRENCES) {
    const occStart = combineDateTime(date, startTime);
    if (occStart > horizon) break;
    const occEnd =
      endTime || end
        ? endTime
          ? combineDateTime(date, endTime)
          : new Date(occStart.getTime() + duration)
        : undefined;
    out.push({ entry, start: occStart, end: occEnd });
    date = step(date);
  }
  return out;
}
