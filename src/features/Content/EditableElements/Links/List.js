import React from 'react';
import styled from 'styled-components/macro'
import { motion } from 'framer-motion'

import Link from './Link'


const List = ({ 
    readOnly,
    links, 
    edit, 
    deleteLink
}) => (
    <Wrapper className='scrollbar' 
        variants={variants}
        initial={readOnly ? 'readOnly' : 'editing'}
        animate={readOnly ? 'readOnly' : 'editing'}>
        <ul>

            {links.map(({ text, href }, index) => (
                <Link key={text}
                    text={text}
                    href={href}
                    readOnly={readOnly}
                    editLink={() => edit(index)}
                    deleteLink={() => deleteLink(index)} />
            ))}
        </ul>
    </Wrapper>
)


const Wrapper = styled(motion.div)`
    height: 100%;
    width: 0;
    background: var(--gray6);
    overflow-x: auto;

    ul {
        height: 100%;
        display: flex;
        align-items: center;
    }
`

const transition = {
    duration: 0.5,
    type: 'spring',
    damping: 13,
    mass: 0.75,
    stiffness: 120,
}

const variants = {
    readOnly: {
        marginLeft: 0, 
        minWidth: '100%',
        transition
    },
    editing: {
        marginLeft: 60, 
        transition,
        transitionEnd: { 
            minWidth: 'calc(100% - 60px)' 
        }
    }
}

export default List;