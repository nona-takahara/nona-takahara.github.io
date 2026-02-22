import { styled } from 'styled-system/jsx'
import { PageContainer } from '../layout/PageContainer'
import type { ReactNode } from 'react'
import { cva, type RecipeVariantProps } from '@/styled-system/css'

const Root = styled('section', {
    base: {
        py: { base: '4' }
    },
})

export const SectionStyle = cva({
    variants: {
        tone: {
            default: {
                bg: "bg.default"
            },

            hero: {
                bg: "colorPalette.subtle.bg",
                py: "10"
            },

            quick: {
                bg: "colorPalette.surface.bg"
            }
        }
    },

    defaultVariants: {
        tone: "default"
    }
})


type SectionProps = {
    children: ReactNode
    fullBleed?: boolean
    id?: string,
    tone?: "default" | "hero" | "quick"
}

export function Section({ children, fullBleed, id, tone = "default" }: SectionProps) {
    return (
        <Root id={id} className={SectionStyle({ tone: tone })}>
            {fullBleed ? children : <PageContainer>{children}</PageContainer>}
        </Root>
    )
}

export type SectionVariants = RecipeVariantProps<typeof SectionStyle>
