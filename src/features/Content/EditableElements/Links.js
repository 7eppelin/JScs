import React from 'react';
import styled from 'styled-components/macro'

import Tooltip from 'components/Tooltip';

const Ul = styled.ul`
    height: 100%;
    overflow: hidden;
    
    li { 
        position: relative;
        display: inline-block;
        color: var(--orange3);
        height: 100%;
        padding: 11px 50px 0 25px;
    }

    a {
        display: block;
        transition: .15s;
    }

    a:hover {
        color: var(--orange1);
    }

    li:hover button {
        opacity: 1;
        transform: scale(1);
    }

    button {
        position: absolute;
        top: 12px;
        right: 23px;
        background: transparent;
        font-size: 1.8rem;
        color: var(--gray3);
        opacity: 0;
        transform: scale(.7);
        transition: .45s;
    }

    button.close { right: 2px; }
    button:hover { color: var(--gray1); }
`;


const Links = ({ links, edit, deleteLink }) => (
    <Ul>
        {links.map((link, index) => (
            <Tooltip tip={link.href} offset={0} key={index}>
                <li>
                    <a href={link.href} alt={link.href} target='_blank'>
                        {link.text}
                    </a>

                    <button onClick={() => edit(index)}>
                        <i className="fas fa-pen-square"></i>
                    </button>

                    <button className='close' 
                        onClick={() => deleteLink(index)}>
                        <i className="fas fa-times"></i>
                    </button>
                </li>
            </Tooltip>
        ))}
    </Ul>
)

export default Links;