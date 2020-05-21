import React, { Suspense } from 'react'
import styled from 'styled-components/macro'
import { motion } from 'framer-motion'

import Fallback from './Fallback'
const Toolbar = React.lazy(() => import('./Toolbar'))
const SaveButton = React.lazy(() => import('./SaveButton'))


const ContentFooter = ({ readOnly, saveChanges, edited }) => (
    <StyledFooter variants={variants}
        animate={readOnly ? 'hidden' : 'shown'}>

        <div className='edited'>
            Edited: {new Date(edited).toLocaleDateString()}
        </div>

        <Suspense fallback={<Fallback />}>
            {!readOnly && (
                <>
                    <Toolbar />
                    <SaveButton save={saveChanges} />
                </>
            )}
        </Suspense>
    </StyledFooter>
)


const StyledFooter = styled(motion.div)`
    background: var(--gray6);
    overflow: hidden;

    .edited {
        padding: 14px;
        padding-left: 40px;
        color: var(--gray3);
        font-size: 1.2rem;
    }
`;


const transition = {
    duration: 0.5,
    type: 'spring',
    damping: 13,
    mass: 0.75,
    stiffness: 120,
}

const variants = {
    hidden: {
        height: 40,
        transition
    },
    shown: {
        height: 190,
        transition
    }
}


export default ContentFooter;