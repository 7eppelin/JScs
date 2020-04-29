import React from 'react';
import styled from 'styled-components/macro';
import { useSlate } from 'slate-react';
import { Editor } from './editor';

import EditorToolbarButton from './EditorToolbarButton';


const StyledToolbar = styled.div`
    display: flex;
    flex-wrap: wrap;
    background: var(--gray5);
`;


const EditorToolbar = () => {
    const editor = useSlate();

    return (
        <StyledToolbar>

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