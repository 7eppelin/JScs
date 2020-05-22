import React from 'react';
import styled from 'styled-components/macro';

import { isInside, insertElem } from 'features/Content/editor'

import Tooltip from 'components/Tooltip';
import Icon from 'components/Icon'
import { HOTKEYS } from 'features/Content/editor'


const Button = ({ elem, editor }) => (
    <Tooltip 
        tip={`Insert ${elem}. ${HOTKEYS[elem]}`} >

        <StyledButton 
            onClick={() => insertElem(editor, elem)} 
            className={isInside(editor, elem) ? 'active' : ''}>

            <Icon icon={elem} />

        </StyledButton>
    </Tooltip>
)


const StyledButton = styled.button`
    margin: 0 1px;
    flex-basis: 60px;
    flex-grow: 1;
    padding: 8px;
    color: var(--orange1);
    outline: 1px solid transparent;
    cursor: pointer;
    transition: .15s;
    font-size: 1.5rem;

    path { fill: var(--orange1) }
    
    &:hover,
    &.active {
        outline: 1px solid var(--orange1);

        path { 
            fill: var(--orange2) 
        }
    }

    &:active { outline-offset: -2px }
`;

export default Button;