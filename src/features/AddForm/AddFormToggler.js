import React from 'react';
import styled from 'styled-components/macro';

import Icon from 'components/Icon'


const AddFormToggler = ({ toggle, isToggled }) => (
    <StyledToggler onClick={() => toggle(!isToggled)}
            className={isToggled ? 'toggled' : ''} >

        <Icon icon='plus' 
            size={22}
            color='var(--white)' />
    </StyledToggler>
);


const StyledToggler = styled.button`
    width: 42px;
    height: 42px;
    font-size: 1.8rem;
    background: var(--black);
    border-radius: 50%;
    border: 1px solid var(--gray4);
    box-shadow: inset 0 0 8px -2px black;
    outline: none;
    transition: .2s;

    &:focus { outline: none }

    svg {
        transform: rotate(0deg);
        transition: .16s;
    }

    &.toggled svg { transform: rotate(45deg) }

    path { fill: var(--white1) }
`;

export default AddFormToggler;