import { getCollection } from "astro:content";
import { WorksGrid } from "./WorksGrid";
import { Section } from "../primitive/Section";
import { Stack } from "@/styled-system/jsx";
import { Heading } from "../ui";

export async function WorksArchive() {
    const works = (await getCollection("applist")).sort(
        (a, b) => a.data.order - b.data.order,
    );
    return (
        <Section id="works">
            <Stack gap="2">
                <Heading as="h2" fontSize="2xl">つくったもの - Works</Heading>
                <WorksGrid works={works} />
            </Stack>
        </Section>
    );
}
