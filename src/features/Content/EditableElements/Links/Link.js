import React from 'react';
import styled from 'styled-components/macro'

import Tooltip from 'components/Tooltip';


const Link = ({ 
    text, 
    href, 
    readOnly, 
    editLink, 
    deleteLink
}) => (
    <Tooltip tip={href} offset={8} >
        <Li>
            <a href={href} alt={href} target='_blank'>
                {text}
            </a>

            {!readOnly && (
                <div>
                    <button onClick={editLink}>
                        <i className="fas fa-pen-square"></i>
                    </button>
                    <button className='close' 
                        onClick={deleteLink}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            )}
        </Li>
    </Tooltip>
)

const Li = styled.li`
    position: relative;
    padding: 0 42px;

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
    
    div {
        position: absolute;
        right: 3px;
        top: 5px;
        opacity: 0;
        transform: scale(.8);
        transition: .45s;
    }

    &:hover div {
        opacity: 1;
        transform: scale(1);
    }

    button {
        background: transparent;
        margin-right: 5px;
        font-size: 1.5rem;
        color: var(--gray3);
        transition: .45s;
    }

    button:hover { color: var(--gray1) }
    button:focus { outline: none }
`

export default Link;