import { HorizonalStack } from "@data/components/primitive/HorizonalStack";
import { Section } from "@data/components/primitive/Section";
import { getCollection } from "astro:content";
import { Button, Heading, Link } from "../ui";

export async function QuickAccess() {
    const works = (await getCollection("applist")).filter((v) => v.data.quick).sort(
        (a, b) => a.data.order - b.data.order,
    );
    return (
        <Section tone="quick">
            <HorizonalStack gap="3">
                <Heading as="h2" fontSize="2xl">Quick Access</Heading>
                <HorizonalStack gap="2" flexWrap="wrap">
                    {works.map((w) =>
                        <Button key={w.id} variant="outline" fontSize="md" asChild>
                            <Link href={w.data.links[0]?.url} variant="plain">{w.data.links[0]?.label}</Link>
                        </Button>
                    )
                    }
                </HorizonalStack>
            </HorizonalStack>
        </Section >
    )
}
