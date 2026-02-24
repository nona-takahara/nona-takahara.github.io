import { Temporal, Intl } from "@js-temporal/polyfill";

export const formatOptions: Intl.DateTimeFormatOptions = {
  timeZone: "Asia/Tokyo",
  dateStyle: "long",
};

export function dateStringToPlainDate(date: string) {
  if (!date) {
    return undefined;
  }
  return Temporal.PlainDate.from(date.split("T")?.[0] || date);
}
