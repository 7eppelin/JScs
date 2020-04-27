import React from 'react';
import styled from 'styled-components/macro';


const StyledToggler = styled.button`
    width: 42px;
    height: 42px;
    font-size: 1.8rem;
    margin-top: 20px;
    background-color: var(--black);
    color: var(--white);
    border-radius: 50%;
    border: 1px solid var(--gray4);
    box-shadow: 0 0 6px 1px var(--black);
    outline: none;

    &:focus { outline: none }

    i {
        vertical-align: middle;
        transition: .25s;
    }

    &.toggled i {
        transform: rotate(135deg);
    }
`;

const AddFormToggler = ({ toggle, isToggled }) => (
    <StyledToggler onClick={() => toggle(!isToggled)}
            className={isToggled ? 'toggled' : ''} >
        <i className="fas fa-plus"></i>
    </StyledToggler>
);

export default AddFormToggler;