import { Section } from "@data/components/primitive/Section";
import { Button, Heading, Text } from "@data/components/ui";

export function Hero() {
    return (
        <Section tone="hero">
            <Heading as="h1">
                低いレイヤから、手で組み上げる。
            </Heading>

            <Text>
                個人制作のツールとソフトウェアを公開しています。
            </Text>

            <Button variant="surface" asChild>
                <a href="#works">制作物を見る</a>
            </Button>
        </Section>
    )
}
