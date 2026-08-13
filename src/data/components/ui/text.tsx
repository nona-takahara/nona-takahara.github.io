import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { text } from 'styled-system/recipes'

export const Text = styled('p', text)
export type TextProps = ComponentProps<typeof Text>
