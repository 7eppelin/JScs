import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import Tooltip from 'components/Tooltip';
import EditorToolbar from './EditorToolbar';


const StyledFooter = styled(motion.div)`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--gray6);
    overflow: hidden;

    .edited {
        padding: 14px;
        padding-left: 40px;
        color: var(--gray3);
        font-size: 1.2rem;
    }

    .control-btn {
        margin: 20px;
        margin-left: 50px;
        font-size: 2.5rem;
        color: var(--orange1);
        background-color: transparent;
        margin-right: 30px;
    }

    .control-btn:hover i { color: var(--orange3) }
    .control-btn:active { transform: scale(.96) }
    .control-btn:focus { outline: none }
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
        height: 150,
        transition
    }
}


const EditorFooter = ({ 
    readOnly,
    saveChanges, 
    edited 
}) => (
    <StyledFooter variants={variants}
        animate={readOnly ? 'hidden' : 'shown'}>

        <div className='edited'>
            Edited: {new Date(edited).toLocaleDateString()}
        </div>

        <EditorToolbar />

        <Tooltip tip="Save changes">
            <button className='control-btn' 
                onClick={saveChanges}>
                <i className="far fa-save" />
            </button>
        </Tooltip>

    </StyledFooter>
)

export default EditorFooter;