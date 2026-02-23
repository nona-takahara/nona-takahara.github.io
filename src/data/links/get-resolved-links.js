import { readFile } from "node:fs/promises";
import links from "./links.js";

const cacheManifestUrl = new URL("./banner-cache.generated.json", import.meta.url);

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

async function readCacheManifest() {
  try {
    const raw = await readFile(cacheManifestUrl, "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return {};
    }
    return parsed;
  } catch {
    return {};
  }
}

export async function getResolvedLinks() {
  const cacheManifest = await readCacheManifest();

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
