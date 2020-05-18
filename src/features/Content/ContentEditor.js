import React, { useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import 'assets/css/prism-atom-dark.css';
import { motion } from 'framer-motion';

import { Slate, Editable } from 'slate-react';
import { createEditor, handleKeyDown, decorate } from './editor';
import renderElement from './renderElement';
import renderLeaf from './renderLeaf';

import ToggleReadOnly from './ToggleReadOnly'
import EditorFooter from './EditorFooter';
import HoveringMenu from 'features/HoveringMenu/HoveringMenu'


const ContentEditor = ({ content, updateContent }) => {
    const editor = useMemo(() => createEditor(), [content.id])

    const [ editorState, setEditorState ] = useState(content.data);
    const [ readOnly, setReadOnly ] = useState(true);

    const saveChanges = () => updateContent({
        ...content,
        edited: Date.now(),
        data: editorState
    })

    return (
        <Slate editor={editor} 
            value={editorState} 
            onChange={value => setEditorState(value)}>

            <Wrapper variants={wrapper}
                initial='hidden'
                animate='shown'
                exit='hidden'>

                <ToggleReadOnly readOnly={readOnly}
                    toggle={() => {
                        if (!readOnly) editor.selection = null
                        setReadOnly(!readOnly)
                    }} />

                <EditableContainer className='scrollbar'>

                        <Editable readOnly={readOnly}
                            onKeyDown={e => handleKeyDown(e, editor)} 
                            decorate={decorate}
                            renderElement={renderElement}
                            renderLeaf={renderLeaf} />
                </EditableContainer>

                <EditorFooter readOnly={readOnly}
                    edited={content.edited}
                    saveChanges={saveChanges} />

                <HoveringMenu />
            </Wrapper>
        </Slate>
    )
}


const EditableContainer = styled.div`
    background-color: var(--gray5);
    box-shadow: inset 0 -3px 10px -2px var(--gray6);
    overflow-x: hidden;
`;

const Wrapper = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 6px 9px;
    height: calc(100% - 12px);
    font-size: 1.4rem;
    color: var(--gray1); 
`;


const wrapper = {
    shown: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.4,
            when: 'beforeChildren',
            staggerChildren: 0.15,
            ease: 'circOut'
        }
    },
    hidden: {
        scale: 0.65,
        opacity: 0,
        transition: {
            duration: 0.3,
            when: 'afterChildren',
            staggerChildren: 0.06,
            staggerDirection: -1,
            ease: 'circOut'
        }
    }
}

export default ContentEditor;