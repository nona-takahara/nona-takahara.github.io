import { Grid } from "@data/components/primitive/Grid";
import { Card, Link } from "@data/components/ui";
import type { CollectionEntry } from "astro:content";
import { token } from "styled-system/tokens";

export function WorksGrid(props: { works: CollectionEntry<"applist">[] }) {
    return (
        <Grid gap="3" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}>
            {props.works.map((w) => {
                const bg = token.var("colors.bg.default");
                const border = token.var("borderWidths.thick");
                const offset = token.var("borderWidths.thick");
                const hasBackground = Boolean(w.data.icon?.src);

                const backgroundStyle = hasBackground
                    ? {
                        backgroundImage: `linear-gradient(115deg in oklch, ${bg} 25%, transparent 65%), url("${w.data.bg?.src}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "right",
                        backgroundRepeat: "no-repeat",
                    }
                    : undefined;

                const outlineStyle = { WebkitTextStroke: `${border} ${bg}`, paintOrder: "stroke", textUnderlineOffset: `${offset}` }

                return (
                    <Link variant="plain" key={w.id} href={"/works/" + w.id + "/"} display="block" w="full">
                        <Card.Root
                            style={backgroundStyle}
                            minH="8rem"
                            justifyContent="center"
                        >
                            <Card.Header>
                                <Card.Title style={outlineStyle}>{w.data.title}</Card.Title>
                                <Card.Description style={outlineStyle}>{w.data.category.join(" / ")}</Card.Description>
                            </Card.Header>
                        </Card.Root>
                    </Link >
                );
            })}
        </Grid >
    );
}
