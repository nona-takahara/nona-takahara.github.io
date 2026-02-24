import { PageContainer } from './PageContainer'
import { styled } from 'styled-system/jsx'

const Root = styled('footer', {
    base: {
        borderTopWidth: 'thin',
        marginTop: '16',
    },
})

const ContentArea = styled('div', {
    base: {
        paddingY: '6',
        paddingX: '0'
    }
})

export function Footer() {
    return (
        <Root>
            <PageContainer>
                <ContentArea>
                    Nona Takahara
                </ContentArea>
            </PageContainer>
        </Root>
    )
}
