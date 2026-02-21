import { Link, Text, Heading } from '../ui'
import { MdxCode } from './MdxCode'
import { MdxPre } from './MdxPre'

export const MdxComponents = {
    a: Link,

    h1: (props: any) => <Heading as="h1" {...props} />,
    h2: (props: any) => <Heading as="h2" {...props} />,
    h3: (props: any) => <Heading as="h3" {...props} />,
    h4: (props: any) => <Heading as="h4" {...props} />,
    h5: (props: any) => <Heading as="h5" {...props} />,
    h6: (props: any) => <Heading as="h6" {...props} />,

    p: Text,
    code: MdxCode,
    pre: MdxPre
}
