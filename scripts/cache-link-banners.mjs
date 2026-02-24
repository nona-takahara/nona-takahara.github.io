import { createHash } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { extname } from "node:path";
import links from "../src/data/links/links.js";

const cacheDirUrl = new URL("../public/image/links-cache/", import.meta.url);
const manifestUrl = new URL("../src/data/links/banner-cache.generated.json", import.meta.url);

const contentTypeExtensionMap = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "image/avif": ".avif",
};

function isExternalUrl(value) {
  return typeof value === "string" && /^https?:\/\//.test(value);
}

function buildFileName(sourceUrl, index, contentType) {
  const parsed = new URL(sourceUrl);
  const pathnameExt = extname(parsed.pathname).toLowerCase();
  const contentTypeKey = contentType ? contentType.split(";")[0].toLowerCase() : "";
  const knownExt = contentTypeExtensionMap[contentTypeKey] ?? ".img";
  const extension = pathnameExt || knownExt;
  const hash = createHash("sha256").update(sourceUrl).digest("hex").slice(0, 12);

  return `banner-${index + 1}-${hash}${extension}`;
}

function getTimeoutSignal() {
  if (typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function") {
    return AbortSignal.timeout(15000);
  }
  return undefined;
}

async function cacheBanner(sourceUrl, index) {
  const response = await fetch(sourceUrl, {
    redirect: "follow",
    signal: getTimeoutSignal(),
    headers: {
      "user-agent": "nona-takahara.github.io banner cacher",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  const filename = buildFileName(sourceUrl, index, contentType);
  const outputUrl = new URL(filename, cacheDirUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await writeFile(outputUrl, buffer);
  return `/image/links-cache/${filename}`;
}

async function main() {
  const manifest = {};

  await rm(cacheDirUrl, { recursive: true, force: true });
  await mkdir(cacheDirUrl, { recursive: true });

  for (const [index, link] of links.entries()) {
    const bannerSource = link.banner;
    if (!isExternalUrl(bannerSource)) {
      continue;
    }

    try {
      const cachedPath = await cacheBanner(bannerSource, index);
      manifest[link.url] = cachedPath;
      console.log(`cached: ${link.title} -> ${cachedPath}`);
    } catch (error) {
      console.warn(`cache failed: ${link.title} (${bannerSource})`);
      console.warn(error instanceof Error ? error.message : String(error));
    }
  }

  await writeFile(manifestUrl, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`manifest written: ${Object.keys(manifest).length} entries`);
}

main().catch((error) => {
  console.warn("banner cache script finished with warnings.");
  console.warn(error instanceof Error ? error.message : String(error));
});
