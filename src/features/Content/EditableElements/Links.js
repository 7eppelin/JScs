import React from 'react';
import styled from 'styled-components/macro'

import Tooltip from 'components/Tooltip';

const Ul = styled.ul`
    
    li { position: relative; }

    a {

    }

    button {
        position: absolute;
        top: 3px;
        right: 3px;
        opacity: 0;
        transform: scale(.8);
        transition: .3s;
    }

    &:hover button {
        opacity: 1;
        transform: scale(1);
    }
`;

const Links = ({ links, edit }) => (
    <Ul>
        {links.map((link, index) => (
            <Tooltip tip={link.text} key={index}>
                <li>
                    <a href={link.href} alt={link.href} target='_blank'>
                    {link.text}
                    </a>

                    <button onClick={() => edit(index)}>
                        e
                    </button>
                </li>
            </Tooltip>
        ))}
    </Ul>
)

export default Links;