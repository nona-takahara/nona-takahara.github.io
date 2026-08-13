import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { heading } from 'styled-system/recipes'

export const Heading = styled('h2', heading)
export type HeadingProps = ComponentProps<typeof Heading>
