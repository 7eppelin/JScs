import React from 'react';
import styled from 'styled-components/macro';

import Tooltip from 'components/Tooltip';


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
            <Tooltip tip={leaf.href} offset={8}>
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


const Link = styled.a`
    position: relative;
    color: var(--orange1);
    cursor: pointer;
    text-decoration: underline;
    transition: .2s;

    &:hover {
        color: var(--orange3)
    }
`;

const Code = styled.code`
    padding: .12em .3em;
    border-radius: 3px;
    color: var(--white);
    background-color: var(--gray3);
`;

export default renderLeaf;