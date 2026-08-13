import type { CSSProperties } from "react";
import { Grid } from "styled-system/jsx";
import { Card, Link } from "@data/components/ui";
import type { CollectionEntry } from "astro:content";

// タイトルは背景画像の上に乗るため、背景色で縁取りして可読性を確保する。
const outlineStyle = {
    WebkitTextStroke: "{borderWidths.thick} {colors.bg.default}",
    paintOrder: "stroke",
    textUnderlineOffset: "{borderWidths.thick}",
} as const;

export function WorksGrid(props: { works: CollectionEntry<"applist">[] }) {
    return (
        <Grid gap="3" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}>
            {props.works.map((w) => {
                const backgroundSrc = w.data.bg?.src;

                return (
                    <Link variant="plain" key={w.id} href={"/works/" + w.id} display="block" w="full">
                        <Card.Root
                            minH="8rem"
                            justifyContent="center"
                            {...(backgroundSrc && {
                                // 画像URLだけが動的なので CSS 変数に隔離し、
                                // グラデーションとトークン参照は静的に書く。
                                backgroundImage:
                                    "linear-gradient(115deg in oklch, {colors.bg.default} 25%, transparent 65%), var(--works-bg)",
                                backgroundSize: "cover",
                                backgroundPosition: "right",
                                backgroundRepeat: "no-repeat",
                                style: { "--works-bg": `url("${backgroundSrc}")` } as CSSProperties,
                            })}
                        >
                            <Card.Header>
                                <Card.Title css={outlineStyle}>{w.data.title}</Card.Title>
                                <Card.Description css={outlineStyle}>
                                    {w.data.category.join(" / ")}
                                </Card.Description>
                            </Card.Header>
                        </Card.Root>
                    </Link>
                );
            })}
        </Grid>
    );
}
