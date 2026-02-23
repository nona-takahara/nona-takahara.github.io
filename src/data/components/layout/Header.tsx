import { Heading, Image, Link } from '@data/components/ui'
import { PageContainer } from './PageContainer'
import { styled } from 'styled-system/jsx'

const Root = styled('header', {
    base: {
        borderBottomColor: 'colorPalette.solid.bg',
        borderBottomWidth: 'ultraThick'
    },
})

export function Header() {
    return (
        <Root>
            <PageContainer>
                <Heading as="h1" fontSize="2xl" fontWeight="bold" height="20" display="flex" alignItems="center">
                    <Link href="/">
                        <picture>
                            <source srcSet="/image/nonasaba-net-dark.svg" media="(prefers-color-scheme: dark)" />
                            <Image
                                src="/image/nonasaba-net.svg"
                                alt="のなさばどっとねっと"
                                height="16"
                                decoding="async"
                                loading="lazy"
                            />
                        </picture>
                    </Link>
                </Heading>
            </PageContainer>
        </Root >
    )
}
