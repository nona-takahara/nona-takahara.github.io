import { ColorModeImage, Heading, Link } from '@data/components/ui'
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
                        <ColorModeImage
                            src="/image/nonasaba-net.svg"
                            darkSrc="/image/nonasaba-net-dark.svg"
                            alt="のなさばどっとねっと"
                            height="16"
                            decoding="async"
                            loading="lazy"
                        />
                    </Link>
                </Heading>
            </PageContainer>
        </Root >
    )
}
