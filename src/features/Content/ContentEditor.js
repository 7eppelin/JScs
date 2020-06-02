import React, { useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

// prismjs theme
import 'assets/css/prism-atom-dark.css';

import { Slate } from 'slate-react';
import { createEditor } from './editor';

import ToggleReadOnly from './ToggleReadOnly'
import Editable from './Editable'
import ContentFooter from 'features/ContentFooter/ContentFooter';


const ContentEditor = ({ content, updateContent, shouldDelayAnimation }) => {
    // must create a new instance whenever a new content item is selected
    const editor = useMemo(() => createEditor(), [content.id])

    const [ editorState, setEditorState ] = useState(content.data);
    const [ readOnly, setReadOnly ] = useState(true);

    const saveChanges = () => updateContent({
        ...content,
        edited: Date.now(),
        data: editorState
    })

    return (
        // variants and transition definitions are below
        <Wrapper variants={wrapper}
                initial='exit'
                animate='enter'
                exit='exit'
                transition={shouldDelayAnimation ? {
                    ...enterTransition,
                    delay: .85,
                } : enterTransition }>

            <ToggleReadOnly readOnly={readOnly}
                toggle={() => {
                    // must nullify the selection when quitting editing
                    // to prevent HoveringMenu from re-appearing at the same place
                    // when the user will start editing again
                    if (!readOnly) editor.selection = null
                    setReadOnly(!readOnly)
                }} 
            />

            <Slate editor={editor} 
                value={editorState} 
                onChange={value => setEditorState(value)}>

                <Editable readOnly={readOnly} />

                <ContentFooter 
                    readOnly={readOnly}
                    edited={content.edited}
                    saveChanges={saveChanges} />
            </Slate>
        </Wrapper>
    )
}


const Wrapper = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 6px 9px;
    height: calc(100% - 12px);
    font-size: 1.4rem;
    color: var(--gray1); 
`;


const enterTransition = {
    duration: 0.3,
    when: 'beforeChildren',
    staggerChildren: 0.09,
    ease: 'circOut'
}


const wrapper = {
    enter: {
        scale: 1,
        opacity: 1,
    },
    exit: {
        scale: 0.7,
        opacity: 0,
        transition: {
            duration: 0.4,
            ease: 'circOut'
        }
    }
}

export default ContentEditor;