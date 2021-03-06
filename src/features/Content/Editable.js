import React from 'react';
import styled from 'styled-components/macro';

import { Editable, useEditor } from 'slate-react';
import { handleKeyDown, decorate } from './editor';
import renderElement from './renderElement';
import renderLeaf from './renderLeaf';

import HoveringMenu from 'features/HoveringMenu/HoveringMenu'


const MyEditable = ({ readOnly }) => {
    const editor = useEditor()

    return (
        <Container className='scrollbar'>
            <Editable style={{padding: '215px 20% 40px 15%'}}
                readOnly={readOnly}
                onKeyDown={e => handleKeyDown(e, editor)}
                decorate={decorate}
                renderElement={renderElement}
                renderLeaf={renderLeaf} />

            <HoveringMenu />
        </Container>
    )
}

const Container = styled.div`
    font-size: 1.45rem;
    position: relative;
    background-color: var(--gray5);
    color: var(--white2);
    box-shadow: inset 0 -12px 25px -15px black;
    scroll-behavior: smooth;
    overflow-x: hidden;
`

export default MyEditable