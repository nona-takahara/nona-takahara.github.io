import { Link, Text, Heading } from '../ui'
import { MdxCode } from './MdxCode'
import { MdxPre } from './MdxPre'
import { ListItem, OrderedList, UnorderedList } from '@data/components/primitive/List'
import { Callout } from '@data/components/primitive/Callout'
import { PetitcomPublicKey } from '@data/components/primitive/PetitcomPublicKey'
import { HorizontalRule } from '@data/components/primitive/HorizontalRule'
import { Blockquote } from '../primitive/Blockquote'

export const MdxComponents = {
    a: Link,

    h1: (props: any) => <Heading as="h1" fontSize="3xl" mt="5" {...props} />,
    h2: (props: any) => <Heading as="h2" fontSize="2xl" mt="4" {...props} />,
    h3: (props: any) => <Heading as="h3" fontSize="xl" mt="3" {...props} />,
    h4: (props: any) => <Heading as="h4" fontSize="lg" mt="2" {...props} />,
    h5: (props: any) => <Heading as="h5" fontSize="lg" mt="2" {...props} />,
    h6: (props: any) => <Heading as="h6" fontSize="lg" mt="2" {...props} />,

    p: (props: any) => <Text mt="1" {...props} />,
    ul: UnorderedList,
    ol: OrderedList,
    li: ListItem,
    blockquote: Blockquote,
    "mdn-callout": Callout,
    "petitcom-public-key": PetitcomPublicKey,
    hr: HorizontalRule,
    code: MdxCode,
    pre: MdxPre
}
