import React from 'react';
import styled from 'styled-components/macro';

import Tooltip from 'components/Tooltip';


const Code = styled.code`
    padding: .1em .3em;
    border-radius: 3px;
    background-color: var(--gray4);
`;

const Link = styled.a`
    color: var(--orange1);
    cursor: pointer;
    transition: .2s;

    &:hover {
        text-decoration: underline;
    }
`;

const renderLeaf = ({ leaf, attributes, children }) => {

    if (leaf.token) {
        const classes = `token ${leaf.token}`;
        return (
            <span className={classes} {...attributes}>
                {children}
            </span>
        )
    }

    if (leaf.href) {
        return (
            <Tooltip tip={leaf.href}>
                <Link alt={leaf.href} 
                    href={leaf.href} 
                    target='_blank'
                    {...attributes}>
                        {children}
                </Link>
            </Tooltip>
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

    if (leaf.tooltip) {
        return (
            <Tooltip tip={leaf.tooltip}>
                <span {...attributes}>{children}</span>
            </Tooltip>
        )
    }
    
    return (
        <span {...attributes} >
            {children}
        </span>
    )
}

export default renderLeaf;