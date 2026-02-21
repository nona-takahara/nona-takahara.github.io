import { Grid } from "@data/components/primitive/Grid";
import { Section } from "@data/components/primitive/Section";
import { Stack } from "@data/components/primitive/Stack";
import { Heading, Card, Image, Link } from "@data/components/ui";

type Work = {
    title: string;
    href: string;
    category: string;
};

const works: Work[] = [
    { title: "Example Game", href: "/works/example", category: "Games" },
    { title: "Example Software", href: "/works/example2", category: "Software" },
    { title: "Example Hardware", href: "/works/example3", category: "Hardware" },
    { title: "Example Misc", href: "/works/example4", category: "Misc" },
];

export function WorksPreview() {
    return (
        <Section id="works">
            <Stack gap="8">
                <Heading as="h2">Works</Heading>

                <Grid gap="6" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}>
                    {works.map((w) => (
                        <Link variant="plain" key={w.title}>
                            <Card.Root>
                                <Image
                                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                    alt="Green double couch with wooden legs"
                                />
                                <Card.Header>
                                    <Card.Title>{w.title}</Card.Title>
                                    <Card.Description>
                                        {w.category}
                                    </Card.Description>
                                </Card.Header>
                            </Card.Root>
                        </Link>
                    ))}
                </Grid>
            </Stack>
        </Section>
    );
}
