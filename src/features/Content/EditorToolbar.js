import React from 'react';
import styled from 'styled-components/macro';
import { useSlate } from 'slate-react';
import { Editor } from './editor';
import { motion } from 'framer-motion';

import EditorToolbarButton from './EditorToolbarButton';


const StyledToolbar = styled(motion.div)`
    background-color: var(--gray4);
    display: flex;
    flex-wrap: wrap;
    padding: 0 40px;
`;


// framer-motion variants
const container = {
    open: {
        height: 'auto',
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.06,
            duration: 0.1
        }
    },
    hidden: {
        height: 0,
        transition: {
            when: 'afterChildren',
            staggerChildren: 0.06,
            staggerDirection: -1,
            duration: 0.1
        }
    }
}


const EditorToolbar = ({ isOpen }) => {
    const editor = useSlate();

    return (
        <StyledToolbar variants={container}
            animate={isOpen ? 'open' : 'hidden'}>

            <EditorToolbarButton tooltip='Insert a <p>. Ctrl + P'
                onClick={() => Editor.insertBlockElem(editor, 'paragraph')}>
                    P
            </EditorToolbarButton>

            <EditorToolbarButton tooltip='Insert an <h2>. Ctrl + 2'
                onClick={() => Editor.insertBlockElem(editor, 'h2')}>
                    H2
            </EditorToolbarButton>

            <EditorToolbarButton tooltip='Insert an <h3>. Ctrl + 3'
                onClick={() => Editor.insertBlockElem(editor, 'h3')}>
                    H3
            </EditorToolbarButton>

            <EditorToolbarButton tooltip='Insert an <UL>. Ctrl + U'
                onClick={() => Editor.insertBlockElem(editor, 'ul')}>
                    UL
            </EditorToolbarButton>

            <EditorToolbarButton tooltip='Insert a <code>. Ctrl + ?'
                onClick={() => Editor.insertCodeBlock(editor, 'const a = b + c;')} >
                    C
            </EditorToolbarButton>

        </StyledToolbar>
    )
}

export default EditorToolbar;