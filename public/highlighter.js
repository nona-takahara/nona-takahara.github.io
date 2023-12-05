import {
    common,
    createStarryNight,
} from "https://esm.sh/@wooorm/starry-night@3?bundle";
import { toDom } from "https://esm.sh/hast-util-to-dom@4?bundle";

const starryNight = await createStarryNight(common);
const prefix = "language-";

const nodes = Array.from(document.body.querySelectorAll("code"));

for (const node of nodes) {
    const className = Array.from(node.classList).find(function (d) {
        return d.startsWith(prefix);
    });
    if (!className) continue;
    const scope = starryNight.flagToScope(className.slice(prefix.length));
    if (!scope) continue;
    const tree = starryNight.highlight(node.textContent, scope);
    node.replaceChildren(toDom(tree, { fragment: true }));
}