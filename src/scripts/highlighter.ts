import { common, createStarryNight } from "@wooorm/starry-night";
import { toDom } from "hast-util-to-dom";

const LANGUAGE_PREFIX = "language-";
const starryNight = await createStarryNight(common);

const nodes = Array.from(document.body.querySelectorAll("code"));

for (const node of nodes) {
  const language = getLanguage(node);
  if (!language || language === "null" || language === "undefined") continue;

  const scope = starryNight.flagToScope(language);
  if (!scope) continue;

  const tree = starryNight.highlight(node.textContent ?? "", scope);
  node.replaceChildren(toDom(tree, { fragment: true }));
}

function getLanguage(node: HTMLElement): string | null {
  const className = Array.from(node.classList).find((name) =>
    name.startsWith(LANGUAGE_PREFIX),
  );
  if (className) return className.slice(LANGUAGE_PREFIX.length);
  return null;
}
