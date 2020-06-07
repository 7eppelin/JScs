import React from 'react'
import styled from 'styled-components/macro'
import { motion, AnimatePresence } from 'framer-motion'


const FormStatus = ({ status }) => {
    const { type, message } = status

    const msg = message && Array.from(message)

    return (
        <AnimatePresence exitBeforeEnter>

            <Div key={Math.random()}
                variants={variants}
                initial='hide'
                animate='show'
                exit='hide'
                className={type === 'error' ? 'error' : ''}>

                    {msg?.map((char, i) => (
                        <motion.span key={i}
                            transition={{ duration: 0.05 }}
                            variants={letter}>
                            {char}
                        </motion.span>
                    ))}

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

const letter = {
    show: { opacity: 1 },
    hide: { opacity: 0 }
}

export default React.memo(FormStatus)