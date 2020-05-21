import React from 'react';
import styled from 'styled-components/macro';

import { Editable, useEditor } from 'slate-react';
import { handleKeyDown, decorate } from './editor';
import renderElement from './renderElement';
import renderLeaf from './renderLeaf';


const MyEditable = ({ readOnly }) => {
    const editor = useEditor()

    return (
        <Container className='scrollbar'>
            <Editable style={{ paddingBottom: '40px' }}
                readOnly={readOnly}
                onKeyDown={e => handleKeyDown(e, editor)}
                decorate={decorate}
                renderElement={renderElement}
                renderLeaf={renderLeaf} />
        </Container>
    )
}

const Container = styled.div`
    background-color: var(--gray5);
    box-shadow: inset 0 -12px 25px -15px black;
    scroll-behavior: smooth;
    overflow-x: hidden;
`

export default MyEditable