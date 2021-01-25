import React from 'react';
import styled from 'styled-components/macro'

import Tooltip from 'components/Tooltip';
import LinkControls from './LinkControls'


const Link = ({ 
    text, 
    href, 
    isEditing, 
    editLink, 
    deleteLink
}) => (
    <Tooltip tip={href} offset={8} >
        <Li>
            <a href={href} 
                alt={href} 
                target='_blank'
                rel="noopener noreferrer">
                {text}
            </a>

            {isEditing && (
                <LinkControls 
                    editLink={editLink} 
                    deleteLink={deleteLink} />
            )}
        </Li>
    </Tooltip>
)

const Li = styled.li`
    padding: 0 15px;
    flex-shrink: 0;

    &:first-child {
        padding-left: 50px;
    }

    a {
        position: relative;
        display: inline-block;
        font-size: 1.4rem;
        padding: 4px;
        color: var(--orange3);
        transition: .15s;
    }

    a:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        opacity: 0;
        background: var(--brown);
        transition: .4s;
    }

    &:hover a {
        color: var(--orange1);
    }

    &:hover a:after {
        opacity: 1;
        bottom: 4px;
        left: 18%;
        right: 18%;
    }

    &:hover div {
        opacity: 1;
    }
`

export default Link;