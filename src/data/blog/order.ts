// ブログ記事の並び順。記事の id は `entry<連番>` 形式で、
// 連番が大きいものほど新しい記事として扱う。
export function getBlogOrder(id: string) {
  const value = Number(id.replace("entry", ""));
  return Number.isFinite(value) ? value : -1;
}

// 新しい記事が先頭に来る順に並べ替える。
export function sortBlogPostsByNewest<T extends { id: string }>(posts: T[]) {
  return [...posts].sort((a, b) => getBlogOrder(b.id) - getBlogOrder(a.id));
}
