import React from 'react';
import styled from 'styled-components/macro';
import { useSlate } from 'slate-react';
import { insertElem, isInside } from '../Content/editor';

import Button from './Button';
import { ELEMS } from 'features/Content/editor'

const Toolbar = () => {
    const editor = useSlate();

    return (
        <StyledToolbar>
            {ELEMS.map(elem => (
                <Button key={elem} 
                    elem={elem}
                    editor={editor}
                    isActive={isInside(editor, elem)}
                    onClick={() => insertElem(editor, elem)} />
            ))}
        </StyledToolbar>
    )
}


const StyledToolbar = styled.div`
    display: flex;
    flex-wrap: wrap;
    background: var(--gray5);
`;

export default Toolbar;