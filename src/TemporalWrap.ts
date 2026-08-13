import { Temporal, type Intl } from "@js-temporal/polyfill";

// サイト全体で日付を表示するときの基準タイムゾーン。
export const SITE_TIME_ZONE = "Asia/Tokyo";

// 日付のみを表示する箇所（つくったものの最終更新日など）で使う。
export const dateFormatOptions: Intl.DateTimeFormatOptions = {
  timeZone: SITE_TIME_ZONE,
  dateStyle: "long",
};

// 日付と時刻を表示する箇所（ブログの投稿日・最終更新日）で使う。
export const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
  timeZone: SITE_TIME_ZONE,
  dateStyle: "long",
  timeStyle: "medium",
};

// git のコミット時刻（Instant）をサイト基準のカレンダー日付に落とす。
export function instantToPlainDate(date: Temporal.Instant | undefined) {
  return date?.toZonedDateTimeISO(SITE_TIME_ZONE).toPlainDate();
}

// `2024-01-02` や `2024-01-02T03:04:05Z` を PlainDate にする。
// 解釈できない文字列は undefined を返す。
export function dateStringToPlainDate(date: string) {
  if (!date) {
    return undefined;
  }

  try {
    return Temporal.PlainDate.from(date.split("T")?.[0] || date);
  } catch {
    return undefined;
  }
}

// frontmatter の `latest.dateiso` を PlainDate にする。
// YAML が日付として解釈した場合は Date、`today` の場合はビルド日を使う。
export function getUpdateDate(dateIso: string | Date | undefined) {
  if (!dateIso) {
    return undefined;
  }

  if (dateIso === "today") {
    return Temporal.Now.plainDateISO(SITE_TIME_ZONE);
  }

  if (dateIso instanceof Date) {
    return dateStringToPlainDate(dateIso.toISOString());
  }

  return dateStringToPlainDate(dateIso);
}
