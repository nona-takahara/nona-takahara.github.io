import { Intl, Temporal } from "@js-temporal/polyfill";

type TemporalValue =
  | Temporal.PlainDate
  | Temporal.PlainDateTime
  | Temporal.ZonedDateTime
  | Temporal.Instant;

type TimeProps = {
  temporal?: TemporalValue | undefined;
  formatOptions: Intl.DateTimeFormatOptions;
  locale?: string;
};

export function Time({ temporal, formatOptions, locale = "ja-JP" }: TimeProps) {
  if (!temporal) {
    return <time />;
  }

  return (
    <time dateTime={temporal.toString()}>
      {temporal.toLocaleString(locale, formatOptions)}
    </time>
  );
}

