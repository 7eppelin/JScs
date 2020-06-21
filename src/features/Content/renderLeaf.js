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
    
    return (
        <span {...attributes} >
            {children}
        </span>
    )
}

export default renderLeaf;