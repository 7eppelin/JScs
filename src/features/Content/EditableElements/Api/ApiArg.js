import React from 'react';
import styled from 'styled-components/macro';


const ApiArg = ({ attributes, children }) => (
    <Span {...attributes}>
            {children}
    </Span>
)


const Span = styled.span`
    font-size: 1.3rem;
    vertical-align: middle;
    color: var(--white1);
    padding: 2px 3px;
    margin: 0 2px;
    background: var(--gray4);
    box-shadow: inset 0 0 6px -1px black;
    border-radius: 3px;
`

export default ApiArg