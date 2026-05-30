export const SITE_TZ = "America/Los_Angeles";

export function parseTime(input: string): { h: number; m: number } {
  const s = input.trim().toLowerCase();
  const match = s.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);
  if (!match) throw new Error(`Invalid time: "${input}"`);
  let h = parseInt(match[1], 10);
  const m = match[2] ? parseInt(match[2], 10) : 0;
  const period = match[3];
  if (period === "pm" && h < 12) h += 12;
  if (period === "am" && h === 12) h = 0;
  if (h < 0 || h > 23 || m < 0 || m > 59) {
    throw new Error(`Invalid time: "${input}"`);
  }
  return { h, m };
}

function tzWallTimeOffsetMs(utcMs: number, tz: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(utcMs));
  const get = (t: string) => Number(parts.find((p) => p.type === t)!.value);
  const hour = get("hour") === 24 ? 0 : get("hour");
  const wallAsIfUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    hour,
    get("minute"),
    get("second"),
  );
  return wallAsIfUtc - utcMs;
}

export function combineDateTime(
  date: Date,
  time: string | undefined,
  tz: string = SITE_TZ,
): Date {
  const { h, m } = time ? parseTime(time) : { h: 0, m: 0 };
  const y = date.getUTCFullYear();
  const mo = date.getUTCMonth();
  const d = date.getUTCDate();
  let utc = Date.UTC(y, mo, d, h, m);
  utc -= tzWallTimeOffsetMs(utc, tz);
  utc = Date.UTC(y, mo, d, h, m) - tzWallTimeOffsetMs(utc, tz);
  return new Date(utc);
}
