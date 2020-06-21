import React from 'react';
import styled from 'styled-components/macro';


const InlineCode = ({ attributes, children }) => (
    <Code {...attributes}>
        {children}
    </Code>
)

const Code = styled.code`
    background: var(--gray6);
    box-shadow: inset 0 0 10px -4px black;
    border-radius: 3px;
    font-size: 1.4rem;
    color: var(--yellow);
    margin: 0 0.15em;
    padding: 0.2em 0.5em;
`


export default InlineCode