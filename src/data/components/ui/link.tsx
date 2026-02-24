import { ark } from '@ark-ui/react/factory'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'
import { normalizeSiteHref } from '@data/url-policy'
import { styled } from 'styled-system/jsx'
import { link } from 'styled-system/recipes'

const BaseLink = styled(ark.a, link)

export type LinkProps = ComponentProps<typeof BaseLink>

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const { href, ...restProps } = props

  return (
    <BaseLink
      ref={ref}
      href={typeof href === 'string' ? normalizeSiteHref(href, 'link') : href}
      {...restProps}
    />
  )
})
