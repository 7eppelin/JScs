import React from 'react';
import styled from 'styled-components/macro';
import { useSlate } from 'slate-react';
import { insertElem } from '../Content/editor';

import Button from './Button';



const Toolbar = () => {
    const editor = useSlate();

    return (
        <StyledToolbar>

            <Button tooltip='Insert a <p>. Ctrl + P'
                onClick={() => insertElem(editor, 'paragraph')}>
                    P
            </Button>

            <Button tooltip='Insert an <h2>. Ctrl + 2'
                onClick={() => insertElem(editor, 'h2')}>
                    H2
            </Button>

            <Button tooltip='Insert an <h3>. Ctrl + 3'
                onClick={() => insertElem(editor, 'h3')}>
                    H3
            </Button>

            <Button tooltip='Insert an <UL>. Ctrl + U'
                onClick={() => insertElem(editor, 'ul')}>
                    UL
            </Button>

            <Button tooltip='Insert a <code>. Ctrl + ?'
                onClick={() => insertElem(editor, 'code-block')} >
                    C
            </Button>

        </StyledToolbar>
    )
}


const StyledToolbar = styled.div`
    display: flex;
    flex-wrap: wrap;
    background: var(--gray5);
`;

export default Toolbar;