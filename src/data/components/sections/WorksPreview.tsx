import { getCollection } from "astro:content";
import { WorksGrid } from "./WorksGrid";
import { Heading, Link } from "../ui";
import { Stack } from "@/styled-system/jsx";
import { Section } from "../primitive/Section";

export async function WorksPreview() {
    const works = (await getCollection("applist")).filter((v) => v.data.top).sort(
        (a, b) => a.data.order - b.data.order,
    );
    return (
        <Section id="works">
            <Stack gap="2" mb="4">
                <Heading as="h2" fontSize="2xl">つくったもの - Works</Heading>
                <WorksGrid works={works} />
            </Stack>
            <Link href="/works/">もっと見る &gt;</Link>
        </Section>
    );
}
