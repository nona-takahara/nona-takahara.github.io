import { styled } from 'styled-system/jsx'

export const UnorderedList = styled('ul', {
    base: {
        listStyleType: 'disc',
        marginBlock: '2',
        paddingInlineStart: '6',
        '& ul': {
            listStyleType: 'circle',
            marginBlock: '1',
        },
        '& ul ul': {
            listStyleType: 'square',
        },
        '& ol': {
            marginBlock: '1',
        },
    },
})

export const OrderedList = styled('ol', {
    base: {
        listStyleType: 'decimal',
        marginBlock: '2',
        paddingInlineStart: '6',
        '& ol': {
            listStyleType: 'lower-alpha',
            marginBlock: '1',
        },
        '& ol ol': {
            listStyleType: 'lower-roman',
        },
        '& ul': {
            marginBlock: '1',
        },
    },
})

export const ListItem = styled('li', {
    base: {
        marginBlock: '0.5',
    },
})
