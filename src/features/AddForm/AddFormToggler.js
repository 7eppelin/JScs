import React from 'react';
import styled from 'styled-components/macro';

import Icon from 'components/Icon'


const AddFormToggler = ({ toggle, isToggled }) => (
    <StyledToggler onClick={() => toggle(!isToggled)}
            className={isToggled ? 'toggled' : ''} >

        <Icon icon='plus' 
            size={24}
            color='var(--white)' />
    </StyledToggler>
);

const StyledToggler = styled.button`
    width: 42px;
    height: 42px;
    font-size: 1.8rem;
    margin-top: 20px;
    background-color: var(--black);
    border-radius: 50%;
    border: 1px solid var(--gray4);
    box-shadow: 0 0 15px -1px black;
    outline: none;
    transition: .2s;

    &.toggled { box-shadow: 0 0 15px -3px black }
    &:focus { outline: none }

    svg {
        transform: rotate(0deg);
        transition: .16s;
    }

    &.toggled svg { transform: rotate(45deg) }

    path { fill: var(--white1) }
`;

export default AddFormToggler;