import { Heading } from '@data/components/ui'
import { PageContainer } from './PageContainer'
import { styled } from 'styled-system/jsx'

const Root = styled('header', {
    base: {
        borderBottomColor: 'colorPalette.solid.bg',
        borderBottomWidth: 'ultraTick'
    },
})

export function Header() {
    return (
        <Root>
            <PageContainer>
                <Heading as="h1" fontSize="2xl" fontWeight="bold" height="16" display="flex" alignItems="center">
                    のなさばどっとねっと
                </Heading>
            </PageContainer>
        </Root >
    )
}
