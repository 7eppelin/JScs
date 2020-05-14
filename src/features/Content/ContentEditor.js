import React, { useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import 'assets/css/prism-atom-dark.css';
import { motion } from 'framer-motion';

import { Slate, Editable } from 'slate-react';
import { createEditor, Editor, decorate } from './editor';
import renderElement from './renderElement';
import renderLeaf from './renderLeaf';

import ToggleReadOnly from './ToggleReadOnly'
import HoveringMenu from 'features/HoveringMenu/HoveringMenu';
import EditorFooter from './EditorFooter';
import Scrollbar from 'components/Scrollbar';


const EditableContainer = styled.div`
    background-color: var(--gray5);
    box-shadow: inset 0 -3px 10px -2px var(--gray6);
    height: 100%;
    padding-bottom: ${props => props.padding};
    transition: .2s;
`;

const Wrapper = styled(motion.div)`
    position: relative;
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


const ContentEditor = ({ content, updateContent }) => {
    const editor = useMemo(() => createEditor(), [content.id])

    const [ editorState, setEditorState ] = useState(content.data);
    const [ readOnly, setReadOnly ] = useState(false);

    const saveChanges = () => updateContent({
        ...content,
        edited: Date.now(),
        data: editorState
    })

    // hot keys
    const handleKeyDown = e => {

        if (e.nativeEvent.code === 'Enter') {
            Editor.handleEnter(editor, e);
        }

        if (!e.ctrlKey) return;

        switch (e.nativeEvent.code) {

            // text formatting
            case 'KeyB': 
                e.preventDefault();
                Editor.toggleMark(editor, 'bold');
                break;
            
            case 'KeyI':
                e.preventDefault();
                Editor.toggleMark(editor, 'italic');
                break;

            case 'Backquote':
                e.preventDefault();
                Editor.toggleMark(editor, 'code');
                break;

            // block insertion
            case 'Digit2':
                e.preventDefault();
                Editor.insertBlockElem(editor, 'h2');
                break

            case 'Digit3':
                e.preventDefault();
                Editor.insertBlockElem(editor, 'h3');
                break;

            case 'KeyP':
                e.preventDefault();
                Editor.insertBlockElem(editor, 'paragraph');
                break;

            case 'KeyU':
                e.preventDefault();
                Editor.insertBlockElem(editor, 'ul');
                break;

            case 'KeyH':
                e.preventDefault();
                Editor.insertBlockElem(editor, 'code-block', 'Code here!');
                break;
        }  
    }


    return (
        <Slate editor={editor} 
            value={editorState} 
            onChange={value => setEditorState(value)}>

            <Wrapper variants={wrapper}
                initial='hidden'
                animate='shown'
                exit='hidden'>

                <ToggleReadOnly readOnly={readOnly}
                    toggle={() => setReadOnly(!readOnly)} />

                <EditableContainer padding={readOnly ? '40px' : '150px'}>
                    <Scrollbar>
                        <Editable readOnly={readOnly}
                            onKeyDown={handleKeyDown} 
                            decorate={decorate}
                            renderElement={renderElement}
                            renderLeaf={renderLeaf} />
                    </Scrollbar>  
                </EditableContainer>

                <EditorFooter readOnly={readOnly}
                    edited={content.edited}
                    saveChanges={saveChanges} />

                <HoveringMenu />

            </Wrapper>

        </Slate>
    )
}

export default ContentEditor;