import React from 'react'
import styled from 'styled-components/macro'
import { motion, AnimatePresence } from 'framer-motion'

import parseMessage from './parseStatusMessage'


const FormStatus = ({ status }) => {
    const { type, message } = status

    // parseMessage returns an array of letters
    // each wrapped either in a <motion.span> or <motion.b>
    const msg = message ? parseMessage(message) : null

    return (
        <AnimatePresence exitBeforeEnter>

            <Div key={Math.random()}
                variants={variants}
                initial='hide'
                animate='show'
                exit='hide'
                className={type === 'error' ? 'error' : ''}>

                    {msg}

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

    i {
        font-style: normal;
        color: var(--red);
    }
`

const variants = {
    show: {
        opacity: 1,
        transition: {
            when: 'afterChildren',
            staggerChildren: 0.008
        }
    },
    hide: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.008,
            staggerDirection: -1,
        }
    }
}


export default React.memo(FormStatus)