// サイト内URLの出力モード。
// - html: `/foo.html` を基本にする
// - clean: `/foo` を基本にする
export type SiteUrlMode = "html" | "clean";
export type SiteUrlTarget = "canonical" | "link" | "disqus";

// フック関数に渡すコンテキスト情報。
export interface SiteUrlHookContext {
  mode: SiteUrlMode;
  target: SiteUrlTarget;
  originalPathname: string;
}

// index.html を正規URLとして扱うディレクトリ。
const INDEX_ROUTE_PATHS = new Set(["/blog", "/works"]);

export const siteUrlPolicy = {
  // 将来 clean に切り替える場合はここを変更する。
  mode: "html" as SiteUrlMode,
  indexRoutePaths: INDEX_ROUTE_PATHS,
  // ここが最終フック。必要なら target ごとに個別の書き換えを行う。
  rewritePathname(pathname: string, _context: SiteUrlHookContext) {
    return pathname;
  },
};

// 末尾セグメントに拡張子が付いているかを判定する。
function hasFileExtension(pathname: string) {
  return /\/[^/]+\.[^/]+$/.test(pathname);
}

// 先頭スラッシュなしで渡された場合にルート相対へ補正する。
function toRootedPath(pathname: string) {
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

// href を `pathname` と `?query` / `#hash` に分解する。
function splitHref(href: string) {
  const hashIndex = href.indexOf("#");
  const queryIndex = href.indexOf("?");

  const pathEndCandidates = [hashIndex, queryIndex].filter((index) => index !== -1);
  const pathEnd = pathEndCandidates.length > 0 ? Math.min(...pathEndCandidates) : href.length;
  const pathname = href.slice(0, pathEnd);
  const suffix = href.slice(pathEnd);

  return { pathname, suffix };
}

// 正規化対象外（外部URL/プロトコル付き/相対クエリ等）を判定する。
function isExternalOrNonPathHref(href: string) {
  if (!href) {
    return true;
  }

  if (
    href.startsWith("#") ||
    href.startsWith("?") ||
    href.startsWith("//")
  ) {
    return true;
  }

  return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(href);
}

// パス単体の正規化。
// 例:
// - `/blog` -> `/blog/`
// - `/works/a` -> `/works/a.html` (mode=html)
// - `/works/a.html` -> そのまま
export function normalizeSitePath(pathname: string, target: SiteUrlTarget = "link") {
  const originalPathname = pathname;
  const rootedPath = toRootedPath(pathname);

  if (rootedPath === "/") {
    return "/";
  }

  const basePath = rootedPath.endsWith("/") ? rootedPath.slice(0, -1) : rootedPath;
  const isIndexRoute = siteUrlPolicy.indexRoutePaths.has(basePath);
  const isFilePath = hasFileExtension(rootedPath);

  let normalizedPath = rootedPath;

  if (isIndexRoute) {
    normalizedPath = `${basePath}/`;
  } else if (isFilePath) {
    normalizedPath = rootedPath;
  } else if (siteUrlPolicy.mode === "html") {
    normalizedPath = `${basePath}.html`;
  } else {
    normalizedPath = basePath;
  }

  return siteUrlPolicy.rewritePathname(normalizedPath, {
    mode: siteUrlPolicy.mode,
    target,
    originalPathname,
  });
}

// href 全体の正規化。内部リンク（`/` 始まり）のみ書き換える。
export function normalizeSiteHref(href: string, target: SiteUrlTarget = "link") {
  if (isExternalOrNonPathHref(href)) {
    return href;
  }

  if (!href.startsWith("/")) {
    return href;
  }

  const { pathname, suffix } = splitHref(href);
  return `${normalizeSitePath(pathname, target)}${suffix}`;
}

// canonical専用: query/hash を落として絶対URL化する。
export function getCanonicalUrl(url: URL) {
  const canonicalUrl = new URL(url);
  canonicalUrl.hash = "";
  canonicalUrl.search = "";
  canonicalUrl.pathname = normalizeSitePath(canonicalUrl.pathname, "canonical");
  return canonicalUrl.toString();
}
