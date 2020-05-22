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
            <a href={href} alt={href} target='_blank'>
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
    position: relative;
    padding: 0 45px;

    a {
        position: relative;
        display: inline-block;
        padding: 4px;
        color: var(--white);
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
        transform: scale(1);
        top: 3px;
    }
`

export default Link;