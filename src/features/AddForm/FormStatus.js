import React from 'react'
import styled from 'styled-components/macro'
import { motion, AnimatePresence } from 'framer-motion'

import parseMessage from './parseStatusMessage'


const FormStatus = ({ status }) => {
    const { type, message } = status

    // parseMessage returns an array of letters
    // each wrapped in a motion element
    const letters = message ? parseMessage(message) : null

    return (
        <AnimatePresence exitBeforeEnter>
            <Div key={Math.random()}
                variants={variants}
                initial='hide'
                animate='show'
                exit='hide'
                className={type === 'error' ? 'error' : ''}>
                    {letters}
            </Div>
        </AnimatePresence>
    )
}


const Div = styled(motion.div)`
    margin: 10px auto;
    height: 65px;
    width: 80%;
    font-size: 1.3rem;
    line-height: 1.3;
    color: var(--green);

    &.error {
        color: var(--red);
    }

    b {
        font-weight: 500;
        font-size: 1.4rem;
        color: var(--orange2);
    }

    &.error b {
        color: var(--yellow);
    }

    i {
        font-style: normal;
        color: var(--red);
    }
`

const variants = {
    show: {
        opacity: 1,
        transition: {
            duration: 0,
            when: 'afterChildren',
            staggerChildren: 0.006
        }
    },
    hide: {
        opacity: 1,
        transition: {
            duration: 0,
            when: 'beforeChildren',
            staggerChildren: 0.004,
            staggerDirection: -1,
        }
    }
}


export default React.memo(FormStatus)