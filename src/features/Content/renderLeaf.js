import React from 'react';
import styled from 'styled-components/macro';


const renderLeaf = ({ leaf, attributes, children }) => {

    if (leaf.token) {
        const classes = `token ${leaf.token}`;
        return (
            <span className={classes} {...attributes}>
                {children}
            </span>
        )
    }
    
    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <Code {...attributes}>{children}</Code>
    }
    
    return (
        <span {...attributes} >
            {children}
        </span>
    )
}


const Code = styled.code`
    padding: .12em .3em;
    border-radius: 3px;
    color: var(--white);
    background-color: var(--gray3);
`;

export default renderLeaf;