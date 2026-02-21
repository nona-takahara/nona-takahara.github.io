import { Section } from "@data/components/primitive/Section";
import { Stack } from "@data/components/primitive/Stack";
import { Heading, Text } from "@data/components/ui";

export function AboutPreview() {
    return (
        <Section>
            <Stack gap="4" maxW="2xl">
                <Heading as="h2">
                    About
                </Heading>

                <Text>
                    自作ソフトウェアやツールを中心に活動しています。
                </Text>
            </Stack>
        </Section>
    )
}
