import { HorizonalStack } from "@data/components/primitive/HorizonalStack";
import { Section } from "@data/components/primitive/Section";
import { Stack } from "@data/components/primitive/Stack";
import { ColorModeImage, Heading, IconButton, Link, Text } from "@data/components/ui";
import contacts from "@data/contacts/contacts.json";
import profileImage from "../../../images/nona-takahara.png";

const isExternalLink = (href: string) => href.startsWith("http://") || href.startsWith("https://");
const hasImage = (contact: (typeof contacts)[number]): contact is (typeof contacts)[number] & { image: string; "image-dark"?: string } => "image" in contact;
const hasIcon = (contact: (typeof contacts)[number]): contact is (typeof contacts)[number] & { icon: string } => "icon" in contact;

export function AboutPreview() {
    return (
        <Section id="about">
            <Stack gap="2">
                <Heading as="h2" fontSize="2xl">
                    ここはなに - About
                </Heading>

                <HorizonalStack gap="4">
                    <ColorModeImage
                        src={profileImage.src}
                        alt="高原のな プロフィール画像"
                        w="32"
                        h="32"
                        borderRadius="full"
                        fit="cover"
                        decoding="async"
                        loading="lazy"
                    />

                    <Stack gap="2" flexGrow="1">
                        <Text>
                            <b>
                                <ruby>
                                    高原<rp>（</rp><rt>たかはら</rt><rp>）</rp>
                                </ruby>
                                のな
                            </b>
                            （アイコンのひと）の制作物置き場的な、ゆるいサイトです。
                        </Text>
                        <Heading as="h3" fontSize="lg">
                            連絡と外部サイト - Contacts
                        </Heading>
                        <HorizonalStack gap="2" flexWrap="wrap">
                            {contacts.map((contact) => (
                                <IconButton key={contact.href} colorPalette="gray" variant="outline" size="xl" borderRadius="full" asChild>
                                    <Link
                                        href={contact.href}
                                        variant="plain"
                                        target={isExternalLink(contact.href) ? "_blank" : undefined}
                                        rel={isExternalLink(contact.href) ? "noreferrer" : undefined}
                                        aria-label={contact.text}
                                        title={contact.text}
                                    >
                                        {hasImage(contact) ? (
                                            <ColorModeImage
                                                src={`/image/${contact.image}`}
                                                {...("image-dark" in contact
                                                    ? { darkSrc: `/image/${contact["image-dark"]}` }
                                                    : {})}
                                                alt={contact.text}
                                                w="6"
                                                h="6"
                                                fit="contain"
                                            />
                                        ) : hasIcon(contact) ? (
                                            <i className={contact.icon} aria-hidden="true" style={{ fontSize: "1.5em" }} />
                                        ) : (
                                            null
                                        )}
                                    </Link>
                                </IconButton>
                            ))}
                        </HorizonalStack>

                        <Text>
                            <Link href="/links">リンク集のページ</Link>を分けました。バナーなどはリンク集からどうぞ。リンクフリーです。
                        </Text>
                    </Stack>
                </HorizonalStack>
            </Stack>
        </Section>
    )
}
