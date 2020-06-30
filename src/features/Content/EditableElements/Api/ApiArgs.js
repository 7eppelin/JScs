import React from 'react'
import styled from 'styled-components/macro';

const ApiArgs = ({ attributes, children }) => (
    <Span {...attributes}>
        {children}
    </Span>
)

const Span = styled.span`
    color: var(--orange2);
    font-size: 2.2rem;
    vertical-align: middle;
`

export default ApiArgs