import { Grid, Stack } from "styled-system/jsx";
import { Button, Link } from "@data/components/ui";

// banner は links.js に書かれた URL か、ビルド時にキャッシュされた
// ローカルパスのいずれか（get-resolved-links.js が解決する）。
export type ResolvedLink = {
    title: string;
    url: string;
    inter: boolean;
    banner?: string | undefined;
};

export function LinksGrid(props: { links: ResolvedLink[] }) {
    return (
        <Grid
            gap="2"
            gridTemplateColumns={{
                base: "1fr",
                sm: "repeat(auto-fill, minmax(240px, max-content))",
            }}
        >{props.links.map((item) => (
            <Button variant="outline" colorPalette="gray" key={item.url} asChild>
                <Link
                    href={item.url}
                    variant="plain"
                    rel="external noopener noreferrer"
                    target="_blank"
                    w="fit-content"
                    minH="100px"
                    minW="266px"
                >
                    {!item.banner ? (
                        item.title
                    ) : (
                        <Stack as="div">
                            <img
                                src={item.banner}
                                alt={`${item.title} banner`}
                                loading="lazy"
                                decoding="async"
                                title={item.title}
                            />
                        </Stack>
                    )}
                </Link>
            </Button>
        ))}
        </Grid>)
}
