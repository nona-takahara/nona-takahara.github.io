import { readFile } from "node:fs/promises";
import links from "./links.js";
import cacheManifest from "./banner-cache.generated.json";

function isExternalUrl(value) {
  return typeof value === "string" && /^https?:\/\//.test(value);
}

function normalizeLocalPath(value) {
  if (!value || isExternalUrl(value)) {
    return value;
  }

  if (value.startsWith("/")) {
    return value;
  }

  if (value.startsWith("./")) {
    return value.slice(1);
  }

  return `/${value}`;
}

export async function getResolvedLinks() {
  return links.map((item) => {
    const sourceBanner = item.banner;
    const cachedBanner = cacheManifest[item.url];
    const resolvedBanner = cachedBanner ?? normalizeLocalPath(sourceBanner);

    if (!resolvedBanner) {
      return { ...item };
    }

    return {
      ...item,
      banner: resolvedBanner,
    };
  });
}
