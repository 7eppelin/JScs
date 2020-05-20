import React from 'react';
import styled from 'styled-components/macro'

import Tooltip from 'components/Tooltip';


const Link = ({ text, href, readOnly, editLink, deleteLink }) => (
    <Li>
        <Tooltip tip={href} offset={10} >
            <a href={href} alt={href} target='_blank'>
                    {text}
            </a>
        </Tooltip>

        {!readOnly && (
            <>
            <button onClick={editLink}>
                <i className="fas fa-pen-square"></i>
            </button>
            <button className='close' 
                onClick={deleteLink}>
                <i className="fas fa-times"></i>
            </button>
            </>
        )}
    </Li>
)

const Li = styled.li`
    position: relative;
    padding: 0 45px;

    a {
        padding: 8px;
        color: var(--orange3);
        transition: .15s;
    }

    a:hover {
        color: var(--orange1);
    }

    &:hover button {
        opacity: 1;
        transform: scale(1);
    }

    button {
        position: absolute;
        right: 23px;
        background: transparent;
        font-size: 1.8rem;
        color: var(--gray3);
        opacity: 0;
        transform: scale(.85);
        transition: .45s;
    }

    button.close { right: 2px }
    button:hover { color: var(--gray1) }
    button:focus { outline: none }
`

export default Link;