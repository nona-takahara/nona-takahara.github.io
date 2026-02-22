import { Stack } from "@/styled-system/jsx";
import { Section } from "@data/components/primitive/Section";
import { Heading, Text } from "@data/components/ui";

export function Hero() {
    return (
        <Section tone="hero">
            <Stack gap="2">
                <Heading as="h1" fontSize="2xl">
                    のなさばどっとねっと - nonasaba.net
                </Heading>

                <Text>
                    ソフトもハードも作って遊ぼう。
                </Text>
            </Stack>
        </Section>
    )
}
